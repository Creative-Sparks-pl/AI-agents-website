# Analytics metrics — agents.creativesparks.pl

These are the fixed definitions behind every number the improvement-cycle skill (`/cro-cycle`) reports, plus the questions the site owner wants answered. The agent uses only these definitions. For a question they don't cover, it answers "can't answer from the defined metrics" and does not make up a number. A change to a definition is reviewed like a code change.

- **Status:** approved by the owner on 2026-11-10.
- **Tracking release date:** 2026-11-10, deployed about 20:00 Warsaw time (site v1.0.0). Everything marked "after release" starts counting on that day; the first full day of after-release data is 2026-11-11.
- **Umami:** `https://analytics.creativesparks.pl`, website ID `37a76f9d-7246-4d45-b832-3b35e78eee08`.

## Principles

- **Privacy limits what we can link, by design.** A purchase is never tied to an ad or a signup; that is a choice, not a gap to work around.
- **No made-up money values.** No "value per signup" to dress results up as revenue.
- **More signups is not automatically a win** if failed or bogus signups rise with them.
- **Distrust published "+40%" success stories.** When re-tested, such gains usually shrink.

## Ground rules

1. **Counts come from Umami.** Umami counts every visitor and needs no consent. PostHog adds recordings, heatmaps and notes on recordings. Never compute a rate from PostHog.
2. **Live site only.** Every Umami call filters `hostname: agents.creativesparks.pl`. The tracking script also runs on local development and on Vercel previews, and this filter drops them.
3. **Dates.** Use whole days in Europe/Warsaw. Pass `startAt` and `endAt` with the Warsaw offset (`+01:00` in winter, `+02:00` in summer), and pass `timezone: "Europe/Warsaw"` where the tool accepts it. When a window crosses a clock change, the start takes the start day's offset and the end the end day's (e.g. `2026-10-13T00:00:00+02:00` → `2026-10-26T23:59:59+01:00`). The PostHog project runs on UTC: pass PostHog the UTC times that cover the Warsaw window. The default window is the last 14 full days, compared with the 14 days before that. For an "after release" metric, a window that starts before the release date reports "no data yet", never zero.
4. **Raw counts and denominators, always.** Write every rate as `count ÷ denominator (percent)`, e.g. `3 ÷ 412 (0.7%)`. A rate with a 0 denominator is written `0 ÷ 0 (no views)`, never 0%. If either window has fewer than 30 conversions, call the result directional and never call a change a win or a loss.
5. **Units are views and events, not people.** A reload counts as a second view. Two signups by the same person count as two, because events carry no email (by design). Form events count per form: each free page has two forms (hero and final) and the paid page has two "try for free" cards, so one view can produce more than one form start, and `form_start_rate` is events per view, not a share of visitors. Browser autofill can submit without typing, so `signups` can exceed `form_starts` and `form_completion_rate` can pass 100%.
6. **Normalise page paths.** Umami can store the same page as `/ux-design-skill`, `/ux-design-skill/`, `/ux-design-skill/#cennik`, or with a query string. Cut everything from `#` or `?`, add a trailing `/` if it's missing, then add up the counts. A page's former paths (see the landing-page table) count as that page. Paths outside the six landing pages go into one "other pages" row. Don't drop them. Before a page's first recorded view, report it as "not live yet", not 0. To find that first view, run one `get_website_metrics` `type: "path"` listing from the site's first day (`get_website_daterange`) to the window start.
7. **The page decides the language.** A path starting with `/en/` is English; any other path is Polish. After release, the event `language` property gives the same answer, and for `Purchase` that property is the only source. Umami's own `language` dimension and filter hold the visitor's browser language (e.g. `pl-PL`) for every browser event. Never use them as the site language. (For `Purchase`, sent from the server, read the event's `language` property too, not the dimension.)
8. **Connector calls.** The parameter names below (`search`, `filters.path`, `filters.event`, `filters.hostname`, `eventName`, `propertyName`, `event`, `steps`, `windowMinutes`, the `*` wildcard in funnel steps) were checked against the Umami connector `@umami/mcp@0.2.0` on 2026-11-10. `filters.path` matches one exact stored path; `search` matches any path containing the text.
9. **Which call gives which count.** Take page views only from `get_website_metrics` with `type: "path"`; `get_website_stats` reports different `pageviews` totals for the same filter, so use it only for visitors and visits. The channel, referrer and hostname rankings count visitors per exact path, so never add them up across path variants. For events, get the totals with no path filter first, then split by path only where needed, and check the parts add up to the total.

## Landing pages

| Page | Polish path | English path | Former paths (count as this page) | Funnel | Form surfaces on the page |
|---|---|---|---|---|---|
| UX Design Skill (paid) | `/ux-design-skill/` | `/en/ux-design-skill/` | none | paid; also free, through its two "try for free" cards | `ux_design_skill_audyt`, `ux_design_skill_planning` |
| Free homepage UX audit | `/free-homepage-ux-audit-skill/` | `/en/free-homepage-ux-audit-skill/` | `/free-ux-audit-skill/`, `/en/free-ux-audit-skill/` (they redirect to the new paths; the new paths got their first views on 2026-11-10) | free (audit skill) | `free_audit_skill_hero`, `free_audit_skill_final` |
| Free website planning | `/free-website-planning-skill/` | `/en/free-website-planning-skill/` | none | free (planning skill) | `free_planning_skill_hero`, `free_planning_skill_final` |

- All six pages load PostHog after the visitor gives statistics consent.
- Both languages use the same surface names, so the language always comes from the page.
- `ux_designer_audyt` sits on the retired `/archive/ux-designer/` page. Count it under "other pages".
- Checkout buttons appear on the paid page, the archive page and the internal `/design-system/` showcase. The last two count under "other pages".

## Events

All of these are Umami custom events.

| Event (exact name) | Fires when | Properties | Recorded since |
|---|---|---|---|
| `Free skill form started` | The visitor types the first character in a form's email field. Fires once per form per page load. | `skill` (`audit` or `planning`), `language` (`pl` or `en`), `surface`, `page` | release |
| `Free skill submit: {surface}` (one event name per surface, e.g. `Free skill submit: free_audit_skill_hero`) | `/api/subscribe` accepted the email and returned the download link: a successful signup. Failed or invalid submits don't fire it. | same four as above | the name: before this project; the properties: release |
| `Pricing CTA` | Click on a plan's buy button, which opens the Easytools checkout (`cart.creativesparks.pl`) | `plan` (`Solo`, `Studio`, `Agencja` in Polish, `Agency` in English), `language`, `page` | `plan`: before this project; `language` and `page`: release |
| `Purchase` | Sent server-side by `/api/easytools-webhook` when Easytools reports `single_product_bought` with `amount_paid` above 0. Free-skill grants (`product_assigned`) and zero-price checkouts are not counted. | `amount`, `currency`, `language` (Easytools `lang`), `product_id`, `price_name`, `page` (present only if Easytools sends the checkout link's `page` parameter back in `custom_params`) | release |

Umami files each `Purchase` under the path in its `page` property, or under `/purchase` when `page` is missing.

**Secondary clicks.** These are context, never a funnel step or a conversion; `Architecture CTA` also feeds the `cross_sell_clicks` guardrail. They carry no properties, so the event's own path gives the page.

| Event | Where | Leads to |
|---|---|---|
| `Hero primary CTA` | paid page hero | pricing section (`#cennik` / `#pricing`) |
| `Hero secondary CTA` | paid page hero | "try for free" section on the paid page |
| `Nav CTA` | top bar of the paid page and its subpages | pricing section |
| `Architecture CTA` | both free pages; also the paid page and the archive page | from a free page: the paid page ("full version"). `cross_sell_clicks` counts only the free-page paths |

**PostHog.** PostHog records `$pageview` and `$pageleave`, session recordings and heatmaps. Autocapture is off, so it has no form or checkout events. AI notes on recordings come from PostHog's AI features, approved for the PostHog organisation on 2026-11-10.

## Metrics

Metrics sit in six layers, and every row names its role:
- **Business outcomes:** what the site is for, signups and purchases with their revenue.
- **Main number:** one per page type, the headline number for that page.
- **Funnel steps:** the steps from a view to an outcome. They explain why a main number moves.
- **Guardrails:** numbers that must not get worse when a change aims at a main number.
- **Context:** numbers that help read the others: who came, from where, on what device.
- **Data quality:** numbers that say how far the others can be trusted.

Free signups and paid sales are separate scorecards. Never add them into one site-wide score: a purchase can't be linked to a signup, so a blended score would imply a link nobody can measure. A metric belongs here only if a change in it would change a decision.

### Business outcomes

| Metric | Role | Counts | Divided by | Umami call | Available |
|---|---|---|---|---|---|
| `signups` | business outcome (free) | `Free skill submit: {surface}` events for the page's surfaces, on that page | n/a | Before release: `get_website_metrics`, `type: "event"`, `search: "Free skill submit"`, with `filters.path` set to each path variant that `lp_views` found. After release: `get_event_properties`, `eventName: "Free skill submit: <surface>"`, `propertyName: "page"` | now |
| `purchases` | business outcome (paid); the paid page's main number | `Purchase` events, minus the test purchases listed below | n/a | `get_event_stats`, `filters.event: "Purchase"` for the total; `get_event_properties`, `eventName: "Purchase"`, `propertyName: "language"` (also `"price_name"`, `"currency"`, `"page"`); `get_events`, `event: "Purchase"` to list each one | after release |
| `revenue` | business outcome (paid); shown beside the paid page's main number | Sum of `amount` for each `currency` (PLN for Polish, USD for English). Never add the two currencies together. Whether `amount_paid` includes VAT is unconfirmed. | n/a | List purchases with `get_events`. If that doesn't return amounts: `get_event_properties`, `propertyName: "amount"`, then value × times seen | after release |

Splitting purchases by language is the same as splitting them by paid page, because each language has exactly one paid page with buy buttons.

### Main number per page

Each page type has exactly one main number, reported first for that page.

| Page type | Main number | Read as | Shown beside it |
|---|---|---|---|
| Free pages: each free page, per language | `signup_rate` | signups per view, written `signups ÷ lp_views (percent)`. A reload or a second visit is another view. | `signups` as a count |
| Paid page, per language | `purchases` | a count, not a rate: purchases are too few for a rate to mean anything | `revenue` per currency |

- Checkout clicks are never the paid page's main number: they can rise with no sales.
- Signups from the paid page's two "try for free" cards use the `signup_rate` definition and belong to the free scorecard. On the paid page they are context, never its main number.

| Metric | Role | Counts | Divided by | Umami call | Available |
|---|---|---|---|---|---|
| `signup_rate` | main number of each free page | `signups` | `lp_views` of the same page. Unit: signups per view | n/a | now |

### Funnel steps

#### Free-skill funnel: page view → form started → signup

The last step, `signups`, is a business outcome, and `signup_rate` is the main number; both are defined above.

| Metric | Role | Counts | Divided by | Umami call | Available |
|---|---|---|---|---|---|
| `lp_views` | funnel step: the first step, and the denominator of every per-view rate | Pageviews of the landing page: only stored paths that normalise to exactly one of the six landing paths | n/a | One `get_website_metrics` listing per window: `type: "path"`, `limit: 500`, hostname filter, no `search`. Normalise every path, add up the variants of each of the six landing paths (Polish and English separately), and put the rest in "other pages" | now |
| `form_starts` | funnel step | `Free skill form started` events whose `page` is the landing page | n/a | `get_event_properties`, `eventName: "Free skill form started"`, `propertyName: "page"` (`"surface"` splits hero from final form) | after release |
| `form_start_rate` | funnel step: view → form start | `form_starts` | `lp_views` | n/a | after release |
| `form_completion_rate` | funnel step: form start → signup | `signups` | `form_starts`, same page, in a window entirely after release | n/a | after release |

#### Paid funnel: page view → checkout click → purchase

The last step, `purchases`, and `revenue` are business outcomes, defined above; `purchases` is also the paid page's main number.

| Metric | Role | Counts | Divided by | Umami call | Available |
|---|---|---|---|---|---|
| `lp_views` | funnel step: the first step | Pageviews of `/ux-design-skill/` or `/en/ux-design-skill/`, as above | n/a | as above | now |
| `checkout_clicks` | funnel step | `Pricing CTA` events on the paid page | n/a | `get_website_metrics`, `type: "event"`, `filters.path` per variant. Split by plan: `get_event_properties`, `eventName: "Pricing CTA"`, `propertyName: "plan"` (after release also `"page"` and `"language"`) | now |
| `checkout_click_rate` | funnel step: view → checkout click | `checkout_clicks` | `lp_views` of the paid page, same language | n/a | now |
| `purchase_per_click` | funnel step: checkout click → purchase | `purchases` in one language | `checkout_clicks` on the paid page in that language | n/a | after release |
| `purchase_rate` | funnel step: view → purchase | `purchases` in one language | `lp_views` of the paid page in that language | n/a | after release |

### Guardrails

Each ledger row names one guardrail for its change.

| Metric | Role | What it is | Call | Available |
|---|---|---|---|---|
| `cross_sell_clicks` | guardrail on the free pages: a change aimed at signups must not cut the path to the paid page | `Architecture CTA` events on a free page ÷ that page's `lp_views` | `get_website_metrics`, `type: "event"`, `filters.path` | now |

### Context

| Metric | Role | What it is | Call | Available |
|---|---|---|---|---|
| `visitors` | context | Unique visitors and visits on a page. Context only, never a funnel denominator. | `get_website_stats`, `filters.path` per variant | now |
| `traffic_mix` | context | Visitors per channel or per referrer on a page | `get_website_metrics`, `type: "channel"` or `"referrer"`, `filters.path` | now |
| `device_mix` | context | Visitors per device type. `filters.device` splits any event count above the same way. | `get_website_metrics`, `type: "device"`, `filters.path` | now |
| `free_to_paid_visits` | context | Visitors who viewed a free page and then the paid page, same language, in one visit | `run_funnel`, steps path free page → path paid page | now |

Recordings and their notes are evidence for why visitors drop. Cite them by recording, next to the counts. Never count them as conversions.

### Data quality

| Metric | Role | What it is | Call | Available |
|---|---|---|---|---|
| `recorded_views` | data quality: feeds `recorded_share` | PostHog `$pageview` events on a landing page: views by visitors who accepted statistics cookies | PostHog connector `exec`, HogQL through `execute-sql` on `events` where `event = '$pageview'`, grouped by `properties.$pathname` | after release |
| `recorded_share` | data quality: how far recordings stand for all visitors | `recorded_views` ÷ `lp_views`: roughly how much traffic the recordings cover. Approximate, because the two tools count differently. | n/a | after release |

Free-funnel cross-check, not a definition: `run_funnel` with steps path `/free-homepage-ux-audit-skill*` → event `Free skill form started` → event `Free skill submit: free_audit_skill_*` (`windowMinutes: 60`) shows visitors who did each step in order in one visit. Its unit is visitors, not events, so label it that way and don't mix it with the funnel rates.

## Ad traffic (Meta)

Meta ad clicks arrive with these tags (checked against live clicks and an Ads Manager export, 2026-11-11):

| Tag | Holds |
|---|---|
| `utm_source` | `facebook` |
| `utm_medium` | `paid_social` |
| `utm_campaign` | campaign name, e.g. `US-UXD-free-skills-2026Q4` |
| `utm_content` | ad name, e.g. `website-planning-light`, `home-ux-audit-blue` |
| `utm_id` | campaign ID |
| `utm_term` | ad set ID — use this to split by ad set |

Ad set IDs (campaign `120243755481080302`):

| `utm_term` | Ad set |
|---|---|
| `120249754635630302` | US-Skill-Website-Planning-Prospecting |
| `120249759871620302` | EU-Skill-Website-Planning-Prospecting |
| `120243755481140302` | US-Skill-Audit-Prospecting |
| `120249759844410302` | EU-Skill-Audit-Prospecting |

- Split ad traffic by ad set with `filters.utmTerm`, by ad with `filters.utmContent`; signups per ad set = `Free skill submit: {surface}` events with that `utmTerm` filter.
- One ad still sends old tags: `home-ux-audit-light` in US-Skill-Audit-Prospecting arrives as `utm_campaign=EN-UXD-faza1-2026Q2-Audyt`, `utm_content=free-audit-skil`. Its `utm_term` is still right, so count it by `utm_term`, never by `utm_campaign` or `utm_content` alone.
- Add new ad sets to the table when they launch (their ID shows in Ads Manager's "Ad set ID" column, or as a new `utm_term` value in Umami).
- Meta's own Lead counts cover only visitors who accepted marketing cookies; Umami counts every signup. Report both, never one as the other.

## Known limits

- **PostHog sees only part of the traffic.** It covers only visitors who accept statistics cookies, only on the six landing pages, and only from after the page has loaded. A pattern seen in recordings describes visitors who consented, not everyone.
- **Purchases by page depend on Easytools.** Purchases split by language for certain. They split by landing page only if Easytools sends the checkout link's `page` parameter back in `custom_params`, which stays unconfirmed until the first real purchase. Check it this way: `Purchase` events with a `page` property, filed on a landing-page path, mean the split works. Events filed on `/purchase` mean it doesn't. Even when it works, `page` names the page with the buy button (always the paid page), never a free page the buyer saw earlier.
- **A purchase can't be tied to a visitor.** The webhook sends each purchase to Umami from the server, so it lands in a session the server creates. That session has no referrer, device or country, and Umami can't follow a visitor from click to purchase. `purchase_per_click` is a ratio of two separate counts, not a per-person conversion, and in a short window it can exceed 100% (e.g. someone buys through a link in an email). Never use `run_funnel` or visitor counts for `Purchase`.
- **Most new events have no history.** Before the release, Umami has page views, `Free skill submit: {surface}` (no properties, page taken from the event's path), `Pricing CTA` with `plan`, and the secondary clicks. `Free skill form started`, `Purchase`, and the `skill`, `language`, `surface` and `page` properties start at the release. A window that crosses the release date compares different data, so start "after release" windows on the release day.
- **Path variants.** One page can appear with or without the trailing slash, with a `#anchor`, or with a query string. Normalise them (ground rule 6). The `page` property never contains `#` or a query string, but it can lack the trailing slash.
- **Ad blockers.** Some visitors block Umami's browser script, so views, form starts, signups and checkout clicks are undercounts. `Purchase` comes from the server and isn't blocked, so ratios with purchases on top read high.
- **Owner and test traffic.** The owner's own visits can't be filtered out. Test signups and test purchases are removed by hand. List them below.
- **Low traffic.** Expect single-digit signups and purchases per page per window. Always show raw counts and denominators, and never name a winner from small numbers (ground rule 4).

## Test data to exclude

Add each known test signup or test purchase here. The agent subtracts these from the counts.

| Date and time (Warsaw) | Event | Page or language | Note |
|---|---|---|---|

## Questions

The owner hasn't written a question list yet, so the rows come from three sources:
- **goal:** restates the owner's confirmed goal and the done-when checks in the project decisions.
- **research:** comes from the research synthesis.
- **proposed:** the agent's suggestion.

When approving this file, the owner confirms, edits or deletes rows.

The statuses mean:
- **answerable now:** the history already exists.
- **answerable after release:** the question needs events that start at the release.
- **not answerable with current tracking.**

| # | Question | From | Status | Metrics |
|---|---|---|---|---|
| 1 | How many page views and free-skill signups did each landing page get in the last 14 days? | goal (connector check) | answerable now | `lp_views`, `signups`, `signup_rate` |
| 2 | What do both funnels look like per landing page and language over the last 14 days? | goal (funnel check) | answerable after release | all funnel metrics; views, signups and checkout clicks work already |
| 3 | At which step does each landing page lose the most visitors? | goal | answerable after release | `form_start_rate`, `form_completion_rate`, `checkout_click_rate`, `purchase_per_click` |
| 4 | Are signups and purchases going up, page against page, this window against the last? | goal | answerable after release | `signups`, `signup_rate` (already); `purchases`, `purchase_rate` by language |
| 5 | Did a shipped change move its metric by its end date? | goal (ledger) | answerable after release | the ledger row's primary and guardrail metrics, before vs after |
| 6 | Which page and language got the most visits? | research | answerable now | `lp_views`. The research's "qualified visits" has no definition here. |
| 7 | Did signups change in raw count and in rate, and over what denominator? | research | answerable now | `signups`, `signup_rate` |
| 8 | Does a button get clicks with no completions after them? | research | answerable after release | `checkout_clicks` vs `purchases`; `form_starts` vs `signups` |
| 9 | Did the traffic source or the page mix shift enough to explain a rate change? | research | answerable now | `traffic_mix`, `lp_views` per page |
| 10 | How do Polish and English, and mobile and desktop, compare on views, signups and checkout clicks? | research | answerable now | `lp_views`, `signups`, `checkout_clicks`, split with `device_mix` |
| 11 | How many visits come from AI assistants (ChatGPT, Claude, Perplexity)? | research | answerable now | `traffic_mix` (referrer) |
| 12 | How many purchases, of which plan, and how much revenue, per language? | research | answerable after release | `purchases` by `price_name`, `revenue` |
| 13 | What is the smallest reversible improvement, and what observation would reject its explanation? | research | not answerable with current tracking | none; this is a judgement call, and the cycle states both in each proposal |
| 14 | Which form gets the most signups: hero form, final form, or the paid page's "try for free" cards? | proposed | answerable now | `signups` by surface; `form_completion_rate` by surface after release |
| 15 | Which plan gets the most checkout clicks? | proposed | answerable now | `checkout_clicks` by `plan` |
| 16 | Do visitors to the free pages go on to the paid page? | proposed | answerable now | `cross_sell_clicks`, `free_to_paid_visits` |
| 17 | Why do visitors drop at a step? | proposed | answerable after release | PostHog recordings and notes (consenting visitors only), cited next to the counts |
| 18 | What share of landing-page views do the recordings cover? | proposed | answerable after release | `recorded_share` |
| 19 | Do free-skill signups go on to buy? | proposed | not answerable with current tracking | none; by design, purchases aren't linked to visitors or emails |
| 20 | Which traffic source, device or free page did buyers come through? | proposed | not answerable with current tracking | none; the server creates the purchase session |
| 21 | How much revenue remains after refunds? | proposed | not answerable with current tracking | none; refunds aren't tracked |
