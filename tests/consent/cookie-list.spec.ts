import { test, expect } from '@playwright/test';
import { tableRows } from '../../src/lib/consent-config';
import { blockDataSending, consentContent, waitForBannerSettled } from './consent-helpers';

// One cookie list, three places: the content file, the privacy policy's cookie table and the
// banner's preferences window list the same services, with the same rows, in each language.

const LANGUAGES = [
  { lang: 'pl', path: '/ux-design-skill/polityka-prywatnosci/' },
  { lang: 'en', path: '/en/ux-design-skill/privacy-policy/' },
] as const;

/** Sorted `key: count` lines, so a failure shows exactly which service differs. */
const counts = (keys: string[]) => {
  const tally = new Map<string, number>();
  for (const key of keys) tally.set(key, (tally.get(key) ?? 0) + 1);
  return [...tally].map(([key, n]) => `${key}: ${n}`).sort();
};

for (const { lang, path } of LANGUAGES) {
  test(`the ${lang} policy, the preferences window and the content file list the same services`, async ({ page }) => {
    const content = consentContent(lang);
    // Every row the banner builds for a service, keyed by its visible name.
    const expectedRows = counts(content.cookies.flatMap((entry) => tableRows(entry, content).map(() => entry.service)));

    await blockDataSending(page);
    await page.goto(path);

    // The policy's table: one row group per service, in its category, with the same rows.
    const policy = await page.locator('[data-cookie-table] tbody[data-service-id]').evaluateAll((groups) =>
      groups.map((group) => ({
        id: group.getAttribute('data-service-id') ?? '',
        name: group.querySelector('[data-service-name]')?.textContent?.trim() ?? '',
        category: group.closest('[data-category]')?.getAttribute('data-category') ?? '',
        rows: group.querySelectorAll('tr[data-cookie-row]').length,
      })),
    );
    expect(policy.map(({ id, name, category }) => `${id} | ${name} | ${category}`).sort()).toEqual(
      content.cookies.map((entry) => `${entry.id} | ${entry.service} | ${entry.category}`).sort(),
    );
    expect(counts(policy.flatMap(({ name, rows }) => Array<string>(rows).fill(name)))).toEqual(expectedRows);

    // The preferences window, opened from the policy's own "Cookie settings" link.
    await waitForBannerSettled(page);
    await page.locator('#cc-main .cm').getByRole('button', { name: content.banner.rejectAll, exact: true }).click();
    await expect(page.locator('#cc-main .cm')).toBeHidden();
    await page.locator('main a[href="#cookie-settings"]').first().click();
    await expect(page.locator('#cc-main .pm')).toBeVisible();

    // The library writes each cell's column header into data-column; collapsed sections are still in the DOM.
    const serviceCells = page.locator(`#cc-main .pm td[data-column="${content.preferences.headers.service}"]`);
    const bannerRows = (await serviceCells.allTextContents()).map((text) => text.trim());
    expect(counts(bannerRows)).toEqual(expectedRows);

    // Services that store nothing have their own section, not a consent category's.
    const cookielessSection = page.locator('#cc-main .pm__section', {
      has: page.getByRole('heading', { name: content.categories.cookieless.title, exact: true }),
    });
    const cookielessRows = (
      await cookielessSection.locator(`td[data-column="${content.preferences.headers.service}"]`).allTextContents()
    ).map((text) => text.trim());
    const cookielessEntries = content.cookies.filter((entry) => entry.category === 'cookieless');
    expect(cookielessEntries.length).toBeGreaterThan(0);
    expect(counts(cookielessRows)).toEqual(
      counts(cookielessEntries.flatMap((entry) => tableRows(entry, content).map(() => entry.service))),
    );
  });
}
