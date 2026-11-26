import { test, expect } from '@playwright/test';
import { presetConsentInPage } from '../consent/consent-helpers';
import { blockThirdParty, expectAxeClean, openPage, shoot, widthOf } from './helpers';

// The free-skill guide: one page per language, both at the same address apart from /en/, so the two
// pair up as language versions. Its "no AI tool" section is what the sign-up overlay and the emails
// link to; it opens from its anchor and shows both example files in the page's language. Every free page
// and its changelog lead to the guide in their own language from the top bar (FIN-014).
// Expected values come from the plan ("Settled questions": the addresses, the #no-ai-tool anchor, indexed;
// Step 4: the eight pages), FIN-014 and FIN-017 (the example files), never from the rendered pages.
// Wording is not checked.

type Locale = 'pl' | 'en';

const LOCALES: Locale[] = ['pl', 'en'];

const GUIDE: Record<Locale, string> = {
  pl: '/free-skills/guide/',
  en: '/en/free-skills/guide/',
};

const HREFLANG: Record<Locale, string> = { pl: 'pl-PL', en: 'en-US' };

const NO_AI_TOOL = 'no-ai-tool';

// FIN-017: the planner's example plan and the audit's example audit, in each language.
const EXAMPLES: Record<Locale, string[]> = {
  pl: ['/examples/website-planning-skill_project_plan.html', '/examples/creativesparks-ux-designer_audit.html'],
  en: ['/examples/website-planning-skill_project_plan_en.html', '/examples/creativesparks-ux-designer_audit_en.html'],
};

// The four free pages and their four changelog pages, each with the language of its address.
const FREE_PAGES: { path: string; locale: Locale }[] = [
  { path: '/free-website-planning-skill/', locale: 'pl' },
  { path: '/en/free-website-planning-skill/', locale: 'en' },
  { path: '/free-homepage-ux-audit-skill/', locale: 'pl' },
  { path: '/en/free-homepage-ux-audit-skill/', locale: 'en' },
  { path: '/free-website-planning-skill/changelog/', locale: 'pl' },
  { path: '/en/free-website-planning-skill/changelog/', locale: 'en' },
  { path: '/free-homepage-ux-audit-skill/changelog/', locale: 'pl' },
  { path: '/en/free-homepage-ux-audit-skill/changelog/', locale: 'en' },
];

// The paid skill's guide, in both languages: no free page's top bar leads there any more.
const PAID_GUIDES = ['/ux-design-skill/instrukcja/', '/en/ux-design-skill/how-it-works/'];

for (const { path, locale } of FREE_PAGES) {
  const other: Locale = locale === 'pl' ? 'en' : 'pl';

  test(`top bar of ${path}: leads to the free-skill guide in its own language`, async ({ page }, testInfo) => {
    test.skip(widthOf(testInfo) < 1000, 'the top-bar links do not depend on screen size');
    test.setTimeout(120_000);
    await blockThirdParty(page);
    await presetConsentInPage(page, []);
    const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);

    const header = page.locator('header').first();
    await expect(header.locator(`a[href="${GUIDE[locale]}"]`)).toHaveCount(1);
    await expect(header.locator(`a[href="${GUIDE[other]}"]`), "the other language's guide").toHaveCount(0);
    for (const paid of PAID_GUIDES) {
      await expect(header.locator(`a[href="${paid}"]`), `the paid guide ${paid}`).toHaveCount(0);
    }
  });
}

for (const locale of LOCALES) {
  const other: Locale = locale === 'pl' ? 'en' : 'pl';

  test(`free-skill guide ${locale}: one main heading, the top bar, indexed, paired with the other language`, async ({ page }) => {
    test.setTimeout(120_000);
    // openPage expects the page to answer 200.
    await openPage(page, GUIDE[locale]);

    await expect(page.locator('h1')).toHaveCount(1);

    // The top bar: the logo, a link to this guide, not sticky, no buy button (the logo plus three links, as on the free pages).
    const header = page.locator('header').first();
    await expect(header.locator('nav a[aria-label="Creative Sparks"]')).toBeVisible();
    await expect(header.locator(`a[href="${GUIDE[locale]}"]`)).toHaveCount(1);
    expect(await header.evaluate((el) => getComputedStyle(el).position)).not.toBe('sticky');
    await expect(header.locator('a')).toHaveCount(4);

    // Indexed like the paid guide: no noindex. Each language tag points at that language's guide.
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    for (const target of LOCALES) {
      const href = await page.locator(`link[rel="alternate"][hreflang="${HREFLANG[target]}"]`).getAttribute('href');
      expect(new URL(href ?? '').pathname, `hreflang ${HREFLANG[target]}`).toBe(GUIDE[target]);
    }

    // The full skill's videos are paid-only, and the guide embeds none.
    await expect(page.locator('wistia-player')).toHaveCount(0);
  });

  test(`free-skill guide ${locale}: #${NO_AI_TOOL} opens from its address and links both examples in its language`, async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    await blockThirdParty(page);
    // A stored "reject all" keeps the cookie banner out of the way.
    await presetConsentInPage(page, []);
    // The overlay's and the emails' link: the guide's address with the anchor.
    const response = await page.goto(`${GUIDE[locale]}#${NO_AI_TOOL}`, { waitUntil: 'load' });
    expect(response?.status()).toBe(200);
    await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });

    const section = page.locator(`#${NO_AI_TOOL}`);
    await expect(section).toHaveCount(1);
    // The section is open and its heading on screen, without a click.
    await expect(section).toHaveJSProperty('open', true);
    await expect(section.locator('summary')).toBeInViewport();

    for (const href of EXAMPLES[locale]) {
      const link = section.locator(`a[href="${href}"]`);
      await expect(link, href).toHaveCount(1);
      await expect(link, href).toBeVisible();
      await expect(link, href).toHaveAttribute('target', '_blank');
      expect((await page.request.get(href)).status(), href).toBe(200);
    }
    for (const href of EXAMPLES[other]) {
      await expect(section.locator(`a[href="${href}"]`), `${href} is the other language's example`).toHaveCount(0);
    }

    // Only the site's own pages are linked here: no AI tool's pricing page (FIN-014 as amended).
    const hrefs = await section.locator('a').evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));
    for (const href of hrefs) expect(href, 'a link in the "no AI tool" section').toMatch(/^\/(?!\/)/);

    // The full-page axe scan sees the guide's sections closed, so the open section is scanned here.
    await expectAxeClean(page, `#${NO_AI_TOOL}`);
    await shoot(page, section, `free-skills-guide-${locale}-no-ai-tool-${widthOf(testInfo)}`);
  });
}
