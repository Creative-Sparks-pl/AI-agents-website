import { getCollection, getEntry, type ContentEntryMap, type DataEntryMap } from 'astro:content';

export const defaultLocale = 'pl' as const;
export const locales = ['pl', 'en'] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

export function getCurrentLocale(astroLocale?: string): Locale {
  return isLocale(astroLocale) ? astroLocale : defaultLocale;
}

/**
 * Derive locale from a URL pathname. More reliable than `Astro.currentLocale`,
 * which can be undefined in shared layouts under static rendering.
 */
export function localeFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length > 0 && isLocale(segments[0]) ? segments[0] : defaultLocale;
}

/**
 * Build a locale-aware content entry id for variant entries.
 *
 * Convention — variant entries (`skill-lp`, `free-audit-skill`) live at the
 * root of a collection. PL variants keep their bare name (`skill-lp.yaml` →
 * id `skill-lp`); EN counterparts append the locale suffix
 * (`skill-lp-en.yaml` → id `skill-lp-en`).
 *
 * For locale-keyed entries (e.g. `install/pl.yaml`, `install/en.yaml`), pass
 * the locale directly to `requireEntry` — no helper needed.
 */
export function localizedId(baseId: string, locale: Locale): string {
  return locale === defaultLocale ? baseId : `${baseId}-${locale}`;
}

/**
 * Translate a pathname between locales.
 *
 * Examples:
 *   pathForLocale('/ux-design-skill/', 'en') → '/en/ux-design-skill/'
 *   pathForLocale('/en/ux-design-skill/', 'pl') → '/ux-design-skill/'
 *   pathForLocale('/en/ux-design-skill/', 'en') → '/en/ux-design-skill/' (no-op)
 *
 * Strips any leading `/{locale}` segment first, then re-prefixes for the
 * target locale unless it's the default.
 */
export function pathForLocale(pathname: string, target: Locale): string {
  // Strip leading slash, drop a locale segment if present.
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments.shift();
  }
  const stripped = '/' + segments.join('/') + (pathname.endsWith('/') && segments.length > 0 ? '/' : '');
  // Re-add leading slash if it collapsed for the root path.
  const base = stripped === '/' || stripped === '' ? '/' : stripped;
  return target === defaultLocale ? base : `/${target}${base}`;
}

type AnyCollection = keyof ContentEntryMap | keyof DataEntryMap;

export async function requireEntry<C extends AnyCollection>(
  collection: C,
  id: string,
  fallbackId?: string,
) {
  const entry = await getEntry(collection as any, id);
  if (entry) return entry;
  if (fallbackId && fallbackId !== id) {
    const fallback = await getEntry(collection as any, fallbackId);
    if (fallback) return fallback;
  }
  throw new Error(
    `Missing content entry: collection="${String(collection)}", id="${id}"` +
    (fallbackId ? ` (and fallback "${fallbackId}")` : '') +
    `. Check that src/content/${String(collection)}/${id}.{mdx,yaml} exists and passes the Zod schema in src/content.config.ts.`,
  );
}

/**
 * Locale-aware entry loader. Tries the requested locale, falls back to the
 * default locale if the EN entry hasn't been translated yet.
 */
export function requireLocalizedEntry<C extends AnyCollection>(
  collection: C,
  locale: Locale,
) {
  return requireEntry(collection, locale, defaultLocale);
}

/**
 * Load all entries in a collection filtered by locale-prefixed id
 * (e.g. `pl/foo.mdx` → id `pl/foo`). Falls back to default-locale entries
 * if no matches found for the requested locale.
 */
export async function getLocalizedCollection<C extends keyof ContentEntryMap>(
  collection: C,
  locale: Locale,
) {
  const entries = await getCollection(collection, (e: any) => e.id.startsWith(`${locale}/`));
  if (entries.length > 0 || locale === defaultLocale) return entries;
  return await getCollection(collection, (e: any) => e.id.startsWith(`${defaultLocale}/`));
}
