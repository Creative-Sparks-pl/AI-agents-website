// Sale window (Black Friday) — single source of truth for its edges + formatters.
// Both edges are expressed in Warsaw time and stored as UTC instants, so the
// switch happens at the same moment for every visitor, whatever their timezone.

// Starts 23.11.2026 00:00 Warsaw time (inclusive).
export const SALE_START_MS = new Date('2026-11-23T00:00:00+01:00').getTime();
// Ends 1.12.2026 00:00 Warsaw time (exclusive) — the sale runs through 30.11 23:59:59.
export const SALE_END_MS = new Date('2026-12-01T00:00:00+01:00').getTime();

export type Locale = 'pl' | 'en';

export interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function isInSaleWindow(now: number): boolean {
  return now >= SALE_START_MS && now < SALE_END_MS;
}

// Time left until the sale ends; null outside the window.
export function getRemaining(now: number): RemainingTime | null {
  if (!isInSaleWindow(now)) return null;
  const diff = SALE_END_MS - now;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

// Polish plural rule. n=1 -> one. n%10 in 2..4 and n%100 not in 12..14 -> few. else -> many.
function polishPlural(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

export function formatRemaining(r: RemainingTime, locale: Locale): string {
  const parts: string[] = [];
  if (locale === 'pl') {
    if (r.days > 0) parts.push(`${r.days} ${r.days === 1 ? 'dzień' : 'dni'}`);
    if (r.hours > 0 || r.days > 0) parts.push(`${r.hours} ${polishPlural(r.hours, 'godzina', 'godziny', 'godzin')}`);
    parts.push(`${r.minutes} min`);
    parts.push(`${r.seconds} sek`);
  } else {
    if (r.days > 0) parts.push(`${r.days} ${r.days === 1 ? 'day' : 'days'}`);
    if (r.hours > 0 || r.days > 0) parts.push(`${r.hours} ${r.hours === 1 ? 'hour' : 'hours'}`);
    parts.push(`${r.minutes} min`);
    parts.push(`${r.seconds} sec`);
  }
  return parts.join(' ');
}

export const SALE_PREFIX: Record<Locale, string> = {
  pl: 'Black Friday kończy się za',
  en: 'Black Friday ends in',
};
