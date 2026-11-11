import { defineConfig, devices } from '@playwright/test';

// Port 4321 is often held by another local project, and `astro preview` serves no pages with this adapter.
const PORT = 4325;
// Set BASE_URL to run against a deployment (e.g. the cookie check on production); no dev server starts then.
const BASE_URL = process.env.BASE_URL;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'html',
  snapshotPathTemplate: '{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}-{projectName}{ext}',
  use: {
    baseURL: BASE_URL ?? `http://localhost:${PORT}`,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 720 } },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: BASE_URL
    ? undefined
    : {
        command: `npx astro dev --port ${PORT}`,
        port: PORT,
        reuseExistingServer: !process.env.CI,
      },
});
