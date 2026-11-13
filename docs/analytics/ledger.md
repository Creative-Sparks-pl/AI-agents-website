# Change ledger — agents.creativesparks.pl

One row per site change shipped through an improvement cycle (`/cro-cycle`). Each cycle reads this file first and reports every row whose end date has passed. Metric names come from `docs/analytics/metrics.md`; nothing else counts as a result.

- **Hypothesis** — one sentence: "If we …, then … because …".
- **Change** — what shipped, on which page(s), with the commit or pull request.
- **Ship date** — the day it reached production (YYYY-MM-DD, Europe/Warsaw).
- **Primary metric** — the number expected to move, with page and language, e.g. `signup_rate`, `/en/free-website-planning-skill/`.
- **Guardrail metric** — the number that must not get worse, named the same way.
- **End date** — set before shipping. The after window runs from the ship date to the end date; the before window is the same length, just before the ship date.
- **Detectable effect** — filled before shipping: the smallest difference in the primary metric that one window can reliably show, worked out from the before window with ground rule 4 of `docs/analytics/metrics.md`, e.g. `±2.6 points (p = 4 ÷ 310)`.
- **Judgement change** — "yes" when a clear answer for the effect the change can plausibly have would need more than about 8 weeks per window (point 2 of "How we judge changes" in `metrics.md`), with the reason; otherwise "no". A judgement change is never described as a test.
- **Result** — read once, at the end date, for the primary and the guardrail metric: raw counts and denominators before → after, the difference with its 95% range, and one label (clearly better, can't tell, clearly worse), all as ground rule 4 sets out, e.g. `signups 4 ÷ 310 (1.3%) → 7 ÷ 298 (2.3%), +1.1 points, range −1.2 to +3.4: can't tell, few conversions`.
- **Decision** — keep, revert, or extend to a new end date. The owner decides.

Also add an annotation for the ship date in Umami, so the date shows on its charts: in Umami's own interface, or through its API (a POST to `/api/websites/<website id>/annotations` with the `UMAMI_API_TOKEN` key from `.env.local` as a Bearer token, never printed), since the agent's connector can only read.

| Hypothesis | Change | Ship date | Primary metric | Guardrail metric | End date | Detectable effect | Judgement change | Result | Decision |
|---|---|---|---|---|---|---|---|---|---|
| If we remove the hero's playbook link from the audit pages, then more visitors reach the form and sign up, because the link led them away (15 clicks, no signups afterwards). | Removed the hero's "See the playbook" / "Zobacz instrukcję" link from `/en/free-homepage-ux-audit-skill/` and `/free-homepage-ux-audit-skill/` (0e051fc). | 2026-11-12 | `signup_rate`, `/en/free-homepage-ux-audit-skill/` | `cross_sell_clicks`, `/en/free-homepage-ux-audit-skill/` | 2026-12-10 | ±18 points (p = 11 ÷ 69, 15.9%): only a rise to about 34% shows clearly. The page went live on 2026-11-10, so its before window holds only its first two days. | Yes: shipped on judgement; the effect is too small to detect at current traffic. | | |
