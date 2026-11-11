// The consent record the banner sends to /api/consent on a first choice and on every change.
// Only this exact shape is accepted; anything else is refused without a write.

export const CONSENT_CATEGORIES = ['necessary', 'statistics', 'marketing'] as const;
export type ConsentCategory = (typeof CONSENT_CATEGORIES)[number];

export const CONSENT_LANGUAGES = ['pl', 'en'] as const;
export type ConsentLanguage = (typeof CONSENT_LANGUAGES)[number];

export type ConsentKind = 'first' | 'change';

// A real record is about 150 bytes; anything larger is not one.
export const CONSENT_RECORD_MAX_BYTES = 2048;

export interface ConsentRecord {
  consentId: string;
  revision: number;
  language: ConsentLanguage;
  accepted: ConsentCategory[];
  rejected: ConsentCategory[];
  kind: ConsentKind;
}

const RECORD_KEYS = ['consentId', 'revision', 'language', 'accepted', 'rejected', 'kind'];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_REVISION = 1_000_000;

// Parses the raw request body. Returns the record, or null when the body is not exactly a record.
export function parseConsentRecord(raw: string): ConsentRecord | null {
  if (raw === '' || new TextEncoder().encode(raw).length > CONSENT_RECORD_MAX_BYTES) return null;

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(body)) return null;

  const keys = Object.keys(body);
  if (keys.length !== RECORD_KEYS.length || !RECORD_KEYS.every((key) => keys.includes(key))) return null;

  const { consentId, revision, language, accepted, rejected, kind } = body;
  if (typeof consentId !== 'string' || !UUID.test(consentId)) return null;
  if (typeof revision !== 'number' || !Number.isInteger(revision) || revision < 0 || revision > MAX_REVISION) {
    return null;
  }
  if (!isOneOf(language, CONSENT_LANGUAGES)) return null;
  if (kind !== 'first' && kind !== 'change') return null;

  const acceptedList = toCategories(accepted);
  const rejectedList = toCategories(rejected);
  if (!acceptedList || !rejectedList) return null;

  // Every category is answered exactly once, and the necessary one cannot be rejected.
  const answered = [...acceptedList, ...rejectedList];
  if (answered.length !== CONSENT_CATEGORIES.length) return null;
  if (!CONSENT_CATEGORIES.every((category) => answered.includes(category))) return null;
  if (!acceptedList.includes('necessary')) return null;

  return {
    consentId: consentId.toLowerCase(),
    revision,
    language,
    accepted: acceptedList,
    rejected: rejectedList,
    kind,
  };
}

function toCategories(value: unknown): ConsentCategory[] | null {
  if (!Array.isArray(value)) return null;
  if (!value.every((item) => isOneOf(item, CONSENT_CATEGORIES))) return null;
  if (new Set(value).size !== value.length) return null;
  return value as ConsentCategory[];
}

function isOneOf<T extends string>(value: unknown, allowed: readonly T[]): value is T {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
