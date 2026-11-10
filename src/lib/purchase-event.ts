// Easytools purchase webhook → Umami "Purchase" event, plus the shared-token check.
// Pure (no I/O) so the rules can be unit-tested; the API route does the sending.

export const PURCHASE_EVENT_NAME = 'Purchase';

// Reported as the event's page when the checkout link carried no page parameter.
export const PURCHASE_FALLBACK_URL = '/purchase';

export interface PurchaseEventData {
  language?: string;
  product_id?: string;
  price_name?: string;
  amount: number;
  currency?: string;
  page?: string;
}

export interface PurchaseEvent {
  name: typeof PURCHASE_EVENT_NAME;
  url: string;
  data: PurchaseEventData;
}

// Only a paid checkout counts. `product_assigned` also fires for free skills granted
// through the API, and a free product bought at checkout sends `amount_paid` 0.
// Email, name, customer and order identifiers are never copied into the event.
export function toPurchaseEvent(body: unknown): PurchaseEvent | null {
  if (!isRecord(body) || body.event !== 'single_product_bought') return null;

  const amount = toNumber(body.amount_paid);
  if (amount === undefined || amount <= 0) return null;

  const customParams = isRecord(body.custom_params) ? body.custom_params : {};
  const page = toText(customParams.page);

  const data: PurchaseEventData = { amount };
  const language = toText(body.lang);
  const productId = toText(body.product_id);
  const priceName = toText(body.price_name);
  const currency = toText(body.currency);
  if (language) data.language = language;
  if (productId) data.product_id = productId;
  if (priceName) data.price_name = priceName;
  if (currency) data.currency = currency;
  if (page) data.page = page;

  return { name: PURCHASE_EVENT_NAME, url: page ?? PURCHASE_FALLBACK_URL, data };
}

// Easytools documents no webhook signature, so the webhook URL carries a shared `token`
// query parameter. With no expected token configured, every call is rejected.
export function isAuthorizedWebhook(requestUrl: string | URL, expectedToken: unknown): boolean {
  if (typeof expectedToken !== 'string' || expectedToken === '') return false;
  let token: string | null;
  try {
    token = new URL(requestUrl).searchParams.get('token');
  } catch {
    return false;
  }
  return token === expectedToken;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toText(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
}

// Accepts a number or a numeric string, in case the amount arrives as text.
function toNumber(value: unknown): number | undefined {
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}
