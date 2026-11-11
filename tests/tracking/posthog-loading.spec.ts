import { test, expect, type Page } from '@playwright/test';
import { blockDataSending, setConsent } from '../consent/consent-helpers';

// PostHog records sessions, so it may only load on the landing pages and only after
// statistics consent in the cookie banner. Every request to PostHog is aborted here.
const PROJECT_KEY = 'phc_xJEvm2rFYcD3VKe3BQb2zPpAaWqVZRe7zBqYUwhsgG5t';
const POSTHOG_HOST = /(^|\.)posthog\.com$/;

const LANDING_PAGES = [
  '/ux-design-skill/',
  '/en/ux-design-skill/',
  '/free-homepage-ux-audit-skill/',
  '/en/free-homepage-ux-audit-skill/',
  '/free-website-planning-skill/',
  '/en/free-website-planning-skill/',
];

const PAGES_WITHOUT_POSTHOG = [
  '/ux-design-skill/regulamin/',
  '/en/ux-design-skill/terms/',
  '/ux-design-skill/changelog/',
  '/en/ux-design-skill/changelog/',
];

type ScriptInfo = { type: string | null; category: string | null; service: string | null; src: string | null; text: string };

/** Opens the page; returns every script that mentions PostHog and every request to a PostHog host. */
async function open(page: Page, path: string) {
  // The request event fires before routing, so a PostHog request counts here even though it is aborted.
  const postHogRequests: string[] = [];
  page.on('request', (request) => {
    if (POSTHOG_HOST.test(new URL(request.url()).hostname)) postHogRequests.push(request.url());
  });
  await blockDataSending(page);
  await page.route(/^https?:\/\/[^/]*posthog\.com\//, (route) => route.abort());

  const response = await page.goto(path, { waitUntil: 'load' });
  expect(response?.status()).toBe(200);
  await page.waitForLoadState('networkidle');

  const scripts: ScriptInfo[] = await page.locator('script').evaluateAll((elements) =>
    elements.map((el) => ({
      type: el.getAttribute('type'),
      category: el.getAttribute('data-category'),
      service: el.getAttribute('data-service'),
      src: el.getAttribute('src'),
      text: el.textContent ?? '',
    })),
  );
  // The banner's JSON configuration names PostHog in its cookie list; it is data, not a script.
  const postHogScripts = scripts.filter(
    ({ type, src, text }) => type !== 'application/json' && /posthog/i.test(`${src ?? ''} ${text}`),
  );
  return { postHogScripts, postHogRequests };
}

for (const path of LANDING_PAGES) {
  test(`posthog ${path}: one statistics-gated snippet, inputs masked, nothing sent without consent`, async ({ page }) => {
    const { postHogScripts, postHogRequests } = await open(page, path);

    expect(postHogScripts, 'scripts mentioning PostHog').toHaveLength(1);
    const [snippet] = postHogScripts;
    expect(snippet.type).toBe('text/plain');
    expect(snippet.category).toBe('statistics');
    expect(snippet.service).toBe('posthog');
    expect(snippet.text).toContain(`posthog.init('${PROJECT_KEY}'`);
    expect(snippet.text).toMatch(/session_recording:\s*\{\s*maskAllInputs:\s*true\s*\}/);

    // Without consent the snippet stays inert text: no stub on window, no request to PostHog.
    expect(await page.evaluate(() => 'posthog' in window)).toBe(false);
    expect(postHogRequests).toEqual([]);
  });

  test(`posthog ${path}: with statistics consent PostHog loads`, async ({ page, context, baseURL }) => {
    await setConsent(context, baseURL!, ['statistics']);
    const { postHogRequests } = await open(page, path);

    await expect.poll(() => page.evaluate(() => 'posthog' in window)).toBe(true);
    await expect.poll(() => postHogRequests.some((url) => url.includes('/static/array.js'))).toBe(true);
  });
}

test('posthog: marketing consent alone does not load PostHog', async ({ page, context, baseURL }) => {
  await setConsent(context, baseURL!, ['marketing']);
  const { postHogRequests } = await open(page, LANDING_PAGES[0]);

  expect(await page.evaluate(() => 'posthog' in window)).toBe(false);
  expect(postHogRequests).toEqual([]);
});

for (const path of PAGES_WITHOUT_POSTHOG) {
  test(`posthog ${path}: no snippet and nothing sent, even with statistics consent`, async ({ page, context, baseURL }) => {
    await setConsent(context, baseURL!, ['statistics']);
    const { postHogScripts, postHogRequests } = await open(page, path);

    expect(postHogScripts).toEqual([]);
    expect(postHogRequests).toEqual([]);
  });
}
