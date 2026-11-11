import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';
import { CONSENT_RECORD_MAX_BYTES, parseConsentRecord } from '../../lib/consent-record';

export const prerender = false;

// The banner sends this as a background beacon; nobody waits on the answer, so a slow
// database must never keep the request open.
const DATABASE_TIMEOUT_MS = 3000;

export const POST: APIRoute = async ({ request }) => {
  const raw = await readLimited(request, CONSENT_RECORD_MAX_BYTES);
  const record = raw === null ? null : parseConsentRecord(raw);
  if (!record) {
    return new Response('bad request', { status: 400 });
  }

  const databaseUrl = import.meta.env.CONSENT_DATABASE_URL;
  if (!databaseUrl) {
    console.error('[consent] CONSENT_DATABASE_URL is not set');
    return new Response('not configured', { status: 503 });
  }

  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort('timed out'), DATABASE_TIMEOUT_MS);
  try {
    const sql = neon(databaseUrl);
    await sql.query(
      'INSERT INTO consent_records (consent_id, revision, language, accepted, rejected, kind) VALUES ($1, $2, $3, $4, $5, $6)',
      [record.consentId, record.revision, record.language, record.accepted, record.rejected, record.kind],
      { fetchOptions: { signal: abortController.signal } },
    );
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error('[consent] insert failed:', err);
    return new Response('record not saved', { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
};

// Reads the body up to `maxBytes`; returns null for anything larger, without reading the rest.
async function readLimited(request: Request, maxBytes: number): Promise<string | null> {
  const declared = Number(request.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > maxBytes) return null;
  if (!request.body) return '';

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}
