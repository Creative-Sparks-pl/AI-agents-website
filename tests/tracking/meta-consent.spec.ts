import { test, expect, type Page } from '@playwright/test';
import { CONSENT_REVISION } from '../../src/lib/consent-config';
import { hasMarketingConsent } from '../../src/lib/consent-cookie';
import { blockDataSending } from '../consent/consent-helpers';

// The Meta route sends an event only when the request's own banner cookie accepts marketing.
// Here the beacons are caught in the browser (the dev server holds the real Meta token), and
// the cookie each one carries is checked with the same function the route uses.

interface CapiCall {
  body: { event_name?: string; event_id?: string };
  cookie: string;
}

async function catchCapi(page: Page): Promise<() => CapiCall[]> {
  await blockDataSending(page);
  await page.route(/^https?:\/\/connect\.facebook\.net\//, (route) => route.abort());
  const calls: CapiCall[] = [];
  // Registered after the shared blocker, so it is the handler that answers /api/meta-capi.
  await page.route('**/api/meta-capi', async (route) => {
    const request = route.request();
    const headers = await request.allHeaders();
    calls.push({ body: JSON.parse(request.postData() ?? '{}'), cookie: headers.cookie ?? '' });
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  return () => [...calls];
}

const banner = (page: Page) => page.locator('#cc-main .cm');

test('meta consent: the page view sent right after "Accept all" carries a cookie the route accepts', async ({ page }) => {
  const calls = await catchCapi(page);
  await page.goto('/ux-design-skill/');
  await expect(banner(page)).toBeVisible();
  await page.waitForLoadState('networkidle');
  expect(calls(), 'nothing is sent before a choice').toEqual([]);

  await banner(page).getByRole('button', { name: 'Akceptuj wszystkie', exact: true }).click();

  await expect.poll(() => calls().filter((c) => c.body.event_name === 'PageView').length).toBe(1);
  const [pageView] = calls().filter((c) => c.body.event_name === 'PageView');
  expect(pageView.cookie).toContain('cc_cookie=');
  expect(hasMarketingConsent(pageView.cookie, CONSENT_REVISION)).toBe(true);
});

test('meta consent: after "Reject all" no event is sent, and a forced call would be refused', async ({ page }) => {
  const calls = await catchCapi(page);
  await page.goto('/ux-design-skill/');
  await banner(page).getByRole('button', { name: 'Odrzuć wszystkie', exact: true }).click();
  await expect(banner(page)).toBeHidden();
  await page.waitForTimeout(500);
  expect(calls()).toEqual([]);

  // A page view forced past the browser check still carries the refusing cookie.
  await page.evaluate(() => window.trackConversion?.('PageView', {}));
  await page.evaluate(() =>
    navigator.sendBeacon('/api/meta-capi', new Blob([JSON.stringify({ event_name: 'PageView', event_id: 'forced' })], { type: 'application/json' })),
  );
  await expect.poll(() => calls().length).toBe(1);
  expect(hasMarketingConsent(calls()[0].cookie, CONSENT_REVISION)).toBe(false);
});

declare global {
  interface Window {
    trackConversion?: (eventName: string, params?: Record<string, unknown>) => void;
  }
}
