# Research - Open-Source Cookie Consent Tools to Replace Cookiebot on a Small EU Website (Funnel Chain)

## Research Persona

You are a senior web privacy engineer with expertise in EU consent law (GDPR, ePrivacy) and front-end implementation of consent management on static websites. You advise small businesses pragmatically: compliance that holds up in front of a regulator, at no recurring cost, with minimal maintenance.

## Goal

Find the best open-source or self-hostable cookie consent solution to replace Cookiebot on a small Polish business website, so consent stays compliant while costs no longer grow with the number of pages. Work in three phases: map every maintained candidate, deep-dive the strongest few, then recommend one.

## Context (what we already know)

- Site: agents.creativesparks.pl — an Astro 6 static site with a few server routes, hosted on Vercel, in Polish and English, ~15 real pages plus static example HTML files; the owner is a sole trader in Poland selling digital products to EU and US customers.
- Current consent tool: Cookiebot (Usercentrics) in auto-blocking mode. Scripts are tagged `type="text/plain"` with a consent category and activated after consent. A footer link reopens the consent banner. Cookiebot is priced by the number of subpages its crawler finds, which is the reason for leaving.
- Scripts that need consent: Meta Pixel plus Meta Conversions API calls (marketing category) and PostHog Cloud EU session recordings and heatmaps (statistics category). A self-hosted Umami runs without cookies and without consent. Checkout happens on a third-party domain (Easytools).
- Conversion events (Meta Lead) are sent only when marketing consent is present, so the tool must expose the consent state to page JavaScript and fire an event when consent is given or changed.
- No Google Analytics or Google Ads today; Google Consent Mode v2 support is a nice-to-have for the future, not a requirement.
- The owner is not a privacy expert and needs a clear recommendation.

## Scope

- Open-source (OSI-approved licence) or free self-hostable consent tools usable on a static website. Include JavaScript libraries, self-hosted consent platforms, and open-source CMPs with optional paid hosting.
- EU law and guidance: GDPR, the ePrivacy Directive, EDPB guidelines on consent, and guidance from national regulators (Poland's UODO, France's CNIL, Germany's DSK, and others where relevant), 2022 onward.
- Time: tools active in 2025–2026.
- Exclude: paid-only SaaS CMPs (Cookiebot, OneTrust, Usercentrics, CookieYes paid tiers, etc.) except as a reference point for what the open-source options lack; WordPress-only plugins; IAB TCF publisher setups for ad networks; mobile-app consent SDKs.

## Depth

- Phase 1: 1,500+ words, covering every maintained candidate you can find.
- Phase 2: 2,000+ words across the shortlist deep-dives.
- Phase 3: 1,500+ words.
- At least 20 distinct sources in total, including primary sources (project repositories, release notes, documentation, regulator guidance).

## Citations

Every factual claim must have a source. Mark unsourced claims [UNVERIFIED]. Label claims that come from a tool's own marketing or a vendor's comparison page as [VENDOR: name]. Prioritise: primary project sources (GitHub/GitLab repositories, release history, issue trackers, documentation, npm download data), regulator and EDPB texts, then independent technical write-ups and audits. Treat "best cookie consent tools" listicles and affiliate comparison pages as low-quality evidence.

## Quality Guardrails

Present multiple perspectives. Quantify over adjective (release dates, open issues, maintainers, bundle size). Flag thin evidence. Distinguish fact from consensus from speculation. Do not treat GitHub stars as proof of quality; weigh recent maintenance and responsiveness to security issues more heavily.

## Confidence Calibration

Rate each major claim HIGH (multiple independent sources), MEDIUM (limited but credible sources), LOW (single source or anecdotal), or SPECULATIVE (reasonable inference without direct evidence).

## Anti-hallucination

If you lack reliable information on a point, say so explicitly rather than generating plausible-sounding content. Do not invent tool names, version numbers, source names or URLs. Do not claim a tool is "GDPR-certified" — no such certification exists for software; describe what the tool actually does.

## Phase 1: Landscape scan

Find every maintained open-source or self-hostable cookie consent solution from current sources (code hosts, package registries, privacy and web-development communities, regulator-adjacent resources). Do not start from a fixed list — search broadly, including newer and less-known projects.

For each candidate record: licence; hosting model (client-side library / self-hosted server / open-core with paid cloud); last release date and release frequency; number of active maintainers; how it blocks scripts before consent; languages available (Polish and English needed); whether it offers a JavaScript API and consent events; consent logging options; bundle size; notable users.

Then filter out candidates that are unmaintained (no release in 12+ months without explanation), lack prior blocking of scripts, or cannot be used on a static site without a specific CMS.

Beyond the prescribed criteria, mine sources for unique framings, idiosyncratic approaches (for example, consent handled without any banner, server-side consent, or first-party proxying), contrarian asides, evolution of views over time, and cross-domain transfers. Surface findings outside the prescribed list visibly, not buried in a catch-all.

**Phase 1 output:** a table of all candidates found and a ranked shortlist of the 3–5 strongest for this site, with the reason each made or missed the cut.

## Phase 2: Shortlist deep-dives

For each shortlisted tool:
- Compliance behaviour: equal-prominence "reject all" on the first layer, no pre-ticked boxes, granular categories, withdrawal as easy as giving consent, re-consent when the cookie list or purposes change, and consent expiry.
- Proof of consent: what a small business must be able to show a regulator (EDPB, UODO, CNIL guidance on records of consent), and whether the tool can store a consent ID with timestamp, version and choices client-side, server-side, or both.
- The cookie declaration: how to produce and maintain the list of cookies and purposes for the privacy policy without an automatic crawler like Cookiebot's.
- Script blocking: support for blocking scripts tagged in HTML, iframes and embeds, and code that must wait for consent (event or callback APIs).
- Security and maintenance: known vulnerabilities, supply-chain risk (self-hosting versus CDN), and the maintainers' response history.
- Accessibility (WCAG 2.1/2.2, keyboard and screen readers) and performance (bundle size, effect on Core Web Vitals).
- Polish and English text, and how translations are managed.
- Effort to implement on an Astro static site and to migrate from Cookiebot-style tagging.

## Phase 3: Recommendation

- One recommended tool for this site, with the reasons it beats the others, and what the owner gives up compared with Cookiebot.
- The minimum compliance setup the owner must add around the tool (for example a consent log, a cookie declaration section, re-consent rules).
- A step-by-step migration outline from Cookiebot.
- Risks and what to monitor after switching.

## Required Output Structure

- ## Executive Summary
- ## Phase 1 — Landscape of Open-Source Consent Tools
  - ### Candidate Table
  - ### Shortlist and Exclusions
- ## Phase 2 — Shortlist Deep-Dives
- ## What EU Regulators Require of a Small Website
  - ### Banner Design and Withdrawal
  - ### Proof of Consent
  - ### Cookie Declaration
- ## Phase 3 — Recommendation and Migration Outline
- ## Orphan Topics
- ## Gaps and Open Questions

Orphan Topics is a required section: surface findings outside the prescribed subtopics there with their own H3 framings. Treat it as a first-class section, not a salvage bin.

## Preferred sources

EDPB guidelines on consent (05/2020) and the Cookie Banner Taskforce report (2023); UODO, CNIL and DSK guidance on cookies and consent records; the tools' own repositories, release notes and issue trackers; npm or jsDelivr download statistics; independent accessibility and privacy audits; noyb complaints about cookie banners.

## Anti-goals

- Do NOT return a generic "top 10 cookie banner plugins" list.
- Do NOT recommend paid SaaS consent platforms as the answer.
- Do NOT treat WordPress-only or Shopify-only plugins as candidates.
- Do NOT pad the comparison with tools that have been abandoned.

Save your report as: `brief-pplx-funnel-open-source-cookie-consent.md`
