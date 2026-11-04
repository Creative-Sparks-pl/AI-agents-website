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

// One free Easytools product per skill and language. Each variable is read by name
// so Astro resolves it from the environment.
const PRODUCTS: Record<Skill, Record<Locale, { productId?: string; variantId?: string }>> = {
  audit: {
    pl: {
      productId: import.meta.env.EASYTOOLS_FREE_AUDIT_PRODUCT_ID,
      variantId: import.meta.env.EASYTOOLS_FREE_AUDIT_VARIANT_ID,
    },
    en: {
      productId: import.meta.env.EASYTOOLS_FREE_AUDIT_PRODUCT_ID_EN,
      variantId: import.meta.env.EASYTOOLS_FREE_AUDIT_VARIANT_ID_EN,
    },
  },
  planning: {
    pl: {
      productId: import.meta.env.EASYTOOLS_FREE_PLANNING_PRODUCT_ID,
      variantId: import.meta.env.EASYTOOLS_FREE_PLANNING_VARIANT_ID,
    },
    en: {
      productId: import.meta.env.EASYTOOLS_FREE_PLANNING_PRODUCT_ID_EN,
      variantId: import.meta.env.EASYTOOLS_FREE_PLANNING_VARIANT_ID_EN,
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
  const { productId, variantId } = PRODUCTS[skill][locale];
  if (!apiKey || !productId || !variantId) {
    return json({ ok: false, reason: 'not_configured' }, 503);
  }

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

      // TODO(returning visitor): what Easytools answers when this email already has the
      // product is checked with a real repeat signup; treat that answer as success here.

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
