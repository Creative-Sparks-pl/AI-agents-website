---
name: cro-cycle
description: Run one conversion-improvement cycle for the landing pages of agents.creativesparks.pl. Reports due results from the change ledger, reads both funnels from Umami per page and language, reads PostHog recording notes and a UX audit for the page that loses the most visitors, and proposes one to three ranked, evidence-backed ideas. Builds only the idea the user picks, as a change the user approves.
disable-model-invocation: true
argument-hint: "[landing page path, optional — default: all six]"
---

# CRO cycle

One cycle: check what earlier changes did, find where visitors drop, find out why, propose ideas, build the one the user picks, log it. The user started this cycle on purpose; there are no scheduled runs.

Focus: `$ARGUMENTS` if a landing-page path is given, otherwise all six landing pages.

## Sources

- `docs/analytics/metrics.md` — the only definitions you may use: events, metrics, connector calls, ground rules, known limits, test data to exclude, the question list. Read it in full first, every run.
- `docs/analytics/ledger.md` — every shipped change with its hypothesis, metrics and end date.
- Umami connector (`umami` MCP server, read-only) — all counts. Website ID `37a76f9d-7246-4d45-b832-3b35e78eee08`.
- PostHog connector (`posthog` MCP server, read-only, one `exec` tool) — recordings, recording notes, heatmaps. Before the first PostHog call in a session, follow the server's own instructions (load matching skills with `learn`, run `info` before every `call`).
- The `ux-audit` skill (installed globally) — a review of the page itself.

## Standing rules

1. **Only defined numbers.** Use the definitions in `metrics.md` and nothing else. For anything they don't cover, answer "can't answer from the defined metrics" and name what tracking would be needed.
2. **Raw counts and denominators, always.** Write every rate as `count ÷ denominator (percent)`. Fewer than 30 conversions in either window means directional only. Never declare a winner or a loser from small numbers.
3. **No invented data.** If a call fails, say "call failed" and which one. If a metric starts at the tracking release and the window starts earlier, say "no data yet", never zero.
4. **Read-only connectors.** Never create, change or delete anything in Umami or PostHog — no annotations, insights, dashboards, scanners, flags, experiments, surveys. When a step needs something written there (an annotation, a recording summary), ask the user to do it in that tool's UI.
5. **Nothing goes live without approval.** Pushing `master` deploys production. Build every change on its own branch, show the diff and the checks, and wait for the user's go-ahead before merging or deploying.
6. **One change per cycle**, so its effect can be judged on its own.
7. **Meta Pixel data is out of scope.** Don't read or report it.
8. **Context before conclusions.** Before reading a jump or a drop as an effect, check Umami annotations for the window (`get_annotations`, e.g. a promo email or an ad campaign) and the traffic mix (`metrics.md` question 9). Annotations are context to cite, not a metric.

## Steps

### 1. Set up

- Read `metrics.md` and `ledger.md`. Note the tracking release date in `metrics.md`; if it's empty or still says "not shipped yet", ask the user whether the tracking has shipped and when. Until it has, every "after release" metric reads "no data yet".
- Windows: current = the last 14 full days in Europe/Warsaw; previous = the 14 days before that. Follow the date rule in `metrics.md` for clock changes and for PostHog's UTC times.
- Check both connectors answer (Umami `list_websites`; PostHog `project-get`). If one fails, say so, continue with the other, and mark what's missing. A PostHog project that answers but shows `ingested_event: false`, or no `$pageview` in the window, has no data: mark every PostHog part "no data yet".

### 2. Report due results

For every ledger row whose end date has passed and whose result is empty:
- Compute its primary and guardrail metrics for the before window (same length as the after window, ending the day before the ship date) and the after window (ship date to end date).
- Show raw counts, denominators and rates for both windows.
- Propose a result (moved / didn't move / directional only) and a decision (keep / revert / run longer). Write them into the ledger only after the user agrees.

If no row is due, say "no results due" and list the next end date, if any.

### 3. Read both funnels

Per landing page and language, current window against previous, following `metrics.md` exactly (hostname filter, path normalisation, test-data exclusions):
- Free funnel: `lp_views` → `form_starts` → `signups`, with `form_start_rate`, `form_completion_rate`, `signup_rate`.
- Paid funnel (paid page only): `lp_views` → `checkout_clicks` → `purchases`, with `checkout_click_rate`, `purchase_per_click`, `purchase_rate`; purchases by language.

Show one table per funnel: page, language, each step's raw count for both windows, each rate as `count ÷ denominator (percent)`. Put "no data yet" where a metric has no history in the window.

### 4. Find the step that loses the most visitors

- Pick the page, language and step with the largest absolute loss (e.g. views that never start a form, clicks with no purchase). State the numbers behind the pick.
- If every count is under 30 conversions, say the pick is directional and still name the largest loss.
- If a step's input count is "no data yet" (before the tracking release there are no form starts or purchases), name the wider span you can measure (e.g. view → signup) and say which step inside it can't be separated yet.
- Rule out context first (rule 8): annotations, traffic source shifts, a change in the page mix.

### 5. Find out why, for that page

- **Recordings (PostHog).** List recordings on that page in the window with `query-session-recordings-list`, using the UTC times that cover the window and the property filter `{"type":"recording","key":"visited_page","operator":"icontains","value":"<page path>"}`. That filter also matches the `/en/` page and subpages, so separate the languages afterwards (or use a `regex` operator). For each recording, read its existing AI notes with `vision-observations-list` and that recording's `session_id`, or find notes across recordings with `vision-observations-search`. If there are none, say so and give the user two or three recording links to watch or to summarise with the Summarize button in PostHog — don't generate summaries yourself. When the leak is about clicks or scrolling, read heatmaps with `heatmaps-list`, giving the full page URL as `url_exact` (or a full-URL regex as `url_pattern`). Recordings cover only visitors who accepted statistics cookies, so treat them as examples, never as counts.
- **UX audit.** Run the `ux-audit` skill on the live page URL, focused on the section where the leak happens (e.g. the hero form, the pricing section).

### 6. Propose ideas

Rank one to three ideas. For each:
- **Change:** what exactly changes, and in which section or file.
- **Evidence:** counts with denominators, recording notes with links, audit findings.
- **Hypothesis:** "If we …, then … rises, because …".
- **Metrics:** one primary and one guardrail metric, both from `metrics.md`.
- **End date:** when to judge it — long enough to reach about 30 conversions at the current volume, at least 14 and at most 28 days after shipping. Show the estimate. If 28 days can't reach about 30 conversions, set 28 days and mark the result directional from the start.
- **Size:** small (copy, a label, an order) or bigger (layout, a whole section, the form flow, pricing).
- **What would prove it wrong:** the observation that would reject the explanation.

If the evidence is too thin for any idea, say "not enough data" and name what to wait for.

### 7. The user picks one

- For a bigger change, ask the user to watch the two or three recordings behind it first, and give the links, before building anything.
- Build it on a new branch from `master`, following the repo's `AGENTS.md` and `design.md`. Run the relevant tests and `npm run build`, show the diff, and wait for approval (rule 5).

### 8. Log it

Once the user confirms the ship date, add a ledger row: hypothesis, change (with the commit), ship date, primary metric, guardrail metric, end date. Leave result and decision empty. Ask the user to add a Umami annotation for the ship date, since the connector can't write one.

## Report shape

Lead with three lines: results due, the leak found, the top idea. Then the funnel tables, the evidence, and the ranked ideas. Keep every number traceable to a `metrics.md` definition.
