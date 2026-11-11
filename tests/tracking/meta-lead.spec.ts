import { createHash } from 'node:crypto';
import { test, expect, type Page } from '@playwright/test';
import { blockThirdParty } from '../screenshots/helpers';

// Cookiebot is blocked and replaced by a stub with a fixed consent answer, /api/subscribe is mocked,
// and sendBeacon is swapped for a recorder, so these tests send no signup and nothing to Meta.
const FAKE_DOWNLOAD = 'https://downloads.test/skill.zip';
const EMAIL = 'Lead.Check.4821@Example.com';
// Meta's rule for emails: trim, lowercase, then SHA-256 as lowercase hex.
const EXPECTED_HASH = createHash('sha256').update(EMAIL.trim().toLowerCase()).digest('hex');

const CASES = [
  { path: '/free-website-planning-skill/', surface: 'free_planning_skill_hero' },
  { path: '/en/free-homepage-ux-audit-skill/', surface: 'free_audit_skill_hero' },
];

type CapiBody = { event_name?: string; em?: unknown; [key: string]: unknown };

async function stubConsent(page: Page, marketing: boolean) {
  await page.addInitScript((marketing) => {
    Object.assign(window, {
      Cookiebot: { consent: { necessary: true, preferences: false, statistics: false, marketing } },
    });
  }, marketing);
}

/** Records every body the page sends to the Meta endpoint, without sending it; returns a reader. */
async function recordCapi(page: Page) {
  await page.addInitScript(() => {
    const bodies: string[] = [];
    Object.assign(window, { __capiBodies: bodies });
    navigator.sendBeacon = (url, data) => {
      if (String(url).includes('/api/meta-capi') && data instanceof Blob) {
        void data.text().then((text) => bodies.push(text));
      }
      return true;
    };
  });
  // The fetch fallback lands here instead of the real endpoint.
  const fetched: string[] = [];
  await page.route('**/api/meta-capi', async (route) => {
    fetched.push(route.request().postData() ?? '');
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  return async (): Promise<CapiBody[]> => {
    const beacons = await page.evaluate(() => (window as unknown as { __capiBodies: string[] }).__capiBodies);
    return [...beacons, ...fetched].map((text) => JSON.parse(text) as CapiBody);
  };
}

/** Answers the form's request with a success; every other API call except the Meta one is refused. */
async function mockSubscribe(page: Page) {
  await page.route(/^https?:\/\/[^/]+\/api\/(?!meta-capi)/, (route) => route.abort());
  await page.route('**/api/subscribe', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, downloadUrl: FAKE_DOWNLOAD }),
    }),
  );
  await page.route(`${FAKE_DOWNLOAD}*`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/zip',
      headers: { 'Content-Disposition': 'attachment; filename="skill.zip"' },
      body: 'zip',
    }),
  );
}

async function submitForm(page: Page, path: string, surface: string) {
  const response = await page.goto(path);
  expect(response?.status()).toBe(200);
  await page.waitForLoadState('networkidle');
  const form = page.locator(`.free-skill-form[data-surface="${surface}"]`);
  await form.locator('input[name="email"]').fill(EMAIL);
  await form.locator('button[type="submit"]').click();
  await expect(form).toHaveAttribute('data-state', 'success');
}

for (const { path, surface } of CASES) {
  test(`meta lead ${path} ${surface}: with marketing consent the Lead carries only the email hash`, async ({ page }) => {
    await blockThirdParty(page);
    await stubConsent(page, true);
    const readCapi = await recordCapi(page);
    await mockSubscribe(page);

    await submitForm(page, path, surface);

    // Hashing is asynchronous, so the Lead is sent a moment after the success state.
    await expect.poll(async () => (await readCapi()).filter((b) => b.event_name === 'Lead').length).toBe(1);
    const bodies = await readCapi();
    const lead = bodies.find((b) => b.event_name === 'Lead')!;
    expect(lead.em).toBe(EXPECTED_HASH);
    expect(lead.em).toMatch(/^[0-9a-f]{64}$/);

    // Only the Lead carries the hash; the page view knows no email.
    for (const body of bodies.filter((b) => b.event_name !== 'Lead')) {
      expect(body).not.toHaveProperty('em');
    }

    // The address itself never leaves the browser, in any case, not even the part before the @.
    const serialized = JSON.stringify(bodies).toLowerCase();
    expect(serialized).not.toContain(EMAIL.toLowerCase());
    expect(serialized).not.toContain(EMAIL.split('@')[0].toLowerCase());
  });
}

test('meta lead: without marketing consent nothing is sent to Meta', async ({ page }) => {
  const { path, surface } = CASES[0];
  await blockThirdParty(page);
  await stubConsent(page, false);
  const readCapi = await recordCapi(page);
  await mockSubscribe(page);

  await submitForm(page, path, surface);

  // Without consent the helper returns before hashing, so nothing can still be on its way; the wait is a margin.
  await page.waitForTimeout(500);
  expect(await readCapi()).toEqual([]);
});
