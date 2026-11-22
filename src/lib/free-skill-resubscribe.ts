// A free sign-up is fresh consent to email: the form says so where it asks for the address.
// Someone who earlier opted out of all email would be granted the skill and never get the install
// email, so after a new grant the sign-up reverses that opt-out in Easymail.
//
// Only the account-wide opt-out is reversed. Lists are not touched and no contact is created (the
// license service creates the contact when it delivers the link). A suppressed address
// (undeliverable after bounces or complaints) stays suppressed: re-subscribing cannot clear that,
// so a contact that is only suppressed gets no call, and one that is opted out as well gets the
// re-subscribe and nothing more.

export class ResubscribeError extends Error {}

type FetchLike = (url: string, init?: { method?: string; headers?: Record<string, string> }) => Promise<Response>;

export type ResubscribeOutcome = 'no_contact' | 'not_opted_out' | 'resubscribed';

// Re-subscribes the contact with exactly this address (case aside) when it has opted out of all
// email. Throws ResubscribeError when Easymail cannot answer; its message names the call, never
// the address or the contact.
export async function resubscribeOptedOut(
  fetchFn: FetchLike,
  apiBase: string,
  headers: Record<string, string>,
  email: string,
): Promise<ResubscribeOutcome> {
  const wanted = email.trim().toLowerCase();

  const found = await readJson(
    await call(fetchFn, 'GET', `${apiBase}/contacts?${new URLSearchParams({ email: wanted })}`, headers, 'GET /contacts'),
    'GET /contacts',
  );
  const contacts = (found as { data?: unknown }).data;
  if (!Array.isArray(contacts)) throw new ResubscribeError('GET /contacts answered an unexpected shape');
  const contact = contacts.find(
    (item): item is { uuid: string; email: string } =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as { uuid?: unknown }).uuid === 'string' &&
      typeof (item as { email?: unknown }).email === 'string' &&
      (item as { email: string }).email.trim().toLowerCase() === wanted,
  );
  if (!contact) return 'no_contact';
  const contactUrl = `${apiBase}/contacts/${encodeURIComponent(contact.uuid)}`;

  // The list answer does not reliably carry the subscription detail; the contact's own answer does.
  // The opt-out flag decides, not `status`: a suppressed contact reads "suppressed" whether or not
  // it has opted out.
  const detail = await readJson(await call(fetchFn, 'GET', contactUrl, headers, 'GET /contacts/{uuid}'), 'GET /contacts/{uuid}');
  const optedOut = (detail as { data?: { subscription?: { is_unsubscribed?: unknown } } }).data?.subscription?.is_unsubscribed;
  if (typeof optedOut !== 'boolean') throw new ResubscribeError('GET /contacts/{uuid} answered an unexpected shape');
  if (!optedOut) return 'not_opted_out';

  await call(fetchFn, 'POST', `${contactUrl}/resubscribe`, headers, 'POST /contacts/{uuid}/resubscribe');
  return 'resubscribed';
}

// The sign-up's entry. It never rejects: by now the grant is done and the form has its answer, so
// a failure here is logged in one line, without the address, and goes no further.
export async function resubscribeAfterGrant(
  fetchFn: FetchLike,
  apiBase: string,
  headers: Record<string, string>,
  email: string,
): Promise<void> {
  try {
    if ((await resubscribeOptedOut(fetchFn, apiBase, headers, email)) === 'resubscribed') {
      console.log('[subscribe] new grant: the opt-out of all email was reversed');
    }
  } catch (err) {
    console.warn('[subscribe] re-subscribe failed:', err instanceof ResubscribeError ? err.message : 'unknown error');
  }
}

async function call(
  fetchFn: FetchLike,
  method: 'GET' | 'POST',
  url: string,
  headers: Record<string, string>,
  name: string,
): Promise<Response> {
  let response: Response;
  try {
    response = await fetchFn(url, { method, headers });
  } catch {
    throw new ResubscribeError(`${name} failed: network error`);
  }
  if (!response.ok) throw new ResubscribeError(`${name} answered HTTP ${response.status}`);
  return response;
}

async function readJson(response: Response, name: string): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new ResubscribeError(`${name} answered unreadable JSON`);
  }
}
