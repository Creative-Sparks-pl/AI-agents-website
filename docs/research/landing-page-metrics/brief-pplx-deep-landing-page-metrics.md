# Research - Metrics a Small Lead-Magnet and Digital-Product Marketing Site Should Define (Expert Deep-Dive)

## Research Persona

You are a senior conversion-optimization and web-analytics practitioner who also knows experimentation statistics. You have set up measurement for small marketing sites and info/digital-product businesses, and you are skeptical of metrics that look good on a dashboard but never change a decision. You work expert-first: find who actually knows, mine their published work, then turn it into concrete definitions a small team can adopt.

## Main Prompt

Find the 15–20 practitioners and researchers whose advice on web metrics, conversion measurement, low-traffic experimentation, lead-generation funnels and tracking plans is most respected today. Mine their books, long-form posts, talks, courses and papers. Then answer, for a site like ours (described below), **which metrics we should define, how to structure them, and how to make decisions with them at low traffic** — with concrete definitions (numerator, denominator, unit), thresholds with numbers where experts give them, and what to avoid. Where experts disagree, show both sides and say which fits a site like ours better and why.

## Our context (what we already know — do not re-research this)

**The site.** A marketing site (agents.creativesparks.pl) for AI "skills" — packaged instructions that run inside AI coding tools (Claude Code, Codex, Cursor). Two offers:
- **Paid:** "UX Design Skill", a digital product sold in three plans (Solo, Studio, Agency) through a hosted checkout (Easytools). One landing page per language plus how-to, knowledge-base and changelog subpages.
- **Free lead magnets:** a "Homepage UX Audit Skill" and a "Website Planning Skill", each given in exchange for an email (download link shown on the page and emailed). Each free page has a form at the top and one at the bottom. The paid page also offers both free skills.
- Six landing pages in total: each of the three in Polish and English.

**Traffic and volume.** Low. In the last 14 days the six landing pages had ~360 views, almost all on two days: a Meta (Facebook/Instagram) prospecting campaign in the US and EU, and one email to the Polish list. On the English pages 76–87% of visitors were on phones, mostly inside the Instagram/Facebook in-app browser. Signups run single digits to ~15 per page per day while ads run; purchases are rare (none since purchase tracking started). Expect to stay in this range for months.

**Stack and constraints.**
- **Umami** (self-hosted, cookieless) counts every visitor and every custom event; it is the only source of counts.
- **PostHog** (EU) runs session recordings, heatmaps and AI notes on recordings — only after statistics consent, so it sees roughly 30% of views. Used as evidence, never for counts.
- **Meta Pixel + Conversions API**, only after marketing consent.
- EU/GDPR: events carry labels only (skill, language, which form, page), never emails or anything typed. Purchases are sent server-side from the checkout webhook, so a purchase cannot be tied to a visitor, ad or free signup — by design.

**Current metric definitions.**
- **Free funnel:** landing-page views → form starts → signups, with form-start rate (starts per view), form-completion rate (signups per start) and signup rate (signups per view).
- **Paid funnel:** landing-page views → checkout clicks → purchases, with checkout-click rate, purchases per click, purchase rate per view, and revenue per currency.
- **Context:** visitors, traffic mix, device mix, cross-sell clicks (free page → paid page), free-to-paid visits in one session, and the share of views recorded.

**Decision rules today.** Always show raw counts and denominators. Under 30 conversions in either window means "directional only". Compare the last 14 days with the 14 before. One site change at a time, logged with a hypothesis, one primary and one guardrail metric, and an end date 14–28 days after shipping.

**Being added now.** "Form seen" (half the form on screen), failed submits with a reason, hero video clicks, top-bar link clicks, sample-output clicks. Form starts will count only when the visitor is in that field: autofill in in-app browsers was filling both email fields on a page and doubling the count.

**Known gaps.** Nothing tells us what happens after the download (installed? used? valuable?) or whether free users later buy. Ad blockers undercount browser events, while server-side purchases are not blocked. The owner's own visits cannot be filtered out.

**Prior research.** An earlier study covered AI-agent analytics tooling (connectors, AI analysts, recording summaries) and the insight → change → measured-result loop. Do not repeat tool comparisons or that loop.

## Instructions

(1) Identify the top 15–20 most respected experts across these fields: web analytics and metric design, conversion-rate optimization, online experimentation and its statistics (especially at low traffic), lead-generation and info-product/digital-product funnels, product activation, paid-social measurement, and tracking-plan design. Candidates to check — keep only those whose published work actually addresses our questions, and add others you find:
- Ronny Kohavi (*Trustworthy Online Controlled Experiments*); Georgi Georgiev (Analytics-Toolkit, *Statistical Methods in Online A/B Testing*); Evan Miller; Lukas Vermeer
- Avinash Kaushik; Peep Laja and CXL; Ben Labay and Speero; Craig Sullivan; André Morys
- Simo Ahava; Timo Dechau; Krista Seiden
- Brian Balfour and Reforge, Sean Ellis, Lenny Rachitsky (activation, north-star metrics)
- Paid-social practitioners who publish on measurement (e.g. Common Thread Collective, Andrew Foxwell)
- Privacy-first analytics makers who write on metric choice (Plausible, Fathom, Umami)

(2) For each expert, research their published materials — books, blogs, talks, podcasts, courses, papers — for what they say on the questions below.

(3) Research these subtopics in depth. For each, give expert consensus, disagreements, concrete definitions (numerator, denominator, unit, window) and numbers where they exist:

- **Metric hierarchy for a site like ours.** One main goal metric vs several; how to tie a free lead magnet and a paid product into one structure; funnel metrics, intermediate steps, guardrail metrics, context metrics. Is "signups per view" the right primary for a lead-magnet page? Revenue per visitor? Leads that later buy?
- **After the signup — activation and free-to-paid without personal tracking.** How experts measure whether a downloaded free product gets installed and used, and whether free users buy later. Which methods respect a no-personal-data setup: aggregate download counts per unique link, email engagement in the email platform, coupon or tagged checkout links in follow-up emails, surveys, self-reported attribution ("how did you hear about us"), cohort comparisons. What a small team should actually do.
- **Decision rules at low traffic.** Is "30 conversions per window, 14–28 days" sound? What experts recommend instead: minimum detectable effect and pre-test power checks, Bayesian or sequential approaches, pooling windows, before/after with guardrails, qualitative evidence, when not to test at all. Concrete thresholds and how to report uncertainty to a non-statistician owner.
- **Intermediate steps — predictive vs vanity.** Which on-page signals (form seen, scroll depth, video plays, time on page, clicks on proof or samples, rage clicks) have shown a link to conversion, and which are vanity. How to define "form seen" and form-abandonment metrics well. Per-view vs per-visitor units.
- **Paid-social traffic.** Metrics per ad set and per ad (cost per signup, signup quality, landing-page signup rate by ad); separating ad performance from landing-page performance; in-app browser effects; reconciling Meta's numbers with the site's own; UTM conventions; minimum spend/volume before judging an ad.
- **Data-quality checks for event tracking.** Routine checks that catch broken or doubled events (like our autofill doubles): ratio checks, impossible-value alerts, before/after-release comparisons, synthetic test events, reconciling two tools.
- **Event naming and the tracking plan.** Naming conventions, labels/properties, where the plan lives, how a small team keeps it current; how to add tracking with minimal code (e.g. attribute-based tracking).

(4) Beyond the subtopics above, mine the experts' work for unique framings, idiosyncratic frameworks, contrarian asides, evolution of views over time, and cross-domain transfers. Surface findings outside the prescribed list visibly — not buried in a catch-all. The expert-first method earns its keep by surfacing what we didn't think to ask.

(5) Synthesize into a practical guide ending in a recommended metric set for this site.

## Scope

Foundations from any period; prioritize 2022–2026 practice. Global, English-language sources; the EU/GDPR angle matters. Domain: web analytics, CRO, experimentation, lead generation, digital/info products and small SaaS where it transfers. Exclude: enterprise BI and large-scale product analytics unless the practice transfers to low traffic; GA4 or ad-platform setup tutorials; analytics tool comparisons; B2B sales-pipeline attribution with CRMs and sales teams.

## Depth

Minimum 4,000 words. Minimum 20 sources. Comprehensive and framework-based, with tables where they help: definitions, thresholds, expert positions.

## Source priorities

Prefer books, peer-reviewed or methodological papers, conference talks and long-form practitioner writing by the named experts over vendor listicles. Label vendor-sourced claims [VENDOR: company name]. Every factual claim needs a source; mark unsourced claims [UNVERIFIED].

## Confidence

Rate each major recommendation HIGH (multiple independent expert sources agree), MEDIUM (limited but credible), LOW (single source or anecdotal) or SPECULATIVE (reasonable inference, no direct source).

## Quality guardrails

Present multiple perspectives. Quantify over adjectives. Flag thin evidence. Distinguish fact from consensus from speculation. When experts disagree, present both sides and judge which fits a low-traffic, privacy-first site.

## Anti-hallucination

If you lack reliable information on a point, say so explicitly rather than generating plausible-sounding content. Do not invent source names, URLs, statistics or expert quotes. Verify each expert's actual published position before attributing it.

## Required Output Structure

- ## Executive Summary — the 10 most important recommendations for this site
- ## The Experts and Their Positions — table: expert, field, key work, stance on our questions
- ## 1. Metric Hierarchy for a Lead-Magnet and Digital-Product Site
- ## 2. After the Signup: Activation and Free-to-Paid Without Personal Tracking
- ## 3. Decision Rules at Low Traffic
- ## 4. Intermediate Steps: Predictive vs Vanity
- ## 5. Paid-Social Traffic Metrics
- ## 6. Data-Quality Checks for Event Tracking
- ## 7. Event Naming and the Tracking Plan
- ## 8. Recommended Metric Set for This Site — table: metric, definition (numerator / denominator / unit / window), role (primary, funnel step, guardrail, context, data quality), the decision it informs, confidence
- ## Disagreements and Open Questions
- ## Orphan Topics — required section. Findings outside the prescribed subtopics, each under its own H3. A first-class section, not a salvage bin.

## Suggested follow-ups

1. For a lead-magnet page getting 50–150 visitors a day from paid social, what primary metric and decision rule do the experimentation experts recommend, with the numbers they use?
2. How do small digital-product businesses measure whether a free download gets used and leads to a purchase, without tracking individuals?
3. Which on-page engagement signals have published evidence linking them to conversion, and which have been shown to mislead?
4. What routine data-quality checks do analytics practitioners run to catch broken or duplicated events after a release?
5. How do paid-social practitioners separate ad-creative performance from landing-page performance when volumes are small?

Save your report as: `brief-pplx-deep-landing-page-metrics.md`
