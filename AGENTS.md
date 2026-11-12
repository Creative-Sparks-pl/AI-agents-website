# AGENTS.md - Project Constitution

## Project Identity

**Project:** WEB-Agents-website
**Purpose:** Astro 6 + Tailwind marketing site for Creative Sparks AI skills (agents.creativesparks.pl), PL + EN, deployed on Vercel.

## Agent Rules

Rules are scoped by activity in `~/.claude/skills/wm/rules/`:
- `discovery-rules.md` — decision-making, evaluating options
- `execution-rules.md` — delegation, context management, structural navigation
- `editing-rules.md` — change discipline, verification, simplicity
- `review-rules.md` — critical evaluation, self-challenge
- `communication-rules.md` — the global communication rules (authoritative)

---

## Project Structure

- `src/pages/` — routes (PL at root, EN under `en/`; `archive/` holds retired pages)
- `src/components/sections/` — props-driven page sections; `src/components/ui/` — shared primitives
- `src/content/` — content collections, one file per locale
- `src/layouts/` — BaseLayout, PreviewLayout (design-system showcase)
- `public/` — static assets and example HTML outputs
- `tests/` — the Playwright tests; `docs/testing.md` says which run when
- `design.md` — design system reference
- `projects/` — WM project records (gitignored)

## Infrastructure

Where things live, so nobody has to ask again. No secrets here — secret values sit in `.env.local` (gitignored) and in Vercel's environment settings.

- **Site** — Vercel project for `agents.creativesparks.pl`. Pushing `master` deploys production, so work happens on branches.
- **Tests** — Playwright, run locally, no CI. `docs/testing.md` sets which suites run for a change (in verify and release too) and when an earlier pass still counts. One npm command per suite (`npm run test:unit` etc.); each saves a log in `scratch/test-runs/`.
- **Umami (visitor counts)** — `https://analytics.creativesparks.pl`, self-hosted, v3.4.1 since 2026-11-10.
  - Code: GitHub fork `Creative-Sparks-pl/umami`, no custom commits. Update with `gh repo sync Creative-Sparks-pl/umami`, then add an empty commit authored by the owner's account — Vercel's free plan refuses to deploy commits whose author is not on the Vercel team (the synced commits are authored by Umami's maintainers).
  - Hosting: its own Vercel project; environment includes `MCP_ENABLED=1`.
  - Database: Neon Postgres (Frankfurt). Before any Umami update, create a Neon backup branch from `production` (e.g. `before-umami-3.4`) with auto-delete of a week or more.
  - Retention: the privacy policies promise visit statistics are kept up to 2 years. Umami deletes nothing by itself, so once a year delete data older than 2 years in the Neon database. The same yearly clean-up covers the consent records (below).
  - Website ID `37a76f9d-7246-4d45-b832-3b35e78eee08`; the tracking script is in `src/layouts/BaseLayout.astro`.
- **Agent access to analytics** — `.mcp.json` at the repo root.
  - `umami`: Umami's official read-only connector (`@umami/mcp`), run locally through `dotenv-cli`, which loads `UMAMI_API_TOKEN` (an `umami_` API key from Umami → Settings → API keys) from `.env.local`.
  - `posthog`: PostHog's remote connector in read-only mode, signed in through OAuth.
  - The `/cro-cycle` skill (`.claude/skills/cro-cycle/`) runs an improvement cycle on these connectors; it uses only the definitions in `docs/analytics/metrics.md` and logs shipped changes in `docs/analytics/ledger.md`.
- **Agent access to the owner's browser** — Claude in Chrome (browser extension, tools `mcp__claude-in-chrome__*`), working in the owner's own Chrome with their sign-ins. Verified 2026-11-11.
  - Connect: *Enabled by default* is on (set in `/chrome`), so every session connects as it starts. If the tools are missing, ask the owner to type `@browser` or run `/chrome` → *Reconnect extension*; don't work around it.
  - Use it for what no connector reaches: dashboards the owner is signed into (e.g. Meta Events Manager), and checking the live or local site in a real browser (clicks, console, network requests).
  - Meta Events Manager: business Fuse Collective → dataset "Creative Sparks Pixel" (`482025232476807`) → Test events. Opening a site URL with `?test_event_code=<code shown there>` makes its server-side events appear on that page (after marketing consent).
  - Work in new tabs and close them when done. Look, don't change: no settings, publishing, deleting or payments unless the owner asks.
- **PostHog (recordings and heatmaps)** — Cloud EU project (`eu.posthog.com`), live since 2026-11-10 (site v1.0.0): the six landing pages only, loaded after statistics consent; inputs masked, recordings kept 30 days, IPs discarded.
- **Consent (cookie banner)** — CookieConsent v3 (`vanilla-cookieconsent`, MIT), bundled and served by the site, no outside consent service. Pinned to an exact version in `package.json`; an update needs the consent tests to pass again.
  - Banner text and the one cookie list (every stored key and every outside host, per service and category) live in `src/content/consent/{pl,en}.yaml`. The same list feeds the banner's settings window and the cookie tables in both privacy policies.
  - Configuration: `src/lib/consent-config.ts` (including `CONSENT_REVISION`); browser side: `src/scripts/consent.ts`; theme: `src/styles/cookieconsent-theme.css`. A script runs only after consent when tagged `type="text/plain" data-category="statistics|marketing"`.
  - Adding a tracker: tag its script, add it to both content files, and raise `CONSENT_REVISION` so every visitor is asked again (the policies promise this).
  - Wistia follows the statistics choice through its own API, set at the top of `<head>` in `src/layouts/BaseLayout.astro`: without it, privacy mode, `doNotTrack` (anonymous play statistics) and `wistiaDisableMux` (Mux Data playback reports for 1 play in 10).
  - Cookie check — run when `docs/testing.md` lists it, locally (`npm run test:cookies`) and against production (`npm run test:cookies:prod`). It opens every page and example file in six consent states and fails on any key or host missing from the cookie list or outside its category. It sends no data: visits, events and consent records are blocked in the browser.
- **Consent records** — Neon project `cs-consent-records` (Frankfurt), separate from Umami's database. Connection string `CONSENT_DATABASE_URL` in `.env.local` and in Vercel (Production and Preview). Schema: `docs/consent/consent-records.sql`; written only by `src/pages/api/consent.ts`, one row per first choice and per change, no IP address or browser data.
  - Before any schema change, create a Neon backup branch from `production`, as for Umami.
  - Retention: the privacy policies promise two years. In the yearly clean-up, run in the Neon SQL editor of this project: `DELETE FROM consent_records WHERE recorded_at < now() - interval '2 years';`
- **Checkout** — Easytools at `cart.creativesparks.pl`. Paid-purchase webhooks go to `/api/easytools-webhook?token=…`, where the token is `EASYTOOLS_WEBHOOK_TOKEN` in Vercel. Free skills are granted through `src/pages/api/subscribe.ts`.
- **Ads** — Meta Pixel + Conversions API, loaded only after marketing consent; `src/pages/api/meta-capi.ts` sends nothing to Meta unless the request's banner cookie holds marketing consent.
