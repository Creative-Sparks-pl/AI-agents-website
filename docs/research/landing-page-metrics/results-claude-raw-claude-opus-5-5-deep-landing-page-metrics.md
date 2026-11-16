---
provider: "claude"
model: "claude-opus-5-5"
brief: "brief-pplx-deep-landing-page-metrics.md"
duration_ms: 129317
input_tokens: 60646
output_tokens: 12142
searches: 21
cost_usd: 0.5577192
truncated: False
citation_scheme: "unified"
---

# Research Results: brief-pplx-deep-landing-page-metrics

**Provider:** claude (claude-opus-5-5)

---

# Which Metrics a Low-Traffic Lead-Magnet and Digital-Product Site Should Define, and How to Decide With Them

## Executive Summary

The main finding is about statistics. At about 360 landing-page views every 14 days, the site cannot detect realistic improvements with any formal test. Your "30 conversions per window" rule makes reports more readable, but it is not a decision threshold. The experimentation experts' work points to a different approach: show uncertainty ranges, judge only large effects, and decide mainly from qualitative evidence plus guardrails, not significance tests.

The 10 recommendations below are explained further in the report.

1. **Make *signups per landing-page view, by page and language* the primary metric for each lead-magnet page, read with a cost-per-signup figure for paid traffic. Keep *signups per form-seen* as a diagnostic.** Your traffic is mostly single-visit paid-social, so per-view and per-visitor rates are nearly the same. Per-view is easier to audit in Umami. (Confidence: MEDIUM)
2. **Don't make purchases a primary metric yet.** With zero purchases since tracking began, purchase rate per view tells you nothing. Use *checkout clicks per paid-page view* as the paid-page primary. Treat purchases and revenue as a monthly business result, counted from Easytools rather than per page. (HIGH that this is right for a site this small. Kohavi's OEC idea favours leading indicators that predict long-term value.)
3. **Replace "30 conversions = trustworthy" with a pre-change effect check.** Before shipping a change, write down the smallest lift that would count as real and how many views that needs. At a 10% signup rate, detecting a 30% relative lift with 80% power needs about 1,770 views per arm; a 50% lift needs about 680. You have roughly 180 views per page per 14 days. (HIGH)
4. **Report every comparison as a range, not just a point estimate.** For example, 30 signups versus 45 signups is a ratio of 1.5×, but the 95% range runs from about 0.94× to 2.4×, so it is not conclusive. Use three labels for the owner: "clearly better", "can't tell", "clearly worse". (HIGH)
5. **For most changes, use before/after comparisons with guardrails plus qualitative evidence: recordings, a one-question survey and form-failure reasons.** Run A/B tests only for very large expected changes. (HIGH, from CXL, Sullivan and Georgiev)
6. **Measure what happens after signup in aggregate and without personal data.** Use a distinct download URL per email versus per page, click counts in the email platform, a tagged checkout link or coupon in the nurture emails, and a one-question "did you install it?" survey. (MEDIUM; the evidence here is thin)
7. **Add self-reported attribution ("Where did you hear about us?") to the Easytools checkout or the post-purchase email.** It is the only privacy-compatible way to connect purchases to channels and to the free skills. (MEDIUM)
8. **Judge ads on Meta's cost per landing-page view and cost per signup. Judge pages on Umami's signup rate. Never judge a page with Meta's numbers.** Wait for about 10–20 signups per ad before cutting it on conversion grounds. (LOW–MEDIUM; practitioners differ on the exact number)
9. **Run weekly ratio checks on the events themselves:** form starts ≤ form-seen ≤ views; signups ≤ starts; at most one signup per visitor per page; the share of views recorded at about 30%. Also compare before and after every release. The autofill doubling is exactly the kind of issue these checks catch. (HIGH)
10. **Keep a one-page tracking plan in the repository.** Use object_action event names, a fixed set of labels, and Umami's `data-umami-event` attributes so most tracking needs no JavaScript. (HIGH)

## The Experts and Their Positions

| Expert | Field | Key work | Stance relevant to us |
|---|---|---|---|
| Ronny Kohavi | Experimentation | *Trustworthy Online Controlled Experiments*; Kohavi & Longbotham encyclopedia entry [[1]] | Define one OEC (overall evaluation criterion) plus guardrails. Valid testing needs thousands of users. |
| Georgi Georgiev | Experiment statistics | Analytics-Toolkit; meta-analysis of 115 tests [[2]] | The median real lift is about 4%. Most tests are underpowered. Pre-plan the MDE (minimum detectable effect). |
| Evan Miller | Experiment statistics | How Not To Run an A/B Test [[3]]; sample size calculator [[4]] | Fix the sample size in advance and don't peek. |
| Lukas Vermeer | Experiment trustworthiness | Automated SRM detection (ACM) [[5]] | Treat ratio mismatches as data-quality alarms. |
| Avinash Kaushik | Web analytics | Macro and micro conversions [[6]] | Measure macro conversions first and micro conversions as well. |
| Peep Laja / CXL | CRO | A/B testing alternatives for low traffic [[7]] | At low traffic, use qualitative research and other methods instead of tests. |
| Ben Labay / Speero | Experimentation programmes | Optimizing beyond conversion rate [[8]]; Multiple tests at once [[9]] | Look beyond the conversion event. Splitting low traffic destroys power. |
| Craig Sullivan | CRO | Smart Insights interview [[10]] | If you can't test, work on understanding users and growing traffic. |
| Simo Ahava | Tracking / data quality | "Garbage In Garbage Out" talk [[11]] | Data quality and browser tracking protections come before analysis. |
| Timo Dechau | Tracking-plan design | Too many events [[12]]; three-layer schema [[13]] | Define fewer events. Organise them in layers. Leave UX events out of the core plan. |
| Sean Ellis | Growth / activation | Lenny's Newsletter interview [[14]]; Breakout Growth [[15]] | Use a north-star metric that reflects value delivered. Activation matters more than acquisition. |
| Lenny Rachitsky | Activation | Newsletter (as host of the Ellis interview) | Activation should be defined as the moment the user gets value. [UNVERIFIED for his specific definitions] |
| Common Thread Collective | Paid-social economics | First-order profitability [[16]]; diagnostic [[17]] | Judge acquisition on first-order value versus CAC (customer acquisition cost), by cohort. |
| Plausible | Privacy-first analytics | Goal conversions docs [[18]] [VENDOR: Plausible] | Conversion rate = unique converting visitors / unique visitors. |
| Umami | Privacy-first analytics | Track events docs [[19]] [VENDOR: Umami] | Attribute-based events with properties. |
| Convert (synthesising Labay et al.) | CRO tooling | Metrics guide [[20]]; MDE guide [[21]] [VENDOR: Convert] | Guardrails catch violated assumptions. MDE of about 10% for low-traffic sites. |
| 37signals (Jamie Hasselbalch) | Practical testing | Sample-size tech note [[22]] | Don't keep a test running until it happens to reach significance. |

Not retained: Krista Seiden, André Morys and Andrew Foxwell. I could not retrieve their positions on these questions in this session, so I don't attribute anything to them. Brian Balfour/Reforge activation material was also not verified here.

## 1. Metric Hierarchy for a Lead-Magnet and Digital-Product Site

**Consensus.** Kohavi's framework is the reference. Each experiment or decision has one OEC, which should be a short-term metric expected to predict long-term value, plus guardrail metrics that warn when something breaks (Kohavi & Longbotham [[1]]). Convert's guide, which draws on Labay, describes guardrails as metrics "designed to alert experimenters about a violated assumption" (Convert [[20]]). Kaushik's long-standing advice is to focus on macro conversions but also identify and measure micro conversions (Kaushik [[6]]). For this site, the free-skill signup is a micro conversion relative to revenue, and also the macro conversion of its own page.

**A four-level structure for this site.**

1. **Business result (monthly, not per page):** purchases and revenue from Easytools, plus self-reported source. This is where the free and paid offers meet, because of a deliberate GDPR choice: you can't connect them per person, only in aggregate.
2. **Page primary (one per page):** lead-magnet pages use signups per view; the paid page uses checkout clicks per view.
3. **Funnel diagnostics:** form-seen rate, form-start rate, completion rate, failed submits, cross-sell clicks.
4. **Guardrails and context:** mobile share, in-app share, form failure rate, recorded share, cost per signup.

**Is signups per view the right primary?** Yes for now, with two adjustments. First, use it per page and language, never pooled across very different traffic. Second, Plausible's definition uses unique visitors (Plausible [[18]]) [VENDOR: Plausible]. For single-session paid-social traffic the two units differ by only a few percent, so per-view is fine as long as you stick to one unit. Speero argues the real frontier "starts after the conversion" (Speero [[8]]). That supports adding a quality layer (Section 2) rather than changing the primary.

**Revenue per visitor?** This is standard in e-commerce CRO, but with zero purchases it is zero divided by something, and its variance is far higher than a binary rate. Postpone it until there are about 30 or more purchases per quarter (SPECULATIVE threshold). **Leads that later buy** is the right long-run number. Because purchases can't be linked to individuals, the closest you can get is a cohort ratio: purchases per month ÷ signups in the previous 1–2 months, plus survey attribution. (MEDIUM)

## 2. After the Signup: Activation and Free-to-Paid Without Personal Tracking

Sean Ellis's advice is to pick a north-star metric that reflects the core value delivered and to treat activation as more important than acquisition (Lenny's Newsletter [[14]]; Hacking Growth notes [[23]]). He describes walking through retention, referral, acquisition and activation to choose a north star (Sub Club [[15]]). For a downloadable skill, "value delivered" means it is installed and run. You can't observe that directly, so use proxies, ranked from strongest to weakest:

| Method | Metric (numerator / denominator) | Personal data? | Effort |
|---|---|---|---|
| Separate download URLs: one shown on the page, one in the email | email-link downloads / signups (weekly) | No, if the server counts aggregate hits only | Low |
| Email platform click on "how to install" | unique clicks / delivered, per email | Held by the email platform (already processing) | Low |
| One-question survey in email 2 ("Did you run it? Yes / Not yet / Couldn't install") | "yes" / respondents | No, if the survey is anonymous | Low |
| Tagged checkout link or coupon in nurture emails (e.g. `?src=nurture-audit`, code `AUDIT10`) | purchases with that tag / nurture emails delivered | No: only a label on the order | Low |
| "Where did you hear about us?" at checkout or after purchase | share of purchases answering "free skill" | No | Low |
| Cohort ratio | purchases in month M / signups in M−1 and M−2 | No | Trivial |

Self-reported attribution is usually a "how did you hear about us" field placed at a conversion point (DemandSpring [[24]]; RankWorks [[25]]). Most writing on it is B2B, so applying it to a solo digital product is an extrapolation (MEDIUM). Optionally, the skill itself could print a link containing a non-personal tag (e.g. `?src=skill-output`) in its final output, so visits from people who actually ran it show up in Umami. This idea is SPECULATIVE, and it should be disclosed in the skill's README.

## 3. Decision Rules at Low Traffic

**What the experts say.**
- Georgiev's meta-analysis of 115 tests found an average lift of about 4%, and most tests lacked power. He also notes that no reasonable person designs a test with 90% power at an MDE above 40% (Georgiev [[2]]).
- Miller: "the best way to avoid repeated significance testing errors is to not test significance repeatedly". Decide the sample size in advance (Miller [[3]]).
- Convert suggests an MDE of up to about 10% for lower-traffic sites (Convert [[21]]) [VENDOR: Convert]. That advice is aimed at sites with thousands of conversions; for you, 10% is far out of reach.
- Speero shows that splitting traffic between two tests raises each one's MDE by 41%, which can turn a readable question into an unreadable one on a low-traffic page (Speero [[9]]).
- CXL lists alternatives for low traffic, noting that a handful of data points "certainly could cause you to rethink your gut instinct" even without significance (CXL [[7]]).
- Sullivan: if there's no way to test, focus on understanding users and growing traffic (Smart Insights [[10]]).

**Is "30 conversions, 14–28 days" sound?** Only as a label meaning "below this, don't even look". The arithmetic, using the standard two-proportion formula at α=0.05 and power 0.8 (my calculations):

| Baseline signup rate | Relative lift to detect | Views needed per arm |
|---|---|---|
| 10% | +30% (→13%) | ~1,770 |
| 10% | +50% (→15%) | ~680 |
| 10% | +100% (→20%) | ~200 |

At about 180 views per page per 14 days, only lifts around double are detectable within a window. A before/after comparison of 30 versus 45 signups (with equal views) gives a 95% range of about 0.94× to 2.4×.

**Recommended rules.** (HIGH for the direction, SPECULATIVE for the exact cutoffs)
1. Before shipping, write down the expected effect. If detecting it would need more than about 8 weeks of views, don't treat the result as a test. Call it a *judgement change*, and justify it with qualitative evidence: recordings, failure reasons, survey answers.
2. Pool windows when the question allows it. Compare 28 days versus 28 days and combine both languages if the change was made in both.
3. Bayesian reporting suits non-statisticians: "probability B is better: 78%; likely range −10% to +90%". Fixed-sample frequentist reporting is equally valid if pre-planned. Repeated peeking is the error to avoid in either framework (Miller [[3]]; 37signals [[22]]).
4. Guardrails only need to rule out disaster. Revert if a guardrail worsens by more than 50% with at least 10 events (SPECULATIVE).
5. Before/after comparisons are confounded by changes in the campaign mix. Only compare windows with similar traffic sources, i.e. Meta days against Meta days.

## 4. Intermediate Steps: Predictive vs Vanity

Kaushik's micro-conversion idea supports tracking intermediate steps, but only those plausibly on the path to the macro conversion (Kaushik [[6]]; Dave Chaffey glossary [[26]]). Dechau puts very detailed UX events in a separate layer outside the core plan, and admits he defined "too many events" for years (Dechau [[12]]). I found no published, independent evidence that scroll depth or time on page predicts lead-form conversion. Treat them as vanity unless your own data shows a link [UNVERIFIED for any general claim].

| Signal | Verdict | Why |
|---|---|---|
| Form seen (≥50% of the form visible for ≥1 s, once per form per page load) | Keep, diagnostic | It splits "didn't reach the form" from "reached it but didn't act", which is the core decision about form placement |
| Form start (focus or input in the field) | Keep | The completion-rate denominator |
| Failed submit plus reason | Keep, guardrail | Directly actionable |
| Sample-output clicks, hero video plays | Keep for 8 weeks, then review | Proof engagement; drop it if there's no difference between those who sign up and those who don't |
| Scroll depth, time on page | Avoid as metrics | No decision depends on them, and in-app browsers distort both |
| Rage clicks | Use in PostHog as evidence, not as a count | |

Definitions: **form-abandonment rate** = (form starts − signups) / form starts, per form. **Form reach** = page loads with a form-seen event for any form / views. For units, use per page load (view) throughout, because PostHog sessions are consent-filtered.

## 5. Paid-Social Traffic Metrics

Keep ad performance and page performance separate. **Ad level (Meta):** CPM, link CTR, cost per landing-page view. **Page level (Umami, UTMs per ad):** signups / views by `utm_content`. The handoff check is Umami views ÷ Meta landing-page views per ad, typically expected below 1 because of consent and blockers. Treat sudden shifts as tracking problems (MEDIUM). CTC's economics framing of first-order value versus CAC, tracked by monthly cohort (CTC [[16]]; CTC diagnostic [[17]]), translates for this site to **cost per signup** and **ad spend ÷ revenue per month**.

UTM convention: `utm_source=meta`, `utm_medium=paid-social`, `utm_campaign={skill}-{lang}-{geo}`, `utm_content={ad-id-short}`. For the minimum volume before judging an ad's conversion performance, I could not verify a specific practitioner figure. Using the arithmetic from Section 3, 10–20 signups per ad is the floor for even crude comparisons (SPECULATIVE). Below that, judge ads only on CTR and cost per landing-page view.

In-app browsers: compare signup rate by `in_app=yes/no`. A large gap suggests friction (autofill, keyboard, failed submits) rather than poor creative (SPECULATIVE).

## 6. Data-Quality Checks for Event Tracking

Vermeer's SRM work treats a mismatch in expected ratios as a sign of data-quality problems (Vermeer et al., ACM [[5]]; TU Delft [[27]]; Online Dialogue on CH2019 [[28]]). The same idea applies to funnels without an experiment. Ahava's data-quality and tracking-protection talks make the same "garbage in, garbage out" case (Ahava [[11]]).

Weekly checklist (HIGH for the principle; the thresholds are SPECULATIVE):
- **Monotonic funnel:** form_seen ≤ views, starts ≤ seen, signups ≤ starts. Any violation is a bug, which is exactly how the autofill doubling would have shown up.
- **Duplicate ceiling:** at most 1 signup per visitor per page per day.
- **Email reconciliation:** Umami signups versus new contacts in the email platform. The email platform should be ≥ Umami (no blocking); alert if Umami exceeds it.
- **Recorded share:** PostHog sessions ÷ Umami visitors at about 30% ± 10 points.
- **Release diff:** 7 days after each deploy, compare each event-to-view ratio with the prior 7 days. A change of more than ×2 means investigate.
- **Synthetic test:** after each deploy, submit a test signup with `?test=1` and confirm one event per step. Filtering the owner's visits through a URL flag or a localStorage opt-out is a partial fix for the owner-visit gap [UNVERIFIED for Umami-specific support].

## 7. Event Naming and the Tracking Plan

Dechau uses a three-layer schema (core business events, product events, UX events) and advises defining fewer events (Dechau [[13]]). Umami supports a `data-umami-event` attribute on any element, with properties added through `data-umami-event-*` attributes (Umami docs [[19]]; Umami developers [[29]]) [VENDOR: Umami].

Convention: `object_action` in lowercase snake case (`form_seen`, `form_start`, `signup_submit`, `signup_fail`, `checkout_click`, `sample_click`). Use one fixed property set: `skill`, `lang`, `form` (top/bottom), `page`, and `reason` for failures. Keep the plan as `tracking-plan.md` next to the code, with a row per event: name, trigger, properties, layer, owner, and the date added. Any pull request that adds an event updates the file.

## 8. Recommended Metric Set for This Site

| Metric | Numerator / Denominator / Unit / Window | Role | Decision | Confidence |
|---|---|---|---|---|
| Signup rate | signups / landing views; %; per page+lang; 28d | Primary (free pages) | Keep or revert page changes | MEDIUM |
| Checkout-click rate | checkout clicks / paid-page views; %; 28d | Primary (paid page) | Paid-page changes, pricing display | MEDIUM |
| Purchases and revenue | Easytools orders; count, per currency; monthly | Business result | Is the whole thing working? | HIGH |
| Cost per signup | Meta spend / Umami signups by campaign; currency; per campaign | Primary (ads) | Scale or kill campaigns | MEDIUM |
| Form reach | page loads with form_seen / views; % | Funnel step | Form placement | MEDIUM |
| Form-start rate | starts / form_seen; % | Funnel step | Offer and copy clarity | MEDIUM |
| Completion rate | signups / starts; % | Funnel step | Form friction | HIGH |
| Failed-submit rate | signup_fail / (signups + fails); %, by reason | Guardrail | Fix bugs | HIGH |
| Signup rate in-app vs other | as above, split | Guardrail/context | In-app friction | SPECULATIVE |
| Email-link download rate | email-URL downloads / signups; weekly | Activation proxy | Delivery and interest | MEDIUM |
| "Ran it" survey share | yes / respondents; monthly | Activation | Lead-magnet quality | LOW |
| Nurture-tagged purchases | tagged orders / nurture emails delivered; monthly | Free-to-paid | Value of the free offers | MEDIUM |
| Self-reported source | share of purchases citing each source; quarterly | Attribution | Channel mix | MEDIUM |
| Cohort conversion | purchases(M) / signups(M−1,M−2) | Free-to-paid | Long-run viability | SPECULATIVE |
| Cross-sell click rate | free→paid clicks / free-page views | Context | Paid-offer placement | LOW |
| Funnel monotonicity, duplicates, email reconciliation, recorded share | see §6; weekly | Data quality | Trust the numbers | HIGH |

## Disagreements and Open Questions

- **Test or don't test at low traffic.** CXL and Sullivan say use alternatives. Some CRO case studies report "valid" uplifts on low-traffic sites (CXL case study [[30]]), even quoting revenue as "79% statistically significant". For a site like this, the Georgiev/Miller position is the better fit: don't present such numbers as conclusions.
- **MDE norms.** Vendors suggest 5–10% (Convert [[21]]). Georgiev's data suggests true effects are around 4%. Both imply that at this site's volumes only radical changes can be read.
- **Per-view vs per-visitor.** Plausible uses visitors; per-view is more auditable. This matters little for single-visit paid traffic.
- **Open questions:** a published minimum spend per ad before judging it, and evidence on whether proof clicks predict signups, were not found in this session.

## Orphan Topics

### Fewer events is a lesson experts learn late
Dechau describes taking about seven years to realise he was defining too many events (Dechau [[12]]). Your five new events should each have a review date.

### Running parallel tests is a hidden cost at low traffic
Speero quantifies that isolating concurrent tests costs 41% more MDE (Speero [[9]]). That supports your "one change at a time" rule for a different reason than usual: it protects statistical power, not just interpretability.

### Skip A/A tests at this scale
Sullivan's 2020 view, as reported second-hand, is that A/A tests aren't worth running below very high traffic (LinkedIn mention [[31]]) [secondary source]. Use the ratio checks in Section 6 instead.

### Cross-domain transfer: SRM thinking applied to funnels
Vermeer's automated SRM detection was built for experiments, but the same idea works for any event pair with a known ratio, such as the two forms on one page or Umami versus the email platform (ACM [[5]]).

### Profit-first framing for small ad budgets
CTC's first-order profitability idea (CTC [[16]]) suggests that even a free funnel should be judged on whether spend ÷ monthly revenue is trending toward 1. Cost per signup alone isn't enough.

---

## Sources

*The report's inline `[[n]]` markers index this list — not any numbered source inventory inside the report body. It lists each distinct link the provider returned or the report linked, cited or not; a marker numbered past its end had no source.*

1. [Kohavi & Longbotham encyclopedia entry](https://exp-platform.com/Documents/2023-03-11EncyclopeiaMLDSABTestingFinal.pdf)
2. [meta-analysis of 115 tests](https://georgi-georgiev.medium.com/meta-analysis-of-115-a-b-tests-average-lift-is-4-most-lack-statistical-power-7b61e46c0dbe)
3. [How Not To Run an A/B Test](https://www.evanmiller.org/how-not-to-run-an-ab-test.html)
4. [sample size calculator](https://www.evanmiller.org/ab-testing/sample-size.html)
5. [Automated SRM detection (ACM)](https://dl.acm.org/doi/fullHtml/10.1145/3530019.3534982)
6. [Macro and micro conversions](https://cybercemetery.unt.edu/archive/appsnow/20110607190125/http://www.kaushik.net/avinash/2008/03/excellent-analytics-tip-13-measure-macro-and-micro-conversions.html)
7. [A/B testing alternatives for low traffic](https://cxl.com/blog/ab-testing-alternatives/)
8. [Optimizing beyond conversion rate](https://speero.com/post/optimizing-beyond-conversion-rate)
9. [Multiple tests at once](https://speero.com/post/can-you-run-multiple-a-b-tests-at-the-same-time)
10. [Smart Insights interview](https://www.smartinsights.com/conversion-optimisation/conversion-optimisation-strategy/web-optimisation/)
11. ["Garbage In Garbage Out" talk](https://www.slideshare.net/SimoAhava)
12. [Too many events](https://www.linkedin.com/posts/timo-dechau_its-embarrassing-it-took-my-basically-activity-6898190389551923200-CA7C)
13. [three-layer schema](https://www.linkedin.com/posts/timo-dechau_some-things-can-make-a-data-life-drastically-activity-6960675250573299712-qPVi)
14. [Lenny's Newsletter interview](https://www.lennysnewsletter.com/p/the-original-growth-hacker-sean-ellis)
15. [Breakout Growth](https://subclub.com/episode/8-principles-for-sustainable-growth-sean-ellis-ethan-garr-breakout-growth)
16. [First-order profitability](https://commonthreadco.com/blogs/bridges/unlock-first-order-profitability)
17. [diagnostic](https://commonthreadco.com/products/ecommerce-diagnostic)
18. [Goal conversions docs](https://plausible.io/docs/goal-conversions)
19. [Track events docs](https://docs.umami.is/docs/track-events)
20. [Metrics guide](https://www.convert.com/blog/a-b-testing/ab-testing-metrics-guide/)
21. [MDE guide](https://www.convert.com/blog/a-b-testing/minimum-detectable-effect-mde-ab-testing/)
22. [Sample-size tech note](https://signalvnoise.com/posts/3004-ab-testing-tech-note-determining-sample-size)
23. [Hacking Growth notes](https://grahammann.net/book-notes/hacking-growth-sean-ellis)
24. [DemandSpring](https://demandspring.com/glossary/self-reported-attribution/)
25. [RankWorks](https://rankworks.com/news/self-reported-attribution-using-survey-data-to-fill-attribution-gaps/)
26. [Dave Chaffey glossary](https://www.davechaffey.com/digital-marketing-glossary/website-macro-and-micro-conversions/)
27. [TU Delft](https://repository.tudelft.nl/record/uuid:31d2806f-2bf3-43c3-9e71-3985fd7368a6)
28. [Online Dialogue on CH2019](https://www.onlinedialogue.nl/en/blogs/sample-ratio-mismatch/)
29. [Umami developers](https://umami.is/product/developers)
30. [CXL case study](https://cxl.com/blog/optimizing-low-traffic-site-13-5-uplift-case-study/)
31. [LinkedIn mention](https://www.linkedin.com/in/xinyu-liang-8177b0250/)