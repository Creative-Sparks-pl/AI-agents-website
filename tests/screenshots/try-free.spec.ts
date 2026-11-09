import { test, expect, type Page } from '@playwright/test';
import { expectAxeClean, openPage, shoot, widthOf } from './helpers';

const HEADING = '#try-free-heading';

// Wording that stopped being true when the pre-sale ended on June 1, 2026.
const EXPIRED = /przedsprzeda|pre-?sale|czerwca|june|launch pricing|dwana[sś]cie|twelve months|wy[zż]sze ceny/i;

const PAGES = [
  {
    locale: 'pl',
    path: '/ux-design-skill/',
    section: '#wyprobuj-za-darmo',
    // Old addresses of the section that must still land on it.
    oldAnchors: ['#audyt', '#try-for-free'],
    heroLabel: 'Wypróbuj za darmo',
    finalLabel: 'Albo wypróbuj za darmo',
    audit: { page: '/free-homepage-ux-audit-skill/', pageLabel: 'Poznaj szczegóły', submitLabel: 'Pobierz za darmo' },
    planning: { page: '/free-website-planning-skill/', pageLabel: 'Poznaj szczegóły', submitLabel: 'Pobierz za darmo' },
  },
  {
    locale: 'en',
    path: '/en/ux-design-skill/',
    section: '#try-for-free',
    oldAnchors: ['#audyt'],
    heroLabel: 'Try it for free',
    finalLabel: 'Or try it for free',
    audit: { page: '/en/free-homepage-ux-audit-skill/', pageLabel: 'Learn more', submitLabel: 'Download for free' },
    planning: { page: '/en/free-website-planning-skill/', pageLabel: 'Learn more', submitLabel: 'Download for free' },
  },
];

// Every video player on these pages shows the full skill's demo in the page's language.
const DEMO_VIDEOS = [
  ['/ux-design-skill/', 'efnuj1zoqx'],
  ['/free-homepage-ux-audit-skill/', 'efnuj1zoqx'],
  ['/free-website-planning-skill/', 'efnuj1zoqx'],
  ['/en/ux-design-skill/', 'q0uvnjyc60'],
  ['/en/free-homepage-ux-audit-skill/', 'q0uvnjyc60'],
  ['/en/free-website-planning-skill/', 'q0uvnjyc60'],
];

for (const [path, videoId] of DEMO_VIDEOS) {
  test(`demo video ${path}: right language everywhere`, async ({ page }) => {
    await page.goto(path);
    const ids = await page.locator('wistia-player').evaluateAll((players) => players.map((player) => player.getAttribute('media-id')));
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids)).toEqual(new Set([videoId]));
  });
}

/** FAQ answers count as visible wording, so every accordion item is opened before reading the text. */
async function fullPageText(page: Page) {
  return page.evaluate(() => {
    document.querySelectorAll('details').forEach((item) => {
      item.removeAttribute('name');
      item.open = true;
    });
    return document.body.innerText;
  });
}

for (const { locale, path, section, oldAnchors, heroLabel, finalLabel, audit, planning } of PAGES) {
  test(`try-free ${locale}: both cards, axe and screenshot`, async ({ page }, testInfo) => {
    test.setTimeout(180_000);
    await openPage(page, path);

    for (const [skill, card] of [['audit', audit], ['planning', planning]] as const) {
      const root = page.locator(`[data-try-free-card="${skill}"]`);
      await expect(root.locator('.free-skill-form')).toHaveAttribute('data-skill', skill);
      await expect(root.locator('button[type="submit"]')).toHaveText(new RegExp(card.submitLabel));

      const pageLink = root.getByRole('link', { name: card.pageLabel });
      await expect(pageLink).toHaveAttribute('href', card.page);
      expect((await page.request.get(card.page)).status()).toBe(200);

      await expect(root.locator('wistia-player')).toHaveCount(0);

      // Email and button share a line when the card is wide enough, and stack on a phone.
      const email = await root.locator('input[name="email"]').boundingBox();
      const submit = await root.locator('button[type="submit"]').boundingBox();
      if (widthOf(testInfo) >= 1280) expect(submit!.y).toBe(email!.y);
      else expect(submit!.y).toBeGreaterThan(email!.y);

      const overflow = await root.evaluate((el) => el.scrollWidth - el.clientWidth);
      expect(overflow, `${skill} card overflows sideways`).toBeLessThanOrEqual(0);
    }

    await expectAxeClean(page, section);
    await shoot(page, page.locator(section), `try-free-${locale}-${widthOf(testInfo)}`);
  });

  test(`try-free ${locale}: hero, final, menu and old links land on the section`, async ({ page }) => {
    test.setTimeout(180_000);
    await openPage(page, path);

    await page.getByRole('link', { name: heroLabel, exact: true }).first().click();
    await expect(page.locator(HEADING)).toBeInViewport();

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole('link', { name: finalLabel }).click();
    await expect(page.locator(HEADING)).toBeInViewport();

    // The menu links are hidden on phones, so their address is what gets checked and followed here.
    const menuHref = await page.locator(`nav a[href$="${section}"]`).getAttribute('href');
    expect(menuHref).toBe(`${path}${section}`);

    for (const target of [menuHref!, ...oldAnchors.map((anchor) => `${path}${anchor}`)]) {
      await page.goto('about:blank');
      await page.goto(target);
      await expect(page.locator(HEADING), target).toBeInViewport();
    }
  });

  test(`try-free ${locale}: no expired pre-sale wording with scripts on`, async ({ page }) => {
    await openPage(page, path);
    expect(await fullPageText(page)).not.toMatch(EXPIRED);
  });

  test.describe(() => {
    test.use({ javaScriptEnabled: false });

    test(`try-free ${locale}: no expired pre-sale wording with scripts off`, async ({ page }) => {
      await page.goto(path);
      expect(await page.locator('body').innerText()).not.toMatch(EXPIRED);
    });
  });
}
