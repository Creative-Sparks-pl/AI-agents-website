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
- `tests/` — Playwright visual regression tests
- `design.md` — design system reference
- `projects/` — WM project records (gitignored)

## Infrastructure

Where things live, so nobody has to ask again. No secrets here — secret values sit in `.env.local` (gitignored) and in Vercel's environment settings.

- **Site** — Vercel project for `agents.creativesparks.pl`. Pushing `master` deploys production, so work happens on branches.
- **Umami (visitor counts)** — `https://analytics.creativesparks.pl`, self-hosted, v3.4.1 since 2026-11-10.
  - Code: GitHub fork `Creative-Sparks-pl/umami`, no custom commits. Update with `gh repo sync Creative-Sparks-pl/umami`, then add an empty commit authored by the owner's account — Vercel's free plan refuses to deploy commits whose author is not on the Vercel team (the synced commits are authored by Umami's maintainers).
  - Hosting: its own Vercel project; environment includes `MCP_ENABLED=1`.
  - Database: Neon Postgres (Frankfurt). Before any Umami update, create a Neon backup branch from `production` (e.g. `before-umami-3.4`) with auto-delete of a week or more.
  - Retention: the privacy policies promise visit statistics are kept up to 2 years. Umami deletes nothing by itself, so once a year delete data older than 2 years in the Neon database.
  - Website ID `37a76f9d-7246-4d45-b832-3b35e78eee08`; the tracking script is in `src/layouts/BaseLayout.astro`.
- **Agent access to analytics** — `.mcp.json` at the repo root.
  - `umami`: Umami's official read-only connector (`@umami/mcp`), run locally through `dotenv-cli`, which loads `UMAMI_API_TOKEN` (an `umami_` API key from Umami → Settings → API keys) from `.env.local`.
  - `posthog`: PostHog's remote connector in read-only mode, signed in through OAuth.
  - The `/cro-cycle` skill (`.claude/skills/cro-cycle/`) runs an improvement cycle on these connectors; it uses only the definitions in `docs/analytics/metrics.md` and logs shipped changes in `docs/analytics/ledger.md`.
- **PostHog (recordings and heatmaps)** — Cloud EU project (`eu.posthog.com`), live since 2026-11-10 (site v1.0.0): the six landing pages only, loaded after Cookiebot statistics consent; inputs masked, recordings kept 30 days, IPs discarded.
- **Consent** — Cookiebot; its ID is in `src/layouts/BaseLayout.astro`.
- **Checkout** — Easytools at `cart.creativesparks.pl`. Paid-purchase webhooks go to `/api/easytools-webhook?token=…`, where the token is `EASYTOOLS_WEBHOOK_TOKEN` in Vercel. Free skills are granted through `src/pages/api/subscribe.ts`.
- **Ads** — Meta Pixel + Conversions API, loaded only after Cookiebot marketing consent.
