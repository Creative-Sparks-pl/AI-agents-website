# Analytics metrics — agents.creativesparks.pl

These are the fixed definitions behind every number the improvement-cycle skill (`/cro-cycle`) reports, plus the questions the site owner wants answered. The agent uses only these definitions. For a question they don't cover, it answers "can't answer from the defined metrics" and does not make up a number. A change to a definition is reviewed like a code change.

- **Status:** approved by the owner on 2026-11-10.
- **Tracking release date:** 2026-11-10, deployed about 20:00 Warsaw time (site v1.0.0). Everything marked "after release" starts counting on that day; the first full day of after-release data is 2026-11-11.
- **Tracking release v1.2.0:** not shipped yet; its date goes here when it ships. Everything marked "tracking release v1.2.0" starts counting on that day and has no live data before it.
- **Umami:** `https://analytics.creativesparks.pl`, website ID `37a76f9d-7246-4d45-b832-3b35e78eee08`.

## Principles

- **Privacy limits what we can link, by design.** A purchase is never tied to an ad or a signup; that is a choice, not a gap to work around.
- **No made-up money values.** No "value per signup" to dress results up as revenue.
- **More signups is not automatically a win** if failed or bogus signups rise with them.
- **Distrust published "+40%" success stories.** When re-tested, such gains usually shrink.

## Ground rules

1. **Counts come from Umami.** Umami counts every visitor and needs no consent. PostHog adds recordings, heatmaps and notes on recordings. Never compute a rate from PostHog.
2. **Live site only.** Every Umami call filters `hostname: agents.creativesparks.pl`. The tracking script also runs on local development and on Vercel previews, and this filter drops them.
3. **Dates.** Use whole days in Europe/Warsaw. Pass `startAt` and `endAt` with the Warsaw offset (`+01:00` in winter, `+02:00` in summer), and pass `timezone: "Europe/Warsaw"` where the tool accepts it. When a window crosses a clock change, the start takes the start day's offset and the end the end day's (e.g. `2026-10-13T00:00:00+02:00` → `2026-10-26T23:59:59+01:00`). The PostHog project runs on UTC: pass PostHog the UTC times that cover the Warsaw window. The default window is the last 14 full days, compared with the 14 days before that; a shipped change is judged on its own windows instead (see "How we judge changes"). For an "after release" metric, a window that starts before the release date reports "no data yet", never zero.
4. **Raw counts, a range and one label.** Write every rate as `count ÷ denominator (percent)`, e.g. `3 ÷ 412 (0.7%)`. A rate with a 0 denominator is written `0 ÷ 0 (no views)`, never 0%. Two rates of one metric (before and after a change, or two groups such as visitors with and without interest) are compared with the range-and-label rule:
   - **Before shipping, the effect check.** Take p, the metric's rate in the before window, and n, its denominator in one window (views, for a per-view rate). The smallest difference one window can reliably show is δ ≈ 4 × √(p × (1 − p) ÷ n), in rate points. The ledger row records it before the change ships, e.g. "only about +6 points (10% → 16%) is detectable". Turned around, a difference δ needs about n ≈ 16 × p × (1 − p) ÷ δ² in each window; divided by the page's daily views, that gives the days each window needs.
   - **After the window, the range.** The difference is d = p₂ − p₁: after minus before, or, for two groups, the group in question minus the other. Its 95% range is d ± 1.96 × √(p₁ × (1 − p₁) ÷ n₁ + p₂ × (1 − p₂) ÷ n₂). For the range only, each window gets one extra conversion and one extra non-conversion: p = (conversions + 1) ÷ (denominator + 2), n = denominator + 2. Without them the range comes out too narrow at small counts: 0 ÷ 180 → 5 ÷ 180 would read "clearly better".
   - **One label.** **Clearly better:** the whole range is above zero. **Can't tell:** the range includes zero. **Clearly worse:** the whole range is below zero. For a metric that should go down, such as `submit_error_rate`, better and worse swap. "Can't tell" never means "no effect". Never call a change a win or a loss without a "clearly" label.
   - **Caution.** If either window has fewer than 30 conversions, add "few conversions" to the label: at such counts the range is rough. It doesn't change the label.
   - **Worked example** (28-day windows on one free page). Before: `signups` 36 ÷ 360 views (10.0%). Effect check: δ ≈ 4 × √(0.10 × 0.90 ÷ 360) = 4 × 0.0158 ≈ 0.063, so only a rise of about 6 points, to about 16%, shows clearly. After: 48 ÷ 350 (13.7%), +3.7 points (+37%). Range: p₁ = 37 ÷ 362 = 10.22%, p₂ = 49 ÷ 352 = 13.92%, d = 3.70 points; √(0.1022 × 0.8978 ÷ 362 + 0.1392 × 0.8608 ÷ 352) = √(0.000253 + 0.000340) ≈ 0.0244, and 1.96 × 0.0244 ≈ 4.8 points. The range runs from −1.1 to +8.5 points: it includes zero, so the label is **can't tell**, even with more than 30 conversions in each window. Had the after window been 60 ÷ 350 (17.1%), the range would run from +2.1 to +12.1 points: **clearly better**.
5. **Units are views and events, not people.** A reload counts as a second view. Two signups by the same person count as two, because events carry no email (by design). Form events count per form: each free page has two forms (hero and final) and the paid page has two "try for free" cards, so one view can produce more than one form start. Read form metrics per form (`surface`): `form_start_rate` is starts per form seen, not a share of visitors. Browser autofill can fill a form's email field while the visitor isn't in it, which leaves no start, so `signups` can exceed `form_starts` and `form_completion_rate` can pass 100%.
6. **Normalise page paths.** Umami can store the same page as `/ux-design-skill`, `/ux-design-skill/`, `/ux-design-skill/#cennik`, or with a query string. Cut everything from `#` or `?`, add a trailing `/` if it's missing, then add up the counts. A page's former paths (see the landing-page table) count as that page. Paths outside the six landing pages go into one "other pages" row. Don't drop them. Before a page's first recorded view, report it as "not live yet", not 0. To find that first view, run one `get_website_metrics` `type: "path"` listing from the site's first day (`get_website_daterange`) to the window start.
7. **The page decides the language.** A path starting with `/en/` is English; any other path is Polish. After release, the event `language` property gives the same answer, and for `Purchase` that property is the only source. Umami's own `language` dimension and filter hold the visitor's browser language (e.g. `pl-PL`) for every browser event. Never use them as the site language. (For `Purchase`, sent from the server, read the event's `language` property too, not the dimension.)
8. **Connector calls.** The parameter names below (`search`, `filters.path`, `filters.event`, `filters.hostname`, `eventName`, `propertyName`, `event`, `steps`, `windowMinutes`, the `*` wildcard in funnel steps) were checked against the Umami connector `@umami/mcp@0.2.0` on 2026-11-10. `filters.path` matches one exact stored path; `search` matches any path containing the text. `filters.device` and `filters.browser` take one value or several exact values separated by commas, e.g. `"laptop,desktop"` (checked 2026-11-12). The data-quality checks' `get_events` (`pageSize`, `page`; it returns `sessionId`, `path`, `createdAt` and `hasMore`, but no event labels) and `get_event_series` (`unit`, `limit`) were checked on 2026-11-12. So were `filters.utmTerm` and `filters.utmContent` (exact values, several separated by commas; the two together narrow to one ad), on `get_website_metrics` `type: "path"` and `type: "event"`.
9. **Which call gives which count.** Take page views only from `get_website_metrics` with `type: "path"`; `get_website_stats` reports different `pageviews` totals for the same filter, so use it only for visitors and visits. The channel, referrer and hostname rankings count visitors per exact path, so never add them up across path variants. For events, get the totals with no path filter first, then split by path only where needed, and check the parts add up to the total.
10. **Ad numbers from Meta come through one call.** Spend, link clicks and landing-page views per ad come from Meta's reporting API: `npm run report:meta-ads -- --since YYYY-MM-DD --until YYYY-MM-DD --campaign US-UXD-free-skills-2026Q4`, both days included. It is read-only: its key in `.env.local` can only read the ad account (`ads_read`), and the script never prints it. The ad account runs on Warsaw time, so `--since` and `--until` are the first and last Warsaw days of the Umami window (ground rule 3). The account also holds campaigns that aren't Creative Sparks, so always pass `--campaign`. Meta's numbers sit beside Umami's and never replace them (ground rule 1); "Ads" defines what is built from them.

## How we judge changes

At this site's traffic a before/after comparison shows only large effects (see the worked example in ground rule 4), so changes are chosen and judged the way the traffic allows:

1. **Fewer, bigger changes, backed by evidence.** A change that could plausibly move the main number a lot, backed by qualitative evidence, ranks above a small tweak. Evidence means recordings and their notes, failed-submit reasons, a check of the page on a phone inside the Instagram or Facebook browser, or answers to a one-question survey. One change at a time, so its effect can be judged on its own.
2. **Effect check first.** Before a change ships, its ledger row records the detectable effect (ground rule 4) and the end date. If a clear answer for the effect the change can plausibly have would need more than about 8 weeks per window, it is a **judgement change**: it ships on its evidence, its result is still read at the end date (expect "can't tell"), and it is never described as a test.
3. **Like with like.** A change is judged on 28 days after shipping against the 28 days before, when the page, the offer and the traffic mix stayed stable. The 14-day windows of ground rule 3 are for spotting changes, not for judging them. Compare ad days with ad days. The ledger row notes campaign launches and stops, email sends and traffic-mix shifts (question 9) inside its windows, and no window crosses a "Definition changes" entry that breaks the comparison.
4. **Read once, at the end date.** A result is read once, at the end date set before shipping, never earlier on a good reading.
5. **Guardrails catch harm.** A change is undone when its guardrail reads "clearly worse". The phone and in-app guardrails are warning signs first: "clearly worse" there is a reason to look (recordings, the page on a phone inside the Instagram app), then to undo once the harm is confirmed.
6. **Split tests only when they fit.** A split-traffic (A/B) test runs only when its planned sample (ground rule 4) fits a realistic horizon. It is read once at its planned end and never stopped early on a good reading.

What the evidence shows decides what we do:

| Evidence | Action |
|---|---|
| Broken tracking, impossible ratios (a failed data-quality check) or forms that fail | Fix it now. No experiment. |
| A usability failure reproduced: in several recordings, or on a phone | Fix it and keep watching the numbers. No claim of a measured effect. |
| "Clearly better", with stable traffic and no guardrail clearly worse | Keep it, labelled directional: a before/after comparison doesn't prove the change caused the rise. |
| A small improvement with low counts: the rate went up, but "can't tell" | No winner. The owner keeps or undoes it on the evidence it shipped on. |
| "Clearly worse" on the main number or a guardrail | Undo it (for the phone and in-app guardrails, after looking, as in point 5). |
| No conclusion at the end date | "Can't tell", never "no effect". |

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

All of these are Umami custom events, and together they are the tracking plan: an event not listed here is not used. Every row says:
- **Fires when:** the exact action that sends it, and where.
- **Counted once per:** what one event stands for, so nothing counts twice.
- **Properties:** the labels it carries. They never hold anything the visitor typed.
- **Informs which decision:** what a change in it would lead us to do.
- **Test:** the test file that checks it; "none" means only the code guards it.
- **Recorded since:** "release" is 2026-11-10; "tracking release v1.2.0" is the date at the top of this file.

Any change to a row is logged under "Definition changes". "How to add a tracked element" says how a row is added.

### Funnel events

The steps from a view to a signup or a purchase. A form's first step, `Free skill form seen`, is listed with the other seen events below.

| Event (exact name) | Fires when | Counted once per | Properties | Informs which decision | Test | Recorded since |
|---|---|---|---|---|---|---|
| `Free skill form started` | The first change to a form's email field while that field has focus: typing, pasting, or picking an autofill suggestion in it. A value that autofill writes into another form's field, one the visitor isn't in, doesn't count and doesn't use up that form's start. | form per page load | `skill` (`audit` or `planning`), `language` (`pl` or `en`), `surface`, `page` | Whether visitors who see a form try it: if few do, the offer or the message around the form needs work | `tests/tracking/umami-events.spec.ts` | release; needs the field in focus from tracking release v1.2.0 |
| `Free skill submit: {surface}` (one event name per surface, e.g. `Free skill submit: free_audit_skill_hero`) | `/api/subscribe` accepted the email and returned the download link: a successful signup. Failed or invalid submits don't fire it. | accepted signup | same four as above | The free pages' main number (`signup_rate`); against form starts, whether the form itself loses visitors | `tests/tracking/umami-events.spec.ts` | the name: before release; the properties: release |
| `Free skill submit error` | A submit fails. `reason` is what the visitor was told: `invalid_email` (the form's own email check failed, or the server rejected the address), `not_configured` (signups unavailable: the server lacks its Easytools key), `server_error` (any other failed answer), `offline` (no answer at all, e.g. no connection) | failed submit | the four above, plus `reason` | Whether something is broken (fix it first, no experiment) or the field trips visitors up (many `invalid_email`) | `tests/tracking/umami-events.spec.ts` | tracking release v1.2.0 |
| `Pricing CTA` | Click on a plan's buy button, which opens the Easytools checkout (`cart.creativesparks.pl`). Sent by Umami's own `data-umami-event` attribute. | click | `plan` (`Solo`, `Studio`, `Agencja` in Polish, `Agency` in English), `language`, `page` | Whether visitors who reach the prices start a checkout, and on which plan. Never a win on its own: it can rise with no sales | `tests/tracking/umami-events.spec.ts` (checks the attributes and the checkout link, not a sent click) | `plan`: before release; `language` and `page`: release |
| `Purchase` | Sent server-side by `/api/easytools-webhook` when Easytools reports `single_product_bought` with `amount_paid` above 0. Free-skill grants (`product_assigned`) and zero-price checkouts are not counted. | paid purchase Easytools reports | `amount`, `currency`, `language` (Easytools `lang`), `product_id`, `price_name`, `page` (present only if Easytools sends the checkout link's `page` parameter back in `custom_params`) | The paid page's main number (`purchases`) and `revenue` | `tests/unit/purchase-event.spec.ts` (checks the event built from a webhook; nothing is sent) | release |

Umami files each `Purchase` under the path in its `page` property, or under `/purchase` when `page` is missing.

### Secondary clicks

These are context, never a conversion. Two of them are also a funnel step: `Hero primary CTA` and `Nav CTA` jump to the prices, so the paid-page path counts them under "reached pricing" (`pricing_jumps`). `Architecture CTA` also feeds the `cross_sell_clicks` guardrail, and `Hero video` and `Sample output` are the two interest actions behind `Interest shown`. None carries a `page` property: the event's own path gives the page. The four older clicks are sent by click handlers written into their buttons; the three new ones by the shared script's click attribute (see "How to add a tracked element").

The top bar's links are hidden below 768 px wide, so `Nav link` comes only from wider screens; its `Nav CTA` button is hidden below 640 px.

| Event (exact name) | Fires when | Counted once per | Properties | Informs which decision | Test | Recorded since |
|---|---|---|---|---|---|---|
| `Hero primary CTA` | Click on the paid page hero's main button, which jumps to the pricing section (`#cennik` / `#pricing`) | click | none | How many paid-page visitors go to the prices straight from the hero | none | before release |
| `Hero secondary CTA` | Click on the paid page hero's second button, which jumps to the "try for free" section on the paid page | click | none | How many paid-page visitors turn to the free skills from the hero | none | before release |
| `Nav CTA` | Click on the top bar's button, on the paid page and its subpages; it leads to the pricing section | click | none | How many visitors jump to the prices from the top bar | none | before release |
| `Architecture CTA` | Click on the "full version" button: on both free pages, where it leads to the paid page; also on the paid page and the archive page. `cross_sell_clicks` counts only the free-page paths | click | none | Whether free-page visitors still find the paid page (the `cross_sell_clicks` guardrail) | none | before release |
| `Hero video` | Click on the hero's video panel, on every landing page; the video opens over the page | click | none | Whether the video earns its place in the hero (few opens: change or move it) | `tests/tracking/umami-events.spec.ts` | tracking release v1.2.0 |
| `Nav link` | Click on any link in the top bar's link list, on every page with a top bar | click | `link`: the address the link points to, e.g. `/en/ux-design-skill/how-it-works/` (leaves the page) or `/en/ux-design-skill/#pricing` (stays on it) | Whether wider-screen visitors leave through the top bar instead of the page's own path, e.g. through "How it works" now that the hero's playbook link is gone | `tests/tracking/umami-events.spec.ts` | tracking release v1.2.0 |
| `Sample output` | Click on a sample-output card, on every landing page; it opens an example file in a new tab | click | `output`: the card's link, e.g. `/examples/website-planning-skill_project_plan_en.html#strategy`. Keep the `#section` (unlike page paths in ground rule 6): the planning page's three cards open the same file at different sections | Which samples draw visitors, to choose which to show first | `tests/tracking/umami-events.spec.ts` | tracking release v1.2.0 |

### Seen and interest events

The shared script `src/scripts/umami-attributes.ts` sends these. A seen event fires when at least half of its element is on screen, once per element per page load; scrolling away and back doesn't send it again. If Umami hasn't loaded yet when the element comes into view, it reports the next time it does. `Interest shown` fires on the first interest action in a page load; each of those clicks still sends its own event too.

| Event (exact name) | Fires when | Counted once per | Properties | Informs which decision | Test | Recorded since |
|---|---|---|---|---|---|---|
| `Free skill form seen` | At least half of a signup form is on screen: the hero and final forms on the free pages, the forms in the paid page's two "try for free" cards | form per page load | `skill`, `language`, `surface`, `page`, with the same values as the other form events | Whether visitors never reach a form (a placement fix, e.g. the form higher on phones) or see it and pass (a message or offer fix) | `tests/tracking/umami-events.spec.ts` | tracking release v1.2.0 |
| `Pricing seen` | At least half of the paid page's first price card is on screen. It sits on the first card, not the whole section, because on phones the section is too tall ever to be half on screen: it means "a price was on screen". The archive page has the same section; it counts under "other pages". | page load | none; the event's own path gives the page | Whether paid-page visitors never reach the prices (shorten or reorder what's above them) or reach them and don't pick a plan (the plans or the prices) | `tests/tracking/umami-events.spec.ts` | tracking release v1.2.0 |
| `Interest shown` | The first interest action in a page load: a click on a sample-output card or on the hero video | page load, however many interest actions follow | `page` (the path, like the form events' `page`), `language` (`pl` or `en`, from the path) | Whether visitors look at what they'd get before signing up. Shown next to signups; a change is never judged on it alone | `tests/tracking/umami-events.spec.ts` | tracking release v1.2.0 |

### PostHog

PostHog records `$pageview` and `$pageleave`, session recordings and heatmaps. Autocapture is off, so it has no form or checkout events. AI notes on recordings come from PostHog's AI features, approved for the PostHog organisation on 2026-11-10.

## How to add a tracked element

A new click or seen event needs no code of its own: an attribute on the element, a row in the events tables, and a test.

1. **Attribute.** The shared script `src/scripts/umami-attributes.ts`, loaded on every page, reads three attributes:
   - **Click:** `data-umami-click="Event name"`, plus one `data-umami-click-<label>="value"` per label. It sends the event when the element is clicked and leaves the click itself alone. Don't use Umami's own `data-umami-event` for new clicks: it holds a same-tab link until Umami answers, and on an `href="#"` trigger it follows the `#`. (`Pricing CTA` keeps it.)
   - **Seen:** `data-umami-seen="Event name"`, plus `data-umami-seen-<label>="value"`. It fires once per page load when half of the element is on screen. An element taller than twice the screen can never be half on screen, so put the attribute on a smaller part of it, as `Pricing seen` sits on the first price card.
   - **Interest:** `data-umami-interest` (no value) makes a click on the element count toward `Interest shown`. Pair it with a click attribute, so the action also reports itself.

   Name the event in the style of the ones above, saying what happened. Label values are fixed text written in the page, never anything the visitor typed. An event that depends on what the visitor does in a field or on a request's answer (like the form start and the submit error) stays in the component's own code instead.
2. **Metrics line.** Add the event's row to the right events table, with every column filled and "recorded since" set to the release that ships it, and log it under "Definition changes". A metric that uses the event is defined under Metrics.
3. **Test.** Add a case to `tests/tracking/umami-events.spec.ts` that checks the exact name and label values, and that the event fires only as often as "counted once per" says. Then run the suites `docs/testing.md` lists for a tracking change.

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
| Free pages: each free page, per language | `signup_rate` | signups per view, written `signups ÷ lp_views (percent)`. A reload or a second visit is another view. | `signups` as a count; `interest_rate` |
| Paid page, per language | `purchases` | a count, not a rate: purchases are too few for a rate to mean anything | `revenue` per currency; the paid-page path, which explains why it moves; `interest_rate` |

- Checkout clicks are never the paid page's main number: they can rise with no sales.
- Signups from the paid page's two "try for free" cards use the `signup_rate` definition and belong to the free scorecard. On the paid page they are context, never its main number.

| Metric | Role | Counts | Divided by | Umami call | Available |
|---|---|---|---|---|---|
| `signup_rate` | main number of each free page | `signups` | `lp_views` of the same page. Unit: signups per view | n/a | now |

### Funnel steps

#### Free-skill funnel, per form: page view → form seen → form started → signup

Read each form on its own: the hero and the final form of each free page, per page and language. The paid page's two "try for free" cards use the same rows, as context for that page. The last step, `signups`, is a business outcome, and `signup_rate` is the main number; both are defined above. The steps explain why `signup_rate` moves, and each points to a different fix: few forms seen → placement; seen but not started → the offer or the message; started but not sent → the form itself; failed submits → something broken, or a field that trips visitors up.

| Metric | Role | Counts | Divided by | Umami call | Available |
|---|---|---|---|---|---|
| `lp_views` | funnel step: the first step, and the denominator of every per-view rate | Pageviews of the landing page: only stored paths that normalise to exactly one of the six landing paths | n/a | One `get_website_metrics` listing per window: `type: "path"`, `limit: 500`, hostname filter, no `search`. Normalise every path, add up the variants of each of the six landing paths (Polish and English separately), and put the rest in "other pages" | now |
| `forms_seen` | funnel step | `Free skill form seen` events for one form (`surface`) on one page | n/a | Per page: `get_event_properties`, `eventName: "Free skill form seen"`, `propertyName: "page"`. Per form: the same with `propertyName: "surface"` and `filters.path` set to each stored path of that page; both languages share the surface names, so the path picks the language. A page's forms must add up to its `page` count | tracking release v1.2.0 |
| `form_seen_rate` | funnel step: view → form seen | `forms_seen` for one form | `lp_views` of the same page. Unit: forms seen per view, at most 100%, since a form reports once per view | n/a | tracking release v1.2.0 |
| `form_starts` | funnel step | `Free skill form started` events for one form on one page | n/a | As `forms_seen`, with `eventName: "Free skill form started"` | after release; needs the field in focus from tracking release v1.2.0 |
| `form_start_rate` | funnel step: form seen → form start | `form_starts` for one form | `forms_seen` of the same form. Unit: starts per form seen | n/a | tracking release v1.2.0. Before it, this was `form_starts ÷ lp_views` per page, and starts included autofill doubles (Known limits): never compare across that date |
| `form_completion_rate` | funnel step: form start → signup | `signups` from one form: `Free skill submit: <surface>` on that page | `form_starts` of the same form. Can pass 100% (ground rule 5) | `signups` per form: `get_event_properties`, `eventName: "Free skill submit: <surface>"`, `propertyName: "page"` | after release; never compared across tracking release v1.2.0, when starts began to need focus |
| `submit_errors` | funnel step | `Free skill submit error` events for one form on one page | n/a | As `forms_seen`, with `eventName: "Free skill submit error"`. By reason: `propertyName: "reason"` with `filters.path` set to each stored path of the page, which gives both forms of the page together | tracking release v1.2.0 |
| `submit_error_rate` | funnel step: submit → failed submit | `submit_errors` for one form | Submit attempts on the same form: `submit_errors` + `signups`. Unit: failed submits per attempt. A visitor who fixes a typo and sends again counts as one failed and one successful attempt. By reason, per page: each `reason`'s count ÷ the attempts on both forms of the page | n/a | tracking release v1.2.0 |

#### Paid-page path: page view → reached pricing → started checkout → bought

Read per language, each step as a count and per view of the paid page. The path shows whether visitors never reach the prices, reach them and don't pick a plan, or pick one and don't buy. A rise in checkout clicks alone is never a win. The last step, `purchases` and `revenue` (per currency, and per plan through `price_name`), is defined under Business outcomes; `purchases` is also the paid page's main number.

| Metric | Role | Counts | Divided by | Umami call | Available |
|---|---|---|---|---|---|
| `lp_views` | funnel step 1, viewed the page | Pageviews of `/ux-design-skill/` or `/en/ux-design-skill/`, as above | n/a | as above | now |
| `pricing_seen` | funnel step 2, reached pricing | `Pricing seen` events on the paid page: views in which a price was on screen | n/a | `get_website_metrics`, `type: "event"`, `search: "Pricing seen"`, `filters.path` per stored path of the paid page. The event has no `page` property, so its path gives the page (normalise as ground rule 6) | tracking release v1.2.0 |
| `pricing_seen_rate` | funnel step: view → reached pricing | `pricing_seen` | `lp_views` of the paid page, same language. Unit: per view | n/a | tracking release v1.2.0 |
| `pricing_jumps` | funnel step 2, reached pricing: how many got there by a button | `Hero primary CTA` + `Nav CTA` clicks on the paid page, which jump straight to the prices. Clicks on its subpages count under "other pages". Also read per view: `pricing_jumps ÷ lp_views` | n/a | `get_website_metrics`, `type: "event"`, `filters.path` per stored path of the paid page | now |
| `checkout_clicks` | funnel step 3, started checkout | `Pricing CTA` events on the paid page | n/a | `get_website_metrics`, `type: "event"`, `filters.path` per variant. Split by plan: `get_event_properties`, `eventName: "Pricing CTA"`, `propertyName: "plan"` (after release also `"page"` and `"language"`) | now |
| `checkout_click_rate` | funnel step: view → checkout click | `checkout_clicks` | `lp_views` of the paid page, same language | n/a | now |
| `purchase_per_click` | funnel step: checkout click → purchase | `purchases` in one language | `checkout_clicks` on the paid page in that language | n/a | after release |
| `purchase_rate` | funnel step 4, bought: view → purchase | `purchases` in one language | `lp_views` of the paid page in that language | n/a | after release |

Never add `pricing_jumps` to `pricing_seen`: a jump brings the prices on screen, so that view usually sends `Pricing seen` too. Before tracking release v1.2.0 the jumps are the only sign that visitors reached the prices.

Shown beside the path, as context: the other path on the paid page and the ways out of it.

| Metric | Role | What it is | Call | Available |
|---|---|---|---|---|
| `card_signups` | context on the paid page: the other path | `signups` from the paid page's two "try for free" cards (`ux_design_skill_audyt`, `ux_design_skill_planning`), per language, with `Hero secondary CTA` clicks (the hero's jump to the cards) beside them. They belong to the free scorecard | As `signups`, for the two card surfaces. `Hero secondary CTA`: `get_website_metrics`, `type: "event"`, `filters.path` per stored path of the paid page | now |
| `video_opens` | context: a side path, on every landing page | `Hero video` clicks on the page; also read per view, `video_opens ÷ lp_views` | `get_website_metrics`, `type: "event"`, `search: "Hero video"`, `filters.path` per stored path of the page | tracking release v1.2.0 |
| `nav_link_clicks` | context: ways out through the top bar, on every landing page | `Nav link` clicks on the page, by `link`. On the paid page, the "how it works" link is `link` `/ux-design-skill/instrukcja/` or `/en/ux-design-skill/how-it-works/`. Wider screens only: the top bar's links are hidden below 768 px | `get_event_properties`, `eventName: "Nav link"`, `propertyName: "link"`, `filters.path` per stored path of the page | tracking release v1.2.0 |

### Guardrails

Each ledger row names one guardrail for its change; the phone and in-app signup rates are checked after every change as well.

| Metric | Role | What it is | Call | Available |
|---|---|---|---|---|
| `cross_sell_clicks` | guardrail on the free pages: a change aimed at signups must not cut the path to the paid page | `Architecture CTA` events on a free page ÷ that page's `lp_views` | `get_website_metrics`, `type: "event"`, `filters.path` | now |
| `phone_signup_rate` | guardrail after any change, on every page with a form: must not clearly drop | `signup_rate` on phones: `signups` ÷ `lp_views`, both counted with `filters.device: "mobile"` | The calls behind `signups` and `lp_views`, each with `filters.device: "mobile"` added | now |
| `in_app_signup_rate` | guardrail after any change, on every page with a form: must not clearly drop | `signup_rate` in in-app browsers: `signups` ÷ `lp_views`, both counted with `filters.browser: "instagram,facebook,chromium-webview,ios-webview"` | The calls behind `signups` and `lp_views`, each with that `filters.browser` added | now |

Most visitors to the English pages come on phones, mostly inside the Instagram or Facebook app, so a change that works on a computer can still hurt there. "Clearly drop" means the label "clearly worse" under ground rule 4. The two segment guardrails are warning signs, never a result on their own: their counts are small, so a drop is a reason to look (recordings, the page opened on a phone inside the Instagram app) before it is a reason to undo.

### Context

| Metric | Role | What it is | Call | Available |
|---|---|---|---|---|
| `visitors` | context | Unique visitors and visits on a page. Context only, never a funnel denominator. | `get_website_stats`, `filters.path` per variant | now |
| `traffic_mix` | context | Visitors per channel or per referrer on a page | `get_website_metrics`, `type: "channel"` or `"referrer"`, `filters.path` | now |
| `device_mix` | context | Visitors per device type. The segments under "Device and in-app splits" split any count above. | `get_website_metrics`, `type: "device"`, `filters.path` | now |
| `free_to_paid_visits` | context | Visitors who viewed a free page and then the paid page, same language, in one visit | `run_funnel`, steps path free page → path paid page | now |
| `interest_rate` | context: a leading signal, shown beside the main number on every landing page | Views with at least one interest action (opened a sample output or the hero video) ÷ `lp_views`, per page and language. `Interest shown` counts them: it fires once per view, however many interest actions follow. Unit: per view, like `signup_rate`. A change is never judged on it alone until the interest check below says interested visitors sign up more often | `get_event_properties`, `eventName: "Interest shown"`, `propertyName: "page"` (add a missing trailing slash; the page gives the language), divided by the same page's `lp_views` | tracking release v1.2.0 |

Recordings and their notes are evidence for why visitors drop. Cite them by recording, next to the counts. Never count them as conversions.

**Interest check.** Before `interest_rate` may count when a change is judged, the site's own data must show that visitors who open a sample or the video sign up more often than those who don't. Run it per free page once a few weeks of tracking release v1.2.0 data exist, over one window:
1. `run_funnel`, steps path `<page path>*` → event `Interest shown` → event `Free skill submit: <prefix>*`, `windowMinutes: 60`, where `<prefix>` is the page's surface start (`free_audit_skill_` or `free_planning_skill_`), e.g. path `/en/free-website-planning-skill*` → event `Interest shown` → event `Free skill submit: free_planning_skill_*`. Step 2 gives the visitors who showed interest (I), step 3 those of them who then signed up (IS).
2. `run_funnel`, steps path `<page path>*` → event `Free skill submit: <prefix>*`, `windowMinutes: 60`. Step 1 gives all the page's visitors (N), step 2 those who signed up (S).
3. Signup rate with interest = IS ÷ I; without = (S − IS) ÷ (N − I). Compare the two with ground rule 4.

The unit is visitors, not views: Umami can't tie two events to one page view. A visitor who signs up first and opens a sample afterwards counts as "interest, no signup", so the check leans against interest. Only a clearly higher signup rate with interest lets `interest_rate` count; log that under Definition changes.

#### Device and in-app splits

For each landing page, `signup_rate` and `interest_rate` are also shown per segment. Add the segment's filter to every call behind both counts of a rate, so the views and the events cover the same visitors; `get_website_metrics` and `get_event_properties` both take it.

| Segment | Filter | Note |
|---|---|---|
| phone | `filters.device: "mobile"` | |
| computer | `filters.device: "laptop,desktop"` | Umami's two computer types, in one call |
| in-app browser | `filters.browser: "instagram,facebook,chromium-webview,ios-webview"` | The Instagram and Facebook apps, and pages opened inside other apps on Android (`chromium-webview`) and iOS (`ios-webview`). On Android, visits from the Instagram app show as `chromium-webview` (referrer `instagram.com`). The rest of the traffic is the page's total minus this segment |

`tablet` (one visitor a month) belongs to neither device group and shows only in `device_mix`. Segments are warning signs, never a result on their own: their counts are small. The values come from `get_website_metrics` `type: "device"` and `type: "browser"` listings (2026-11-12); a new in-app browser name in that listing joins the filter, logged under Definition changes.

### Data quality

| Metric | Role | What it is | Call | Available |
|---|---|---|---|---|
| `recorded_views` | data quality: feeds `recorded_share` | PostHog `$pageview` events on a landing page: views by visitors who accepted statistics cookies | PostHog connector `exec`, HogQL through `execute-sql` on `events` where `event = '$pageview'`, grouped by `properties.$pathname` | after release |
| `recorded_share` | data quality: how far recordings stand for all visitors | `recorded_views` ÷ `lp_views`: roughly how much traffic the recordings cover. Approximate, because the two tools count differently. | n/a | after release |

Free-funnel cross-check, not a definition: `run_funnel` with steps path `/free-homepage-ux-audit-skill*` → event `Free skill form started` → event `Free skill submit: free_audit_skill_*` (`windowMinutes: 60`) shows visitors who did each step in order in one visit. Its unit is visitors, not events, so label it that way and don't mix it with the funnel rates. It is not the funnel-order check below, which compares event counts.

#### Data-quality checks

Run these four checks before reading any numbers: at the start of every improvement cycle, over the cycle's windows, and once a few days after each tracking release, over the days since it. They use Umami only, with the hostname filter and Warsaw days of ground rules 2 and 3. Report them first, each as passed, failed or flagged, with its numbers. Nothing is concluded from the numbers a failed check affects until its cause is found and fixed. An odd volume is flagged, not failed.

1. **Funnel order.** Per form: `signups` ≤ `forms_seen`, `form_starts` ≤ `forms_seen`, and `forms_seen` ≤ `lp_views` of its page. On the paid page, per language: `pricing_seen` ≤ `lp_views` and `checkout_clicks` ≤ `lp_views`. `signups` can exceed `form_starts` (ground rule 5), so that pair is shown, not checked. A window before tracking release v1.2.0 has no `forms_seen` or `pricing_seen`, so only `checkout_clicks` ≤ `lp_views` is checked.
   - **Call:** the calls behind those metrics (see Funnel steps), over the same window.
   - **A failure** stops conclusions from that form's or page's funnel numbers.
2. **Duplicates.** These events fire at most once per form or per page load, so two of the same event in one session, on the same page, less than 2 s apart, are a duplicate: `Free skill form started` (from tracking release v1.2.0 on; before it, autofill pairs are a known limit), `Free skill submit: <surface>`, `Interest shown`, `Pricing seen`. Umami's event list shows each event's name, path, session and time, not its labels, so two starts on one page count as a pair even from the page's two forms; since a start needs the field in focus, no visitor makes two within 2 s. For signups the event name carries the form. `Free skill form seen` is left out: a page's two forms can come on screen together, and the list can't tell them apart. The funnel-order check catches a form seen more often than its page was viewed.
   - **Call:** `get_events`, `event: "<name>"` (for signups `search: "Free skill submit:"`, which lists every form's signups and no submit errors), `pageSize: 100`, paging with `page` until `hasMore` is false. Group the list by `sessionId` and normalised `path` (ground rule 6), then compare the `createdAt` times within each group.
   - **A failure** (any pair) stops conclusions from that event's numbers.
3. **Missing labels.** Every funnel event carries `page` and `language`: `Free skill form seen`, `Free skill form started`, each `Free skill submit: <surface>`, `Free skill submit error`, `Pricing CTA`, `Interest shown`. `Purchase` must carry `language`; its `page` can be missing by design (Known limits). Events from before the 2026-11-10 release carry no labels, so the check starts there.
   - **Call:** the total from `get_website_metrics`, `type: "event"`, `search: "<name>"` (for `Purchase`, the `purchases` total). Then `get_event_properties`, `eventName: "<name>"`, `propertyName: "page"`, and again with `"language"`, and add up the values of each. Missing = total − that sum.
   - **A failure** (any event missing a label) stops conclusions from the per-page and per-language numbers built on that event.
4. **Odd volume.** For each event, the median daily count in the window lies between 0.5× and 2× its median daily count over the 14 days before the window. When a release falls inside the window, the days since the release are compared with the 14 days before it the same way.
   - **Call:** `get_event_series`, `unit: "day"`, `timezone: "Europe/Warsaw"`, `limit: 50`, from 14 days before the window start (or before the release) to the window end. A day missing from the series counts as 0. An event whose median over those 14 days is 0, or that has fewer than 14 days of data, can't be checked this way; show its daily counts instead.
   - **A flag** is reported, not failed: say whether page views moved the same way (more or less traffic, a campaign starting or stopping, from `lp_views` and `traffic_mix`) or a tracking change is the likely cause.

## Ads

Ads are reported apart from the pages, per campaign, ad set and ad. Umami gives the site's counts for the visits each ad brought; Meta's report (ground rule 10) gives what the ad cost and what Meta saw. Site counts are never replaced by Meta's: Meta's numbers sit beside them as a comparison.

### Ad tags

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

- One ad still sends old tags: `home-ux-audit-light` in US-Skill-Audit-Prospecting arrives as `utm_campaign=EN-UXD-faza1-2026Q2-Audyt`, `utm_content=free-audit-skil`. Its `utm_term` is still right, so count it by `utm_term`, never by `utm_campaign` or `utm_content` alone. Per ad, Umami's `free-audit-skil` in ad set `120243755481140302` is the report's `home-ux-audit-light` in that ad set.
- Add new ad sets to the table when they launch (their ID shows in Ads Manager's "Ad set ID" column, in the report's "Ad set ID (utm_term)" column, or as a new `utm_term` value in Umami).
- Ad set names can change in Ads Manager; IDs don't. The report now shows the two US ad sets as `US-Skill-Audit-Claude-Prospecting` and `US-Skill-Website-Planning-Claude-Prospecting`. Match ad sets by ID.

### An ad's visitors in Umami

Every Umami number under "Ad numbers" is counted for one UTM group: the hostname filter (ground rule 2) plus these filters, added to every call.
- **Ad set:** `filters.utmTerm: "<ad set ID>"`.
- **Ad:** `filters.utmTerm` and `filters.utmContent: "<ad name>"` together. One ad name can run in more than one ad set (`home-ux-audit-light` runs in both audit ad sets), so never use `utmContent` alone.
- **Campaign:** `filters.utmTerm` with the campaign's ad set IDs from the table, separated by commas. Never `filters.utmCampaign`: the old-tag ad would drop out.

Only the page the ad opened carries the tags: its view, a reload, the events on that page, and a jump within it (e.g. to `#pricing`). A page the visitor opens next in the same visit doesn't. So a group's signups are those made on the page the ad opened. A visitor who signs up on another page, or comes back later, is not in the group, so site-counted signups per ad are a floor. (Checked 2026-11-12: tagged views and events appear only on the pages the ads open.) The `type: "utmTerm"` and `type: "utmContent"` listings count visitors, not views: use them to find a group's values, never as its views.

### Ad numbers

Per campaign, ad set and ad, over the same Warsaw days on both sides (ground rules 3 and 10).

| Metric | Role | Counts | Divided by | Source and call | Available |
|---|---|---|---|---|---|
| `ad_lp_views` | funnel step: the group's landing visits, counted as views | Umami page views of the six landing pages that carry the group's tags | n/a | Umami: `get_website_metrics`, `type: "path"`, `limit: 500`, the group's filters. Normalise the paths (ground rule 6) and add up the landing paths; a tagged view on another path goes to "other pages" | now |
| `ad_signups` | business outcome (free), per group: the site-counted signups | `Free skill submit: {surface}` events in the group, from any form | n/a | Umami: `get_website_metrics`, `type: "event"`, `search: "Free skill submit:"`, the group's filters; add up the rows, one per form. Not `get_event_properties`: events before the 2026-11-10 release carry no `page` | now |
| `signup_rate` per group | funnel step: the group's signups per landing view | `ad_signups` | `ad_lp_views` of the same group. Unit: per view, like a page's `signup_rate` | n/a | now |
| `interest_rate` per group | context | `Interest shown` events in the group | `ad_lp_views` of the same group | Umami: `get_website_metrics`, `type: "event"`, `search: "Interest shown"`, the group's filters | tracking release v1.2.0 |
| `ad_spend` | context, from Meta | What Meta charged for the group, in PLN (the ad account's currency) | n/a | Meta: the report's "Spend". An ad is one row; an ad set adds up the rows with its ID in "Ad set ID (utm_term)"; the campaign adds up all its rows | now |
| `ad_link_clicks` | context, from Meta | Clicks on the ad's link, as Meta counts them | n/a | Meta: the report's "Link clicks", added up as for `ad_spend` | now |
| `meta_lp_views` | context, from Meta | Meta's landing-page views: clicks after which Meta's pixel loaded on the page. The site loads the pixel only after marketing consent, so visitors who don't accept are missing from it | n/a | Meta: the report's "Landing-page views" (0 when Meta reports none), added up as for `ad_spend` | now |
| `cost_per_signup` | main number for ads: the cost per site-counted signup | `ad_spend` | `ad_signups` of the same group, same days. Written `spend ÷ signups (PLN per signup)`; with no signups, e.g. `12.98 PLN ÷ 0 (no signups)`, never 0 or infinite | n/a | now |
| `handoff_ratio` | data quality: the handoff ratio, whether the site and Meta see the same visitors arrive | `ad_lp_views` | `meta_lp_views` of the same group, e.g. `41 ÷ 6 (6.8×)`; with no Meta views, e.g. `24 ÷ 0 (no Meta views)` | n/a | now |
| `meta_lead_gap` | data quality: the gap between Meta-attributed results and the site's counts | Meta's leads for the group: the campaign's result | `ad_signups` of the same group, e.g. `Meta 6 ÷ site 18 (33%)` | Meta: the `lead` action in the same reporting rows, Ads Manager's "Leads". `report:meta-ads` doesn't print it yet; until it does, read Leads per ad in Ads Manager for the same days, or write "Meta leads not read" | now |

The report counts Meta's actions (landing-page views, leads) with each ad set's own attribution setting, as Ads Manager does, so its numbers match Ads Manager's for the same days.

Reading the ad numbers:
- **Site counts come first.** `ad_signups` and `cost_per_signup` are an ad's result. Meta's leads are only a comparison beside them, never counted as signups. Meta counts a lead only from visitors who accepted marketing cookies, and credits it to an ad by its own attribution rules, not by the tags. So it can count fewer leads than the site, or credit an ad with a signup made on a later visit. Report both, never one as the other.
- **The handoff ratio sits above 1.** `meta_lp_views` needs marketing consent, so the ratio is roughly 1 ÷ the share of ad visitors who accept marketing cookies. Read it for change, ad against ad or window against window, not for its level. Meta views at 0 while the site has tagged views, or a sudden rise, means Meta stopped seeing visitors: the pixel, the cookie banner or the ad's link. A fall towards 1 or below means the site lost views: ad blockers, the tracking script, or a link without tags. Show `ad_link_clicks` beside it: tagged views far below link clicks mean visitors leave before the page loads.
- **Compare ads on `signup_rate`,** with ground rule 4. `cost_per_signup` follows from spend and signups and has no range of its own. A single ad gets few signups, so read ad sets first; one ad's numbers are a hint, never a result.
- **Example** (2026-10-29 to 2026-11-11, ad set `120249754635630302`, US website planning). The report's four rows for that ad set add up to 8.20 + 2.93 + 82.39 + 1.03 = 94.55 PLN. Umami has 18 signups in the group: 15 from the hero form, 2 from the final form, 1 from a paid-page card. `cost_per_signup` = 94.55 PLN ÷ 18 (5.25 PLN per signup). Beside it: `ad_lp_views` 41 against `meta_lp_views` 6 (handoff ratio 6.8×), and Meta 6 leads against the site's 18 (33%).

## Definition changes

Every change to an event or a metric gets an entry: when it took effect, what changed, why, and which comparisons it breaks. Nothing an entry lists under "Comparisons it breaks" is compared across its date: both windows must fall on the same side of it. Earlier history, up to the 2026-11-10 release, is covered by "Recorded since" in the events tables and by Known limits. Oldest first; add new entries at the bottom, dated the day the change took effect on the live site.

| Date | What changed | Why | Comparisons it breaks |
|---|---|---|---|
| 2026-11-12 | **The owner's main browser is no longer counted.** Umami's opt-out (`umami.disabled` in the site's local storage) is on in the owner's main Chrome, so that browser sends Umami nothing. The owner's phone is not opted out (owner's decision): its visits still count, including previews opened inside the Instagram or Facebook app. | The owner's own checks shifted rates on low-traffic pages, and nothing could filter them out. | Views, events and rates on a page across this date: before it they include the owner's visits from that browser. On pages with few views, a few checks can move a rate. |
| tracking release v1.2.0 | **A form start needs the field in focus.** `Free skill form started` counts only a change made while the email field has focus. Before, any first change counted, including autofill writing into a form the visitor wasn't in. | On 2026-11-11, 19 of 32 visits with a form start logged two starts (hero and final) within 1.7 s, nearly all in phone in-app browsers: autofill filling both email fields. It made the final forms look broken and inflated starts. | `form_starts`, `form_start_rate` and `form_completion_rate`, per page and per form: starts before this date include autofill doubles. |
| tracking release v1.2.0 | **Form starts are read per form seen.** `form_start_rate` becomes form starts ÷ forms seen (`Free skill form seen`) for each form, instead of form starts ÷ `lp_views` per page. | It separates visitors who never reached a form from those who saw it and passed: the first need a placement fix, the second a message fix. | `form_start_rate` across this date: the denominator changes, and before it there is no count of forms seen. |
| tracking release v1.2.0 | **Seven new events:** `Free skill form seen`, `Free skill submit error`, `Hero video`, `Nav link`, `Sample output`, `Pricing seen`, `Interest shown` (see Events). | The 2026-11-12 improvement cycle could not tell why visitors leave the free pages before the form: nothing recorded whether a form was seen, failed submits, video or sample opens, or exits through the top bar, and the paid page had no readable path. | Anything built on these events: before this date they have no data, so a window that starts earlier reports "no data yet", never zero (ground rule 3). The ledger's playbook-link removal (shipped 2026-11-12) has no top-bar clicks in the first part of its window. |
| tracking release v1.2.0 | **Results are judged with the range-and-label rule** (ground rule 4): an effect check before shipping, then a 95% range and one label (clearly better, can't tell, clearly worse), instead of "under 30 conversions in either window means directional". Fewer than 30 conversions is now only a caution added to the label. | 30 conversions is not a statistical threshold: the sample a clear answer needs depends on the size of the effect looked for. | No count or rate changes meaning. Verdicts do: a result called "directional" under the old rule is not a verdict under the new one, so old and new verdicts are not compared. |
| tracking release v1.2.0 | **Ad numbers per campaign, ad set and ad** (see Ads): the site's landing views, signups, `signup_rate` and `interest_rate` per UTM group, beside Meta's spend, link clicks and landing-page views from the read-only report (ground rule 10), giving `cost_per_signup`, `handoff_ratio` and `meta_lead_gap`. Per ad, the group takes both `utm_term` and `utm_content`, because one ad name runs in two ad sets. | Ad spend sat outside the improvement cycle, so no ad could be weighed against what it cost. | None for page metrics. The report reads Meta's whole history, so earlier windows can be read too; `interest_rate` per group starts at this release. |

## Known limits

- **PostHog sees only part of the traffic.** It covers only visitors who accept statistics cookies, only on the six landing pages, and only from after the page has loaded. A pattern seen in recordings describes visitors who consented, not everyone.
- **Purchases by page depend on Easytools.** Purchases split by language for certain. They split by landing page only if Easytools sends the checkout link's `page` parameter back in `custom_params`, which stays unconfirmed until the first real purchase. Check it this way: `Purchase` events with a `page` property, filed on a landing-page path, mean the split works. Events filed on `/purchase` mean it doesn't. Even when it works, `page` names the page with the buy button (always the paid page), never a free page the buyer saw earlier.
- **A purchase can't be tied to a visitor.** The webhook sends each purchase to Umami from the server, so it lands in a session the server creates. That session has no referrer, device or country, and Umami can't follow a visitor from click to purchase. `purchase_per_click` is a ratio of two separate counts, not a per-person conversion, and in a short window it can exceed 100% (e.g. someone buys through a link in an email). Never use `run_funnel` or visitor counts for `Purchase`.
- **Most new events have no history.** Before the release, Umami has page views, `Free skill submit: {surface}` (no properties, page taken from the event's path), `Pricing CTA` with `plan`, and the secondary clicks. `Free skill form started`, `Purchase`, and the `skill`, `language`, `surface` and `page` properties start at the release. A window that crosses the release date compares different data, so start "after release" windows on the release day.
- **Form starts before tracking release v1.2.0 include autofill doubles.** Until then any first change to a form's email field counted as a start, so autofill filling both forms of a page logged two starts for one visitor (on 2026-11-11, 19 of 32 visits with a start). Since then a start needs the field in focus. A form that autofill filled and the visitor sent without entering the field has a signup and no start, so `form_completion_rate` can still pass 100% (ground rule 5).
- **A form under the cookie banner counts as seen.** `Free skill form seen` fires when half of a form is on screen, even while the cookie banner covers it. Until the visitor makes a choice, the banner sits at the bottom of the screen (across the full width on phones) and the page stays usable behind it. So `form_seen_rate` can read a little high and `form_start_rate` a little low, most on phones and on a visitor's first page.
- **Path variants.** One page can appear with or without the trailing slash, with a `#anchor`, or with a query string. Normalise them (ground rule 6). The `page` property never contains `#` or a query string, but it can lack the trailing slash.
- **Ad blockers.** Some visitors block Umami's browser script, so views, form starts, signups and checkout clicks are undercounts. `Purchase` comes from the server and isn't blocked, so ratios with purchases on top read high.
- **The owner's visits count unless their browser is opted out.** Umami's tracker sends nothing from a browser that holds `umami.disabled` in the site's local storage (Umami's opt-out). Since 2026-11-12 it is on in the owner's main Chrome; days before that, and part of that day, include the owner's visits from that browser (Definition changes). The opt-out works per browser:
  - The owner's phone is not opted out (owner's decision), so their occasional visits from it still count.
  - Previews opened inside the Instagram or Facebook app would count even if the phone were opted out: those apps' built-in browsers keep their own storage, and the opt-out can't be set there.
  - Clearing the site's data in a browser, or opening it in a private window, turns the opt-out off there.
- **Test traffic.** Test signups and test purchases are removed by hand. List them below.
- **Low traffic.** Expect single-digit signups and purchases per page per window. Always show raw counts and denominators, and name a winner only on a "clearly" label (ground rule 4); at these counts most changes read "can't tell".

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
| 3 | At which step does each landing page lose the most visitors? | goal | answerable after release | `form_seen_rate`, `form_start_rate`, `form_completion_rate`, `submit_error_rate` per form; `pricing_seen_rate`, `checkout_click_rate`, `purchase_per_click` |
| 4 | Are signups and purchases going up, page against page, this window against the last? | goal | answerable after release | `signups`, `signup_rate` (already); `purchases`, `purchase_rate` by language |
| 5 | Did a shipped change move its metric by its end date? | goal (ledger) | answerable after release | the ledger row's primary and guardrail metrics, before vs after |
| 6 | Which page and language got the most visits? | research | answerable now | `lp_views`. The research's "qualified visits" has no definition here. |
| 7 | Did signups change in raw count and in rate, and over what denominator? | research | answerable now | `signups`, `signup_rate` |
| 8 | Does a button get clicks with no completions after them? | research | answerable after release | `checkout_clicks` vs `purchases`; `form_starts` vs `signups` |
| 9 | Did the traffic source or the page mix shift enough to explain a rate change? | research | answerable now | `traffic_mix`, `lp_views` per page |
| 10 | How do Polish and English, and mobile and desktop, compare on views, signups and checkout clicks? | research | answerable now | `lp_views`, `signups`, `checkout_clicks`, split with the device and in-app segments |
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
