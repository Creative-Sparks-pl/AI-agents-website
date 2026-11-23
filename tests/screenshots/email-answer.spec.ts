import { test, expect, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
// js-yaml is the parser Astro itself uses for content files.
import { load } from 'js-yaml';
import { blockThirdParty, openPage, shoot, widthOf } from './helpers';

// The email answer page (/answer/, /en/answer/): the thank-you page a reader lands on after a
// one-click answer in an email. The link's `mail` and `odp` pick the text; anything else shows
// the general thank-you. These tests check behaviour and names, not wording: the expected texts
// come from the content files, and each email link must reach its own entry, never the fallback.

type Locale = 'pl' | 'en';
const LOCALES: Locale[] = ['pl', 'en'];
const SITE = 'https://agents.creativesparks.pl';

// The answer links exactly as the day-12 onboarding email ("Where you stand", n3) carries them,
// in Polish and English. The email drafts live in the marketing repo (MKT-UX-Design-Skill); when
// a link there changes, change it here too.
const EMAIL_LINKS: Record<Locale, string[]> = {
  pl: [
    'https://agents.creativesparks.pl/answer/?mail=n3&odp=sprobuje',
    'https://agents.creativesparks.pl/answer/?mail=n3&odp=pozniej',
    'https://agents.creativesparks.pl/answer/?mail=n3&odp=nie-dla-mnie',
  ],
  en: [
    'https://agents.creativesparks.pl/en/answer/?mail=n3&odp=sprobuje',
    'https://agents.creativesparks.pl/en/answer/?mail=n3&odp=pozniej',
    'https://agents.creativesparks.pl/en/answer/?mail=n3&odp=nie-dla-mnie',
  ],
};

interface Text {
  heading: string;
  text: string;
}
interface AnswersFile {
  title: string;
  fallback: Text;
  answers: (Text & { mail: string; odp: string })[];
}
interface Author {
  nameFirst: string;
  nameLast: string;
  email: string;
  linkedIn: string;
}

const answersFile = (locale: Locale) =>
  load(readFileSync(`src/content/email-answers/${locale}.yaml`, 'utf8')) as AnswersFile;
const author = (locale: Locale) =>
  load(readFileSync(`src/content/author/${locale}.mdx`, 'utf8').split(/^---\s*$/m)[1]) as Author;

const pagePath = (locale: Locale) => (locale === 'en' ? '/en/answer/' : '/answer/');
const heading = (page: Page) => page.locator('main h1');
const message = (page: Page) => page.locator('[data-answer-text]');

// A protected preview deployment: the bypass secret goes to the site's own host only, and is
// registered before the helpers' blockers so their answers for /api/ requests take precedence.
test.beforeEach(async ({ page, baseURL }) => {
  const host = new URL(baseURL!).hostname;
  const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  if (bypass && !/^(localhost|127\.0\.0\.1)$/.test(host)) {
    await page.route(
      (url) => url.hostname === host,
      (route) =>
        route.continue({
          headers: { ...route.request().headers(), 'x-vercel-protection-bypass': bypass, 'x-vercel-skip-toolbar': '1' },
        }),
    );
  }
});

/** Opens a page and checks it exists, so every test fails while the page is missing. */
async function open(page: Page, path: string) {
  await openPage(page, path);
  // One main heading on the whole page, and it sits in <main>.
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(heading(page)).toHaveCount(1);
}

test.describe('email answer page', () => {
  for (const locale of LOCALES) {
    const file = answersFile(locale);

    for (const link of EMAIL_LINKS[locale]) {
      const { pathname, search } = new URL(link);
      const params = new URLSearchParams(search);
      test(`${locale} email link ${search}: shows its own answer`, async ({ page }) => {
        const entry = file.answers.find((a) => a.mail === params.get('mail') && a.odp === params.get('odp'));
        expect(entry, `content file has ${search}`).toBeTruthy();
        await open(page, pathname + search);
        await expect(heading(page)).toHaveText(entry!.heading);
        await expect(message(page)).toHaveText(entry!.text);
        expect(entry!.text).not.toBe(file.fallback.text);
      });
    }

    // No values, one value alone, an unknown pair, and a pair in the wrong letter case.
    for (const search of ['', '?mail=n3', '?mail=x&odp=y', '?mail=N3&odp=pozniej']) {
      test(`${locale} ${search || 'no parameters'}: shows the general thank-you`, async ({ page }) => {
        await open(page, pagePath(locale) + search);
        await expect(heading(page)).toHaveText(file.fallback.heading);
        await expect(message(page)).toHaveText(file.fallback.text);
      });
    }

    test.describe(() => {
      test.use({ javaScriptEnabled: false });
      test(`${locale} without scripts: a known answer shows the general thank-you`, async ({ page }) => {
        await blockThirdParty(page);
        const response = await page.goto(`${pagePath(locale)}?mail=n3&odp=pozniej`, { waitUntil: 'load' });
        expect(response?.status()).toBe(200);
        await expect(heading(page)).toHaveText(file.fallback.heading);
        await expect(message(page)).toHaveText(file.fallback.text);
      });
    });

    test(`${locale}: plain page — logo-only header, the owner's note, footer, head tags`, async ({ page }, testInfo) => {
      await open(page, `${pagePath(locale)}?mail=n3&odp=pozniej`);
      await expect(page).toHaveTitle(file.title);

      // Header: the logo and nothing else (no menu, no price or sale button).
      const header = page.locator('header').first();
      await expect(header.locator('a')).toHaveCount(1);
      await expect(header.locator('button, [data-sale-only], [data-list-only]')).toHaveCount(0);

      // The note: photo, name and contact from the author content.
      const owner = author(locale);
      const note = page.locator('[data-email-answer]');
      // The photo is the one image with the owner's name; the decorative shape beside it is hidden from readers.
      const photo = note.getByRole('img', { name: `${owner.nameFirst} ${owner.nameLast}`, exact: true });
      await expect(photo).toHaveCount(1);
      await expect(note.locator('img[aria-hidden="true"][alt=""]')).toHaveCount(1);
      await expect(note.locator('[data-answer-name]')).toHaveText(`${owner.nameFirst} ${owner.nameLast}`);
      await expect(note.locator(`a[href="mailto:${owner.email}"]`)).toHaveText(owner.email);
      await expect(note.locator(`a[href="${owner.linkedIn}"]`)).toHaveCount(1);
      await expect(note.locator('a[href*="cennik"], a[href*="pricing"], a[href*="cart."]')).toHaveCount(0);

      // One column: the small round photo below the message, the name and contact to its right.
      const photoBox = (await photo.boundingBox())!;
      const messageBox = (await message(page).boundingBox())!;
      const nameBox = (await note.locator('[data-answer-name]').boundingBox())!;
      expect(photoBox.y).toBeGreaterThanOrEqual(messageBox.y + messageBox.height);
      expect(nameBox.x).toBeGreaterThanOrEqual(photoBox.x + photoBox.width);
      expect(photoBox.width).toBeLessThanOrEqual(128);
      expect(await photo.evaluate((img) => getComputedStyle(img).borderRadius)).not.toBe('0px');

      // Head: kept out of search, canonical and language links without the query string, Umami's count.
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${SITE}${pagePath(locale)}`);
      await expect(page.locator('link[rel="alternate"][hreflang="pl-PL"]')).toHaveAttribute('href', `${SITE}/answer/`);
      await expect(page.locator('link[rel="alternate"][hreflang="en-US"]')).toHaveAttribute('href', `${SITE}/en/answer/`);
      await expect(page.locator('script[src="https://analytics.creativesparks.pl/script.js"]')).toHaveCount(1);

      await expect(page.locator('footer')).toHaveCount(1);
      await shoot(page, page.locator('body'), `email-answer-${locale}-${widthOf(testInfo)}`);
    });

    test(`${locale}: on a tall screen the footer sits at the bottom edge`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width: widthOf(testInfo), height: 1600 });
      await open(page, `${pagePath(locale)}?mail=n3&odp=pozniej`);
      const footer = (await page.locator('footer').boundingBox())!;
      expect(Math.round(footer.y + footer.height)).toBe(1600);
    });

    test(`${locale}: first visit shows the cookie banner; the footer link reopens the settings`, async ({ page }) => {
      await blockThirdParty(page);
      const response = await page.goto(pagePath(locale), { waitUntil: 'load' });
      expect(response?.status()).toBe(200);
      await expect(heading(page)).toHaveCount(1);
      const banner = page.locator('#cc-main .cm');
      await expect(banner).toBeVisible();
      await banner.getByRole('button', { name: locale === 'en' ? 'Reject all' : 'Odrzuć wszystkie', exact: true }).click();
      await expect(banner).toBeHidden();
      await page
        .locator('footer')
        .getByRole('link', { name: locale === 'en' ? 'Cookie settings' : 'Ustawienia cookies', exact: true })
        .click();
      await expect(page.locator('#cc-main .pm')).toBeVisible();
    });
  }
});
