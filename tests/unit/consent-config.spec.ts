import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
// js-yaml is the parser Astro itself uses for content files.
import { load } from 'js-yaml';
import {
  CONSENT_COOKIE_DAYS,
  CONSENT_REVISION,
  buildConsentConfig,
  consentContentSchema,
  type ConsentContent,
} from '../../src/lib/consent-config';

const LANGUAGES = ['pl', 'en'] as const;

function content(language: (typeof LANGUAGES)[number]): ConsentContent {
  const raw = load(readFileSync(`src/content/consent/${language}.yaml`, 'utf8'));
  return consentContentSchema.parse(raw);
}

// Every string a content file holds, for checking which language a config speaks.
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

for (const language of LANGUAGES) {
  const other = language === 'pl' ? 'en' : 'pl';

  test.describe(`consent config (${language})`, () => {
    const config = buildConsentConfig(content(language), language);
    const translation = config.language.translations[language];
    const sections = translation.preferencesModal.sections;

    test('holds only this language', () => {
      expect(config.language.default).toBe(language);
      expect(Object.keys(config.language.translations)).toEqual([language]);

      // No value that exists only in the other language's file appears in this config.
      const own = new Set(strings(content(language)));
      const foreign = strings(content(other)).filter((text) => !own.has(text));
      const values = new Set(strings(config));
      expect(foreign.length).toBeGreaterThan(20);
      for (const text of foreign) expect(values.has(text), `"${text}" from ${other}.yaml`).toBe(false);
      expect(translation.consentModal.title).toBe(content(language).banner.title);
      expect(translation.consentModal.footer).toContain(content(language).policy.href);
    });

    test('has three categories, necessary read-only and the others off by default', () => {
      expect(Object.keys(config.categories)).toEqual(['necessary', 'statistics', 'marketing']);
      expect(config.categories.necessary).toMatchObject({ enabled: true, readOnly: true });
      expect(config.categories.statistics).toMatchObject({ enabled: false, readOnly: false });
      expect(config.categories.marketing).toMatchObject({ enabled: false, readOnly: false });
      expect(sections.filter((section) => section.linkedCategory).map((section) => section.linkedCategory)).toEqual([
        'necessary',
        'statistics',
        'marketing',
      ]);
    });

    test('lists every cookie-list entry in its section of the settings window', () => {
      const rows = sections.flatMap((section) => section.cookieTable?.body ?? []);
      // The library draws no table for a section without a toggle, so the services that store
      // nothing are listed in a table written into their own section's description.
      const cookieless = sections.find((section) => section.title === content(language).categories.cookieless.title);
      const escaped = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      for (const entry of content(language).cookies) {
        const names = entry.storage.length ? entry.storage.map((item) => item.name) : [content(language).preferences.noStorage];
        if (entry.category === 'cookieless') {
          expect(cookieless?.linkedCategory).toBeUndefined();
          for (const text of [entry.service, ...names]) expect(cookieless?.description, entry.service).toContain(escaped(text));
          continue;
        }
        for (const name of names) {
          expect(rows, `${entry.service}: ${name}`).toContainEqual(expect.objectContaining({ name, service: entry.service }));
        }
      }
    });

    test('makes every optional entry a service of its category', () => {
      for (const entry of content(language).cookies) {
        if (entry.category !== 'statistics' && entry.category !== 'marketing') continue;
        expect(config.categories[entry.category].services?.[entry.id]).toEqual({ label: entry.service });
      }
    });

    test('carries the banner revision', () => {
      expect(CONSENT_REVISION).toBeGreaterThan(0);
      expect(config.revision).toBe(CONSENT_REVISION);
    });

    test('gives accept and reject equal weight', () => {
      expect(config.guiOptions.consentModal).toMatchObject({ equalWeightButtons: true, flipButtons: false });
      expect(config.guiOptions.preferencesModal).toMatchObject({ equalWeightButtons: true, flipButtons: false });
      expect(translation.consentModal.acceptAllBtn).toBeTruthy();
      expect(translation.consentModal.acceptNecessaryBtn).toBeTruthy();
    });

    test('keeps the layout defaults: a bottom box, full width on phones, no overlay', () => {
      // The library's box layout spans the full width below 640px; the visual check covers it.
      expect(config.guiOptions.consentModal.layout).toBe('box');
      expect(config.guiOptions.consentModal.position).toMatch(/^bottom /);
      expect(config.disablePageInteraction).toBe(false);
    });

    test('remembers a choice for 182 days', () => {
      expect(CONSENT_COOKIE_DAYS).toBe(182);
      expect(config.cookie).toEqual({ name: 'cc_cookie', expiresAfterDays: 182 });
    });
  });
}
