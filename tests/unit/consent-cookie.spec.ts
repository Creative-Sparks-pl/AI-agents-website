import { test, expect } from '@playwright/test';
import { hasMarketingConsent } from '../../src/lib/consent-cookie';

const REVISION = 1;

// Shaped like the cookie CookieConsent 3.3.0 writes.
function choice(categories: string[], revision = REVISION) {
  return {
    categories,
    revision,
    data: null,
    consentTimestamp: '2026-11-11T13:01:47.815Z',
    consentId: 'c2a7bfe1-1b2c-4d3e-8f90-1a2b3c4d5e6f',
    services: { necessary: [], statistics: [], marketing: categories.includes('marketing') ? ['meta-pixel'] : [] },
    languageCode: 'pl',
    lastConsentTimestamp: '2026-11-11T13:01:47.815Z',
    expirationTime: 1810126907818,
  };
}

const encoded = (value: unknown) => `cc_cookie=${encodeURIComponent(JSON.stringify(value))}`;
const plain = (value: unknown) => `cc_cookie=${JSON.stringify(value)}`;

test.describe('hasMarketingConsent', () => {
  test('accepted marketing under the current revision counts as consent', () => {
    expect(hasMarketingConsent(encoded(choice(['necessary', 'marketing'])), REVISION)).toBe(true);
    expect(hasMarketingConsent(encoded(choice(['necessary', 'statistics', 'marketing'])), REVISION)).toBe(true);
  });

  test('the plain JSON form is read too', () => {
    expect(hasMarketingConsent(plain(choice(['necessary', 'marketing'])), REVISION)).toBe(true);
    expect(hasMarketingConsent(plain(choice(['necessary'])), REVISION)).toBe(false);
  });

  test('the banner cookie is found among other cookies', () => {
    const header = `_fbp=fb.1.1731330000000.123456789; ${encoded(choice(['necessary', 'marketing']))}; ph_x_posthog=%7B%7D`;
    expect(hasMarketingConsent(header, REVISION)).toBe(true);
  });

  test('a rejecting choice is not consent', () => {
    expect(hasMarketingConsent(encoded(choice(['necessary'])), REVISION)).toBe(false);
    expect(hasMarketingConsent(encoded(choice(['necessary', 'statistics'])), REVISION)).toBe(false);
  });

  test('a missing header or cookie is not consent', () => {
    expect(hasMarketingConsent(undefined, REVISION)).toBe(false);
    expect(hasMarketingConsent(null, REVISION)).toBe(false);
    expect(hasMarketingConsent('', REVISION)).toBe(false);
    expect(hasMarketingConsent('_fbp=fb.1.1.2; other=1', REVISION)).toBe(false);
    // A similarly named cookie is not the banner's.
    expect(hasMarketingConsent(`x${encoded(choice(['necessary', 'marketing']))}`, REVISION)).toBe(false);
  });

  test('a malformed cookie is not consent', () => {
    expect(hasMarketingConsent('cc_cookie=', REVISION)).toBe(false);
    expect(hasMarketingConsent('cc_cookie=marketing', REVISION)).toBe(false);
    expect(hasMarketingConsent('cc_cookie=%E0%A4%A', REVISION)).toBe(false);
    expect(hasMarketingConsent(encoded(['marketing']), REVISION)).toBe(false);
    expect(hasMarketingConsent(encoded({ categories: 'marketing', revision: REVISION }), REVISION)).toBe(false);
    expect(hasMarketingConsent(encoded({ revision: REVISION }), REVISION)).toBe(false);
    expect(hasMarketingConsent(encoded(null), REVISION)).toBe(false);
  });

  test('a choice made under another revision is not consent', () => {
    expect(hasMarketingConsent(encoded(choice(['necessary', 'marketing'], 0)), REVISION)).toBe(false);
    expect(hasMarketingConsent(encoded(choice(['necessary', 'marketing'], 2)), REVISION)).toBe(false);
    expect(hasMarketingConsent(encoded({ ...choice(['necessary', 'marketing']), revision: '1' }), REVISION)).toBe(false);
  });
});
