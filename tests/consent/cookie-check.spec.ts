import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { test, expect, type Browser, type Page } from '@playwright/test';
import type { ListCategory, StorageKind } from '../../src/lib/consent-config';
import type { ConsentCategory } from '../../src/lib/consent-record';
import { blockDataSending, consentContent, DATA_SENDING, setConsent } from './consent-helpers';

// The automated cookie check (it replaces Cookiebot's scanner). Every deployed page and every
// example file is opened in each consent state, one video is started where there is one, and
// everything the browser stores and every outside host it contacts is compared with the cookie
// list in src/content/consent/. A key or host missing from the list, or one that appears in a
// state whose categories do not allow it, fails the check with its page, state and name.
//
// Runs against the dev server by default, or against a deployment with BASE_URL set, e.g.
//   BASE_URL=https://agents.creativesparks.pl npx playwright test tests/consent/cookie-check.spec.ts --project="Desktop Chrome"
// The real Meta, PostHog and Wistia scripts load, but the shared blocker aborts every request that
// would send data and answers the site's own /api/meta-capi and /api/consent in the browser, so a
// run counts no visit, sends no event and writes no consent record.

test.skip(({ isMobile }) => isMobile, 'Runs in the desktop project only, to keep the run short.');
test.describe.configure({ mode: 'parallel' });

// ---------- what to check ----------

const ROOT = process.cwd();

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

/** Every deployed page at its slash address (archive/ is not deployed), plus every example file. */
function addressesToCheck(): string[] {
  const pagesDir = join(ROOT, 'src', 'pages');
  const pages = walk(pagesDir)
    .map((file) => relative(pagesDir, file).split(sep).join('/'))
    .filter((rel) => rel.endsWith('.astro') && !rel.startsWith('archive/') && !rel.startsWith('api/'))
    .map((rel) => {
      const route = rel.replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
      return route === '' ? '/' : `/${route}/`;
    });
  const examples = readdirSync(join(ROOT, 'public', 'examples'))
    .filter((name) => name.endsWith('.html'))
    .map((name) => `/examples/${name}`);
  return [...pages.sort(), ...examples.sort()];
}

interface ConsentState {
  name: string;
  /** Categories stored in the banner's cookie before the page opens; none means no choice yet. */
  preset?: ConsentCategory[];
  /** After the page settles, withdraw everything from the banner, then open the page again. */
  withdraw?: boolean;
  allowed: ListCategory[];
}

const ALWAYS: ListCategory[] = ['necessary', 'cookieless'];
const STATES: ConsentState[] = [
  { name: 'no choice', allowed: ALWAYS },
  { name: 'reject all', preset: [], allowed: ALWAYS },
  { name: 'statistics only', preset: ['statistics'], allowed: [...ALWAYS, 'statistics'] },
  { name: 'marketing only', preset: ['marketing'], allowed: [...ALWAYS, 'marketing'] },
  { name: 'accept all', preset: ['statistics', 'marketing'], allowed: [...ALWAYS, 'statistics', 'marketing'] },
  { name: 'withdrawal from accept all', preset: ['statistics', 'marketing'], withdraw: true, allowed: ALWAYS },
];

// ---------- the allow-list: the cookie list in both languages ----------

interface ListedItem {
  category: ListCategory;
  service: string;
}

const LIST = [...consentContent('pl').cookies, ...consentContent('en').cookies];

/** Names ending in `*` match any suffix, as in the cookie list. */
const nameMatches = (pattern: string, name: string) =>
  pattern.endsWith('*') ? name.startsWith(pattern.slice(0, -1)) : name === pattern;

/** A leading `*.` stands for any subdomain, as in the cookie list. */
const hostMatches = (pattern: string, host: string) =>
  pattern.startsWith('*.') ? host.endsWith(pattern.slice(1)) : host === pattern;

function listedStorage(kind: StorageKind, name: string): ListedItem[] {
  return LIST.filter((entry) => entry.storage.some((item) => item.kind === kind && nameMatches(item.name, name))).map(
    (entry) => ({ category: entry.category, service: entry.id }),
  );
}

function listedHost(host: string): ListedItem[] {
  return LIST.filter((entry) => entry.hosts.some((pattern) => hostMatches(pattern, host))).map((entry) => ({
    category: entry.category,
    service: entry.id,
  }));
}

// ---------- one page in one state ----------

interface Observation {
  storage: { kind: StorageKind; name: string; where: string }[];
  hosts: string[];
  /** Data-sending requests that completed instead of being aborted: must never happen. */
  completedDataSending: string[];
}

/** Compares what a page did with the cookie list; one line per problem. */
function violations(path: string, state: ConsentState, seen: Observation): string[] {
  const problems: string[] = [];
  const at = `${path} [${state.name}]`;
  const verdict = (what: string, listed: ListedItem[]) => {
    if (listed.length === 0) return `${at} ${what} is not in the cookie list`;
    if (listed.some((item) => state.allowed.includes(item.category))) return null;
    const where = [...new Set(listed.map((item) => `${item.service} (${item.category})`))].join(', ');
    return `${at} ${what} is listed under ${where}, which this state does not allow`;
  };
  for (const item of seen.storage) {
    const problem = verdict(`${item.kind} "${item.name}" (${item.where})`, listedStorage(item.kind, item.name));
    if (problem) problems.push(problem);
  }
  for (const host of seen.hosts) {
    const problem = verdict(`host ${host}`, listedHost(host));
    if (problem) problems.push(problem);
  }
  for (const url of seen.completedDataSending) problems.push(`${at} data-sending request completed: ${url}`);
  return [...new Set(problems)].sort();
}

async function settle(page: Page) {
  await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => undefined);
  await page.waitForTimeout(1000);
}

/** Starts one video the way a visitor would, if the page has one. */
async function startVideo(page: Page): Promise<'no video' | 'playing' | 'did not start'> {
  const kind = await page.evaluate(() =>
    document.querySelector('[data-wistia-trigger]') ? 'trigger' : document.querySelector('wistia-player') ? 'player' : null,
  );
  if (!kind) return 'no video';
  if (kind === 'trigger') {
    // A script click: in the no-choice state the banner may cover the thumbnail.
    await page.evaluate(() => (document.querySelector('[data-wistia-trigger]') as HTMLElement).click());
  } else {
    await page
      .waitForFunction(() => typeof (document.querySelector('wistia-player') as { play?: unknown } | null)?.play === 'function', null, {
        timeout: 15_000,
      })
      .catch(() => undefined);
    await page.evaluate(() => {
      const player = document.querySelector('wistia-player') as HTMLElement & { play?: () => Promise<void>; muted?: boolean };
      player.scrollIntoView({ block: 'center' });
      player.muted = true;
      player.play?.()?.catch(() => undefined);
    });
  }
  const playing = await page
    .waitForFunction(
      () =>
        [...document.querySelectorAll('wistia-player')].some(
          (player) => ((player as unknown as { currentTime?: number }).currentTime ?? 0) > 0.5,
        ),
      null,
      { timeout: 20_000 },
    )
    .then(() => true)
    .catch(() => false);
  // Let the player write and report what it does while playing.
  await page.waitForTimeout(3000);
  return playing ? 'playing' : 'did not start';
}

async function observe(page: Page): Promise<Observation['storage']> {
  const storage: Observation['storage'] = [];
  for (const cookie of await page.context().cookies()) storage.push({ kind: 'cookie', name: cookie.name, where: cookie.domain });
  for (const frame of page.frames()) {
    const found = await frame
      .evaluate(() => ({
        origin: location.origin,
        local: Object.keys(localStorage),
        session: Object.keys(sessionStorage),
      }))
      .catch(() => null);
    if (!found || found.origin === 'null') continue;
    for (const name of found.local) storage.push({ kind: 'localStorage', name, where: found.origin });
    for (const name of found.session) storage.push({ kind: 'sessionStorage', name, where: found.origin });
  }
  return storage;
}

interface CheckOptions {
  /** Runs in the page before its own scripts; the self-test uses it to plant a key. */
  initScript?: () => void;
}

async function checkPage(browser: Browser, baseURL: string, path: string, state: ConsentState, options: CheckOptions = {}) {
  const origin = new URL(baseURL).origin;
  const siteHost = new URL(baseURL).hostname;
  const context = await browser.newContext({ baseURL, viewport: { width: 1280, height: 720 }, serviceWorkers: 'block' });
  try {
    const page = await context.newPage();
    const hosts = new Set<string>();
    const completedDataSending: string[] = [];
    page.on('request', (request) => {
      const url = new URL(request.url());
      if (/^https?:$/.test(url.protocol) && url.hostname !== siteHost) hosts.add(url.hostname);
    });
    page.on('requestfinished', (request) => {
      if (DATA_SENDING.some((pattern) => pattern.test(request.url()))) completedDataSending.push(request.url());
    });

    // A protected preview deployment: the bypass secret goes to the site's own host only.
    const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    if (bypass && !/^(localhost|127\.0\.0\.1)$/.test(siteHost)) {
      await page.route(
        (url) => url.hostname === siteHost,
        (route) => route.continue({ headers: { ...route.request().headers(), 'x-vercel-protection-bypass': bypass } }),
      );
    }
    // Any other route of the site's own server is never called (forms, webhooks); registered before
    // the shared blocker, whose answers for /api/meta-capi and /api/consent take precedence.
    await page.route(new RegExp(`^${origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/api/`), (route) => route.abort());
    await blockDataSending(page);
    // Wistia reports playback quality to Mux Data for a random 1 play in 10; make every play one
    // of them, so a Mux report outside statistics consent is caught every time, not 1 run in 10.
    await page.addInitScript(() => {
      const random = crypto.getRandomValues.bind(crypto);
      crypto.getRandomValues = <T extends ArrayBufferView | null>(array: T): T => {
        if (array instanceof Uint32Array && array.length === 1) {
          array[0] = 0;
          return array;
        }
        return random(array as never) as T;
      };
    });
    if (options.initScript) await page.addInitScript(options.initScript);
    if (state.preset) await setConsent(context, baseURL, state.preset);

    const at = `${path} [${state.name}]`;
    const problems: string[] = [];
    const visit = async () => {
      await page.goto(path);
      await settle(page);
      // A redirect to another host would take the check (and the bypass header) somewhere else.
      if (new URL(page.url()).hostname !== siteHost) problems.push(`${at} the page left ${siteHost} for ${page.url()}`);
      if ((await startVideo(page)) === 'did not start') {
        problems.push(`${at} the video did not start, so what it stores and contacts was not checked`);
      }
    };

    await visit();

    if (state.withdraw) {
      const reloaded = page.waitForEvent('framenavigated', { predicate: (frame) => frame === page.mainFrame(), timeout: 15_000 });
      reloaded.catch(() => undefined); // pages without the banner never reload
      const hasBanner = await page.evaluate(() => {
        const banner = (window as { CookieConsent?: { acceptCategory: (categories: string[]) => void } }).CookieConsent;
        banner?.acceptCategory([]);
        return !!banner;
      });
      if (hasBanner) {
        await reloaded;
        await settle(page);
      }
      // Measure a fresh visit after the withdrawal, so the old page's last requests do not count.
      hosts.clear();
      completedDataSending.length = 0;
      problems.length = 0;
      await visit();
    }

    return [...problems, ...violations(path, state, { storage: await observe(page), hosts: [...hosts], completedDataSending })];
  } finally {
    await context.close();
  }
}

// ---------- the tests ----------

for (const path of addressesToCheck()) {
  test(`cookie check: ${path}`, async ({ browser, baseURL }) => {
    test.setTimeout(240_000);
    const problems: string[] = [];
    for (const state of STATES) problems.push(...(await checkPage(browser, baseURL!, path, state)));
    expect(problems, 'Each line names the page, the consent state and the key or host.').toEqual([]);
  });
}

test('cookie check self-test: a planted unlisted key is named with its page and state', async ({ browser, baseURL }) => {
  test.setTimeout(60_000);
  const problems = await checkPage(browser, baseURL!, '/ux-design-skill/', STATES[1], {
    initScript: () => localStorage.setItem('cookie_check_planted_key', '1'),
  });
  expect(problems).toContain(
    `/ux-design-skill/ [reject all] localStorage "cookie_check_planted_key" (${new URL(baseURL!).origin}) is not in the cookie list`,
  );
});
