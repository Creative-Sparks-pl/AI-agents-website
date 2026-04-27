import { getEntry, type ContentEntryMap, type DataEntryMap } from 'astro:content';

export const defaultLocale = 'pl' as const;

export type Locale = 'pl' | 'en';

export function getCurrentLocale(): Locale {
  return defaultLocale;
}

type AnyCollection = keyof ContentEntryMap | keyof DataEntryMap;

export async function requireEntry<C extends AnyCollection>(
  collection: C,
  id: string,
) {
  const entry = await getEntry(collection as any, id);
  if (!entry) {
    throw new Error(
      `Missing content entry: collection="${String(collection)}", id="${id}". ` +
      `Check that src/content/${String(collection)}/${id}.{mdx,yaml} exists and passes the Zod schema in src/content.config.ts.`,
    );
  }
  return entry;
}
