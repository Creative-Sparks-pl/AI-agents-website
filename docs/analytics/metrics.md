# Analytics metrics — agents.creativesparks.pl

These are the fixed definitions behind every number the improvement-cycle skill (`/cro-cycle`) reports, plus the questions the site owner wants answered. The agent uses only these definitions. For a question they don't cover, it answers "can't answer from the defined metrics" and does not make up a number. A change to a definition is reviewed like a code change.

- **Status:** approved by the owner on 2026-11-10.
- **Tracking release date:** not shipped yet. Fill in the day the `ai-native-analytics` branch reaches production. Everything marked "after release" starts counting on that day.
- **Umami:** `https://analytics.creativesparks.pl`, website ID `37a76f9d-7246-4d45-b832-3b35e78eee08`.

## Ground rules

1. **Counts come from Umami.** Umami counts every visitor and needs no consent. PostHog adds recordings, heatmaps and notes on recordings. Never compute a rate from PostHog.
2. **Live site only.** Every Umami call filters `hostname: agents.creativesparks.pl`. The tracking script also runs on local development and on Vercel previews, and this filter drops them.
3. **Dates.** Use whole days in Europe/Warsaw. Pass `startAt` and `endAt` with the Warsaw offset (`+01:00` in winter, `+02:00` in summer), and pass `timezone: "Europe/Warsaw"` where the tool accepts it. The default window is the last 14 full days, compared with the 14 days before that. For an "after release" metric, a window that starts before the release date reports "no data yet", never zero.
4. **Raw counts and denominators, always.** Write every rate as `count ÷ denominator (percent)`, e.g. `3 ÷ 412 (0.7%)`. If either window has fewer than 30 conversions, call the result directional and never call a change a win or a loss.
5. **Units are views and events, not people.** A reload counts as a second view. Two signups by the same person count as two, because events carry no email (by design). Form events count per form: each free page has two forms (hero and final) and the paid page has two "try for free" cards, so one view can produce more than one form start, and `form_start_rate` is events per view, not a share of visitors. Browser autofill can submit without typing, so `signups` can exceed `form_starts` and `form_completion_rate` can pass 100%.
6. **Normalise page paths.** Umami can store the same page as `/ux-design-skill`, `/ux-design-skill/`, `/ux-design-skill/#cennik`, or with a query string. Cut everything from `#` or `?`, add a trailing `/` if it's missing, then add up the counts. Paths outside the six landing pages go into one "other pages" row. Don't drop them.
7. **The page decides the language.** A path starting with `/en/` is English; any other path is Polish. After release, the event `language` property gives the same answer, and for `Purchase` that property is the only source. Umami's own `language` dimension and filter hold the visitor's browser language (e.g. `pl-PL`) for every browser event. Never use them as the site language. (For `Purchase`, sent from the server, read the event's `language` property too, not the dimension.)
8. **Connector calls.** The parameter names below (`search`, `filters.path`, `filters.event`, `filters.hostname`, `eventName`, `propertyName`, `event`, `steps`, `windowMinutes`, the `*` wildcard in funnel steps) were checked against the Umami connector `@umami/mcp@0.2.0` on 2026-11-10. `filters.path` matches one exact stored path; `search` matches any path containing the text.

## Landing pages

| Page | Polish path | English path | Funnel | Form surfaces on the page |
|---|---|---|---|---|
| UX Design Skill (paid) | `/ux-design-skill/` | `/en/ux-design-skill/` | paid; also free, through its two "try for free" cards | `ux_design_skill_audyt`, `ux_design_skill_planning` |
| Free homepage UX audit | `/free-homepage-ux-audit-skill/` | `/en/free-homepage-ux-audit-skill/` | free (audit skill) | `free_audit_skill_hero`, `free_audit_skill_final` |
| Free website planning | `/free-website-planning-skill/` | `/en/free-website-planning-skill/` | free (planning skill) | `free_planning_skill_hero`, `free_planning_skill_final` |

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

**Secondary clicks.** These are context only, never a funnel step or a conversion. They carry no properties, so the event's own path gives the page.

| Event | Where | Leads to |
|---|---|---|
| `Hero primary CTA` | paid page hero | pricing section (`#cennik` / `#pricing`) |
| `Hero secondary CTA` | paid page hero; free audit page hero | "try for free" section on the paid page; the how-to guide from the audit page |
| `Nav CTA` | top bar of the paid page and its subpages | pricing section |
| `Architecture CTA` | both free pages; also the paid page and the archive page | from a free page: the paid page ("full version"). `cross_sell_clicks` counts only the free-page paths |

**PostHog.** PostHog records `$pageview` and `$pageleave`, session recordings and heatmaps. Autocapture is off, so it has no form or checkout events. AI notes on recordings come from PostHog's AI features, approved for the PostHog organisation on 2026-11-10.

## Metrics

### Free-skill funnel: page view → form started → signup

| Metric | Counts | Divided by | Umami call | Available |
|---|---|---|---|---|
| `lp_views` | Pageviews of the landing page: only stored paths that normalise to exactly one of the six landing paths | n/a | `get_website_metrics`, `type: "path"`, `search: "<page slug>"`, `limit: 500`. `search` also returns the other language and subpages (e.g. `/ux-design-skill/polityka-prywatnosci`), so keep only paths that normalise to exactly the landing path, separate the `/en/` paths, then add up the variants | now |
| `form_starts` | `Free skill form started` events whose `page` is the landing page | n/a | `get_event_properties`, `eventName: "Free skill form started"`, `propertyName: "page"` (`"surface"` splits hero from final form) | after release |
| `signups` | `Free skill submit: {surface}` events for the page's surfaces, on that page | n/a | Before release: `get_website_metrics`, `type: "event"`, `search: "Free skill submit"`, with `filters.path` set to each path variant that `lp_views` found. After release: `get_event_properties`, `eventName: "Free skill submit: <surface>"`, `propertyName: "page"` | now |
| `form_start_rate` | `form_starts` | `lp_views` | n/a | after release |
| `form_completion_rate` | `signups` | `form_starts`, same page, in a window entirely after release | n/a | after release |
| `signup_rate` | `signups` | `lp_views` | n/a | now |

Cross-check, not the definition: `run_funnel` with steps path `/free-homepage-ux-audit-skill*` → event `Free skill form started` → event `Free skill submit: free_audit_skill_*` (`windowMinutes: 60`) shows visitors who did each step in order in one visit. Its unit is visitors, not events, so label it that way and don't mix it with the rates above.

### Paid funnel: page view → checkout click → purchase

| Metric | Counts | Divided by | Umami call | Available |
|---|---|---|---|---|
| `lp_views` | Pageviews of `/ux-design-skill/` or `/en/ux-design-skill/`, as above | n/a | as above | now |
| `checkout_clicks` | `Pricing CTA` events on the paid page | n/a | `get_website_metrics`, `type: "event"`, `filters.path` per variant. Split by plan: `get_event_properties`, `eventName: "Pricing CTA"`, `propertyName: "plan"` (after release also `"page"` and `"language"`) | now |
| `purchases` | `Purchase` events, minus the test purchases listed below | n/a | `get_event_stats`, `filters.event: "Purchase"` for the total; `get_event_properties`, `eventName: "Purchase"`, `propertyName: "language"` (also `"price_name"`, `"currency"`, `"page"`); `get_events`, `event: "Purchase"` to list each one | after release |
| `checkout_click_rate` | `checkout_clicks` | `lp_views` of the paid page, same language | n/a | now |
| `purchase_per_click` | `purchases` in one language | `checkout_clicks` on the paid page in that language | n/a | after release |
| `purchase_rate` | `purchases` in one language | `lp_views` of the paid page in that language | n/a | after release |
| `revenue` | Sum of `amount` for each `currency` (PLN for Polish, USD for English). Never add the two currencies together. Whether `amount_paid` includes VAT is unconfirmed. | n/a | List purchases with `get_events`. If that doesn't return amounts: `get_event_properties`, `propertyName: "amount"`, then value × times seen | after release |

Splitting purchases by language is the same as splitting them by paid page, because each language has exactly one paid page with buy buttons.

### Context metrics

| Metric | What it is | Call | Available |
|---|---|---|---|
| `visitors` | Unique visitors and visits on a page. Context only, never a funnel denominator. | `get_website_stats`, `filters.path` per variant | now |
| `traffic_mix` | Visitors per channel or per referrer on a page | `get_website_metrics`, `type: "channel"` or `"referrer"`, `filters.path` | now |
| `device_mix` | Visitors per device type. `filters.device` splits any event count above the same way. | `get_website_metrics`, `type: "device"`, `filters.path` | now |
| `cross_sell_clicks` | `Architecture CTA` events on a free page ÷ that page's `lp_views` | `get_website_metrics`, `type: "event"`, `filters.path` | now |
| `free_to_paid_visits` | Visitors who viewed a free page and then the paid page, same language, in one visit | `run_funnel`, steps path free page → path paid page | now |
| `recorded_views` | PostHog `$pageview` events on a landing page: views by visitors who accepted statistics cookies | PostHog connector `exec`, HogQL through `execute-sql` on `events` where `event = '$pageview'`, grouped by `properties.$pathname` | after release |
| `recorded_share` | `recorded_views` ÷ `lp_views`: roughly how much traffic the recordings cover. Approximate, because the two tools count differently. | n/a | after release |

Recordings and their notes are evidence for why visitors drop. Cite them by recording, next to the counts. Never count them as conversions.

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
