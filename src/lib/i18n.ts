export const defaultLocale = 'pl' as const;

export type Locale = 'pl' | 'en';

export function getCurrentLocale(): Locale {
  return defaultLocale;
}
