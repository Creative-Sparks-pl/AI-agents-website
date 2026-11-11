// The cookie banner's configuration, built from the `consent` content collection
// (src/content/consent/{pl,en}.yaml). The same content feeds the privacy policies'
// cookie table and the automated cookie check, so the three never drift apart.
import { z } from 'astro/zod';
import { CONSENT_CATEGORIES, type ConsentCategory, type ConsentLanguage } from './consent-record';

// Raise this whenever a tracker or category is added: everyone is asked again.
export const CONSENT_REVISION = 1;

// Library defaults, written out so tests and the server-side check can rely on them.
export const CONSENT_COOKIE_NAME = 'cc_cookie';
export const CONSENT_COOKIE_DAYS = 182;

export const STORAGE_KINDS = ['cookie', 'localStorage', 'sessionStorage'] as const;
export type StorageKind = (typeof STORAGE_KINDS)[number];

// `cookieless` lists services that store nothing but still contact an outside host
// (Umami, the icon font); they sit outside the banner's choices.
export const LIST_CATEGORIES = [...CONSENT_CATEGORIES, 'cookieless'] as const;
export type ListCategory = (typeof LIST_CATEGORIES)[number];

const textPair = z.object({ title: z.string(), description: z.string() });

const storageItemSchema = z.object({
  // A trailing `*` matches any suffix, e.g. `ph_*` or `wistia-video-progress-*`.
  name: z.string().regex(/^[^*\s]+\*?$/),
  kind: z.enum(STORAGE_KINDS),
  duration: z.string(),
});

const cookieListEntrySchema = z.object({
  // Becomes the library's service name and the `data-service` value on tagged scripts.
  id: z.string().regex(/^[a-z0-9-]+$/),
  service: z.string(),
  provider: z.string(),
  party: z.enum(['first', 'third']),
  category: z.enum(LIST_CATEGORIES),
  purpose: z.string(),
  storage: z.array(storageItemSchema),
  // A leading `*.` stands for any subdomain, e.g. `*.litix.io`.
  hosts: z.array(z.string().regex(/^(\*\.)?[a-z0-9.-]+$/)),
  loading: z.string(),
  lastVerified: z.coerce.date(),
});

export const consentContentSchema = z.object({
  banner: z.object({
    title: z.string(),
    description: z.string(),
    acceptAll: z.string(),
    rejectAll: z.string(),
    settings: z.string(),
  }),
  preferences: z.object({
    title: z.string(),
    description: z.string(),
    acceptAll: z.string(),
    rejectAll: z.string(),
    save: z.string(),
    close: z.string(),
    serviceCounter: z.string(),
    tableCaption: z.string(),
    headers: z.object({
      name: z.string(),
      service: z.string(),
      kind: z.string(),
      duration: z.string(),
      purpose: z.string(),
    }),
    kinds: z.object({ cookie: z.string(), localStorage: z.string(), sessionStorage: z.string() }),
    noStorage: z.string(),
    more: textPair,
  }),
  categories: z.object({
    necessary: textPair,
    statistics: textPair,
    marketing: textPair,
    cookieless: textPair,
  }),
  footerLabel: z.string(),
  policy: z.object({ label: z.string(), href: z.string() }),
  cookies: z.array(cookieListEntrySchema),
});

export type ConsentContent = z.infer<typeof consentContentSchema>;
export type CookieListEntry = ConsentContent['cookies'][number];

// The subset of CookieConsent v3's configuration this site uses. Plain data only, so it
// can be built at build time and serialized into the page; callbacks are added in the browser.
export interface ConsentLibraryConfig {
  revision: number;
  cookie: { name: string; expiresAfterDays: number };
  disablePageInteraction: boolean;
  guiOptions: {
    consentModal: { layout: string; position: string; equalWeightButtons: boolean; flipButtons: boolean };
    preferencesModal: { layout: string; equalWeightButtons: boolean; flipButtons: boolean };
  };
  categories: Record<ConsentCategory, {
    enabled: boolean;
    readOnly: boolean;
    services?: Record<string, { label: string }>;
  }>;
  language: {
    default: ConsentLanguage;
    translations: Record<string, {
      consentModal: Record<string, string>;
      preferencesModal: {
        title: string;
        acceptAllBtn: string;
        acceptNecessaryBtn: string;
        savePreferencesBtn: string;
        closeIconLabel: string;
        serviceCounterLabel: string;
        sections: PreferencesSection[];
      };
    }>;
  };
}

export interface PreferencesSection {
  title: string;
  description: string;
  linkedCategory?: ConsentCategory;
  cookieTable?: { caption: string; headers: Record<string, string>; body: Record<string, string>[] };
}

export function buildConsentConfig(content: ConsentContent, language: ConsentLanguage): ConsentLibraryConfig {
  const { banner, preferences, categories, policy, cookies } = content;

  const services = (category: ConsentCategory) =>
    Object.fromEntries(
      cookies.filter((entry) => entry.category === category).map((entry) => [entry.id, { label: entry.service }]),
    );

  const section = (category: ListCategory): PreferencesSection => ({
    ...categories[category],
    ...(category === 'cookieless' ? {} : { linkedCategory: category }),
    cookieTable: {
      caption: preferences.tableCaption,
      headers: preferences.headers,
      body: cookies.filter((entry) => entry.category === category).flatMap((entry) => tableRows(entry, content)),
    },
  });

  return {
    revision: CONSENT_REVISION,
    cookie: { name: CONSENT_COOKIE_NAME, expiresAfterDays: CONSENT_COOKIE_DAYS },
    // No overlay: the page behind the banner stays usable.
    disablePageInteraction: false,
    guiOptions: {
      // A box at the bottom on desktop; the library's box spans the full width on phones.
      consentModal: { layout: 'box', position: 'bottom right', equalWeightButtons: true, flipButtons: false },
      preferencesModal: { layout: 'box', equalWeightButtons: true, flipButtons: false },
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      statistics: { enabled: false, readOnly: false, services: services('statistics') },
      marketing: { enabled: false, readOnly: false, services: services('marketing') },
    },
    language: {
      default: language,
      translations: {
        [language]: {
          consentModal: {
            title: banner.title,
            description: banner.description,
            acceptAllBtn: banner.acceptAll,
            acceptNecessaryBtn: banner.rejectAll,
            showPreferencesBtn: banner.settings,
            footer: `<a href="${policy.href}">${policy.label}</a>`,
          },
          preferencesModal: {
            title: preferences.title,
            acceptAllBtn: preferences.acceptAll,
            acceptNecessaryBtn: preferences.rejectAll,
            savePreferencesBtn: preferences.save,
            closeIconLabel: preferences.close,
            serviceCounterLabel: preferences.serviceCounter,
            sections: [
              { title: preferences.title, description: preferences.description },
              section('necessary'),
              section('statistics'),
              section('marketing'),
              section('cookieless'),
              preferences.more,
            ],
          },
        },
      },
    },
  };
}

// One row per stored item; a service that stores nothing gets one row saying so.
export function tableRows(entry: CookieListEntry, content: ConsentContent): Record<string, string>[] {
  const { preferences } = content;
  if (entry.storage.length === 0) {
    return [{ name: preferences.noStorage, service: entry.service, kind: '—', duration: '—', purpose: entry.purpose }];
  }
  return entry.storage.map((item) => ({
    name: item.name,
    service: entry.service,
    kind: preferences.kinds[item.kind],
    duration: item.duration,
    purpose: entry.purpose,
  }));
}
