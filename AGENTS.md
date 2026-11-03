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
