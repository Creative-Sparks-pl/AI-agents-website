# Testing

This page decides which tests run for a change in this repo: while you work, in verify and in release. It also says when an earlier passing run counts instead of a new one. When a workflow asks for "targeted tests" or a "regression suite", it means the suites the test map below lists for the change.

## Suites

All suites are Playwright tests that run locally; there is no CI. Each npm command goes through `scripts/test-run.mjs`, which saves a log of the run (see "Reusing a passing run").

| Group | What it guards | Spec files | Command | Screen sizes | Tests | Run time |
|---|---|---|---|---|---|---|
| Build | The site compiles: pages, content collections and the types Astro checks | — | `npm run build` | — | — | to be measured |
| Unit | The banner configuration in each language, the banner-cookie reader, the consent-record parser, the Easytools purchase event and the webhook's token guard | `tests/unit/consent-config.spec.ts`, `tests/unit/consent-cookie.spec.ts`, `tests/unit/consent-record.spec.ts`, `tests/unit/purchase-event.spec.ts` | `npm run test:unit` | desktop | 48 | to be measured |
| Consent | The cookie banner on a first visit (language, equal-weight buttons, the stored choice, the footer link, revision handling, no outside consent service) and the one cookie list shared by the content files, the privacy policies and the banner's settings window | `tests/consent/consent-flow.spec.ts`, `tests/consent/cookie-list.spec.ts` | `npm run test:consent` | both (cookie list: desktop) | 42 | to be measured |
| Tracking | Meta events only with marketing consent, the hashed-email Meta Lead on signup, PostHog only on the landing pages and only after statistics consent, Umami events on plan clicks and signups | `tests/tracking/meta-consent.spec.ts`, `tests/tracking/meta-lead.spec.ts`, `tests/tracking/posthog-loading.spec.ts`, `tests/tracking/umami-events.spec.ts` | `npm run test:tracking` | both (Meta consent: desktop) | 52 | to be measured |
| Page sections | Section checks on the landing pages: the free-skill sections, the signup forms, testimonials, the try-free section and its videos, with axe on those sections and screenshots saved for a person to look at (no image comparison) | `tests/screenshots/free-planning-skill.spec.ts`, `tests/screenshots/free-skill-form.spec.ts`, `tests/screenshots/testimonials.spec.ts`, `tests/screenshots/try-free.spec.ts` | `npm run test:sections` | both | 60 | to be measured |
| Accessibility | A full-page axe scan, with the banner showing, of eight pages: the three landing pages and the privacy policy, in Polish and English | `tests/a11y/pages.spec.ts` | `npm run test:a11y` | both | 16 | to be measured |
| Cookie check, local | Every page and example file in six consent states: everything the browser stores and every outside host it contacts must be on the cookie list, in a category the state allows | `tests/consent/cookie-check.spec.ts` | `npm run test:cookies` | desktop, 4 workers | 35 | to be measured |
| Cookie check, production | The same check against `https://agents.creativesparks.pl` | `tests/consent/cookie-check.spec.ts` | `npm run test:cookies:prod` | desktop, 4 workers | 35 | to be measured |

## Test map

Look up every changed file (`git diff --name-only`) and run every suite its rows list. Two rules decide the unclear cases:

- A change that fits two rows takes the row with more tests.
- A text edit that adds a link, video or embed counts as a page change (the components row). A video or embed also adds an outside resource, so it takes the consent and trackers row as well.

| Kind of change | Files | Suites |
|---|---|---|
| Docs only | `docs/`, `design.md`, `AGENTS.md`, `README.md`, `CHANGELOG.md`, and the `"version"` lines of `package.json` and `package-lock.json` | no tests |
| Content text with no new link, video or embed | text in `src/content/` (except `src/content/consent/`) | build + that page's section test (the spec in `tests/screenshots/` that opens the page; a page with none gets build only) |
| Components, styles, page markup | `src/components/`, `src/layouts/` (outside the head scripts), `src/styles/global.css`, page markup in `src/pages/`, images in `src/assets/`, `src/lib/i18n.ts`, `src/lib/presale.ts` | build + page sections + accessibility |
| Consent and trackers | `src/lib/consent-config.ts`, `src/scripts/consent.ts`, `src/styles/cookieconsent-theme.css`, `src/content/consent/`, the head scripts in `src/layouts/BaseLayout.astro`, a tracking event added, changed or removed in a section or component, and any change that adds a script, embed, iframe or other outside resource | build + unit + consent + tracking + cookie check |
| API routes and their helpers | `src/pages/api/`, `src/lib/consent-record.ts`, `src/lib/consent-cookie.ts`, `src/lib/purchase-event.ts` | build + unit + consent + tracking (no cookie check: it answers the site's own `/api/` requests inside the browser, so it never sees them) |
| Pages or example files added, removed or renamed; redirects and deploy settings | new, removed or renamed files in `src/pages/` and `public/examples/`, `vercel.json`, `.vercelignore` | build + cookie check + the section tests of those pages + updating the page list in `tests/a11y/pages.spec.ts`; for `vercel.json` and `.vercelignore` the cookie check runs on the preview deployment, because the local dev server ignores both files |
| Dependencies and tool config | `package.json` (anything but the version), `package-lock.json` (likewise), `astro.config.mjs`, `playwright.config.ts`, `tsconfig.json` | everything: build + every suite + the cookie check locally, and on production after the deploy |
| Anything else | any file no row above names | everything, until it gets a row of its own. Today this covers `src/content.config.ts`, the files in `public/` outside `public/examples/`, `.mcp.json`, `.gitignore`, `scripts/` (the test-run wrapper included), `.claude/skills/`, and the test files and helpers in `tests/` |

## Reusing a passing run

A suite's earlier pass counts as evidence, while working, in verify and in release, instead of a new run, when all of these hold:

1. The run went through its npm command, so its log is in `scratch/test-runs/` (git-ignored; one file per run, named `<UTC time>-<name>.log`).
2. The log's first line is the full commit hash followed by `clean`: the run had no uncommitted changes. A `dirty` log never counts.
3. The log's last line is `exit code: 0`.
4. `git diff --name-only <logged commit>..HEAD` names only files whose rows in the map do not list that suite.
5. Nothing is uncommitted at the time of reuse (`git status --porcelain` prints nothing).

The version number counts as the docs row even though it lives in `package.json` and `package-lock.json`. When the diff names either file, `git diff -U0 <logged commit>..HEAD -- package.json package-lock.json` must show only `"version"` lines changed; anything else puts the change in the dependencies row.

A production log proves the deployment it checked, so it is never reused across a deploy.

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
- `BASE_URL` points a suite at a deployment, and then no dev server starts. Through the wrapper, put `--base-url=<url>` right after the run name. That works in any shell, while `BASE_URL=… command` fails in the cmd.exe that npm uses on Windows. A preview deployment also needs `VERCEL_AUTOMATION_BYPASS_SECRET` (Vercel's protection-bypass secret) set in the environment; the cookie check sends it. For example:
  `node scripts/test-run.mjs cookies-preview --base-url=<preview URL> test tests/consent/cookie-check.spec.ts --workers=4 --reporter=list`
- Playwright flags pass through an npm command: `npm run test:unit -- --list` lists the tests without running them.
- To run one spec file, call the wrapper directly: `node scripts/test-run.mjs <name> test <spec file> --reporter=list`. A path added after an npm command does not narrow the run, because Playwright runs every file that matches any path it is given.
- Logs land in `scratch/test-runs/`. Google Drive may add a `desktop.ini` there, so pick logs by `*.log`.
