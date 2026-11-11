// Cookie banner: runs CookieConsent v3 (bundled and served from this site) with the
// configuration BaseLayout writes into #consent-config for the page's language.
import * as CookieConsent from 'vanilla-cookieconsent';
import type { ConsentLibraryConfig } from '../lib/consent-config';

declare global {
  interface Window {
    // Exposed for the inline conversion helpers in BaseLayout and for tests.
    CookieConsent?: typeof CookieConsent;
  }
}

// Footer "Cookie settings" links point here; the click opens the preferences window.
const SETTINGS_HASH = '#cookie-settings';

function readConfig(): ConsentLibraryConfig | null {
  const text = document.getElementById('consent-config')?.textContent;
  if (!text) return null;
  try {
    return JSON.parse(text) as ConsentLibraryConfig;
  } catch {
    return null;
  }
}

const config = readConfig();

if (config) {
  window.CookieConsent = CookieConsent;

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target?.closest(`a[href="${SETTINGS_HASH}"]`)) return;
    event.preventDefault();
    CookieConsent.showPreferences();
  });

  void CookieConsent.run(config as unknown as CookieConsent.CookieConsentConfig);
}
