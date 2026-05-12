import type { APIRoute } from 'astro';

export const prerender = false;

interface SubscribeBody {
  email?: string;
  // honeypot — bots fill this, humans don't
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.MAILERLITE_API_KEY;
  const groupId = import.meta.env.MAILERLITE_GROUP_ID;
  const downloadUrl = import.meta.env.FREE_SKILL_DOWNLOAD_URL;

  if (!apiKey || !groupId || !downloadUrl) {
    return json({ ok: false, reason: 'not_configured' }, 503);
  }

  let body: SubscribeBody;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, reason: 'bad_request' }, 400);
  }

  if (body.website) {
    return json({ ok: true, downloadUrl }, 200);
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return json({ ok: false, reason: 'invalid_email' }, 422);
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
      }),
    });

    if (response.status === 200 || response.status === 201) {
      return json({ ok: true, downloadUrl }, 200);
    }

    if (response.status === 422) {
      return json({ ok: false, reason: 'invalid_email' }, 422);
    }

    const errorText = await response.text();
    console.error('[subscribe] mailerlite non-ok response:', response.status, errorText);
    return json({ ok: false, reason: 'upstream_error' }, 502);
  } catch (err) {
    console.error('[subscribe] fetch failed:', err);
    return json({ ok: false, reason: 'internal_error' }, 500);
  }
};

function json(payload: unknown, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
