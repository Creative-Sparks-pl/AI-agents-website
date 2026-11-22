import { format } from 'node:util';
import { test, expect } from '@playwright/test';
import { handleSubscribe } from '../../src/pages/api/subscribe';

// The free sign-up's re-subscribe: after a new grant, a contact that opted out of all email is
// re-subscribed in Easymail. Every test drives the route's own handler with a fake Easytools, a
// fake Easymail and a stand-in for the platform's "run after the answer" hook. No request leaves
// the machine: the fake throws on any host it does not know.

const ADDRESS = 'jan.kowalski+news@example.com';
const ENCODED_ADDRESS = 'jan.kowalski%2Bnews%40example.com';
const EASYCART_KEY = 'easycart-test-key';
const EASYMAIL_KEY = 'easymail-test-key';
const UUID = '00000000-0000-4000-8000-000000000001';
// The Polish and English free audit products, as the route lists them.
const AUDIT_PL = '42c65e31-97e9-4cac-b849-44158246652f';
const AUDIT_EN = '868c5223-4b3e-4248-a3fd-01a029032a66';

const LOOKUP = `GET /api/v1/contacts?email=${ENCODED_ADDRESS}`;
const DETAIL = `GET /api/v1/contacts/${UUID}`;
const RESUBSCRIBE = `POST /api/v1/contacts/${UUID}/resubscribe`;

// Easymail's answers, in the shapes captured from the real API on 2026-11-21 (IDs, addresses and
// names replaced; the contact's lists shortened to two).
const contactsByEmail = (email: string) => ({
  data: [
    {
      uuid: UUID,
      email,
      first_name: 'Example',
      last_name: 'Example',
      phone: null,
      external_id: null,
      language: 'en',
      country_code: null,
      created_at: '2026-11-17T19:00:07Z',
      updated_at: '2026-11-18T14:24:07Z',
    },
  ],
  pagination: { current_page: 1, per_page: 100, total: 1 },
});
const CONTACTS_BY_EMAIL_NONE = { data: [], pagination: { current_page: 1, per_page: 100, total: 0 } };
const RATE_LIMITED = { error: { code: 'RATE_LIMITED', message: 'Too many requests. Please retry after 60 seconds.' } };

interface ContactState {
  status: 'subscribed' | 'unsubscribed' | 'suppressed';
  unsubscribed: boolean;
  suppressed: boolean;
  // The address Easymail lists the contact under; the looked-up address unless a test says otherwise.
  email?: string;
}
const SUBSCRIBED: ContactState = { status: 'subscribed', unsubscribed: false, suppressed: false };
const OPTED_OUT: ContactState = { status: 'unsubscribed', unsubscribed: true, suppressed: false };
const SUPPRESSED_ONLY: ContactState = { status: 'suppressed', unsubscribed: false, suppressed: true };
const OPTED_OUT_AND_SUPPRESSED: ContactState = { status: 'suppressed', unsubscribed: true, suppressed: true };

const contactDetail = (state: ContactState) => ({
  data: {
    uuid: UUID,
    email: state.email ?? ADDRESS,
    first_name: 'Example',
    last_name: 'Example',
    phone: null,
    external_id: null,
    language: 'en',
    country_code: null,
    timezone: null,
    lists: [
      { uuid: '00000000-0000-4000-8000-000000000002', name: '[PL] Website planning - onboarding' },
      { uuid: '00000000-0000-4000-8000-000000000003', name: '[PL] Homepage audit - onboarding' },
    ],
    custom_fields: [{ field_key: 'install-link', value: 'value' }],
    status: state.status,
    subscription: {
      is_unsubscribed: state.unsubscribed,
      unsubscribed_at: state.unsubscribed ? '2026-11-21T20:09:35Z' : null,
    },
    deliverability: {
      is_suppressed: state.suppressed,
      suppressed_at: state.suppressed ? '2026-11-21T20:09:35Z' : null,
      is_bounced: state.suppressed,
      last_bounce_type: null,
      last_bounced_at: null,
      is_complained: false,
      last_complained_at: null,
    },
    engagement: { last_sent_at: '2026-11-20T07:46:15Z', last_opened_at: '2026-11-20T23:05:44Z', last_clicked_at: null },
    created_at: '2026-11-17T19:00:07Z',
    updated_at: '2026-11-18T14:24:07Z',
  },
});

type EasymailStep = 'lookup' | 'detail' | 'resubscribe';
type Failure = 'network' | 'unreadable' | 500 | 429;

interface WorldOptions {
  // The Easymail contact behind the address; none by default.
  contact?: ContactState;
  // Free products the address already holds in Easytools.
  holds?: string[];
  // Easytools' answer to the holder check and to the grant.
  customersStatus?: number;
  grant?: number | 'network';
  grantBody?: string;
  // Makes one Easymail step fail.
  fail?: { at: EasymailStep; with: Failure };
  // Keeps every Easymail answer back until this resolves.
  hold?: Promise<void>;
  easymailKey?: string | undefined;
  // The platform hook itself fails.
  hookThrows?: boolean;
}

interface Recorded {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: unknown;
}

const answer = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

function world(options: WorldOptions = {}) {
  const requests: Recorded[] = [];
  // Work the handler handed to the "run after the answer" hook.
  const after: Promise<unknown>[] = [];

  const easytools = (method: string, url: URL) => {
    if (method === 'GET' && url.pathname === '/api/v1/customers') {
      if (options.customersStatus) return new Response('{}', { status: options.customersStatus });
      const holds = (options.holds ?? []).includes(url.searchParams.get('product') ?? '');
      const items = holds && url.searchParams.get('currency') === 'pln' ? [{ id: 'c1', email: ADDRESS }] : [];
      return answer({ items, pagination: { total_pages: 1 } });
    }
    if (method === 'POST' && url.pathname === '/api/v1/product-access') {
      if (options.grant === 'network') throw new TypeError('fetch failed');
      return new Response(options.grantBody ?? '{}', { status: options.grant ?? 201 });
    }
    throw new Error(`unexpected Easytools request: ${method} ${url.pathname}`);
  };

  const easymail = async (method: string, url: URL) => {
    if (options.hold) await options.hold;
    const step: EasymailStep | undefined =
      method === 'GET' && url.pathname === '/api/v1/contacts'
        ? 'lookup'
        : method === 'GET' && url.pathname === `/api/v1/contacts/${UUID}`
          ? 'detail'
          : method === 'POST' && url.pathname === `/api/v1/contacts/${UUID}/resubscribe`
            ? 'resubscribe'
            : undefined;
    // Anything else (a create, a list change) is recorded and refused, so a test sees it.
    if (!step) return answer({ error: { code: 'NOT_FOUND' } }, 404);
    if (options.fail?.at === step) {
      const failure = options.fail.with;
      if (failure === 'network') throw new TypeError('fetch failed');
      if (failure === 'unreadable') return new Response('<html>', { status: 200 });
      return answer(failure === 429 ? RATE_LIMITED : { error: { code: 'SERVER_ERROR' } }, failure);
    }
    const contact = options.contact;
    if (step === 'lookup') {
      const asked = url.searchParams.get('email') ?? '';
      return answer(contact ? contactsByEmail(contact.email ?? asked) : CONTACTS_BY_EMAIL_NONE);
    }
    if (!contact) return answer({ error: { code: 'NOT_FOUND' } }, 404);
    if (step === 'detail') return answer(contactDetail(contact));
    // Re-subscribing answers the full contact, subscribed; a suppression stays as it was.
    return answer(
      contactDetail({ ...contact, unsubscribed: false, status: contact.suppressed ? 'suppressed' : 'subscribed' }),
    );
  };

  const fetchFn = async (input: unknown, init?: { method?: string; headers?: Record<string, string>; body?: unknown }) => {
    const url = new URL(String(input));
    const method = init?.method ?? 'GET';
    requests.push({ method, url: url.href, headers: init?.headers ?? {}, body: init?.body });
    if (url.host === 'cart.easy.tools') return easytools(method, url);
    if (url.host === 'email.easy.tools') return easymail(method, url);
    throw new Error(`a test must not reach ${url.host}`);
  };

  const deps = {
    fetchFn: fetchFn as unknown as typeof fetch,
    easycartApiKey: EASYCART_KEY,
    easymailApiKey: 'easymailKey' in options ? options.easymailKey : EASYMAIL_KEY,
    runAfterAnswer: (work: Promise<unknown>) => {
      if (options.hookThrows) throw new Error('no request context');
      after.push(work);
    },
  };

  const to = (host: string) => requests.filter((r) => new URL(r.url).host === host);
  const calls = (host: string) =>
    to(host).map((r) => {
      const url = new URL(r.url);
      return `${r.method} ${url.pathname}${url.search}`;
    });

  return {
    after,
    // Sends the sign-up form's request through the handler.
    submit: (body: Record<string, unknown> = {}) =>
      handleSubscribe(
        new Request('https://agents.creativesparks.pl/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: ADDRESS, skill: 'audit', locale: 'pl', ...body }),
        }),
        deps,
      ),
    // Waits for the handed-over work; a rejection here fails the test, as it would be unhandled in production.
    settle: () => Promise.all(after),
    easymailRequests: () => to('email.easy.tools'),
    easymailCalls: () => calls('email.easy.tools'),
    easytoolsCalls: () => calls('cart.easy.tools').map((call) => call.split('?')[0]),
  };
}

const GRANTED = { ok: true, granted: true };

async function expectGranted(response: Response) {
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual(GRANTED);
}

// Every line the handler logs during a test, as one string each.
let logs: string[] = [];
const original = { log: console.log, warn: console.warn, error: console.error };

test.beforeEach(() => {
  logs = [];
  for (const level of ['log', 'warn', 'error'] as const) {
    console[level] = (...args: unknown[]) => {
      logs.push(format(...args));
    };
  }
});

test.afterEach(() => {
  Object.assign(console, original);
  // No log line carries the address, in any spelling, or a key.
  for (const line of logs) {
    expect(line.toLowerCase()).not.toContain(ADDRESS);
    expect(line.toLowerCase()).not.toContain(ENCODED_ADDRESS.toLowerCase());
    expect(line).not.toContain(ADDRESS.split('@')[0]);
    expect(line).not.toContain(EASYMAIL_KEY);
    expect(line).not.toContain(EASYCART_KEY);
    expect(line).not.toContain(UUID);
  }
});

test.describe('re-subscribe after a new free grant', () => {
  test('an opted-out contact is looked up, read and re-subscribed once, in that order', async () => {
    const w = world({ contact: OPTED_OUT });
    await expectGranted(await w.submit());
    expect(w.after).toHaveLength(1);
    await w.settle();
    expect(w.easymailCalls()).toEqual([LOOKUP, DETAIL, RESUBSCRIBE]);
    expect(logs.filter((line) => line.includes('opt-out'))).toHaveLength(1);
  });

  test('the address is looked up as granted: trimmed and in lower case', async () => {
    const w = world({ contact: OPTED_OUT });
    await expectGranted(await w.submit({ email: '  Jan.Kowalski+News@Example.com ' }));
    await w.settle();
    expect(w.easymailCalls()).toEqual([LOOKUP, DETAIL, RESUBSCRIBE]);
  });

  test('a subscribed contact gets no call beyond the lookup and the read', async () => {
    const w = world({ contact: SUBSCRIBED });
    await expectGranted(await w.submit());
    await w.settle();
    expect(w.easymailCalls()).toEqual([LOOKUP, DETAIL]);
  });

  test('no contact: the lookup is the only request, and no contact is created', async () => {
    const w = world();
    await expectGranted(await w.submit());
    await w.settle();
    expect(w.easymailCalls()).toEqual([LOOKUP]);
  });

  test('a lookup hit under a different address is left alone', async () => {
    const w = world({ contact: { ...OPTED_OUT, email: 'jan.kowalski+news@example.com.pl' } });
    await expectGranted(await w.submit());
    await w.settle();
    expect(w.easymailCalls()).toEqual([LOOKUP]);
  });

  test('a contact that is only suppressed is left alone', async () => {
    const w = world({ contact: SUPPRESSED_ONLY });
    await expectGranted(await w.submit());
    await w.settle();
    expect(w.easymailCalls()).toEqual([LOOKUP, DETAIL]);
  });

  // The opt-out is the person's own choice and the new sign-up reverses it; the suppression is
  // Easymail's and stays, so nothing follows the re-subscribe.
  test('an opted-out and suppressed contact is re-subscribed once, and nothing more is done', async () => {
    const w = world({ contact: OPTED_OUT_AND_SUPPRESSED });
    await expectGranted(await w.submit());
    await w.settle();
    expect(w.easymailCalls()).toEqual([LOOKUP, DETAIL, RESUBSCRIBE]);
  });

  test('every Easymail request carries the Easymail key and a client name, and no body', async () => {
    const w = world({ contact: OPTED_OUT });
    await w.submit();
    await w.settle();
    const requests = w.easymailRequests();
    expect(requests).toHaveLength(3);
    for (const request of requests) {
      expect(new URL(request.url).origin + new URL(request.url).pathname).toMatch(/^https:\/\/email\.easy\.tools\/api\/v1\/contacts/);
      expect(request.headers.Authorization).toBe(`Bearer ${EASYMAIL_KEY}`);
      expect(request.headers.Accept).toBe('application/json');
      expect(request.headers['User-Agent']).toMatch(/^creativesparks-site\//);
      expect(request.body).toBeUndefined();
    }
  });

  test('the address appears only in the lookup, encoded', async () => {
    const w = world({ contact: OPTED_OUT });
    await w.submit();
    await w.settle();
    const [lookup, ...rest] = w.easymailRequests();
    expect(lookup.url).toBe(`https://email.easy.tools/api/v1/contacts?email=${ENCODED_ADDRESS}`);
    for (const request of [lookup, ...rest]) {
      expect(request.url).not.toContain(ADDRESS);
      expect(request.url).not.toContain('@');
    }
    for (const request of rest) {
      expect(request.url.toLowerCase()).not.toContain(ENCODED_ADDRESS.toLowerCase());
      expect(request.url).not.toContain('kowalski');
    }
  });
});

test.describe('only a new grant re-subscribes', () => {
  for (const [label, product] of [
    ['in the form’s language', AUDIT_PL],
    ['in the other language', AUDIT_EN],
  ] as const) {
    test(`a holder ${label} who submits again reaches Easymail with nothing`, async () => {
      const w = world({ contact: OPTED_OUT, holds: [product] });
      await expectGranted(await w.submit());
      await w.settle();
      expect(w.easytoolsCalls()).not.toContain('POST /api/v1/product-access');
      expect(w.after).toHaveLength(0);
      expect(w.easymailCalls()).toEqual([]);
    });
  }

  // A failed holder check still grants, but cannot tell a new sign-up from a repeat one, so the
  // opt-out stays as it is.
  test('a grant made after a failed holder check re-subscribes nobody', async () => {
    const w = world({ contact: OPTED_OUT, customersStatus: 500 });
    await expectGranted(await w.submit());
    await w.settle();
    expect(w.easytoolsCalls()).toContain('POST /api/v1/product-access');
    expect(w.after).toHaveLength(0);
    expect(w.easymailCalls()).toEqual([]);
  });

  test('a grant Easytools refuses reaches Easymail with nothing', async () => {
    const w = world({ contact: OPTED_OUT, grant: 500 });
    const response = await w.submit();
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ ok: false, reason: 'upstream_error', stage: 'grant', status: 500 });
    await w.settle();
    expect(w.after).toHaveLength(0);
    expect(w.easymailCalls()).toEqual([]);
  });

  test('a grant refused for its address reaches Easymail with nothing', async () => {
    const w = world({ contact: OPTED_OUT, grant: 422, grantBody: '{"errors":{"email":["invalid"]}}' });
    const response = await w.submit();
    expect(response.status).toBe(422);
    await w.settle();
    expect(w.after).toHaveLength(0);
    expect(w.easymailCalls()).toEqual([]);
  });

  test('a grant that gets no answer reaches Easymail with nothing', async () => {
    const w = world({ contact: OPTED_OUT, grant: 'network' });
    const response = await w.submit();
    expect(response.status).toBe(500);
    await w.settle();
    expect(w.after).toHaveLength(0);
    expect(w.easymailCalls()).toEqual([]);
  });

  test('a bot’s submission reaches neither Easytools nor Easymail', async () => {
    const w = world({ contact: OPTED_OUT });
    const response = await w.submit({ website: 'https://spam.example' });
    expect(await response.json()).toEqual({ ok: true });
    expect(w.after).toHaveLength(0);
    expect(w.easytoolsCalls()).toEqual([]);
    expect(w.easymailCalls()).toEqual([]);
  });
});

test.describe('the form’s answer never depends on Easymail', () => {
  test('the answer is produced while the Easymail work is still open', async () => {
    let release!: () => void;
    const hold = new Promise<void>((resolve) => (release = resolve));
    const w = world({ contact: OPTED_OUT, hold });

    const answered = await Promise.race([
      w.submit(),
      new Promise<'waited for Easymail'>((resolve) => setTimeout(() => resolve('waited for Easymail'), 2000)),
    ]);
    expect(answered).not.toBe('waited for Easymail');
    await expectGranted(answered as Response);

    // The work was handed to the platform hook and has not finished: its first request is still open.
    expect(w.after).toHaveLength(1);
    let finished = false;
    void w.after[0].then(() => (finished = true));
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(finished).toBe(false);
    expect(w.easymailCalls()).toEqual([LOOKUP]);

    release();
    await w.settle();
    expect(w.easymailCalls()).toEqual([LOOKUP, DETAIL, RESUBSCRIBE]);
  });

  const failures: { name: string; fail: { at: EasymailStep; with: Failure }; calls: string[] }[] = [
    { name: 'the lookup gets no answer', fail: { at: 'lookup', with: 'network' }, calls: [LOOKUP] },
    { name: 'the lookup answers 500', fail: { at: 'lookup', with: 500 }, calls: [LOOKUP] },
    { name: 'the lookup is rate-limited (429)', fail: { at: 'lookup', with: 429 }, calls: [LOOKUP] },
    { name: 'the lookup answers something unreadable', fail: { at: 'lookup', with: 'unreadable' }, calls: [LOOKUP] },
    { name: 'the read answers 500', fail: { at: 'detail', with: 500 }, calls: [LOOKUP, DETAIL] },
    { name: 'the read gets no answer', fail: { at: 'detail', with: 'network' }, calls: [LOOKUP, DETAIL] },
    { name: 'the re-subscribe answers 500', fail: { at: 'resubscribe', with: 500 }, calls: [LOOKUP, DETAIL, RESUBSCRIBE] },
    { name: 'the re-subscribe is rate-limited (429)', fail: { at: 'resubscribe', with: 429 }, calls: [LOOKUP, DETAIL, RESUBSCRIBE] },
    { name: 'the re-subscribe gets no answer', fail: { at: 'resubscribe', with: 'network' }, calls: [LOOKUP, DETAIL, RESUBSCRIBE] },
  ];
  for (const { name, fail, calls } of failures) {
    test(`${name}: the answer is unchanged, nothing throws, nothing is retried`, async () => {
      const w = world({ contact: OPTED_OUT, fail });
      await expectGranted(await w.submit());
      expect(w.after).toHaveLength(1);
      await w.settle();
      expect(w.easymailCalls()).toEqual(calls);
      expect(logs.filter((line) => line.includes('re-subscribe failed'))).toHaveLength(1);
    });
  }

  for (const easymailKey of [undefined, '']) {
    test(`EASYMAIL_API_KEY ${easymailKey === undefined ? 'unset' : 'empty'}: granted, one log line, no Easymail request`, async () => {
      const w = world({ contact: OPTED_OUT, easymailKey });
      await expectGranted(await w.submit());
      await w.settle();
      expect(w.after).toHaveLength(0);
      expect(w.easymailCalls()).toEqual([]);
      expect(logs.filter((line) => line.includes('EASYMAIL_API_KEY'))).toHaveLength(1);
    });
  }

  test('a platform hook that throws leaves the answer unchanged', async () => {
    const w = world({ contact: OPTED_OUT, hookThrows: true });
    await expectGranted(await w.submit());
  });
});
