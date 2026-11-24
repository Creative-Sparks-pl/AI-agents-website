import { test, expect } from '@playwright/test';
import { isListedTestPerson, TestPersonLookupError } from '../../src/lib/free-skill-test-person';

// The free sign-up's test people: a Gmail "+" alias whose Easytools customer is on the server
// setting's list keeps its alias. Every test answers Easytools' customer search itself; no request
// leaves the machine. Addresses and IDs are made up.

const API = 'https://cart.easy.tools/api/v1';
const HEADERS = { Authorization: 'Bearer test', Accept: 'application/json', 'User-Agent': 'creativesparks-site/1.0' };

const ALIAS = 'anna.testowa+test-signup@gmail.com';
const PLAIN = 'anna.testowa@gmail.com';
const LISTED_ID = '6d2f1c3a-0b4e-4f6a-9c1d-2e3f4a5b6c7d';
const OTHER_LISTED_ID = '0a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d';
const UNLISTED_ID = 'f0e1d2c3-b4a5-4968-8776-655443322110';
const SETTING = LISTED_ID;

// One customer in the shape of Easytools' real search answer (captured 2026-11-24).
const customer = (id: string, email: string, currency = 'pln') => ({
  id,
  name: 'Anna Testowa',
  email,
  avatar: null,
  first_seen: '2026-11-19T14:33:36+01:00',
  last_order: '2026-11-19T14:33:36+01:00',
  orders_count: 1,
  subscriptions_count: 0,
  lifetime_value: 0,
  currency,
});

const searchAnswer = (items: unknown[], totalPages = 1) => ({
  items,
  pagination: { current_page: 1, total_pages: totalPages, per_page: 10, total: items.length },
});

type Failure = number | 'network' | 'unreadable' | 'no items';

// A fake Easytools: answers GET /customers per currency from the given lists and records every
// request, or fails the way a test asks.
function fakeEasytools(byCurrency: Record<string, unknown[]> = {}, options: { fail?: Failure; totalPages?: number } = {}) {
  const requests: { url: string; headers: Record<string, string> }[] = [];
  const fetchFn = async (url: string, init?: { headers?: Record<string, string> }) => {
    requests.push({ url, headers: init?.headers ?? {} });
    const { fail } = options;
    if (fail === 'network') throw new TypeError('fetch failed');
    if (fail === 'unreadable') return new Response('<html>', { status: 200 });
    if (fail === 'no items') return new Response(JSON.stringify({ data: [] }), { status: 200 });
    if (typeof fail === 'number') return new Response('{}', { status: fail });
    const currency = new URL(url).searchParams.get('currency') ?? '';
    return new Response(JSON.stringify(searchAnswer(byCurrency[currency] ?? [], options.totalPages)), { status: 200 });
  };
  return { fetchFn, requests, urls: () => requests.map((r) => new URL(r.url)) };
}

test.describe('isListedTestPerson: who is a test person', () => {
  test('a listed alias is a test person; the search asks for the exact alias in PLN, with no product filter', async () => {
    const et = fakeEasytools({ pln: [customer(LISTED_ID, ALIAS)] });
    expect(await isListedTestPerson(et.fetchFn, API, HEADERS, SETTING, ALIAS)).toBe(true);
    const [asked] = et.urls();
    expect(et.urls()).toHaveLength(1);
    expect(asked.origin + asked.pathname).toBe(`${API}/customers`);
    expect(asked.searchParams.get('currency')).toBe('pln');
    expect(asked.searchParams.get('query')).toBe(ALIAS);
    expect(asked.searchParams.has('product')).toBe(false);
    expect(et.requests[0].headers).toEqual(HEADERS);
  });

  test('a listed alias found only under USD is a test person, after the PLN search', async () => {
    const et = fakeEasytools({ pln: [], usd: [customer(LISTED_ID, ALIAS, 'usd')] });
    expect(await isListedTestPerson(et.fetchFn, API, HEADERS, SETTING, ALIAS)).toBe(true);
    expect(et.urls().map((u) => u.searchParams.get('currency'))).toEqual(['pln', 'usd']);
    for (const url of et.urls()) expect(url.searchParams.get('query')).toBe(ALIAS);
  });

  test('an alias whose customer is not on the list is not a test person', async () => {
    const et = fakeEasytools({ pln: [customer(UNLISTED_ID, ALIAS)] });
    expect(await isListedTestPerson(et.fetchFn, API, HEADERS, SETTING, ALIAS)).toBe(false);
  });

  test('an alias with no customer, in either currency, is not a test person', async () => {
    const et = fakeEasytools({});
    expect(await isListedTestPerson(et.fetchFn, API, HEADERS, SETTING, ALIAS)).toBe(false);
    expect(et.urls().map((u) => u.searchParams.get('currency'))).toEqual(['pln', 'usd']);
  });

  test('the plain address’s customer is never taken for the alias', async () => {
    const et = fakeEasytools({ pln: [customer(LISTED_ID, PLAIN)], usd: [customer(LISTED_ID, PLAIN, 'usd')] });
    expect(await isListedTestPerson(et.fetchFn, API, HEADERS, SETTING, ALIAS)).toBe(false);
  });

  test('the setting’s IDs are split at commas, with spaces trimmed', async () => {
    const et = fakeEasytools({ pln: [customer(LISTED_ID, ALIAS)] });
    expect(await isListedTestPerson(et.fetchFn, API, HEADERS, ` ${OTHER_LISTED_ID} ,  ${LISTED_ID} , `, ALIAS)).toBe(true);
  });

  test('an ID is matched whole, not as part of another', async () => {
    const et = fakeEasytools({ pln: [customer(LISTED_ID, ALIAS)] });
    expect(await isListedTestPerson(et.fetchFn, API, HEADERS, `${LISTED_ID}-old`, ALIAS)).toBe(false);
  });

  test('a googlemail.com alias is looked up as typed', async () => {
    const typed = 'anna.testowa+test-signup@googlemail.com';
    const et = fakeEasytools({ pln: [customer(LISTED_ID, typed)] });
    expect(await isListedTestPerson(et.fetchFn, API, HEADERS, SETTING, typed)).toBe(true);
    expect(et.urls()[0].searchParams.get('query')).toBe(typed);
  });
});

test.describe('isListedTestPerson: when no lookup is made', () => {
  for (const setting of [undefined, '', '   ', ' , ,']) {
    test(`the setting ${setting === undefined ? 'unset' : JSON.stringify(setting)} turns the rule off: no lookup`, async () => {
      const et = fakeEasytools({ pln: [customer(LISTED_ID, ALIAS)] });
      expect(await isListedTestPerson(et.fetchFn, API, HEADERS, setting, ALIAS)).toBe(false);
      expect(et.requests).toEqual([]);
    });
  }

  for (const [label, address] of [
    ['an address at another provider, even with a "+" tag', 'anna.testowa+test-signup@example.com'],
    ['a Gmail address without a tag', PLAIN],
    ['a googlemail.com address without a tag', 'anna.testowa@googlemail.com'],
  ] as const) {
    test(`${label}: no lookup`, async () => {
      const et = fakeEasytools({ pln: [customer(LISTED_ID, address)] });
      expect(await isListedTestPerson(et.fetchFn, API, HEADERS, SETTING, address)).toBe(false);
      expect(et.requests).toEqual([]);
    });
  }
});

test.describe('isListedTestPerson: a lookup that cannot decide throws, so the caller folds', () => {
  for (const [label, fail] of [
    ['an Easytools error (500)', 500],
    ['an answer other than 200 (404)', 404],
    ['a network failure', 'network'],
    ['unreadable JSON', 'unreadable'],
    ['an answer without items', 'no items'],
  ] as const) {
    test(`${label} throws`, async () => {
      const et = fakeEasytools({}, { fail });
      await expect(isListedTestPerson(et.fetchFn, API, HEADERS, SETTING, ALIAS)).rejects.toBeInstanceOf(TestPersonLookupError);
    });
  }

  test('two customers with exactly this address throw, even when both are listed', async () => {
    const et = fakeEasytools({ pln: [customer(LISTED_ID, ALIAS), customer(OTHER_LISTED_ID, ALIAS)] });
    await expect(
      isListedTestPerson(et.fetchFn, API, HEADERS, `${LISTED_ID},${OTHER_LISTED_ID}`, ALIAS),
    ).rejects.toBeInstanceOf(TestPersonLookupError);
  });

  test('an answer of more than one page throws: the rest could hold a second customer', async () => {
    const et = fakeEasytools({ pln: [customer(LISTED_ID, ALIAS)] }, { totalPages: 2 });
    await expect(isListedTestPerson(et.fetchFn, API, HEADERS, SETTING, ALIAS)).rejects.toBeInstanceOf(TestPersonLookupError);
  });

  test('no error message carries the address or the key', async () => {
    for (const fail of [500, 'network', 'unreadable', 'no items'] as const) {
      const et = fakeEasytools({}, { fail });
      const error = await isListedTestPerson(et.fetchFn, API, HEADERS, SETTING, ALIAS).catch((e: unknown) => e);
      expect(error).toBeInstanceOf(TestPersonLookupError);
      const message = (error as Error).message.toLowerCase();
      expect(message).not.toContain('anna');
      expect(message).not.toContain('@');
      expect(message).not.toContain('bearer');
    }
  });
});
