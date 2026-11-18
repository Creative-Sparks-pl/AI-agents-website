// One free skill per person: Gmail delivers every alias of an address to the same mailbox
// (dots in the local part are ignored, everything from a "+" on is a tag, and googlemail.com
// is gmail.com), so the sign-up grants on the plain form. Other providers are left as typed,
// because their alias rules differ.
const GMAIL_DOMAINS = new Set(['gmail.com', 'googlemail.com']);

// Expects an address already trimmed and lowercased.
export function normalizeFreeSkillEmail(email: string): string {
  const at = email.lastIndexOf('@');
  if (at < 1 || !GMAIL_DOMAINS.has(email.slice(at + 1))) {
    return email;
  }

  const local = email.slice(0, at).split('+')[0].replace(/\./g, '');
  return local ? `${local}@gmail.com` : email;
}
