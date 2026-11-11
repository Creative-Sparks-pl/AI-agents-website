import { test, expect, type Page, type BrowserContext } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { CONSENT_REVISION } from '../../src/lib/consent-config';
import { summarize as summarizeViolations } from '../screenshots/helpers';

// The cookie banner on a fresh visit: language, equal-weight buttons, the stored choice,
// the footer link, no overlay, revision handling, and no outside consent service.
//
// Safety: the dev server holds the real Meta token and (once set) the real consent database,
// so every /api/ request is answered inside the browser and never reaches a server.

const CONSENT_SERVICE_HOSTS = /cookiebot|cookielaw|onetrust|usercentrics|consentmanager|iubenda|termly|cookieyes|osano|didomi/i;
const TRACKER_HOSTS = /connect\.facebook\.net|facebook\.com\/tr|\.posthog\.com|pipedream\.wistia\.com|distillery\.wistia\.com|\.litix\.io/;

interface StoredConsent {
  categories: string[];
  revision: number;
  consentId: string;
}

async function prepare(page: Page): Promise<string[]> {
  // The library hides its banner from automated browsers (`hideFromBots`); look like a person.
  await page.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));

  const requested: string[] = [];
  page.on('request', (request) => requested.push(request.url()));

  await page.route(/^https?:\/\/[^/]+\/api\//, (route) => route.fulfill({ status: 204, body: '' }));
  await page.route(TRACKER_HOSTS, (route) => route.abort());
  await page.route(CONSENT_SERVICE_HOSTS, (route) => route.abort());
  return requested;
}

async function storedConsent(context: BrowserContext): Promise<StoredConsent | undefined> {
  const cookie = (await context.cookies()).find((c) => c.name === 'cc_cookie');
  return cookie ? (JSON.parse(decodeURIComponent(cookie.value)) as StoredConsent) : undefined;
}

const banner = (page: Page) => page.locator('#cc-main .cm');
const preferences = (page: Page) => page.locator('#cc-main .pm');
const bannerButton = (page: Page, name: string) => banner(page).getByRole('button', { name, exact: true });

const LANGUAGES = [
  {
    path: '/ux-design-skill/',
    title: 'Ta strona używa plików cookies',
    acceptAll: 'Akceptuj wszystkie',
    rejectAll: 'Odrzuć wszystkie',
    settings: 'Ustawienia',
    footerLink: 'Ustawienia cookies',
    foreign: ['This site uses cookies', 'Accept all', 'Reject all'],
  },
  {
    path: '/en/ux-design-skill/',
    title: 'This site uses cookies',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    settings: 'Settings',
    footerLink: 'Cookie settings',
    foreign: ['Ta strona używa plików cookies', 'Akceptuj wszystkie', 'Odrzuć wszystkie'],
  },
];

for (const lang of LANGUAGES) {
  test.describe(`cookie banner on ${lang.path}`, () => {
    test('shows in the page language on a fresh visit, with equal-weight choices', async ({ page }) => {
      await prepare(page);
      await page.goto(lang.path);

      await expect(banner(page)).toBeVisible();
      await expect(banner(page)).toContainText(lang.title);
      for (const text of lang.foreign) await expect(banner(page)).not.toContainText(text);

      const accept = await bannerButton(page, lang.acceptAll).boundingBox();
      const reject = await bannerButton(page, lang.rejectAll).boundingBox();
      expect(accept && reject).toBeTruthy();
      expect(Math.abs(accept!.width - reject!.width)).toBeLessThanOrEqual(1);
      expect(Math.abs(accept!.height - reject!.height)).toBeLessThanOrEqual(1);
      await expect(bannerButton(page, lang.settings)).toBeVisible();

      // Same style for both: neither choice is visually favoured.
      const style = (name: string) =>
        bannerButton(page, name).evaluate((el) => {
          const s = getComputedStyle(el);
          return [s.backgroundColor, s.color, s.borderColor, s.fontWeight].join('|');
        });
      expect(await style(lang.acceptAll)).toBe(await style(lang.rejectAll));
    });

    test('Reject all stores necessary only and closes the banner', async ({ page, context }) => {
      await prepare(page);
      await page.goto(lang.path);
      await bannerButton(page, lang.rejectAll).click();

      await expect(banner(page)).toBeHidden();
      await expect.poll(async () => (await storedConsent(context))?.categories).toEqual(['necessary']);
      expect((await storedConsent(context))?.revision).toBe(CONSENT_REVISION);
    });

    test('Accept all stores every category and closes the banner', async ({ page, context }) => {
      await prepare(page);
      await page.goto(lang.path);
      await bannerButton(page, lang.acceptAll).click();

      await expect(banner(page)).toBeHidden();
      await expect
        .poll(async () => [...((await storedConsent(context))?.categories ?? [])].sort())
        .toEqual(['marketing', 'necessary', 'statistics']);
    });

    test('the footer link reopens the preferences window', async ({ page }) => {
      await prepare(page);
      await page.goto(lang.path);
      await bannerButton(page, lang.rejectAll).click();
      await expect(banner(page)).toBeHidden();

      await page.locator('footer').getByRole('link', { name: lang.footerLink, exact: true }).click();
      await expect(preferences(page)).toBeVisible();
      expect(new URL(page.url()).hash).toBe('');
    });

    test('the page behind the banner stays usable (no overlay)', async ({ page }) => {
      await prepare(page);
      await page.goto(lang.path);
      await expect(banner(page)).toBeVisible();

      expect(await page.evaluate(() => document.documentElement.classList.contains('disable--interaction'))).toBe(false);
      // A point well above the banner belongs to the page, not to the consent layer.
      const topElementIsPage = await page.evaluate(() => {
        const el = document.elementFromPoint(window.innerWidth / 2, 80);
        return !!el && !el.closest('#cc-main');
      });
      expect(topElementIsPage).toBe(true);
    });

    test('a choice made under an older revision brings the banner back; a current one does not', async ({ page, context }) => {
      await prepare(page);
      const url = new URL(lang.path, test.info().project.use.baseURL);
      const choice = (revision: number) => ({
        name: 'cc_cookie',
        value: encodeURIComponent(
          JSON.stringify({
            categories: ['necessary'],
            revision,
            data: null,
            consentTimestamp: new Date().toISOString(),
            consentId: '3f9c2a1e-7b4d-4c8e-9a2f-1d5e6b7c8a90',
            services: { necessary: [], statistics: [], marketing: [] },
            languageCode: lang.path.startsWith('/en/') ? 'en' : 'pl',
            lastConsentTimestamp: new Date().toISOString(),
            expirationTime: Date.now() + 182 * 24 * 3600 * 1000,
          }),
        ),
        domain: url.hostname,
        path: '/',
      });

      await context.addCookies([choice(CONSENT_REVISION)]);
      await page.goto(lang.path);
      await page.waitForFunction(() => !!window.CookieConsent);
      await expect(banner(page)).toBeHidden();

      await context.clearCookies();
      await context.addCookies([choice(CONSENT_REVISION - 1)]);
      await page.goto(lang.path);
      await expect(banner(page)).toBeVisible();
    });

    test('the banner and the preferences window pass axe', async ({ page }) => {
      await prepare(page);
      await page.goto(lang.path);
      await expect(banner(page)).toBeVisible();
      const scan = async () =>
        summarizeViolations((await new AxeBuilder({ page }).include('#cc-main').analyze()).violations);
      expect(await scan()).toEqual([]);

      await bannerButton(page, lang.settings).click();
      await expect(preferences(page)).toBeVisible();
      expect(await scan()).toEqual([]);
    });

    test('loads the library from this site and nothing from a consent service', async ({ page }) => {
      const requested = await prepare(page);
      await page.goto(lang.path);
      await expect(banner(page)).toBeVisible();
      await bannerButton(page, lang.acceptAll).click();
      await expect(banner(page)).toBeHidden();

      const origin = new URL(page.url()).origin;
      expect(requested.filter((url) => CONSENT_SERVICE_HOSTS.test(new URL(url).hostname))).toEqual([]);
      expect(requested.filter((url) => /cookieconsent/i.test(url) && !url.startsWith(origin))).toEqual([]);

      // The banner code is part of this site's own bundle.
      const scripts = await page.evaluate(() =>
        performance
          .getEntriesByType('resource')
          .filter((entry) => (entry as PerformanceResourceTiming).initiatorType === 'script')
          .map((entry) => entry.name),
      );
      const ownBundles = scripts.filter((src) => src.startsWith(origin));
      expect(ownBundles.length).toBeGreaterThan(0);
      expect(await page.evaluate(() => typeof window.CookieConsent?.run)).toBe('function');
    });
  });
}
