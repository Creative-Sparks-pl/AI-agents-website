---
provider: "youcom"
model: "you.com/deep+free-form"
brief: "brief-pplx-deep-landing-page-metrics.md"
duration_ms: 114874
cost_usd: 0.1
truncated: False
citation_scheme: "unified"
---

# Research Results: brief-pplx-deep-landing-page-metrics

**Provider:** youcom (you.com/deep+free-form)

---

# brief-pplx-deep-landing-page-metrics.md

## Executive Summary — the 10 most important recommendations for this site

1. **Use two linked business outcomes, not one forced North Star.** The site has two legitimate jobs: acquire qualified permission through free-skill signups and sell the paid UX Design Skill. Report both, but keep one operational primary metric per page: free signup rate for lead-magnet pages and paid purchase rate/revenue per visitor for the paid page. North-Star frameworks generally distinguish outcome metrics from actionable input metrics; one metric alone is insufficient when the business has distinct acquisition and monetization motions. [[1, 2, 3]] 

2. **For free pages, make signup rate the primary KPI:**  
   `successful signups ÷ landing-page views × 100`.  
   Keep `signups ÷ form-seen events` and `signups ÷ form-start events` as diagnostics. A signup is the meaningful page outcome; form starts and views are opportunities, not outcomes.

3. **Use visitors for person-level conversion rates where possible, but disclose the unit.** Pageviews are useful when every load is an independent opportunity; visitors are more interpretable for “what share of people signed up.” Privacy-first tools may count the same person as a new visitor across devices or days, so do not imply durable unique-person measurement. [[4, 5]] 

4. **Do not use “30 conversions per window” as a universal validity rule.** It is a practical warning threshold, not a statistical solution. Kohavi recommends pre-test power/MDE calculations, typically 80% power and an MDE no higher than 5%; CXL’s Peep Laja gives a much larger rough heuristic of 350 conversions per variation and says 2–4 weeks should cover business cycles. [[6, 7]] At this site’s volume, conventional A/B tests on purchases are generally not feasible.

5. **Replace routine split testing with research-led, large-change evaluation.** Use qualitative evidence, technical QA, before/after trend monitoring, and pre-registered directional hypotheses. Run a randomized test only when the required sample size is plausible. Low traffic does not justify lowering statistical standards; it changes the type of question that can be answered.

6. **Define activation outside the website, not as “download.”** A free signup is permission obtained, not value delivered. Activation should be an aggregate or self-reported downstream signal such as unique download-link requests, installation/use survey responses, or a privacy-preserving tagged checkout link. Product-growth practitioners define activation as an early value moment predictive of retention or monetization, not merely account creation. [[8, 9, 10]] 

7. **Treat free-to-paid measurement as cohort measurement, not individual attribution.** Because the checkout webhook cannot be tied to a visitor or signup, use monthly signup cohorts, aggregate coupon/link codes, email-platform clicks, surveys, and total purchases. Never claim user-level conversion where the architecture cannot establish it.

8. **Separate paid-social diagnosis into three layers:** ad delivery, landing-page behavior, and business outcome. Use Meta spend/impressions/CTR for creative and delivery; Umami UTM traffic and signup rate for post-click landing-page performance; checkout purchases and revenue for the business result. Foxwell recommends triangulating platform reporting, independent analytics, UTMs, and post-purchase surveys rather than trusting one attribution model. [[11, 12, 13]] 

9. **Make data quality a first-class metric.** Monitor event volume, duplicate rates, required-property completeness, impossible ratios, release changes, and reconciliation with server-side purchases. The autofill problem demonstrates why “event received” is not equivalent to “user performed the intended action.”

10. **Keep the tracking plan small and semantic.** Use a handful of business events with properties for skill, language, form location, page, and error reason. Timo Dechau recommends a hierarchy separating core business events from product and UX events; Simo Ahava recommends translating requirements into explicit key-value data-layer definitions. [[14, 15]]

---

## The Experts and Their Positions

| Expert | Field | Key published work | Position relevant here |
|---|---|---|---|
| Ronny Kohavi | Online experimentation | *Trustworthy Online Controlled Experiments*; controlled-experiment papers | Define the overall evaluation criterion and guardrails before launch; calculate power and MDE; avoid underpowered “wins,” peeking, and sample-ratio problems. [[16, 17]]|
| Georgi Georgiev | Experimentation statistics | *Statistical Methods in Online A/B Testing*; Analytics Toolkit | Fixed-horizon testing is inefficient when teams repeatedly peek; properly designed sequential methods can preserve error control and reduce average sample size. [[18, 19]]|
| Evan Miller | Experimentation statistics | A/B testing calculators; “How Not to Run an A/B Test” | Fix sample size or use a valid sequential method; low base rates require very large samples. [[20, 21, 22]]|
| Avinash Kaushik | Web analytics | Digital Marketing & Measurement Model; macro/micro conversion work | Measure outcomes first, then micro-conversions and task completion; metrics should answer business questions. [[23, 24]]|
| Peep Laja / CXL | CRO and research | CXL CRO guide and testing methodology | CRO is research-led; significance alone is not validity; rough guidance includes 350 conversions per variation and 2–4 weeks of business-cycle coverage. [[25, 7]]|
| Ben Labay / Speero | CRO and experimentation | Speero experimentation research and methodology | Use qualitative research to identify substantial hypotheses; small-traffic teams should avoid wasting scarce traffic on tiny incremental tests. [[26, 27]]|
| Craig Sullivan | CRO | Practitioner CRO work | Candidate identified, but no reliable retrieved source was available in this search; no specific claim is attributed here. |
| André Morys | CRO | Practitioner conversion work | Candidate identified, but no reliable retrieved source was available in this search; no specific claim is attributed here. |
| Simo Ahava | Measurement implementation | Event implementation and data-layer articles | Events need stable names, explicit parameters, debugging, and a data-layer contract; implementation quality is part of measurement quality. [[28, 15]]|
| Timo Dechau | Tracking-plan design | Event Taxonomy; Analytics Implementation Workbook | Avoid event sprawl; distinguish core business, product, and UX events; put variation in properties. [[29, 30, 14]]|
| Krista Seiden | Analytics strategy | Analytics education and measurement work | Event-based models require disciplined naming, definitions, and governance; inconsistent event names fragment reporting. [[31, 32]]|
| Brian Balfour / Reforge | Activation and retention | Reforge North Star and retention frameworks | North Stars are output scoreboards; teams need actionable inputs covering acquisition, retention, engagement, and monetization. [[3, 1]]|
| Sean Ellis | Growth and activation | *Hacking Growth*; PMF and activation work | Identify the value moment and measure the behavior correlated with continued value; the “very disappointed” survey is a directional product-market-fit signal, not a universal law. [[33, 9]]|
| Lenny Rachitsky | Product metrics | Activation and North Star essays | Activation is `users reaching the milestone ÷ users completing signup`; a good milestone should be early, actionable, and strongly predictive of retention. [[8, 34]]|
| Andrew Foxwell | Paid-social measurement | UTM and attribution guidance | Maintain consistent UTMs and reconcile Meta, site analytics, business orders, and post-purchase survey evidence. [[12, 13]]|
| Common Thread Collective | Paid-social incrementality | Geo-holdout and incrementality methodology | Platform-attributed performance is not necessarily incremental; causal holdouts are the stronger method, but generally require much more volume than this site has. [[35, 36]]|
| Plausible | Privacy-first analytics | Privacy-first analytics documentation | Aggregated, cookie-free analytics can still support visitors, sources, goals, campaigns, and funnels; avoid pretending it identifies people across devices or days. [VENDOR: Plausible] [[37, 4]]|
| Umami | Privacy-first analytics | Event-tracking documentation | Use event names plus properties; HTML data attributes provide a low-code implementation; do not send personal data. [VENDOR: Umami] [[38, 39, 40]]|

The named candidates Craig Sullivan, André Morys, Lukas Vermeer, Common Thread Collective, Andrew Foxwell, and the privacy-first vendors were retained only where retrieved material directly supported the requested topics. No specific claims are made for experts whose primary work was not verified in the retrieved sources.

---

## 1. Metric Hierarchy for a Lead-Magnet and Digital-Product Site

### Recommended hierarchy

#### Level 1: business outcomes

The business has two outcomes:

1. **Permission acquired:** a valid free-skill signup.
2. **Revenue captured:** a completed paid purchase and its revenue.

These should not be collapsed into a fabricated single number. Revenue is the ultimate monetary outcome, but a site with rare purchases cannot use purchase rate as the only operating metric. Reforge describes North-Star metrics as outcomes decomposed into actionable inputs; its framework explicitly separates acquisition, retention, and monetization rather than requiring every business action to become one ratio. [[1]]

#### Level 2: page-specific primary metrics

**Free lead-magnet page**

- Primary: `successful signups ÷ landing-page views`.
- Unit: percentage of pageviews, reported with raw numerator and denominator.
- Window: weekly and rolling 28 days; 14-day comparisons are acceptable during active campaigns.
- Decision: whether the page and offer are producing permission efficiently.

**Paid product page**

- Primary when purchases are sufficient: `purchases ÷ paid-page visitors`.
- Secondary: revenue per paid-page visitor.
- Until purchases are sufficiently frequent: checkout-click rate is the operational primary, with purchase count and revenue as lagging outcomes.
- Decision: whether the page generates qualified buying intent and whether checkout friction or offer economics require investigation.

A pageview denominator is defensible because the current source of truth is Umami and the site has repeated page loads. A visitor denominator is preferable when the question is person-level conversion, but privacy-first analytics cannot reliably identify a person across days or devices. [[4]]

### Funnel definitions

| Metric | Numerator | Denominator | Unit | Interpretation |
|---|---|---|---|---|
| Landing-page view | Page-load events for the specified page | None | Count | Exposure |
| Visitor signup rate | Visitors with ≥1 successful signup | Visitors to the page | % | Person-oriented acquisition rate |
| Pageview signup rate | Successful signup events | Landing-page views | % | Current practical page KPI |
| Form-seen rate | Visitors/events reaching the defined visibility condition | Landing-page views or visitors | % | Visibility diagnostic |
| Form-start rate | Visitors with a genuine first-field interaction | Form-seen visitors | % | Intent/friction diagnostic |
| Form completion rate | Successful signups | Genuine form starts | % | Form friction diagnostic |
| Failed-submit rate | Failed-submit attempts | Submit attempts | % | Technical/form-quality diagnostic |
| Checkout-click rate | Visitors/events clicking checkout | Paid-page visitors/pageviews | % | Buying-intent diagnostic |
| Purchase rate | Purchases | Paid-page visitors or pageviews | % | Business conversion |
| Revenue per visitor | Server-side revenue | Paid-page visitors | Currency per visitor | Economic output |
| Free-to-paid aggregate rate | Purchases using a free-cohort code/link, or attributable survey responses | Free cohort signups | % | Directional cohort evidence |

### One metric versus several

Kaushik’s macro/micro model is the better fit than a single-metric dashboard: measure the macro outcome and a small number of micro-conversions that help diagnose it. [[23, 24]] The caution is not to promote every click to KPI status. A metric belongs in the operating set only if a change in it changes a decision.

Use:

- **Primary:** one outcome per page.
- **Funnel steps:** actions causally or operationally between exposure and outcome.
- **Guardrails:** measures that prevent a local improvement from damaging quality, trust, or downstream behavior.
- **Context:** traffic source, device, language, campaign, and consent coverage.
- **Data quality:** whether the measurement itself is trustworthy.

Do not use revenue per visitor as the sole primary metric at current purchase volume. Revenue is highly variable: most periods have zero purchases, and one order can dominate the ratio. Kohavi shows that revenue metrics require substantially more sample than binary purchase metrics because revenue has greater variance. [[16]]

---

## 2. After the Signup: Activation and Free-to-Paid Without Personal Tracking

### What “activation” should mean here

For a free skill, activation is not “form submitted.” It is the user reaching the first value moment:

1. signup;
2. download link requested or file downloaded;
3. installation or configuration;
4. first meaningful use inside Claude Code, Codex, or Cursor;
5. perceived usefulness;
6. eventual paid-product consideration or purchase.

Lenny defines activation as the earliest milestone that demonstrates value and predicts longer-term retention; the rate is activated users divided by users who completed signup. [[8]] Sean Ellis similarly warns that signup alone does not demonstrate that users experienced the product’s value. [[9]]

### Privacy-compatible measurement options

#### 1. Aggregate download-link clicks

Use one non-personal, skill-specific download URL per product and language, or per campaign cohort if operationally useful.

Report:

`unique-link requests ÷ successful signups` — only if the download endpoint can count unique requests without storing identity.

Caveat: “unique” may mean unique request fingerprints or daily aggregate deduplication, not unique human users. Label it **download-link request rate**, not user activation.

#### 2. Email engagement

From the email service, report:

- delivery rate;
- click rate;
- unsubscribe rate;
- spam complaints;
- clicks on installation instructions;
- clicks on paid-product follow-up.

Email opens are increasingly unreliable and should be secondary. Link clicks are stronger evidence of deliberate action.

#### 3. Tagged checkout links

Use separate, non-personal checkout URLs or coupon codes in follow-up emails:

- `free_homepage_audit_en`;
- `free_website_planning_pl`;
- `free_skill_followup_30d`.

The checkout webhook can count purchases by code even though it cannot identify the visitor. Report:

`purchases using cohort code ÷ signups in the corresponding cohort`.

This is aggregate attribution, not individual tracking.

#### 4. Self-report

Ask buyers, or free users after a reasonable delay:

- Which free skill did you use?
- Did you install it?
- Did you use it on a real project?
- Did it help?
- How did you hear about the paid skill?

Self-report has recall and response bias, but it is more informative than pretending browser attribution is complete. Foxwell specifically recommends post-purchase surveys as a reconciliation source when platform and analytics attribution disagree. [[11, 13]]

#### 5. Cohort comparisons

Create monthly or campaign cohorts:

- Polish versus English;
- Meta versus email;
- Homepage Audit versus Website Planning;
- signup month;
- landing page;
- form location.

Compare later aggregate outcomes:

- email click-through;
- paid-page visits;
- tagged checkout clicks;
- coupon-coded purchases;
- survey-reported usage.

Do not calculate a person-level free-to-paid rate unless the checkout system can establish the relationship lawfully and accurately.

### Recommended implementation

Start with:

1. a server or download-endpoint count for download-link requests;
2. email clicks on installation and paid-product links;
3. one cohort-specific checkout code per free skill and language;
4. a short post-download survey shown in email after 7–14 days;
5. monthly cohort reporting.

Activation confidence is **MEDIUM** for download and email behavior, **LOW** for actual installation/use unless users self-report or the tool itself provides aggregate telemetry. The product is used in external AI coding tools, so browser analytics cannot directly observe meaningful use.

---

## 3. Decision Rules at Low Traffic

### Why the current “30 conversions” rule is insufficient

Thirty conversions can be enough to reveal a catastrophic implementation problem, but it is not a universal threshold for estimating a conversion-rate difference. Required sample size depends on:

- baseline conversion rate;
- minimum detectable effect;
- alpha;
- desired power;
- one- or two-sided hypothesis;
- independent unit;
- variance;
- number of segments and metrics.

Evan Miller’s calculator requires baseline rate, MDE, power, and significance level. His low-base-rate examples show that detecting a 10% relative change at a 1% baseline can require more than 300,000 total subjects. [[20, 22]] 

Kohavi recommends calculating sample size before launch, generally using 80% power and an MDE no higher than 5%; he also stresses sizing to the population actually exposed to the change. [[6, 16]]

### What the site should do

#### A. Before any A/B test

Write:

- primary metric;
- denominator;
- unit of randomization;
- baseline;
- smallest worthwhile effect;
- alpha;
- power;
- maximum duration;
- guardrails;
- action for each result.

If the estimated sample size exceeds a realistic traffic horizon, do not run the test as a confirmatory experiment.

#### B. Use practical significance

For this site, a change from 10 signups per 100 views to 11 per 100 may be statistically invisible for months. A change from 10 to 20 may be commercially important but still uncertain at current volume.

Report:

> “Observed signup rate was 8.1% versus 6.2%, an absolute difference of 1.9 percentage points. The sample is too small to distinguish this from ordinary variation. The result is directional, not a confirmed win.”

Always show:

- numerator;
- denominator;
- absolute rate;
- absolute difference;
- relative difference;
- confidence interval or credible interval;
- campaign/device mix;
- data-quality status.

#### C. Pool windows carefully

Pooling several weeks increases sample size, but only if:

- the offer and page version remained stable;
- traffic mix is not materially different;
- no campaign launch or email spike dominates one window;
- the observation unit is not double-counted.

Do not pool incompatible pages or languages merely to obtain a larger number.

#### D. Use sequential statistics only with a defined method

Georgiev argues that valid group-sequential methods can allow interim monitoring while controlling error rates, with reported real-world efficiency gains around 26% in his analysis of 1,001 tests. [[19, 41]] Evan Miller also describes a simple sequential procedure, but it still requires a preselected maximum sample and assumptions. [[42]] 

The site should not manually “peek until significant.” Either:

- use a validated sequential method;
- or use a fixed horizon and read once.

#### E. Use qualitative evidence as the main low-traffic method

At current volume, prioritize:

- five-to-ten usability sessions per major hypothesis;
- owner-independent review of mobile in-app-browser flows;
- session recordings only as qualitative evidence;
- failed-submit reasons;
- one-question surveys;
- technical tests across iOS, Android, and in-app browsers.

Labay/Speero’s position is especially relevant: radical or assumption-level changes should be grounded in qualitative research, and low-volume teams should not confuse immediate directional evidence with a powered causal test. [[26, 27]]

#### Decision matrix

| Evidence | Action |
|---|---|
| Broken tracking, impossible ratios, or form failures | Fix immediately; no experiment required |
| Clear usability failure reproduced by several users | Fix and monitor; no A/B claim |
| Large observed improvement with stable traffic and no guardrail harm | Ship cautiously; label as directional |
| Small improvement with low counts | Do not declare a winner |
| Clear deterioration | Roll back if commercially or technically harmful |
| Valid powered test | Use pre-registered primary metric and interval |
| No conclusion after planned horizon | “Inconclusive,” not “no effect” |

The current 14-day comparison rule is useful for operational monitoring, but not sufficient for causal inference. CXL recommends full weeks and generally 2–4 weeks to cover business-cycle variation, while Kohavi emphasizes precomputed power. [[7]]

---

## 4. Intermediate Steps: Predictive vs Vanity

### Form seen

Define it as:

> A `form_seen` event fires once per page view when at least 50% of the form’s bounding rectangle intersects the viewport for at least one continuous 500-millisecond interval.

This is an **event count**, not a person count. If Umami cannot deduplicate within a page view, include a client-side boolean so it fires once.

Recommended rate:

`form_seen events ÷ landing-page views`.

For a visitor-oriented version:

`visitors with form_seen ÷ visitors to page`.

The current two-form page needs `form_location = hero | bottom`, not separate event names.

### Form start

Fire only on the first deliberate interaction with the form:

- pointer click or tap into the email field;
- keyboard focus followed by a user input event;
- not merely autofill;
- once per form instance.

Do not count a programmatic focus, browser autofill, or field validation as a start. Umami supports a focus-based implementation with a once-only listener, but the implementation must distinguish focus from actual input to avoid the known duplication problem. [VENDOR: Umami] [[43]] 

Recommended rates:

- `form_starts ÷ form_seen`;
- `successful_signups ÷ form_starts`.

### Failed submits

Each failed attempt should carry only controlled reason labels:

- `invalid_email`;
- `missing_required`;
- `server_error`;
- `rate_limited`;
- `unknown`.

Do not send the typed value. Report:

`failed submit attempts ÷ submit attempts`.

An error reason is actionable; a generic “form error” is not.

### Video, samples, top bar, and scroll

Use these as diagnostic signals:

- `hero_video_started ÷ pageviews`;
- `sample_output_clicks ÷ pageviews`;
- `topbar_clicks ÷ pageviews`;
- `reached_50_percent_form ÷ pageviews`;
- `reached_key_section ÷ pageviews`.

Scroll depth tells you what users reached, not whether the content persuaded them. It depends on page length and can represent searching, frustration, or efficient navigation. It should generate hypotheses, not serve as a success KPI. [[44]] 

Time on page is particularly weak: a long time may mean interest, confusion, a forgotten tab, or a slow page. Rage clicks and dead clicks are useful for detecting defects, but not proof of purchase intent.

### Predictive validation

Treat an intermediate metric as predictive only after observing that users who perform it have a materially different downstream outcome across stable cohorts. For example:

`signup rate among visitors who clicked sample output` versus `signup rate among visitors who did not`.

This is observational association, not causation. Lenny’s stronger activation standard is that the milestone should predict long-term value, ideally with a substantial retention difference, and be actionable. [[34, 8]]

---

## 5. Paid-Social Traffic Metrics

### Three measurement layers

#### Ad layer

From Meta:

- spend;
- impressions;
- reach;
- frequency;
- CPM;
- link CTR;
- outbound clicks;
- landing-page views;
- cost per landing-page view;
- cost per signup if Meta receives the event;
- ad-set and ad creative.

These answer: **Did the ad earn attention and deliver traffic?**

#### Landing-page layer

From Umami:

- UTM-tagged pageviews;
- visitors where available;
- signup rate;
- form-seen rate;
- form-start rate;
- failed-submit rate;
- device and browser;
- language and skill;
- in-app-browser share.

These answer: **Did the page convert the delivered traffic?**

#### Business layer

From server-side checkout:

- purchases;
- revenue;
- plan;
- currency;
- refund or cancellation where available.

These answer: **Did the traffic produce business value?**

### UTM standard

Use consistent lower-case values:

```text
utm_source=facebook
utm_medium=paid_social
utm_campaign={{campaign.name}}
utm_content={{adset.name}}
utm_term={{ad.name}}
```

Foxwell stresses that capitalization and naming inconsistency fragment reporting; he recommends using dynamic fields and comparing Meta with independent analytics and actual orders. [[12]]

### In-app browsers

Break out:

- `device = mobile`;
- browser family;
- Facebook/Instagram in-app browser;
- operating system;
- landing-page view;
- signup rate;
- error rate;
- checkout-click rate.

Do not compare desktop and mobile as if they were one population. In-app browsers can affect autofill, navigation, cookie/consent behavior, and checkout completion. The appropriate action is not to “correct” the numbers but to report the segment separately and test the flow on real devices.

### Minimum volume before judging ads

Meta’s learning-phase guidance commonly uses approximately 50 optimization events in seven days per ad set, but this is an optimization-system threshold, not evidence that an ad is profitable or that a landing page works. [VENDOR: Meta] [[45]] 

At this site’s volume, individual ads will rarely reach a stable purchase signal. Use:

- creative-level CTR and landing-page-view cost for early diagnosis;
- pooled signup rate across the same campaign/ad-set structure;
- pause only for clear technical failure, materially worse cost after adequate spend, or poor quality evidence;
- avoid declaring an ad a winner from a handful of signups.

Paid-social incrementality tests such as geo holdouts are methodologically stronger but generally require substantially more spend and conversion volume than this site has. [[35]]

---

## 6. Data-Quality Checks for Event Tracking

Run these checks after every release and at least weekly while campaigns run.

| Check | Definition | Alert/action |
|---|---|---|
| Pageview volume | Current count versus recent same-weekday baseline | Investigate unexplained change >20% |
| Event volume | Count by event, page, language, and device | Investigate spikes or zeros |
| Event/pageview ratio | `event count ÷ relevant pageviews` | Alert on impossible or abrupt values |
| Signup/form-start ratio | `form starts ÷ signups` | Flag if starts fall below signups or multiply unexpectedly |
| Form-start duplication | Starts per pageview and per session | Autofill should not create two starts |
| Required properties | Share of events with skill, language, form, page | Target ≥95%; revenue-critical data should be near-complete |
| Allowed values | Skill/language/form/error enum validation | Reject or quarantine unknown values |
| Once-only events | Multiple purchase or success events in one session/request | Deduplicate |
| Server reconciliation | Browser checkout clicks versus webhook purchases | Explain gaps; server purchase is authoritative for revenue |
| Freshness | Delay from event occurrence to report availability | Investigate missing daily data |
| Release comparison | Pre/post counts and ratios by version | Review every instrumentation change |
| Synthetic event | Controlled QA event in a non-production or excluded environment | Confirm reception, properties, and no duplication |
| Consent coverage | PostHog/Meta recorded views ÷ Umami views | Context only; not a conversion denominator |
| Internal traffic | Owner/QA visits flagged where possible | If impossible, annotate campaign windows and avoid overinterpretation |

General data-quality practice emphasizes accuracy, completeness, consistency, timeliness, validity, and uniqueness; duplicate events and schema drift can make plausible-looking dashboards systematically wrong. [[46, 47, 48]] 

The owner’s visits cannot currently be filtered. Therefore mark owner activity as a known limitation and avoid using very small daily movements as evidence.

---

## 7. Event Naming and the Tracking Plan

### Naming convention

Use stable `snake_case`, verb-noun semantics, and one event per business action:

```text
form_seen
form_started
form_submit_failed
signup_completed
download_link_requested
checkout_clicked
purchase_completed
```

Properties:

```text
skill = homepage_audit | website_planning | ux_design
language = pl | en
page_type = free_landing | paid_landing
form_location = hero | bottom
error_reason = invalid_email | server_error
device_context = mobile | desktop
```

Do not create:

```text
homepage_audit_english_hero_form_signup
homepage_audit_polish_bottom_form_signup
```

Those are one action with properties.

Simo Ahava recommends a data-layer approach using explicit key-value pairs, while the GA4 event model demonstrates why reusable event names and parameters are more maintainable than proliferating unique event names. [[15, 28]] Dechau recommends separating core business events from more detailed product and UX events. [[14]]

### Suggested hierarchy

**Core business events**

- `signup_completed`;
- `checkout_clicked`;
- `purchase_completed`;
- `download_link_requested`.

**Funnel events**

- `form_seen`;
- `form_started`;
- `form_submit_failed`;
- `sample_output_clicked`.

**UX diagnostics**

- `hero_video_started`;
- `topbar_link_clicked`;
- `scroll_milestone_reached`;
- `rage_click_detected`.

Umami supports declarative HTML attributes for low-code event tracking and JavaScript tracking when conditions or properties are more complex. [VENDOR: Umami] [[38]]

### Tracking-plan fields

Store the plan in version control or a shared repository:

| Field | Example |
|---|---|
| Event name | `form_started` |
| Business definition | First deliberate input interaction |
| Trigger | User input, not autofill-only focus |
| Required properties | skill, language, form_location |
| Allowed values | documented enums |
| Unit | event count |
| Intended denominator | form_seen or pageviews |
| Source | browser/server |
| Consent category | necessary/analytics/marketing |
| PII status | prohibited |
| Owner | named person |
| QA test | device and browser cases |
| Version | schema version/date |

Every new event must have a decision it supports. If no decision exists, do not add it.

---

## 8. Recommended Metric Set for This Site

| Metric | Definition: numerator / denominator / unit / window | Role | Decision | Confidence |
|---|---|---|---|---|
| Free signup rate | Successful signups / landing-page views / % / weekly and rolling 28 days | Primary | Change offer/page or keep | HIGH |
| Free visitor signup rate | Visitors with signup / visitors / % / weekly | Contextual primary | Compare traffic populations | MEDIUM |
| Form-seen rate | Form-seen events / pageviews / % / weekly | Funnel step | Placement/visibility issue | MEDIUM |
| Form-start rate | Genuine starts / form-seen events / % / weekly | Funnel step | Form desirability/friction | HIGH |
| Form completion rate | Successful signups / genuine starts / % / weekly | Funnel step | Validation or friction issue | HIGH |
| Failed-submit rate | Failed submits / submit attempts / % / weekly | Guardrail/data quality | Fix form or backend | HIGH |
| Download request rate | Aggregate download-link requests / successful signups / % / monthly cohort | Activation proxy | Improve delivery/install instructions | MEDIUM |
| Installation/use survey rate | Positive installation/use responses / survey responses / % / monthly cohort | Activation evidence | Improve onboarding/product | LOW |
| Paid-page visit rate | Paid-page visits from free cohort / free signups / % / monthly cohort | Funnel step | Evaluate cross-sell | MEDIUM |
| Checkout-click rate | Checkout clicks / paid-page views / % / weekly | Paid funnel | Improve buying intent | HIGH |
| Purchase rate | Server purchases / paid-page visitors / % / rolling 28 days | Business outcome | Offer/traffic decision | HIGH |
| Revenue per visitor | Server revenue / paid-page visitors / currency per visitor / rolling 28 days | Economic outcome | Budget and offer economics | HIGH |
| Aggregate free-to-paid | Cohort-coded purchases / cohort signups / % / 30–90 days | Downstream outcome | Assess lead quality | LOW |
| Cost per signup | Ad spend / successful signups / currency per signup / campaign window | Paid acquisition | Compare campaigns | HIGH |
| Signup rate by ad | UTM-attributed signups / Umami UTM landing-page views / % / campaign window | Ad-to-page diagnostic | Separate creative from page | MEDIUM |
| Landing-page-view rate | Meta landing-page views / link clicks / % / campaign window | Ad/technical diagnostic | Detect load or in-app-browser issues | MEDIUM |
| Mobile/in-app signup rate | Mobile in-app signups / mobile in-app views / % / campaign window | Guardrail | Fix mobile flow | MEDIUM |
| Consent coverage | PostHog recorded views / Umami views / % / weekly | Context/data quality | Interpret qualitative evidence | HIGH |
| Event completeness | Events with all required properties / critical events / % / daily | Data quality | Block reporting if degraded | HIGH |
| Duplicate rate | Suspected duplicate events / critical events / % / daily | Data quality | Fix instrumentation | HIGH |
| Volume anomaly | Current event count versus baseline / ratio / daily | Data quality | Investigate release/campaign effects | HIGH |

---

## Disagreements and Open Questions

### One North Star versus several

**Single-metric position:** Lenny and Reforge emphasize one focal output with input metrics beneath it. [[34, 1]]
**Multiple-outcome position:** Kaushik’s macro/micro framework and this site’s two offers justify separate page-level outcomes. [[23]]

**Recommendation:** use one primary metric per decision surface, not one metric for the whole business. A single “signup plus revenue” score would obscure whether a change improves free acquisition while harming paid sales.

### Fixed-horizon versus sequential testing

**Fixed-horizon:** Kohavi, Miller, and CXL emphasize precomputed sample sizes and avoiding unplanned peeking. [[21, 7]]
**Sequential:** Georgiev argues valid sequential methods can preserve error control and improve efficiency. [[18, 19]]

**Recommendation:** fixed horizon is simpler for this team; sequential testing is appropriate only if implemented with a validated method. Manual dashboard peeking is not sequential analysis.

### Revenue versus value/activation

Revenue is the final business outcome, but Balfour and Ellis caution that revenue alone is lagging and may not reveal whether users received value. [[3, 9]] For this site, paid revenue remains the economic outcome, while free-skill usage and signup quality are leading indicators.

### Browser attribution versus privacy

Person-level attribution would be analytically richer, but the site intentionally avoids linking signup, visitor, ad, and purchase. The correct response is not to weaken the privacy boundary; it is to use aggregate cohorts, tagged links, surveys, and total-business reconciliation.

---

## Orphan Topics

### Treat the landing page and product as one value-delivery system

A unique implication of this business is that the free skill is not merely a lead form. It is also a product sample. A high signup rate followed by low download or usage may indicate that the landing page is successfully acquiring curiosity but failing to deliver product value. This is why download-link requests, installation instructions, and a delayed usefulness survey deserve measurement even though they are outside standard landing-page CRO.

### “Quality signup” should be defined behaviorally

A quality free signup is not necessarily one with a particular email domain or demographic label. In this context, quality should mean reaching one or more value behaviors:

- clicked installation instructions;
- requested the download;
- reported real use;
- clicked a relevant paid-product explanation;
- used a cohort-tagged checkout path.

This follows the activation principle that the useful acquisition unit is not simply a new user but a new user who reaches meaningful value. [[1, 8]]

### Separate count authority from explanatory evidence

Use Umami for site counts, the checkout webhook for purchases, and the email system for email delivery/clicks. Use PostHog recordings only to explain behavior among the consented subset. Do not reconcile tools by forcing identical totals: consent, blockers, counting units, and identifiers differ. Privacy-first systems explicitly trade person-level continuity for reduced data collection. [[40, 4]]

### The best low-traffic experiment may be a product change, not a page variant

At this volume, testing a headline against another headline may take months to answer. A larger change—clearer offer positioning, an installation preview, a sample output, or a simpler mobile form—can produce a useful directional result sooner, but the result should still be labeled observational unless adequately powered. Speero’s emphasis on radical experimentation and qualitative grounding is more applicable here than a high-volume button-testing program. [[26]]

### Measurement should be designed around denominator integrity

The current autofill problem is not an isolated bug. It illustrates a broader principle: every rate is only as valid as its denominator. A duplicated form start makes completion rate look worse; missing pageviews make signup rate look better; consent-only recording makes qualitative evidence look different from total traffic. Every dashboard tile should display its unit, numerator, denominator, data source, and quality status.

---

## Sources

*The report's inline `[[n]]` markers index this list — not any numbered source inventory inside the report body. It lists each distinct link the provider returned or the report linked, cited or not; a marker numbered past its end had no source.*

1. [How to Choose & Measure Impactful North Star Metrics — Reforge](https://brian-balfour-s5lh.squarespace.com/resources/north-star-metrics)
2. [How to Choose & Measure North Star Metrics: Acquisition, Retention, & Monetization](https://www.reforge.com/blog/north-star-metrics)
3. [North star product metrics are leading you astray](https://roadmunk.com/guides/north-star-product-metrics-brian-balfour-reforge/)
4. [Metrics definitions](https://plausible.io/docs/metrics-definitions)
5. [Vanity Metrics: Add Context to Add Meaning - NN/G](https://www.nngroup.com/articles/vanity-metrics/)
6. [growthbook.io growthbook.io and Ron Kohavi growthbook.io](https://hs-8863617.f.hubspotemail.net/hubfs/8863617/Trustworthy_AB_Webinar.pdf)
7. [How to Run A/B Tests by Peep Laja](https://cxl.com/conversion-rate-optimization/how-to-run-ab-tests-by-peep-laja/)
8. [Lenny Rachitsky on X: "How to determine your activation metric Including real examples from Figma, Linear, Airtable, Snyk, Slack, Asana, and Sprig. Read on (1/5):" / X](https://x.com/lennysan/status/1590032746772328448)
9. [Is Product/Market Fit Hiding in Your User Base?](https://seanellis.substack.com/p/is-productmarket-fit-hiding-in-your)
10. [Inside the 6 Hypotheses that Doubled Patreon’s Activation Success — Brian Balfour](https://brianbalfour.com/essays/patreon-onboarding-growth)
11. [Transcript of DEAR META ADS BUYER, YOU'RE NOT ALONE](https://unofficialshopifypodcast.com/episodes/andrew-foxwell-fb-ads-TMQY4v_N/transcript)
12. [Beginner Guide: UTMs for Facebook Ads in 6 Steps — Foxwell Digital](https://www.foxwelldigital.com/blog/2021/7/29/6-steps-to-get-you-started-with-utms-on-facebook-ads)
13. [FB Ads vs Google UTMs: How to Read Conflicting Data — Foxwell Digital](https://www.foxwelldigital.com/blog/2021/10/17/facebook-ads-manager-reporting-vs-google-analytics-utm-reporting)
14. [Timo Dechau on LinkedIn: It's embarrassing. It took my basically 7 years to realise that I](https://www.linkedin.com/posts/timo-dechau_its-embarrassing-it-took-my-basically-activity-6898190389551923200-CA7C)
15. [From Project To Process](https://www.simoahava.com/analytics/from-project-to-process/)
16. [Controlled experiments on the web: survey and practical ...](https://ai.stanford.edu/~ronnyk/2009controlledExperimentsOnTheWebSurvey.pdf)
17. [Practical Guide to Controlled Experiments on the Web](https://ai.stanford.edu/~ronnyk/2007GuideControlledExperiments.pdf)
18. [Q&A on Sequential Statistics in A/B Testing](https://blog.analytics-toolkit.com/2023/qa-on-sequential-statistics-in-a-b-testing/)
19. [How to Run Shorter A/B Tests?](https://blog.analytics-toolkit.com/2022/how-to-run-shorter-a-b-tests/)
20. [Sample Size Calculator (Evan’s Awesome A/B Tools)](https://www.evanmiller.org/ab-testing/sample-size.html)
21. [How Not To Run an A/B Test](https://www.evanmiller.org/how-not-to-run-an-ab-test.html)
22. [The Low Base Rate Problem](https://www.evanmiller.org/the-low-base-rate-problem.html)
23. [Excellent Analytics Tip #13: Measure Macro AND Micro Conversions.](https://www.kaushik.net/avinash/excellent-analytics-tip-13-measure-macro-and-micro-conversions/)
24. [Digital Marketing and Measurement Model](https://www.kaushik.net/avinash/digital-marketing-and-measurement-model/)
25. [MASTER THE ESSENTIALS OF CONVERSION OPTIMZATION](https://cxl.com/Essentials%20of%20Conversion%20Optimization%20by%20ConversionXL.pdf)
26. [Why Radical Experimentation Is More Impactful Than Small Optimizations](https://www.chilipiper.com/podcast/radical-experimentation-ben-labay)
27. [Testing Insights: Decision Science vs CRO vs Experimentation](https://www.linkedin.com/posts/benlabay_testing-insights-episode-my-man-jonny-longden-activity-7122963033764552704-NWil)
28. [Implementation Guide For Events In Google Analytics 4](https://www.simoahava.com/analytics/implementation-guide-events-google-analytics-4/)
29. [Event Taxonomy](https://timodechau.com/library/event-taxonomy/)
30. [Smart Tradeoffs in Analytics — Slack Tracking Plan](https://timo.space/blog/making-smart-tradeoffs-in-analytics-a-slack-tracking-plan-journey/)
31. [Episode 89: Google Analytics 4 (GA4) with Simo Ahava and Krista Seiden](https://withcandour.co.uk/podcast/episode-89-google-analytics-4-ga4-with-simo-ahava-and-krista-seiden)
32. [The Unglamorous Thing That Makes AI-Driven Analytics Actually Work - Digital Debrief](https://kristaseiden.com/the-unglamorous-thing-that-makes-ai-driven-analytics-actually-work/)
33. [Hacking Growth by Sean Ellis: Summary & Notes by Sean Ellis](https://grahammann.net/book-notes/hacking-growth-sean-ellis)
34. [Lenny Rachitsky’s Quotes](https://glasp.co/quotes/lenny-rachitsky)
35. [Geo Holdout Incrementality Testing for Ecommerce Brands](https://commonthreadco.com/pages/incrementality)
36. [The Secret to Smarter Budget Allocation](https://commonthreadco.com/blogs/ecommerce-playbook/secret-to-smarter-budget-allocation)
37. [GitHub - plausible/analytics: Open source, privacy-first web analytics. Lightweight, cookie-free Google Analytics alternative. Self-hosted or cloud. · GitHub](https://github.com/plausible/analytics)
38. [Track events - Umami docs](https://docs.umami.is/docs/track-events)
39. [Tracker functions](https://docs.umami.is/docs/tracker-functions)
40. [About - Umami docs](https://docs.umami.is/docs/about)
41. [What Can Be Learned From 1,001 A/B Tests?](https://blog.analytics-toolkit.com/2022/what-can-be-learned-from-1001-a-b-tests/)
42. [Simple Sequential A/B Testing](https://www.evanmiller.org/sequential-ab-testing.html)
43. [Umami Event Tracking Setup](https://opsblu.com/documentation/analytics-platforms/umami/setup-and-implementation/event-tracking/)
44. [What Scroll Depth Is: How to Measure & Use It](https://www.omniconvert.com/what-is/scroll-depth/)
45. [Understanding and optimizing your ad campaign](https://developers.meta.com/vr/resources/optimize-ad-campaign/)
46. [Data Quality in Analytics: How Bad Data Leads to Bad Decisions](https://theresumebuilder.com/data-quality-analytics-guide/)
47. [Data Quality Audit: 15-Point Checklist Before Every Report](https://domcrypt.org/data-quality-audit-checklist/)
48. [How to measure data quality in your product analytics setup](https://contentsquare.com/blog/measure-data-quality-product-analytics/)