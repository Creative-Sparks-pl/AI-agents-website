import { test, expect } from '@playwright/test';
import {
  COUNT_PLACEHOLDER,
  LIVE_SITE_FILE,
  MINIMUM_SHOWN,
  ORDERS_URL,
  USER_AGENT,
  countDownloads,
  createDownloadsReader,
  fillCount,
  formatShown,
  hasPlaceholder,
  resolveShownDownloads,
  roundDown,
  type Order,
  type ResolveOptions,
} from '../../src/lib/free-skill-downloads';

// Fixture orders shaped like Easytools' `GET /api/v1/orders` items. All addresses are made up.
const order = (product_name: string, customer_email: string, extra: Partial<Order> = {}): Order => ({
  status: 'completed',
  amount: 0,
  product_name,
  customer_email,
  ...extra,
});

const FIXTURE_EMAILS = ['ala@example.com', 'bob@example.org', 'cyd@example.net', 'dee@example.com'];

interface FakeCall {
  url: string;
  init: RequestInit | undefined;
}

// A fake fetch: `pages` are the orders pages Easytools answers (null = that page fails with 500),
// `live` is the live-site file's answer (null = it fails).
function fakeFetch({ pages, live }: { pages: (Order[] | null)[]; live: unknown | null }) {
  const calls: FakeCall[] = [];
  const fetchFn = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });
    if (url.startsWith(ORDERS_URL)) {
      const page = Number(new URL(url).searchParams.get('page'));
      const items = pages[page - 1];
      if (!items) return new Response('{"error":"server"}', { status: 500 });
      return Response.json({ items, pagination: { current_page: page, total_pages: pages.length, per_page: 100 } });
    }
    if (url === LIVE_SITE_FILE) {
      return live === null ? new Response('gone', { status: 404 }) : Response.json(live);
    }
    throw new Error(`unexpected request ${url}`);
  }) as typeof fetch;
  return { fetchFn, calls };
}

function recordingLog() {
  const lines: { level: 'info' | 'warn'; line: string }[] = [];
  return {
    lines,
    warnings: () => lines.filter((l) => l.level === 'warn').map((l) => l.line),
    log: {
      info: (line: string) => lines.push({ level: 'info', line }),
      warn: (line: string) => lines.push({ level: 'warn', line }),
    },
  };
}

function options(overrides: Partial<ResolveOptions> & Pick<ResolveOptions, 'fetchFn' | 'log'>): ResolveOptions {
  return { apiKey: 'test-key', dev: false, ...overrides };
}

const ordersOrigin = (calls: FakeCall[]) => calls.filter((c) => c.url.startsWith(ORDERS_URL));

test.describe('countDownloads — which orders count', () => {
  test('allow-list: every listed audit and planning name counts, other products do not', () => {
    const orders = [
      order('Darmowe narzędzie do audytu UX strony', 'a1@example.com'),
      order('Free UX Audit Skill', 'a2@example.com'),
      order('Homepage UX Audit Skill', 'a3@example.com'),
      order('Skill do audytu UX strony głównej', 'a4@example.com'),
      order('Skill do planowania stron', 'p1@example.com'),
      order('Website Planning Skill', 'p2@example.com'),
      order('UX Design Skill', 'x1@example.com'),
      order('UX Design Lead NGO', 'x2@example.com'),
      order('UX Design Skill', 'x3@example.com', { amount: 499 }),
    ];
    expect(countDownloads(orders).count).toBe(6);
  });

  test('completed orders only', () => {
    const orders = [
      order('Free UX Audit Skill', 'a1@example.com'),
      order('Free UX Audit Skill', 'a2@example.com', { status: 'pending' }),
      order('Free UX Audit Skill', 'a3@example.com', { status: 'refunded' }),
      order('Free UX Audit Skill', 'a4@example.com', { status: undefined }),
    ];
    expect(countDownloads(orders).count).toBe(1);
  });

  test('own domains are left out, subdomains and upper case included', () => {
    const orders = [
      order('Free UX Audit Skill', 'owner@creativesparks.pl'),
      order('Free UX Audit Skill', 'Team@FuseCollective.com'),
      order('Free UX Audit Skill', 'dev@mail.creativesparks.pl'),
      order('Free UX Audit Skill', 'someone@notcreativesparks.pl'),
      order('Free UX Audit Skill', 'real@example.com'),
    ];
    expect(countDownloads(orders).count).toBe(2);
  });

  test('the misspelled planning product is left out', () => {
    const result = countDownloads([order('Website Planinng Skill', 'p1@example.com')]);
    expect(result.count).toBe(0);
    expect(result.unlistedFreeNames).toEqual(['Website Planinng Skill']);
  });

  test('repeat signups count once per skill', () => {
    const orders = [
      order('Free UX Audit Skill', 'ala@example.com'),
      order('Homepage UX Audit Skill', 'ala@example.com'),
      order('Website Planning Skill', 'ala@example.com'),
      order('Skill do planowania stron', 'ala@example.com'),
    ];
    expect(countDownloads(orders).count).toBe(2);
  });

  test('case and whitespace in emails do not make a new download', () => {
    const orders = [
      order('Free UX Audit Skill', 'ala@example.com'),
      order('Free UX Audit Skill', '  ALA@Example.com '),
      order('Free UX Audit Skill', 'Ala@example.COM\t'),
      order('Free UX Audit Skill', ''),
    ];
    expect(countDownloads(orders).count).toBe(1);
  });

  test('unlisted free (amount 0) products are reported by name, paid ones are not', () => {
    const orders = [
      order('UX Design Skill', 'x1@example.com'),
      order('Brand New Free Skill', 'x2@example.com'),
      order('Brand New Free Skill', 'x3@example.com'),
      order('Paid Thing', 'x4@example.com', { amount: 99 }),
      order('Free UX Audit Skill', 'a1@example.com'),
    ];
    expect(countDownloads(orders).unlistedFreeNames).toEqual(['Brand New Free Skill', 'UX Design Skill']);
  });
});

test.describe('rounding, formatting and the placeholder', () => {
  test('rounds down to the nearest 50', () => {
    expect(roundDown(233)).toBe(200);
    expect(roundDown(250)).toBe(250);
    expect(roundDown(299)).toBe(250);
    expect(roundDown(1049)).toBe(1000);
  });

  test('formats per locale', () => {
    expect(formatShown(200, 'en')).toBe('200');
    expect(formatShown(200, 'pl')).toBe('200');
    expect(formatShown(1000, 'en')).toBe('1,000');
    expect(formatShown(12000, 'en')).toBe('12,000');
    expect(formatShown(12000, 'pl')).toBe(new Intl.NumberFormat('pl-PL').format(12000));
    expect(formatShown(12000, 'pl')).not.toContain(',');
  });

  test('fills the placeholder and detects it', () => {
    const text = `${COUNT_PLACEHOLDER}+ downloads of free skills for Claude Code, Codex, Cursor...`;
    expect(hasPlaceholder(text)).toBe(true);
    expect(hasPlaceholder('Free skill for Claude Code, Codex, Cursor...')).toBe(false);
    expect(hasPlaceholder(undefined)).toBe(false);
    expect(fillCount(text, '200')).toBe('200+ downloads of free skills for Claude Code, Codex, Cursor...');
  });
});

test.describe('the Easytools read', () => {
  test('requests carry per_page=100, the key, Accept, the site User-Agent and a timeout signal', async () => {
    const { fetchFn, calls } = fakeFetch({ pages: [[order('Free UX Audit Skill', 'ala@example.com')]], live: null });
    await resolveShownDownloads(options({ fetchFn, log: recordingLog().log }));
    const [call] = ordersOrigin(calls);
    expect(new URL(call.url).searchParams.get('per_page')).toBe('100');
    const headers = call.init?.headers as Record<string, string>;
    expect(headers.Authorization).toBe('Bearer test-key');
    expect(headers.Accept).toBe('application/json');
    expect(headers['User-Agent']).toBe(USER_AGENT);
    expect(call.init?.signal).toBeInstanceOf(AbortSignal);
  });

  test('every page up to total_pages is read and counted', async () => {
    const pages = [
      [order('Free UX Audit Skill', 'p1@example.com')],
      Array.from({ length: 120 }, (_, i) => order('Website Planning Skill', `u${i}@example.com`)),
      Array.from({ length: 140 }, (_, i) => order('Free UX Audit Skill', `v${i}@example.com`)),
    ];
    const { fetchFn, calls } = fakeFetch({ pages, live: null });
    const result = await resolveShownDownloads(options({ fetchFn, log: recordingLog().log }));
    expect(ordersOrigin(calls).map((c) => new URL(c.url).searchParams.get('page'))).toEqual(['1', '2', '3']);
    expect(result).toEqual({ shown: 250, source: 'easytools' });
  });
});

test.describe('fallback order', () => {
  const manyOrders = Array.from({ length: 233 }, (_, i) => order('Free UX Audit Skill', `user${i}@example.com`));

  test('an Easytools answer gives source easytools', async () => {
    const { fetchFn, calls } = fakeFetch({ pages: [manyOrders], live: { shown: 450 } });
    const rec = recordingLog();
    expect(await resolveShownDownloads(options({ fetchFn, log: rec.log }))).toEqual({ shown: 200, source: 'easytools' });
    expect(calls.some((c) => c.url === LIVE_SITE_FILE)).toBe(false);
    expect(rec.warnings()).toEqual([]);
  });

  test('one failed orders page falls back to the live-site number', async () => {
    const { fetchFn } = fakeFetch({ pages: [manyOrders, null, manyOrders], live: { shown: 350, source: 'easytools' } });
    const rec = recordingLog();
    expect(await resolveShownDownloads(options({ fetchFn, log: rec.log }))).toEqual({ shown: 350, source: 'live-site' });
    expect(rec.warnings()).toHaveLength(1);
  });

  test('a timed-out orders request falls back too', async () => {
    const live = fakeFetch({ pages: [], live: { shown: 300 } });
    const fetchFn = (async (input: string | URL | Request, init?: RequestInit) => {
      if (String(input).startsWith(ORDERS_URL)) throw new DOMException('The operation was aborted due to timeout', 'TimeoutError');
      return live.fetchFn(input, init);
    }) as typeof fetch;
    const rec = recordingLog();
    expect(await resolveShownDownloads(options({ fetchFn, log: rec.log }))).toEqual({ shown: 300, source: 'live-site' });
    expect(rec.warnings()[0]).toContain('timed out');
  });

  test('Easytools and the live site both failing gives the minimum 200', async () => {
    const { fetchFn } = fakeFetch({ pages: [null], live: null });
    const rec = recordingLog();
    expect(await resolveShownDownloads(options({ fetchFn, log: rec.log }))).toEqual({ shown: MINIMUM_SHOWN, source: 'minimum' });
  });

  test('a live-site file without a shown number counts as failed', async () => {
    const { fetchFn } = fakeFetch({ pages: [null], live: { source: 'easytools' } });
    expect(await resolveShownDownloads(options({ fetchFn, log: recordingLog().log }))).toEqual({ shown: 200, source: 'minimum' });
  });

  test('no key falls back without asking Easytools', async () => {
    const { fetchFn, calls } = fakeFetch({ pages: [manyOrders], live: { shown: 400 } });
    const rec = recordingLog();
    expect(await resolveShownDownloads(options({ apiKey: undefined, fetchFn, log: rec.log }))).toEqual({ shown: 400, source: 'live-site' });
    expect(ordersOrigin(calls)).toHaveLength(0);
    expect(rec.warnings()[0]).toContain('no EASYCART_API_KEY');
  });

  test('dev mode gives the minimum with zero fetch calls', async () => {
    const { fetchFn, calls } = fakeFetch({ pages: [manyOrders], live: { shown: 400 } });
    const rec = recordingLog();
    expect(await resolveShownDownloads(options({ dev: true, fetchFn, log: rec.log }))).toEqual({ shown: 200, source: 'minimum' });
    expect(calls).toHaveLength(0);
    expect(rec.lines).toHaveLength(0);
  });

  test('one warning line per fallback step', async () => {
    const both = recordingLog();
    await resolveShownDownloads(options({ fetchFn: fakeFetch({ pages: [null], live: null }).fetchFn, log: both.log }));
    expect(both.warnings()).toHaveLength(2);
    expect(both.warnings()[0]).toContain('Easytools count unavailable');
    expect(both.warnings()[1]).toContain('live-site number unavailable');

    const one = recordingLog();
    await resolveShownDownloads(options({ fetchFn: fakeFetch({ pages: [null], live: { shown: 250 } }).fetchFn, log: one.log }));
    expect(one.warnings()).toHaveLength(1);
  });
});

test.describe('once per build and log safety', () => {
  test('two calls in one run make one set of Easytools requests', async () => {
    const { fetchFn, calls } = fakeFetch({ pages: [[order('Free UX Audit Skill', 'ala@example.com')], []], live: null });
    const read = createDownloadsReader(() => options({ fetchFn, log: recordingLog().log }));
    const [first, second] = await Promise.all([read(), read()]);
    await read();
    expect(first).toBe(second);
    expect(ordersOrigin(calls)).toHaveLength(2);
  });

  test('no fixture email appears in any logged line', async () => {
    const orders = [
      ...FIXTURE_EMAILS.map((e) => order('Free UX Audit Skill', e)),
      order('Unknown Free Thing', FIXTURE_EMAILS[0]),
    ];
    const ok = recordingLog();
    await resolveShownDownloads(options({ fetchFn: fakeFetch({ pages: [orders], live: null }).fetchFn, log: ok.log }));

    // A failing page whose body holds an email must not leak it into the warning either.
    const leaky = (async (input: string | URL | Request) =>
      String(input).startsWith(ORDERS_URL)
        ? new Response(`{"items":[{"customer_email":"${FIXTURE_EMAILS[1]}"`, { status: 200 })
        : new Response(`not json ${FIXTURE_EMAILS[2]}`, { status: 200 })) as typeof fetch;
    const failed = recordingLog();
    await resolveShownDownloads(options({ fetchFn: leaky, log: failed.log }));

    const logged = [...ok.lines, ...failed.lines].map((l) => l.line).join('\n');
    expect(failed.warnings()).toHaveLength(2);
    for (const email of FIXTURE_EMAILS) expect(logged).not.toContain(email);
    expect(logged).not.toMatch(/@/);
  });

  test('unknown amount-0 product names are logged by name', async () => {
    const orders = [order('Brand New Free Skill', 'x@example.com'), order('Free UX Audit Skill', 'ala@example.com')];
    const rec = recordingLog();
    await resolveShownDownloads(options({ fetchFn: fakeFetch({ pages: [orders], live: null }).fetchFn, log: rec.log }));
    const line = rec.lines.find((l) => l.line.includes('not counted'));
    expect(line?.line).toContain('Brand New Free Skill');
    expect(line?.level).toBe('info');
  });
});
