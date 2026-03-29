import { test, expect } from '@playwright/test';

const pages = [
  { name: 'home', path: '/ux-designer/' },
  { name: 'baza-wiedzy', path: '/ux-designer/baza-wiedzy/' },
  { name: 'changelog', path: '/ux-designer/changelog/' },
  { name: 'instrukcja', path: '/ux-designer/instrukcja/' },
  { name: 'polityka-prywatnosci', path: '/ux-designer/polityka-prywatnosci/' },
  { name: 'regulamin', path: '/ux-designer/regulamin/' },
];

for (const page of pages) {
  test(`VRT: ${page.name}`, async ({ page: p }) => {
    await p.goto(page.path, { waitUntil: 'networkidle' });
    await expect(p).toHaveScreenshot(`${page.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}
