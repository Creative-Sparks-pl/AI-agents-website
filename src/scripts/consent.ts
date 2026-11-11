// Cookie banner: runs CookieConsent v3 (bundled and served from this site) with the
// configuration BaseLayout writes into #consent-config for the page's language.
// It also records each choice, clears what a withdrawn category stored, and tells
// Wistia's player whether it may track.
import * as CookieConsent from 'vanilla-cookieconsent';
import type { ConsentLibraryConfig } from '../lib/consent-config';
import type { ConsentCategory, ConsentKind } from '../lib/consent-record';

declare global {
  interface Window {
    // Exposed for the inline conversion helpers in BaseLayout and for tests.
    CookieConsent?: typeof CookieConsent;
    // Wistia's command queue; the player runs each queued function once it has loaded.
    _wq?: unknown[];
  }
}

/** What each optional category stores in the browser, from the cookie list (#consent-storage). */
type StorageByCategory = Partial<Record<ConsentCategory, { name: string; kind: 'cookie' | 'localStorage' | 'sessionStorage' }[]>>;

// Footer "Cookie settings" links point here; the click opens the preferences window.
const SETTINGS_HASH = '#cookie-settings';

function readJson<T>(id: string): T | null {
  const text = document.getElementById(id)?.textContent;
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

/** Sends the consent record in the background; a failure never holds up the banner. */
function sendRecord(config: ConsentLibraryConfig, kind: ConsentKind) {
  const preferences = CookieConsent.getUserPreferences();
  const body = JSON.stringify({
    consentId: CookieConsent.getCookie('consentId'),
    revision: config.revision,
    language: config.language.default,
    accepted: preferences.acceptedCategories,
    rejected: preferences.rejectedCategories,
    kind,
  });
  try {
    if (navigator.sendBeacon?.('/api/consent', new Blob([body], { type: 'application/json' }))) return;
  } catch {
    // Fall through to fetch.
  }
  fetch('/api/consent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(
    () => undefined,
  );
}

/**
 * Wistia tracks only with statistics consent; without it the player stays in privacy mode.
 * Players already on the page keep the layout's doNotTrack until the next page load.
 */
function tellWistia() {
  const allowed = CookieConsent.acceptedCategory('statistics');
  (window._wq = window._wq || []).push((W: { consent: (value: boolean) => void }) => W.consent(allowed));
}

/** Names ending in `*` match any suffix, as in the cookie list. */
function matches(pattern: string, name: string) {
  return pattern.endsWith('*') ? name.startsWith(pattern.slice(0, -1)) : name === pattern;
}

/** Deletes a cookie on this host and on every parent domain it may have been set for. */
function expireCookie(name: string) {
  const labels = location.hostname.split('.');
  const domains = [''];
  for (let i = 0; i < labels.length - 1; i++) {
    const domain = labels.slice(i).join('.');
    domains.push(`; domain=${domain}`, `; domain=.${domain}`);
  }
  for (const domain of domains) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
  }
}

/** Removes what the withdrawn categories stored, as named in the cookie list. */
function clearStorage(storage: StorageByCategory, categories: ConsentCategory[]) {
  const items = categories.flatMap((category) => storage[category] ?? []);
  const cookieNames = document.cookie
    .split(';')
    .map((pair) => pair.split('=')[0].trim())
    .filter(Boolean);

  for (const item of items) {
    if (item.kind === 'cookie') {
      for (const name of cookieNames) if (matches(item.name, name)) expireCookie(name);
      continue;
    }
    try {
      const area = item.kind === 'localStorage' ? localStorage : sessionStorage;
      for (const key of Object.keys(area)) if (matches(item.name, key)) area.removeItem(key);
    } catch {
      // Storage can be unavailable (private mode, blocked site data).
    }
  }
}

const config = readJson<ConsentLibraryConfig>('consent-config');
const storage = readJson<StorageByCategory>('consent-storage') ?? {};

if (config) {
  window.CookieConsent = CookieConsent;

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target?.closest(`a[href="${SETTINGS_HASH}"]`)) return;
    event.preventDefault();
    CookieConsent.showPreferences();
  });

  void CookieConsent.run({
    ...(config as unknown as CookieConsent.CookieConsentConfig),
    onFirstConsent: () => sendRecord(config, 'first'),
    onConsent: () => tellWistia(),
    onChange: ({ changedCategories }) => {
      sendRecord(config, 'change');
      tellWistia();
      // Code already running cannot be stopped, so a withdrawal clears the stored data and
      // reloads the page; the tagged scripts then stay inert.
      const withdrawn = (changedCategories as ConsentCategory[]).filter((category) => !CookieConsent.acceptedCategory(category));
      if (withdrawn.length > 0) {
        clearStorage(storage, withdrawn);
        setTimeout(() => location.reload(), 50);
      }
    },
  });
}
