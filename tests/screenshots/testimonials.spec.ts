import { test, expect } from '@playwright/test';
import { expectAxeClean, openPage, shoot, widthOf } from './helpers';

const SECTION = 'section[aria-labelledby="testimonials-heading"]';

// The slide change fades over 300 ms; reduced motion makes it instant, so scans never catch it halfway.
test.use({ contextOptions: { reducedMotion: 'reduce' } });

for (const [locale, path] of [
  ['pl', '/free-website-planning-skill/'],
  ['en', '/en/free-website-planning-skill/'],
]) {
  test(`testimonials ${locale}: every slide, axe and screenshot`, async ({ page }, testInfo) => {
    test.setTimeout(180_000);
    await openPage(page, path);
    const section = page.locator(SECTION);
    const slides = section.locator('[data-slide]');
    const count = await slides.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      await expect(slides.nth(i)).toBeVisible();
      await expect(section.locator('[data-counter]')).toHaveText(String(i + 1));
      await expectAxeClean(page, SECTION);
      await shoot(page, section, `testimonials-${locale}-slide${i + 1}-${widthOf(testInfo)}`);
      if (count > 1) await section.locator('[data-nav="next"]').click();
    }

    await expect(slides.first()).toBeVisible();
  });
}
