import { test, expect } from '@playwright/test';
import { normalizeFreeSkillEmail } from '../../src/lib/free-skill-email';

test.describe('normalizeFreeSkillEmail', () => {
  test('drops the dots from a Gmail local part', () => {
    expect(normalizeFreeSkillEmail('t.o.masz@gmail.com')).toBe('tomasz@gmail.com');
  });

  test('drops everything from a "+" on', () => {
    expect(normalizeFreeSkillEmail('tomasz+newsletter@gmail.com')).toBe('tomasz@gmail.com');
  });

  test('turns googlemail.com into gmail.com', () => {
    expect(normalizeFreeSkillEmail('tomasz@googlemail.com')).toBe('tomasz@gmail.com');
  });

  test('handles dots, a tag and googlemail.com together', () => {
    expect(normalizeFreeSkillEmail('t.omasz+x@googlemail.com')).toBe('tomasz@gmail.com');
    expect(normalizeFreeSkillEmail('t.omasz+x@gmail.com')).toBe('tomasz@gmail.com');
  });

  test('leaves other providers as typed, dots and tags included', () => {
    expect(normalizeFreeSkillEmail('jan.kowalski+news@example.com')).toBe('jan.kowalski+news@example.com');
    expect(normalizeFreeSkillEmail('jan.kowalski@gmail.com.pl')).toBe('jan.kowalski@gmail.com.pl');
  });

  test('keeps an address with nothing before the tag as typed', () => {
    expect(normalizeFreeSkillEmail('+x@gmail.com')).toBe('+x@gmail.com');
  });
});
