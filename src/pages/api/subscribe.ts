import type { APIRoute } from 'astro';

export const prerender = false;

type Skill = 'audit' | 'planning';
type Locale = 'pl' | 'en';

interface SubscribeBody {
  email?: string;
  locale?: string;
  skill?: string;
  // honeypot — bots fill this, humans don't
  website?: string;
}

interface EasytoolsProduct {
  files?: { download_url?: string | null }[];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_LOCALES = new Set(['pl', 'en']);
const ALLOWED_SKILLS = new Set(['audit', 'planning']);

const EASYCART_API = 'https://cart.easy.tools/api/v1';
// Cloudflare in front of cart.easy.tools answers 403 (error 1010) to default client signatures.
const USER_AGENT = 'creativesparks-site/1.0';

// One free Easytools product per skill and language. These IDs are not secret:
// they do nothing without the API key, which stays in the environment.
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

  // Bots get a success answer, but Easytools is never called and no real link is handed out.
  if (body.website) {
    return json({ ok: true }, 200);
  }

  if (!ALLOWED_SKILLS.has(body.skill ?? '')) {
    return json({ ok: false, reason: 'bad_request' }, 400);
  }
  const skill = body.skill as Skill;

  const email = (body.email ?? '').trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return json({ ok: false, reason: 'invalid_email' }, 422);
  }

  const locale: Locale = ALLOWED_LOCALES.has(body.locale ?? '') ? (body.locale as Locale) : 'pl';

  const apiKey = import.meta.env.EASYCART_API_KEY;
  if (!apiKey) {
    return json({ ok: false, reason: 'not_configured' }, 503);
  }

  const { productId, variantId } = PRODUCTS[skill][locale];

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json',
    'User-Agent': USER_AGENT,
  };

  try {
    // Grant the free product. Easytools creates the customer account if needed and sends the access email.
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
      return json({ ok: false, reason: 'upstream_error' }, 502);
    }

    // The grant answer carries no link; reading the product returns a signed download link (~1 hour).
    const productResponse = await fetch(`${EASYCART_API}/products/${productId}`, { headers });
    if (!productResponse.ok) {
      console.error(
        '[subscribe] easytools product read non-ok response:',
        productResponse.status,
        await productResponse.text(),
      );
      return json({ ok: false, reason: 'upstream_error' }, 502);
    }

    const product = (await productResponse.json()) as EasytoolsProduct;
    const downloadUrl = product.files?.[0]?.download_url;
    if (!downloadUrl) {
      console.error('[subscribe] easytools product has no downloadable file:', productId);
      return json({ ok: false, reason: 'upstream_error' }, 502);
    }

    return json({ ok: true, downloadUrl }, 200);
  } catch (err) {
    console.error('[subscribe] fetch failed:', err);
    return json({ ok: false, reason: 'internal_error' }, 500);
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
