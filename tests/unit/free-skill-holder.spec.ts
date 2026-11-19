import { test, expect } from '@playwright/test';
import { holdsFreeSkill, HolderLookupError } from '../../src/lib/free-skill-holder';

const API = 'https://cart.easy.tools/api/v1';
const PRODUCT = 'ecd365f9-e302-4926-9209-8813d3e3e7e2';
const HEADERS = { Authorization: 'Bearer test', Accept: 'application/json' };

// A fake Easytools: answers GET /customers per currency from the given lists, records each URL.
function fakeEasytools(byCurrency: Record<string, unknown>, status = 200) {
  const urls: string[] = [];
  const fetchFn = async (url: string) => {
    urls.push(url);
    const currency = new URL(url).searchParams.get('currency') ?? '';
    if (status !== 200) return new Response('{}', { status });
    const items = byCurrency[currency] ?? [];
    return new Response(JSON.stringify({ items, pagination: { total_pages: 1 } }), { status: 200 });
  };
  return { fetchFn, urls };
}

test.describe('holdsFreeSkill', () => {
  test('finds a holder with the same address, case aside', async () => {
    const { fetchFn, urls } = fakeEasytools({ pln: [{ id: 'c1', email: 'Jan@Example.com' }] });
    expect(await holdsFreeSkill(fetchFn, API, HEADERS, PRODUCT, 'jan@example.com')).toBe(true);
    const asked = new URL(urls[0]).searchParams;
    expect(asked.get('product')).toBe(PRODUCT);
    expect(asked.get('query')).toBe('jan@example.com');
  });

  test('finds a holder listed under the other currency', async () => {
    const { fetchFn, urls } = fakeEasytools({ pln: [], usd: [{ id: 'c2', email: 'ann@example.com' }] });
    expect(await holdsFreeSkill(fetchFn, API, HEADERS, PRODUCT, 'ann@example.com')).toBe(true);
    expect(urls).toHaveLength(2);
  });

  test('a search hit with a different address is not a holder', async () => {
    const { fetchFn } = fakeEasytools({ pln: [{ id: 'c3', email: 'jan@example.com.pl' }], usd: [] });
    expect(await holdsFreeSkill(fetchFn, API, HEADERS, PRODUCT, 'jan@example.com')).toBe(false);
  });

  test('nobody listed: not a holder', async () => {
    const { fetchFn } = fakeEasytools({});
    expect(await holdsFreeSkill(fetchFn, API, HEADERS, PRODUCT, 'new@example.com')).toBe(false);
  });

  test('an Easytools error throws, so the caller can grant anyway', async () => {
    const { fetchFn } = fakeEasytools({}, 500);
    await expect(holdsFreeSkill(fetchFn, API, HEADERS, PRODUCT, 'jan@example.com')).rejects.toBeInstanceOf(HolderLookupError);
  });

  test('a network failure throws', async () => {
    const fetchFn = async () => {
      throw new TypeError('fetch failed');
    };
    await expect(holdsFreeSkill(fetchFn, API, HEADERS, PRODUCT, 'jan@example.com')).rejects.toBeInstanceOf(HolderLookupError);
  });
});
