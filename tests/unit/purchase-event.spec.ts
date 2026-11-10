import { test, expect } from '@playwright/test';
import { isAuthorizedWebhook, toPurchaseEvent } from '../../src/lib/purchase-event';

// Shaped like Easytools' documented `single_product_bought` sample.
const PAID_PURCHASE = {
  event: 'single_product_bought',
  success: true,
  amount_paid: 129,
  order_amount: 129,
  currency: 'pln',
  quantity: 1,
  lang: 'pl',
  customer_name: 'Jan Kowalski',
  customer_email: 'jan.kowalski@example.com',
  customer_id: 'cus_8f2a1c',
  order_id: 'ord_51b7e9',
  product_id: 'prod_ux_design_skill',
  product_name: 'UX Design Skill',
  price_id: 'price_standard',
  price_name: 'Standard',
  custom_params: {},
  ref: null,
};

test.describe('toPurchaseEvent', () => {
  test('a paid single_product_bought becomes a Purchase event', () => {
    expect(toPurchaseEvent(PAID_PURCHASE)).toEqual({
      name: 'Purchase',
      url: '/purchase',
      data: {
        language: 'pl',
        product_id: 'prod_ux_design_skill',
        price_name: 'Standard',
        amount: 129,
        currency: 'pln',
      },
    });
  });

  test('a zero amount is not counted', () => {
    expect(toPurchaseEvent({ ...PAID_PURCHASE, amount_paid: 0 })).toBeNull();
  });

  test('product_assigned is not counted', () => {
    expect(toPurchaseEvent({ ...PAID_PURCHASE, event: 'product_assigned' })).toBeNull();
  });

  test('a missing or non-numeric amount is not counted', () => {
    expect(toPurchaseEvent({ ...PAID_PURCHASE, amount_paid: undefined })).toBeNull();
    expect(toPurchaseEvent({ ...PAID_PURCHASE, amount_paid: 'free' })).toBeNull();
  });

  test('a body that is not an object is not counted', () => {
    expect(toPurchaseEvent(null)).toBeNull();
    expect(toPurchaseEvent('single_product_bought')).toBeNull();
    expect(toPurchaseEvent([PAID_PURCHASE])).toBeNull();
  });

  test('the event holds no personal data', () => {
    const serialized = JSON.stringify(toPurchaseEvent(PAID_PURCHASE));
    expect(serialized).not.toContain('customer_email');
    expect(serialized).not.toContain('customer_name');
    expect(serialized).not.toContain('customer_id');
    expect(serialized).not.toContain('order_id');
    expect(serialized).not.toContain(PAID_PURCHASE.customer_email);
    expect(serialized).not.toContain(PAID_PURCHASE.customer_name);
    expect(serialized).not.toContain('@');
  });

  test('custom_params.page becomes the event page and URL', () => {
    const event = toPurchaseEvent({
      ...PAID_PURCHASE,
      custom_params: { page: '/en/ux-design-skill/' },
    });
    expect(event?.data.page).toBe('/en/ux-design-skill/');
    expect(event?.url).toBe('/en/ux-design-skill/');
  });

  test('an empty custom_params.page falls back to /purchase', () => {
    const event = toPurchaseEvent({ ...PAID_PURCHASE, custom_params: { page: '' } });
    expect(event?.data.page).toBeUndefined();
    expect(event?.url).toBe('/purchase');
  });
});

test.describe('isAuthorizedWebhook', () => {
  const URL_WITH_TOKEN = 'https://agents.creativesparks.pl/api/easytools-webhook?token=s3cret';

  test('rejects every call when no token is configured', () => {
    expect(isAuthorizedWebhook(URL_WITH_TOKEN, undefined)).toBe(false);
    expect(isAuthorizedWebhook(URL_WITH_TOKEN, '')).toBe(false);
    expect(isAuthorizedWebhook('https://agents.creativesparks.pl/api/easytools-webhook?token=', '')).toBe(
      false,
    );
  });

  test('rejects a wrong or missing token', () => {
    expect(isAuthorizedWebhook(URL_WITH_TOKEN, 'other')).toBe(false);
    expect(isAuthorizedWebhook('https://agents.creativesparks.pl/api/easytools-webhook', 's3cret')).toBe(
      false,
    );
  });

  test('accepts the right token', () => {
    expect(isAuthorizedWebhook(URL_WITH_TOKEN, 's3cret')).toBe(true);
    expect(isAuthorizedWebhook(new URL(URL_WITH_TOKEN), 's3cret')).toBe(true);
  });
});

// The dev server has no EASYTOOLS_WEBHOOK_TOKEN, so every call must be rejected before anything is sent.
// JSON bodies keep Astro's cross-site form check out of the way, so the 401 comes from the route.
test.describe('POST /api/easytools-webhook', () => {
  test('rejects a call without a token', async ({ request }) => {
    const response = await request.post('/api/easytools-webhook', { data: PAID_PURCHASE });
    expect(response.status()).toBe(401);
  });

  test('rejects a call with a wrong token', async ({ request }) => {
    const response = await request.post('/api/easytools-webhook?token=wrong', { data: PAID_PURCHASE });
    expect(response.status()).toBe(401);
  });
});
