import { normalizeFreeSkillEmail } from './free-skill-email';

// Test people: the owner signs up with "+test-<purpose>" aliases of their own Gmail address, each
// its own Easytools customer, and needs to sign up again and again with the same alias. A Gmail
// alias whose Easytools customer is on the server setting's list keeps the alias as typed, and the
// sign-up treats it as new every time. Everyone else is folded to the plain address as before.
//
// Easytools keeps customers per currency; the store sells in PLN and USD.
const STORE_CURRENCIES = ['pln', 'usd'] as const;

export class TestPersonLookupError extends Error {}

type FetchLike = (url: string, init?: { headers?: Record<string, string> }) => Promise<Response>;

// The setting lists Easytools customer IDs separated by commas; spaces around each are ignored.
function listedCustomerIds(setting: string | undefined): Set<string> {
  return new Set(
    (setting ?? '')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean),
  );
}

// A Gmail address with a "+" tag: the same rule the fold uses, read off the fold itself, so the
// two can never disagree about what counts as Gmail.
function isTaggedGmail(email: string): boolean {
  const at = email.lastIndexOf('@');
  return email.slice(0, at).includes('+') && normalizeFreeSkillEmail(email) !== email;
}

// True when the typed address is a Gmail "+" alias whose Easytools customer is on the list. Makes
// no request at all when the list is empty or the address is not a tagged Gmail address. Throws
// TestPersonLookupError when Easytools cannot answer for sure (no answer, an answer other than 200,
// an unreadable one, or more than one customer with exactly this address), so the caller folds.
// Expects an address already trimmed and lowercased.
export async function isListedTestPerson(
  fetchFn: FetchLike,
  apiBase: string,
  headers: Record<string, string>,
  testCustomerIds: string | undefined,
  email: string,
): Promise<boolean> {
  const listed = listedCustomerIds(testCustomerIds);
  if (listed.size === 0 || !isTaggedGmail(email)) return false;

  for (const currency of STORE_CURRENCIES) {
    const params = new URLSearchParams({ currency, query: email });
    let response: Response;
    try {
      response = await fetchFn(`${apiBase}/customers?${params}`, { headers });
    } catch {
      throw new TestPersonLookupError('GET /customers failed: network error');
    }
    if (response.status !== 200) throw new TestPersonLookupError(`GET /customers answered HTTP ${response.status}`);
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      throw new TestPersonLookupError('GET /customers answered unreadable JSON');
    }
    const { items, pagination } = (body ?? {}) as { items?: unknown; pagination?: { total_pages?: unknown } };
    if (!Array.isArray(items)) throw new TestPersonLookupError('GET /customers answered an unexpected shape');
    // The search matches the exact address, so one page holds every match; a second page could
    // hold another customer with this address.
    if (typeof pagination?.total_pages === 'number' && pagination.total_pages > 1) {
      throw new TestPersonLookupError('GET /customers answered more than one page');
    }

    // Only a customer with exactly the typed address counts: the plain address's customer is a
    // different person to Easytools and must never be taken for the alias.
    const ids = new Set<string>();
    for (const item of items) {
      if (typeof item !== 'object' || item === null) continue;
      const { id, email: itemEmail } = item as { id?: unknown; email?: unknown };
      if (typeof itemEmail !== 'string' || itemEmail.trim().toLowerCase() !== email) continue;
      if (typeof id !== 'string' || !id) throw new TestPersonLookupError('GET /customers answered a customer without an ID');
      ids.add(id);
    }
    if (ids.size > 1) throw new TestPersonLookupError(`GET /customers answered ${ids.size} customers with exactly this address`);
    if (ids.size === 1) return listed.has([...ids][0]);
  }
  return false;
}
