import { test, expect } from '@playwright/test';
import { CONSENT_RECORD_MAX_BYTES, parseConsentRecord } from '../../src/lib/consent-record';

const FIRST_REJECT_ALL = {
  consentId: '3f9c2a1e-7b4d-4c8e-9a2f-1d5e6b7c8a90',
  revision: 1,
  language: 'pl',
  accepted: ['necessary'],
  rejected: ['statistics', 'marketing'],
  kind: 'first',
};

const CHANGE_STATISTICS_ONLY = {
  consentId: '3f9c2a1e-7b4d-4c8e-9a2f-1d5e6b7c8a90',
  revision: 1,
  language: 'en',
  accepted: ['necessary', 'statistics'],
  rejected: ['marketing'],
  kind: 'change',
};

const raw = (value: unknown) => JSON.stringify(value);

test.describe('parseConsentRecord', () => {
  test('a first choice is accepted as sent', () => {
    expect(parseConsentRecord(raw(FIRST_REJECT_ALL))).toEqual(FIRST_REJECT_ALL);
  });

  test('a later change is accepted as sent', () => {
    expect(parseConsentRecord(raw(CHANGE_STATISTICS_ONLY))).toEqual(CHANGE_STATISTICS_ONLY);
  });

  test('accept all is accepted', () => {
    const acceptAll = { ...FIRST_REJECT_ALL, accepted: ['necessary', 'statistics', 'marketing'], rejected: [] };
    expect(parseConsentRecord(raw(acceptAll))).toEqual(acceptAll);
  });

  test('the record holds only the listed fields', () => {
    expect(Object.keys(parseConsentRecord(raw(FIRST_REJECT_ALL)) ?? {}).sort()).toEqual(
      ['accepted', 'consentId', 'kind', 'language', 'rejected', 'revision'],
    );
  });

  test('an extra field is refused', () => {
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, userAgent: 'Mozilla/5.0' }))).toBeNull();
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, ip: '203.0.113.7' }))).toBeNull();
  });

  test('a missing field is refused', () => {
    const { kind: _kind, ...withoutKind } = FIRST_REJECT_ALL;
    expect(parseConsentRecord(raw(withoutKind))).toBeNull();
  });

  test('wrong types are refused', () => {
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, consentId: 42 }))).toBeNull();
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, consentId: 'not-a-uuid' }))).toBeNull();
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, revision: '1' }))).toBeNull();
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, revision: 1.5 }))).toBeNull();
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, revision: -1 }))).toBeNull();
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, accepted: 'necessary' }))).toBeNull();
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, kind: 'renewal' }))).toBeNull();
  });

  test('an unknown language is refused', () => {
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, language: 'de' }))).toBeNull();
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, language: 'polski' }))).toBeNull();
  });

  test('unknown categories are refused', () => {
    expect(
      parseConsentRecord(raw({ ...FIRST_REJECT_ALL, rejected: ['statistics', 'marketing', 'preferences'] })),
    ).toBeNull();
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, accepted: ['necessary', 'ads'] }))).toBeNull();
  });

  test('each category must be answered exactly once, and necessary cannot be rejected', () => {
    expect(parseConsentRecord(raw({ ...FIRST_REJECT_ALL, rejected: ['statistics'] }))).toBeNull();
    expect(
      parseConsentRecord(raw({ ...FIRST_REJECT_ALL, accepted: ['necessary', 'marketing'], rejected: ['statistics', 'marketing'] })),
    ).toBeNull();
    expect(
      parseConsentRecord(raw({ ...FIRST_REJECT_ALL, accepted: ['necessary', 'necessary'], rejected: ['statistics', 'marketing'] })),
    ).toBeNull();
    expect(
      parseConsentRecord(raw({ ...FIRST_REJECT_ALL, accepted: ['statistics', 'marketing'], rejected: ['necessary'] })),
    ).toBeNull();
  });

  test('an oversize body is refused', () => {
    const padded = raw(FIRST_REJECT_ALL) + ' '.repeat(CONSENT_RECORD_MAX_BYTES);
    expect(parseConsentRecord(padded)).toBeNull();
  });

  test('an empty or non-JSON body is refused', () => {
    expect(parseConsentRecord('')).toBeNull();
    expect(parseConsentRecord('accepted=all')).toBeNull();
    expect(parseConsentRecord('null')).toBeNull();
    expect(parseConsentRecord('[]')).toBeNull();
  });
});
