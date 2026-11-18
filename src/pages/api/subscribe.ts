import type { APIRoute } from 'astro';
import { normalizeFreeSkillEmail } from '../../lib/free-skill-email';

export const prerender = false;

type Skill = 'audit' | 'planning';
type Locale = 'pl' | 'en';
// The Easytools step a failed signup stopped at. Since 1.5.0 the grant is the only step.
type FailedStage = 'grant';

interface SubscribeBody {
  email?: string;
  locale?: string;
  skill?: string;
  // honeypot — bots fill this, humans don't
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_LOCALES = new Set(['pl', 'en']);
const ALLOWED_SKILLS = new Set(['audit', 'planning']);

const EASYCART_API = 'https://cart.easy.tools/api/v1';
// Cloudflare in front of cart.easy.tools answers 403 (error 1010) to default client signatures.
const USER_AGENT = 'creativesparks-site/1.0';

// One free Easytools product per skill and language; the grant uses the variant. These IDs are not
// secret: they do nothing without the API key, which stays in the environment.
const PRODUCTS: Record<Skill, Record<Locale, { productId: string; variantId: string }>> = {
  audit: {
    pl: {
      productId: '42c65e31-97e9-4cac-b849-44158246652f',
      variantId: '3bec0d71-bb11-403b-a378-d2bde0b7eda6',
    },
    en: {
      productId: '868c5223-4b3e-4248-a3fd-01a029032a66',
      variantId: 'adde7d17-5ef4-412b-962d-ff5f21d452db',
    },
  },
  planning: {
    pl: {
      productId: 'ecd365f9-e302-4926-9209-8813d3e3e7e2',
      variantId: 'bc99ad4d-b7bb-4789-a605-0ba9062595ff',
    },
    en: {
      productId: 'd7e27b87-ac65-4f6b-8973-01076e9f197f',
      variantId: '9b5b1e6b-caa5-4e3c-9d19-381802be2869',
    },
  },
};

export const POST: APIRoute = async ({ request }) => {
  let body: SubscribeBody;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, reason: 'bad_request' }, 400);
  }

  // Bots get a bare `ok` without `granted`, so the form shows its generic error; Easytools is never called.
  if (body.website) {
    return json({ ok: true }, 200);
  }

  if (!ALLOWED_SKILLS.has(body.skill ?? '')) {
    return json({ ok: false, reason: 'bad_request' }, 400);
  }
  const skill = body.skill as Skill;

  const typedEmail = (body.email ?? '').trim().toLowerCase();
  if (!typedEmail || !EMAIL_RE.test(typedEmail) || typedEmail.length > 254) {
    return json({ ok: false, reason: 'invalid_email' }, 422);
  }
  // Gmail aliases reach one mailbox, so they count as one address: Easytools gets the plain form.
  const email = normalizeFreeSkillEmail(typedEmail);

  const locale: Locale = ALLOWED_LOCALES.has(body.locale ?? '') ? (body.locale as Locale) : 'pl';

  const apiKey = import.meta.env.EASYCART_API_KEY;
  if (!apiKey) {
    return json({ ok: false, reason: 'not_configured' }, 503);
  }

  const { variantId } = PRODUCTS[skill][locale];

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json',
    'User-Agent': USER_AGENT,
  };

  // Failed answers say which step failed and Easytools' HTTP status (0: no answer), so the form's error
  // event shows the cause. Never Easytools' message text, which may contain the email.
  const stage: FailedStage = 'grant';

  try {
    // Grant the free product. Easytools creates the customer account if needed and sends its access email;
    // the license service then emails the personal install link. No file or link comes back here.
    const grant = await fetch(`${EASYCART_API}/product-access`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variant_id: variantId,
        // Easytools requires a name; mailing does not use it, so the email's local part stands in.
        full_name: email.split('@')[0].slice(0, 50),
        email,
        lang: locale,
      }),
    });

    if (grant.status !== 201) {
      const errorText = await grant.text();

      if (grant.status === 422 && hasEmailError(errorText)) {
        return json({ ok: false, reason: 'invalid_email' }, 422);
      }

      console.error('[subscribe] easytools grant non-ok response:', grant.status, errorText);
      return json({ ok: false, reason: 'upstream_error', stage, status: grant.status }, 502);
    }

    return json({ ok: true, granted: true }, 200);
  } catch (err) {
    // No usable answer at this step: the request failed, or the answer was not readable.
    console.error('[subscribe] fetch failed:', stage, err);
    return json({ ok: false, reason: 'internal_error', stage, status: 0 }, 500);
  }
};

function hasEmailError(errorText: string): boolean {
  try {
    const parsed = JSON.parse(errorText) as { errors?: Record<string, unknown> };
    return Boolean(parsed.errors?.email);
  } catch {
    return false;
  }
}

function json(payload: unknown, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
