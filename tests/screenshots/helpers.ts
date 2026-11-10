import { expect, type Locator, type Page, type TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';

// scratch/ is git-ignored, so screenshots stay on disk for review without entering a commit.
const OUT_DIR = 'scratch/screenshots';
// Tall sections are split so each image stays under the 2000 px limit for reading images.
const MAX_TILE_HEIGHT = 1800;

export const widthOf = (testInfo: TestInfo) => testInfo.project.use.viewport?.width ?? 0;

/** Consent and analytics scripts are third-party, and they would count test runs as real visits. */
export async function blockThirdParty(page: Page) {
  await page.route(/consent\.cookiebot\.com|connect\.facebook\.net|analytics\.creativesparks\.pl|\.posthog\.com/, (route) => route.abort());
}

/** Opens a page ready for screenshots: lazy images loaded, fonts ready, dev toolbar gone. */
export async function openPage(page: Page, path: string) {
  await blockThirdParty(page);
  const response = await page.goto(path, { waitUntil: 'load' });
  expect(response?.status()).toBe(200);
  await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    window.scrollTo(0, 0);
    await document.fonts.ready;
  });
  await page.waitForLoadState('networkidle');
}

export async function shoot(page: Page, target: Locator, name: string) {
  mkdirSync(OUT_DIR, { recursive: true });
  // Leaving the mouse on a button just clicked would capture its hover colour instead of its normal one.
  await page.mouse.move(0, 0);
  await page.evaluate(() => window.scrollTo(0, 0));
  const box = await target.boundingBox();
  if (!box) throw new Error(`${name}: element is not visible`);
  const parts = Math.ceil(box.height / MAX_TILE_HEIGHT);
  for (let part = 0; part < parts; part++) {
    await page.screenshot({
      path: `${OUT_DIR}/${name}${parts > 1 ? `-part${part + 1}` : ''}.png`,
      fullPage: true,
      scale: 'css',
      animations: 'disabled',
      clip: {
        x: box.x,
        y: box.y + part * MAX_TILE_HEIGHT,
        width: box.width,
        height: Math.min(MAX_TILE_HEIGHT, box.height - part * MAX_TILE_HEIGHT),
      },
    });
  }
}

/** One readable line per violation, so a failure names the rule, the count and the first element. */
export function summarize(violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) {
  return violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0].target.join(' ')} | ${v.nodes[0].html.slice(0, 90)}`);
}

export async function expectAxeClean(page: Page, selector: string) {
  const { violations } = await new AxeBuilder({ page }).include(selector).analyze();
  expect(summarize(violations), `axe violations in ${selector}`).toEqual([]);
}
