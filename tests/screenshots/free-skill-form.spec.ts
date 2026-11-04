import { test, expect, type Page } from '@playwright/test';
import { expectAxeClean, openPage, shoot, widthOf } from './helpers';

// /api/subscribe is always mocked here, so these tests never send a real signup.
const FAKE_DOWNLOAD = 'https://downloads.test/skill.zip';

const FORMS = [
  { name: 'audit-pl', path: '/free-ux-audit-skill/', locale: 'pl', skill: 'audit', surfaces: ['free_audit_skill_hero', 'free_audit_skill_final'] },
  { name: 'audit-en', path: '/en/free-ux-audit-skill/', locale: 'en', skill: 'audit', surfaces: ['free_audit_skill_hero', 'free_audit_skill_final'] },
  { name: 'uxd-pl', path: '/ux-design-skill/', locale: 'pl', skill: 'audit', surfaces: ['ux_design_skill_audyt'] },
  { name: 'uxd-en', path: '/en/ux-design-skill/', locale: 'en', skill: 'audit', surfaces: ['ux_design_skill_audyt'] },
  { name: 'planning-pl', path: '/free-website-planning-skill/', locale: 'pl', skill: 'planning', surfaces: ['free_planning_skill_hero', 'free_planning_skill_final'] },
  { name: 'planning-en', path: '/en/free-website-planning-skill/', locale: 'en', skill: 'planning', surfaces: ['free_planning_skill_hero', 'free_planning_skill_final'] },
];

/** Answers the form's request and records what it sent. */
async function mockSubscribe(page: Page, reply: () => { status: number; body: object }) {
  const requests: Array<Record<string, string>> = [];
  await page.route('**/api/subscribe', async (route) => {
    requests.push(route.request().postDataJSON());
    const { status, body } = reply();
    await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
  });
  // The real link answers as a file download, which keeps the visitor on the page; this does the same.
  await page.route(`${FAKE_DOWNLOAD}*`, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/zip',
      headers: { 'Content-Disposition': 'attachment; filename="skill.zip"' },
      body: 'zip',
    }),
  );
  return requests;
}

for (const { name, path, locale, skill, surfaces } of FORMS) {
  for (const surface of surfaces) {
    test(`form ${name} ${surface}: default, error and success states`, async ({ page }, testInfo) => {
      test.setTimeout(180_000);
      let reply = { status: 500, body: { ok: false, reason: 'server_error' } as object };
      const requests = await mockSubscribe(page, () => reply);
      await openPage(page, path);

      const selector = `.free-skill-form[data-surface="${surface}"]`;
      const form = page.locator(selector);
      const email = form.locator('input[name="email"]');
      const submit = form.locator('button[type="submit"]');
      const error = form.locator('.free-skill-form__error');
      const shot = (state: string) => shoot(page, form, `form-${name}-${surface}-${state}-${widthOf(testInfo)}`);

      await expect(form).toHaveAttribute('data-skill', skill);
      await expect(form).toHaveAttribute('data-locale', locale);
      await expectAxeClean(page, selector);
      await shot('default');

      await email.fill('not-an-email');
      await submit.click();
      await expect(error).toBeVisible();
      expect(requests).toHaveLength(0);
      await expectAxeClean(page, selector);
      await shot('error-email');

      await email.fill('reader@example.com');
      await submit.click();
      await expect(form).toHaveAttribute('data-state', 'error');
      await expect(error).toBeVisible();
      await expectAxeClean(page, selector);
      await shot('error-server');

      reply = { status: 200, body: { ok: true, downloadUrl: FAKE_DOWNLOAD } };
      await submit.click();
      await expect(form).toHaveAttribute('data-state', 'success');
      await expect(form.locator('.free-skill-form__success')).toBeVisible();
      await expect(form.locator('.free-skill-form__download')).toHaveAttribute('href', FAKE_DOWNLOAD);
      await expect(error).toBeHidden();
      expect(requests.at(-1)).toMatchObject({ email: 'reader@example.com', skill, locale });
      await expectAxeClean(page, selector);
      await shot('success');
    });
  }
}
