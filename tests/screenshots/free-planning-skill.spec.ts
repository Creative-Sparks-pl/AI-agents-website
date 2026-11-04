import { test, expect } from '@playwright/test';
import { expectAxeClean, openPage, shoot, widthOf } from './helpers';

// Testimonials sit between the architecture and steps sections; testimonials.spec.ts checks them.
const PAGES = [
  {
    locale: 'pl',
    path: '/free-website-planning-skill/',
    sections: { proof: '#co-dostajesz', architecture: '#architektura', steps: '#jak-to-dziala', boundaries: '#granice', faq: '#faq', 'final-cta': '#pobierz' },
  },
  {
    locale: 'en',
    path: '/en/free-website-planning-skill/',
    sections: { proof: '#what-you-get', architecture: '#architektura', steps: '#how-it-works', boundaries: '#limits', faq: '#faq', 'final-cta': '#download' },
  },
];

for (const { locale, path, sections } of PAGES) {
  test(`planning page ${locale}: every section, axe and screenshot`, async ({ page }, testInfo) => {
    test.setTimeout(180_000);
    await openPage(page, path);
    const width = widthOf(testInfo);

    // The hero has no id; it is the first section and holds the page's only h1.
    const hero = page.locator('main > section').first();
    await expect(hero.locator('h1')).toHaveCount(1);
    await expectAxeClean(page, 'main > section:first-of-type');
    await shoot(page, hero, `planning-hero-${locale}-${width}`);

    for (const [name, selector] of Object.entries(sections)) {
      await expect(page.locator(selector)).toHaveCount(1);
      await expectAxeClean(page, selector);
      await shoot(page, page.locator(selector), `planning-${name}-${locale}-${width}`);
    }
  });
}
