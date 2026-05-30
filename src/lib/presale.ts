// Pre-sale countdown — single source of truth for the deadline + formatters.
// The deadline is expressed in Warsaw time and stored as a UTC instant so the
// countdown is correct regardless of the visitor's timezone.

// Sale ends at 23:59 on June 1 (Warsaw time). From June 2 00:00 the offer is gone.
export const PRESALE_DEADLINE_MS = new Date('2026-06-01T23:59:00+02:00').getTime();

export type Locale = 'pl' | 'en';

export interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getRemaining(now: number): RemainingTime | null {
  const diff = PRESALE_DEADLINE_MS - now;
  if (diff <= 0) return null;
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

export const PRESALE_PREFIX: Record<Locale, string> = {
  pl: 'Koniec promocji za',
  en: 'Sale ends in',
};
