# Testing

This page decides which tests run for a change in this repo: while you work, in verify and in release. It also says when an earlier passing run counts instead of a new one. When a workflow asks for "targeted tests" or a "regression suite", it means the suites the test map below lists for the change.

## Suites

All suites are Playwright tests that run locally; there is no CI. Each npm command goes through `scripts/test-run.mjs`, which saves a log of the run (see "Reusing a passing run").

| Group | What it guards | Spec files | Command | Screen sizes | Tests | Run time |
|---|---|---|---|---|---|---|
| Build | The site compiles: pages, content collections and the types Astro checks | — | `npm run build` | — | — | 0.4 min |
| Unit | The banner configuration in each language, the banner-cookie reader, the consent-record parser, the Easytools purchase event, the webhook's token guard, the Meta ads report's rows, the free-skill download count (which orders count, rounding, the fallback order, one read per build, no email in the log) the free sign-up's Gmail rewrite (`+` tags and `googlemail.com` become one address; dots stay as typed; other providers stay as typed) and its repeat check (an address that already holds the free skill, in either currency, is not granted it again; an Easytools or network error lets the grant go ahead) and its re-subscribe (after a new grant, a contact that opted out of all email is re-subscribed in Easymail, with a lookup, a read and one re-subscribe call; a subscribed, suppressed or missing contact, a holder's repeat sign-up, a failed grant, a grant made after a failed repeat check and a missing key change nothing; the form's answer does not wait for Easymail and does not fail with it; no address in the log) and the email answer page's two text files (the same `mail` + `odp` pairs in both languages, the day-12 answers present, no pair twice, no empty text) | `tests/unit/consent-config.spec.ts`, `tests/unit/consent-cookie.spec.ts`, `tests/unit/consent-record.spec.ts`, `tests/unit/purchase-event.spec.ts`, `tests/unit/meta-ads-report.spec.ts`, `tests/unit/free-skill-downloads.spec.ts`, `tests/unit/free-skill-email.spec.ts`, `tests/unit/free-skill-holder.spec.ts`, `tests/unit/resubscribe.spec.ts`, `tests/unit/email-answers.spec.ts` | `npm run test:unit` | desktop | 124 | 0.5 min |
| Consent | The cookie banner on a first visit (language, equal-weight buttons, the stored choice, the footer link, revision handling, no outside consent service) and the one cookie list shared by the content files, the privacy policies and the banner's settings window | `tests/consent/consent-flow.spec.ts`, `tests/consent/cookie-list.spec.ts` | `npm run test:consent` | both (cookie list: desktop) | 42 | 2.6 min |
| Tracking | Meta events only with marketing consent, the hashed-email Meta Lead on signup, PostHog only on the landing pages and only after statistics consent, Umami events on plan clicks and signups, and the events the shared attribute script sends (form seen, form start with focus, submit errors, video, sample, top-bar and interest clicks, pricing seen) | `tests/tracking/meta-consent.spec.ts`, `tests/tracking/meta-lead.spec.ts`, `tests/tracking/posthog-loading.spec.ts`, `tests/tracking/umami-events.spec.ts` | `npm run test:tracking` | both (Meta consent: desktop) | 104 | 2.8 min |
| Page sections | Section checks on the landing pages: the free-skill sections, the signup forms, testimonials, the try-free section and its videos, the download count in the free pages' hero badge and the try-free intro (wording, the badge at 360 px, no request for the count from the browser), the paid pages' prices, buy links and hero countdown before, inside and after the Black Friday window (browser clock set at each edge, and a tab left open across it), and the changelog pages (each product's own entries in date order, one main heading, the label, the free pages' titles, descriptions, `hreflang` and top bar, and the footer and "under the hood" links to the right changelog), with axe on those sections and screenshots saved for a person to look at (no image comparison) | `tests/screenshots/free-planning-skill.spec.ts`, `tests/screenshots/free-skill-form.spec.ts`, `tests/screenshots/testimonials.spec.ts`, `tests/screenshots/try-free.spec.ts`, `tests/screenshots/download-count.spec.ts`, `tests/screenshots/pricing.spec.ts`, `tests/screenshots/changelog.spec.ts` | `npm run test:sections` | both (Black Friday window states and changelog pages: desktop) | 114 | 8.5 min |
| Accessibility | A full-page axe scan, with the banner showing, of fourteen pages: the three landing pages, the privacy policy and the three changelogs, in Polish and English | `tests/a11y/pages.spec.ts` | `npm run test:a11y` | both | 28 | 1.7 min |
| Cookie check, local | Every page and example file in six consent states: everything the browser stores and every outside host it contacts must be on the cookie list, in a category the state allows | `tests/consent/cookie-check.spec.ts` | `npm run test:cookies` | desktop, 4 workers | 35 | 4.9 min |
| Cookie check, production | The same check against `https://agents.creativesparks.pl` | `tests/consent/cookie-check.spec.ts` | `npm run test:cookies:prod` | desktop, 4 workers | 35 | 4.4 min |

Run times were measured on 2026-11-12, each suite run alone, with the dev server's start included. A full local pass (build and every local suite) takes about 18 minutes.

## Test map

Look up every changed file (`git diff --name-only`) and run every suite its rows list. Two rules decide the unclear cases:

- A change that fits two rows takes the row with more tests.
- A text edit that adds a link, video or embed counts as a page change (the components row). A video or embed also adds an outside resource, so it takes the consent and trackers row as well.
- A wording-only edit takes the wording-only row, even when it sits in a page file that the components row also names. Wording only means sentences of prose changed and nothing else: no price, date, version, link, address or product name, and no element, class or prop. No test checks wording (the specs check behaviour and the names a text must carry), so only the build can catch what such an edit breaks.

| Kind of change | Files | Suites |
|---|---|---|
| Docs only | `docs/`, `.wm/`, `design.md`, `AGENTS.md`, `README.md`, `CHANGELOG.md`, and the `"version"` lines of `package.json` and `package-lock.json` | no tests |
| Agent skills | `.claude/skills/` | no tests: they are instructions for agents, and no test, build step or deployment reads them |
| Wording only | prose sentences in `src/content/` (except `src/content/consent/`) or in the markup of `src/pages/`, with nothing else changed (see the rule above) | build only |
| Email answer texts | `src/content/email-answers/` | build + unit + the email answer page's section test (`tests/screenshots/email-answer.spec.ts`) |
| Content text with no new link, video or embed | text in `src/content/` (except `src/content/consent/`) | build + that page's section test (the spec in `tests/screenshots/` that opens the page; a page with none gets build only) |
| Components, styles, page markup | `src/components/`, `src/layouts/` (outside the head scripts), `src/styles/global.css`, page markup in `src/pages/`, images in `src/assets/`, `src/lib/i18n.ts`, `src/lib/presale.ts` | build + page sections + accessibility |
| Consent and trackers | `src/lib/consent-config.ts`, `src/scripts/consent.ts`, `src/scripts/umami-attributes.ts`, `src/styles/cookieconsent-theme.css`, `src/content/consent/`, the head scripts in `src/layouts/BaseLayout.astro`, a tracking event added, changed or removed in a section or component, and any change that adds a script, embed, iframe or other outside resource | build + unit + consent + tracking + cookie check |
| API routes and their helpers | `src/pages/api/`, `src/lib/consent-record.ts`, `src/lib/consent-cookie.ts`, `src/lib/purchase-event.ts`, `src/lib/free-skill-email.ts`, `src/lib/free-skill-resubscribe.ts` | build + unit + consent + tracking (no cookie check: it answers the site's own `/api/` requests inside the browser, so it never sees them) |
| Free-skill download count | `src/lib/free-skill-downloads.ts`, `src/pages/free-skill-downloads.json.ts` | build + unit + page sections |
| Pages or example files added, removed or renamed; redirects and deploy settings | new, removed or renamed `.astro` pages in `src/pages/` and files in `public/examples/`, `vercel.json`, `.vercelignore` | build + cookie check + the section tests of those pages + updating the page list in `tests/a11y/pages.spec.ts`; for `vercel.json` and `.vercelignore` the cookie check runs on the preview deployment, because the local dev server ignores both files |
| Example files changed in place | files in `public/examples/` changed in place (same name, not added, removed or renamed) | build + cookie check: only the cookie check opens example files, so it is the suite that sees a new outside host or stored key; their content, links and layout stay unchecked (see "Not covered today") |
| Endpoints | new, removed or changed `.ts` files in `src/pages/` outside `src/pages/api/`, such as a prerendered `*.json.ts` file | build, plus the suites of the endpoint's own row if it has one; no cookie check and no section tests for the endpoint itself, because both open only `.astro` pages and example files |
| Dependencies and tool config | `package.json` (anything but the version), `package-lock.json` (likewise), `astro.config.mjs`, `playwright.config.ts`, `tsconfig.json` | everything: build + every suite + the cookie check locally, and on production after the deploy |
| Meta ads report | `scripts/meta-ads-report.mjs` | unit (its spec is `tests/unit/meta-ads-report.spec.ts`); after a change to the request, one live run of `npm run report:meta-ads` |
| Test specs | a spec file in `tests/` (`*.spec.ts`), added or changed | the suite whose spec files list it in the Suites table; a new spec is added to that list in the same change |
| Shared test helpers | `tests/screenshots/helpers.ts`, `tests/consent/consent-helpers.ts` | every suite with a spec that imports the helper, directly or through the other one: `screenshots/helpers.ts` → page sections + accessibility + consent + tracking; `consent-helpers.ts` → consent + tracking + page sections + accessibility + cookie check |
| Anything else | any file no row above names | everything, until it gets a row of its own. Today this covers `src/content.config.ts`, the files in `public/` outside `public/examples/`, `.mcp.json`, `.gitignore`, and `scripts/` apart from the Meta ads report (the test-run wrapper included) |

## Reusing a passing run

A suite's earlier pass counts as evidence, while working, in verify and in release, instead of a new run, when all of these hold:

1. The run went through its npm command, so its log is in `scratch/test-runs/` (git-ignored; one file per run, named `<UTC time>-<name>.log`).
2. The log's first line is the full commit hash followed by `clean`: the run had no uncommitted changes. A `dirty` log never counts.
3. The log's last line is `exit code: 0`.
4. `git diff --name-only <logged commit>..HEAD` names only files whose rows in the map do not list that suite.
5. Nothing is uncommitted at the time of reuse (`git status --porcelain` prints nothing).

The version number counts as the docs row even though it lives in `package.json` and `package-lock.json`. When the diff names either file, `git diff -U0 <logged commit>..HEAD -- package.json package-lock.json` must show only `"version"` lines changed; anything else puts the change in the dependencies row.

A production log proves the deployment it checked, so it is never reused across a deploy.

The build writes no log, so this rule does not cover it: run `npm run build` again whenever a row lists it. It takes under a minute.

Verify and release reports cite the log file and the diff output instead of re-running the suite:

```sh
ls scratch/test-runs/*-unit.log | tail -1        # newest unit log
head -1 scratch/test-runs/<log>                  # <hash> clean
tail -1 scratch/test-runs/<log>                  # exit code: 0
git diff --name-only <hash>..HEAD                # files changed since that run
```

## Release checklist

1. **Verify** on the branch, before anything deploys. Take `git diff --name-only master..HEAD`, look up every file in the map, and run each suite its rows list, reusing passing runs under the rule above. When `vercel.json` or `.vercelignore` changed, run the cookie check against the branch's preview deployment as well (see "How to run").
2. **Release**: version number and changelog. That commit is a docs-only change, so verify's passing runs stay valid and nothing is re-run.
3. **Deploy**: merge into `master` and push; production deploys from `master`.
4. **Production cookie check**, only when the release includes a row that lists the cookie check: `npm run test:cookies:prod` once the deploy has finished.

Deploying before verify is the exception. When it happens, the verify report logs it as one.

## How to run

- Suites run alone: never two at once, and never while a build runs or anything else reloads the dev server. Reloads in the middle of a test cause flaky failures.
- Locally, the Playwright config starts the dev server on port 4325, or reuses one already running there.
- After `npm run build`, delete `.vercel/output` before a suite that uses the dev server: the build leaves symlinks there that stop the dev server with `ELOOP: too many symbolic links encountered`. The folder is git-ignored and every build writes it again. Suites run with `--base-url` start no dev server and are not affected.
- `BASE_URL` points a suite at a deployment, and then no dev server starts. Through the wrapper, put `--base-url=<url>` right after the run name. That works in any shell, while `BASE_URL=… command` fails in the cmd.exe that npm uses on Windows. A preview deployment also needs `VERCEL_AUTOMATION_BYPASS_SECRET` (Vercel's protection-bypass secret) set in the environment; the cookie check sends it. For example:
  `node scripts/test-run.mjs cookies-preview --base-url=<preview URL> test tests/consent/cookie-check.spec.ts --workers=4 --reporter=list`
- Playwright flags pass through an npm command: `npm run test:unit -- --list` lists the tests without running them.
- To run one spec file, call the wrapper directly: `node scripts/test-run.mjs <name> test <spec file> --reporter=list`. A path added after an npm command does not narrow the run, because Playwright runs every file that matches any path it is given.
- Logs land in `scratch/test-runs/`. Google Drive may add a `desktop.ini` there, so pick logs by `*.log`.
- Commit before running a suite whose log verify or release will cite: a log that starts `dirty` never counts, and the run has to be repeated.
- Leave nothing running. A dev server the suites started can stay on port 4325 and lock files in the repo (a folder move failed on 2026-11-13). After the last suite, stop it: in PowerShell, `Get-NetTCPConnection -State Listen -LocalPort 4325` gives the process to stop.
- A real run on a preview: script it with `--base-url=<preview URL>` and the bypass secret above (phone size comes from the Mobile Chrome project), not the owner's Chrome. The owner's browser is needed only to read the Meta test-events code: Events Manager → dataset `482025232476807` → Test events → Website, then the server-events section, read as page text. Open the page with `?test_event_code=<code>` after accepting marketing cookies.

## Keys and logins

What the tests and checks read, by name and place; the values never go on this page. No suite calls an outside API with a key: outside services are blocked or mocked (see "Not covered today").

- `VERCEL_AUTOMATION_BYPASS_SECRET`, in `.env.local`: opens a Vercel preview deployment, sent as the `x-vercel-protection-bypass` header by the cookie check and by real runs on a preview.
- The `gh` CLI login: reads a preview deployment's address (`gh api repos/Creative-Sparks-pl/AI-agents-website/deployments/<id>/statuses`).
- `EASYCART_API_KEY`, in `.env.local` and in Vercel (Production and Preview): the build reads Easytools orders with it to count free-skill downloads. Without it the build falls back to the live site's number, then 200, so the build and the suites still pass.
- `EASYMAIL_API_KEY`, in `.env.local` and in Vercel (Production and Preview): the free sign-up re-subscribes a contact that opted out of all email with it. No suite reaches Easymail: the unit test answers its requests itself. Without the key the sign-up still grants and skips the re-subscribe.
- `CONSENT_DATABASE_URL`, in `.env.local` and in Vercel (Production and Preview): the consent route's database. No suite reaches it: the route's requests are answered inside the browser.
- `EASYTOOLS_WEBHOOK_TOKEN`, in `.env.local` and in Vercel: the paid-purchase webhook's token. The unit test checks only that a call without the right token is rejected.
- `META_CAPI_ACCESS_TOKEN` and `PUBLIC_META_PIXEL_ID`, in `.env.local` and in Vercel: the Conversions API route and the Meta Pixel. The suites block Meta, so no event is sent.

## Revising the tests

Assume the suites do not cover every change we can make. The map says which suites run; it does not promise that they can see the change. Three rules keep the suites growing where it matters:

1. When a change is planned, name the test that would catch it breaking. If none would, the change adds a test or extends one, or the verify report records the manual check done instead.
2. A bug found after a release gets a test that would have caught it, and a row in the map if no row fits the files it touched.
3. Adding, removing or renaming a test file updates the suites table and the map in the same commit. Verify checks that every spec file is named on this page; this prints nothing when all are:

   ```sh
   for f in $(find tests -name '*.spec.ts'); do grep -qF "$f" docs/testing.md || echo "MISSING $f"; done
   ```

### Failures that got past the tests

Each failure the tests did not catch, whether found after a release or fixed in a fix commit: the date, what broke, the fix, and what covers it now.

- 2026-11-19 — a repeat free sign-up was granted the skill again — fix 6f8a9d2 — covered by: test

### Not covered today

From one read-through on 2026-11-12 of the test files against the pages, sections, API routes and deployment settings. When a change touches one of these, rule 1 applies: a manual check or a new test.

Pages:

- Built output: every suite runs on the dev server (`astro dev`), so the production build, the Vercel adapter's output and the prerendered HTML are never tested, except when `BASE_URL` points the cookie check at a deployment.
- Pages with no section test: the how-to pages (`instrukcja`, `how-it-works`), the knowledge-base pages (`baza-wiedzy`, `knowledge-base`), and the terms (`regulamin`, `terms`), in both languages. Only the cookie check opens them, and it reads cookies and hosts, not content; the terms are also opened by the PostHog test, which checks only that PostHog stays off.
- Privacy policies: axe and the cookie-table test run in both languages, but nothing checks the policy's promises (retention periods and the like) against what the site does.
- Accessibility: the axe scan covers fourteen pages; the how-to, knowledge-base, terms and design-system pages are never scanned.
- The root page (`src/pages/index.astro`) sends visitors on to `/ux-design-skill/` with a meta refresh. Only the cookie check opens it; nothing tests where it leads.
- Design-system pages (`src/pages/design-system/`): only the cookie check opens them.
- Retired pages in `src/pages/archive/`: not deployed, and tested nowhere, the cookie check included.
- Example files (`public/examples/*.html`): only the cookie check opens them; their links, content and layout are not checked.
- Sitemap, `robots.txt`, canonical and `hreflang` tags, and the share image and metadata: no test reads them.
- Screen sizes: unit tests, the cookie list, the cookie check and the Meta consent test run on desktop only.

Sections:

- Tests reach only a handful of sections: try-free, testimonials, the free-skill sections on the planning page, the hero and final signup forms, the pricing-plan clicks and the cookie banner.
- Nothing checks the text, links, anchors or layout of the hero, problems, platform, process, architecture, comparison, landscape, use cases and examples, demo, knowledge base, audience filter, author, FAQ, footer and top-bar sections. They are only rendered: under axe on the three landing pages, and by the cookie check.
- Pricing: only the Umami event on the plan clicks is tested; prices, plan content and the checkout links to the Easytools cart are not.
- The demo section's interactive stage is not tested.
- Navigation: the footer and top-bar links, the language switch and anchor links are not checked, apart from the old try-free anchors.
- The knowledge-base sections (`src/components/sections/kb/`) have no test.
- Visual look: with the screenshot comparison gone, no test notices a layout or style regression. The page-section tests save screenshots for a person to look at; they compare nothing.
- Testimonials: the slide mechanics are tested, not the quotes or their links.

API routes:

- `/api/subscribe` is mocked in the browser in every test. Its handler runs only in the unit test of the re-subscribe, against a fake Easytools and a fake Easymail: that covers who is re-subscribed and that the answer does not wait, not the route's own checks (email, language and skill) or the real services. On Vercel the re-subscribe is kept running after the answer by `waitUntil` from `@vercel/functions`, which the unit test replaces with a stand-in, so only a real sign-up on a preview shows that the answer goes out first and the re-subscribe still finishes.
- `/api/consent`: only its record parser is unit-tested. The route itself (status codes, the database insert, the failing-database path) is answered inside the browser and never reached.
- `/api/meta-capi`: only the banner-cookie reader and the browser side are tested. The route's own handling, its call to Meta and its rule of sending nothing without marketing consent are not tested end to end.
- `/api/easytools-webhook`: only the rejection without a valid token and the purchase-event builder are tested. The accepted path (valid token, Meta purchase event) never runs, because the dev server has no token.
- Outside services (Neon, Easytools, Meta, Umami, PostHog, Wistia) are blocked or mocked on purpose, so a break on their side shows only in production.

Deployment settings:

- `vercel.json` redirects (the old `/ux-designer/` and `/free-ux-audit-skill/` addresses, and the trailing-slash rule): the dev server ignores `vercel.json`, so no test follows them.
- Response headers: `vercel.json` sets none of its own, and no test checks any response header.
- `.vercelignore` keeps `src/pages/archive/` out of deploys. The dev server still serves it, and nothing checks that it is absent in production.
- Environment variables on Vercel (`CONSENT_DATABASE_URL`, `EASYTOOLS_WEBHOOK_TOKEN`, the Meta and Easytools keys): tests run without them, so nothing checks that Production and Preview have them right.
- `astro.config.mjs` (Vercel adapter, language routing, sitemap, MDX, image service) is exercised only by the dev server.
- Nothing runs the suites automatically; they run when someone starts them, and only the cookie check runs against production.
