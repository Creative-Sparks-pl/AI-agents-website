---
provider: "pplx"
model: "openai/gpt-6-luna"
brief: "brief-pplx-deep-landing-page-metrics.md"
duration_ms: 144795
input_tokens: 202734
output_tokens: 13859
cost_usd: 0.0285
truncated: False
citation_scheme: "unified"
---

# Research Results: brief-pplx-deep-landing-page-metrics

**Provider:** pplx (openai/gpt-6-luna)

---

# Research report: Metrics for a small lead-magnet and digital-product marketing site

**Suggested filename:** `brief-pplx-deep-landing-page-metrics.md`

## Executive Summary — the 10 most important recommendations for this site

1. **Keep the two business outcomes separate.** Define successful free signups as the lead-magnet pages’ primary outcome and completed paid orders/revenue as the business’s paid outcome. Do not combine them into a single weighted score: purchases are not attributable to individual signups in your setup, so a combined score would imply a relationship you cannot measure. Kaushik’s macro/micro-conversion framework supports measuring both business outcomes and useful intermediate actions, not treating one as a substitute for the other. [[33, 42]]

2. **For a lead-magnet page, use unique landing-page visitors as the primary denominator where available.** Define signup rate as unique visitors who successfully sign up ÷ unique visitors to that page in the same period. Keep pageviews-based rates as a secondary, explicitly labelled diagnostic. Conversion definitions differ across analytics systems, so do not compare rates without checking each system’s numerator and denominator. [[119, 120]]

3. **Treat checkout clicks as a funnel diagnostic, not paid success.** The business outcome is completed purchases and, where available, revenue. A change that increases checkout clicks but does not increase purchases is not a paid-funnel win. Speero makes the same distinction between journey signals for diagnosis and customer outcomes for judging experiments. [[16]]

4. **Add an aggregate “after signup” measurement layer, not person-level tracking.** Count downloads or product-guide clicks by skill, language and campaign cohort; measure email delivery and clicks in the email platform; and offer a voluntary use survey. A download request is not proof of installation or use. Reforge’s activation framework emphasizes identifying setup, first-value and habit moments; for a downloadable skill, installation or a completed task is a more meaningful activation signal than signup alone. [[44, 50]]

5. **Use campaign-level follow-up links or codes to estimate free-to-paid movement.** A dedicated checkout link or non-discount code in a follow-up email can show aggregate purchases associated with that email cohort without joining a buyer to a site visitor. Label this as an attributed response to a campaign, not proof that a lead-magnet signup caused the purchase. Self-reported attribution can add a different, imperfect view of discovery. [[58, 67]]

6. **Replace the blanket “30 conversions” rule with a sample-size and uncertainty statement.** Thirty conversions is not a universal threshold for a reliable comparison. Before an A/B test, estimate whether the available traffic can detect the smallest commercially meaningful effect. Georgiev explains that sample size depends on baseline rate, effect of interest, power and error tolerance; small samples can only detect large effects reliably. [[134, 136]]

7. **At your current volume, favor large changes, evidence synthesis and staged rollout over routine A/B tests.** At 50–150 visitors a day, a conventional test may detect only very large improvements within a few weeks, depending on baseline conversion. If the MDE calculation says the test needs months, do not call an arbitrary 14–28 day comparison a winner: use usability evidence, ship a reversible improvement, and report the result as directional. [[134, 173]]

8. **Keep form signals interpretable.** Count “form seen” once per form position when at least half of the form is visible for a defined duration; count a start only on actual interaction with that form, not autofill; count a successful signup only after a confirmed success response. Track form position and failure reason as labels, not typed content. Form analytics can identify friction, but does not by itself explain why people abandon. [[103, 128]]

9. **For paid social, separate the ad handoff from landing-page performance.** By ad or ad set, report spend, outbound clicks, landing-page visits, signups, cost per signup and signup rate. Meta’s attributed conversions and Umami’s observed site events answer different questions; consent, in-app handoffs and platform attribution can make the counts differ. UTMs label clicked traffic, not every impression or cross-device influence. [[76, 82]]

10. **Make instrumentation quality a standing metric.** Check that signups do not exceed plausible form starts, starts do not exceed form exposures, and successful signup events reconcile with the email platform or another signup system. Test normal and edge-case journeys after releases, and review event names and properties for missing or duplicate variants. Umami’s event-tracking guidance specifically recommends edge-case tests and reconciling high-value events against the system of record. [[128]]

---

## The Experts and Their Positions

The table includes practitioners and researchers whose published work directly informs at least one of the site’s measurement questions. “Respect” is not a claim that all share one school of thought; it reflects the relevance and standing of their published methodological or practitioner work. Vendor material is labelled as such. The report does not treat vendor benchmarks as universal standards.

| Expert | Field | Key work | Stance on our questions |
|---|---|---|---|
| Ronny Kohavi | Online experimentation | *Trustworthy Online Controlled Experiments*; work on experiment metrics and trustworthiness. [[7, 10]] | Define an overall success criterion and guardrails; check experiment integrity, including sample-ratio mismatch, before interpreting an effect. |
| Georgi Georgiev | Experiment statistics | *Statistical Methods in Online A/B Testing*; Analytics-Toolkit writing on power and small samples. [[136, 134]] | Choose sample size from the effect worth detecting and the acceptable statistical risk; low traffic does not make an underpowered result reliable. |
| Evan Miller | Experiment statistics | “How Not To Run an A/B Test”; sample-size and sequential-test tools. [[148, 1, 3]] | Avoid repeatedly checking a fixed-horizon test and stopping when it looks significant; plan the sample or use a valid sequential method. |
| Lukas Vermeer | Online experimentation | Research and writing on experimentation infrastructure and replication. [[175, 176]] | Replication work finds reported effects for familiar UX patterns can be exaggerated; business metrics can remain underpowered even in large studies. |
| Avinash Kaushik | Web analytics and metric design | Writing on macro/micro conversions, task completion, economic value and actionable reporting. [[33, 38, 42]] | Report acquisition, behavior and outcomes together; do not mistake a large dashboard for useful analysis. |
| Peep Laja | CRO and conversion research | CXL CRO guide and conversion-research materials. [[173, 29]] | Use quantitative and qualitative research to find problems and explain them; do not test low-traffic pages by default. |
| Ben Labay / Speero | Experimentation and CRO | Speero work on experiment planning, detectable effects and instrumentation. [[30, 25]] | Predefine the primary metric, guardrails and decision outcomes; reconcile exposure and analytics counts. Some numeric calibration on current Speero pages is program-specific, not a universal threshold. |
| Craig Sullivan | CRO and mobile UX | Google Conversions talks and mobile-experience guidance. [[27, 24]] | Use quantitative patterns to focus qualitative research; inspect device-specific problems and do not test merely because a test can be run. |
| André Morys | CRO and growth | CXL talk, “The Million Dollar Optimization Strategy.” [[182, 186]] | Optimize for growth and economic outcomes, prioritize strong hypotheses, and invest in research rather than indiscriminate testing. |
| Simo Ahava | Analytics implementation | Event implementation and Google Tag Manager writing. [[88, 93]] | Use explicit event names and properties; element-visibility instrumentation can measure whether an element was actually in view. |
| Timo Dechau | Event data and tracking design | Event Taxonomy and Analytics Workbook. [[92, 96]] | Events describe actions; properties supply context. A tracking plan is a practical alignment document, not just an implementation artifact. |
| Krista Seiden | Analytics and measurement planning | Measurement-plan talk and writing. [[89]] | Start with objectives, KPIs, useful segments and campaign labels before building instrumentation. |
| Brian Balfour / Reforge | Activation, retention and growth | Reforge guides on activation, cohorts and growth models. [[44, 47, 48]] | Define activation around reaching product value, then analyze cohorts; signup alone is rarely the value moment. |
| Sean Ellis | Product growth and activation | Published discussion of activation, aha moments and value delivery. [[51]] | Improve the proportion of users reaching value, and define the key value action from the customer’s experience rather than a convenient registration event. |
| Andrew Foxwell / Foxwell Digital | Paid-social measurement | Foxwell Digital’s “Client Reporting When Meta Is a Black Box.” [[86, 161]] | Read the paid funnel in order, from clicks and landing-page views through conversions and spend; do not seek a single unquestionable platform ROAS. |
| Common Thread Collective | Paid-social and ecommerce measurement | Creative-testing and Meta methodology pages. [[81, 164]] | Connect ad decisions to business economics and test creative systematically. Its spend thresholds come from ecommerce operating contexts and should not be transplanted to this site. [VENDOR: Common Thread Collective] |
| Plausible | Privacy-first web analytics | Metric definitions, goal measurement and metric-selection writing. [[119, 122, 127]] | Define a few goals that reflect site purpose; a later milestone can be more useful than raw signup count when it can be measured legitimately. [VENDOR: Plausible] |
| Umami | Privacy-first web analytics | Event-tracking best practices and metric documentation. [[128, 32]] | Track meaningful actions with consistent names and bounded properties; avoid sensitive or high-cardinality values and reconcile valuable events. [VENDOR: Umami] |
| Fathom | Privacy-first web analytics | Measurement and web-metrics documentation. [[118, 130]] | Make the conversion-rate denominator explicit; website analytics can answer acquisition questions without needing a person’s identity. [VENDOR: Fathom] |

---

## 1. Metric Hierarchy for a Lead-Magnet and Digital-Product Site

### One objective for every page, but not one blended number for the whole business

A useful metric hierarchy has four layers:

1. **Business outcomes:** paid orders and revenue; confirmed free signups as the lead-generation outcome.
2. **Primary page metrics:** signup rate for a free-skill page; purchase rate or revenue per eligible visitor for a paid page, if purchases can be attributed to page exposure.
3. **Funnel diagnostics:** form seen, form start, submit failure, checkout click and cross-sell click.
4. **Context and trust metrics:** traffic source, language, device, ad cohort, consented recording share and event-quality checks.

This combines Kaushik’s macro/micro-conversion view with Kohavi’s emphasis on defining an overall evaluation criterion and guardrails. It does **not** mean every dashboard needs one “north star” ratio that represents both paid and free outcomes. [[42, 10]]

For this site, use **separate primary metrics by page purpose**:

- Free page: unique visitors who complete a confirmed signup ÷ unique visitors to that free landing page.
- Paid page: completed purchases and revenue are the business outcomes, but because server-side purchase events cannot be tied to visitor or campaign, report them as aggregate outcomes rather than a visitor-level conversion rate.
- Cross-sell pages and clicks: diagnostic signals, not success outcomes.

That separation matters: the signup count is measurable and useful, but cannot stand in for revenue or prove that signups later buy. Kaushik recommends measuring macro and micro conversions together; Plausible similarly notes that a signup alone can reward a channel that brings low-intent traffic if a later milestone is available. Here, later purchase linkage is intentionally unavailable, so the honest choice is to report signup and purchase outcomes side by side. [[37, 127]]

### Definitions: numerator, denominator, unit and window

Use consistent definitions and show raw counts alongside every rate. Analytics products differ in whether a conversion rate is based on visitors, sessions, pageviews or event counts, so name the denominator in the metric itself. [[119, 126]]

| Metric | Numerator | Denominator | Unit and window | Role |
|---|---|---|---|---|
| Free signup rate | Unique visitors with ≥1 confirmed signup on a specific free page | Unique visitors to that page | Visitors; report by page/language and fixed date range | Primary for each free landing page |
| Signup yield per 1,000 views | Confirmed signup events | Landing-page views ÷ 1,000 | Signups per 1,000 views in the same date range | Secondary, useful where views are the stable available denominator |
| Form-start rate | Unique page visitors who start that particular form | Unique visitors to the page, or form-seen visitors if measuring conditional start | Visitors; split by top/bottom form | Funnel diagnostic |
| Form completion rate | Unique visitors with confirmed signup | Unique visitors who started that same form | Visitors; same cohort/window | Funnel diagnostic |
| Failure rate per attempt | Failed submit attempts | Submit attempts | Attempts; include error-reason label | Guardrail / friction |
| Checkout-click rate | Unique visitors who click a checkout link | Unique visitors to paid page | Visitors; report plan and language | Funnel diagnostic |
| Aggregate purchase count | Confirmed server-side purchase events | None | Orders per week/month; separate currency and plan where available | Paid business outcome |
| Revenue | Confirmed paid order value | None | Currency and time period; do not sum unlike currencies | Paid business outcome |
| Cross-sell click rate | Unique visitors clicking from a free page to paid page | Unique visitors to that free page | Visitors; by skill and page language | Diagnostic |
| Same-session free-to-paid visit share | Sessions containing both free-page and paid-page views | Sessions containing a free-page view | Sessions; same session definition and window | Context, not signup-to-purchase attribution |

The existing funnel sequence is useful, but avoid an ambiguity: a pageview is not the same as a unique eligible visitor. For a quick campaign read, pageview-based rates can be retained, but label them “per view.” For the main comparison, unique visitors are usually the more interpretable denominator when the analytics system supplies them. [[120, 119]]

### Signup rate, revenue per visitor, and “leads that later buy”

- **Signup rate is the right primary metric for a free page** when the page’s immediate job is to deliver a free skill in exchange for an email. It is an observable outcome, unlike a click on the signup button.
- **Revenue per visitor is not a suitable primary metric for a landing-page test at current scale**, because orders cannot be joined to visitors and purchases are rare. Revenue per eligible visitor is a valuable metric for experiments that change price or order mix when it is measurable; it is not a usable visitor-level score when purchase attribution is unavailable. Speero distinguishes tests judged on purchase rate from offer tests better judged on revenue or contribution per visitor. [[16]]
- **“Leads that later buy” is not currently measurable as a site metric under the stated constraints.** Aggregate purchase totals and aggregate signup totals cannot identify which signups became buyers. Do not divide purchases by signups and name it a lead-to-customer conversion rate; the numerator and denominator are not a linked cohort.

**Recommendation — HIGH confidence:** report free signups and paid orders/revenue as parallel outcomes, with signup rate as the free-page primary metric and paid orders/revenue as aggregate business outcomes. Do not manufacture a single “site conversion rate” by mixing them. This fits the available evidence and the intentional privacy boundary.

---

## 2. After the Signup: Activation and Free-to-Paid Without Personal Tracking

### Measure value after delivery, not just the email exchange

For a downloadable “skill,” value probably requires several steps: the user gets the file, installs it into a supported AI coding tool, and uses it to complete a task. These are distinct milestones. Reforge’s activation material separates setup, aha/first-value and habit moments; its cohort guidance recommends examining whether later behavior follows an earlier milestone. [[44, 47]]

You can measure some of these stages without sending personal data into analytics:

1. **Delivery click or file request, by cohort.** Use a stable, campaign-specific download URL or a small set of non-personal link labels (for example, skill + language + email cohort). Count requests. State that it is a file request, not an installation.
2. **Email engagement, in the email platform.** For each signup cohort or campaign, report delivered messages, clicks on the install/how-to link and unsubscribes. Use clicks more cautiously than opens: a click indicates interaction with the email’s link, not that the skill was installed or used.
3. **Voluntary use survey.** In a follow-up email, ask one short question such as “Have you installed and tried the skill?” with options like “Not yet / Installed / Tried it once / Use it regularly.” Report the response count and response rate; responses are self-selected, so do not treat them as a representative activation rate.
4. **Aggregate free-to-paid response.** Give each relevant follow-up email or free-skill cohort a distinct checkout URL or code. Report completed orders associated with that link/code, if the checkout system exposes aggregate counts. This estimates campaign response; it does not establish that the individual buyer came from a particular signup.

Self-reported attribution is useful as a complementary source because it captures remembered or offline discovery that click-based systems may miss, but it is still a person’s recollection and not a deterministic causal attribution model. Fairing describes it as customer-reported attribution, often gathered near purchase. [[58, 67]]

### Recommended cohort table

Do not join a person’s email, site activity and purchase. Keep an aggregate table with one row per signup cohort or campaign:

| Cohort fields | Aggregate outcomes |
|---|---|
| Skill, language, signup week, signup source/campaign label | Signup count, delivered email count, install-guide clicks, download requests, survey responses by answer, tagged checkout orders, tagged checkout revenue |

If using a campaign-specific coupon, label the result “orders using the cohort code,” not “buyers from the cohort.” Codes may be shared, and users can buy without using them. A dedicated URL may be less promotional but can be forwarded too. These are measurement labels, not identities.

### What not to infer

- A successful email delivery does not prove a download.
- A download click does not prove an install.
- An install-guide click does not prove tool use.
- A positive survey response is self-reported and response-biased.
- A tagged order shows that a link or code was used, not necessarily that the lead magnet caused the purchase.
- Aggregate signup and aggregate purchase counts do not give a valid lead-to-purchase rate.

**Recommendation — MEDIUM confidence:** build an aggregate activation proxy from download requests, install-guide clicks and voluntary survey responses. These are practical, privacy-compatible measures, but they cannot establish individual activation or causal free-to-paid conversion. [[44, 47, 58]]

---

## 3. Decision Rules at Low Traffic

### Why “30 conversions per window” is not a statistical rule

The existing “under 30 conversions in either window = directional only” is a prudent caution label, but it is not a universal threshold for validity. Sample size depends on baseline conversion, the minimum effect of interest, desired power and the false-positive tolerance. Georgiev’s methodological writing explicitly treats these as planning inputs, not a one-size-fits-all conversion-count rule. [[136, 134]]

Thirty conversions can still leave a wide uncertainty range. As a rough Poisson/binomial intuition, the relative standard error of a count of 30 is about \(1/\sqrt{30}\), or 18%; comparing two independent counts of 30 yields uncertainty larger still. That approximation is not a substitute for a test-specific confidence interval, but it shows why “30” cannot imply a precise answer. **[CALCULATION: approximate standard error from count data.]**

Miller shows why checking a conventional test repeatedly and stopping at the first green result inflates false positives; in his illustrative worst case, the false-positive rate rose to 26.1%. His remedy is to set the sample size in advance or use a method designed for sequential monitoring. [[148]]

### Preflight: ask whether a test can answer the question

Before building an A/B test, write down:

- The eligible page and traffic source.
- The assignment unit (ideally a visitor consistently seeing the same version).
- One primary outcome.
- One or two guardrails.
- Baseline rate and smallest effect worth acting on.
- Planned sample size or valid sequential rule.
- Minimum runtime that covers relevant weekly patterns.
- A decision rule: ship, stop, or keep learning.

Kohavi’s work emphasizes an overall evaluation criterion and guardrails, while Georgiev’s work emphasizes planning around the effect of interest and uncertainty. [[10, 136]]

A practical sample-size approximation for a two-arm binary conversion test is:

\[
n_{\text{per arm}} \approx 16p(1-p)/\delta^2
\]

where \(p\) is the baseline rate and \(\delta\) the **absolute** difference you want to detect. This is a rule of thumb, not a replacement for a proper calculator using the chosen power and significance level. Miller publishes the underlying approximation and sample-size tools. [[148, 1]]

**Illustrative examples** (80% power and conventional 5% two-sided significance are approximate planning assumptions, not guarantees):

| Baseline signup rate | Effect to detect | Approx. sample per arm | Approx. total visitors |
|---:|---:|---:|---:|
| 10% | +5 percentage points (50% relative lift) | 576 | 1,152 |
| 10% | +2 percentage points (20% relative lift) | 3,600 | 7,200 |
| 5% | +1 percentage point (20% relative lift) | 7,600 | 15,200 |

At 50–150 eligible visitors/day in total, the first example takes roughly 8–23 days to reach the total sample, assuming an even split and stable traffic. The second takes roughly 48–144 days. At the site’s current aggregate traffic—about 360 views across six landing pages in 14 days—many page-specific tests would take substantially longer, unless traffic rises or the effect is very large. These are calculations using the stated traffic and the sample-size approximation, not source benchmarks. [CALCULATION based on context and web:148]

### Recommended decision policy

**When a test is adequately powered and randomized:**

- Pre-register the primary metric and MDE.
- Run the planned sample size and avoid stopping early on a favorable reading.
- Check the exposure split and tracking integrity before interpreting the result.
- Report observed effect **and uncertainty interval**, not only “winner/loser.”
- Check whether the plausible effect is large enough to matter commercially.

**When the required sample is not attainable in a reasonable time:**

- Do not lower the bar after seeing the data.
- Avoid calling a 14-day before/after change an A/B test.
- Prefer a large, research-backed change that could plausibly create a material effect.
- Use recordings, device inspection, short usability sessions, form failures and survey feedback to locate friction.
- Ship reversible improvements and report the result as “directional, consistent with improvement” unless the design supports stronger inference.

Peep Laja’s CRO guidance treats research as the foundation for hypotheses, and Sullivan’s talks describe quantitative patterns as a way to focus qualitative investigation. [[173, 27]]

### Frequentist, Bayesian and sequential approaches

There is a real disagreement over inference styles. Miller explains that Bayesian methods can allow repeated evaluation under an appropriate model, while fixed-horizon frequentist tests require a preplanned sample or a valid sequential procedure. Georgiev’s book is primarily rooted in frequentist error-statistical methods and cautions against overclaiming that one school is universally superior. [[2, 3, 133]]

For this site, the practical choice is less “Bayesian versus frequentist” than **“valid plan versus unplanned peeking.”** Use the simplest method the owner can understand and consistently apply. A Bayesian report can be useful if it states the probability of meaningful benefit and the risk of harm under explicit assumptions; it does not make tiny data informative. A conventional confidence interval is also useful if the team avoids interpreting “not significant” as proof of no effect. [[140, 146]]

**Recommendation — HIGH confidence:** keep “directional only” as a caution, but replace 30 conversions as a purported threshold with a pretest MDE/power check and an uncertainty statement. At current traffic, expect observational learning and large-change decisions to be more useful than frequent small A/B tests.

---

## 4. Intermediate Steps: Predictive vs Vanity

Intermediate events are useful when they diagnose a specific obstacle. They are not automatically predictive of purchase or signup.

| Signal | Useful definition | How to use it | Main caution |
|---|---|---|---|
| Form seen | At least 50% of the form visible for at least 1 second; once per page view and form position | Compare starts per form-seen visitor and top/bottom form performance | Exposure is not attention or intent. Define the threshold consistently. |
| Form start | First genuine focus/input by a human interaction in a specific form; once per form instance | Diagnose whether form exposure is followed by interaction | Ignore autofill-only population if it creates false starts; never capture typed values. |
| Form failure | A rejected submit attempt, once per attempt, with a bounded reason label (e.g., validation, network, server) | Identify technical friction and compare failures with confirmed success | Retries can produce multiple failures; report attempts and affected visitors separately. |
| Form abandonment | Form-start visitor with no confirmed signup by end of that session, or within a stated 24-hour window | Locate likely friction and segment by device/form position | It is a defined operational proxy, not proof that the person abandoned permanently. |
| Checkout click | Unique visitor clicking a specific plan’s checkout link | Diagnose paid-page intent and outbound handoff | Not a purchase; hosted checkout can introduce unobserved drop-off. |
| Sample-output click | Unique visitor clicking the sample link ÷ unique page visitors | Investigate whether sample proof attracts interest | Interest can reflect curiosity, not buying intent. |
| Hero video click/play | Unique visitors who start a video ÷ visitors who could see its control | Diagnose whether video is discoverable and used | A click is not completion or comprehension. |
| Scroll depth | Visitors reaching a defined threshold (e.g., 50% page depth) ÷ page visitors | Explore whether key content is below the fold | Page length and visitor intent can confound the relationship with conversion. |
| Time on page | Use only with a clear technical definition and context | May help find content that deserves qualitative review | Background tabs, short purposeful visits and tool-specific calculation make it a weak success metric. |
| Rage/dead click | Tool-defined repeated click without expected change, or click on a noninteractive element | Use recordings to inspect whether the page is broken or misleading | A friction clue, not a causal or predictive conversion metric. |

CXL’s form-analytics writing describes field timings, re-entries and last interaction as clues for locating friction, while explicitly warning that form analytics alone do not justify conclusions. [[103]] Microsoft Clarity defines rage clicks as repeated clicks/taps in an area without a page change and presents them as a way to find potential broken elements, not as proof of lost conversion. [[116]]

Scroll depth, time and clicks are especially vulnerable to confounding: people with high intent may both engage more and convert more. A published CRO discussion warns that pooled scroll-depth comparisons can mislead when page types differ, and that correlation does not show that scrolling caused conversion. [[115]] Clarity’s 2026 analysis reports behavioral differences between AI-referred and other traffic across a large dataset, but that is a channel-level descriptive comparison, not evidence that any one engagement signal causes conversion on this site. [[104]]

**Recommendation — HIGH confidence:** instrument form exposure, genuine starts, failures and successes because each maps to an actionable funnel question. Keep video, top-bar, sample and scroll signals as diagnostic/context events. Do not promote them to primary outcomes unless local evidence shows they predict a valuable outcome.

---

## 5. Paid-Social Traffic Metrics

### Separate creative, handoff and landing-page performance

Report the paid funnel at three levels:

1. **Ad level:** spend, impressions, outbound clicks and click-through rate.
2. **Handoff level:** landing-page visits in Umami ÷ Meta outbound clicks; report the ratio as a diagnostic, not an expected universal benchmark.
3. **Landing-page level:** confirmed signups ÷ Umami landing-page visitors, plus cost per signup using spend and the matching signup cohort.

For campaign labels, keep naming stable and use UTMs with a consistent mapping, for example: `utm_source=meta`, `utm_medium=paid_social`, `utm_campaign=objective-market-language`, `utm_content=creative-id-or-short-name`. Do not put personal information into URL parameters. UTMs provide explicit post-click context when they survive the redirect and load; they do not observe view-through influence or recover every cross-device journey. [[76]]

Meta’s own conversion reporting and the site’s event counts can differ because they measure different populations and attribution rules. In this setup, consent also means Meta Pixel/CAPI runs only for a subset of visitors, while Umami is the count source. Do not “correct” one system to match the other without first checking what each counts. Foxwell’s reporting framework reads performance through the funnel, and current attribution discussions stress that platform results are not identical to site or order-system results. [[86, 82]]

For the in-app-browser-heavy English traffic, make a dedicated QA pass on real Instagram/Facebook links and phones: confirm the final URL retains campaign labels, the page loads, the form can be completed, and the expected success event fires once. This is particularly important because app-to-browser handoffs and privacy restrictions can break session continuity or attribution. [[73, 76]]

### Minimum spend and volume

Common Thread Collective describes ad “activation” at roughly $500–$1,000 per creative in its ecommerce creative-testing framework. That is a **vendor-reported operating rule from higher-volume ecommerce**, not a statistical minimum for this business and not a defensible threshold for judging this site’s small campaign. [VENDOR: Common Thread Collective] [[81]]

There is no trustworthy universal minimum spend for judging a paid-social ad independent of baseline signup rate, cost per click, conversion value, targeting and expected effect. **[UNVERIFIED: no source found that establishes a general spend threshold applicable to this site.]** Instead, set a minimum exposure in advance based on the question: enough outbound clicks and landing-page visitors to estimate the page’s signup rate with useful uncertainty. If the ad produces too few arrivals to distinguish creative performance from random variation, call it inconclusive.

For this site, the operational comparison should be:

- **Ad performance:** spend per ad, outbound click rate, cost per outbound click.
- **Traffic quality proxy:** landing visits per outbound click, and signup rate among those visits.
- **Business outcome:** total confirmed signup count and cost per signup by tagged campaign/ad cohort.
- **Caveat:** site-side event totals may be lower than Meta-attributed conversions because of consent, event eligibility and attribution rules; neither number should be represented as the other.

---

## 6. Data-Quality Checks for Event Tracking

A small team can run a compact release checklist rather than a complex monitoring system. Umami recommends testing the actual page, checking event properties, testing validation failure, double click, navigation, retry and success, reviewing event names after release, and reconciling high-value events against the source system. [[128]]

### Routine checks

| Check | What to compare | Suggested alert or review condition |
|---|---|---|
| Signup reconciliation | Umami confirmed-signup events vs. new signups in the email platform | Investigate any material or sudden gap; do not expect perfect parity if blockers or timing differ. |
| Event ordering | Form-seen visitors → form starters → successful signups | Starts exceeding form-seen visitors, or success exceeding eligible starts, should trigger investigation. |
| Duplicate events | Events per page view/session and repeat counts per form position | A sudden increase or more than one “once per page/form” event per view indicates possible duplication. |
| Failure event health | Failed submits by reason and successful submits | Missing reason values or success events without a preceding submit attempt merit QA. |
| Release comparison | Event counts and event-per-visitor rates before/after deploy | Sudden large changes without a traffic or product explanation merit a release check. |
| Synthetic journey | Manually submit test forms on desktop and mobile, including validation failure and retry | Confirm one success event on success and none on failure. |
| Name/property drift | Event names and allowed labels | New spellings, missing language/form position or unbounded values should be corrected/documented. |
| Consent coverage | PostHog recorded views ÷ Umami views | Report the coverage share; do not extrapolate recordings into sitewide counts. |

The ratios above are operational safeguards, not universal statistical cutoffs. A team may choose a numerical trigger, for example investigating a 30% week-on-week change in a stable event rate, but that value should be calibrated to traffic volatility and campaign cadence. **[SPECULATIVE threshold proposal; no expert source establishes 30% as a universal event-alert threshold.]**

For the autofill issue, define form start as an actual interaction with a particular form, not simply “email field is nonempty.” Count form starts once per form instance and include a `form_position` label such as `top` or `bottom`. Keep event payloads free of entered text and email addresses. Umami explicitly warns against sending emails, names, message text and other sensitive values as properties. [[128]]

---

## 7. Event Naming and the Tracking Plan

### A simple schema for six pages

Use a compact, consistent event vocabulary, with the action in the event name and page/form context in properties. Simo Ahava recommends `snake_case` for event names, while Timo Dechau’s event taxonomy describes event names as actions and properties as contextual key–value pairs. [[88, 96]]

Illustrative schema:

| Event name | Allowed properties |
|---|---|
| `form_seen` | `skill`, `language`, `form_position` |
| `form_start` | `skill`, `language`, `form_position` |
| `form_submit_failed` | `skill`, `language`, `form_position`, `failure_reason` |
| `signup_success` | `skill`, `language`, `form_position`, `campaign_label` where available |
| `download_click` | `skill`, `language`, `delivery_location` |
| `checkout_click` | `product`, `plan`, `language`, `page` |
| `sample_output_click` | `product_or_skill`, `language`, `location` |
| `hero_video_click` | `product_or_skill`, `language` |
| `topbar_link_click` | `destination`, `language`, `page` |

Keep the event-name list small; put variations such as language, plan or form location in properties rather than creating a new event for every variation. Umami’s guidance recommends consistent names and properties and warns against unbounded values such as full URLs with query strings or unique customer identifiers. [[128]]

### The plan is the source of truth

Keep the tracking plan in a shared, versioned document. For each event, record:

- Event name and plain-language meaning.
- Exact trigger and deduplication rule.
- Required and allowed properties.
- Whether the event is browser- or server-originated.
- Which analytics system counts it.
- A test case and owner.
- Date introduced or changed.

Krista Seiden’s measurement-plan framing starts with business objectives and KPIs before instrumentation; Timo Dechau describes the tracking plan as a core deliverable and notes that naming conversations reveal disagreements about what teams mean by an event. [[89, 96]]

Attribute-based tracking can reduce code for simple, stable interactions, but should be used only where the action and labels are unambiguous. Simo Ahava’s writing describes data-layer and event-trigger patterns; Umami recommends testing the actual event and edge cases rather than assuming the trigger works. For valuable outcomes such as signup success and purchase, explicit outcome instrumentation is safer than a generic click listener. [[93, 128]]

---

## 8. Recommended Metric Set for This Site

| Metric | Definition (numerator / denominator / unit / window) | Role | Decision it informs | Confidence |
|---|---|---|---|---|
| Confirmed signup rate, by free page | Unique visitors with ≥1 confirmed signup ÷ unique visitors to that page; visitors; weekly and rolling 28-day | Primary | Whether a free landing-page change improves its main job | **HIGH** |
| Confirmed signup count | Confirmed signup events; no denominator; signups; daily/weekly | Outcome / context | Whether the volume of leads changed; always show with rate | **HIGH** |
| Form-seen rate | Visitors with form seen ÷ visitors to that page; visitors; weekly | Funnel step | Whether the form is actually exposed, especially on mobile | **MEDIUM** |
| Form-start rate | Visitors starting a specific form ÷ visitors seeing that form; visitors; weekly | Funnel step | Whether exposure leads to genuine interaction | **HIGH** |
| Form-completion rate | Visitors with signup success ÷ visitors starting that same form; visitors; weekly | Funnel step | Whether form friction or errors suppress completion | **HIGH** |
| Failed-submit rate | Failed submit attempts ÷ all submit attempts; attempts; weekly, by bounded reason | Guardrail / data quality | Whether validation or technical failures increased | **MEDIUM** |
| Signup events vs email-platform additions | Umami signup events compared with new email-platform records; counts; daily/weekly | Data quality | Whether the event or signup integration is broken or duplicated | **HIGH** |
| Paid checkout-click rate | Unique visitors clicking a checkout link ÷ unique paid-page visitors; visitors; weekly | Funnel step | Whether page visitors proceed toward checkout | **HIGH** |
| Aggregate purchase count | Confirmed server-side orders; orders; weekly/monthly, by currency/plan where available | Business outcome | Whether paid sales volume changed | **HIGH** |
| Aggregate revenue | Sum of confirmed order values within one currency; currency; weekly/monthly | Business outcome | Revenue trend and plan mix; not visitor-level attribution | **HIGH** |
| Cost per signup by campaign/ad cohort | Campaign/ad spend ÷ confirmed signups observed for the same UTM cohort; currency per signup; campaign window | Paid-social outcome | Whether a tagged campaign generates signups at an acceptable cost | **MEDIUM** |
| Landing visits per outbound click | Umami campaign landing visits ÷ Meta outbound clicks; ratio; campaign window | Paid-social diagnostic | Whether the ad-to-site handoff is losing traffic | **MEDIUM** |
| Signup rate by tagged ad cohort | Confirmed signups ÷ Umami landing visitors with that campaign label; visitors; campaign window | Paid-social diagnostic | Whether traffic from a particular ad cohort signs up after arrival | **MEDIUM** |
| Download requests by cohort | Download-link requests ÷ signups in the cohort; requests per signup; signup cohort followed for 7/30 days | Activation proxy | Whether the delivery link is used, not whether the skill is installed | **MEDIUM** |
| Install-guide email click rate | Unique recipients clicking the install/how-to link ÷ delivered emails; recipients; per email and cohort | Activation proxy | Whether follow-up content gets users toward setup | **MEDIUM** |
| Self-reported use response | Responses by usage answer ÷ survey respondents; respondents; 7/30 days after signup | Activation proxy | Whether users report installing or trying the skill | **LOW** |
| Tagged follow-up purchases | Orders using cohort/email link or code; orders and revenue; 30/60/90-day cohort window | Aggregate free-to-paid signal | Whether follow-up campaigns are associated with purchases | **LOW** |
| Cross-sell click rate | Unique free-page visitors clicking to paid page ÷ unique visitors to free page; visitors; weekly | Funnel/context | Whether free pages create measurable interest in the paid offer | **MEDIUM** |
| Same-session free-to-paid visit share | Sessions with both free and paid page views ÷ sessions with a free-page view; sessions; weekly | Context | Whether pages are explored together in one session | **LOW** |
| PostHog coverage share | PostHog recorded pageviews ÷ Umami pageviews, same page/date range; percentage; weekly | Context/data coverage | How representative consented recordings are | **HIGH** |
| Owner/test traffic share | No current numerator available; record as unavailable until an exclusion method is approved | Data quality | Whether internal traffic may distort low-volume results | **LOW** |

**Counting rule:** a visitor may appear in more than one funnel event, but each rate’s denominator must match its stated population. Keep raw numerator and denominator adjacent to every displayed rate. Umami’s documentation notes that conversion-rate definitions can vary by denominator, reinforcing the need to label it explicitly. [[119, 126]]

---

## Disagreements and Open Questions

1. **One north-star metric versus several purpose-specific metrics.** Product-growth frameworks often seek one metric that captures value delivery; web-analytics practice also recommends measuring multiple outcomes. For this site, a single blended metric would conceal the fact that free signups and paid sales are separate outcomes with no permitted person-level join. Use page-level primary metrics and report the two business outcomes together, not as a fabricated composite. [[48, 42]]

2. **Conversion rate versus revenue per visitor.** For a usability change, purchase conversion can be a clean outcome; for an offer or pricing change, revenue per visitor can reflect order mix. But revenue per visitor is noisy and not measurable at visitor level here. Separate aggregate revenue from visitor conversion rates until attribution supports a legitimate denominator. [[16, 174]]

3. **Fixed-horizon versus Bayesian/sequential decisions.** Repeated looks invalidate ordinary fixed-sample significance claims, but sequential designs or Bayesian models can permit ongoing monitoring when correctly specified. Neither approach creates information that the traffic does not contain. Choose transparent uncertainty reporting over a tool’s “winner” label. [[148, 2, 133]]

4. **Thresholds such as 30 conversions, 14 days or 28 days.** These are operational heuristics, not universal statistical guarantees. A full-week or multi-week duration can help include traffic patterns, but it does not replace a sample-size calculation. Do not call a test conclusive merely because the calendar window ended.

5. **Paid-social minimum spend.** CTC’s $500–$1,000-per-creative activation guidance is grounded in ecommerce creative operations. It does not establish a minimum for a low-budget lead magnet with a different objective and traffic mix. [VENDOR: Common Thread Collective] [[81]]

6. **Predictive value of engagement events.** Form exposure and failure are directly useful diagnostics; scroll, time and video clicks are more ambiguous. Published examples and vendor case studies do not establish that those signals predict conversion on this specific site. Test local predictive value cautiously and avoid treating correlation as causation. [[103, 115, 107]]

7. **Attribution after signup.** Cohort links, email clicks, surveys and tagged checkout links add evidence without a site-wide identity join, but each has bias and leakage. Their correct role is triangulation, not proof that a specific lead converted.

---

## Orphan Topics

### 1. Growth loops are a useful future lens—but not a reason to over-instrument now

Reforge distinguishes a funnel from a growth loop: in a loop, one cohort’s output becomes an input that can acquire or activate another cohort. For this site, a plausible loop might be a useful skill prompting a user to share a link or publish an example, which then attracts another user. There is no evidence in the supplied context that such a loop is currently material, so treat it as a product hypothesis rather than a metric requirement. [[45, 54]]

### 2. Choose metrics that do not reward the wrong behavior

Kaushik’s economic-value framing warns that optimizing only the most immediate conversion can ignore value created by other actions. Conversely, an unvalidated “micro-conversion value” can become a made-up financial number. For this site, show free signups, tagged paid outcomes and diagnostic engagement separately; do not assign arbitrary monetary values to sample clicks or video plays. [[37, 38]]

### 3. Replication and familiar CRO patterns deserve skepticism

Lukas Vermeer’s “Trustworthy A/B Patterns” reports that replicated effects for familiar UX patterns were substantially smaller than previously claimed; even at large scale, some business metrics remained underpowered. The transferable lesson is not that every small-site change needs a million users, but that published patterns and large lifts from small case studies should not be treated as reliable forecasts for this audience. [[176]]

### 4. Device mix is an investigation priority, not a nuisance segment

The stated 76–87% phone share on English pages and heavy in-app-browser usage makes mobile form and checkout QA especially important. Sullivan’s device-flow talk recommends looking for patterns and blockages to direct qualitative research rather than demanding precision from every segment. With low volume, use device splits as clues; avoid declaring a mobile-specific win from a handful of conversions. [[27]]

### 5. The value of tracking is partly the shared meaning it creates

A tracking plan is not merely a list of events. Dechau describes how discussing event definitions can surface different assumptions across teams; Seiden’s measurement-plan approach starts with goals and KPIs before tagging. On a small team, the highest-value documentation may be a one-page event dictionary with exact triggers and denominators, maintained whenever product behavior changes. [[96, 89]]

### 6. The recording sample is not the site population

PostHog sees only consented views, while Umami is the counts source. Recordings can reveal *how* a particular interaction fails, but their sample cannot establish how common that failure is across all visitors unless consented visitors are representative—which is not established here. Use recordings to generate or validate usability hypotheses, and use Umami counts for rate and volume statements. **[SPECULATIVE inference from the stated consent coverage and source design.]**

---

**Bottom line:** keep confirmed signup rate as the primary success metric for each free page, paid orders and revenue as separate aggregate outcomes, and the added form events as diagnostic instrumentation. Measure post-signup activation through aggregate delivery/guide-link signals and voluntary cohort surveys; use campaign-specific checkout labels only as directional evidence. At this traffic level, use power/MDE planning before testing, and prefer well-supported large improvements over small, underpowered A/B tests.

---

## Sources

*The report's inline `[[n]]` markers index this list — not any numbered source inventory inside the report body. It lists each distinct link the provider returned or the report linked, cited or not; a marker numbered past its end had no source.*

1. [Sample Size Calculator (Evan's Awesome A/B Tools)](https://www.evanmiller.org/ab-testing/sample-size.html)
2. [Formulas for Bayesian A/B Testing](https://www.evanmiller.org/bayesian-ab-testing.html)
3. [Simple Sequential A/B Testing](https://www.evanmiller.org/sequential-ab-testing.html)
4. [Sample Ratio Mismatch and Other Trust-Related Guardrail ...](https://www.cambridge.org/core/books/abs/trustworthy-online-controlled-experiments/sample-ratio-mismatch-and-other-trustrelated-guardrail-metrics/BE8B585FB88A367032D188A02D3F777C)
5. [How to avoid common data accuracy pitfalls in A/B testing](https://www.kameleoon.com/blog/data-accuracy-pitfalls-ab-testing)
6. [sample size calculator, A/B test results, and more](https://www.evanmiller.org/ab-testing/)
7. [Trustworthy Online Controlled Experiments](https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/D97B26382EB0EB2DC2019A7A7B518F59/listing)
8. [ronny-kohavi.md](https://github.com/coco-research/coco/blob/main/systems/superintelligence/product-design/personas/ronny-kohavi.md)
9. [TRUSTWORTHY ONLINE CONTROLLED EXPERIMENTS](https://api.pageplace.de/preview/DT0400.9781108601375_A45554503/preview-9781108601375_A45554503.pdf)
10. [Trustworthy Online Controlled Experiments - Google Bøger](https://books.google.com/books/about/Trustworthy_Online_Controlled_Experiment.html?hl=da&id=NHjQDwAAQBAJ)
11. [How to Calculate Statistical Significance in A/B Tests](https://performancemarketinghub.com/ab-testing/calculate-statistical-significance/)
12. [#abtest #experimentguide | Ron Kohavi | 15 comments](https://www.linkedin.com/posts/ronnyk_abtest-experimentguide-activity-6973375103745028096-Bweu)
13. [Measuring Long-Term Treatment Effects (Chapter 23) - Trustworthy Online Controlled Experiments](https://www.cambridge.org/core/books/abs/trustworthy-online-controlled-experiments/measuring-longterm-treatment-effects/E5141906FEE184BFBB82EE46FE713B51)
14. [Trustworthy Online Controlled Experiments - GBV](https://www.gbv.de/dms/zbw/1681737574.pdf)
15. [Sample Size In Bayesian...](https://www.gamedeveloper.com/business/it-s-time-to-re-think-a-b-testing)
16. [Supplement ecommerce testing: what wins and what backfires - Speero](https://speero.com/post/supplement-ecommerce-testing)
17. [Experimentation Program UK, US & AU | Speero](https://speero.com/experimentation-services/full-service-experimentation-program)
18. [Craig Sullivan | LinkedIn](https://www.linkedin.com/in/craigsullivan)
19. [Selection is the job](https://speero.com/post/selection-is-the-job-now-circus-austin-2026)
20. [About Us | Speero US, UK, Au](https://speero.com/about)
21. [A/A Test Decision Tree Speero - When to Run One or Skip](https://speero.com/blueprints/do-you-need-an-a-a-test)
22. [Agency Report Final v5.1](https://www.convert.com/wp-content/uploads/2025/05/Agency-Report.pdf)
23. [How can I use AI & machine learning for better Research, CRO, A/B testing, and Automation?](https://www.kameleoon.com/blog/how-can-i-use-ai-machine-learning-better-research-cro-ab-testing-and-automation)
24. [LukeW | Conversions: Mobile Patterns for Experiments](https://www.lukew.com/ff/1967/conversions-mobile-patterns-for-experiments)
25. [When to Run an A/A Test, and When to Check Instrumentation](https://speero.com/post/when-to-run-an-a-a-test-and-when-to-check-instrumentation)
26. [Can You Run Multiple A/B Tests at the Same Time? - Speero](https://speero.com/post/can-you-run-multiple-a-b-tests-at-the-same-time)
27. [Craig Sullivan - Conversions@Google 2018](https://www.youtube.com/watch?v=N1VJVz2JBXY)
28. [A/B Testing Tool Consulting & Implementation - Speero](https://speero.com/experimentation-services/ab-testing-tool-consulting-and-implementation)
29. [Conversion Research Report - CXL](https://cxl.com/institute/wp-content/uploads/2017/08/Growth-Marketing-Workshop-Research-and-Testing-Peep-Laja-.pdf)
30. [Three Questions Every Test Should Answer Before It Launches](https://speero.com/post/three-questions-every-test-should-answer-before-it-launches)
31. [Blog](https://umami.is/blog)
32. [About – umami](https://docs.umami.is/docs/about)
33. [Six Web Metrics / Key Performance Indicators To Die For](https://www.kaushik.net/avinash/rules-choosing-web-analytics-key-performance-indicators/)
34. [Produce Actionable Insights: Mate Custom Reports With ...](https://www.kaushik.net/avinash/actionable-web-analytics-custom-reports-advanced-segments/)
35. [Email Marketing: Campaign Analysis, Metrics, Best Practices](https://www.kaushik.net/avinash/email-marketing-campaign-analysis-metrics-practices/)
36. [Best Web Metrics / KPIs for a Small, Medium or Large ...](https://www.kaushik.net/avinash/best-web-metrics-kpis-small-medium-large-business/)
37. [You Are What You Measure, So Choose Your KPIs (Incentives) Wisely!](https://www.kaushik.net/avinash/measure-choose-smarter-kpis-incentives/)
38. [Your Web Metrics: Super Lame or Super Awesome?](https://www.kaushik.net/avinash/web-metrics-super-lame-super-awesome/)
39. [5 + 4 Actionable Tips To Kick Web Data Analysis Up A Notch, Or Two](https://www.kaushik.net/avinash/actionable-tips-web-data-metrics-analysis/)
40. [Brand Measurement: Analytics & Metrics for Branding Campaigns](https://www.kaushik.net/avinash/brand-measurement-analytics-metrics-branding-campaigns/)
41. [Web Analytics: Frequently Asked Questions And Direct Answers](https://www.kaushik.net/avinash/web-analytics-frequently-asked-questions-direct-answers/)
42. [Excellent Analytics Tip #13: Measure Macro AND Micro ...](https://www.kaushik.net/avinash/excellent-analytics-tip-13-measure-macro-and-micro-conversions/)
43. [Analyze Cohort Retention](https://www.reforge.com/guides/analyze-cohort-retention)
44. [Discover Activation Patterns by Business Type - Reforge](https://www.reforge.com/guides/discover-activation-patterns-by-business-type)
45. [Map your acquisition loops](https://www.reforge.com/guides/map-your-acquisition-loops)
46. [Activation Strategy Templates and Examples](https://www.reforge.com/artifacts/c/growth/activation-strategy)
47. [Evaluate retention cohorts](https://www.reforge.com/guides/evaluate-retention-cohorts)
48. [Build an end-to-end quantitative growth model](https://www.reforge.com/guides/build-an-end-to-end-quantitative-growth-model)
49. [reforge-growth-series | lev-os/agents Agent Skill | SkillsMP](https://skillsmp.com/pt/creators/lev-os/agents/skills-db-thinking-patterns-reforge-growth-series)
50. [Improve user activation](https://www.reforge.com/guides/improve-user-activation)
51. [Activation, retention and more: growth lessons from the industry's best](https://www.intercom.com/blog/podcasts/activation-retention-and-more-growth-lessons-from-the-industrys-best)
52. [Book Review and Summary: Hacking Growth by Sean Ellis ...](https://andrewclark.co.uk/product-book-summaries/hacking-growth)
53. [Hacking Growth: How Today's Fastest-Growing Companies Drive ...](https://pmharshit.com/books/hacking-growth/)
54. [Growth Loops are the New Funnels](https://www.reforge.com/blog/growth-loops)
55. [Defining the retention funnel - Reforge](https://www.reforge.com/guides/defining-the-retention-funnel)
56. [Hacking Growth by Sean Ellis | Summary, Audio, Quotes, FAQ](https://sobrief.com/books/hacking-growth)
57. [Lenny-s-Podcast-Transcripts-Archive/blog/Sean Ellis.zh.md at main · dushaobindoudou/Lenny-s-Podcast-Transcripts-Archive](https://github.com/dushaobindoudou/Lenny-s-Podcast-Transcripts-Archive/blob/main/blog/Sean%20Ellis.zh.md)
58. [What is Self-Reported Attribution? - Fairing.co](https://fairing.co/resources/measurement-faqs/what-is-self-reported-attribution)
59. [“How Did You Hear About Us?” Survey: What to Ask, Which Options to List, and How Far to Trust the Answers | Attrifast](https://attrifast.com/blog/how-did-you-hear-about-us-survey)
60. [Welcome email series: structure, metrics and benchmarks](https://scalero.io/company/blog/welcome-email-series)
61. [Marketing Attribution Survey Template](https://www.zonkafeedback.com/templates/marketing-attribution-survey)
62. [What is Marketing Attribution?](https://fairing.co/resources/measurement-faqs/what-is-marketing-attribution)
63. [The Welcome Email Sequence: A 2026 Onboarding ...](https://www.digitalapplied.com/blog/welcome-email-onboarding-sequence-2026-framework)
64. [Self-reported attribution vs B2B attribution | Source](https://www.source.app/articles/self-reported-attribution-vs-b2b-attribution)
65. [Email Welcome Sequence](https://emailcalculator.com/glossary/email-welcome-sequence)
66. [Self-Reported Attribution - AI Search & GEO Glossary](https://promptwatch.com/glossary/self-reported-attribution)
67. [Self-Reported Attribution - Customer Impact](https://www.customerimpact.be/en/blog/self-reported-attribution/)
68. [What Is an Email Funnel? Stages, Rules, Templates](https://blog.pinpointe.com/email-funnel)
69. [Marketing Attribution | Free Template 2026 - Formbricks](https://formbricks.com/survey-templates/marketing-attribution)
70. [How Did You Hear About Us? Options and Survey Design](https://www.storylane.io/blog/how-did-you-hear-about-us)
71. [Self-Reported Attribution: Using Survey Data to Fill Attribution Gaps](https://rankworks.com/news/self-reported-attribution-using-survey-data-to-fill-attribution-gaps/)
72. [Building High-Converting Email Nurture Sequences](https://jottler.co/blog/building-high-converting-email-nurture-sequences)
73. [Meta and Facebook Ads UTM Tracking: The 2026 Definitive Guide](https://www.terminusapp.com/blog/how-use-utm-codes-track-your-facebook-ads/)
74. [Best DTC Performance Creative Agencies in 2026: Y’all Leads on Creative Diversity Built for Meta and TikTok Algorithms](https://apnews.com/press-release/getnews/press-release-ac5e411bf30d98117da5b847d6a5c32e)
75. [Andrew Foxwell On Why Creative Diversity Has Replaced Audience Targeting On Meta](https://www.netinfluencer.com/andrew-foxwell-on-why-creative-diversity-has-replaced-audience-targeting-on-meta/)
76. [What Is UTM Tracking for Meta Ads | Rapid Ads Blog](https://rapid-ads.com/blog/what-is-utm-tracking)
77. [Meta Ads Revenue Tracking Without Cookies - Sealmetrics](https://sealmetrics.com/integrations/meta-ads/)
78. [Facebook UTM Builder — Free Tool for Meta Ads + GA4 Setup](https://www.elsop.com/facebook-utm-builder-meta-ads-ga4/)
79. [Top 10 Paid Media Agencies for DTC Brands in 2026 ...](https://www.yall.co/post/top-10-paid-media-agencies-for-dtc-brands-in-2026)
80. [Meta audit: a checklist for the account and its data](https://www.trackingplan.com/blog/meta-audit)
81. [The Ecommerce Creative Testing Framework](https://commonthreadco.com/blogs/coachs-corner/the-ecommerce-creative-testing-framework-from-gambling-to-math)
82. [Meta Ads vs GA4: Why Clicks and Conversions Differ | metricfixer](https://metricfixer.com/publications/online-advertising/meta-ads-ga4-clicks-sessions-users-attributed-conversions)
83. [Top 10 Performance Marketing Agencies for DTC Brands in ...](https://www.yall.co/post/top-10-performance-marketing-agencies-for-dtc-brands-in-2026-updated-july-2026)
84. [What's the Best Agency to Run Facebook Ads?](https://www.kitchn.io/blog/best-agency-to-run-facebook-ads)
85. [Top 8 CPG Marketing Agencies for Meta & Paid Ads (2026)](https://www.flighted.co/blog/top-cpg-performance-marketing-agencies)
86. [Client Reporting When Meta Is a Black Box — Foxwell Digital](https://www.foxwelldigital.com/blog/client-reporting-when-meta-is-a-black-box-frameworks-from-foxwell-agencies)
87. [Data Discrepancy: Why Your Analytics Numbers Don't Match](https://linkutm.com/glossary/data-discrepancy)
88. [Implementation Guide For Events In Google Analytics 4](https://www.simoahava.com/analytics/implementation-guide-events-google-analytics-4/)
89. [The 10 best analytics strategies in 2018, Krista Seiden, Google, OMR18](https://www.youtube.com/watch?v=TnQbm2epM5k)
90. [Macro Guide For Google Tag Manager | Simo Ahava's blog](https://www.simoahava.com/analytics/macro-guide-google-tag-manager/)
91. [GA4 Event Naming Conventions Guide](https://carusomartech.com/insights/ga4-event-naming/)
92. [Event Taxonomy | Timo Dechau](https://timo.space/library/event-taxonomy/)
93. [Fun With Google Tag Manager: Part 2 | Simo Ahava's blog](https://www.simoahava.com/analytics/fun-google-tag-manager-part-2/)
94. [#GTMTips: Simple Custom Event Listeners With Google Tag ...](https://www.simoahava.com/analytics/simple-custom-event-listeners-gtm/)
95. [Google Analytics 4: Ecommerce Guide For Google Tag ...](https://www.simoahava.com/analytics/google-analytics-4-ecommerce-guide-google-tag-manager/)
96. [Module 1: Foundations | Analytics Workbook | Timo Dechau](https://timo.space/books/analytics-workbook/foundations/)
97. [Timo Dechau | LinkedIn](https://www.linkedin.com/in/timo-dechau)
98. [Variable Guide For Google Tag Manager](https://www.simoahava.com/analytics/variable-guide-google-tag-manager/)
99. [Google Analytics Training: How to Turn Insights Into Action (Webinar) - GetUplift](https://getuplift.co/google-analytics-training-turn-insights-into-action/)
100. [How to build the best tracking schema for you](https://mixpanel.com/blog/build-event-tracking-scheme-business-metrics/)
101. [#97 The future of event data (with Timo Dechau @ deepskydata)](https://www.measurelab.co.uk/blog/podcasts/future-of-event-data-timo-dechau/)
102. [Events](https://www.simoahava.com/amp/tags/events/)
103. [Form Analytics: What You Can Track and How to Track It - CXL](https://cxl.com/blog/form-analytics/)
104. [AI Visitors Show Stronger Intent Signals Than Traditional Channels](https://clarity.microsoft.com/blog/ai-visitors-show-stronger-intent-signals/)
105. [user behavior Archives - Success stories from ...](https://clarity.microsoft.com/case-studies/tag/user-behavior/)
106. [August 2024 - Success stories from Clarity users](https://clarity.microsoft.com/case-studies/2024/08/)
107. [Case Studies Archives - Success stories from Clarity users](https://clarity.microsoft.com/case-studies/category/case-studies/)
108. [Introduction to Conversion Optimization by Brian Massey](https://cxl.com/wp-content/uploads/2016/03/crobeginnerguide_final.pdf)
109. [CONVERSION OPTIMZATION](https://cxl.com/Essentials%20of%20Conversion%20Optimization%20by%20ConversionXL.pdf)
110. [Micro funnels: What They Are and How to Use Them - CXL](https://cxl.com/blog/micro-funnels/)
111. [case study Archives - Success stories from Clarity users](https://clarity.microsoft.com/case-studies/tag/case-study/)
112. [Watch what matters – with Interesting user segments](https://clarity.microsoft.com/blog/watch-what-matters-with-interesting-user-segments/)
113. [CRO Guide - CXL-min.pdf](https://cxl.com/wp-content/uploads/2021/04/CRO-Guide-CXL-min.pdf)
114. [How to Use User Behavior Data to Create a Better Search ...](https://clarity.microsoft.com/blog/how-to-use-user-behavior-data-to-create-a-better-search-experience/)
115. [Scroll Depth vs Conversion Rate: The Chart That Lied](https://launchwithben.com/learn/research/scroll-depth-conversion)
116. [Rage clicks - what do they tell you about user behavior? - Understand your customers | Microsoft Clarity Blog %](https://clarity.microsoft.com/blog/rage-clicks-user-behavior/)
117. [Landing Page Case Study: How We Improved Conversions by 79.3%](https://cxl.com/blog/case-study-how-we-improved-landing-page-conversion/)
118. [How Fathom measures your analytics](https://usefathom.com/docs/start/measurement)
119. [Metrics definitions | Plausible docs](https://plausible.io/docs/metrics-definitions)
120. [Web analytics: what it is, how it works and how to use it](https://plausible.io/blog/web-analytics)
121. [The Plausible Blog](https://plausible.io/blog)
122. [How to pick the right metrics for your website?](https://plausible.io/blog/pick-the-right-metrics)
123. [How we use web analytics to measure our startup's ...](https://plausible.io/blog/analytics-metrics-definitions)
124. [Plausible Analytics](https://plausible.io/blog/feed.xml)
125. [Goal conversions | Plausible docs](https://plausible.io/docs/goal-conversions)
126. [Dashboard explained](https://usefathom.com/docs/start/dashboard)
127. [Web analytics vs product analytics: core difference and ...](https://plausible.io/blog/web-analytics-vs-product-analytics)
128. [Event Tracking Best Practices: Names, Properties, and Data ...](https://umami.is/guides/event-tracking-best-practices)
129. [Event Taxonomy Design: A Practical Framework | Trackingplan](https://www.trackingplan.com/blog/event-taxonomy)
130. [Web Analytics Metrics You Should Use to Win More Customers](https://usefathom.com/learn/web-analytics-metrics)
131. [Website analytics that matter (and why they matter)](https://usefathom.com/learn/analytics-that-matter)
132. [Privacy-focused website analytics - Fathom Analytics](https://usefathom.com/why-fathom-analytics/privacy-focused-web-analytics)
133. [(PDF) Georgi Z. Georgiev - Statistical Methods in Online A/B Testing](https://www.abtestingstats.com/Statistical-Methods-in-Online-A-B-Testing-pdf.pdf)
134. [A/B Testing with a Small Sample Size](https://blog.analytics-toolkit.com/2019/a-b-testing-with-a-small-sample-size/)
135. [Statistical Methods in Online AB Testing Statistics For Data ...](https://www.scribd.com/document/1013887431/Statistical-Methods-in-Online-AB-Testing-Statistics-for-data-driven-business-decisions-and-risk-management-in-e-commerce)
136. [Statistical Methods in Online A/B Testing – The Book](https://www.abtestingstats.com/)
137. [Posts by Georgi Georgiev | In-Depth Articles on Statistics ...](https://blog.analytics-toolkit.com/author/analytic/page/2/)
138. [cxl.com · 2019 · 08Percentage Change Statistics for - CXL](https://cxl.com/institute/wp-content/uploads/2019/08/Lesson8_Percentage-Change.pdf)
139. [Analysis of 115 A/B Tests: Average Lift is 4%, Most Lack ...](https://blog.analytics-toolkit.com/2018/analysis-of-115-a-b-tests-average-lift-statistical-power/)
140. [A/B Testing Statistics – A Concise Guide for Non-Statisticians](https://blog.analytics-toolkit.com/2022/a-b-testing-statistics-a-concise-guide/)
141. [Calculations Sample Size Statistical Power & Author of 窶彜 ...](https://cxl.com/institute/wp-content/uploads/2019/08/Lesson3_Statistical-Power-Sample-Size.pdf)
142. [Power And Sample Size | Blog for Web Analytics, Statistics and Data ...](https://blog.analytics-toolkit.com/t/power-and-sample-size/)
143. [A/B Testing for Ecommerce Guide](https://webmedic.com/ecommerce-ab-testing-guide)
144. [Sample Size Calculator & Statistical Power Calculator](https://www.gigacalculator.com/calculators/power-sample-size-calculator.php)
145. [Statistical Methods in Online A/B Testing: Statistics for ...](https://www.amazon.com/Statistical-Methods-Online-Testing-commerce/dp/1694079724)
146. [How can I trust and use test results to my advantage?](https://www.kameleoon.com/blog/how-can-i-trust-and-use-test-results-my-advantage)
147. [Articles on Conversion optimization](https://blog.analytics-toolkit.com/c/conversion-optimization/)
148. [How Not To Run an A/B Test](https://www.evanmiller.org/how-not-to-run-an-ab-test.html)
149. [Why stopping an A/B test early misleads you (the peeking problem)](https://useouttest.com/guides/peeking-problem-ab-testing)
150. [webmedic.com › ab-test-winner-decision-matrixHow to Determine an A/B Test Winner | WebMedic](https://webmedic.com/ab-test-winner-decision-matrix)
151. [A/B Testing on Mobile: Why Most Tests Fail to Deliver Insights](https://www.digia.tech/post/ab-testing-on-mobile-why-most-experiments-dont-produce-answers/)
152. [Email A/B Testing Is Statistically Broken. Here's the ROI ...](https://www.zembula.com/blog/email-a-b-testing-is-statistically-broken-here-s-the-roi/)
153. [Online Experimentation: A/B Testing a Subscription Business Without Fooling Yourself](https://nishbhana.com/Online-Experimentation/)
154. [A/B Test Calculator for Statistical Significance](https://builderify.com/guides/ab-test-calculator)
155. [Data Min Knowl Disc (2009) 18:140–181](https://ptacts.uspto.gov/ptacts/public-informations/petitions/1557007/download-documents?artifactId=-CVab2tv0BIqfVySk74j2DhRn5QenWEzuYrCTsUUw5FzIh1Hm9LXet0)
156. [How to run an A/B test: A practical guide for marketers](https://launchcodex.com/blog/performance-marketing/how-to-run-an-ab-test/)
157. [Honest A/B Testing for Shopify | StorePilot AI](https://www.usestorepilot.com/use-cases/honest-ab-testing/)
158. [Statistical Significance Calculator (Refuses Bad Verdicts)](https://www.usestorepilot.com/blog/statistical-significance-calculator/)
159. [Personalization or A/B testing: what your traffic level ...](https://pathmonk.com/website-personalization-ab-testing/)
160. [A/B Testing: The Science of Not Fooling Yourself](https://www.neweconomies.co/p/ab-testing-the-science-of-not-fooling)
161. [Meta Ads & Performance Marketing Blog | Foxwell Digital — Foxwell Digital](https://www.foxwelldigital.com/blog?offset=1790970526069)
162. [Meta Ads & Performance Marketing Blog](https://www.foxwelldigital.com/blog/tag/Meta+Ads)
163. [Agency Operations — Meta Ads & Performance Marketing Blog | Foxwell Digital — Foxwell Digital](https://www.foxwelldigital.com/blog/tag/Agency%20Operations)
164. [Meta Advertising](https://commonthreadco.com/pages/methodology-meta)
165. [How to Scale Meta Ads Without Blowing Up Your CPA](https://www.foxwelldigital.com/blog/how-to-scale-meta-ads-without-blowing-up-your-cpa)
166. [Meta Ads — Meta Ads & Performance Marketing Blog | Foxwell Digital — Foxwell Digital](https://www.foxwelldigital.com/blog/tag/Meta%20Ads)
167. [Meta Ads Agency for Profitable Ecommerce Growth](https://commonthreadco.com/pages/meta-ads-agency)
168. [How Many Ad Creatives Should You Test Per Week? Benchmarks ...](https://viralmojo.ai/playbook/how-many-ad-creatives-to-test)
169. [Facebook Ads Agencies: 10 Best Picks With Pricing (2026)](https://www.dataally.ai/blog/top-facebook-ads-agencies)
170. [Ecommerce Facebook Ads Agency: 8 Best Meta Options for DTC](https://knowlify.com/articles/best-meta-ads-agencies-ecommerce)
171. [How Much Should You Pay a DTC Marketing Agency in 2026](https://www.foxwelldigital.com/blog/how-much-should-you-pay-a-dtc-marketing-agency-in-2026)
172. [Performance Ad Creative for Ecommerce Brands](https://commonthreadco.com/pages/creative-production)
173. [Conversion Optimization: Complete Guide to CRO for 2023 - CXL](https://cxl.com/conversion-optimization/)
174. [Finding a CRO Agency: Costs, Criteria, and Checklist](https://www.konversionskraft.de/en/guides/finding-a-cro-agency)
175. [Lukas Vermeer](https://www.lukasvermeer.nl/)
176. [feed](https://www.lukasvermeer.nl/feed)
177. [Master the Essentials of Conversion Optimization](https://cxl.com/wp-content/uploads/2014/12/Master-the-CRO-Essentials.pdf)
178. [How to Create a CRO Process by Peep Laja - CXL](https://cxl.com/conversion-rate-optimization/how-to-create-a-cro-process-by-peep-laja/)
179. [Peep Laja, Author at CXL Blog](https://cxl.com/blog/author/peep-laja/page/6/)
180. [André Morys | LinkedIn](https://www.linkedin.com/in/andre-morys)
181. [A/B Test Won, Revenue Didn't: What the Numbers Are Actually Telling You](https://statisticsfundamentals.com/blog/technology/ab-test-won-revenue-didnt/)
182. [The Million Dollar Optimization Strategy (Video) - CXL](https://cxl.com/blog/the-million-dollar-optimization-strategy-video/)
183. [How to Come Up with More Winning Tests Using Data (ResearchXL ...](https://cxl.com/blog/how-to-come-up-with-more-winning-tests-using-data/)
184. [A Conversation With André Morys - abtasty](https://wingify.com/podcast/1000-experiments-club-andre-morys/)
185. [Peep Laja - opening keynote 2016](https://cxl.com/wp-content/uploads/2016/05/Peep-Laja-opening-keynote-2016.pdf)
186. [The Million Dollar Optimization Strategy - Andre Morys - ConversionXL Live 2015](https://fr.slideshare.net/slideshow/the-million-dollar-optimization-strategy-andre-morys-conversionxl-live-2015/54961979)