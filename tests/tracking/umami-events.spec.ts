import { test, expect, type Locator, type Page } from '@playwright/test';
import { presetConsentInPage } from '../consent/consent-helpers';
import { blockThirdParty, widthOf } from '../screenshots/helpers';

// The real Umami script is blocked and replaced by a recorder, and /api/subscribe is mocked,
// so these tests never count a visit or send a real signup.
const FAKE_DOWNLOAD = 'https://downloads.test/skill.zip';
const EMAIL = 'funnel.check.4821@example.com';
const STARTED = 'Free skill form started';
const SUBMIT_PREFIX = 'Free skill submit: ';
const SEEN = 'Free skill form seen';
const SUBMIT_ERROR = 'Free skill submit error';
const NAV_LINK = 'Nav link';
const SAMPLE_OUTPUT = 'Sample output';
const HERO_VIDEO = 'Hero video';
const INTEREST = 'Interest shown';
const PRICING_SEEN = 'Pricing seen';
// The top bar shows its links from this width up.
const NAV_LINKS_MIN_WIDTH = 768;

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

/** The recorded calls of one event, in order. */
function named(calls: UmamiCall[], event: string) {
  return calls.filter(([name]) => name === event);
}

/** Opens a page for clicking: a stored "reject all" keeps the cookie banner from covering what the test clicks. */
async function openForClicks(page: Page, path: string) {
  await blockThirdParty(page);
  await presetConsentInPage(page, []);
  const umamiCalls = await recordUmami(page);
  await open(page, path);
  return umamiCalls;
}

/** Clicks a sample card, which opens its example in a new tab; returns the address that tab opened. */
async function openSample(page: Page, card: Locator) {
  const popup = page.waitForEvent('popup');
  await card.click();
  const sample = await popup;
  await sample.waitForLoadState('domcontentloaded');
  const opened = new URL(sample.url());
  await sample.close();
  return opened.pathname + opened.hash;
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

for (const { path, language } of CASES) {
  test(`umami ${path}: every top-bar link carries Nav link with its address`, async ({ page }, testInfo) => {
    const umamiCalls = await openForClicks(page, path);

    // The bar's link list; the logo link sits outside it, and free pages show no CTA button.
    const links = page.locator('header nav > div a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    await expect(page.locator(`[data-umami-click="${NAV_LINK}"]`)).toHaveCount(count);
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
      await expect(links.nth(i)).toHaveAttribute('data-umami-click', NAV_LINK);
      await expect(links.nth(i)).toHaveAttribute('data-umami-click-link', href!);
    }

    // The link into this same page keeps the page, and with it the recorded calls.
    const samePage = links.and(page.locator(`[href^="${path}#"]`));
    if (widthOf(testInfo) < NAV_LINKS_MIN_WIDTH) {
      // Phones get no top-bar links to click: the attributes above are all there is to check.
      await expect(samePage).toBeHidden();
      return;
    }
    const href = (await samePage.getAttribute('href'))!;
    await samePage.click();
    await expect.poll(() => new URL(page.url()).pathname + new URL(page.url()).hash).toBe(href);
    expect(named(await umamiCalls(), NAV_LINK)).toEqual([[NAV_LINK, { link: href }]]);
  });

  test(`umami ${path}: a sample-card click records Sample output with the example's path`, async ({ page }) => {
    const umamiCalls = await openForClicks(page, path);

    const cards = page.locator('a[href^="/examples/"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const href = await cards.nth(i).getAttribute('href');
      await expect(cards.nth(i)).toHaveAttribute('data-umami-click', SAMPLE_OUTPUT);
      await expect(cards.nth(i)).toHaveAttribute('data-umami-click-output', href!);
      await expect(cards.nth(i)).toHaveAttribute('data-umami-interest');
      // Meta's view-content attribute stays as it was.
      await expect(cards.nth(i)).toHaveAttribute('data-track', 'ViewContent');
    }

    const card = cards.first();
    const href = (await card.getAttribute('href'))!;
    expect(await openSample(page, card)).toBe(href);
    expect(named(await umamiCalls(), SAMPLE_OUTPUT)).toEqual([[SAMPLE_OUTPUT, { output: href }]]);
  });

  test(`umami ${path}: a video click records Hero video without labels and the popover opens`, async ({ page }) => {
    const umamiCalls = await openForClicks(page, path);

    const trigger = page.locator('[data-wistia-trigger]');
    await expect(trigger).toHaveAttribute('data-umami-interest');
    await trigger.click();
    expect(named(await umamiCalls(), HERO_VIDEO)).toEqual([[HERO_VIDEO]]);

    // Wistia's popup opens over the page, and the trigger's "#" address is never followed.
    await expect(page.locator('.wistia_popover_overlay')).toBeVisible({ timeout: 20_000 });
    expect(page.url()).not.toContain('#');
  });

  test(`umami ${path}: two interest clicks in one page load send one Interest shown`, async ({ page }) => {
    const umamiCalls = await openForClicks(page, path);

    await openSample(page, page.locator('a[href^="/examples/"]').first());
    await page.locator('[data-wistia-trigger]').click();

    const calls = await umamiCalls();
    // Each click still reports itself; the page view reports interest only once.
    expect(named(calls, SAMPLE_OUTPUT)).toHaveLength(1);
    expect(named(calls, HERO_VIDEO)).toHaveLength(1);
    expect(named(calls, INTEREST)).toEqual([[INTEREST, { page: path, language }]]);
  });
}

for (const { path, plans } of CHECKOUT_CASES) {
  test(`umami ${path}: Pricing seen fires once, when half the first price card is on screen`, async ({ page }) => {
    await blockThirdParty(page);
    const umamiCalls = await recordUmami(page);
    await open(page, path);

    const card = page.locator(`[data-umami-seen="${PRICING_SEEN}"]`);
    await expect(card).toHaveCount(1);
    // The first card: the one holding the first plan's checkout link.
    await expect(card.locator('a[data-umami-event="Pricing CTA"]')).toHaveAttribute('data-umami-event-plan', plans[0]);

    const pricingSeen = async () => named(await umamiCalls(), PRICING_SEEN);
    /** Scrolls so that the given share of the card, from its top, shows at the bottom of the screen. */
    const showTopShare = (share: number) =>
      card.evaluate((element, share) => {
        const box = element.getBoundingClientRect();
        const top = window.scrollY + box.top - window.innerHeight + box.height * share;
        window.scrollTo({ top, behavior: 'instant' });
      }, share);

    await settle(page);
    expect(await pricingSeen()).toEqual([]);

    // Under half on screen is not seen yet.
    await showTopShare(0.4);
    await settle(page);
    expect(await pricingSeen()).toEqual([]);

    await showTopShare(0.6);
    await expect.poll(pricingSeen).toEqual([[PRICING_SEEN]]);

    // Away and back again: still the one report.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await settle(page);
    await card.scrollIntoViewIfNeeded();
    await settle(page);
    expect(await pricingSeen()).toEqual([[PRICING_SEEN]]);
  });
}
