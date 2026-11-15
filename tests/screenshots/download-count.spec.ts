import { test, expect, type Page } from '@playwright/test';
import { openPage } from './helpers';

// The dev server never asks Easytools or the live site; it always shows the fixed minimum.
const SHOWN = '200';

const BADGE = {
  pl: `${SHOWN}+ pobrań darmowych skilli dla Claude Code, Codex, Cursor...`,
  en: `${SHOWN}+ downloads of free skills for Claude Code, Codex, Cursor...`,
};

const INTRO = {
  pl: `Dwa darmowe skille wydzielone z pełnej wersji, pobrane już ${SHOWN}+ razy. Wybierz ten, który pasuje do Twojej sytuacji.`,
  en: `Two free skills taken from the full version, downloaded ${SHOWN}+ times. Pick the one that fits where you are.`,
};

const FREE_PAGES = [
  { locale: 'pl', path: '/free-homepage-ux-audit-skill/' },
  { locale: 'pl', path: '/free-website-planning-skill/' },
  { locale: 'en', path: '/en/free-homepage-ux-audit-skill/' },
  { locale: 'en', path: '/en/free-website-planning-skill/' },
] as const;

const PAID_PAGES = [
  { locale: 'pl', path: '/ux-design-skill/' },
  { locale: 'en', path: '/en/ux-design-skill/' },
] as const;

// The count is made during the build; a visitor's browser must never ask for it.
const COUNT_SOURCES = /cart\.easy\.tools|agents\.creativesparks\.pl\/free-skill-downloads\.json/;

/** Opens the page while recording every request the browser makes, blocked ones included. */
async function openRecording(page: Page, path: string) {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  await openPage(page, path);
  return requests;
}

async function expectNoPlaceholder(page: Page) {
  expect(await page.content()).not.toContain('{N}');
}

for (const { locale, path } of FREE_PAGES) {
  test(`free page ${path}: hero badge shows the download count`, async ({ page }) => {
    const requests = await openRecording(page, path);
    const hero = page.locator('section[aria-labelledby="hero-heading"]');
    await expect(hero.getByText(BADGE[locale], { exact: true })).toBeVisible();
    await expectNoPlaceholder(page);
    expect(requests.filter((url) => COUNT_SOURCES.test(url))).toEqual([]);
  });

  test(`free page ${path}: badge wraps cleanly at 360 px`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await openPage(page, path);
    const text = page.locator('section[aria-labelledby="hero-heading"]').getByText(BADGE[locale], { exact: true });
    await expect(text).toBeVisible();
    const fit = await text.evaluate((span) => {
      const box = span.parentElement!;
      const outer = box.getBoundingClientRect();
      const inner = span.getBoundingClientRect();
      return {
        boxInsideViewport: outer.left >= 0 && outer.right <= window.innerWidth,
        textInsideBox: inner.left >= outer.left && inner.right <= outer.right && inner.bottom <= outer.bottom,
        noBoxOverflow: box.scrollWidth <= box.clientWidth,
      };
    });
    expect(fit).toEqual({ boxInsideViewport: true, textInsideBox: true, noBoxOverflow: true });
  });
}

for (const { locale, path } of PAID_PAGES) {
  test(`paid page ${path}: try-free intro shows the download count`, async ({ page }) => {
    const requests = await openRecording(page, path);
    await expect(page.getByText(INTRO[locale], { exact: true })).toBeVisible();
    await expectNoPlaceholder(page);
    expect(requests.filter((url) => COUNT_SOURCES.test(url))).toEqual([]);
  });
}

test('the dev server publishes the fixed minimum', async ({ request }) => {
  const response = await request.get('/free-skill-downloads.json');
  expect(response.status()).toBe(200);
  // With the real key in .env.local an Easytools read would answer "easytools", so "minimum"
  // shows the dev server skipped the read.
  expect(await response.json()).toEqual({ shown: 200, source: 'minimum' });
});
