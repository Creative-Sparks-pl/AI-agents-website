import type { APIRoute } from 'astro';
import { isAuthorizedWebhook, toPurchaseEvent, type PurchaseEvent } from '../../lib/purchase-event';

export const prerender = false;

const UMAMI_SEND_URL = 'https://analytics.creativesparks.pl/api/send';
const UMAMI_WEBSITE_ID = '37a76f9d-7246-4d45-b832-3b35e78eee08';
const UMAMI_HOSTNAME = 'agents.creativesparks.pl';
// Umami discards events from bot user agents, so the server call presents a browser one.
const BROWSER_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthorizedWebhook(request.url, import.meta.env.EASYTOOLS_WEBHOOK_TOKEN)) {
    return new Response('unauthorized', { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response('bad request', { status: 400 });
  }

  logPayloadShape(body);

  const purchase = toPurchaseEvent(body);
  if (purchase) {
    await sendToUmami(purchase);
  }

  // 200 for every authorized call, ignored events included, so Easytools does not retry them.
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// Keys and custom_params only — enough to see whether checkout-link parameters arrive,
// without writing the customer's email or name to the logs.
function logPayloadShape(body: unknown): void {
  const record =
    typeof body === 'object' && body !== null && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : {};
  console.log(
    '[easytools-webhook]',
    JSON.stringify({
      event: typeof record.event === 'string' ? record.event : null,
      keys: Object.keys(record),
      custom_params: record.custom_params ?? null,
    }),
  );
}

async function sendToUmami(purchase: PurchaseEvent): Promise<void> {
  try {
    const response = await fetch(UMAMI_SEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': BROWSER_USER_AGENT },
      body: JSON.stringify({
        type: 'event',
        payload: {
          website: UMAMI_WEBSITE_ID,
          hostname: UMAMI_HOSTNAME,
          url: purchase.url,
          ...(purchase.data.language ? { language: purchase.data.language } : {}),
          name: purchase.name,
          data: purchase.data,
        },
      }),
    });

    if (!response.ok) {
      console.error('[easytools-webhook] umami non-ok response:', response.status, await response.text());
    }
  } catch (err) {
    console.error('[easytools-webhook] umami send failed:', err);
  }
}
