import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { blockThirdParty, summarize } from '../screenshots/helpers';

// Full-page axe scan, at both viewports, of every page this project touched.
// No tag filter: heading order and other best-practice rules count as well as WCAG.
const PAGES = [
  '/free-website-planning-skill/',
  '/en/free-website-planning-skill/',
  '/free-homepage-ux-audit-skill/',
  '/en/free-homepage-ux-audit-skill/',
  '/ux-design-skill/',
  '/en/ux-design-skill/',
  '/ux-design-skill/polityka-prywatnosci/',
  '/en/ux-design-skill/privacy-policy/',
];

for (const path of PAGES) {
  test(`axe clean: ${path}`, async ({ page }) => {
    test.setTimeout(180_000);
    await blockThirdParty(page);
    const response = await page.goto(path, { waitUntil: 'load' });
    expect(response?.status()).toBe(200);
    const { violations } = await new AxeBuilder({ page }).exclude('astro-dev-toolbar').analyze();
    expect(summarize(violations)).toEqual([]);
  });
}
