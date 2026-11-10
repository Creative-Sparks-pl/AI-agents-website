import { test, expect, type Page } from '@playwright/test';
import { blockThirdParty } from '../screenshots/helpers';

// The real Umami script is blocked and replaced by a recorder, and /api/subscribe is mocked,
// so these tests never count a visit or send a real signup.
const FAKE_DOWNLOAD = 'https://downloads.test/skill.zip';
const EMAIL = 'funnel.check.4821@example.com';
const STARTED = 'Free skill form started';
const SUBMIT_PREFIX = 'Free skill submit: ';

const CASES = [
  { path: '/free-website-planning-skill/', language: 'pl', skill: 'planning', surface: 'free_planning_skill_hero' },
  { path: '/en/free-homepage-ux-audit-skill/', language: 'en', skill: 'audit', surface: 'free_audit_skill_hero' },
];

// Plans in the order the pricing section shows them.
const CHECKOUT_CASES = [
  { path: '/ux-design-skill/', language: 'pl', plans: ['Solo', 'Studio', 'Agencja'] },
  { path: '/en/ux-design-skill/', language: 'en', plans: ['Solo', 'Studio', 'Agency'] },
];

type UmamiCall = unknown[];

/** Puts a recorder in place of Umami before any page script runs; returns a reader for what it caught. */
async function recordUmami(page: Page) {
  await page.addInitScript(() => {
    const calls: unknown[][] = [];
    Object.assign(window, {
      __umamiCalls: calls,
      umami: { track: (...args: unknown[]) => { calls.push(args); } },
    });
  });
  return () => page.evaluate(() => (window as unknown as { __umamiCalls: UmamiCall[] }).__umamiCalls);
}

/** Answers the form's request with a success and records what it sent. */
async function mockSubscribe(page: Page) {
  const requests: Array<Record<string, string>> = [];
  // Every other API call is refused, so a form pointed at a new URL fails here instead of sending a real signup.
  // Playwright tries the newest route first, so this one only catches what the mock below does not.
  await page.route(/^https?:\/\/[^/]+\/api\//, (route) => route.abort());
  await page.route('**/api/subscribe', async (route) => {
    requests.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, downloadUrl: FAKE_DOWNLOAD }),
    });
  });
  // The real link answers as a file download, which keeps the visitor on the page; this does the same.
  await page.route(`${FAKE_DOWNLOAD}*`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/zip',
      headers: { 'Content-Disposition': 'attachment; filename="skill.zip"' },
      body: 'zip',
    }),
  );
  return requests;
}

for (const { path, language, skill, surface } of CASES) {
  test(`umami ${path} ${surface}: form started once, submit once, labels only`, async ({ page }) => {
    await blockThirdParty(page);
    const umamiCalls = await recordUmami(page);
    const requests = await mockSubscribe(page);

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('networkidle');
    await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });

    const form = page.locator(`.free-skill-form[data-surface="${surface}"]`);
    await expect(form).toHaveAttribute('data-skill', skill);
    await expect(form).toHaveAttribute('data-locale', language);

    // One keystroke at a time, so the started event has many chances to fire more than once.
    await form.locator('input[name="email"]').pressSequentially(EMAIL);
    await form.locator('button[type="submit"]').click();
    await expect(form).toHaveAttribute('data-state', 'success');
    expect(requests).toHaveLength(1);

    const expected = { skill, language, surface, page: path };
    const calls = await umamiCalls();

    expect(calls.filter(([name]) => name === STARTED)).toEqual([[STARTED, expected]]);
    expect(calls.filter(([name]) => String(name).startsWith(SUBMIT_PREFIX))).toEqual([
      [`${SUBMIT_PREFIX}${surface}`, expected],
    ]);

    // Nothing the visitor typed may reach analytics, not even the part before the @.
    const serialized = JSON.stringify(calls);
    expect(serialized).not.toContain(EMAIL);
    expect(serialized).not.toContain(EMAIL.split('@')[0]);
  });
}

for (const { path, language, plans } of CHECKOUT_CASES) {
  test(`umami ${path} pricing: checkout links carry plan, language and page`, async ({ page }) => {
    await blockThirdParty(page);

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    const links = page.locator('a[data-umami-event="Pricing CTA"]');
    await expect(links).toHaveCount(plans.length);

    for (const [i, plan] of plans.entries()) {
      const link = links.nth(i);
      await expect(link).toHaveAttribute('data-umami-event-plan', plan);
      await expect(link).toHaveAttribute('data-umami-event-language', language);
      await expect(link).toHaveAttribute('data-umami-event-page', path);

      // The purchase webhook reports the sale on the page it finds in `page`, so it must sit beside `lang`.
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
      const checkout = new URL(href!);
      expect(checkout.host).toBe('cart.creativesparks.pl');
      expect(checkout.searchParams.get('lang')).toBe(language);
      expect(checkout.searchParams.get('page')).toBe(path);
    }
  });
}
