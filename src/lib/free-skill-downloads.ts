// Free-skill download count — the social proof number on the free pages and the paid page's
// "try for free" intro. Server-only: prerendered pages call it during the build, never the browser.
//
// The number is the count of distinct email + skill pairs among completed Easytools orders of the
// free-skill products, rounded down to 50 so the claim stays a floor of the real count. Without a
// count, the build reuses the number the live site shows, then a fixed minimum; it never fails.
// Emails are compared in memory only and never logged or written anywhere.

export type Locale = 'pl' | 'en';
export type Skill = 'audit' | 'planning';
export type DownloadSource = 'easytools' | 'live-site' | 'minimum';

export interface ShownDownloads {
  shown: number;
  source: DownloadSource;
}

export interface Order {
  status?: string;
  amount?: number;
  product_name?: string;
  customer_email?: string;
}

export interface Logger {
  info(line: string): void;
  warn(line: string): void;
}

export interface ResolveOptions {
  apiKey: string | undefined;
  dev: boolean;
  fetchFn: typeof fetch;
  log: Logger;
}

export const MINIMUM_SHOWN = 200;
export const ROUNDING_STEP = 50;
export const COUNT_PLACEHOLDER = '{N}';
export const LIVE_SITE_FILE = 'https://agents.creativesparks.pl/free-skill-downloads.json';
export const ORDERS_URL = 'https://cart.easy.tools/api/v1/orders';
// Cloudflare in front of cart.easy.tools answers 403 (error 1010) to default client signatures.
export const USER_AGENT = 'creativesparks-site/1.0';
export const REQUEST_TIMEOUT_MS = 10_000;
// More pages than this means a broken pagination answer, not real orders.
const MAX_PAGES = 500;
const LOG_PREFIX = '[free-skill-downloads]';

// The free-skill products by their Easytools product name, mapped to their skill. Orders carry the
// name only (no product id), so a new or renamed free product counts only once it is added here.
// "Website Planinng Skill" (misspelled) is left out on purpose: it held only launch tests.
export const FREE_SKILL_PRODUCTS: Readonly<Record<string, Skill>> = {
  'Darmowe narzędzie do audytu UX strony': 'audit',
  'Free UX Audit Skill': 'audit',
  'Homepage UX Audit Skill': 'audit',
  'Skill do audytu UX strony głównej': 'audit',
  'Skill do planowania stron': 'planning',
  'Website Planning Skill': 'planning',
};

// Own and test signups.
export const EXCLUDED_EMAIL_DOMAINS: readonly string[] = ['creativesparks.pl', 'fusecollective.com'];

// An error whose message is safe to print: it never carries response content.
class CountError extends Error {}

function isExcluded(email: string): boolean {
  const domain = email.slice(email.lastIndexOf('@') + 1);
  return EXCLUDED_EMAIL_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`));
}

export function countDownloads(orders: Order[]): { count: number; unlistedFreeNames: string[] } {
  const pairs = new Set<string>();
  const unlisted = new Set<string>();
  for (const order of orders) {
    if (order.status !== 'completed') continue;
    const name = order.product_name ?? '';
    const skill = FREE_SKILL_PRODUCTS[name];
    if (!skill) {
      if (order.amount === 0 && name) unlisted.add(name);
      continue;
    }
    const email = (order.customer_email ?? '').trim().toLowerCase();
    if (!email.includes('@') || isExcluded(email)) continue;
    pairs.add(`${skill}\n${email}`);
  }
  return { count: pairs.size, unlistedFreeNames: [...unlisted].sort() };
}

export function roundDown(count: number): number {
  return Math.floor(count / ROUNDING_STEP) * ROUNDING_STEP;
}

export function formatShown(shown: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'pl' ? 'pl-PL' : 'en-US').format(shown);
}

export function hasPlaceholder(text: string | undefined): boolean {
  return !!text && text.includes(COUNT_PLACEHOLDER);
}

export function fillCount(text: string, formatted: string): string {
  return text.replaceAll(COUNT_PLACEHOLDER, formatted);
}

// Names the failure without echoing anything the server sent back.
function reasonOf(error: unknown): string {
  if (error instanceof CountError) return error.message;
  if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) return 'timed out';
  return `request failed (${error instanceof Error ? error.name : 'unknown error'})`;
}

async function getJson(fetchFn: typeof fetch, url: string, headers: Record<string, string>, what: string): Promise<unknown> {
  const response = await fetchFn(url, { headers, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!response.ok) throw new CountError(`${what} answered ${response.status}`);
  try {
    return await response.json();
  } catch {
    throw new CountError(`${what} answered with unreadable JSON`);
  }
}

// Reads every orders page; any failed page means no count (all-or-nothing).
export async function readEasytoolsOrders(apiKey: string | undefined, fetchFn: typeof fetch): Promise<Order[]> {
  if (!apiKey) throw new CountError('no EASYCART_API_KEY');
  const headers = { Authorization: `Bearer ${apiKey}`, Accept: 'application/json', 'User-Agent': USER_AGENT };
  const orders: Order[] = [];
  let totalPages = 1;
  for (let page = 1; page <= totalPages; page++) {
    const data = (await getJson(fetchFn, `${ORDERS_URL}?per_page=100&page=${page}`, headers, `Easytools orders page ${page}`)) as {
      items?: unknown;
      pagination?: { total_pages?: unknown };
    };
    const pages = data?.pagination?.total_pages;
    if (!Array.isArray(data?.items) || typeof pages !== 'number' || !Number.isInteger(pages) || pages < 0) {
      throw new CountError(`Easytools orders page ${page} has an unexpected shape`);
    }
    if (pages > MAX_PAGES) throw new CountError(`Easytools reports ${pages} order pages, more than ${MAX_PAGES}`);
    orders.push(...(data.items as Order[]));
    totalPages = pages;
  }
  return orders;
}

export async function readLiveSiteShown(fetchFn: typeof fetch): Promise<number> {
  const data = (await getJson(fetchFn, LIVE_SITE_FILE, { Accept: 'application/json', 'User-Agent': USER_AGENT }, 'live-site file')) as {
    shown?: unknown;
  };
  const shown = data?.shown;
  if (typeof shown !== 'number' || !Number.isInteger(shown) || shown < 0) {
    throw new CountError('live-site file holds no shown number');
  }
  return shown;
}

// Easytools count → the live site's number → the fixed minimum. One warning line per fallback step.
export async function resolveShownDownloads({ apiKey, dev, fetchFn, log }: ResolveOptions): Promise<ShownDownloads> {
  if (dev) return { shown: MINIMUM_SHOWN, source: 'minimum' };

  try {
    const { count, unlistedFreeNames } = countDownloads(await readEasytoolsOrders(apiKey, fetchFn));
    if (unlistedFreeNames.length > 0) {
      log.info(`${LOG_PREFIX} free (amount 0) products not counted: ${unlistedFreeNames.join(', ')}`);
    }
    const shown = roundDown(count);
    log.info(`${LOG_PREFIX} counted ${count} downloads, showing ${shown}+ (source: easytools)`);
    return { shown, source: 'easytools' };
  } catch (error) {
    log.warn(`${LOG_PREFIX} Easytools count unavailable (${reasonOf(error)}); using the live site's number`);
  }

  try {
    const shown = await readLiveSiteShown(fetchFn);
    log.info(`${LOG_PREFIX} showing ${shown}+ (source: live-site)`);
    return { shown, source: 'live-site' };
  } catch (error) {
    log.warn(`${LOG_PREFIX} live-site number unavailable (${reasonOf(error)}); showing the minimum ${MINIMUM_SHOWN}+`);
  }

  return { shown: MINIMUM_SHOWN, source: 'minimum' };
}

// One resolve per process, shared by every page that asks.
export function createDownloadsReader(options: () => ResolveOptions): () => Promise<ShownDownloads> {
  let shared: Promise<ShownDownloads> | undefined;
  return () => (shared ??= resolveShownDownloads(options()));
}

// The build-facing entry. `import.meta.env` is read on the first call, not when the module loads,
// so the unit tests can import this file outside Astro.
export const getShownDownloads = createDownloadsReader(() => ({
  apiKey: import.meta.env.EASYCART_API_KEY,
  dev: import.meta.env.DEV,
  fetchFn: fetch,
  log: console,
}));
