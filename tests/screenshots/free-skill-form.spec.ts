import { test, expect, type Locator, type Page } from '@playwright/test';
import { presetConsentInPage, waitForBannerSettled } from '../consent/consent-helpers';
import { blockThirdParty, expectAxeClean, openPage, shoot, widthOf } from './helpers';

// /api/subscribe is always mocked here, so these tests never send a real signup.

type Locale = 'pl' | 'en';
type Skill = 'audit' | 'planning';

const FORMS: Array<{ name: string; path: string; locale: Locale; skill: Skill; surfaces: string[] }> = [
  { name: 'audit-pl', path: '/free-homepage-ux-audit-skill/', locale: 'pl', skill: 'audit', surfaces: ['free_audit_skill_hero', 'free_audit_skill_final'] },
  { name: 'audit-en', path: '/en/free-homepage-ux-audit-skill/', locale: 'en', skill: 'audit', surfaces: ['free_audit_skill_hero', 'free_audit_skill_final'] },
  { name: 'uxd-pl', path: '/ux-design-skill/', locale: 'pl', skill: 'audit', surfaces: ['ux_design_skill_audyt'] },
  { name: 'uxd-en', path: '/en/ux-design-skill/', locale: 'en', skill: 'audit', surfaces: ['ux_design_skill_audyt'] },
  { name: 'uxd-planning-pl', path: '/ux-design-skill/', locale: 'pl', skill: 'planning', surfaces: ['ux_design_skill_planning'] },
  { name: 'uxd-planning-en', path: '/en/ux-design-skill/', locale: 'en', skill: 'planning', surfaces: ['ux_design_skill_planning'] },
  { name: 'planning-pl', path: '/free-website-planning-skill/', locale: 'pl', skill: 'planning', surfaces: ['free_planning_skill_hero', 'free_planning_skill_final'] },
  { name: 'planning-en', path: '/en/free-website-planning-skill/', locale: 'en', skill: 'planning', surfaces: ['free_planning_skill_hero', 'free_planning_skill_final'] },
];

// The overlay after sign-up links to exactly these: the free-skill guide's "no AI tool" section and the skill's
// own example, both in the page's language (FIN-017; the guide's address is settled in the activation-offer plan).
const GUIDE: Record<Locale, string> = { pl: '/free-skills/guide/#no-ai-tool', en: '/en/free-skills/guide/#no-ai-tool' };
const EXAMPLE: Record<Skill, Record<Locale, string>> = {
  planning: {
    pl: '/examples/website-planning-skill_project_plan.html',
    en: '/examples/website-planning-skill_project_plan_en.html',
  },
  audit: {
    pl: '/examples/creativesparks-ux-designer_audit.html',
    en: '/examples/creativesparks-ux-designer_audit_en.html',
  },
};

const GRANTED = { status: 200, body: { ok: true, granted: true } };

const PRIVACY: Record<Locale, string> = {
  pl: '/ux-design-skill/polityka-prywatnosci/',
  en: '/en/ux-design-skill/privacy-policy/',
};
// Meta's name, in the forms Polish declines it into.
const NAMES_META = /Meta|Metę|Mety|Metą|Mecie/;

/** Answers the form's request and records what it sent. */
async function mockSubscribe(page: Page, reply: () => { status: number; body: object }) {
  const requests: Array<Record<string, string>> = [];
  // Every other API call is refused, so a form pointed at a new URL fails here instead of sending a real signup.
  // Playwright tries the newest route first, so this one only catches what the mock below does not.
  await page.route(/^https?:\/\/[^/]+\/api\//, (route) => route.abort());
  await page.route('**/api/subscribe', async (route) => {
    requests.push(route.request().postDataJSON());
    const { status, body } = reply();
    await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
  });
  return requests;
}

/** The form's overlay. A closed dialog is outside the accessibility tree, so it counts as none. */
const overlayOf = (form: Locator) => form.getByRole('dialog');

/** Whether focus is in the overlay. */
const focusInOverlay = (overlay: Locator) => overlay.evaluate((dialog) => dialog.contains(document.activeElement));

/** Whether focus is on a visible element of the form's own place, outside its overlay. */
const focusInForm = (form: Locator) =>
  form.evaluate((root) => {
    const active = document.activeElement;
    return (
      active instanceof HTMLElement &&
      active !== document.body &&
      root.contains(active) &&
      !active.closest('dialog') &&
      active.getClientRects().length > 0
    );
  });

/** The open overlay: modal, named by its heading, over the whole screen, focus inside, and only its two links. */
async function expectOverlay(page: Page, overlay: Locator, locale: Locale, skill: Skill) {
  await expect(overlay).toBeVisible();
  expect(await overlay.evaluate((dialog) => dialog.matches(':modal'))).toBe(true);

  const heading = overlay.getByRole('heading', { level: 2 });
  await expect(heading).toHaveCount(1);
  const headingName = await heading.evaluate((h) => {
    const copy = h.cloneNode(true) as HTMLElement;
    copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
    return (copy.textContent ?? '').replace(/\s+/g, ' ').trim();
  });
  expect(headingName).not.toBe('');
  await expect(overlay).toHaveAccessibleName(headingName);

  // Full screen on phones and desktop (FIN-009).
  const viewport = page.viewportSize()!;
  const box = (await overlay.boundingBox())!;
  expect([box.x, box.y, box.width, box.height].map(Math.round)).toEqual([0, 0, viewport.width, viewport.height]);

  await expect.poll(() => focusInOverlay(overlay)).toBe(true);

  // The link arrives only by email: no install link, no download, just the guide and the example, in new tabs.
  const links = overlay.getByRole('link');
  await expect(links).toHaveCount(2);
  const hrefs = await links.evaluateAll((els) => els.map((a) => a.getAttribute('href')));
  expect(hrefs.sort()).toEqual([GUIDE[locale], EXAMPLE[skill][locale]].sort());
  for (let i = 0; i < 2; i++) {
    await expect(links.nth(i)).toHaveAttribute('target', '_blank');
    await expect(links.nth(i)).toHaveAttribute('rel', /noopener/);
  }
  await expect(overlay.locator('a[download]')).toHaveCount(0);

  // A labelled ✕ and the "Got it" button.
  await expect(overlay.locator('.full-screen-dialog__close')).toHaveAccessibleName(/\S/);
  await expect(overlay.locator('.free-skill-form__overlay-done')).toBeVisible();
}

/**
 * The offer line (FIN-003, FIN-004) is on screen, before the submit button in reading order and above it,
 * and names what the offer is part of and its 14 days. Its wording is otherwise not checked.
 */
async function expectOffer(form: Locator, submit: Locator) {
  const offer = form.locator('.free-skill-form__offer');
  await expect(offer).toHaveCount(1);
  await expect(offer).toBeVisible();
  await expect(offer).toContainText('UX Design Skill');
  await expect(offer).toContainText('14');
  const button = await submit.elementHandle();
  expect(await offer.evaluate((el, b) => !!(el.compareDocumentPosition(b!) & Node.DOCUMENT_POSITION_FOLLOWING), button)).toBe(true);
  const offerBox = (await offer.boundingBox())!;
  const buttonBox = (await submit.boundingBox())!;
  expect(offerBox.y + offerBox.height).toBeLessThanOrEqual(buttonBox.y + 1);
}

/**
 * Under the form: the install-link line stays, the consent sentence keeps its privacy-policy link, and a second
 * sentence after it names Meta (FIN-006).
 */
async function expectConsent(form: Locator, locale: Locale) {
  const disclaimer = form.locator('.free-skill-form__disclaimer');
  await expect(disclaimer).toBeVisible();
  await expect(disclaimer.locator('.free-skill-form__next-step')).toBeVisible();
  const privacy = disclaimer.locator('a');
  await expect(privacy).toHaveCount(1);
  await expect(privacy).toHaveAttribute('href', PRIVACY[locale]);
  const afterLink = await privacy.evaluate((link) => {
    let text = '';
    for (let node = link.nextSibling; node; node = node.nextSibling) text += node.textContent ?? '';
    return text;
  });
  expect(afterLink).toMatch(NAMES_META);
}

/** After the overlay closed: focus back on the form, whose place shows the success heading and the repeat line. */
async function expectClosed(form: Locator) {
  await expect(overlayOf(form)).toHaveCount(0);
  await expect.poll(() => focusInForm(form)).toBe(true);
  const success = form.locator('.free-skill-form__success');
  await expect(success).toBeVisible();
  await expect(success.locator('.free-skill-form__success-heading')).toBeVisible();
  await expect(success.locator('.free-skill-form__success-repeat')).toBeVisible();
  // The "once per email address" note moved into the overlay; the offer line went with the form.
  await expect(success.locator('.free-skill-form__success-note')).toHaveCount(0);
  await expect(form.locator('.free-skill-form__offer')).toBeHidden();
}

/** Opens a page for signing up, without the scroll-through that screenshots need. */
async function openForSignup(page: Page, path: string) {
  const response = await page.goto(path, { waitUntil: 'load' });
  expect(response?.status()).toBe(200);
  await page.waitForLoadState('networkidle');
  await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
}

for (const { name, path, locale, skill, surfaces } of FORMS) {
  for (const surface of surfaces) {
    test(`form ${name} ${surface}: default, error and success states`, async ({ page }, testInfo) => {
      test.setTimeout(180_000);
      let reply = { status: 500, body: { ok: false, reason: 'server_error' } as object };
      const requests = await mockSubscribe(page, () => reply);
      await openPage(page, path);

      const selector = `.free-skill-form[data-surface="${surface}"]`;
      const form = page.locator(selector);
      const email = form.locator('input[name="email"]');
      const submit = form.locator('button[type="submit"]');
      const error = form.locator('.free-skill-form__error');
      const overlay = overlayOf(form);
      const shot = (state: string) => shoot(page, form, `form-${name}-${surface}-${state}-${widthOf(testInfo)}`);

      await expect(form).toHaveAttribute('data-skill', skill);
      await expect(form).toHaveAttribute('data-locale', locale);
      await expectConsent(form, locale);
      await expectOffer(form, submit);
      await expectAxeClean(page, selector);
      await shot('default');

      await email.fill('not-an-email');
      await submit.click();
      await expect(error).toBeVisible();
      expect(requests).toHaveLength(0);
      await expect(overlay).toHaveCount(0);
      await expectAxeClean(page, selector);
      await shot('error-email');

      // An error answer opens no overlay.
      await email.fill('reader@example.com');
      await submit.click();
      await expect(form).toHaveAttribute('data-state', 'error');
      await expect(error).toBeVisible();
      await expect(overlay).toHaveCount(0);
      await expectAxeClean(page, selector);
      await shot('error-server');

      // The honeypot's answer is a bare `ok` without `granted`: the form shows the generic error, no success.
      reply = { status: 200, body: { ok: true } };
      await submit.click();
      await expect(form).toHaveAttribute('data-state', 'error');
      await expect(error).toBeVisible();
      await expect(overlay).toHaveCount(0);

      // The link arrives only by email: the success message holds no link and no download starts.
      // Its wording is not checked, so a copy edit does not break the test; the saved screenshot shows it.
      const downloads: string[] = [];
      page.on('download', (d) => downloads.push(d.url()));
      reply = GRANTED;
      await submit.click();
      await expect(form).toHaveAttribute('data-state', 'success');

      // A granted sign-up opens the overlay over the whole page.
      await expectOverlay(page, overlay, locale, skill);
      await expectAxeClean(page, `${selector} dialog`);
      await page.screenshot({
        path: `scratch/screenshots/form-${name}-${surface}-overlay-${widthOf(testInfo)}.png`,
        scale: 'css',
        animations: 'disabled',
      });

      // A click outside the content, and one on the dialog itself (how a backdrop click is told apart), leave it open.
      expect(await page.evaluate(() => !document.elementFromPoint(1, 1)?.closest('a, button'))).toBe(true);
      await page.mouse.click(1, 1);
      await overlay.dispatchEvent('click');
      await page.waitForTimeout(200);
      await expect(overlay).toBeVisible();

      // "Got it" closes it.
      await overlay.locator('.free-skill-form__overlay-done').click();
      await expectClosed(form);

      const success = form.locator('.free-skill-form__success');
      await expect(success).toBeVisible();
      await expect(success.locator('a')).toHaveCount(0);
      await expect(error).toBeHidden();
      expect(downloads).toHaveLength(0);
      expect(requests.at(-1)).toMatchObject({ email: 'reader@example.com', skill, locale });
      await expectAxeClean(page, selector);
      await shot('success');
    });

    test(`form ${name} ${surface}: the overlay also closes by ✕ and by Esc, focus back on the form`, async ({ page }) => {
      test.setTimeout(120_000);
      await blockThirdParty(page);
      await presetConsentInPage(page, []);
      await mockSubscribe(page, () => GRANTED);

      for (const way of ['close button', 'Escape'] as const) {
        await openForSignup(page, path);
        const form = page.locator(`.free-skill-form[data-surface="${surface}"]`);
        const overlay = overlayOf(form);
        await form.locator('input[name="email"]').fill('reader@example.com');
        await form.locator('button[type="submit"]').click();
        await expect(form).toHaveAttribute('data-state', 'success');
        await expect(overlay).toBeVisible();
        await expect.poll(() => focusInOverlay(overlay)).toBe(true);

        if (way === 'close button') await overlay.locator('.full-screen-dialog__close').click();
        else await page.keyboard.press('Escape');
        await expectClosed(form);
      }
    });
  }
}

test('form planning-pl free_planning_skill_hero: the overlay covers the cookie banner, which is back after closing', async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  // No stored choice, so the banner shows on this first visit.
  await blockThirdParty(page);
  await mockSubscribe(page, () => GRANTED);
  await openForSignup(page, '/free-website-planning-skill/');
  const banner = page.locator('#cc-main .cm');
  await waitForBannerSettled(page);

  const selector = '.free-skill-form[data-surface="free_planning_skill_hero"]';
  const form = page.locator(selector);
  const overlay = overlayOf(form);
  const email = form.locator('input[name="email"]');
  await email.fill('reader@example.com');
  // Enter submits: on a phone the banner can sit over the button.
  await email.press('Enter');
  await expect(form).toHaveAttribute('data-state', 'success');
  await expectOverlay(page, overlay, 'pl', 'planning');

  /** What is on top at the banner's centre: the overlay, the banner or something else. */
  const onTopAtBanner = () =>
    banner.evaluate((el) => {
      const r = el.getBoundingClientRect();
      const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
      return top?.closest('dialog') ? 'overlay' : top?.closest('#cc-main') ? 'banner' : 'other';
    });

  // The banner stays on the page, under the overlay.
  await expect(banner).toBeVisible();
  expect(await onTopAtBanner()).toBe('overlay');
  await expectAxeClean(page, `${selector} dialog`);
  await page.screenshot({
    path: `scratch/screenshots/form-planning-pl-free_planning_skill_hero-overlay-banner-${widthOf(testInfo)}.png`,
    scale: 'css',
    animations: 'disabled',
  });

  await overlay.locator('.free-skill-form__overlay-done').click();
  await expectClosed(form);
  await expect(banner).toBeVisible();
  expect(await onTopAtBanner()).toBe('banner');
});
