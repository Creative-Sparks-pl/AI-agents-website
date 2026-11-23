import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
// js-yaml is the parser Astro itself uses for content files.
import { load } from 'js-yaml';

// The answer page (/answer/, /en/answer/) picks its text by the `mail` and `odp` values in the
// link. Both languages read the same set of values, so an email in either language can link the
// same answers. These tests catch a language file that drifts from the other.

interface Text {
  heading: string;
  text: string;
}

interface Answer extends Text {
  mail: string;
  odp: string;
}

interface AnswersFile {
  title: string;
  description: string;
  fallback: Text;
  answers: Answer[];
}

const LANGUAGES = ['pl', 'en'] as const;

function answersFile(language: (typeof LANGUAGES)[number]): AnswersFile {
  return load(readFileSync(`src/content/email-answers/${language}.yaml`, 'utf8')) as AnswersFile;
}

const pairKey = ({ mail, odp }: { mail: string; odp: string }) => `${mail}/${odp}`;

/** The pairs one list has and the other lacks, both ways. Empty when the lists hold the same pairs. */
function pairDifference(a: { mail: string; odp: string }[], b: { mail: string; odp: string }[]): string[] {
  const left = new Set(a.map(pairKey));
  const right = new Set(b.map(pairKey));
  return [...[...left].filter((key) => !right.has(key)), ...[...right].filter((key) => !left.has(key))].sort();
}

test('email answers: both languages hold the same mail + odp pairs', () => {
  expect(pairDifference(answersFile('pl').answers, answersFile('en').answers)).toEqual([]);
});

test('email answers: the comparison reports a pair one language lacks (counter-example)', () => {
  const pl = [{ mail: 'n3', odp: 'sprobuje' }, { mail: 'n3', odp: 'pozniej' }];
  const en = [{ mail: 'n3', odp: 'sprobuje' }, { mail: 'n3', odp: 'later' }];
  expect(pairDifference(pl, en)).toEqual(['n3/later', 'n3/pozniej']);
});

// The day-12 email (n3) links these three answers in both languages.
test('email answers: the day-12 email answers are all there', () => {
  for (const language of LANGUAGES) {
    const keys = answersFile(language).answers.map(pairKey);
    expect(keys, language).toEqual(expect.arrayContaining(['n3/sprobuje', 'n3/pozniej', 'n3/nie-dla-mnie']));
  }
});

for (const language of LANGUAGES) {
  test(`email answers ${language}: no pair repeats`, () => {
    const keys = answersFile(language).answers.map(pairKey);
    expect(keys.length).toBe(new Set(keys).size);
  });

  test(`email answers ${language}: title, description, fallback and every answer have text`, () => {
    const file = answersFile(language);
    const texts = [file.title, file.description, file.fallback.heading, file.fallback.text];
    for (const answer of file.answers) texts.push(answer.mail, answer.odp, answer.heading, answer.text);
    for (const value of texts) expect(typeof value === 'string' && value.trim().length > 0, String(value)).toBe(true);
  });
}
