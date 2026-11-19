// One free skill per person: before granting, the sign-up asks Easytools whether the address
// already holds that free product. A holder is not granted again, so no second order and no
// second store email (owner, 2026-11-19). The form answers a holder exactly as it answers a new
// sign-up, so it never tells anyone who holds a skill.
//
// Easytools lists a product's customers per currency; the store sells in PLN and USD.
const STORE_CURRENCIES = ['pln', 'usd'] as const;

export class HolderLookupError extends Error {}

type FetchLike = (url: string, init?: { headers?: Record<string, string> }) => Promise<Response>;

// True when a customer with exactly this address (case aside) holds the product. Throws
// HolderLookupError when Easytools cannot answer, so the caller decides what a failed check means.
export async function holdsFreeSkill(
  fetchFn: FetchLike,
  apiBase: string,
  headers: Record<string, string>,
  productId: string,
  email: string,
): Promise<boolean> {
  const wanted = email.trim().toLowerCase();
  for (const currency of STORE_CURRENCIES) {
    const params = new URLSearchParams({ currency, product: productId, per_page: '100', page: '1', query: wanted });
    let response: Response;
    try {
      response = await fetchFn(`${apiBase}/customers?${params}`, { headers });
    } catch {
      throw new HolderLookupError('GET /customers failed: network error');
    }
    if (response.status === 404) continue;
    if (!response.ok) throw new HolderLookupError(`GET /customers answered HTTP ${response.status}`);
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      throw new HolderLookupError('GET /customers answered unreadable JSON');
    }
    const items = (body as { items?: unknown }).items;
    if (!Array.isArray(items)) throw new HolderLookupError('GET /customers answered an unexpected shape');
    const found = items.some(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as { email?: unknown }).email === 'string' &&
        (item as { email: string }).email.trim().toLowerCase() === wanted,
    );
    if (found) return true;
  }
  return false;
}
