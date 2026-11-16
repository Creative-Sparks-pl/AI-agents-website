---
type: synthesis
synthesized_by: subagent
model: claude-opus-5-5
mode: strict
brief: brief-pplx-deep-landing-page-metrics.md
sources:
  - results-pplx-raw-deep-research-deep-landing-page-metrics.md
  - results-youcom-raw-deep-deep-landing-page-metrics.md
  - results-exa-raw-deep-reasoning-deep-landing-page-metrics.md
  - results-claude-raw-claude-opus-5-5-deep-landing-page-metrics.md
synthesized: 2026-11-12
---

# Metrics for a Low-Traffic Lead-Magnet and Digital-Product Site — Synthesis

Source tags: `pplx` = results-pplx-raw-deep-research-deep-landing-page-metrics.md · `youcom` = results-youcom-raw-deep-deep-landing-page-metrics.md · `exa` = results-exa-raw-deep-reasoning-deep-landing-page-metrics.md · `claude` = results-claude-raw-claude-opus-5-5-deep-landing-page-metrics.md. Four inputs, none truncated. Strict mode. Purpose: decide which metrics agents.creativesparks.pl defines in `docs/analytics/metrics.md` and how its analytics approach changes while new tracking events are added.

## Navigation

### Topic map

| Section | What's here | What's NOT here |
|---|---|---|
| Executive Summary | 10 ranked recommendations with confidence | Derivations (see §1–§7) |
| The Experts and Their Positions | 24 experts and vendors: field, key work, stance | Detailed arguments (in the numbered sections) |
| §1 Metric hierarchy | Layers and roles; free-page and paid-page primaries; visitors vs views; revenue per visitor; "leads that later buy" | Post-signup methods (§2); form-event definitions (§4) |
| §2 After the signup | Activation for a downloadable skill; download, email, survey, tagged-checkout, self-report and cohort methods; what not to infer | In-tool telemetry of skill use (no source); person-level attribution (excluded by design) |
| §3 Decision rules | Why 30 conversions fails; expert sample-size figures; pre-test checklist; powered vs unpowered paths; pooling; decision matrix; owner wording; Bayesian vs fixed | Bayesian decision cut-offs (no source); tool comparisons (out of scope) |
| §4 Intermediate steps | Form seen/start/failure/abandonment definitions; verdicts on clicks, video, scroll, time, rage clicks; local predictive checks; units | Published evidence that engagement predicts conversion (none found) |
| §5 Paid social | Ad, handoff, page and business layers; Meta vs Umami; UTM conventions; minimum volume per ad; in-app browsers; ad economics | Ads Manager setup (excluded); quantified in-app-browser penalty (none found) |
| §6 Data quality | Weekly and post-release checklist, alert thresholds, reconciliation, owner traffic, A/A tests | Monitoring-tool choice (out of scope) |
| §7 Event naming and tracking plan | Name formats, example event sets, properties, layers, plan fields, attribute-based tracking | Tag-manager or GA4 setup (excluded) |
| §8 Recommended metric set | One table of ~30 metrics: definition, role, confidence, decision | Rationale (§1–§7) |
| Disagreements and Open Questions | Expert-level disputes and their fit for this site; questions only the site's own data can answer | Numeric divergences (inline in §1–§7) |
| Orphan Topics | Findings outside the prescribed subtopics | — |

### Question index

| Question | Section |
|---|---|
| Should the free-page signup rate divide by visitors or by views? | §1.2 |
| What is the paid page's primary metric while purchases are near zero? | §1.3 |
| Can we compute revenue per visitor or a lead-to-customer rate? | §1.4 |
| What counts as activation for a downloaded skill? | §2.1 |
| How do we measure downloads, installs and use without personal data? | §2.2 |
| How can we tell whether free users later buy? | §2.2, §1.4 |
| What must we not conclude from download, email or coupon numbers? | §2.3 |
| Is "30 conversions per 14-day window" a sound threshold? | §3.1 |
| How many views does a test need at a ~10% signup rate? | §3.1 |
| What do we write down before shipping a change? | §3.2 |
| What do we do when a test can't reach its sample size? | §3.4 |
| Can we pool windows or languages? | §3.4 |
| How do we tell the owner a result is uncertain? | §3.5 |
| Bayesian, sequential or fixed-horizon? | §3.3, §3.5 |
| How should "form seen" and "form start" be defined so autofill doesn't count? | §4.1 |
| Which denominator and reason labels for failed submits? | §4.1 |
| Are scroll depth, time on page, video plays or sample clicks worth tracking? | §4.2 |
| How do we check whether a click or view predicts signup? | §4.3 |
| How do we separate ad performance from landing-page performance? | §5.1 |
| Why don't Meta and Umami agree, and which number wins? | §5.2 |
| Which UTM values should ads use? | §5.3 |
| How much volume before judging an ad? | §5.4 |
| What should we check for Instagram/Facebook in-app browsers? | §5.5 |
| Which routine checks catch doubled or broken events? | §6.1 |
| What change after a release should trigger an investigation? | §6.1 |
| How do we handle the owner's own visits? | §6.1 |
| What event-name format and property list? | §7.1, §7.2 |
| What goes in the tracking plan and where does it live? | §7.4 |
| Can clicks be tracked without custom JavaScript? | §7.5 |
| What is the final metric list with roles and confidence? | §8 |

### Named-thing index

| Name | Type | Definition | Section |
|---|---|---|---|
| OEC (overall evaluation criterion) | Framework (Kohavi) | One short-term metric per experiment or decision, expected to predict long-term value | §1.1, §1.3 |
| Guardrail metric | Metric role | Metric "designed to alert experimenters about a violated assumption"; rules out harm | §1.1, §3.4 |
| Macro and micro conversions | Framework (Kaushik) | Measure the main business outcome plus the intermediate actions leading to it | §1.1, §4.2 |
| Digital Marketing & Measurement Model | Framework (Kaushik) | Kaushik's outcome-first measurement model; named as key work only | Experts |
| North Star metric | Framework (Reforge, Ellis, Rachitsky) | One output metric reflecting value delivered, decomposed into actionable inputs | §1.1, Disagreements |
| Setup → aha → habit | Activation model (Reforge, Balfour, Verna) | Stages from configuring the product, to first value, to repeated use | §2.1 |
| Activation rate | Metric (Rachitsky) | Users reaching the value milestone ÷ users who completed signup | §2.1 |
| "Very disappointed" survey | Diagnostic (Ellis) | Product-market-fit survey; a directional signal, not a universal law | Experts |
| Minimum detectable effect (MDE) | Statistical concept | Smallest effect a test is sized to detect at a given power and alpha | §3.1, §3.2 |
| n ≈ 16p(1−p)/δ² | Formula | Rule-of-thumb per-arm sample size for a two-arm conversion test | §3.1 |
| Low base rate problem | Concept (Miller) | Low baseline rates need very large samples and make negative results uninterpretable | §3.1 |
| Peeking (repeated significance testing) | Error pattern (Miller) | Checking a fixed-horizon test repeatedly and stopping when significant; inflates false positives | §3.3 |
| Group-sequential testing | Method (Georgiev) | Pre-planned interim looks that keep error control | §3.3 |
| Sample ratio mismatch (SRM) | Diagnostic (Kohavi, Vermeer) | Observed split deviating from its expected ratio, signalling a data problem | §3.3, §6.1 |
| Judgement change | Label (proposed) | A change too small to detect within ~8 weeks, shipped on qualitative evidence and not called a test | §3.2 |
| Low-traffic decision matrix | Template | Evidence-to-action table for decisions without a powered test | §3.4 |
| A/A test | Method | Test of two identical variants to validate setup; not worth it at this scale | §6.1 |
| Qualified signup / qualified view | Metric definition | Valid signup from an Umami view that passed page-load validation and is not a synthetic QA hit | §1.2 |
| Form seen | Event definition | ≥50% of the form in the viewport for a minimum dwell, once per page view per form position | §4.1 |
| Rage click | Diagnostic (Microsoft Clarity) | Repeated clicks or taps in one area without a page change | §4.2 |
| Self-reported attribution | Method | "How did you hear about us?" asked at a conversion point | §2.2 |
| Geo-holdout incrementality test | Method (Common Thread Collective) | Withholding ads by region to measure their incremental effect | §5.2 |
| First-order profitability | Framework (Common Thread Collective) | Judge acquisition on first-order value versus CAC, by cohort | §5.1 |
| Meta learning phase | Platform threshold | ~50 optimization events in 7 days per ad set; an optimization-system threshold | §5.4 |
| Three-layer event schema | Framework (Dechau) | Core business, product and UX events kept in separate layers | §7.3 |
| Data layer | Implementation pattern (Ahava) | Explicit key–value definitions that translate measurement requirements | §7.4 |
| Measurement plan | Framework (Seiden) | Objectives, KPIs, segments and campaign labels defined before tagging | §7.4 |
| Tracking plan | Artefact | Versioned per-event spec: name, trigger, properties, owner, test, date | §7.4 |
| `data-umami-event` | Implementation (Umami) | HTML attribute that sends a click as an event; properties via `data-umami-event-*` | §7.5 |
| Growth loop | Framework (Reforge) | One cohort's output becomes the input that acquires the next cohort | Orphan Topics |

### Known gaps

- Minimum spend or volume before judging a paid-social ad for a low-budget lead magnet — no expert source established one; only operational proposals, an ecommerce vendor rule and an ad-platform optimization threshold (see inline marker in §5.4)
- Published evidence that scroll depth, time on page, video plays or sample/proof clicks predict lead-form conversion — none of 4 sources found any (§4.2)
- Direct measurement of skill installation and use inside Claude Code, Codex or Cursor — nothing beyond aggregate proxies, self-report and one speculative output-link idea (§2.2)
- Bayesian decision cut-offs (e.g. a probability-to-beat threshold) for a non-statistician owner — none given, only a reporting example (§3.5)
- Quantified effect of Instagram/Facebook in-app browsers on form completion, consent or attribution — none given (§5.5)
- Expected size of the gap between Meta-attributed and site-counted signups — no range given (§5.2)
- Umami-specific way to exclude the owner's own visits — only an unverified suggestion (§6.1)
- Correcting ad-blocker undercounts of browser events against unblocked server-side purchases — no method beyond reconciliation with the email platform and webhook (§6.1)
- Expert-backed per-ad "signup quality" metrics — only provider-proposed proxies (§5.1)
- How self-reported attribution performs for solo digital products — the writing found is mostly B2B (§2.2)
- Sample-size or MDE planning for non-randomized before/after comparisons — sources give only two-arm A/B formulas (spans §3.1, §3.4)

## Executive Summary — the 10 most important recommendations for this site

1. **Report free signups and paid sales as two separate outcomes, with one primary metric per page — never one blended site score.** Purchases cannot be joined to signups by design, so a combined number would imply a link nobody can measure; Kaushik's macro/micro conversions, Kohavi's OEC plus guardrails and Reforge's outcome-plus-inputs structure all favour a layered set over a single North Star. Confidence: HIGH. [[1, 2, 3, 4, 5, 6, 7, 8, 9]]
2. **Make confirmed signup rate, per page and language, the free-page primary; keep signups per form-seen and per form-start as diagnostics, and show the raw numerator and denominator beside every rate.** Sources split on visitors versus views as the denominator (§1.2); whichever is chosen, name it in the metric. Confidence: HIGH (one source MEDIUM). [[10, 11, 12, 13]]
3. **Don't run the paid page on purchases while there are almost none.** Count purchases and revenue from the checkout as a weekly or monthly aggregate business result; treat checkout-click rate as a labelled leading indicator, and don't call a rise in checkout clicks a win unless purchases follow (§1.3). Confidence: HIGH. [[8, 14]]
4. **Replace "under 30 conversions = directional" with a pre-change effect check and an uncertainty statement.** At a 10% signup rate, detecting a 50% relative lift needs roughly 580–680 views per arm and a 30% lift about 1,770, against ~360 views across all six pages per 14 days; Kohavi plans for 80% power and an MDE of 5% or less, and Laja's rough heuristic is 350 conversions per variation. Confidence: HIGH. [[15, 16, 17, 18, 19, 20, 21, 22, 23]]
5. **At this traffic, decide mainly from large, research-backed changes judged with guardrails and qualitative evidence; run an A/B test only when the planned sample fits a realistic horizon, and never peek and stop.** Report every comparison as a range with three owner labels: "clearly better", "can't tell", "clearly worse". Confidence: HIGH. [[24, 25, 26, 27, 28, 29]]
6. **Measure what happens after signup in aggregate only:** distinct download URLs, email-platform clicks on install links, a one-question "did you install/run it?" survey, tagged checkout links or codes in follow-up emails, and "how did you hear about us?" at checkout. A download is setup, not activation. Confidence: MEDIUM (evidence thin). [[30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]]
7. **Judge ads and pages separately:** ads on Meta delivery, cost per landing-page view and cost per site-counted signup; pages on Umami signup rate by UTM; never overwrite site counts with Meta-attributed conversions. Confidence: MEDIUM to HIGH; the per-ad volume floor is LOW to SPECULATIVE (§5.4). [[41, 42, 43, 44, 45, 46, 47]]
8. **Instrument form seen, genuine form start (not autofill), failed submit with a bounded reason, and confirmed success; keep video, top-bar, sample and scroll events as diagnostics** unless the site's own data shows they predict signup. Confidence: HIGH. [[48, 49]]
9. **Run data-quality checks weekly and after every release, before reading any dashboard:** funnel order (signups ≤ starts ≤ form seen ≤ views), duplicate ceilings, Umami-versus-email-platform reconciliation, recorded share, release diffs and a synthetic test journey. A broken event is not a weak funnel. Confidence: HIGH. [[49, 50, 51, 52, 53]]
10. **Keep a small, versioned tracking plan in the repository:** one naming convention, the action in the event name and bounded labels for context, an exact trigger and dedup rule per event, owner, test and date; Umami data attributes for simple clicks, explicit code for signup success and purchase; no event without a decision it informs. Confidence: HIGH. [[49, 54, 55, 56, 57, 58, 59, 60, 61, 62]]

## The Experts and Their Positions

| Expert | Field | Key work | Stance on our questions |
|---|---|---|---|
| Ronny Kohavi | Online experimentation | *Trustworthy Online Controlled Experiments*; controlled-experiment papers; encyclopedia entry with Longbotham [[3, 8, 63, 64, 65]] | One OEC plus guardrails; pre-test power and MDE; check SRM; small sites detect only large effects [[19, 22]] |
| Georgi Georgiev | Experiment statistics | *Statistical Methods in Online A/B Testing*; Analytics-Toolkit; 115-test meta-analysis [[15, 16, 23]] | Size tests from the effect worth detecting; most tests are underpowered; valid sequential designs keep error control [[66, 67]] |
| Evan Miller | Experiment statistics | "How Not To Run an A/B Test"; sample-size and sequential tools; "The Low Base Rate Problem" [[17, 18, 21, 68]] | Fix the sample or use a valid sequential method; don't peek; low base rates need huge samples |
| Lukas Vermeer | Experiment trustworthiness | Automated SRM detection; replication of UX patterns [[50, 69, 70]] | Ratio mismatches are data-quality alarms; familiar UX-pattern effects are smaller than claimed |
| Avinash Kaushik | Web analytics | Macro/micro conversions; Digital Marketing & Measurement Model; "Stop Obsessing About Conversion Rate" [[2, 7, 9, 71]] | Outcomes plus a few micro-conversions; acquisition, behaviour and outcomes together; no single rate [[1, 72]] |
| Peep Laja / CXL | CRO | CXL CRO guide; testing method; low-traffic alternatives; lead-generation research [[20, 24, 28, 73, 74, 75]] | Research-led CRO; don't test low-traffic pages by default; ~350 conversions per variation; big lifts aren't portable benchmarks |
| Ben Labay / Speero | Experimentation | Test-planning, detectable-effect and instrumentation posts; radical-experimentation podcast [[26, 27, 76, 77, 78, 79]] | Predefine primary metric and guardrails; big research-backed changes over tiny tests; splitting traffic destroys power |
| Craig Sullivan | CRO, mobile UX | Conversions@Google talk; Smart Insights interview [[25, 29, 80]] | Quantitative patterns steer qualitative research; if you can't test, understand users and grow traffic |
| André Morys | CRO and growth | "The Million Dollar Optimization Strategy" [[81, 82]] | Optimize for economic outcomes; strong hypotheses and research over indiscriminate testing |
| Simo Ahava | Measurement implementation | GA4 events guide; "From Project To Process"; server-side tagging critique; "Garbage In Garbage Out" [[54, 56, 58, 83, 84]] | `snake_case` names, explicit key–value data layer; data quality before analysis; server-side doesn't remove privacy duties |
| Timo Dechau | Tracking-plan design | Event Taxonomy; Analytics Workbook; "too many events" post [[55, 57, 62, 85, 86, 87]] | Events are actions, properties context; fewer events, in three layers |
| Krista Seiden | Measurement planning | Measurement-plan talk; analytics writing [[88, 89, 90]] | Objectives and KPIs before tagging; disciplined naming and governance |
| Brian Balfour / Reforge | Activation, growth | Activation, cohort, growth-model and North Star guides [[4, 6, 30, 36, 91, 92]] | Activation means reaching value (setup → aha → habit); a North Star is an output with inputs beneath it |
| Elena Verna | Activation | "I bet you are doing product activation all wrong" [[37]] | Separate setup, aha and habit; the aha must show value received |
| Sean Ellis | Growth, activation | *Hacking Growth*; product-market-fit survey; Lenny's Newsletter interview [[35, 38, 93, 94, 95]] | North Star reflects value delivered; signup alone isn't value; "very disappointed" survey is directional |
| Lenny Rachitsky | Product metrics | Activation thread and North Star writing, via secondary quote sources [[34, 96]] | Activation rate = milestone reached ÷ signups; milestone early, actionable, predictive |
| Andrew Foxwell / Foxwell Digital | Paid-social measurement | "Client Reporting When Meta Is a Black Box"; UTM guides [[43, 45, 46, 47, 97]] | Read the funnel in order; consistent UTMs; triangulate Meta, analytics, orders, surveys |
| Common Thread Collective | Paid-social economics | Creative-testing framework; incrementality; first-order profitability [[98, 99, 100, 101, 102, 103]] | Tie ads to business economics; holdouts beat platform attribution but need volume; spend rules are ecommerce-specific [VENDOR: Common Thread Collective] |
| Plausible | Privacy-first analytics | Metric definitions; goal conversions; metric-choice posts [[10, 13, 104, 105, 106]] | Conversion rate = unique converters ÷ unique visitors; no cross-device identity [VENDOR: Plausible] |
| Umami | Privacy-first analytics | Event-tracking best practices; track-events docs [[49, 59, 107, 108]] | Consistent names, bounded properties, no personal data; attribute-based events [VENDOR: Umami] |
| Fathom | Privacy-first analytics | Measurement docs [[109, 110]] | State the conversion denominator; acquisition questions need no identity [VENDOR: Fathom] |
| Avo (Thora Gudfinnsdottir) | Tracking plans | Tracking-plan office hours; naming and audit rules [[60, 61, 111]] | Start with why; exact trigger timing; no unused events; consistent names |
| Convert | CRO tooling | Metrics guide; MDE guide [[112, 113]] | Guardrails catch violated assumptions; ~10% MDE for low-traffic sites [VENDOR: Convert] |
| 37signals (Jamie Hasselbalch) | Practical testing | Sample-size tech note [[114]] | Don't run a test until it happens to reach significance |

Thinly sourced: Morys, Verna, Fathom, Avo, Convert and 37signals rest on one input each; Rachitsky's position rests on an X thread and a quote aggregator.

## 1. Metric Hierarchy for a Lead-Magnet and Digital-Product Site

### 1.1 Layers: one primary per decision surface, plus diagnostics, guardrails, context and data quality

Use a layered set, not one universal KPI. Kohavi: each decision gets one OEC — a short-term metric expected to predict long-term value — plus guardrails that warn when something breaks [[3, 8]]; Convert, drawing on Labay, defines guardrails as metrics "designed to alert experimenters about a violated assumption" [VENDOR: Convert] [[112]]. Kaushik: measure macro conversions and the micro conversions on the path to them [[2, 9, 71]], and don't obsess over one conversion rate [[7]]. Reforge treats a North Star as an outcome decomposed into actionable inputs across acquisition, retention and monetization [[4]].

- **Business outcomes (monthly, site-wide):** completed purchases and revenue per currency from the checkout webhook, plus self-reported source; contribution margin and refunds or cancellations where available. Confirmed free signups are the lead-generation outcome. Free and paid meet only here, in aggregate, because of the deliberate GDPR design.
- **Page primary (one per page):** free page — signup rate (§1.2); paid page — §1.3.
- **Funnel diagnostics:** form seen, form start, submit failure, form completion, checkout click, cross-sell click.
- **Guardrails:** failed submits per start, invalid-email rate, duplicate-submit rate, page and checkout error rates, refund or cancellation rate, decline in page load or consent compliance, form-failure rate, cost per signup. A change that lifts signups while raising invalid or failed submissions is not automatically a win.
- **Context:** traffic source, campaign, ad set and ad, language, country, device, in-app browser, consent state, recorded share, date. Use it to explain differences, not to fish across tiny segments.
- **Data quality:** whether the measurement itself can be trusted (§6).

Admit a metric to the operating set only if a change in it would change a decision. The free-skill signup is a micro conversion relative to revenue and the macro conversion of its own page.

### 1.2 Free-page primary: signup rate, and the denominator choice

Make the confirmed signup the free page's primary outcome: it is observable (unlike a click on the button) and is the page's immediate job. Count a signup only after a confirmed success response. Read it per page and language, never pooled across very different traffic, with raw numerator and denominator beside every rate. Analytics tools differ on whether conversion rate uses visitors, sessions, views or events, so name the denominator in the metric itself; a visitor may appear in several funnel events, but each rate's denominator must match its stated population [[10, 115]].

- Visitor version: unique visitors with ≥1 confirmed signup on that page ÷ unique visitors to that page. Plausible defines conversion rate as unique converting visitors ÷ unique visitors [VENDOR: Plausible] [[13]].
- View version: successful signups ÷ landing-page views × 100, or signups per 1,000 views where views are the stable denominator.
- "Qualified" variant: valid signups ÷ qualified views, where a qualified view passed normal page-load validation and is not a synthetic QA hit.
- Privacy-first tools may count one person as a new visitor across devices or days, so a visitor rate is not durable unique-person measurement; disclose the unit either way [[10, 12]].

[Divergence: pplx and exa make unique visitors the primary denominator and keep per-view rates as a labelled secondary [[10, 11]]; youcom and claude make landing-page views primary, because Umami's stable count is views and mostly single-visit paid-social traffic makes the two differ by only a few percent while per-view is easier to audit]

A signup count alone can reward channels that bring low-intent traffic when a later milestone is measurable [VENDOR: Plausible] [[105, 116]]; Speero argues the frontier "starts after the conversion" [[78]]. Answer this with a quality layer (§2), not by changing the primary. Confidence: HIGH (one source MEDIUM).

### 1.3 Paid-page primary while purchases are near zero

Purchases cannot be the short-term optimization metric at zero-to-rare volume; purchases and revenue stay the business outcome, counted from the checkout as an aggregate per week or month, by plan, never summing unlike currencies. Purchases per checkout click is at most a directional checkout-friction proxy, since the hosted checkout hides its own drop-off.

[Divergence: youcom, exa and claude make checkout-click rate (checkout clicks ÷ paid-page visitors or views) the paid page's operating primary, labelled a proxy, until purchases are frequent — Kohavi's OEC favours a leading indicator that predicts long-term value [[8]]; pplx keeps checkout clicks as a funnel diagnostic only — a change that lifts checkout clicks without lifting purchases is not a paid-funnel win, mirroring Speero's split between journey signals for diagnosis and customer outcomes for judging tests [[14]]]

### 1.4 Revenue per visitor and "leads that later buy"

Don't make revenue per visitor (RPV) a primary now: with zero or very few purchases it is mostly zero, one order dominates it, and revenue metrics need substantially more sample than binary ones because their variance is higher [[64]]. RPV is the right judge for offer or pricing tests that change order mix, whereas purchase rate suits usability tests [[14]]. One proposal: postpone RPV until about 30 or more purchases per quarter (SPECULATIVE threshold).

[Divergence: youcom and exa define purchase rate and RPV as server-side purchases or revenue ÷ paid-page visitors over a rolling window, as aggregate ratios; pplx says server-side purchases cannot be tied to visitors or campaigns, so report purchase count and revenue without a visitor denominator until attribution supports one [[14, 117]]]

"Leads that later buy" is the right long-run number but cannot be measured per person here; tagged-code cohorts (§2.2) are the agreed partial substitute.

[Divergence: claude proposes an untagged cohort ratio — purchases in month M ÷ signups in months M−1 and M−2 — as the closest proxy (SPECULATIVE); pplx says dividing aggregate purchases by aggregate signups and calling it a lead-to-customer rate is invalid, because numerator and denominator are not a linked cohort]

## 2. After the Signup: Activation and Free-to-Paid Without Personal Tracking

### 2.1 What activation means for a downloadable skill

Define activation as reaching first value, not as the signup or the download. Reforge separates setup, aha (first value) and habit moments and checks in cohorts whether later behaviour follows an earlier milestone [[30, 36, 91]]; Verna adds that the aha must show value received and the habit must match the product's real use frequency [[37]]. Rachitsky: activation rate = users reaching the milestone ÷ users who completed signup; the milestone should be early, actionable and strongly predictive of retention [[34, 96]]. Ellis: signup alone does not show the user experienced value [[35]]; choose a North Star reflecting core value delivered and treat activation as more important than acquisition [[38, 94]], picking it by walking through retention, referral, acquisition and activation [[95]].

- Value chain here: signup → download requested or file downloaded → installed or configured → first meaningful run in Claude Code, Codex or Cursor → perceived usefulness → paid-product consideration or purchase.
- Setup = form submitted and download received; aha candidate = download and install; stronger aha = first useful audit or planning run.
- Habit may not fit an episodically used skill — don't force a weekly-active definition; define "value received" as a completed first run, self-reported success, or a repeat or useful-output signal if one becomes available.
- Browser analytics cannot observe use inside external AI coding tools, so installation and use evidence stays LOW confidence unless self-reported.

### 2.2 Privacy-compatible methods, strongest to weakest proxy

- **Distinct download URLs (low effort).** One non-personal URL per skill and language, optionally per campaign or email sequence; or one URL shown on the page and another in the email, so email-link downloads ÷ signups (weekly) isolates email-driven requests. Count aggregate server hits only. Call it "download-link request rate": "unique" means request- or link-level deduplication, not unique people, and a file request is not an install.
- **Email-platform engagement (low effort).** Per email and cohort: delivered, unique clicks on the install or how-to link ÷ delivered, clicks on paid-product follow-ups, unsubscribes, spam complaints. Privacy features distort opens, so keep them secondary; a click shows interaction with the link, not installation.
- **One-question use survey (low effort; LOW confidence).** Send 7–14 days after signup, or at 7 and 30 days; report response count and response rate beside the percentages, because respondents self-select. Wordings in the sources:
  - "Have you installed and tried the skill?" — Not yet / Installed / Tried it once / Use it regularly
  - In the second email: "Did you run it?" — Yes / Not yet / Couldn't install
  - "Did you install it?", and later "Did it produce a useful result?"
  - Which free skill did you use? Did you install it? Did you use it on a real project? Did it help? How did you hear about the paid skill?
- **Tagged checkout links or codes in follow-up emails (low effort).** A distinct checkout URL or non-discount code per free skill, language or follow-up email — e.g. `free_homepage_audit_en`, `free_website_planning_pl`, `free_skill_followup_30d`, `?src=nurture-audit`, `AUDIT10`. The webhook can count orders by code without identifying anyone. Label results "orders using the cohort code", not "buyers from the cohort": codes get shared, links get forwarded, and buyers can skip them. Denominators proposed: cohort signups, nurture emails delivered, or codes issued.
- **Self-reported attribution (low effort; MEDIUM).** "How did you hear about us?" with coarse choices at checkout or in the post-purchase email; report the share of purchases citing each source, quarterly. It captures remembered and offline discovery that click-based systems miss, but it is recollection, not causal attribution [[32, 33]]; it usually sits at a conversion point, and most writing on it is B2B, so applying it to a solo digital product is an extrapolation [[39, 40]]. Foxwell recommends post-purchase surveys as a reconciliation source when platform and analytics attribution disagree [[44, 46]].
- **Cohort comparisons (trivial effort).** Monthly or campaign cohorts — Polish vs English, Meta vs email, Homepage Audit vs Website Planning, signup month, landing page, form location — compared on email clicks, paid-page visits, tagged checkout clicks, coded purchases and survey-reported use. Suppress or label cells with very small counts.
- **Skill-output link (SPECULATIVE).** The skill could print a link with a non-personal tag (e.g. `?src=skill-output`) in its final output, so visits from people who actually ran it show up in Umami; disclose it in the skill's README.

Start with: a download-endpoint count, email clicks on install and paid-product links, one cohort checkout code per free skill and language, a short survey 7–14 days after download, and monthly cohort reporting. Confidence: MEDIUM for download and email signals, LOW for actual installation and use [[30, 32, 91]].

### 2.3 Aggregate cohort table and what not to infer

Keep one row per signup cohort (skill, language, signup week, source or campaign label) with aggregate outcomes only: signups, delivered emails, install-guide clicks, download requests, survey answers, tagged orders, tagged revenue. Never join email, site activity and purchase.

Do not infer:
- delivery → download; download click → install; install-guide click → use;
- a positive survey answer → a representative activation rate (it is self-reported and response-biased);
- a tagged order → the lead magnet caused the purchase (it shows a link or code was used);
- aggregate signups and aggregate purchases → a lead-to-purchase rate (§1.4).

State on the dashboard that these are cohort-level indicators that cannot connect a particular free user to a particular buyer.

## 3. Decision Rules at Low Traffic

### 3.1 Why "30 conversions" is not a statistical threshold, and what experts plan with

Keep "under 30 = directional" only as a caution label — "below this, don't even look", or enough to reveal a catastrophic implementation problem — not as a validity rule. Thirty conversions may suffice for a very large effect and nowhere near for a modest one; the relative standard error of a count of 30 is about 1/√30 ≈ 18%, and comparing two such counts is wider still (a calculation, not a source benchmark). Required sample depends on baseline rate, minimum detectable effect (MDE), alpha, power, one- or two-sided test, the independent unit, variance, and the number of segments and metrics [[15, 16, 18]].

- **Kohavi:** compute sample size before launch, typically 80% power and an MDE no higher than 5%, sized to the population actually exposed to the change [[19, 64]]; run the power formula in reverse from historical traffic with a two-week (sometimes four-week) run — small sites detect only large effects [[22]].
- **Laja / CXL:** rough heuristic of 350 conversions per variation; run full weeks, generally 2–4, to cover business cycles [[20]].
- **Georgiev:** 95% significance and 80% power for a 5–10% effect at a 2–5% baseline needs roughly 50,000–500,000 users [[15]]; across 115 tests the average lift was about 4% and most tests lacked power, and no reasonable design pairs 90% power with an MDE above 40% [[23]].
- **Miller:** detecting a 10% relative change at a 1% baseline can take more than 300,000 total subjects [[18, 21]]; a negative result is uninterpretable without prospective power, so choose the effect worth detecting before the test [[21]].
- **Convert:** MDE up to about 10% for lower-traffic sites — advice aimed at sites with thousands of conversions, far out of reach here [VENDOR: Convert] [[113]].
- **Speero:** splitting traffic between two concurrent tests raises each one's MDE by 41%, so "one change at a time" protects statistical power, not only interpretability [[79]].

Rule-of-thumb sample size for a two-arm conversion test, where p is the baseline rate and δ the absolute difference to detect — an approximation, not a calculator replacement [[17, 18]]:

n_per_arm ≈ 16p(1 − p)/δ²

Planning figures at 80% power and two-sided α = 0.05 (the sources' own calculations):

| Baseline → target | Views per arm | Time to full sample at 50–150 visitors/day |
|---|---|---|
| 10% → 12% (+20% relative) | 3,600 | 48–144 days |
| 10% → 13% (+30% relative) | ~1,770 | — |
| 10% → 15% (+50% relative) | 576–680 | 8–23 days |
| 10% → 20% (+100% relative) | ~200 | — |
| 5% → 6% (+20% relative) | 7,600 | — |

[Divergence: pplx gives 576 per arm for 10% → 15%, from the 16p(1−p)/δ² rule of thumb [[17, 18]]; claude gives ~680, from the standard two-proportion formula]

[Divergence: pplx works from the brief's ~360 views across all six pages per 14 days (about 60 per page) and concludes most page-specific tests take far longer than the table's 50–150/day horizon; claude works from ~180 views per page per 14 days and concludes only lifts of about a doubling are detectable within one window]

### 3.2 Before any change: the pre-test checklist

Write down, before shipping (Kohavi's OEC and guardrails and Georgiev's effect-of-interest planning underpin it [[3, 16]]):
- the eligible page and traffic source;
- one primary metric and its denominator;
- the assignment unit — ideally a visitor who consistently sees the same version;
- the baseline rate and the smallest commercially meaningful effect, e.g. "We would ship a page change only if it plausibly raises qualified signup rate from 5% to 7.5% or better, without increasing failed submits.";
- alpha and power;
- one or two guardrails;
- the planned sample size or a valid sequential rule, the maximum duration and the stopping date;
- a minimum runtime that covers weekly patterns;
- the action for each result: ship, stop, or keep learning.

Then reverse-compute the MDE from the traffic that can actually arrive. If the MDE exceeds the effect worth acting on, or the sample exceeds a realistic horizon, don't run or describe it as an A/B test. Proposed cut-off: if detection would need more than about 8 weeks of views, call it a "judgement change" and justify it with qualitative evidence — recordings, failure reasons, survey answers (SPECULATIVE cut-off).

### 3.3 When a powered, randomized test is possible

- Pre-register the primary metric and MDE; run the planned sample; don't stop early on a favourable reading.
- Check the exposure split for sample-ratio mismatch, and tracking integrity, before interpreting any effect [[3, 63]].
- Report the observed effect with its uncertainty interval, not just winner or loser, and check that the plausible effect is commercially large enough.
- Read a fixed-horizon test once. Checking repeatedly and stopping at the first significant result inflates false positives — to 26.1% in Miller's illustrative worst case; in his words, "the best way to avoid repeated significance testing errors is to not test significance repeatedly" [[17]].
- Monitor sequentially only with a validated method: Georgiev reports group-sequential designs keep error control, with real-world efficiency gains of about 26% across 1,001 tests [[66, 67, 118]]; Miller's simple sequential procedure still needs a preselected maximum sample [[68]].
- No conclusion at the planned horizon means "inconclusive", not "no effect".

### 3.4 When the sample can't be reached: research-led change, before/after, pooling

- Don't lower the bar after seeing the data, and don't call a 14-day before/after an A/B test: "last 14 days vs the 14 before" is reporting hygiene, not causal proof.
- Prefer a large, research-backed change that could plausibly move the metric materially. A headline test may take months here; a bigger change — clearer offer positioning, an installation preview, a sample output, a simpler mobile form — gives a usable directional read sooner, still labelled observational [[26]].
- Find friction with qualitative evidence: 5–10 usability sessions per major hypothesis, an owner-independent review of mobile in-app flows, technical tests on iOS, Android and in-app browsers, recordings as qualitative evidence only, failed-submit reasons, one-question surveys. Research is the foundation of hypotheses [[24]]; quantitative patterns focus qualitative investigation [[25]]; radical, assumption-level changes should be grounded in qualitative research, and directional evidence is not a powered causal test [[26, 27]]; with no way to test, work on understanding users and growing traffic [[29]]; even a handful of data points "certainly could cause you to rethink your gut instinct" [[28]].
- Ship reversible improvements and report them as "directional, consistent with improvement".
- Treat controlled before/after or alternating-period comparisons as directional only: annotate traffic-mix, device and campaign changes, and compare like with like — Meta days against Meta days.
- Pool windows for decisions — 4–8 weeks when practical, or 28 days against 28 days — only if the offer and page version stayed stable, the traffic mix did not shift materially, no campaign launch or email spike dominates one window, and no unit is double-counted.
- Guardrails only need to rule out disaster: revert if a guardrail worsens by more than 50% with at least 10 events (SPECULATIVE).

[Divergence: claude says combine both languages when the same change was made in both; youcom says do not pool incompatible pages or languages merely to obtain a larger number]

Decision matrix:

| Evidence | Action |
|---|---|
| Broken tracking, impossible ratios or form failures | Fix immediately; no experiment |
| Usability failure reproduced by several users | Fix and monitor; no A/B claim |
| Large observed improvement, stable traffic, no guardrail harm | Ship cautiously; label directional |
| Small improvement with low counts | Don't declare a winner |
| Clear deterioration | Roll back if commercially or technically harmful |
| Valid powered test | Pre-registered primary metric and interval |
| No conclusion after the planned horizon | "Inconclusive", not "no effect" |

### 3.5 Reporting uncertainty to a non-statistician owner

Show with every comparison: numerator, denominator, absolute rate, absolute and relative difference, confidence or credible interval, MDE, campaign and device mix, data-quality status, and the decision. Use three labels: "clearly better", "can't tell", "clearly worse". Example: 30 vs 45 signups on equal views is a 1.5× ratio whose 95% range runs from about 0.94× to 2.4× — not conclusive.

Wording templates:

> "Observed signup rate was 8.1% versus 6.2%, an absolute difference of 1.9 percentage points. The sample is too small to distinguish this from ordinary variation. The result is directional, not a confirmed win."

> "The change produced 9 versus 7 signups, but the data can still be consistent with no improvement; we will not claim a winner."

> "probability B is better: 78%; likely range −10% to +90%" (Bayesian form)

The real choice is a valid plan versus unplanned peeking, more than Bayesian versus frequentist: Bayesian methods can allow repeated evaluation under an appropriate model, while Georgiev's book is frequentist and cautions against calling either school universally superior [[68, 119, 120]]. A Bayesian report helps if it states the probability of a meaningful benefit and the risk of harm under explicit assumptions; neither approach makes tiny data informative, and "not significant" is not proof of no effect [[121, 122]]. Peeking is the error in either framework [[17, 114]].

[Divergence: claude says Bayesian reporting suits a non-statistician owner best; youcom and exa say fixed-horizon is simpler to explain and safer for a small team, with sequential or Bayesian methods only under a predeclared model and stopping rule]

Confidence: HIGH for replacing the 30-conversion threshold with an MDE check plus an uncertainty statement; SPECULATIVE for the exact cut-offs (8 weeks; 50% with 10 events).

## 4. Intermediate Steps: Predictive vs Vanity

### 4.1 Form events: definitions

Instrument form exposure, genuine starts, failures and confirmed successes — each answers an actionable funnel question (HIGH). Form analytics such as field timings, re-entries and last interaction locate friction but do not explain abandonment on their own [[48]]; keep form-view-to-conversion, form-start rate and form conversion as separate rates rather than collapsing them [[123]].

- **Form seen.** At least 50% of the form visible for a minimum dwell, once per page view per form position, with a `top`/`bottom` (or `hero`/`bottom`) label rather than separate event names. Precise wording: "A `form_seen` event fires once per page view when at least 50% of the form's bounding rectangle intersects the viewport for at least one continuous 500-millisecond interval." An intersection observer implements it; keep the threshold fixed; if Umami can't deduplicate within a page view, add a client-side once-flag. It separates "didn't reach the form" from "reached it but didn't act" — the form-placement decision — but exposure is not attention or intent, and it counts as predictive only if form-seen visitors convert more than others across several periods and segments.
- **Form start.** The first deliberate interaction, once per form instance: a pointer click or tap into the field, or keyboard focus followed by a user input event. Not browser autofill, programmatic focus or field validation — "email field non-empty" is not a start. Umami supports a focus listener that fires once, but it must distinguish focus from real input to avoid the known doubling [VENDOR: Umami] [[124]]. Optionally record autofill as its own event. Never capture typed values.
- **Failed submit.** One event per rejected attempt with a bounded reason — `invalid_email`, `missing_required`, `server_error`, `rate_limited`, `unknown`, plus network failure and duplicate submission. A generic "form error" is not actionable. Report attempts and affected visitors separately, since retries multiply failures, and report the failure-reason mix (failures by reason ÷ all failures).
- **Form abandonment.** (form starts − signups) ÷ form starts, per form; or a start with no confirmed signup by the end of the session or within a stated 24-hour window — an operational proxy, not proof of permanent abandonment.
- **Form reach.** Page loads with a form-seen event for any form ÷ views.
- **Success.** Fire only after a confirmed success response.

[Divergence: pplx and claude set the form-seen dwell at 1 second; youcom sets 500 milliseconds; exa leaves it as a minimum dwell to be fixed once]

[Divergence: pplx and youcom divide failed submits by all submit attempts, and claude by signups plus failures (the same population); exa divides failed submits by meaningful form starts]

### 4.2 Other on-page signals: verdicts

- **Checkout click** — funnel diagnostic of paid intent and the outbound handoff; not a purchase.
- **Sample-output and proof clicks, hero video starts, top-bar clicks** — diagnostic intent signals: rate per page view, or per visitor who could see the control for video. Interested people self-select into clicking, and a click is not completion or comprehension. Keep sample-output and video events about 8 weeks, then drop any that show no difference between visitors who sign up and those who don't.
- **Scroll depth** — hypothesis generator only: it shows what visitors reached, not whether the content persuaded; it depends on page length and can reflect searching, frustration or efficient navigation [[125]]. Pooled scroll-depth-vs-conversion comparisons mislead when page types differ, and correlation does not show that scrolling caused conversion [[126]]. In-app browsers distort it.
- **Time on page** — weak: long times can mean interest, confusion, a forgotten background tab or a slow page, and tools calculate it differently.
- **Rage and dead clicks** — Microsoft Clarity defines rage clicks as repeated clicks or taps in one area without a page change, a pointer to possibly broken elements, not proof of lost conversion [[127]]. Use them in PostHog recordings as evidence, not as counts.
- Clarity's 2026 analysis found AI-referred visitors behave differently from other channels, but that is a channel-level description, not evidence that any engagement signal causes conversion [[128]].

Track an intermediate step only if it plausibly sits on the path to the macro conversion [[9, 129]]; Dechau keeps fine-grained UX events outside the core plan [[57]]. No source found published, independent evidence that scroll depth or time on page predicts lead-form conversion, and vendor case studies don't establish it [[130]]; treat any such threshold as LOW until validated on this site.

### 4.3 Testing an intermediate signal's predictive value on this site

Compare downstream outcomes of visitors who did vs didn't perform the action — e.g. signup rate among visitors who clicked a sample output vs those who didn't — across several stable periods and segments, controlling for device and form position. This is association, not causation. The stricter activation standard: the milestone should predict long-term value with a substantial retention difference, and be actionable [[34, 96]].

### 4.4 Units: per view, per visitor, per event

- Use per-visitor denominators for "what share of people did this?" and per-event denominators for operational reliability (e.g. failed submits per attempt); never mix views and visitors in one rate.
- The alternative proposed is per page load throughout, because PostHog sessions are consent-filtered; see §1.2 for the visitor-vs-view divergence and the counting rule.

## 5. Paid-Social Traffic Metrics

### 5.1 Separate ad, handoff, page and business layers

Report paid traffic in layers, so you can say "the creative bought cheap traffic but the page converted poorly" instead of blaming the ad. Read the funnel in order — clicks, landing-page views, conversions, spend — rather than seeking one unquestionable platform ROAS [[43]].

- **Ad (Meta) — did the ad earn attention and deliver traffic?** Spend, impressions, reach, frequency, CPM, link/outbound CTR, outbound clicks, CPC, landing-page views, cost per landing-page view, by campaign, ad set and creative.
- **Handoff — did the traffic arrive?** Umami landing visits ÷ Meta outbound clicks, or Umami views ÷ Meta landing-page views per ad (expected below 1 because of consent and blockers; treat sudden shifts as tracking problems), and Meta landing-page views ÷ link clicks to catch load or in-app-browser failures. Diagnostic ratios, not benchmarks.
- **Page (Umami, by UTM) — did the page convert the delivered traffic?** Confirmed signups ÷ landing visitors or views per `utm_content`, plus form-seen, start, completion and failure rates, device and browser mix, in-app share.
- **Business (checkout) — did the traffic produce value?** Purchases, revenue, plan, currency, refunds or cancellations.
- **Cost per signup** = ad spend ÷ site-counted confirmed signups for the same UTM cohort and campaign window. Add checkout clicks and cost per checkout click, and signup-quality proxies (download-link clicks, survey-reported installs, coupon redemptions) when volume allows.
- **Economics:** Common Thread Collective judges acquisition on first-order value versus CAC by monthly cohort [[102, 103]] and ties ad decisions to business economics [[98, 99]]. Here that means cost per signup plus ad spend ÷ revenue per month: even the free funnel should be judged on whether spend ÷ monthly revenue trends toward 1, not on cost per signup alone.

### 5.2 Meta versus Umami: expect them to differ

Use Meta for delivery and spend, Umami for site outcomes and the checkout webhook for purchases, and record Meta's attribution window. Meta counts modelled or attributed conversions under its click and view windows, and the Pixel and Conversions API run only after marketing consent; Umami counts site events subject to blockers and implementation [[42, 43]]. Never overwrite the canonical site count with Meta's or "correct" one tool to match the other [[47]]. Triangulate platform reporting, independent analytics, UTMs, actual orders and post-purchase surveys [[44, 45, 46]]. Track the gap as a data-quality metric: (Meta-attributed conversions − Umami signups) ÷ Umami signups.

Geo-holdout incrementality tests show platform-attributed performance is not necessarily incremental, but they need far more spend and conversions than this site has [[100, 101]].

### 5.3 UTM conventions

Keep values lowercase, stable and identical across campaigns; consistency matters more than the exact taxonomy, because capitalization and naming drift fragment reporting [[45]]. Conventions in the sources:

- `utm_source=meta`, `utm_medium=paid_social`, `utm_campaign=objective-market-language`, `utm_content=creative-id-or-short-name` [[41]]
- `utm_source=facebook`, `utm_medium=paid_social`, `utm_campaign={{campaign.name}}`, `utm_content={{adset.name}}`, `utm_term={{ad.name}}` (Meta dynamic fields) [[45]]
- `source=meta`, `medium=paid_social`, `campaign=…`, `adset=…`, `creative=…` [[131]]
- `utm_source=meta`, `utm_medium=paid-social`, `utm_campaign={skill}-{lang}-{geo}`, `utm_content={ad-id-short}`

[Divergence: pplx, exa and claude use `meta` as the source while youcom uses `facebook`; claude writes `paid-social` where the others write `paid_social`; youcom puts the ad set in `utm_content` and the ad in `utm_term`, while pplx and claude put the creative or ad in `utm_content`]

UTMs travel with the click when in-app browsers drop or obscure the referrer [[131]], but they don't observe view-through influence or recover cross-device journeys [[41]]. Never put personal data in URL parameters.

### 5.4 Minimum volume before judging an ad

Below the minimum, judge ads only on delivery and technical diagnostics — CTR and cost per landing-page view — never winner/loser language, and pool signup rate across the same campaign and ad-set structure. Pause only for a clear technical failure, materially worse cost after adequate spend, or poor quality evidence. Set the minimum in advance and call too few arrivals "inconclusive".

[Divergence: exa proposes 100 landing-page views or 10 valid signups per ad for a directional creative read (operational, not statistical); claude proposes 10–20 signups per ad as the floor for even crude comparisons (SPECULATIVE); pplx found no trustworthy universal minimum [UNVERIFIED] and rejects Common Thread Collective's roughly $500–$1,000 per creative "activation" spend as an ecommerce operating rule that doesn't transfer [VENDOR: Common Thread Collective] [[98]]; youcom notes Meta's learning phase of about 50 optimization events in seven days per ad set is an optimization-system threshold, not proof that an ad or page works [VENDOR: Meta] [[132]]]

### 5.5 In-app browsers and device mix

- Break out in-app vs external browser, phone vs desktop, browser family and operating system; report each segment's views, signup rate, error rate and checkout-click rate separately. Don't treat desktop and mobile as one population, and don't "correct" the numbers. In-app browsers can affect autofill, the keyboard, navigation, cookie and consent behaviour and checkout completion; app-to-browser handoffs and privacy restrictions can break session continuity and attribution [[41, 133]].
- Run a QA pass on real Instagram and Facebook ad links on real phones: the final URL keeps campaign labels, the page loads, the form completes, and the success event fires exactly once.
- Compare signup rate for `in_app=yes` vs `in_app=no`: a large gap points to friction (autofill, keyboard, failed submits) rather than weak creative (SPECULATIVE).
- With 76–87% phone traffic on English pages, device flow is an investigation priority: look for patterns and blockages that steer qualitative research, use device splits as clues, and don't declare a mobile-specific win from a handful of conversions [[25]].

## 6. Data-Quality Checks for Event Tracking

Review data quality before interpreting any dashboard: "event received" is not "user performed the intended action", and a broken event is not a weak funnel. Data quality comes before analysis [[84]]; its dimensions are accuracy, completeness, consistency, timeliness, validity and uniqueness, and duplicate events or schema drift make plausible dashboards systematically wrong [[51, 52, 53]].

### 6.1 Weekly and post-release checklist

Run after every release and at least weekly while campaigns run (HIGH for the principle; thresholds SPECULATIVE unless stated):

- **Funnel order:** views ≥ form seen ≥ starts ≥ signups, per form; any violation is a bug — exactly how the autofill doubling would have shown up. Allow only documented cross-page or repeat-session exceptions. This applies sample-ratio-mismatch thinking, built by Vermeer and colleagues for experiments, to any event pair with a known ratio, such as the two forms on one page or Umami versus the email platform [[50, 134, 135]].
- **Duplicates:** events per page view, session and form instance; at most one signup per visitor per page per day; flag any once-per-page or once-per-form event firing twice in one view, and starts per view, signups per visitor or submits per start beyond plausible bounds.
- **Signup reconciliation:** Umami signup events vs new email-platform contacts, daily or weekly. The email platform isn't blocked, so it should be ≥ Umami; alert if Umami exceeds it, and investigate sudden gaps without expecting exact parity. Umami recommends reconciling high-value events against the system of record [[49]].
- **Server reconciliation:** browser checkout clicks vs webhook purchases (the server is authoritative for revenue); webhook purchases vs the checkout provider; Meta clicks vs tagged arrivals, without expecting equality; Umami views vs server logs where available.
- **Properties and values:** share of critical events carrying skill, language, form and page — target ≥95%, near-complete for revenue-critical data; validate enums and quarantine unknown values; every failed submit carries an allowed reason, with unknowns counted separately; watch for new spellings or unbounded values after each release.
- **Recorded share:** PostHog recorded views ÷ Umami views, expected around 30% ± 10 points — context only, never a conversion denominator.
- **Release comparison:** compare event counts and event-per-view ratios before and after each deploy; annotate every time series with deploy dates and campaign changes; don't compare rates across a trigger change as if they were identical (Orphan Topics: metric definitions need a changelog).
- **Synthetic journeys:** after each deploy, on each language, page and device class — load the page, focus the form, trigger a validation failure, double-click, navigate, retry, succeed, click checkout — and confirm exactly one expected event with correct labels, and none on failure [[49]]. Mark test traffic (e.g. `?test=1`) and exclude it from business counts.
- **Freshness:** delay between an event and its availability in reports; investigate missing daily data.
- **Owner and internal traffic:** cannot be filtered today. Annotate campaign windows and don't read small daily moves as evidence; a URL flag or localStorage opt-out could partly fix it [UNVERIFIED for Umami-specific support]; until then, record owner-traffic share as unavailable.
- **A/A tests:** skip them at this scale — Sullivan's reported view is that they aren't worth running below very high traffic (secondary source) [[136]]; run the ratio checks instead.

[Divergence: youcom flags an unexplained pageview change above 20% against the same-weekday baseline; pplx offers 30% week on week as a calibratable example (SPECULATIVE); claude flags any event-to-view ratio moving more than ×2 between the 7 days before and after a deploy (SPECULATIVE)]

Autofill-fix specifics are in §4.1. Never send emails, names, message text or other typed values as properties [[49]].

## 7. Event Naming and the Tracking Plan

### 7.1 Event names

Put the action in the event name and the context in properties: events describe actions, properties supply key–value context [[55, 85]]. Don't create `homepage_audit_english_hero_form_signup` and `homepage_audit_polish_bottom_form_signup` — that is one action with properties. Use one casing, one format, one tense and one vocabulary; audit rules flag duplicate names and inconsistent casing [[61, 111]], and object-action naming with explicit entities scales better than near-duplicates [[137]]. Ahava recommends `snake_case` [[54]].

[Divergence: pplx, youcom and claude use `snake_case` object_action names (e.g. `form_seen`, `checkout_click`); exa uses dot notation (`form.seen`, `checkout.clicked`); within snake_case, youcom uses past tense (`form_started`, `signup_completed`) while pplx and claude use bare forms (`form_start`, `checkout_click`)]

Example event sets:
- `form_seen`, `form_start`, `form_submit_failed`, `signup_success`, `download_click`, `checkout_click`, `sample_output_click`, `hero_video_click`, `topbar_link_click`
- `form_seen`, `form_started`, `form_submit_failed`, `signup_completed`, `download_link_requested`, `checkout_clicked`, `purchase_completed`, `sample_output_clicked`, `hero_video_started`, `topbar_link_clicked`, `scroll_milestone_reached`, `rage_click_detected`
- `page.viewed`, `form.seen`, `form.started`, `form.submit_failed`, `signup.completed`, `download.requested`, `sample_output.clicked`, `hero_video.clicked`, `topbar_link.clicked`, `checkout.clicked`, `purchase.completed`
- `form_seen`, `form_start`, `signup_submit`, `signup_fail`, `checkout_click`, `sample_click`

### 7.2 Properties

Use only low-cardinality, bounded labels; never emails, typed text, free-form input, full URLs with query strings or unique customer IDs [[49]]. For each event, state whether it fires once per page view, session, form instance or transaction. Proposed properties (pick one spelling each — `form_position`, `form_location` and `form` name the same thing):

- `skill` = `homepage_audit` | `website_planning` | `ux_design`
- `language` (or `lang`) = `pl` | `en`
- `page_type` = `free_landing` | `paid_landing`; `page`
- `form_location` / `form_position` = `hero` or `top` | `bottom`
- `error_reason` / `failure_reason` / `reason` — bounded enum (§4.1)
- `device_context` / `device_class` = `mobile` | `desktop`; `browser_class`
- `plan`, `product`, `currency`
- `source`, `campaign`, `adset`, `creative`, `campaign_label`
- `delivery_location`, `destination`, `location`, `consent_state`

### 7.3 Layers and how many events

Separate core business events from funnel events and from fine-grained UX events, and define fewer events [[57, 62]]:
- Core business: `signup_completed`, `checkout_clicked`, `purchase_completed`, `download_link_requested`.
- Funnel: `form_seen`, `form_started`, `form_submit_failed`, `sample_output_clicked`.
- UX diagnostics, kept outside the core plan: `hero_video_started`, `topbar_link_clicked`, `scroll_milestone_reached`, `rage_click_detected`.

Every new event needs a decision it supports — if none exists, don't add it — and a review date.

### 7.4 The tracking plan

Keep it as one versioned file in the repository next to the code (e.g. `tracking-plan.md`); any pull request that adds or changes an event updates it. Start from business objectives, KPIs, useful segments and campaign labels before tagging [[88]], then add only the events needed to build those metrics [[60]]; translate vague requirements into explicit key–value definitions [[58]]. Event-based models need disciplined naming, definitions and governance, because inconsistent names fragment reporting [[89, 90]]. Fields per event:

- event name and plain-language business definition;
- the business question, metric and decision it serves;
- exact trigger timing and deduplication rule; counting unit;
- required and allowed properties, with enums;
- intended denominator;
- source (browser or server) and which system counts it;
- consent category (necessary / analytics / marketing);
- PII status: prohibited;
- layer (core, funnel or UX);
- owner;
- QA test, with device and browser cases;
- date introduced or changed, schema version, deprecation status.

### 7.5 Low-code (attribute-based) tracking

Umami tracks clicks declaratively with a `data-umami-event` attribute on any element, with properties via `data-umami-event-*` attributes; use its JavaScript tracker when conditions or properties are complex [VENDOR: Umami] [[59, 138]]. The general pattern is stable data attributes on links and forms plus one delegated listener. Use it only where the action and its labels are unambiguous; for signup success and purchase, explicit outcome instrumentation is safer than a generic click listener, and edge cases must be tested rather than assumed [[49, 56]]. The tracking plan stays canonical, and synthetic tests (§6.1) verify the attributes.

## 8. Recommended Metric Set for This Site

Confidence is as the sources rated it; where they differed, the range is given.

| Metric (§) | Numerator / denominator / unit / window | Role · confidence | Decision it informs |
|---|---|---|---|
| Free signup rate (§1.2) | confirmed signups / landing visitors or views (pick one) / % / per page + language, weekly and rolling 28 d | Primary, free pages · HIGH (one source MEDIUM) | Keep, change or revert a free-page change |
| Confirmed signup count | signups / none / count / daily, weekly | Outcome, always shown with the rate · HIGH | Lead volume |
| Checkout-click rate (§1.3) | checkout clicks / paid-page visitors or views / % / weekly, 28 d | Paid-page leading indicator: primary or funnel step (§1.3) · HIGH (one source MEDIUM) | Paid-page and pricing-display changes |
| Purchases and revenue (§1.3) | checkout orders; revenue per currency and plan / none / count, currency / weekly, monthly | Business outcome · HIGH | Is the business working |
| Purchase rate; revenue per paid-page visitor (§1.4) | purchases or revenue / paid-page visitors / %, currency per visitor / rolling 28 d | Business outcome once purchases are frequent · HIGH to MEDIUM, contested (§1.4) | Offer and budget economics |
| Purchases per checkout click (§1.3) | purchases / checkout clicks / % / window | Downstream proxy · MEDIUM | Checkout friction, directional only |
| Form-seen rate / form reach (§4.1) | visitors or page loads with form seen / landing visitors or views / % / weekly | Funnel step · MEDIUM | Form placement, mobile exposure |
| Form-start rate (§4.1) | genuine starts / form seen / % / weekly, by form position | Funnel step · HIGH (one source MEDIUM) | Offer clarity, form invitation |
| Form completion rate (§4.1) | confirmed signups / genuine starts on the same form / % / weekly | Funnel step · HIGH | Form friction, validation |
| Form abandonment (§4.1) | (starts − signups) / starts / % / per form, session or 24 h | Diagnostic · unrated | Where friction sits |
| Failed-submit rate (§4.1) | failed attempts / submit attempts (or / starts) / %, by reason / weekly | Guardrail, data quality · HIGH (one source MEDIUM) | Fix the form or backend |
| Failure-reason mix (§4.1) | failures by reason / all failures / % / window | Diagnostic · HIGH | Prioritise fixes |
| Cross-sell click rate | free→paid clicks / free-page visitors / % / weekly | Context · MEDIUM to LOW | Paid-offer placement on free pages |
| Same-session free-to-paid share | sessions with free + paid views / sessions with a free view / % / weekly | Context · LOW | Are pages explored together |
| Cost per signup (§5.1) | ad spend / site-counted signups, same UTM cohort / currency / campaign window | Paid-social primary · HIGH to MEDIUM | Scale, pause or stop campaigns |
| Signup rate by ad (§5.1) | signups / Umami landing visitors with that `utm_content` / % / campaign window | Ad-vs-page separation · MEDIUM to HIGH | Separate creative from page |
| Handoff ratio (§5.1) | Umami landing visits / Meta outbound clicks or landing-page views / ratio / campaign window | Paid-social diagnostic · MEDIUM | Load, in-app or tracking loss |
| Meta-to-Umami variance (§5.2) | (Meta-attributed − Umami signups) / Umami signups / % / window | Data quality · HIGH | Attribution or implementation check |
| In-app and mobile signup rate; device mix (§5.5) | signups / views within segment; segment visitors / all visitors / % / campaign window | Guardrail, context · HIGH to SPECULATIVE | Fix the mobile or in-app flow |
| Download-link request rate (§2.2) | download requests (or email-URL downloads) / confirmed signups / % / cohort, 7–30 d or monthly | Activation proxy · MEDIUM | Delivery and install instructions |
| Install-guide email click rate (§2.2) | unique clicks on install link / delivered emails / % / per email, cohort | Activation proxy · MEDIUM | Follow-up usefulness |
| Self-reported install / useful-run share (§2.2) | positive answers / respondents (show response count) / % / monthly cohort | Activation evidence · LOW | Onboarding, lead-magnet quality |
| Tagged follow-up purchases (§2.2) | orders with cohort link or code / cohort signups, emails delivered or codes issued / %, revenue / 30–90 d | Free-to-paid signal · LOW to MEDIUM | Value of free offers and nurture emails |
| Self-reported source (§2.2) | purchases citing each source / all purchases / % / quarterly | Attribution · MEDIUM | Channel mix |
| Untagged cohort ratio (§1.4) | purchases in month M / signups in M−1 and M−2 / ratio / monthly | Free-to-paid · SPECULATIVE, contested (§1.4) | Long-run viability |
| Recorded share (§6.1) | PostHog recorded views / Umami views / % / weekly | Context, data coverage · HIGH | How representative recordings are |
| Funnel-order violations (§6.1) | out-of-order events / relevant events / % / weekly | Data quality · HIGH | Broken triggers |
| Duplicate rate (§6.1) | suspected duplicates / critical events / % / daily, release window | Data quality · HIGH | Block decisions until fixed |
| Event completeness (§6.1) | events with all required properties / critical events / % / daily; target ≥95% | Data quality · HIGH | Block reporting if degraded |
| Signup reconciliation (§6.1) | Umami signups vs new email-platform contacts / counts / daily, weekly | Data quality · HIGH | Integration broken or doubled |
| Volume anomaly (§6.1) | event count / baseline / ratio / daily | Data quality · HIGH | Release or campaign effect |
| Owner and test traffic share (§6.1) | unavailable until an exclusion method exists | Data quality · LOW | Internal-traffic distortion |

Every displayed rate carries its raw numerator and denominator, unit, data source and data-quality status.

## Disagreements and Open Questions

### Expert-level disagreements and the fit for this site

- **One North Star vs several outcomes.** Reforge and Rachitsky favour one focal output with inputs beneath it [[4, 92, 96]]; Kaushik's macro/micro model supports several measured outcomes [[2]]. Fit: one primary per decision surface; a blended "signups plus revenue" score would hide a change that lifts free acquisition while hurting paid sales.
- **Rate-centric CRO vs business value.** A page can raise its signup rate yet lower revenue by attracting low-intent visitors; Balfour and Ellis call revenue lagging and blind to whether users got value [[6, 35]]. Fit: signup rate as the operating primary, purchases and revenue as the outcome, activation as the quality layer (§1, §2).
- **Conversion rate vs revenue per visitor.** Purchase rate suits usability changes and RPV suits offer or pricing changes [[14, 117]]; here RPV is noisy and contested as a visitor ratio (§1.4).
- **Test or don't test at low traffic.** CXL and Sullivan recommend alternatives to testing [[28, 29]]; some CRO case studies report "valid" uplifts on low-traffic sites, even quoting revenue as "79% statistically significant" [[139]]. Fit: the Georgiev/Miller position — don't present such numbers as conclusions (§3).
- **MDE norms.** Kohavi plans for an MDE of 5% or less, Convert suggests 5–10%, and Georgiev's data puts typical true effects near 4% (§3.1); all imply that only radical changes are readable at this site's volume.
- **Fixed-horizon vs sequential or Bayesian.** Kohavi, Miller and CXL stress precomputed samples and no unplanned peeking [[17, 20]]; Georgiev argues valid sequential designs keep error control and save sample [[66, 67]]. Neither creates information the traffic lacks, and manual dashboard peeking is not sequential analysis (§3.3, §3.5).
- **Engagement vs activation.** CRO dashboards often promote scroll, time and video engagement; activation frameworks measure the first successful use of the product, which fits this site better [[36, 37]] (§4).
- **Browser attribution vs privacy.** Person-level attribution would be richer, but the answer is aggregate cohorts, tagged links, surveys and total-business reconciliation — triangulation, not proof — rather than weakening the privacy boundary (§2).
- Visitors vs views, the 30/14/28 thresholds, and minimum ad spend: see the inline markers in §1.2, §3.1 and §5.4.

### Open questions only the site's own data can answer

- What exact behaviour counts as a successful skill run.
- Whether email install-link clicks predict installation.
- Whether form seen predicts signup after controlling for device and form position.
- Whether any ad or ad set produces higher-quality free users (downloads, survey-reported use, coded purchases).
- Whether sample-output or proof clicks predict signup (§4.3).

## Orphan Topics

### The free skill is a product sample, so define signup quality by behaviour

A high signup rate followed by low download or use may mean the page acquires curiosity but the product fails to deliver value — which is why download requests, install instructions and a delayed usefulness survey belong in the measurement set even though they sit outside landing-page CRO. Define a "quality signup" by behaviour — clicked install instructions, requested the download, reported real use, clicked a relevant paid-product explanation, used a cohort-tagged checkout path — not by email domain or demographics; the useful acquisition unit is a new user who reaches value [[4, 34]].

### Separate count authority from explanatory evidence

Umami for site counts, the checkout webhook for purchases, the email system for delivery and clicks; PostHog recordings only explain behaviour within the consented ~30%, whose representativeness is not established (SPECULATIVE). Treat repeated observations in recordings as hypotheses and validate their prevalence in Umami or server counts. Don't force tools to identical totals: consent, blockers, counting units and identifiers differ, and privacy-first systems deliberately trade person-level continuity for less data collection [[10, 107]].

### Privacy sets an attribution ceiling — document it as a feature

Server-side purchases are reliable counts yet deliberately unjoinable to ads or signups. Document this, and report aggregate cohort evidence rather than attempting probabilistic identity stitching. Moving collection server-side does not remove EU privacy obligations or the need for transparent data flows, and can reduce user-visible auditability [[83]].

### Metric definitions need a changelog

Treat a metric as an interface contract: when a trigger changes — as form start is changing now — keep the old definition, date the break, and don't compare pre- and post-change rates as if identical [[58, 60]].

### Denominator integrity is the general lesson of the autofill bug

Every rate is only as valid as its denominator: duplicated starts make completion look worse, missing views make signup rate look better, and consent-only recording makes qualitative evidence look different from total traffic. Every dashboard tile should show its unit, numerator, denominator, data source and quality status.

### A tracking plan's main value is shared meaning

Discussing event definitions surfaces different assumptions about what an event means; on a small team the most valuable artefact may be a one-page event dictionary with exact triggers and denominators, updated whenever product behaviour changes [[55, 88]].

### Experts learn late to define fewer events

Dechau describes taking about seven years to realise he was defining too many events [[57]] — so give each of the five events being added now a review date.

### Don't reward the wrong behaviour or invent money values

Optimizing only the most immediate conversion can ignore value created by other actions, but an unvalidated "micro-conversion value" becomes a made-up financial number. Show free signups, tagged paid outcomes and diagnostic engagement separately, with no arbitrary monetary value on sample clicks or video plays [[72, 116]].

### Published CRO patterns replicate smaller than claimed

Vermeer's replication work found familiar UX-pattern effects substantially smaller than first reported, and some business metrics stayed underpowered even at large scale; don't treat published patterns or big lifts from small case studies as forecasts for this audience [[70]].

### Growth loops: a later lens, not a reason to over-instrument now

In a growth loop, one cohort's output — e.g. a user sharing a link or publishing an example made with a skill — acquires the next cohort. With no evidence such a loop matters yet, treat it as a product hypothesis, not a metric requirement [[140, 141]].

### What to avoid

Totals without denominators; rates mixing views and visitors; counting autofill as intent; treating a download as activation; treating Meta attribution as canonical; declaring winners from a handful of purchases; endless slicing by language, device and ad; portable conversion benchmarks; adding events without a decision they can change [[15, 21, 123]].

## Sources

1. [Six Web Metrics / Key Performance Indicators To Die For](https://www.kaushik.net/avinash/rules-choosing-web-analytics-key-performance-indicators/) [pplx]
2. [Excellent Analytics Tip #13: Measure Macro AND Micro ...](https://www.kaushik.net/avinash/excellent-analytics-tip-13-measure-macro-and-micro-conversions/) [pplx, youcom]
3. [Trustworthy Online Controlled Experiments - Google Bøger](https://books.google.com/books/about/Trustworthy_Online_Controlled_Experiment.html?hl=da&id=NHjQDwAAQBAJ) [pplx]
4. [How to Choose & Measure Impactful North Star Metrics — Reforge](https://brian-balfour-s5lh.squarespace.com/resources/north-star-metrics) [youcom]
5. [How to Choose & Measure North Star Metrics: Acquisition, Retention, & Monetization](https://www.reforge.com/blog/north-star-metrics) [youcom]
6. [North star product metrics are leading you astray](https://roadmunk.com/guides/north-star-product-metrics-brian-balfour-reforge/) [youcom]
7. [Stop Obsessing About Conversion Rate - Occam's Razor by Avinash Kaushik](https://www.kaushik.net/avinash/stop-obsessing-about-conversion-rate/) [exa]
8. [Kohavi & Longbotham encyclopedia entry](https://exp-platform.com/Documents/2023-03-11EncyclopeiaMLDSABTestingFinal.pdf) [claude]
9. [Macro and micro conversions](https://cybercemetery.unt.edu/archive/appsnow/20110607190125/http://www.kaushik.net/avinash/2008/03/excellent-analytics-tip-13-measure-macro-and-micro-conversions.html) [claude]
10. [Metrics definitions | Plausible docs](https://plausible.io/docs/metrics-definitions) [pplx, youcom]
11. [Web analytics: what it is, how it works and how to use it](https://plausible.io/blog/web-analytics) [pplx]
12. [Vanity Metrics: Add Context to Add Meaning - NN/G](https://www.nngroup.com/articles/vanity-metrics/) [youcom]
13. [Goal conversions docs](https://plausible.io/docs/goal-conversions) [claude]
14. [Supplement ecommerce testing: what wins and what backfires - Speero](https://speero.com/post/supplement-ecommerce-testing) [pplx]
15. [A/B Testing with a Small Sample Size](https://blog.analytics-toolkit.com/2019/a-b-testing-with-a-small-sample-size/) [exa, pplx]
16. [Statistical Methods in Online A/B Testing – The Book](https://www.abtestingstats.com/) [pplx]
17. [How Not To Run an A/B Test](https://www.evanmiller.org/how-not-to-run-an-ab-test.html) [claude, pplx, youcom]
18. [Sample Size Calculator (Evan's Awesome A/B Tools)](https://www.evanmiller.org/ab-testing/sample-size.html) [claude, pplx, youcom]
19. [growthbook.io growthbook.io and Ron Kohavi growthbook.io](https://hs-8863617.f.hubspotemail.net/hubfs/8863617/Trustworthy_AB_Webinar.pdf) [youcom]
20. [How to Run A/B Tests by Peep Laja](https://cxl.com/conversion-rate-optimization/how-to-run-ab-tests-by-peep-laja/) [youcom]
21. [The Low Base Rate Problem – Evan Miller](https://www.evanmiller.org/the-low-base-rate-problem.html) [exa, youcom]
22. [Using the statistical power formula in reverse makes more sense in A/B test settings, that is, in online settings, where you can maximally power experiments. | Ron Kohavi](https://www.linkedin.com/posts/ronnyk_using-the-statistical-power-formula-in-reverse-activity-7027144092459438080-2FTy) [exa]
23. [meta-analysis of 115 tests](https://georgi-georgiev.medium.com/meta-analysis-of-115-a-b-tests-average-lift-is-4-most-lack-statistical-power-7b61e46c0dbe) [claude]
24. [Conversion Optimization: Complete Guide to CRO for 2023 - CXL](https://cxl.com/conversion-optimization/) [pplx]
25. [Craig Sullivan - Conversions@Google 2018](https://www.youtube.com/watch?v=N1VJVz2JBXY) [pplx]
26. [Why Radical Experimentation Is More Impactful Than Small Optimizations](https://www.chilipiper.com/podcast/radical-experimentation-ben-labay) [youcom]
27. [Testing Insights: Decision Science vs CRO vs Experimentation](https://www.linkedin.com/posts/benlabay_testing-insights-episode-my-man-jonny-longden-activity-7122963033764552704-NWil) [youcom]
28. [A/B testing alternatives for low traffic](https://cxl.com/blog/ab-testing-alternatives/) [claude]
29. [Smart Insights interview](https://www.smartinsights.com/conversion-optimisation/conversion-optimisation-strategy/web-optimisation/) [claude]
30. [Discover Activation Patterns by Business Type - Reforge](https://www.reforge.com/guides/discover-activation-patterns-by-business-type) [pplx]
31. [Improve user activation](https://www.reforge.com/guides/improve-user-activation) [pplx]
32. [What is Self-Reported Attribution? - Fairing.co](https://fairing.co/resources/measurement-faqs/what-is-self-reported-attribution) [pplx]
33. [Self-Reported Attribution - Customer Impact](https://www.customerimpact.be/en/blog/self-reported-attribution/) [pplx]
34. [Lenny Rachitsky on X: "How to determine your activation metric Including real examples from Figma, Linear, Airtable, Snyk, Slack, Asana, and Sprig. Read on (1/5):" / X](https://x.com/lennysan/status/1590032746772328448) [youcom]
35. [Is Product/Market Fit Hiding in Your User Base?](https://seanellis.substack.com/p/is-productmarket-fit-hiding-in-your) [youcom]
36. [How to improve user activation by establishing the right product habits | Brian Balfour](https://www.churn.fm/episode/product-habits-retention) [exa]
37. [I bet you are doing product activation all wrong.](https://www.elenaverna.com/p/hey-b2b-i-bet-you-are-measuring-activation) [exa]
38. [Lenny's Newsletter interview](https://www.lennysnewsletter.com/p/the-original-growth-hacker-sean-ellis) [claude]
39. [DemandSpring](https://demandspring.com/glossary/self-reported-attribution/) [claude]
40. [RankWorks](https://rankworks.com/news/self-reported-attribution-using-survey-data-to-fill-attribution-gaps/) [claude]
41. [What Is UTM Tracking for Meta Ads | Rapid Ads Blog](https://rapid-ads.com/blog/what-is-utm-tracking) [pplx]
42. [Meta Ads vs GA4: Why Clicks and Conversions Differ | metricfixer](https://metricfixer.com/publications/online-advertising/meta-ads-ga4-clicks-sessions-users-attributed-conversions) [pplx]
43. [Client Reporting When Meta Is a Black Box — Foxwell Digital](https://www.foxwelldigital.com/blog/client-reporting-when-meta-is-a-black-box-frameworks-from-foxwell-agencies) [pplx]
44. [Transcript of DEAR META ADS BUYER, YOU'RE NOT ALONE](https://unofficialshopifypodcast.com/episodes/andrew-foxwell-fb-ads-TMQY4v_N/transcript) [youcom]
45. [Beginner Guide: UTMs for Facebook Ads in 6 Steps — Foxwell Digital](https://www.foxwelldigital.com/blog/2021/7/29/6-steps-to-get-you-started-with-utms-on-facebook-ads) [youcom]
46. [FB Ads vs Google UTMs: How to Read Conflicting Data — Foxwell Digital](https://www.foxwelldigital.com/blog/2021/10/17/facebook-ads-manager-reporting-vs-google-analytics-utm-reporting) [youcom]
47. [7 outdated Meta Ads tactics that don't work in 2024](https://www.mkedmc.org/news/7-things-that-dont-work-on-meta-ads-in-2024) [exa]
48. [Form Analytics: What You Can Track and How to Track It - CXL](https://cxl.com/blog/form-analytics/) [pplx]
49. [Event Tracking Best Practices: Names, Properties, and Data ...](https://umami.is/guides/event-tracking-best-practices) [pplx]
50. [Automated SRM detection (ACM)](https://dl.acm.org/doi/fullHtml/10.1145/3530019.3534982) [claude]
51. [Data Quality in Analytics: How Bad Data Leads to Bad Decisions](https://theresumebuilder.com/data-quality-analytics-guide/) [youcom]
52. [Data Quality Audit: 15-Point Checklist Before Every Report](https://domcrypt.org/data-quality-audit-checklist/) [youcom]
53. [How to measure data quality in your product analytics setup](https://contentsquare.com/blog/measure-data-quality-product-analytics/) [youcom]
54. [Implementation Guide For Events In Google Analytics 4](https://www.simoahava.com/analytics/implementation-guide-events-google-analytics-4/) [pplx, youcom]
55. [Module 1: Foundations | Analytics Workbook | Timo Dechau](https://timo.space/books/analytics-workbook/foundations/) [pplx]
56. [Fun With Google Tag Manager: Part 2 | Simo Ahava's blog](https://www.simoahava.com/analytics/fun-google-tag-manager-part-2/) [pplx]
57. [Timo Dechau on LinkedIn: It's embarrassing. It took my basically 7 years to realise that I](https://www.linkedin.com/posts/timo-dechau_its-embarrassing-it-took-my-basically-activity-6898190389551923200-CA7C) [claude, youcom]
58. [From Project To Process](https://www.simoahava.com/analytics/from-project-to-process/) [exa, youcom]
59. [Track events - Umami docs](https://docs.umami.is/docs/track-events) [claude, youcom]
60. [Tracking Plan Office Hours with Avo's Thora Gudfinnsdottir | Amplitude](https://amplitude.com/community/tracking-plan-thora-gudfinnsdottir) [exa]
61. [Naming conventions - Avo Docs](https://www.avo.app/docs/data-design/best-practices/naming-conventions) [exa]
62. [three-layer schema](https://www.linkedin.com/posts/timo-dechau_some-things-can-make-a-data-life-drastically-activity-6960675250573299712-qPVi) [claude]
63. [Trustworthy Online Controlled Experiments](https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/D97B26382EB0EB2DC2019A7A7B518F59/listing) [pplx]
64. [Controlled experiments on the web: survey and practical ...](https://ai.stanford.edu/~ronnyk/2009controlledExperimentsOnTheWebSurvey.pdf) [youcom]
65. [Practical Guide to Controlled Experiments on the Web](https://ai.stanford.edu/~ronnyk/2007GuideControlledExperiments.pdf) [youcom]
66. [Q&A on Sequential Statistics in A/B Testing](https://blog.analytics-toolkit.com/2023/qa-on-sequential-statistics-in-a-b-testing/) [youcom]
67. [How to Run Shorter A/B Tests?](https://blog.analytics-toolkit.com/2022/how-to-run-shorter-a-b-tests/) [youcom]
68. [Simple Sequential A/B Testing](https://www.evanmiller.org/sequential-ab-testing.html) [pplx, youcom]
69. [Lukas Vermeer](https://www.lukasvermeer.nl/) [pplx]
70. [feed](https://www.lukasvermeer.nl/feed) [pplx]
71. [Digital Marketing and Measurement Model](https://www.kaushik.net/avinash/digital-marketing-and-measurement-model/) [youcom]
72. [Your Web Metrics: Super Lame or Super Awesome?](https://www.kaushik.net/avinash/web-metrics-super-lame-super-awesome/) [pplx]
73. [Conversion Research Report - CXL](https://cxl.com/institute/wp-content/uploads/2017/08/Growth-Marketing-Workshop-Research-and-Testing-Peep-Laja-.pdf) [pplx]
74. [MASTER THE ESSENTIALS OF CONVERSION OPTIMZATION](https://cxl.com/Essentials%20of%20Conversion%20Optimization%20by%20ConversionXL.pdf) [youcom]
75. [A Ridiculously Effective Technique for Online Lead Generation](https://cxl.com/blog/ridiculously-effective-technique-for-online-lead-generation/) [exa]
76. [Three Questions Every Test Should Answer Before It Launches](https://speero.com/post/three-questions-every-test-should-answer-before-it-launches) [pplx]
77. [When to Run an A/A Test, and When to Check Instrumentation](https://speero.com/post/when-to-run-an-a-a-test-and-when-to-check-instrumentation) [pplx]
78. [Optimizing beyond conversion rate](https://speero.com/post/optimizing-beyond-conversion-rate) [claude]
79. [Multiple tests at once](https://speero.com/post/can-you-run-multiple-a-b-tests-at-the-same-time) [claude]
80. [LukeW | Conversions: Mobile Patterns for Experiments](https://www.lukew.com/ff/1967/conversions-mobile-patterns-for-experiments) [pplx]
81. [The Million Dollar Optimization Strategy (Video) - CXL](https://cxl.com/blog/the-million-dollar-optimization-strategy-video/) [pplx]
82. [The Million Dollar Optimization Strategy - Andre Morys - ConversionXL Live 2015](https://fr.slideshare.net/slideshow/the-million-dollar-optimization-strategy-andre-morys-conversionxl-live-2015/54961979) [pplx]
83. [Agency, Transparency, And Control: Unsolved Problems With Server-side Tagging | Simo Ahava's blog](https://www.simoahava.com/analytics/agency-transparency-control-unsolved-problems-server-side-tagging/) [exa]
84. ["Garbage In Garbage Out" talk](https://www.slideshare.net/SimoAhava) [claude]
85. [Event Taxonomy | Timo Dechau](https://timo.space/library/event-taxonomy/) [pplx]
86. [Event Taxonomy](https://timodechau.com/library/event-taxonomy/) [youcom]
87. [Smart Tradeoffs in Analytics — Slack Tracking Plan](https://timo.space/blog/making-smart-tradeoffs-in-analytics-a-slack-tracking-plan-journey/) [youcom]
88. [The 10 best analytics strategies in 2018, Krista Seiden, Google, OMR18](https://www.youtube.com/watch?v=TnQbm2epM5k) [pplx]
89. [Episode 89: Google Analytics 4 (GA4) with Simo Ahava and Krista Seiden](https://withcandour.co.uk/podcast/episode-89-google-analytics-4-ga4-with-simo-ahava-and-krista-seiden) [youcom]
90. [The Unglamorous Thing That Makes AI-Driven Analytics Actually Work - Digital Debrief](https://kristaseiden.com/the-unglamorous-thing-that-makes-ai-driven-analytics-actually-work/) [youcom]
91. [Evaluate retention cohorts](https://www.reforge.com/guides/evaluate-retention-cohorts) [pplx]
92. [Build an end-to-end quantitative growth model](https://www.reforge.com/guides/build-an-end-to-end-quantitative-growth-model) [pplx]
93. [Activation, retention and more: growth lessons from the industry's best](https://www.intercom.com/blog/podcasts/activation-retention-and-more-growth-lessons-from-the-industrys-best) [pplx]
94. [Hacking Growth by Sean Ellis: Summary & Notes by Sean Ellis](https://grahammann.net/book-notes/hacking-growth-sean-ellis) [claude, youcom]
95. [Breakout Growth](https://subclub.com/episode/8-principles-for-sustainable-growth-sean-ellis-ethan-garr-breakout-growth) [claude]
96. [Lenny Rachitsky’s Quotes](https://glasp.co/quotes/lenny-rachitsky) [youcom]
97. [Meta Ads & Performance Marketing Blog | Foxwell Digital — Foxwell Digital](https://www.foxwelldigital.com/blog?offset=1790970526069) [pplx]
98. [The Ecommerce Creative Testing Framework](https://commonthreadco.com/blogs/coachs-corner/the-ecommerce-creative-testing-framework-from-gambling-to-math) [pplx]
99. [Meta Advertising](https://commonthreadco.com/pages/methodology-meta) [pplx]
100. [Geo Holdout Incrementality Testing for Ecommerce Brands](https://commonthreadco.com/pages/incrementality) [youcom]
101. [The Secret to Smarter Budget Allocation](https://commonthreadco.com/blogs/ecommerce-playbook/secret-to-smarter-budget-allocation) [youcom]
102. [First-order profitability](https://commonthreadco.com/blogs/bridges/unlock-first-order-profitability) [claude]
103. [diagnostic](https://commonthreadco.com/products/ecommerce-diagnostic) [claude]
104. [How to pick the right metrics for your website?](https://plausible.io/blog/pick-the-right-metrics) [pplx]
105. [Web analytics vs product analytics: core difference and ...](https://plausible.io/blog/web-analytics-vs-product-analytics) [pplx]
106. [GitHub - plausible/analytics: Open source, privacy-first web analytics. Lightweight, cookie-free Google Analytics alternative. Self-hosted or cloud. · GitHub](https://github.com/plausible/analytics) [youcom]
107. [About – umami](https://docs.umami.is/docs/about) [pplx, youcom]
108. [Tracker functions](https://docs.umami.is/docs/tracker-functions) [youcom]
109. [How Fathom measures your analytics](https://usefathom.com/docs/start/measurement) [pplx]
110. [Web Analytics Metrics You Should Use to Win More Customers](https://usefathom.com/learn/web-analytics-metrics) [pplx]
111. [Avo tracking plan audit rules - Avo Docs](https://www.avo.app/docs/audit/rules) [exa]
112. [Metrics guide](https://www.convert.com/blog/a-b-testing/ab-testing-metrics-guide/) [claude]
113. [MDE guide](https://www.convert.com/blog/a-b-testing/minimum-detectable-effect-mde-ab-testing/) [claude]
114. [Sample-size tech note](https://signalvnoise.com/posts/3004-ab-testing-tech-note-determining-sample-size) [claude]
115. [Dashboard explained](https://usefathom.com/docs/start/dashboard) [pplx]
116. [You Are What You Measure, So Choose Your KPIs (Incentives) Wisely!](https://www.kaushik.net/avinash/measure-choose-smarter-kpis-incentives/) [pplx]
117. [Finding a CRO Agency: Costs, Criteria, and Checklist](https://www.konversionskraft.de/en/guides/finding-a-cro-agency) [pplx]
118. [What Can Be Learned From 1,001 A/B Tests?](https://blog.analytics-toolkit.com/2022/what-can-be-learned-from-1001-a-b-tests/) [youcom]
119. [Formulas for Bayesian A/B Testing](https://www.evanmiller.org/bayesian-ab-testing.html) [pplx]
120. [(PDF) Georgi Z. Georgiev - Statistical Methods in Online A/B Testing](https://www.abtestingstats.com/Statistical-Methods-in-Online-A-B-Testing-pdf.pdf) [pplx]
121. [A/B Testing Statistics – A Concise Guide for Non-Statisticians](https://blog.analytics-toolkit.com/2022/a-b-testing-statistics-a-concise-guide/) [pplx]
122. [How can I trust and use test results to my advantage?](https://www.kameleoon.com/blog/how-can-i-trust-and-use-test-results-my-advantage) [pplx]
123. [Lead Generation Form Analysis - Part II](https://www.tatvic.com/blog/lead-gen-form-analysis-part-2/) [exa]
124. [Umami Event Tracking Setup](https://opsblu.com/documentation/analytics-platforms/umami/setup-and-implementation/event-tracking/) [youcom]
125. [What Scroll Depth Is: How to Measure & Use It](https://www.omniconvert.com/what-is/scroll-depth/) [youcom]
126. [Scroll Depth vs Conversion Rate: The Chart That Lied](https://launchwithben.com/learn/research/scroll-depth-conversion) [pplx]
127. [Rage clicks - what do they tell you about user behavior? - Understand your customers | Microsoft Clarity Blog %](https://clarity.microsoft.com/blog/rage-clicks-user-behavior/) [pplx]
128. [AI Visitors Show Stronger Intent Signals Than Traditional Channels](https://clarity.microsoft.com/blog/ai-visitors-show-stronger-intent-signals/) [pplx]
129. [Dave Chaffey glossary](https://www.davechaffey.com/digital-marketing-glossary/website-macro-and-micro-conversions/) [claude]
130. [Case Studies Archives - Success stories from Clarity users](https://clarity.microsoft.com/case-studies/category/case-studies/) [pplx]
131. [Facebook UTM Builder — Free Tool for Meta Ads + GA4 Setup](https://www.elsop.com/facebook-utm-builder-meta-ads-ga4/) [exa]
132. [Understanding and optimizing your ad campaign](https://developers.meta.com/vr/resources/optimize-ad-campaign/) [youcom]
133. [Meta and Facebook Ads UTM Tracking: The 2026 Definitive Guide](https://www.terminusapp.com/blog/how-use-utm-codes-track-your-facebook-ads/) [pplx]
134. [TU Delft](https://repository.tudelft.nl/record/uuid:31d2806f-2bf3-43c3-9e71-3985fd7368a6) [claude]
135. [Online Dialogue on CH2019](https://www.onlinedialogue.nl/en/blogs/sample-ratio-mismatch/) [claude]
136. [LinkedIn mention](https://www.linkedin.com/in/xinyu-liang-8177b0250/) [claude]
137. [Event Taxonomy Design as Data Engineering | Product Philosophy](https://productphilosophy.com/articles/event-taxonomy-design-data-engineering) [exa]
138. [Umami developers](https://umami.is/product/developers) [claude]
139. [CXL case study](https://cxl.com/blog/optimizing-low-traffic-site-13-5-uplift-case-study/) [claude]
140. [Map your acquisition loops](https://www.reforge.com/guides/map-your-acquisition-loops) [pplx]
141. [Growth Loops are the New Funnels](https://www.reforge.com/blog/growth-loops) [pplx]
