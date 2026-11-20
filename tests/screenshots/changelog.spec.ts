import { test, expect, type Page } from '@playwright/test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
// js-yaml is the parser Astro itself uses for content files.
import { load } from 'js-yaml';
import { openPage, widthOf } from './helpers';

// Each product's changelog page lists only its own entries, and every page links to the right one.
// Expected values come from the entry files, the release-notes rules and the approved page texts,
// never from the rendered pages.

type Locale = 'pl' | 'en';
type Entry = { version: string; date: string; title: string };

const CONTENT = 'src/content/changelog';

const HEADING = { pl: 'Historia zmian', en: 'Release notes' };

const PAID = {
  product: 'ux-design-skill',
  landing: { pl: '/ux-design-skill/', en: '/en/ux-design-skill/' },
  changelog: { pl: '/ux-design-skill/changelog/', en: '/en/ux-design-skill/changelog/' },
  label: { pl: 'Changelog', en: 'Changelog' },
  title: {
    pl: 'Changelog — Historia zmian | UX Design Skill',
    en: 'Changelog: release notes | UX Design Skill',
  },
  description: {
    pl: 'Historia zmian UX Design Skill. Nowe funkcje, domeny, usprawnienia workflow. Od v1.0 do najnowszej wersji.',
    en: 'Release notes for UX Design Skill. New features, domains, and workflow improvements, from v1.0 to the latest version.',
  },
};

// Texts from projects/2026-11-20-free-skills-changelog/plans/2026-11-20-free-skills-changelog-copy.md.
const FREE = [
  {
    product: 'homepage-ux-audit',
    landing: { pl: '/free-homepage-ux-audit-skill/', en: '/en/free-homepage-ux-audit-skill/' },
    changelog: { pl: '/free-homepage-ux-audit-skill/changelog/', en: '/en/free-homepage-ux-audit-skill/changelog/' },
    label: { pl: 'Homepage UX Audit Skill', en: 'Homepage UX Audit Skill' },
    title: {
      pl: 'Changelog — Historia zmian | Homepage UX Audit Skill',
      en: 'Changelog: release notes | Homepage UX Audit Skill',
    },
    description: {
      pl: 'Historia zmian Homepage UX Audit Skill, darmowego skilla do audytu UX strony głównej. Co zmieniło się w każdej wersji, od v1.0.',
      en: "Release notes for Homepage UX Audit Skill, the free skill that audits your homepage's UX. What changed in each version, from v1.0.",
    },
  },
  {
    product: 'website-planning',
    landing: { pl: '/free-website-planning-skill/', en: '/en/free-website-planning-skill/' },
    changelog: { pl: '/free-website-planning-skill/changelog/', en: '/en/free-website-planning-skill/changelog/' },
    label: { pl: 'Website Planning Skill', en: 'Website Planning Skill' },
    title: {
      pl: 'Changelog — Historia zmian | Website Planning Skill',
      en: 'Changelog: release notes | Website Planning Skill',
    },
    description: {
      pl: 'Historia zmian Website Planning Skill, darmowego skilla do planowania stron. Co zmieniło się w każdej wersji, od v1.0.',
      en: 'Release notes for Website Planning Skill, the free skill for planning websites. What changed in each version, from v1.0.',
    },
  },
];

const UNDER_THE_HOOD_LABEL = { pl: 'Historia zmian i aktualizacji', en: 'Changelog and updates' };

const LOCALES: Locale[] = ['pl', 'en'];

/** Numbers in a version label, so v4.3.1 sorts above v4.3 and v1.1–1.2 above v1.0. */
function versionParts(version: string) {
  return (version.match(/\d+/g) ?? []).map(Number);
}

function compareVersionsDesc(a: string, b: string) {
  const pa = versionParts(a);
  const pb = versionParts(b);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pb[i] ?? -1) - (pa[i] ?? -1);
    if (diff !== 0) return diff;
  }
  return 0;
}

/** The entries in a product's language folder, newest date first and the higher version first on the same date. */
function expectedEntries(product: string, locale: Locale): Entry[] {
  const dir = join(CONTENT, product, locale);
  expect(existsSync(dir), `${dir} exists`).toBe(true);
  return readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const text = readFileSync(join(dir, file), 'utf8');
      const frontmatter = text.split(/^---\s*$/m)[1];
      const data = load(frontmatter) as Entry;
      return { version: data.version, date: String(data.date), title: data.title };
    })
    .sort((a, b) => (a.date === b.date ? compareVersionsDesc(a.version, b.version) : a.date < b.date ? 1 : -1));
}

async function renderedEntries(page: Page): Promise<Entry[]> {
  return page.locator('#changelog details[name="changelog"]').evaluateAll((items) =>
    items.map((item) => {
      const spans = item.querySelectorAll('summary span');
      return {
        version: spans[0]?.textContent?.trim() ?? '',
        date: spans[1]?.textContent?.trim() ?? '',
        title: item.querySelector('summary h2')?.textContent?.trim() ?? '',
      };
    }),
  );
}

async function topBarLinks(page: Page) {
  return page.locator('header a').evaluateAll((links) =>
    links.map((link) => ({ href: link.getAttribute('href'), label: link.textContent?.trim() ?? '' })),
  );
}

async function footerChangelogHref(page: Page) {
  const link = page.locator('footer a', { hasText: 'Changelog' });
  await expect(link).toHaveCount(1);
  return link.getAttribute('href');
}

async function expectChangelogPage(page: Page, product: string, locale: Locale, label: string) {
  const expected = expectedEntries(product, locale);
  const rendered = await renderedEntries(page);
  expect(rendered).toEqual(expected);

  const h1 = page.locator('h1');
  await expect(h1).toHaveCount(1);
  await expect(h1).toHaveText(HEADING[locale]);
  // Every entry title is an h2 inside its entry; no older h3 titles remain.
  await expect(page.locator('#changelog details[name="changelog"] summary h2')).toHaveCount(expected.length);
  await expect(page.locator('#changelog details[name="changelog"] summary h3')).toHaveCount(0);

  // The small label sits right above the main heading.
  await expect(h1.locator('xpath=preceding-sibling::*[1]')).toHaveText(label);
}

test.describe('changelog pages', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(widthOf(testInfo) < 1000, 'links and entries do not depend on screen size');
  });

  for (const locale of LOCALES) {
    test(`paid changelog ${locale}: its own entries, label, title and footer link`, async ({ page }) => {
      test.setTimeout(120_000);
      await openPage(page, PAID.changelog[locale]);
      await expectChangelogPage(page, PAID.product, locale, PAID.label[locale]);
      await expect(page).toHaveTitle(PAID.title[locale]);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', PAID.description[locale]);
      expect(await footerChangelogHref(page)).toBe(PAID.changelog[locale]);
    });

    test(`paid landing ${locale}: the footer links to the paid changelog`, async ({ page }) => {
      test.setTimeout(120_000);
      await openPage(page, PAID.landing[locale]);
      expect(await footerChangelogHref(page)).toBe(PAID.changelog[locale]);
    });
  }

  for (const skill of FREE) {
    for (const locale of LOCALES) {
      const other: Locale = locale === 'pl' ? 'en' : 'pl';

      test(`${skill.product} changelog ${locale}: its own entries, texts, top bar and footer link`, async ({ page }) => {
        test.setTimeout(120_000);
        await openPage(page, skill.changelog[locale]);
        await expectChangelogPage(page, skill.product, locale, skill.label[locale]);
        await expect(page).toHaveTitle(skill.title[locale]);
        await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', skill.description[locale]);

        const tag = other === 'en' ? 'en-US' : 'pl-PL';
        const alternate = await page.locator(`link[rel="alternate"][hreflang="${tag}"]`).getAttribute('href');
        expect(new URL(alternate ?? '').pathname).toBe(skill.changelog[other]);

        expect(await footerChangelogHref(page)).toBe(skill.changelog[locale]);

        // The top bar does not stick, and it matches the landing page's: logo and the same links, no buy button.
        const position = await page.locator('header').first().evaluate((header) => getComputedStyle(header).position);
        expect(position).not.toBe('sticky');
        const changelogBar = await topBarLinks(page);

        await openPage(page, skill.landing[locale]);
        const landingBar = await topBarLinks(page);
        expect(changelogBar).toEqual(landingBar);
        // The logo plus the three links; a buy button would add one more.
        expect(changelogBar).toHaveLength(4);
      });

      test(`${skill.product} landing ${locale}: footer and "under the hood" link to the skill's changelog`, async ({ page }) => {
        test.setTimeout(120_000);
        await openPage(page, skill.landing[locale]);
        expect(await footerChangelogHref(page)).toBe(skill.changelog[locale]);

        const link = page.locator('#architektura a', { hasText: UNDER_THE_HOOD_LABEL[locale] });
        await expect(link).toHaveCount(1);
        await expect(link).toHaveAttribute('href', skill.changelog[locale]);
      });
    }
  }
});
