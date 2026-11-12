---
name: cro-cycle
description: Run one conversion-improvement cycle for the landing pages of agents.creativesparks.pl. Checks the data first, reports due results from the change ledger as a range with a label, reads both funnels from Umami per page and language (the free one per form, the paid one as a path, both split by phone and in-app browser), reports the ads per ad set and ad with cost per site-counted signup from Meta's read-only report, reads PostHog recording notes and heatmaps for the page that loses the most visitors, and proposes one to three ranked, evidence-backed ideas. Builds only the idea the user picks, as a change the user approves.
disable-model-invocation: true
argument-hint: "[landing page path, optional — default: all six]"
---

# CRO cycle

One cycle: check the data, check what earlier changes did, read the funnels and the ads, find where visitors drop, find out why, propose ideas, build the one the user picks, log it. The user started this cycle on purpose; there are no scheduled runs.

Focus: `$ARGUMENTS` if a landing-page path is given, otherwise all six landing pages.

## Sources

- `docs/analytics/metrics.md` — the only definitions you may use: events, metrics, connector calls, ground rules, how changes are judged, the data-quality checks, definition changes, known limits, test data to exclude, the question list. Read it in full first, every run.
- `docs/analytics/ledger.md` — every shipped change with its hypothesis, metrics, end date and detectable effect.
- Umami connector (`umami` MCP server, read-only) — all counts. Website ID `37a76f9d-7246-4d45-b832-3b35e78eee08`.
- PostHog connector (`posthog` MCP server, read-only, one `exec` tool) — recordings, recording notes, heatmaps. Before the first PostHog call in a session, follow the server's own instructions (load matching skills with `learn`, run `info` before every `call`).
- Meta's ad report (`npm run report:meta-ads`, read-only, `metrics.md` ground rule 10) — spend, link clicks, landing-page views and Meta leads per ad. Its key sits in `.env.local`; never print it.
- The cycle does not run the `ux-audit` skill: the evidence is Umami counts plus PostHog recording notes and heatmaps.

## Standing rules

1. **Only defined numbers.** Use the definitions in `metrics.md` and nothing else. For anything they don't cover, answer "can't answer from the defined metrics" and name what tracking would be needed.
2. **Raw counts, a range and one label.** Write every rate as `count ÷ denominator (percent)`. Compare two rates only with the range-and-label rule (`metrics.md` ground rule 4): the difference, its 95% range and one label — clearly better, can't tell, clearly worse. Never call a change a win or a loss without a "clearly" label; "can't tell" never means "no effect". Fewer than 30 conversions in either window only adds "few conversions" to the label.
3. **No invented data.** If a call fails, say "call failed" and which one. If a metric starts at the tracking release and the window starts earlier, say "no data yet", never zero.
4. **Read-only connectors.** Never create, change or delete anything in Umami or PostHog through the connectors — no annotations, insights, dashboards, scanners, flags, experiments, surveys. The one write is the ship-date annotation, sent through Umami's API in step 10 once the user has confirmed the change and its ship date. For anything else that needs writing there (a recording summary), ask the user to do it in that tool's UI.
5. **Nothing goes live without approval.** Pushing `master` deploys production. Build every change on its own branch, show the diff and the checks, and wait for the user's go-ahead before merging or deploying.
6. **One change per cycle**, so its effect can be judged on its own.
7. **From Meta, only spend, clicks and views — its conversions only beside the site's.** Ads Manager's spend, link clicks and landing-page views per ad, from the read-only report (`metrics.md` ground rule 10), are in scope. Meta-attributed conversions (the report's Meta leads) are shown only as a comparison beside the site's counts, never in place of them or added to them. Nothing else from Meta is read or reported.
8. **Context before conclusions.** Before reading a jump or a drop as an effect, check Umami annotations for the window (`get_annotations`, e.g. a promo email or an ad campaign) and the traffic mix (`metrics.md` question 9). Annotations are context to cite, not a metric.

## Steps

### 1. Set up

- Read `metrics.md` and `ledger.md`. Note the release dates at the top of `metrics.md` (the tracking release and tracking release v1.2.0). If one is empty or still says "not shipped yet", ask the user whether it has shipped and when. Until it has, every metric that starts at that release reads "no data yet".
- Windows, in full Europe/Warsaw days (follow `metrics.md` ground rule 3 for clock changes and for PostHog's UTC times):
  - **28 days against 28 by default:** current = the last 28 full days, previous = the 28 before, when the pages, the offer and the traffic mix stayed stable across both: no landing page went live, no change shipped (ledger), no campaign started or stopped (annotations), no large shift in `traffic_mix` (`metrics.md` question 9).
  - **14 days against 14 to spot a change:** use the last 14 full days and the 14 before when something changed inside those 56 days, or to see a recent change sooner. Say which pair you used and why.
  - **Like with like.** Compare ad days with ad days. If ads ran in one window and not the other, or a campaign started or stopped inside one, say so beside every comparison it touches, and don't read that difference as an effect.
  - **Notes inside the windows.** List the Umami annotations in both windows (`get_annotations`: campaign launches and stops, email sends, ship dates) and cite them where they explain a number.
  - **Definition changes.** Read the "Definition changes" log in `metrics.md` and name every entry dated inside or between the windows, with the comparisons it breaks. Never compare those metrics across its date: move both windows to one side of it, or show only the current window for them, marked "not comparable: definition change of <date>". An entry dated "tracking release v1.2.0" takes that release's date once it has one.
- Check both connectors answer (Umami `list_websites`; PostHog `project-get`). If one fails, say so, continue with the other, and mark what's missing. A PostHog project that answers but shows `ingested_event: false`, or no `$pageview` in the window, has no data: mark every PostHog part "no data yet".

### 2. Check the data

Before reading any other number, run the four checks under "Data-quality checks" in `metrics.md`, over both windows, with the hostname filter and Warsaw days. `metrics.md` lists each check's events, pairs and thresholds; these are the calls:

1. **Funnel order.** Per form, and per language on the paid page, compare the counts `metrics.md` pairs (e.g. `forms_seen` ≤ `lp_views`, `checkout_clicks` ≤ `lp_views`), each from the call behind that metric under "Funnel steps". Before tracking release v1.2.0 only `checkout_clicks` ≤ `lp_views` can be checked.
2. **Duplicates.** For each event `metrics.md` lists for this check (`Free skill form started` only from tracking release v1.2.0 on — before it, autofill pairs are a known limit, not a duplicate): `get_events`, `event: "<name>"` (for signups `search: "Free skill submit:"`), `pageSize: 100`, paging with `page` until `hasMore` is false. Group the list by event name, `sessionId` and normalised `path`; two events in one group less than 2 s apart are a duplicate pair.
3. **Missing labels.** For each funnel event, over the part of the window from 2026-11-11 on (the first full day after the 2026-11-10 release; events before the release carry no labels): the total from `get_website_metrics`, `type: "event"`, `search: "<name>"`, then `get_event_properties`, `eventName: "<name>"`, `propertyName: "page"`, and again with `"language"`. Missing = total − the sum of that property's values.
4. **Odd volume.** For each event: `get_event_series`, `unit: "day"`, `timezone: "Europe/Warsaw"`, `limit: 50`, from 14 days before the window start to the window end, a missing day counting as 0. Flag it when the window's median daily count lies outside 0.5×–2× the median of the 14 days before. When a release falls inside the window, compare the days since it with the 14 days before it. When that 14-day median is 0, or there are fewer than 14 days of data, show the daily counts instead.

Then:
- **"No data yet" is not a failure.** An event that starts at tracking release v1.2.0 has no data in a window before it, and events before the 2026-11-10 release carry no labels: those checks read "no data yet" (or "not checked", with the reason `metrics.md` gives), never "passed" or "failed".
- **Report the checks first** (see Report shape): each as passed, failed or flagged, with its numbers.
- **A failure blocks.** Nothing is concluded from the numbers a failed check affects (`metrics.md` names them per check). Show those numbers marked "check failed", and don't use them for a due result, the leak or an idea. Fixing the broken tracking becomes the first idea (step 8).
- **A flag doesn't block.** Say whether page views moved the same way (more or less traffic, a campaign starting or stopping, from `lp_views` and `traffic_mix`) or a tracking change is the likely cause.

This step can also run on its own, a few days after a tracking release, over the days since it.

### 3. Report due results

For every ledger row whose end date has passed and whose result is empty:
- **Read it once, on its own windows:** the after window runs from the ship date to the end date, the before window is the same length, ending the day before the ship date. A row whose end date hasn't passed is not read, not even for a look.
- Run the step 2 checks over the row's windows for the events behind its metrics, and name the definition changes and annotations inside them (campaign launches and stops, email sends, traffic-mix shifts), as in step 1. If a check fails or a definition change breaks the comparison, leave the result unread and say why.
- For the primary metric, the row's guardrail, and `phone_signup_rate` and `in_app_signup_rate` on the same page: raw counts and denominators for both windows, the difference with its 95% range, and one label, adding "few conversions" when either window has fewer than 30 (ground rule 4).
- Propose a decision from the table under "How we judge changes" in `metrics.md`: keep (a "clearly better" stays labelled directional), revert ("clearly worse" on the main number or a guardrail; for the phone and in-app guardrails, after looking), or extend to a new end date. A judgement change is read the same way, and is never called a test.
- Once the user agrees, write the "Result" in the ledger's format, counts before → after, the difference, the 95% range and the label (e.g. `signups 4 ÷ 310 (1.3%) → 7 ÷ 298 (2.3%), +1.1 points, range −1.2 to +3.4: can't tell, few conversions`), and the owner's decision.

If no row is due, say "no results due" and list the next end date, if any.

### 4. Read both funnels

Per landing page and language, current window against previous, following `metrics.md` exactly (hostname filter, path normalisation, test-data exclusions). Each page's main number comes first ("Main number per page"), with `interest_rate` beside it.

- **Free funnel, per form** ("Free-skill funnel, per form"): for each free page and language, each form on its own — hero and final, by `surface` — `lp_views` → `forms_seen` → `form_starts` → `signups`, with `form_seen_rate`, `form_start_rate` and `form_completion_rate`; then `submit_errors` and `submit_error_rate`, and the page's errors by `reason`. `signup_rate` stays the page's main number. The paid page's two "try for free" cards get the same rows, as context for that page.
- **Paid path, per language** ("Paid-page path"): `purchases` first, as counts, with `revenue` per currency and plan beside them. Then the path: `lp_views` → `pricing_seen` (`pricing_seen_rate`, with `pricing_jumps` beside it, never added to it) → `checkout_clicks` by plan (`checkout_click_rate`) → `purchases` (`purchase_per_click`, `purchase_rate`). Beside the path: `card_signups`, `video_opens`, `nav_link_clicks`. A rise in checkout clicks alone is never a win.
- **Split by device and in-app browser** ("Device and in-app splits"): per page and language, add the segment's filter to every call behind both counts of a rate — phone `filters.device: "mobile"`, computer `filters.device: "laptop,desktop"`, in-app browser `filters.browser: "instagram,facebook,chromium-webview,ios-webview"`. Free pages: `lp_views`, `signups`, `signup_rate` and `interest_rate` per segment; the phone and in-app rows are the `phone_signup_rate` and `in_app_signup_rate` guardrails. Paid page: `lp_views`, `pricing_seen`, `checkout_clicks` and `interest_rate` per segment; purchases come from the server with no device, so they aren't split. Segments are warning signs, never a result on their own.

Show one table per funnel and one split table per funnel: page, language (and form), each step's raw count for both windows, each rate as `count ÷ denominator (percent)`. Put "no data yet" where a metric has no history in the window: before tracking release v1.2.0 there are no forms seen, prices seen, submit errors, video opens, top-bar clicks or interest. A metric whose definition changed inside or between the windows follows step 1 (e.g. `form_start_rate` and `form_completion_rate` across tracking release v1.2.0).

### 5. Read the ads

Ads are reported apart from the pages (`metrics.md` "Ads"), per campaign, ad set and ad, over the current window's Warsaw days on both sides. They don't enter the leak pick in step 6. If the report has no rows for the window, say "no ads in the window" and go on.

1. **Meta's numbers.** Run `npm run report:meta-ads -- --since <first day> --until <last day> --campaign US-UXD-free-skills-2026Q4`, with the window's first and last Warsaw days, both included (ground rule 10; a new Creative Sparks campaign gets its own `--campaign` run). It prints one row per ad: Campaign | Ad set ID (utm_term) | Ad set | Ad (utm_content) | Spend | Link clicks | Landing-page views | Meta leads. It only reads. Never print, echo or show its key, and don't open `.env.local`. If it fails, say "call failed" with its error message and show the Umami columns alone. If an ad set ID is missing from the ad-set table under "Ad tags" in `metrics.md`, list it and ask the user to add it there.
2. **The site's numbers, per UTM group** ("An ad's visitors in Umami"): the hostname filter plus, per ad, `filters.utmTerm: "<ad set ID>"` and `filters.utmContent: "<ad name>"` together, never `utmContent` alone; per ad set, `filters.utmTerm` alone; for the campaign, `filters.utmTerm` with its ad set IDs separated by commas, never `filters.utmCampaign`. For each group: `ad_lp_views`, `ad_signups`, `signup_rate` and `interest_rate` (which reads "no data yet" for days before tracking release v1.2.0), from the calls under "Ad numbers". An ad with no spend and no link clicks in the report skips the per-ad calls; its site columns read "no clicks", and the "nothing drops out" check below still catches any visit it got.
   - **The old-tag ad, matched by hand** ("Ad tags"): the report's `home-ux-audit-light` in ad set `120243755481140302` arrives in Umami as `utm_content` `free-audit-skil`. For that row, filter on `filters.utmContent: "free-audit-skil"` with that `utmTerm`.
   - **Nothing drops out.** An ad set's ad rows must add up to its own Umami counts. If they don't, find the missing `utm_content` value with a `type: "utmContent"` listing on that ad set (it counts visitors, so use it only for the value) and show it as its own row, "not in the report".
3. **The ad table.** Join the two by ad set ID (`utm_term`) and ad name (`utm_content`). One row per ad, then per ad set and for the campaign, added up as "Ad numbers" says: `ad_spend`, `ad_link_clicks`, `meta_lp_views`, `ad_lp_views`, `ad_signups`, `signup_rate`, `interest_rate`, `cost_per_signup`, `handoff_ratio`, `meta_lead_gap`. Write each in the format `metrics.md` gives, and spell out a 0 denominator (`12.98 PLN ÷ 0 (no signups)`, `24 ÷ 0 (no Meta views)`, `Meta 1 ÷ site 0 (no site signups)`), never 0 or infinite.
4. **Read it** as "Reading the ad numbers" in `metrics.md` says: site counts first, Meta leads beside them and never counted as signups (rule 7); ad sets before ads, one ad's numbers only a hint; ads compared on `signup_rate` with ground rule 4; the handoff ratio read for change, with `ad_link_clicks` beside it. Name what it flags, e.g. Meta views at 0 while the site has tagged views. To read an ad set window against window, run this step for the previous window too, when the same ad sets ran in both (like with like, step 1).

### 6. Find the step that loses the most visitors

- Pick the page, language, form and step with the largest absolute loss (e.g. views in which no form came on screen, forms seen and not started, starts with no signup, views that never reach the prices, clicks with no purchase). State the numbers behind the pick, and say whether the phone or in-app split carries most of it.
- Leave out numbers a failed data check blocks (step 2). If the largest loss sits there, say so and name the largest loss among the rest.
- Small counts don't stop the pick: name the largest loss, and add "few conversions" when the step has fewer than 30 (ground rule 4).
- If a step's input count is "no data yet", name the wider span you can measure (e.g. view → signup) and say which step inside it can't be separated yet. Before the 2026-11-10 tracking release there are no form starts or purchases; before tracking release v1.2.0 there are no forms seen, prices seen or submit errors, so a loss can't yet be placed before or after the form came on screen, or before or after the prices.
- Rule out context first (rule 8): annotations, traffic source shifts, a change in the page mix.

### 7. Find out why, for that page

- **Recordings (PostHog).** List recordings on that page in the window with `query-session-recordings-list`, using the UTC times that cover the window and the property filter `{"type":"recording","key":"visited_page","operator":"icontains","value":"<page path>"}`. That filter also matches the `/en/` page and subpages, so separate the languages afterwards (or use a `regex` operator). For each recording, read its existing AI notes with `vision-observations-list` and that recording's `session_id`, or find notes across recordings with `vision-observations-search`. If there are none, say so and give the user two or three recording links to watch or to summarise with the Summarize button in PostHog — don't generate summaries yourself. When the leak is about clicks or scrolling, read heatmaps with `heatmaps-list`, giving the full page URL as `url_exact` (or a full-URL regex as `url_pattern`). Recordings cover only visitors who accepted statistics cookies, so treat them as examples, never as counts.

### 8. Propose ideas

Rank one to three ideas, as "How we judge changes" in `metrics.md` sets out: a bigger change that could move the main number a lot, backed by evidence (recordings and their notes, failed-submit reasons, the page checked on a phone inside the Instagram or Facebook app), ranks above a small tweak. A failed data check or a form that fails comes first, as a fix with no experiment. For each:
- **Change:** what exactly changes, and in which section or file.
- **Evidence:** counts with denominators, recording notes with links, heatmap observations.
- **Hypothesis:** "If we …, then … rises, because …".
- **Metrics:** one primary and one guardrail metric, both from `metrics.md`, plus `phone_signup_rate` and `in_app_signup_rate` on the same page by default, since they are checked after every change.
- **Detectable effect:** the effect check of ground rule 4, from the before window's rate and its views per window, in the ledger's format (e.g. `±6 points (p = 36 ÷ 360)`), beside the effect the change can plausibly have.
- **End date:** the days each window needs for a clear answer on that plausible effect (ground rule 4, turned around), at least 28 days after shipping. Show the estimate.
- **Judgement change:** "yes" when that clear answer would need more than about 8 weeks per window: the end date is then 28 days, the change ships on its evidence, its result is still read at the end date (expect "can't tell"), and it is never called a test. Otherwise "no".
- **Size:** small (copy, a label, an order) or bigger (layout, a whole section, the form flow, pricing).
- **What would prove it wrong:** the observation that would reject the explanation.

If the evidence is too thin for any idea, say "not enough data" and name what to wait for.

### 9. The user picks one

- For a bigger change, ask the user to watch the two or three recordings behind it first, and give the links, before building anything.
- Build it on a new branch from `master`, following the repo's `AGENTS.md` and `design.md`. Run the tests the map in `docs/testing.md` lists for the change (that includes the build), show the diff, and wait for approval (rule 5).

### 10. Log it

Once the user confirms the ship date, add a ledger row: hypothesis, change (with the commit), ship date, primary metric, guardrail metric, end date, detectable effect, judgement change (with the reason). Leave result and decision empty. Then add the ship-date annotation through Umami's API (rule 4): a POST to `https://analytics.creativesparks.pl/api/websites/<website id>/annotations` with `{ date, allDay, note }`, sending `UMAMI_API_TOKEN` from `.env.local` as a Bearer token without ever printing it; check it with `get_annotations`.

## Report shape

Lead with the data checks: a failed check first, with the numbers it blocks, then flags, then the checks that passed. Then three lines: results due, the leak found, the top idea. Then the windows used, with the definition changes and annotations inside them, the funnel tables and their device and in-app splits, the ad table (ads, ad sets and the campaign, with Meta's leads beside the site's signups), the evidence, and the ranked ideas. Keep every number traceable to a `metrics.md` definition.
