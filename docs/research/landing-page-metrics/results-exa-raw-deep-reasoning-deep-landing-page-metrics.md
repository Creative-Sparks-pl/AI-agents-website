---
provider: "exa"
model: "exa/deep-reasoning"
brief: "brief-pplx-deep-landing-page-metrics.md"
duration_ms: 90511
cost_usd: 0.015
truncated: False
citation_scheme: "unified"
---

# Research Results: brief-pplx-deep-landing-page-metrics

**Provider:** exa (exa/deep-reasoning)

---

Executive Summary — the 10 most important recommendations for this site

1. Make qualified free signup the primary optimization metric on free pages, but define it as a signup from a form-qualified landing-page view, not simply an Umami event. Keep raw views, form-seen events, starts, failures and signups beside the rate.
2. Make paid purchase and contribution margin the business outcome, but do not use purchases as the short-term optimization metric while purchases are near zero. Use checkout clicks and qualified signup rate as leading indicators, explicitly labeled as proxies.
3. Do not treat “30 conversions” as a universal validity threshold. With this traffic, fixed-horizon A/B tests will usually be underpowered. Calculate an MDE first; if the detectable effect is commercially uninteresting, do not run a randomized test. [[1, 2, 3]]
4. Use a 14-day reporting window for operational diagnosis, but pool several predeclared windows for decisions. A 14-day before/after comparison is descriptive, not causal, when traffic mix changes sharply.
5. Define activation around value received: for a free skill, download is setup, installation is an aha candidate, and a self-reported or instrumented first successful run is the strongest activation candidate. A click, login or download alone is not activation. [[4, 5]]
6. Preserve the no-personal-tracking design. Add aggregate download counters, email-platform aggregate delivery/click data, tagged follow-up links, optional surveys and aggregate coupon-code redemption rather than joining email, visitor and purchase identities.
7. Separate ad diagnosis from page diagnosis. At ad level report spend, impressions, CPM, outbound clicks, CPC, landing-page views and site-recorded signups; at page level report qualified signups per landing-page view, form-start completion and failures. Never judge an ad only by Meta-reported conversions.
8. Treat form seen, meaningful field focus, submit failure, sample-output click and checkout click as diagnostic funnel steps. Treat scroll, time, video play and rage-click counts as context unless they predict a downstream action in this site’s own data.
9. Establish a small tracking contract: event name, exact trigger, required labels, consent condition, expected cardinality, owner and QA test. Use stable object-action names and one canonical spelling. [[6, 7, 8, 9, 10]]
10. Put a weekly data-quality review ahead of dashboard interpretation: duplicate-rate checks, impossible ratios, release comparisons, synthetic tests, server/client reconciliation and Meta-versus-Umami variance. A broken event is not a weak funnel.

The Experts and Their Positions

| Expert | Field | Key work | Stance on our questions |
| Ronny Kohavi | experimentation | Trustworthy Online Controlled Experiments; online experimentation writing | Randomized tests need power, guardrails and trustworthy implementation; maximize power and interpret nonsignificant results through MDE rather than wishful certainty. [[3]] |
| Georgi Georgiev | experimentation statistics | Analytics-Toolkit; Statistical Methods in Online A/B Testing | Small samples make conventional testing impractical; calculate sample size/MDE and avoid stopping or segmenting opportunistically. [[1]] |
| Evan Miller | experimentation statistics | The Low Base Rate Problem; sample-size tools | A negative result is uninterpretable without prospective power; decide the effect worth detecting before the experiment. [[2]] |
| Lukas Vermeer | experimentation | experimentation practice and feature-testing writing | Use disciplined hypothesis, randomization, exposure and decision criteria; do not confuse activity with evidence. [UNVERIFIED: this search did not retrieve a directly citable primary passage.] |
| Avinash Kaushik | web analytics | Occam’s Razor; Web Analytics 2.0 | Do not obsess over one conversion rate; connect outcomes to business value and use a balanced set of macro and micro measures. [[11]] |
| Peep Laja / CXL | CRO and lead generation | CXL lead-generation research and courses | Value proposition and form design matter; test meaningful changes, but examples of large lifts are not portable benchmarks. [[12]] |
| Ben Labay / Speero | CRO and experimentation | Research and experimentation practice | Research quality, prioritization and experiment validity matter more than a high-volume list of superficial tests. [UNVERIFIED: no directly retrieved primary result in this search.] |
| Craig Sullivan | CRO | experimentation and QA practice | Instrumentation, QA and learning discipline are prerequisites to trustworthy CRO. [UNVERIFIED: specific primary source not retrieved.] |
| André Morys | conversion optimization | behavioral conversion work | Improve the customer decision process and value communication, rather than optimizing isolated clicks. [UNVERIFIED: specific primary source not retrieved.] |
| Simo Ahava | measurement engineering and privacy | From Project To Process; server-side tagging critique | Begin with measurement requirements and key-value data-layer definitions; server-side collection does not remove privacy or transparency obligations. [[13, 6]] |
| Timo Dechau | analytics engineering | implementation and measurement writing | Favor maintainable, inspectable instrumentation and explicit data contracts. [UNVERIFIED: specific source not retrieved.] |
| Krista Seiden | analytics | analytics measurement practice | Measurement plans should begin with business questions, canonical definitions and QA. [UNVERIFIED: specific primary source not retrieved.] |
| Brian Balfour / Reforge | activation | activation and habit frameworks | Activation is progression from setup to aha to habit; the meaningful event is value delivery, not merely signup or login. [[4]] |
| Elena Verna | activation | activation framework writing | Setup, aha and habit must be separated; a quantitative aha should indicate received value and habit should reflect the product’s real frequency. [[5]] |
| Sean Ellis | growth | growth and activation practice | Find the value moment and use retention/activation evidence rather than acquisition volume alone. [UNVERIFIED: specific source not retrieved.] |
| Lenny Rachitsky | product growth | product-growth interviews and writing | Activation and retention should be tied to the product’s core value and cohort behavior. [UNVERIFIED: specific source not retrieved.] |
| Andrew Foxwell | paid social | paid-social measurement practice | Do not rely only on Meta’s reported conversions; inspect the broader conversion story and attribution settings. [[14]] |
| Common Thread Collective | paid social | direct-response measurement practice | Evaluate spend against business outcomes and creative/audience/landing-page interaction, not platform metrics in isolation. [UNVERIFIED: specific source not retrieved.] |
| Avo / Thora Gudfinnsdottir | tracking plans | tracking-plan office hours and naming guidance | Start with why, avoid unused events, describe exact trigger timing and maintain consistent names. [[7, 9, 10]] |

1. Metric Hierarchy for a Lead-Magnet and Digital-Product Site

Use a hierarchy rather than one universal KPI.

Level 1: business outcomes. Purchases, gross revenue and contribution margin are the actual paid outcomes. Define purchase rate per landing-page view as completed purchases attributed to the selected page cohort divided by landing-page views in that cohort, reported per 100 views and by plan/currency. Because the webhook purchase is intentionally unjoinable to browser activity, this is a site-wide or campaign-period outcome, not visitor-level attribution.

Level 2: primary operating outcomes. For each free landing page, qualified signup rate = valid signups ÷ qualified landing-page views × 100. A qualified view is an Umami landing-page view that passed the normal page-load validation and is not a synthetic QA hit. For a paid page, use completed purchase rate where volume supports it; otherwise use checkout-click rate and qualified free-signup rate as leading indicators, never label them purchases.

Level 3: funnel steps. Form-seen rate = visitors with form_seen ÷ landing-page visitors. Form-start rate = meaningful form starts ÷ form-seen visitors. Form completion = valid signups ÷ meaningful starts. Signup rate = valid signups ÷ landing-page visitors. The form-start event should fire on first meaningful focus or keystroke in the form, once per form instance, not on autofill mutation. The current correction is essential because automatic field population doubled starts.

Level 4: guardrails. Failed submits per start, invalid-email rate, duplicate-submit rate, page error rate, checkout error rate, refund/cancellation rate, and any material decline in page load or consent compliance. A change that increases signups while increasing invalid or failed submissions is not automatically a win.

Level 5: context. Device, browser/in-app browser, language, country/region, campaign, ad set, ad/creative, source, consent state and date. Context explains heterogeneity; it should not become a fishing expedition of tiny segments.

Revenue per visitor is useful as a long-horizon business metric, but with zero or very few purchases it is extremely noisy. Avinash Kaushik’s warning against obsessing over conversion rate supports a balanced hierarchy rather than replacing conversion rate with another unstable number. [[11]]

2. After the Signup: Activation and Free-to-Paid Without Personal Tracking

The product-activation distinction is directly transferable. Setup is submitting the form and receiving the download. A plausible aha is downloading and installing the skill; the stronger aha is completing the first useful audit or planning run. Habit may be inappropriate if the skill is used episodically, so do not force a weekly-active definition. Instead define “value received” as a completed first run, self-reported success, or a repeat/useful-output signal if technically available. Reforge-derived activation guidance specifically warns that a login, view or setup action is not proof of value. [[4, 5]]

Recommended privacy-preserving measurement:

• Generate separate aggregate download links by skill, language and email sequence, with no email or visitor identifier. Count link requests and, where possible, unique-link recipients only as approximate counts; link-level uniqueness is not person-level uniqueness.
• Use email-platform aggregate delivery, open and click rates. Treat opens cautiously because privacy features distort them; clicks and unsubscribe/spam rates are more actionable.
• Put campaign-specific, non-personal checkout links or coupon codes in follow-up emails. Report aggregate redemptions by code. Do not claim individual free-to-paid conversion unless the user voluntarily supplies a code or survey answer.
• Ask a one-question optional survey after the download or after a reasonable delay: “Did you install it?” and later “Did it produce a useful result?” Report response counts and response rate, not just percentages.
• Add an optional checkout question, “How did you hear about us?” with coarse choices. This is self-reported attribution, not deterministic attribution.
• Compare signup cohorts by landing page, language, campaign and month on aggregate purchase or coupon redemption. Suppress or label cells with very small counts.

The recommended activation dashboard is: signups, download-link requests, email clicks, survey-reported installation, survey-reported useful first run, aggregate coupon redemptions and purchases. It should explicitly say that these are cohort-level indicators and cannot connect a particular free user to a particular buyer.

3. Decision Rules at Low Traffic

The present “under 30 conversions = directional only” rule is a useful caution flag but not a statistical principle. Thirty conversions may be enough for a very large effect in a clean comparison and nowhere near enough for a modest one. Georgiev notes that conventional 95% significance and 80% power for a 5–10% effect at a 2–5% baseline can require roughly 50,000–500,000 users; smaller effects require vastly more. [[1]] Miller similarly says the effect worth detecting must be selected before the test, and that low base rates make apparent negatives unreliable. [[2]]

Use this procedure:

1. Define the smallest commercially meaningful effect. Example: “We would ship a page change only if it plausibly raises qualified signup rate from 5% to 7.5% or better, without increasing failed submits.”
2. Compute prospective sample size or, more realistically here, reverse-compute MDE from the traffic that can actually arrive. Kohavi describes using historical n and an approximate MDE, with a two-week or sometimes four-week run, while acknowledging that small sites detect only large effects. [[3]]
3. If the MDE is larger than the effect worth acting on, do not call the exercise an A/B test. Run a qualitative or obvious-value change, or accumulate traffic.
4. Predeclare one primary metric, one guardrail, the exposure unit, minimum run duration, stopping date and action rule.
5. Do not repeatedly peek and stop when a rate looks favorable. If sequential or Bayesian methods are used, specify the method and stopping rule in advance; a label alone does not cure optional stopping.
6. When randomization is impossible, use a controlled before/after or alternating-period comparison only as directional evidence. Annotate traffic mix, device and campaign changes.

For this site, “14 days versus prior 14 days” is good reporting hygiene, not causal proof. Pool 4–8 weeks when practical, compare like with like, and use qualitative recordings or user feedback to choose high-confidence changes. Report: observed rate, numerator/denominator, interval or posterior range, MDE, traffic mix and decision. To a non-statistician: “The change produced 9 versus 7 signups, but the data can still be consistent with no improvement; we will not claim a winner.”

4. Intermediate Steps: Predictive vs Vanity

Form seen is useful because it distinguishes page exposure from opportunity to act, but it is only predictive if form_seen users convert more often than non-seen users across multiple periods and segments. Define it as at least 50% of the form container intersecting the viewport for a minimum dwell time, or a robust equivalent. Count once per form, and keep form position (top/bottom) as a label. A simple intersection observer can implement this, but the exact threshold must remain stable.

Meaningful form start is stronger than form seen: first focus or deliberate keystroke in any form field, once per form instance. Record autofill separately if useful, but do not count it as a human start. Failed submit with a controlled reason is highly actionable: validation failure, network failure, server rejection, duplicate submission or unknown. Rate it as failed submits ÷ starts and also report failure reason ÷ failed submits.

Sample-output clicks, proof clicks, top-bar clicks, hero-video starts and checkout clicks are intent signals. Their value is highest when they lead to signups or checkout clicks at a materially higher rate than comparable non-clickers. Do not infer causality: interested people self-select into clicking.

Scroll depth, time on page, raw video plays and rage clicks are context metrics. They can identify friction or content consumption, but published practitioner evidence does not establish a portable threshold that predicts this site’s purchase. Treat any threshold as LOW confidence until validated locally. A form-analysis example illustrates why denominators matter: it distinguishes form-view-to-conversion, form-start rate and form conversion rather than collapsing them. [[15]]

Use per-visitor denominators for funnel rates when the question is “what share of people did this?” Use per-event denominators for operational reliability, such as failed submits per start. Avoid mixing page views and unique visitors in one rate.

5. Paid-Social Traffic Metrics

For every campaign, ad set and ad, keep the same naming dimensions in UTMs: source, medium, campaign, ad set and creative. Use stable values such as source=meta, medium=paid_social, campaign=..., adset=..., creative=.... The exact taxonomy matters less than consistency. UTMs are especially important in in-app browsers because referrer information may be missing or obscured; URL parameters travel with the click. [[16]]

Ad-level table: spend, impressions, reach, frequency, CPM, outbound link clicks, outbound CTR, CPC, landing-page views, Umami landing-page views, valid signups, cost per valid signup, checkout clicks and cost per checkout click. Add signup quality proxies: download-link clicks, survey installation and aggregate coupon redemption when volume permits.

Page-level table: landing-page views by campaign dimensions, form_seen rate, meaningful start rate, completion rate, signup rate, submit failures and device/browser mix. This lets you say “creative generated cheap traffic but the page converted poorly” rather than blaming the ad.

Meta and Umami are expected to disagree. Meta can count modeled or attributed conversions under its chosen click/view window, while Umami counts site events subject to blockers, consent and implementation. Use Meta for delivery and spend, Umami for site outcomes, and document the attribution window. Do not use Meta conversion volume to overwrite the canonical site count. Foxwell-related guidance specifically warns against measuring only inside Meta. [[14]]

For this site, break out in-app browser versus external browser and phone versus desktop. Do not judge an ad with a few clicks. Set a predeclared minimum such as 100 landing-page views or 10 valid signups for a directional creative read, but label this operational, not universal statistical evidence. Below that, use delivery and technical diagnostics, not winner/loser language.

6. Data-Quality Checks for Event Tracking

Run these after every release and weekly:

• Count integrity: signups ≤ meaningful starts ≤ form_seen visitors ≤ landing-page visitors, allowing for carefully documented cross-page or repeat-session exceptions.
• Duplicate checks: event count per visitor/session/form instance; alert when starts per view, signups per visitor or submits per start exceed plausible bounds.
• Reason completeness: every failed_submit has an allowed reason; unknown reasons are separately counted.
• Time series: compare event volume and ratios with the prior seven comparable days; flag sudden zeroes, spikes and step changes immediately after deployment.
• Synthetic tests: load each language/page/device class, focus the form, submit a controlled test, click checkout and verify exactly one expected event and correct labels. Keep synthetic traffic identifiable and excluded from business counts.
• Cross-system reconciliation: compare Umami page views with server logs or independent request counts where available; compare webhook purchases with the checkout provider; compare Meta clicks with tagged landing-page arrivals without expecting equality.
• Schema checks: event name, required labels, allowed values, consent gate and version are validated before release.
• Release annotation: every dashboard time series shows deployment dates and campaign changes.

Simo Ahava’s data-layer approach supports translating vague requirements into explicit key-value pairs, while Avo guidance emphasizes exact trigger descriptions and avoiding unused events. [[6, 7]] Server-side purchase events improve durability but do not eliminate the need to document processing and consent; moving collection server-side can reduce user-visible auditability. [[13]]

7. Event Naming and the Tracking Plan

Keep a one-page repository file with: business question, metric definition, event name, trigger, unit of counting, required properties, consent condition, source, owner, QA procedure, launch date and deprecation status. Start with questions and metrics, then add only the events needed to construct them. [[7]]

Recommended stable names:

page.viewed
form.seen
form.started
form.submit_failed
signup.completed
download.requested
sample_output.clicked
hero_video.clicked
topbar_link.clicked
checkout.clicked
purchase.completed

Use one casing and one tense. Object-action-context scales more cleanly than a growing collection of near-duplicates; event-taxonomy guidance contrasts these approaches and emphasizes explicit entities. [[8]] Avo’s naming guidance likewise stresses consistency in casing, format, tense and vocabulary, and its audit rules flag duplicate names and inconsistent casing. [[9, 10]]

Required properties should be low-cardinality labels only: skill, language, page_type, form_position, plan, currency, source, campaign, adset, creative, device_class, browser_class, consent_state and failure_reason. Never send email, typed text or free-form user input. For every event, specify whether it is once per page view, once per session, once per form instance or once per transaction.

Attribute-based tracking can reduce code: stable data attributes on links and forms declare event name and labels, while one delegated listener sends the event. Do not let this become invisible magic; the tracking plan remains canonical and synthetic tests must verify it.

8. Recommended Metric Set for This Site

| Metric | Definition (numerator / denominator / unit / window) | Role | Decision | Confidence |
| Qualified signup rate | valid signups / qualified landing-page visitors / % / campaign or reporting window | primary | change free-page offer, form or copy | HIGH |
| Paid purchase rate | completed purchases / relevant landing-page visitors / % / window | primary business outcome | assess paid page and offer when volume exists | HIGH |
| Revenue per landing-page visitor | webhook revenue / landing-page visitors / currency per visitor / window | primary business context | compare economic value, cautiously | MEDIUM |
| Form-seen rate | form_seen visitors / landing-page visitors / % / window | funnel step | determine visibility and placement | MEDIUM |
| Form-start rate | meaningful starts / form-seen visitors / % / window | funnel step | diagnose invitation/friction | HIGH |
| Form completion | valid signups / meaningful starts / % / window | funnel step | diagnose fields, validation and trust | HIGH |
| Failed-submit rate | failed submits / meaningful starts / % / window | guardrail/data quality | detect UX or implementation breakage | HIGH |
| Failure reason mix | failures by reason / all failures / % / window | diagnostic | prioritize fixes | HIGH |
| Checkout-click rate | checkout clicks / paid-page visitors / % / window | proxy funnel step | assess purchase intent and checkout handoff | HIGH |
| Purchases per checkout click | purchases / checkout clicks / % / window | downstream proxy | detect checkout friction, only directionally | MEDIUM |
| Download request rate | download requests / valid signups / % / cohort window | activation setup | detect delivery failure | MEDIUM |
| Email click rate | unique email clicks / delivered emails / % / cohort window | activation proxy | assess follow-up usefulness | MEDIUM |
| Installation survey rate | reported installs / survey respondents / % / cohort | activation | improve onboarding, with response bias caveat | LOW |
| Useful-run survey rate | reported useful runs / respondents / % / cohort | activation/aha | evaluate value delivery | LOW |
| Coupon redemption rate | redemptions / issued or delivered-code cohort / % / cohort window | free-to-paid proxy | assess aggregate monetization | MEDIUM |
| Cost per valid signup | ad spend / valid signups / currency per signup / campaign window | paid-social primary operating | allocate or pause traffic | HIGH |
| Landing-page signup rate by ad | valid signups / Umami landing-page visitors by ad / % / window | paid-social/page separation | distinguish creative from page | HIGH |
| Meta-to-Umami variance | (Meta attributed conversions − Umami signups) / Umami signups / % / window | context/data quality | investigate attribution or implementation | HIGH |
| Device/in-app-browser mix | visitors in segment / all visitors / % / window | context | interpret conversion differences and QA | HIGH |
| Share recorded | PostHog-recorded views / Umami views / % / window | data context | understand qualitative evidence coverage | HIGH |
| Event duplication ratio | duplicate events / total events / % / release window | data quality | block decisions until fixed | HIGH |
| Event hierarchy violation | invalid downstream-order events / relevant events / % / window | data quality | detect broken triggers | HIGH |

Disagreements and Open Questions

One disagreement is rate-centric CRO versus business-value measurement. A page can have a higher signup rate but lower revenue if it attracts low-intent people. For this site, use signup rate as the free-page operating primary because purchases are too rare, while retaining revenue and purchases as the north-star outcome. This is a staged hierarchy, not a claim that leads are equivalent to customers.

A second disagreement is classical fixed-horizon testing versus Bayesian or sequential methods. Classical power/MDE guidance is easier to explain and safer for a small team. Bayesian or sequential approaches can be useful, but only with a predeclared model and decision threshold. They do not manufacture information from tiny samples. The practical choice here is structured iteration plus MDE-aware interpretation, not repeated underpowered A/B tests.

A third disagreement concerns engagement events. Product-analytics frameworks favor a measurable aha and habit, while CRO dashboards often promote scroll, time and video engagement. The activation position fits better: measure the first successful use of the skill, not consumption of the landing page. [[4, 5]]

Open questions that cannot be answered from current data are: what exact user behavior constitutes a successful skill run; whether email clicks predict installation; whether form_seen predicts signup after controlling for device and page position; and whether any ad produces higher-quality free users. These require aggregate instrumentation or voluntary survey evidence, not speculative thresholds.

Orphan Topics

Privacy and observability trade-off

The no-personal-data design is a strength, but it creates an attribution ceiling. Server-side purchases can be reliable counts while remaining deliberately unjoinable to ads or signups. Document this as a feature and report aggregate cohort evidence rather than attempting probabilistic identity stitching. Simo Ahava’s server-side critique is relevant: server processing does not remove EU privacy obligations or the need for transparent data flows. [[13]]

Metric governance as a product

The tracking plan should have a changelog just like the site’s product has a changelog. When a trigger changes, preserve the old definition, date the break and avoid comparing pre-change and post-change rates as if they were identical. A metric is an interface contract, not merely a chart label. [[6, 7]]

Evidence threshold for qualitative recordings

PostHog recordings cover only consented traffic and therefore cannot estimate counts. They are useful for discovering failure modes, confusing copy and in-app-browser problems. Treat repeated observations as hypothesis generation; validate prevalence in Umami or server counts. This respects the stated “evidence, never counts” rule.

What to avoid

Avoid dashboard totals without denominators; rates mixing page views and visitors; counting autofill as intent; treating a download as activation; interpreting Meta attribution as canonical; declaring winners from a handful of purchases; endlessly slicing by language/device/ad; portable conversion benchmarks; and adding events without a decision they can change. The published form-analysis example itself shows why separate denominators are necessary, while the low-sample experimentation literature shows why apparent lifts can be unstable. [[1, 2, 15]]

Bottom line

For the next several months, define qualified signup rate as the primary free-page metric, checkout-click rate as the paid-page leading metric, purchases/revenue as the business outcome, and failed submits plus event-integrity ratios as guardrails. Add aggregate post-download activation and coupon-cohort measurement. Use 14-day windows for monitoring, pooled periods for decisions, and MDE-aware language instead of a universal 30-conversion rule. This is the highest-confidence measurement structure compatible with low traffic, consent loss, cookieless analytics and intentional non-linkability.

Sources

[[1]] Georgi Georgiev, “A/B Testing with a Small Sample Size,” Analytics-Toolkit.
[[2]] Evan Miller, “The Low Base Rate Problem.”
[[3]] Ronny Kohavi, “Using the statistical power formula in reverse…”
[[12]] Peep Laja, “A Ridiculously Effective Technique for Online Lead Generation,” CXL.
[[11]] Avinash Kaushik, “Stop Obsessing About Conversion Rate.”
[[15]] Malvi Modi, “Lead Generation Form Analysis – Part II,” Tatvic.
[[13]] Simo Ahava, “Agency, Transparency, And Control: Unsolved Problems With Server-side Tagging.”
[[6]] Simo Ahava, “From Project To Process.”
[[7]] Thora Gudfinnsdottir/Avo, “Tracking Plan Office Hours.”
[[4]] Brian Balfour, “How to improve user activation by establishing the right product habits.”
[[5]] Elena Verna, “I bet you are doing product activation all wrong.”
[[8]] Murat Ova, “Event Taxonomy Design as Data Engineering.”
[[9]] Avo, “Naming conventions.”
[[10]] Avo, “Tracking plan audit rules.”
[[16]] Alex Savich, “Facebook UTM Builder — Why Facebook Traffic Appears Incorrectly…”
[[14]] “7 outdated Meta Ads tactics that don’t work in 2024,” discussing Andrew Foxwell’s measurement guidance.

The requested filename is brief-pplx-deep-landing-page-metrics.md; this report is formatted so it can be saved under that name.

---

## Sources

*The report's inline `[[n]]` markers index this list — not any numbered source inventory inside the report body. It lists each distinct link the provider returned or the report linked, cited or not; a marker numbered past its end had no source.*

1. [A/B Testing with a Small Sample Size | Analytics-Toolkit.com](https://blog.analytics-toolkit.com/2019/a-b-testing-with-a-small-sample-size/)
2. [The Low Base Rate Problem – Evan Miller](https://www.evanmiller.org/the-low-base-rate-problem.html)
3. [Using the statistical power formula in reverse makes more sense in A/B test settings, that is, in online settings, where you can maximally power experiments. | Ron Kohavi](https://www.linkedin.com/posts/ronnyk_using-the-statistical-power-formula-in-reverse-activity-7027144092459438080-2FTy)
4. [How to improve user activation by establishing the right product habits | Brian Balfour](https://www.churn.fm/episode/product-habits-retention)
5. [I bet you are doing product activation all wrong.](https://www.elenaverna.com/p/hey-b2b-i-bet-you-are-measuring-activation)
6. [From Project To Process | Simo Ahava's blog](https://www.simoahava.com/analytics/from-project-to-process/)
7. [Tracking Plan Office Hours with Avo's Thora Gudfinnsdottir | Amplitude](https://amplitude.com/community/tracking-plan-thora-gudfinnsdottir)
8. [Event Taxonomy Design as Data Engineering | Product Philosophy](https://productphilosophy.com/articles/event-taxonomy-design-data-engineering)
9. [Naming conventions - Avo Docs](https://www.avo.app/docs/data-design/best-practices/naming-conventions)
10. [Avo tracking plan audit rules - Avo Docs](https://www.avo.app/docs/audit/rules)
11. [Stop Obsessing About Conversion Rate - Occam's Razor by Avinash Kaushik](https://www.kaushik.net/avinash/stop-obsessing-about-conversion-rate/)
12. [A Ridiculously Effective Technique for Online Lead Generation](https://cxl.com/blog/ridiculously-effective-technique-for-online-lead-generation/)
13. [Agency, Transparency, And Control: Unsolved Problems With Server-side Tagging | Simo Ahava's blog](https://www.simoahava.com/analytics/agency-transparency-control-unsolved-problems-server-side-tagging/)
14. [7 outdated Meta Ads tactics that don't work in 2024](https://www.mkedmc.org/news/7-things-that-dont-work-on-meta-ads-in-2024)
15. [Lead Generation Form Analysis - Part II](https://www.tatvic.com/blog/lead-gen-form-analysis-part-2/)
16. [Facebook UTM Builder — Free Tool for Meta Ads + GA4 Setup](https://www.elsop.com/facebook-utm-builder-meta-ads-ga4/)