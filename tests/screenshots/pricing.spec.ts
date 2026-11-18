import { test, expect, type Page } from '@playwright/test';
import { expectAxeClean, openPage, shoot, widthOf } from './helpers';

// The Black Friday window, in Warsaw time: from 23.11.2026 00:00 up to (not including) 1.12.2026 00:00.
// The browser clock is set just before and just after each edge; the dev server renders the list state,
// so the sale state can only come from the page's own script.
const MOMENTS = [
  { name: 'before-start', time: '2026-11-22T23:59:30+01:00', inSale: false },
  { name: 'after-start', time: '2026-11-23T00:00:30+01:00', inSale: true },
  { name: 'before-end', time: '2026-11-30T23:59:30+01:00', inSale: true },
  { name: 'after-end', time: '2026-12-01T00:00:30+01:00', inSale: false },
] as const;

const PAGES = [
  {
    locale: 'pl',
    path: '/ux-design-skill/',
    countdownPrefix: 'Black Friday kończy się za',
    lowestPrice: (p: string) => `Najniższa cena z 30 dni przed obniżką: ${p}`,
    plans: [
      { name: 'Founder', group: '1 użytkownik', list: '449 zł', sale: '359' },
      { name: 'Solo Designer', group: '1 użytkownik', list: '749 zł', sale: '599' },
      { name: 'Studio', group: 'Do 5 użytkowników', list: '1 249 zł', sale: '999' },
    ],
  },
  {
    locale: 'en',
    path: '/en/ux-design-skill/',
    countdownPrefix: 'Black Friday ends in',
    lowestPrice: (p: string) => `Lowest price in the 30 days before the discount: ${p}`,
    plans: [
      { name: 'Founder', group: '1 user', list: '$149', sale: '119' },
      { name: 'Solo Designer', group: '1 user', list: '$229', sale: '183' },
      { name: 'Studio', group: 'Up to 5 users', list: '$379', sale: '303' },
    ],
  },
] as const;

const SECTION = 'section[aria-labelledby="pricing-heading"]';
const HERO = 'section[aria-labelledby="hero-heading"]';

async function openAt(page: Page, path: string, time: string) {
  await page.clock.install({ time: new Date(time) });
  await openPage(page, path);
}

type PaidPage = (typeof PAGES)[number];

async function expectState(page: Page, { locale, path, plans, countdownPrefix, lowestPrice }: PaidPage, inSale: boolean) {
  const section = page.locator(SECTION);
  const links = section.locator('a[data-umami-event="Pricing CTA"]');
  await expect(links).toHaveCount(plans.length);

  const listHrefs = new Set<string>();
  for (const [i, plan] of plans.entries()) {
    const listBlock = section.locator('[data-list-only]').nth(i);
    const saleBlock = section.locator('[data-sale-only]').nth(i);
    if (inSale) {
      await expect(saleBlock).toBeVisible();
      await expect(listBlock).toBeHidden();
      await expect(saleBlock).toContainText(plan.sale);
      await expect(saleBlock.locator('.line-through')).toHaveText(plan.list);
      await expect(saleBlock).toContainText(lowestPrice(plan.list));
    } else {
      await expect(listBlock).toBeVisible();
      await expect(saleBlock).toBeHidden();
      await expect(listBlock).toContainText(plan.list.replace(/[^\d ]/g, '').trim());
    }

    // Each card has its own list and Black Friday links; the button uses the one for the current state.
    const link = links.nth(i);
    await expect(link).toHaveAttribute('data-umami-event-plan', plan.name);
    await expect(section.locator('h3').nth(i)).toHaveText(plan.name);
    await expect(section.getByText(plan.group, { exact: true }).first()).toBeVisible();
    const listHref = (await link.getAttribute('data-list-href'))!;
    const saleHref = (await link.getAttribute('data-sale-href'))!;
    expect(listHref).not.toBe(saleHref);
    listHrefs.add(listHref);
    const href = (await link.getAttribute('href'))!;
    expect(href).toBe(inSale ? saleHref : listHref);
    const checkout = new URL(href);
    expect(checkout.host).toBe('cart.creativesparks.pl');
    expect(checkout.searchParams.get('lang')).toBe(locale);
    expect(checkout.searchParams.get('page')).toBe(path);
  }
  expect(listHrefs.size, 'every card links to its own cart').toBe(plans.length);

  // The hero badge counts down only inside the window; outside it shows its normal text.
  const countdown = page.locator(`${HERO} [data-sale-countdown]`);
  const normalBadge = page.locator(`${HERO} div[data-list-only]`);
  if (inSale) {
    await expect(countdown).toBeVisible();
    await expect(countdown).toContainText(countdownPrefix);
    await expect(normalBadge).toBeHidden();
  } else {
    await expect(countdown).toBeHidden();
    await expect(normalBadge).toBeVisible();
  }

  // Inside the window the top-bar and hero buttons to the prices swap for the black-and-yellow Black Friday ones
  // (top bar first in the page), same link.
  const saleCtas = page.locator(`header a[data-sale-only], ${HERO} a[data-sale-only]`);
  const listCtas = page.locator(`header a[data-list-only], ${HERO} a[data-list-only]`);
  await expect(saleCtas).toHaveCount(2);
  await expect(listCtas).toHaveCount(2);
  const saleLabels = locale === 'en'
    ? ['Black Friday: 20% off', 'See Black Friday prices']
    : ['Black Friday −20%', 'Zobacz ceny Black Friday'];
  for (let i = 0; i < 2; i++) {
    await expect(saleCtas.nth(i)).toHaveText(saleLabels[i]);
    expect(await saleCtas.nth(i).getAttribute('href')).toBe(await listCtas.nth(i).getAttribute('href'));
    await expect(inSale ? saleCtas.nth(i) : listCtas.nth(i)).toBeVisible();
    await expect(inSale ? listCtas.nth(i) : saleCtas.nth(i)).toBeHidden();
  }
}

for (const paidPage of PAGES) {
  const { locale, path } = paidPage;

  for (const moment of MOMENTS) {
    test(`pricing ${locale}: ${moment.name} shows ${moment.inSale ? 'Black Friday' : 'list'} prices and links`, async ({ page }, testInfo) => {
      test.skip(widthOf(testInfo) < 1000, 'the window logic does not depend on screen size');
      await openAt(page, path, moment.time);
      await expectState(page, paidPage, moment.inSale);
    });
  }

  test(`pricing ${locale}: a tab left open across the start flips without a reload`, async ({ page }, testInfo) => {
    test.skip(widthOf(testInfo) < 1000, 'the window logic does not depend on screen size');
    await openAt(page, path, '2026-11-22T23:59:50+01:00');
    await expectState(page, paidPage, false);
    await page.clock.runFor(20_000);
    await expectState(page, paidPage, true);
  });

  test(`pricing ${locale}: a tab left open across the end flips back without a reload`, async ({ page }, testInfo) => {
    test.skip(widthOf(testInfo) < 1000, 'the window logic does not depend on screen size');
    await openAt(page, path, '2026-11-30T23:59:50+01:00');
    await expectState(page, paidPage, true);
    await page.clock.runFor(20_000);
    await expectState(page, paidPage, false);
  });

  for (const moment of [MOMENTS[0], MOMENTS[1]]) {
    test(`pricing ${locale}: ${moment.inSale ? 'Black Friday' : 'list'} state passes axe, screenshot saved`, async ({ page }, testInfo) => {
      await openAt(page, path, moment.time);
      await expectAxeClean(page, SECTION);
      await expectAxeClean(page, HERO);
      await shoot(page, page.locator(SECTION), `pricing-${locale}-${moment.inSale ? 'black-friday' : 'list'}-${widthOf(testInfo)}`);
    });
  }
}
