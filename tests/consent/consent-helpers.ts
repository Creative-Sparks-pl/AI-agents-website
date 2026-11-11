import { readFileSync } from 'node:fs';
import type { BrowserContext, Page } from '@playwright/test';
import { load } from 'js-yaml';
import { CONSENT_COOKIE_NAME, CONSENT_REVISION, consentContentSchema, type ConsentContent } from '../../src/lib/consent-config';
import type { ConsentCategory } from '../../src/lib/consent-record';

/** A language's consent content (banner text and cookie list), validated like the build does. */
export function consentContent(language: 'pl' | 'en'): ConsentContent {
  return consentContentSchema.parse(load(readFileSync(`src/content/consent/${language}.yaml`, 'utf8')));
}

// Shared by every consent, tracking and cookie-check test.
//
// The local dev server holds the real Meta token and the real consent database, so the
// site's own /api/meta-capi and /api/consent are answered inside the browser and never
// reach a server. Outside services' data-sending endpoints are aborted, so no run counts
// as a visit, sends an event or writes a record. Their scripts may still load.

/** Requests that would send data somewhere: aborted. */
export const DATA_SENDING = [
  /^https?:\/\/[^/]*facebook\.com\/tr/, // Meta Pixel events
  /^https?:\/\/[^/]+\.(ecs\.[a-z0-9-]+\.on\.aws|cloud\.run)\//, // Meta's Conversions API Gateway
  /^https?:\/\/(eu|us|app)\.i\.posthog\.com\//, // PostHog ingestion (scripts come from *-assets)
  /^https?:\/\/analytics\.creativesparks\.pl\/api\//, // Umami's send endpoint
  /^https?:\/\/(pipedream|distillery)\.wistia\.com\//, // Wistia viewing statistics
  /^https?:\/\/[^/]+\.litix\.io\//, // Mux Data, used by Wistia's player
  /^https?:\/\/[^/]+\.ingest\.[a-z.]*sentry\.io\//, // the player's error reports
];

export interface ConsentTraffic {
  /** Bodies the page sent to /api/meta-capi, answered in the browser. */
  metaBeacons: () => Record<string, unknown>[];
  /** Bodies the page sent to /api/consent, answered in the browser. */
  consentRecords: () => Record<string, unknown>[];
  /** Data-sending requests that were aborted. */
  aborted: () => string[];
}

/**
 * Makes the browser look like a visitor (the banner and PostHog both ignore automated
 * browsers), answers the site's own beacons in the browser and aborts data-sending requests.
 * `consentStatus` sets what /api/consent answers, e.g. 503 to test a failing route.
 */
export async function blockDataSending(page: Page, options: { consentStatus?: number } = {}): Promise<ConsentTraffic> {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    const brands = (navigator as Navigator & { userAgentData?: { brands?: { brand: string }[] } }).userAgentData?.brands;
    if (brands) for (const entry of brands) entry.brand = entry.brand.replace('HeadlessChrome', 'Google Chrome');
  });

  const metaBeacons: Record<string, unknown>[] = [];
  const consentRecords: Record<string, unknown>[] = [];
  const aborted: string[] = [];

  for (const pattern of DATA_SENDING) {
    await page.route(pattern, (route) => {
      aborted.push(route.request().url());
      return route.abort();
    });
  }

  // Astro's dev toolbar can ask for a stale dependency, which makes Vite reload the page mid-test.
  await page.route(/\/dev-toolbar\//, (route) => route.abort());

  // Registered last, so it wins over a test's broader /api/ rule for these two routes.
  await page.route(/^https?:\/\/[^/]+\/api\/(meta-capi|consent)(\?|$)/, async (route) => {
    const request = route.request();
    const body = request.postData() ?? '';
    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(body);
    } catch {
      parsed = { raw: body };
    }
    if (request.url().includes('/api/meta-capi')) {
      metaBeacons.push(parsed);
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    }
    consentRecords.push(parsed);
    return route.fulfill({ status: options.consentStatus ?? 204, body: '' });
  });

  return {
    metaBeacons: () => [...metaBeacons],
    consentRecords: () => [...consentRecords],
    aborted: () => [...aborted],
  };
}

/**
 * Waits until the banner (or another consent window) is shown and its fade-in has finished,
 * so measurements such as colour contrast see its final state.
 */
export async function waitForBannerSettled(page: Page, selector = '#cc-main .cm') {
  await page.locator(selector).waitFor({ state: 'visible' });
  await page.waitForFunction(
    (sel) => {
      const el = document.querySelector(sel);
      return (
        !!el &&
        getComputedStyle(el).opacity === '1' &&
        el.getAnimations({ subtree: true }).every((animation) => animation.playState !== 'running')
      );
    },
    selector,
  );
}

/** Writes the banner's cookie as if the visitor had chosen `accepted`, under the current revision. */
export async function setConsent(context: BrowserContext, baseURL: string, accepted: ConsentCategory[]) {
  await context.addCookies([
    { name: CONSENT_COOKIE_NAME, value: consentCookieValue(accepted), domain: new URL(baseURL).hostname, path: '/' },
  ]);
}

/** Same as `setConsent`, from inside the page, for helpers that only hold a page and a relative path. */
export async function presetConsentInPage(page: Page, accepted: ConsentCategory[]) {
  await page.addInitScript(
    ({ name, value }) => {
      if (!document.cookie.split('; ').some((pair) => pair.startsWith(`${name}=`))) {
        document.cookie = `${name}=${value}; path=/; max-age=${182 * 24 * 3600}; samesite=lax`;
      }
    },
    { name: CONSENT_COOKIE_NAME, value: consentCookieValue(accepted) },
  );
}

/** The banner's cookie value (URI-encoded JSON, as the library writes it) for a given choice. */
export function consentCookieValue(accepted: ConsentCategory[]): string {
  const categories = ['necessary', ...accepted.filter((category) => category !== 'necessary')];
  // The library runs a script tagged with a service only when the cookie lists that service.
  const servicesOf = (category: ConsentCategory) =>
    categories.includes(category)
      ? consentContent('pl').cookies.filter((entry) => entry.category === category).map((entry) => entry.id)
      : [];
  const now = new Date();
  const value = {
    categories,
    revision: CONSENT_REVISION,
    data: null,
    consentTimestamp: now.toISOString(),
    consentId: '3f9c2a1e-7b4d-4c8e-9a2f-1d5e6b7c8a90',
    services: { necessary: [], statistics: servicesOf('statistics'), marketing: servicesOf('marketing') },
    languageCode: 'pl',
    lastConsentTimestamp: now.toISOString(),
    expirationTime: now.getTime() + 182 * 24 * 3600 * 1000,
  };
  return encodeURIComponent(JSON.stringify(value));
}
