# Changelog

Changes to this website. The skill's own changelog lives on the site's changelog pages.

## 1.4.0 — 2026-11-18

### Added
- Black Friday sale window, 23.11.2026 00:00 – 30.11.2026 23:59 Warsaw time, switched in the visitor's browser with no deploy: inside it the cards show the sale price, the crossed-out list price and the 30-day lowest-price line, the buy buttons open the Black Friday carts, and the paid pages' hero badge counts down. It replaces the presale deadline.
- Every card has its own Easytools checkout link per language, for the list price and for the Black Friday price (twelve in all), with `lang` and `page` still added.
- Failed free-skill signups say where they failed: `/api/subscribe` answers with the step (`grant`, `product_read`, `no_file`) and Easytools' HTTP status, and the `server_error` event carries both.
- `docs/checkout/cart-copy.md`: the cart text of every Easytools product, PL and EN.

### Changed
- New packages and list prices on both paid pages: Founder 449 zł / $149 (own business, 1 user), Solo Designer 749 zł / $229 (client work, 1 user), Studio 1249 zł / $379 (client work, up to 5 people). Agencja / Agency is gone. The section asks "for clients or for yourself?", the cards are grouped by use and show a value line under the price.
- Twelve months of updates everywhere the site states the update period.
- Structured data, share text, the comparison table and the FAQ carry the new names and list prices; no old price is left on live pages.
- Terms (PL and EN) describe two licences: Founder for the buyer's own business, Solo Designer and Studio for client work. In force from 2026-11-18; earlier purchases keep the terms they were bought under.
- The checkout-click event's plan values, the tracking plan and a ledger row follow the new package names.

## 1.3.1 — 2026-11-16

### Changed
- Astro 6.4.8 → 7.4.12, with `@astrojs/vercel` 11.0.22, `@astrojs/mdx` 8.1.6 and `@astrojs/sitemap` 3.7.5. This closes the open Astro security alerts (the critical image one among them) and, through the same install, the sharp, esbuild, glob and minimatch ones; `npm audit` reports 0 vulnerabilities. Built pages match the Astro 6 build: same pages, same visible text, byte-identical images.
- `astro.config.mjs` keeps Astro 6's whitespace handling (`compressHTML: true`), so spaces between inline words stay, and builds CSS for Vite's default browser range (`vite.build.cssTarget`), so Safari and iOS before 18 keep the blur behind the sticky header and the mobile bottom bar.
- `path-to-regexp` is pinned at 6.3.0 only inside Vercel's routing library; the site-wide version 8 pin broke the Astro 7 build.
- Builds run on Node 24 (`engines.node` 24.x), the version the tests run on; Vercel had been building on 26.x.
- Built files under `/_astro/` are now served with a one-year immutable cache header; the old adapter's rule never applied, so browsers revalidated them on every visit.
- The cookie banner's z-index is written as 2147480000 (the new CSS minifier rounds it); it still sits above the video popover and everything else on the site.
- The cookie check skips Vercel's preview toolbar when it runs against a preview deployment, and the tests declare `js-yaml`, which Astro 6 used to bring along.
- `AGENTS.md` and `design.md` name Astro 7.

### Removed
- The `vercel.json` header rule for the deleted staging address (`staging.agents.creativesparks.pl`), and its mention in `docs/testing.md`.

## 1.3.0 — 2026-11-15

### Added
- The free pages' hero badge shows how many times the free skills were downloaded: "200+ downloads of free skills for Claude Code, Codex, Cursor..." / "200+ pobrań darmowych skilli dla Claude Code, Codex, Cursor...". The paid page's "try for free" intro says the same ("downloaded 200+ times" / "pobrane już 200+ razy").
- The number is counted at every build from Easytools orders (`src/lib/free-skill-downloads.ts`): distinct person and skill pairs among completed orders of the free-skill products, own and test addresses left out, rounded down to 50. Visitors' browsers never ask for it.
- `/free-skill-downloads.json` publishes the shown number and where it came from (`easytools`, `live-site` or `minimum`), with no raw count. Without an Easytools answer the build reuses the live site's number, then 200; a build never fails over the count.
- Two change-ledger rows (free pages' badge, paid page's intro), judged on 2026-12-13.

### Changed
- `docs/testing.md`: a spec file runs only its own suite, and a shared test helper runs every suite whose specs import it; test files no longer fall under "everything".

## 1.2.0 — 2026-11-13

### Added
- New Umami events: a form reports when half of it is on screen (`Free skill form seen`), failed signups are counted with their reason (`Free skill submit error`), and clicks on the hero video (`Hero video`), the sample-output cards (`Sample output`) and the top-bar links (`Nav link`) are recorded, as is a visitor reaching the prices (`Pricing seen`, on the first price card) and the first interest action in a page load (`Interest shown`). No event carries what a visitor typed.
- A small shared script (`src/scripts/umami-attributes.ts`, loaded on every page) sends these events from attributes on the elements, so tracking a new element needs an attribute, a line in `docs/analytics/metrics.md` and a test, not code of its own.
- Meta's "view content" is also sent when the hero video is opened, only after marketing consent.
- `npm run report:meta-ads`: a read-only report of spend, link clicks, landing-page views and Meta leads per ad from Meta's reporting API, with a key that can only read the ad account.
- `docs/analytics/metrics.md` is now the tracking plan and the metric set: principles, metrics in layers with one main number per page, per-form signup funnels, the paid page as a path to purchase, phone and in-app splits, ad numbers with cost per site-counted signup, data-quality checks, how changes are judged, and a log of definition changes.

### Changed
- `Free skill form started` counts only a change made while the email field has focus, so a phone's autofill filling both forms no longer counts two starts. Form starts before 2026-11-13 can't be compared with later ones.
- Results are judged with a range and one label (clearly better, can't tell, clearly worse), with the detectable effect checked before shipping, instead of the "30 conversions" rule. The change ledger has columns for the detectable effect and for judgement changes.
- The `/cro-cycle` skill checks the data before reading it, reads funnels per form, the paid page as a path, phone and in-app splits, and a per-ad table that joins Meta's report to the site's own counts.

### Removed
- The "See the playbook" / "Zobacz instrukcję" link in the hero of both audit pages (live since 2026-11-12, logged in the ledger as a judgement change), and the unused Meta "view content" condition that went with it.

## 1.1.1 — 2026-11-12

### Added
- `docs/testing.md` says which test suites a change needs (a map from kind of change to suites), when an earlier passing run counts instead of a new one, the release checklist in order, how to run the suites, the rules for revising them, and what they do not check today.
- One npm command per suite: `npm run test:unit`, `test:consent`, `test:tracking`, `test:sections`, `test:a11y`, `test:cookies` and `test:cookies:prod`. Each runs through `scripts/test-run.mjs`, which saves a log in `scratch/test-runs/` recording the commit, whether there were uncommitted changes, and the exit code.

### Changed
- Unit tests, the cookie-list test, the cookie check and the Meta consent test run on desktop only, since nothing in them depends on screen size. Unit tests no longer run twice.
- The cookie check runs when `docs/testing.md` lists it for a change, instead of before and after every release.

### Removed
- The screenshot comparison of the retired `/ux-designer/` pages (`tests/vrt.spec.ts` and its reference images).

## 1.1.0 — 2026-11-11

### Added
- A self-hosted cookie banner (CookieConsent v3, bundled and served by the site) in Polish and English, styled with the design tokens. Accept all and Reject all carry equal weight; "Cookie settings" in the footer reopens it. Choices could not be carried over from Cookiebot, so every visitor is asked once again.
- A record of every first consent choice and every change (`/api/consent`), in its own Neon database: consent ID, time, banner revision, language, accepted and refused categories — no IP address or browser data. Kept two years.
- One cookie list in `src/content/consent/{pl,en}.yaml` that feeds the banner's settings window and the cookie tables in both privacy policies.
- An automated cookie check (`tests/consent/cookie-check.spec.ts`) that opens every page and example file in six consent states and fails on any stored key or outside host missing from the cookie list or outside its category. It replaces Cookiebot's scanner.

### Changed
- Cookiebot removed. Meta Pixel and PostHog load only through the new banner's statistics and marketing choices.
- The Meta Conversions API route sends nothing to Meta unless the visitor's banner cookie holds marketing consent.
- Wistia videos play for everyone in privacy mode; viewing statistics, Mux Data included, are sent only with statistics consent. Withdrawing a category reloads the page and clears what that category stored.
- Every page has one address ending in a slash; the address without it redirects permanently.
- Both privacy policies list every cookie and outside service by category, the consent record and its two-year retention, and Wistia.
- The wireframe examples' menu links and deliverable links open the real pages and files.

### Fixed
- Meta PageView and ViewContent fire again after a visitor accepts marketing cookies; under Cookiebot they had stopped firing (the listener waited on the wrong object).

## 1.0.0 — 2026-11-10

### Added
- Visit recordings and heatmaps with PostHog (EU) on the six landing pages, loaded only after statistics-cookie consent and after the page has loaded. Typed form fields are masked.
- Funnel tracking in Umami: a "form started" event on the free-skill forms; skill, language, surface and page on signups; language and page on checkout clicks; paid purchases recorded server-side from the Easytools webhook (`/api/easytools-webhook`).
- Agent access to the analytics: read-only Umami and PostHog connectors in `.mcp.json`.
- `docs/analytics/metrics.md` (metric definitions and the question list) and `docs/analytics/ledger.md` (log of shipped changes and their check dates).
- The `/cro-cycle` skill: an on-demand improvement cycle that reads both funnels and the recording notes, and proposes ranked, evidence-backed ideas.
- A "Cookie settings" link in the footer that reopens the consent banner.

### Changed
- Both privacy policies name PostHog and Umami, with legal bases, retention periods, the right to object and how to withdraw cookie consent.
- Checkout links carry the landing page as a `page` parameter next to `lang`.

## 0.1.0 — 2026-11-06

### Added
- Testimonials section on the UX Design Skill, free audit and free planning pages, in Polish and English.
- Free website planning skill page in both languages, at `/free-website-planning-skill/`.
- "Try it for free" section on the main pages, offering both free skills.
- Menus on the free skill pages, and rating stars in the main page hero.

### Changed
- Free skill signups now grant the product through Easytools and hand back a download link. MailerLite is gone from the signup, and the privacy policies name Easytools.
- The free audit follows the homepage-only rules at `/free-homepage-ux-audit-skill/`. The old addresses redirect there.
- New demo videos, one per language, across the site.
- The site's changelog now mirrors the public changelog files, up to v4.5.
- The install guide follows the new package layout.
- The site names the skill's main file `SKILL.md`, and the package list and file tree match the v4.5 download: 110 files, Markdown and HTML output.

### Removed
- Community Discord from the packages and the live terms.
- Expired pre-sale wording.
