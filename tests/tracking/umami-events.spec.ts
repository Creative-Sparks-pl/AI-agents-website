import { test, expect, type Page } from '@playwright/test';
import { blockThirdParty } from '../screenshots/helpers';

// The real Umami script is blocked and replaced by a recorder, and /api/subscribe is mocked,
// so these tests never count a visit or send a real signup.
const FAKE_DOWNLOAD = 'https://downloads.test/skill.zip';
const EMAIL = 'funnel.check.4821@example.com';
const STARTED = 'Free skill form started';
const SUBMIT_PREFIX = 'Free skill submit: ';
const SEEN = 'Free skill form seen';
const SUBMIT_ERROR = 'Free skill submit error';

// Each page has a hero form and a final form near the bottom.
const CASES = [
  {
    path: '/free-website-planning-skill/',
    language: 'pl',
    skill: 'planning',
    surface: 'free_planning_skill_hero',
    finalSurface: 'free_planning_skill_final',
  },
  {
    path: '/en/free-homepage-ux-audit-skill/',
    language: 'en',
    skill: 'audit',
    surface: 'free_audit_skill_hero',
    finalSurface: 'free_audit_skill_final',
  },
];

// A failed request: the status and code /api/subscribe answers with, or no answer at all.
type Failure = { status: number; code: string } | 'network';

// Each way a submit can fail and the reason the form reports. `typed` fails the form's own email check,
// so no request is sent.
const ERROR_CASES: Array<{ name: string; typed: string; failure?: Failure; reason: string }> = [
  { name: 'email check in the form', typed: 'funnel.check.4821@example', reason: 'invalid_email' },
  { name: 'server email check (422)', typed: EMAIL, failure: { status: 422, code: 'invalid_email' }, reason: 'invalid_email' },
  { name: 'signups unavailable (503)', typed: EMAIL, failure: { status: 503, code: 'not_configured' }, reason: 'not_configured' },
  { name: 'server failure (500)', typed: EMAIL, failure: { status: 500, code: 'internal_error' }, reason: 'server_error' },
  { name: 'no connection', typed: EMAIL, failure: 'network', reason: 'offline' },
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

/** Answers the form's request with a success, or with the given failure, and records what it sent. */
async function mockSubscribe(page: Page, failure?: Failure) {
  const requests: Array<Record<string, string>> = [];
  // Every other API call is refused, so a form pointed at a new URL fails here instead of sending a real signup.
  // Playwright tries the newest route first, so this one only catches what the mock below does not.
  await page.route(/^https?:\/\/[^/]+\/api\//, (route) => route.abort());
  await page.route('**/api/subscribe', async (route) => {
    requests.push(route.request().postDataJSON());
    if (failure === 'network') {
      await route.abort('internetdisconnected');
      return;
    }
    await route.fulfill({
      status: failure ? failure.status : 200,
      contentType: 'application/json',
      body: JSON.stringify(failure ? { ok: false, reason: failure.code } : { ok: true, downloadUrl: FAKE_DOWNLOAD }),
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

/** Opens the page with its scripts run and the dev toolbar hidden. */
async function open(page: Page, path: string) {
  const response = await page.goto(path);
  expect(response?.status()).toBe(200);
  await page.waitForLoadState('networkidle');
  await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
}

/** Waits until the page has drawn twice more, so the seen check has looked at the screen as it is now. */
async function settle(page: Page) {
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(resolve, 100)))),
  );
}

/** Nothing the visitor typed may reach analytics, not even the part before the @. */
function expectNothingTyped(calls: UmamiCall[], typed: string) {
  const serialized = JSON.stringify(calls);
  expect(serialized).not.toContain(typed);
  expect(serialized).not.toContain(typed.split('@')[0]);
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

for (const { path, language, skill, surface, finalSurface } of CASES) {
  const hero = { skill, language, surface, page: path };
  const final = { ...hero, surface: finalSurface };

  test(`umami ${path}: a value filled into the form the visitor is not in starts nothing`, async ({ page }) => {
    await blockThirdParty(page);
    const umamiCalls = await recordUmami(page);
    await open(page, path);

    const heroInput = page.locator(`.free-skill-form[data-surface="${surface}"] input[name="email"]`);
    const finalInput = page.locator(`.free-skill-form[data-surface="${finalSurface}"] input[name="email"]`);
    const starts = async () => (await umamiCalls()).filter(([name]) => name === STARTED);

    // Autofill picked in the hero field also writes into the final form's field, which is not focused.
    await heroInput.focus();
    await finalInput.evaluate((input: HTMLInputElement, value) => {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }, EMAIL);
    expect(await starts()).toEqual([]);

    await heroInput.pressSequentially(EMAIL);
    expect(await starts()).toEqual([[STARTED, hero]]);

    // The unfocused fill did not use up the final form's start: a change made in that field still counts.
    await finalInput.pressSequentially('x');
    expect(await starts()).toEqual([
      [STARTED, hero],
      [STARTED, final],
    ]);

    expectNothingTyped(await umamiCalls(), EMAIL);
  });

  test(`umami ${path}: the final form reports seen once, only after scrolling to it`, async ({ page }) => {
    await blockThirdParty(page);
    const umamiCalls = await recordUmami(page);
    await open(page, path);

    const finalForm = page.locator(`.free-skill-form[data-surface="${finalSurface}"]`);
    const finalSeen = async () =>
      (await umamiCalls()).filter(
        ([name, data]) => name === SEEN && (data as { surface?: string } | undefined)?.surface === finalSurface,
      );

    await settle(page);
    expect(await finalSeen()).toEqual([]);

    await finalForm.scrollIntoViewIfNeeded();
    await expect.poll(finalSeen).toEqual([[SEEN, final]]);

    // Away and back again: still the one report.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await settle(page);
    await finalForm.scrollIntoViewIfNeeded();
    await settle(page);
    expect(await finalSeen()).toEqual([[SEEN, final]]);
  });

  for (const { name, typed, failure, reason } of ERROR_CASES) {
    test(`umami ${path} ${surface}: failed submit (${name}) reports ${reason}`, async ({ page }) => {
      await blockThirdParty(page);
      const umamiCalls = await recordUmami(page);
      const requests = await mockSubscribe(page, failure);
      await open(page, path);

      const form = page.locator(`.free-skill-form[data-surface="${surface}"]`);
      await form.locator('input[name="email"]').pressSequentially(typed);
      await form.locator('button[type="submit"]').click();
      await expect(form.locator('.free-skill-form__error')).toBeVisible();
      expect(requests).toHaveLength(failure ? 1 : 0);

      const errors = async () => (await umamiCalls()).filter(([event]) => event === SUBMIT_ERROR);
      await expect.poll(errors).toEqual([[SUBMIT_ERROR, { ...hero, reason }]]);

      const calls = await umamiCalls();
      expect(calls.filter(([event]) => String(event).startsWith(SUBMIT_PREFIX))).toEqual([]);
      expectNothingTyped(calls, typed);
    });
  }
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
