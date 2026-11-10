# Change ledger — agents.creativesparks.pl

One row per site change shipped through an improvement cycle (`/cro-cycle`). Each cycle reads this file first and reports every row whose end date has passed. Metric names come from `docs/analytics/metrics.md`; nothing else counts as a result.

- **Hypothesis** — one sentence: "If we …, then … because …".
- **Change** — what shipped, on which page(s), with the commit or pull request.
- **Ship date** — the day it reached production (YYYY-MM-DD, Europe/Warsaw).
- **Primary metric** — the number expected to move, with page and language, e.g. `signup_rate`, `/en/free-website-planning-skill/`.
- **Guardrail metric** — the number that must not get worse, named the same way.
- **End date** — set before shipping. The after window runs from the ship date to the end date; the before window is the same length, just before the ship date.
- **Result** — raw counts and denominators, before → after, e.g. `signups 4 ÷ 310 → 7 ÷ 298`. Under 30 conversions in either window, mark it "directional".
- **Decision** — keep, revert, or extend to a new end date. The owner decides.

Also add an annotation for the ship date in Umami's own interface, so the date shows on its charts (the agent's connector can only read).

| Hypothesis | Change | Ship date | Primary metric | Guardrail metric | End date | Result | Decision |
|---|---|---|---|---|---|---|---|
