# Changelog

Changes to this website. The skill's own changelog lives on the site's changelog pages.

## 1.7.0 — 2026-11-22

### Added
- The free sign-up re-subscribes a contact who had opted out of all email: a sign-up is fresh consent to email, and until now such a person was granted the skill and never got the install email. It happens only after a genuinely new grant, and after the form has answered, so the form neither waits for Easymail nor fails with it. A holder who submits again and a suppressed contact (undeliverable after bounces or complaints) are left untouched; no contact is created and no list is changed.
- Both privacy policies (dated 2026-11-22) gain a purpose line: license service events (whether and when the skill was downloaded, installed and started) time and tailor the product emails, on the same bases as those emails (GDPR article 6(1)(a) and (b)). From the same events I count how many users of a free skill later buy a paid package, on my legitimate interest in knowing how the offer works (GDPR article 6(1)(f)).

### Changed
- The policies' Easytools recipient entry adds that the stage reached with a skill (downloaded, installed, started) is kept with the contact in Easymail, so that the product emails can be timed.
- `EASYMAIL_API_KEY` is now needed in the Vercel project: the re-subscribe uses it (set for Preview and Production on 2026-11-22). Without it the sign-up still grants and skips the re-subscribe. `AGENTS.md` names both places.
- `@vercel/functions` is declared as a dependency (the Vercel adapter already installed it): it keeps the re-subscribe running after the form's answer.
- `docs/analytics/metrics.md` points to the license service report for the free-skill numbers past the sign-up (such as links sent, downloaded, installed, started and bought paid).

## 1.6.3 — 2026-11-21

### Changed
- The FAQ data answers on the planning page and the paid page no longer end with the sentence about feedback going to a public GitHub forum: it does not answer what happens to the project data.

## 1.6.2 — 2026-11-21

### Changed
- The free pages' FAQ answers a user's questions: "Jak długo mogę używać skilla?" / "How long can I use the skill?" (no time limit; new versions for the first 60 days, then it keeps working on its version), and the data answers say the conversation falls under the user's own tool's privacy policy and that the start check sends only customer ID, package and version. The planning page's data answer no longer says only feedback reaches us, and its cost answer adds that the skill runs on the user's own plan.
- The paid FAQ gets the same data question (plus the page-reading service the audit uses), and "Co konkretnie kupuję?" / "What exactly am I buying?" says the copy checks its license at start and stops only after a refund or a blocked link, instead of promising no server login. A leftover sentence about a pre-purchase preview is gone from the install answer.

## 1.6.1 — 2026-11-21

### Changed
- Polish Black Friday price for Solo Designer: 649 zł instead of 599 zł (list price 749 zł), on the pricing card and in Easytools. The new price is a new Easytools variant ("Solo Designer — Black Friday", same window 23.11–1.12, crossed-out 749 zł), so the card's Black Friday link is new; the 599 zł variant is archived. Founder (359 zł) and Studio (999 zł) are unchanged.
- The Polish top-bar sale button reads "Black Friday do −20%", since Solo Designer is no longer 20% off. The English button is unchanged.

## 1.6.0 — 2026-11-20

### Added
- Release-notes pages for the two free skills, in Polish and English: `/free-homepage-ux-audit-skill/changelog/`, `/free-website-planning-skill/changelog/` and their `/en/` twins. Each lists only its skill's versions, newest first, with the skill's name above the heading, and uses its landing page's top bar (same links, no buy button, not sticky).
- Entries copied word for word from the public notes in Markdown-Agents: Homepage UX Audit v1.0 and v1.1; Website Planning v1.0, v1.1 and v1.2; UX Design Skill v4.7, with the same text as Website Planning v1.2 ("Wytyczne treści jako brief do pisania" / "Content guidelines as a writing brief").
- The free landing pages link to their own release notes from the footer's "Changelog" and from the "under the hood" section ("Historia zmian i aktualizacji" / "Changelog and updates"). Every other page's footer still links to the paid changelog.

### Changed
- Changelog entries sit in one folder per product, `src/content/changelog/{product}/{pl,en}/`. The paid skill's entries moved unchanged, and its pages show the same entries as before.
- The changelog heading is each changelog page's main heading (h1), with the entry titles as h2, with no visible change. The six changelog pages join the accessibility scan.
- The sign-up form and changelog tests check behaviour and the names a text must carry, not exact wording, so a copy edit does not break them.
- The testing page: WM finds it through `.wm/settings.json`; it names the keys and logins the site reads (names and places only) and lists the failures that got past the tests.

## 1.5.3 — 2026-11-19

### Changed
- After a free sign-up, under "Gotowe. Sprawdź skrzynkę." / "Done. Check your inbox.", the form now says only that a free skill is sent once per address: "Ten darmowy skill odbierasz raz na adres email. Masz go już? Link jest w pierwszym mailu." / "You can claim this free skill once per email address. Have it already? Your link is in the first email." It reads the same for everyone, so it reveals nobody's holdings.
- The note under the email field is back to "Wyślemy Ci mailem osobisty link do instalacji." / "We'll email you a personal install link." (1.5.2's addition moved to the message after sign-up).

## 1.5.2 — 2026-11-19

### Changed
- The note under every free form's email field also tells repeat sign-ups where their link is: "Wyślemy Ci mailem osobisty link do instalacji. Masz już ten skill? Link jest w pierwszym mailu." / "We'll email you a personal install link. Have it already? Your link is in the first email." It reads the same for everyone, so it reveals nobody's holdings.

## 1.5.1 — 2026-11-19

### Changed
- One free skill per person: before granting, `/api/subscribe` asks Easytools whether the address already holds that free skill, in either language, and does not grant it again. No second order and no second store email. The form answers a holder exactly as it answers a new sign-up, so it never shows who holds a skill. If the check fails, the sign-up grants as before.

## 1.5.0 — 2026-11-19

### Added
- The v4.6 changelog pages, PL and EN: personal link and automatic updates.
- Every free form says, under the email field, that the personal install link comes by email ("Wyślemy Ci mailem osobisty link do instalacji." / "We'll email you a personal install link.").
- `docs/emails/`: the twelve install-link emails, one per list, in the approved Easymail template.

### Changed
- The free sign-up no longer hands out a download: `/api/subscribe` grants the free skill and answers without reading the product's file. The form shows one message for everyone: the personal install link arrives by email from tomasz@creativesparks.pl (check Spam or Promotions), and its link and sentence go into Claude Code, Codex or Cursor. Success, the submit event and the Meta Lead fire only on a real grant.
- Gmail addresses count once: `gmail.com` and `googlemail.com` sign-ups drop a `+` tag and become one address; dots and other providers stay as typed.
- Free-page buttons say to get the skill, with a mail icon; intros, final calls to action, the planning page's install step and the install FAQ say the link arrives by email.
- The sales and free pages describe the personal-link install in Claude Code, Codex or Cursor: install section, install FAQ, platform section, and the setup-time and cross-model comparison rows. No folder download, browser chats, Custom GPTs or Gemini Gems.
- Both how-to guides install from the email's personal link, say updates install themselves and start the skill by its command; the feedback section names Claude Code, Codex and Cursor only.
- Terms (PL and EN) describe UX Designer 4.6's personal-link setup: coding tools only, a personal install link, license and update checks with auto-update, page capture for Solo Designer and Studio with a daily limit, licence limits, processors, and the 60-day switch for earlier buyers. In force from 2026-11-19; earlier purchases keep the terms they were bought under.
- Both privacy policies add the license service's data: what is collected, why, by whom and for how long.
- `Free skill submit error` labels `stage` as `grant` or `none` only; `docs/analytics/metrics.md` logs the change under "Definition changes".
- Every Easytools cart links the skill's own terms and privacy policy in its language (`docs/checkout/cart-copy.md`).
- The icon font includes `content_paste`, `data_object` and `edit_square`, which the install and platform sections use.

### Removed
- The download button and the auto-started download after a free sign-up, and the `product_read` and `no_file` error stages that came with the file read.

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
