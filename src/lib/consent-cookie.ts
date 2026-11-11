// Server-side consent check for routes that send data to outside services (the Meta
// Conversions API). It reads the cookie banner's own cookie from the request, so a direct
// call to the route cannot claim consent the visitor never gave.
//
// The banner (CookieConsent v3) stores `encodeURIComponent(JSON.stringify({ categories,
// revision, ... }))` in `cc_cookie`. A plain JSON value is accepted too, in case a proxy
// decodes it on the way.
import { CONSENT_COOKIE_NAME } from './consent-config';

/** True only when the request carries a current-revision banner choice that accepts marketing. */
export function hasMarketingConsent(cookieHeader: string | null | undefined, revision: number): boolean {
  const raw = readCookie(cookieHeader ?? '', CONSENT_COOKIE_NAME);
  if (raw === undefined) return false;

  const value = parseJson(safeDecode(raw)) ?? parseJson(raw);
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;

  const { categories, revision: storedRevision } = value as { categories?: unknown; revision?: unknown };
  return storedRevision === revision && Array.isArray(categories) && categories.includes('marketing');
}

function readCookie(header: string, name: string): string | undefined {
  for (const part of header.split(';')) {
    const pair = part.trim();
    if (pair.startsWith(`${name}=`)) return pair.slice(name.length + 1);
  }
  return undefined;
}

function safeDecode(text: string): string {
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}
