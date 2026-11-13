import { test, expect, type Page } from '@playwright/test';
import { CONSENT_REVISION } from '../../src/lib/consent-config';
import { hasMarketingConsent } from '../../src/lib/consent-cookie';
import { blockDataSending } from '../consent/consent-helpers';

// The Meta route sends an event only when the request's own banner cookie accepts marketing.
// Here the beacons are caught in the browser (the dev server holds the real Meta token), and
// the cookie each one carries is checked with the same function the route uses.

interface CapiCall {
  body: { event_name?: string; event_id?: string; custom_data?: Record<string, unknown> };
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

// An English landing page, where the ads run; every landing page has the same hero video.
const VIDEO_PAGE = '/en/free-homepage-ux-audit-skill/';
const heroVideo = (page: Page) => page.locator('[data-wistia-trigger]');
const viewContents = (calls: CapiCall[]) => calls.filter((c) => c.body.event_name === 'ViewContent');

test('meta consent: after "Accept all" a hero video click sends one view content for the video', async ({ page }) => {
  const calls = await catchCapi(page);
  await page.goto(VIDEO_PAGE);
  await banner(page).getByRole('button', { name: 'Accept all', exact: true }).click();
  await expect.poll(() => calls().filter((c) => c.body.event_name === 'PageView').length).toBe(1);

  await heroVideo(page).click();
  await expect.poll(() => viewContents(calls()).length).toBe(1);
  // A second event from the same click would arrive right after the first.
  await page.waitForTimeout(500);
  const sent = viewContents(calls());
  expect(sent).toHaveLength(1);
  expect(sent[0].body.custom_data).toEqual({ content_name: 'hero_video' });
  expect(hasMarketingConsent(sent[0].cookie, CONSENT_REVISION)).toBe(true);
});

test('meta consent: after "Reject all" a hero video click sends nothing', async ({ page }) => {
  const calls = await catchCapi(page);
  await page.goto(VIDEO_PAGE);
  await banner(page).getByRole('button', { name: 'Reject all', exact: true }).click();
  await expect(banner(page)).toBeHidden();

  await heroVideo(page).click();
  // The click reached the page: the trigger has started loading the player.
  await expect(page.locator('script[src="https://fast.wistia.com/player.js"]')).toHaveCount(1);
  await page.waitForTimeout(500);
  expect(calls()).toEqual([]);
});

// The sample cards send view content through the same consent-gated helper; each opens its example in a new tab.
const sampleCard = (page: Page) => page.locator('a[data-umami-click="Sample output"][data-track="ViewContent"]').first();

async function clickSampleCard(page: Page) {
  const opened = page.context().waitForEvent('page');
  await sampleCard(page).click();
  await (await opened).close();
}

test('meta consent: after "Accept all" a sample card click sends one view content for that card', async ({ page }) => {
  const calls = await catchCapi(page);
  await page.goto(VIDEO_PAGE);
  await banner(page).getByRole('button', { name: 'Accept all', exact: true }).click();
  await expect.poll(() => calls().filter((c) => c.body.event_name === 'PageView').length).toBe(1);

  const contentName = await sampleCard(page).getAttribute('data-track-content_name');
  expect(contentName).toBeTruthy();
  await clickSampleCard(page);
  await expect.poll(() => viewContents(calls()).length).toBe(1);
  await page.waitForTimeout(500);
  const sent = viewContents(calls());
  expect(sent).toHaveLength(1);
  expect(sent[0].body.custom_data?.content_name).toBe(contentName);
  expect(hasMarketingConsent(sent[0].cookie, CONSENT_REVISION)).toBe(true);
});

test('meta consent: after "Reject all" a sample card click sends nothing', async ({ page }) => {
  const calls = await catchCapi(page);
  await page.goto(VIDEO_PAGE);
  await banner(page).getByRole('button', { name: 'Reject all', exact: true }).click();
  await expect(banner(page)).toBeHidden();

  await clickSampleCard(page);
  await page.waitForTimeout(500);
  expect(calls()).toEqual([]);
});

declare global {
  interface Window {
    trackConversion?: (eventName: string, params?: Record<string, unknown>) => void;
  }
}
