import { createHash } from 'node:crypto';
import { test, expect, type BrowserContext, type Page } from '@playwright/test';
import { blockDataSending, setConsent } from '../consent/consent-helpers';

// The banner's cookie is preset with a fixed choice (or the banner is clicked), Meta's scripts are
// blocked, /api/subscribe is mocked and sendBeacon is swapped for a recorder, so these tests send
// no signup and nothing to Meta.
const FAKE_DOWNLOAD = 'https://downloads.test/skill.zip';
const EMAIL = 'Lead.Check.4821@Example.com';
// Meta's rule for emails: trim, lowercase, then SHA-256 as lowercase hex.
const EXPECTED_HASH = createHash('sha256').update(EMAIL.trim().toLowerCase()).digest('hex');

const CASES = [
  { path: '/free-website-planning-skill/', surface: 'free_planning_skill_hero' },
  { path: '/en/free-homepage-ux-audit-skill/', surface: 'free_audit_skill_hero' },
];

type CapiBody = { event_name?: string; em?: unknown; [key: string]: unknown };

/** Blocks data-sending and Meta's scripts, and presets the banner's cookie with or without marketing. */
async function presetConsent(page: Page, context: BrowserContext, baseURL: string, marketing: boolean) {
  await blockDataSending(page);
  await page.route(/^https?:\/\/connect\.facebook\.net\//, (route) => route.abort());
  await setConsent(context, baseURL, marketing ? ['marketing'] : []);
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
  test(`meta lead ${path} ${surface}: with marketing consent the Lead carries only the email hash`, async ({ page, context, baseURL }) => {
    await presetConsent(page, context, baseURL!, true);
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

test('meta lead: without marketing consent nothing is sent to Meta', async ({ page, context, baseURL }) => {
  const { path, surface } = CASES[0];
  await presetConsent(page, context, baseURL!, false);
  const readCapi = await recordCapi(page);
  await mockSubscribe(page);

  await submitForm(page, path, surface);

  // Without consent the helper returns before hashing, so nothing can still be on its way; the wait is a margin.
  await page.waitForTimeout(500);
  expect(await readCapi()).toEqual([]);
});

test('meta pixel: accepting marketing in the banner loads the Pixel and sends one page view, without a reload', async ({ page }) => {
  const pixelRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('connect.facebook.net')) pixelRequests.push(request.url());
  });
  await blockDataSending(page);
  await page.route(/^https?:\/\/connect\.facebook\.net\//, (route) => route.abort());
  const readCapi = await recordCapi(page);
  let navigations = 0;
  page.on('framenavigated', (frame) => {
    if (frame === page.mainFrame()) navigations++;
  });

  await page.goto('/ux-design-skill/');
  const banner = page.locator('#cc-main .cm');
  await expect(banner).toBeVisible();

  // Before any choice: no Pixel, no page view.
  await page.waitForLoadState('networkidle');
  expect(pixelRequests).toEqual([]);
  expect(await readCapi()).toEqual([]);

  await banner.getByRole('button', { name: 'Akceptuj wszystkie', exact: true }).click();

  const pageViews = async () => (await readCapi()).filter((b) => b.event_name === 'PageView');
  await expect.poll(async () => (await pageViews()).length).toBe(1);
  expect(pixelRequests.length).toBeGreaterThan(0);

  // The browser event (queued in the Pixel stub, since Meta's script is blocked) and the server
  // event share one ID, so Meta counts the page view once.
  const browserEventId = await page.evaluate(() => {
    const queue = ((window as unknown as { fbq?: { queue?: ArrayLike<unknown>[] } }).fbq?.queue ?? []).map((args) =>
      Array.from(args),
    );
    const call = queue.find((args) => args[0] === 'track' && args[1] === 'PageView');
    return (call?.[3] as { eventID?: string } | undefined)?.eventID;
  });
  expect(browserEventId).toBeTruthy();
  expect(browserEventId).toBe((await pageViews())[0].event_id);

  await page.waitForTimeout(500);
  expect(await pageViews()).toHaveLength(1);
  expect(navigations).toBe(1);
});
