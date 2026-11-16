---
provider: "exa"
model: "exa/deep-reasoning"
brief: "brief-pplx-funnel-open-source-cookie-consent.md"
duration_ms: 57095
cost_usd: 0.015
truncated: False
citation_scheme: "unified"
---

# Research Results: brief-pplx-funnel-open-source-cookie-consent

**Provider:** exa (exa/deep-reasoning)

---

# Research report: open-source cookie-consent replacement for agents.creativesparks.pl

Filename requested: `brief-pplx-funnel-open-source-cookie-consent.md`. I cannot write files directly in this chat; the following is the report content to save under that name.

## Executive Summary

The strongest practical choice for this Astro static site is `astro-consent`, subject to verifying its current repository license and release activity before adoption. It is specifically designed for Astro, supports hashed self-hosted assets, category-based consent, versioned re-prompting, declarative blocking with `type="text/plain"`, typed runtime events, localization, accessibility features, CSP-safe output, and Astro View Transitions.[[1]] Confidence: MEDIUM, because the available search evidence is primarily the project repository and I did not independently inspect its complete release history.

If a more mature, framework-independent project is preferred, Klaro is the best fallback. Klaro is open source, can be self-hosted, supports purpose-based consent and blocking of third-party applications, and is intended for static sites.[[2]] Confidence: MEDIUM. Its main weakness for this use case is that the evidence collected here does not establish current release frequency, Polish translations, consent audit logging, or a complete accessibility audit.

The recommendation is not that installing a banner alone makes the site compliant. The owner must separately maintain a cookie/technology inventory, ensure Meta and PostHog are genuinely inert before consent, retain proportionate evidence of choices, publish a Polish and English declaration, provide a persistent settings/withdrawal link, and re-prompt when purposes or the technology inventory materially changes. The EDPB Cookie Banner Taskforce found that most European supervisory authorities expect a reject option on the first layer, and GDPR Article 7(3) requires withdrawal to be as easy as giving consent.[[3, 4]] Confidence: HIGH.

No candidate found in this scan provides Cookiebot-equivalent, independently verified automatic crawling, legal classification, regulator-grade hosted audit records, and ongoing vendor-managed updates at zero cost. That is the central trade-off.

## Phase 1 — Landscape of Open-Source Consent Tools

### Candidate Table

| Candidate | License / model | Static-site and blocking evidence | API, storage and localization | Maintenance evidence and assessment |
|---|---|---|---|---|
| astro-consent | License and current release data: [UNVERIFIED]. Astro-native open-source project | Astro integration; emits self-hostable hashed assets; blocks `type="text/plain"` scripts with `data-cc-category`; supports Astro View Transitions.[[1]] | Typed runtime API and document events; versioned consent; configurable text and locale resolution; accessibility features including dialog semantics, focus trap, restoration and Escape handling.[[1]] Consent server logging: [UNVERIFIED]. | Repository evidence shows a focused implementation, but exact latest release date, release cadence, maintainer count, bundle size, issues and security response were not established: [UNVERIFIED]. Strongest fit for this site, MEDIUM confidence. |
| Klaro | Open-source; exact OSI license should be rechecked against the current repository: [UNVERIFIED]. Self-hosted/client-side | Self-hostable compiled files; purpose/group-based consent; designed to prevent third-party applications from executing without consent.[[2]] | Configuration and callbacks/events are available in the project ecosystem: exact current API and Polish coverage [UNVERIFIED]. Built-in regulator-grade server audit log [UNVERIFIED]. | Mature-looking project, but current release date, frequency, active maintainers, bundle size, accessibility status and security response were not established in this search: [UNVERIFIED]. Strong fallback, MEDIUM confidence. |
| orestbida/cookieconsent | MIT; client-side JavaScript library.[[5]] | Lightweight cross-browser consent plugin; exact current pre-consent blocking mechanism and iframe behavior [UNVERIFIED]. | Exact current API, events, persistence, Polish translation and audit logging [UNVERIFIED]. | Repository is a credible primary source, but current activity, release history, maintainers and bundle size require verification.[[5]] Candidate for technical review, not first recommendation. |
| Biscuitman | MIT; client-side library.[[6]] | Claims approximately 3–4 kB compressed and supports injecting scripts after granular consent.[[6]] | Stores consent in localStorage; exposes `window.Consent` and custom document events; supports customizable strings and user-defined sections.[[6]] | Repository evidence indicates a small project with 10 stars, no open issues and a 2024 creation date in the search snapshot.[[6]] Current release cadence, accessibility depth, iframe coverage, Polish text and security history [UNVERIFIED]. Technically attractive but thin governance evidence. |
| Osano Cookie Consent | MIT open-source library, with optional Osano hosted products.[[7]] | Lightweight banner library; the project itself warns that users must implement GeoIP, callbacks, database consent saving and post-consent script loading when using the open-source tool.[[7]] | Exact current API and translations [UNVERIFIED]; server-side proof is not supplied by the library itself according to the repository’s warning.[[7]] | Osano states it actively maintains the project, but current release frequency and independent accessibility/security evidence were not collected.[[7]] Useful simple library, but more engineering work than Astro-consent or Klaro. |
| neiki-cookie-banner | License and current release data [UNVERIFIED]. Vanilla JS/GitLab project | Zero-dependency vanilla JavaScript; intended for static HTML and self-hosting.[[8]] Exact prior blocking behavior, iframe support and inert-markup mechanism [UNVERIFIED]. | Customization and themeability are advertised; API, events, consent proof, Polish translation and bundle size [UNVERIFIED]. | Current maintenance and release cadence [UNVERIFIED]. Do not adopt without repository inspection and an accessibility test. |
| SimpleCMP | License/OSI status [UNVERIFIED]; self-hosted bundle with a project website | Static-site instructions require self-hosting two files, declaring services, and using `src=""` plus `data-src` so URLs are injected only after consent; it also describes iframe placeholders.[[9]] | Configuration includes storage name, privacy-policy/imprint links and services with purposes/cookies; exact API, server logging, Polish translation and license [UNVERIFIED]. | Current web documentation exists and expressly discourages public CDNs for privacy reasons.[[9]] Because OSI licensing and release history were not verified, it cannot safely be called an in-scope open-source recommendation yet. |
| ConsentOS | Source-available Elastic License 2.0, not established as OSI-approved; self-hosted platform.[[10]] | Advertises dashboard, scanning, blocking and audit trails.[[10]] | Potentially the broadest platform functionality, but it is outside the stated OSI-license scope unless licensing changes or legal review confirms eligibility.[[10]] | Search result says repository was created in April 2026, so current maturity and maintenance are not established.[[10]] Excluded. |
| gdpr-cookie-banner | License and release history [UNVERIFIED]; small Astro/vanilla implementation | Uses inert `text/plain` scripts, clones them as executable scripts after opt-in, supports a `data-src` iframe pattern, and fires a `cookieconsent` CustomEvent.[[11]] | localStorage persistence, granular categories, footer reopening, keyboard/ARIA features.[[11]] | Repository description says approximately 170 lines; independent maintenance, license, release cadence, audit logging, translations and security history [UNVERIFIED]. Useful implementation reference, not a production recommendation without audit. |
| topostory-marketing implementation | License and general-purpose status [UNVERIFIED]; site-specific implementation | Demonstrates first-layer Accept/Reject/Customize, PostHog and Intercom blocking, shared consent cookie, and footer settings.[[12]] | Exact reusable API, license, maintenance and proof-of-consent design [UNVERIFIED]. | Excluded as a general candidate because the evidence describes an application implementation rather than a maintained consent product.[[12]] |
| WordPress/PrestaShop-specific projects | Excluded by scope | Art Cookie Choices Pro is a PrestaShop module, despite Polish translations and Consent Mode support.[[13]] | Not usable on Astro without a CMS-specific rewrite.[[13]] | Excluded. |

The scan found no reliable evidence supporting claims that any candidate offers automatic, continuously maintained cookie crawling equivalent to Cookiebot at no cost. Bundle sizes, npm downloads, named maintainers, current release dates, vulnerability history, notable production users, and server-side consent-log capability remain incomplete for most candidates: [UNVERIFIED].

### Shortlist and Exclusions

1. astro-consent — ranked first because it matches Astro, existing Cookiebot-style inert script tags, static self-hosting, events, versioning, localization and CSP requirements.[[1]] Confidence: MEDIUM.
2. Klaro — ranked second because it is a well-known open-source, self-hostable, purpose-based CMP suitable for static sites.[[2]] Confidence: MEDIUM.
3. orestbida/cookieconsent — ranked third as a permissively licensed lightweight library, but the scan did not verify the implementation details needed for this site.[[5]] Confidence: LOW–MEDIUM.
4. Biscuitman — ranked fourth because it is unusually small and exposes events, but its project-governance evidence is thin.[[6]] Confidence: LOW–MEDIUM.
5. Osano Cookie Consent — technically viable, but its own repository says the open-source version leaves database logging, GeoIP and callbacks to the implementer.[[7]] Confidence: MEDIUM.

Excluded: ConsentOS because the search result identifies Elastic License 2.0 rather than an established OSI-approved license.[[10]] Excluded CMS-only modules because the site is Astro.[[13]] Site-specific examples were treated as implementation references, not maintained products.[[12, 11]]

## Phase 2 — Shortlist Deep-Dives

### astro-consent

Compliance fit: the documented first-layer controls and categories appear capable of implementing equal-prominence Accept all, Reject all and Customize, but the repository does not itself prove that the default styling satisfies every national regulator. Configure and test this explicitly: [UNVERIFIED]. It supports versioned re-prompting, which can implement re-consent after a material cookie/purpose change.[[1]] Consent expiry policy and automatic expiry are [UNVERIFIED].

Proof: the documented runtime and events can produce a client-side record containing a random consent ID, timestamp, policy/config version and category choices.[[1]] A regulator-facing server log is not documented in the search evidence.[[1]] For this small site, the safest design is to send only a minimal event to a Vercel server route—consent ID, time, policy version, locale, choices and user-agent-independent technical metadata—while avoiding unnecessary IP retention. The legal retention period and exact evidence design need privacy review: [UNVERIFIED].

Declaration: no automatic crawler is documented. Maintain a version-controlled inventory manually for Meta Pixel, Meta Conversions API, PostHog Cloud EU, cookies/local storage, purposes, providers, retention and transfer information. The tool configuration should be the source for categories; the privacy/cookie page remains the authoritative human-readable declaration: [UNVERIFIED].

Blocking and integration: the documented `type="text/plain"` and `data-cc-category` approach maps directly to the existing Cookiebot tagging.[[1]] Use an event listener to initialize Meta only after `marketing=true`, PostHog only after `analytics=true`, and to emit Meta Lead only if the current state remains granted. Static example HTML files must receive the same layout or an equivalent blocking snippet. CAPI requests must also be guarded in server routes; a browser banner cannot retroactively control server-side processing: [UNVERIFIED].

Security/performance: self-host the pinned build rather than using a third-party CDN. The project advertises zero runtime dependencies and CSP-safe hashed assets.[[1]] Exact gzip/brotli size, CVE history, dependency provenance and maintainer response history [UNVERIFIED]. Test keyboard navigation, focus trapping, screen-reader names, contrast, reduced motion and mobile layout against WCAG 2.1/2.2; repository claims are not an independent audit.[[1]]

Localization: configurable per-locale text is documented, so Polish and English can be supplied by the owner.[[1]] Have a native Polish reviewer verify “reject all,” category descriptions, provider names and withdrawal wording.

### Klaro

Compliance fit: Klaro supports individual or grouped purposes and is designed to prevent third-party applications from running without consent.[[2]] That is a good conceptual fit for `analytics` and `marketing`, but first-layer button parity, current defaults, withdrawal UI, consent versioning and expiry must be configured and tested rather than assumed: [UNVERIFIED].

Proof: the project evidence supports client-side consent management but does not establish a built-in server audit trail.[[2]] Add an explicit event-to-server logging layer if the owner needs durable proof. Do not treat a localStorage flag alone as a complete audit record: [UNVERIFIED].

Declaration and blocking: service definitions can provide the basis for a manually maintained declaration and third-party blocking.[[2]] Verify iframe/embed behavior and the exact current callback API before migration: [UNVERIFIED].

Security/performance/accessibility: self-hosting reduces CDN supply-chain and third-party request exposure. Current bundle size, release cadence, vulnerabilities, maintainers, Polish language quality and independent accessibility audit were not established: [UNVERIFIED].

### orestbida/cookieconsent

The repository identifies the project as a lightweight, plain-JavaScript, MIT-licensed consent plugin.[[5]] That makes it attractive for a static site, but the search evidence does not prove prior blocking of all required scripts/iframes, durable consent evidence, version re-prompting, or Polish translations.[[5]] It should remain a candidate only after a code review confirms inert loading before consent and an event API for Meta Lead/PostHog initialization. Confidence: LOW–MEDIUM.

### Biscuitman

Biscuitman is the smallest quantified option found: its repository claims about 3–4 kB compressed and documents localStorage, `window.Consent`, custom events, granular sections and consent-triggered script injection.[[6]] This is attractive for Core Web Vitals and a custom Astro implementation. However, the evidence does not establish a server log, automatic re-consent, robust iframe handling, current release cadence, or independent accessibility testing.[[6]] Confidence: MEDIUM for the described features, LOW for compliance completeness.

### Osano Cookie Consent

The open-source project is MIT-licensed and Osano says it actively maintains it.[[7]] Crucially, the project itself says open-source users must handle GeoIP, callbacks, database consent saving and script loading.[[7]] That transparency is useful, but it means more custom engineering and more compliance responsibility than the owner wants. It is viable if simplicity and full control matter more than turnkey behavior. Confidence: MEDIUM.

## What EU Regulators Require of a Small Website

### Banner Design and Withdrawal

The EDPB Cookie Banner Taskforce reported that a vast majority of DPAs considered a first-layer reject option necessary where consent is requested, while describing its report as a minimum threshold rather than a guarantee of compliance.[[3]] Germany’s DSK position, as summarized in the cited material, requires refusal to be clearly recognizable and equivalent in effort, size, contrast and prominence; “settings or reject” leading to another layer is not enough as the immediate refusal option.[[4]] A 2025 report on a German administrative-court decision likewise describes a clearly visible first-layer “reject all” button where “accept all” is offered.[[14]]

Implement, in both Polish and English: Accept all, Reject all, and Customize on the first layer; no pre-ticked optional categories; no “continued browsing equals consent”; essential operation separated from analytics/marketing; and a persistent footer link or icon labelled clearly as cookie settings. Withdrawal must be possible in roughly the same number of actions as acceptance.[[4, 15]] Confidence: HIGH for the principles; MEDIUM for their exact application in Poland.

Poland’s Electronic Communications Law, effective from 10 November 2024 according to the cited Polish legal analysis, requires prior information and consent before storing/accessing information on terminal equipment, subject to necessary exceptions.[[16]] The same analysis describes concurrent GDPR/ePrivacy responsibilities and UKE/UODO roles.[[16]] Because this is secondary legal commentary rather than the statutory text, verify the final implementation with Polish counsel: MEDIUM confidence.

### Proof of Consent

The owner should be able to show: the banner/policy version shown; date and time; categories and choices; consent ID; language; source/domain; and how consent was withdrawn or superseded. Store a tamper-evident server record where proportionate, and keep the client-side state needed to enforce the choice. The cited EDPB material establishes the validity and withdrawal principles, but the exact retention period and required record fields for this business are [UNVERIFIED]. Do not claim that any tool is “GDPR-certified.”

### Cookie Declaration

Cookiebot’s automated scan is a convenience, not a substitute for ownership of the inventory. Maintain a version-controlled table covering cookies, localStorage/sessionStorage, pixels, SDKs, network calls, provider, purpose, category, duration, first/third party, and international-transfer notes. Re-scan in staging and production after releases using browser DevTools, network logs and a clean profile. Include Meta and PostHog even where a particular browser implementation changes over time. Umami’s no-cookie status does not automatically mean its entire processing is outside privacy law: document the actual data flow and legal basis: [UNVERIFIED].

## Phase 3 — Recommendation and Migration Outline

### Recommendation

Choose astro-consent after a short repository/license/release verification. It beats the alternatives for this site because it is Astro-native, preserves the existing inert-script migration pattern, exposes typed events, supports consent versioning, is self-hostable, has no runtime dependencies, and documents Polish/English-capable locale configuration.[[1]] Klaro is the fallback if astro-consent’s current maintenance or license cannot be confirmed.[[2]]

The owner gives up Cookiebot’s managed crawler, hosted dashboard, automatic cookie categorization, hosted audit infrastructure, vendor updates and lower day-to-day responsibility. The owner gains fixed hosting cost, local assets, smaller vendor/supply-chain exposure and control over the exact consent model. Exact feature parity is not established: [UNVERIFIED].

### Minimum surrounding compliance setup

1. Publish Polish and English cookie/technology declarations.
2. Configure essential, analytics and marketing separately.
3. Ensure Meta Pixel, Meta CAPI-triggering browser code and PostHog do not execute or transmit before opt-in.
4. Keep Umami documented and verify its actual no-cookie/data behavior.
5. Add first-layer Accept all, Reject all and Customize with equal prominence.
6. Add a persistent “Cookie settings” withdrawal control.
7. Log consent ID, timestamp, policy/config version, locale and choices server-side, with a documented retention and access policy.
8. Increment the policy/config version and re-prompt after adding a provider, purpose, category or materially changing the declaration.
9. Test Polish/English, keyboard, screen reader, mobile, CSP, disabled JavaScript, View Transitions, static HTML examples and third-party checkout boundaries.

### Migration outline

1. Inventory Cookiebot’s current categories, scripts, cookies, localStorage and network requests.
2. Pin and self-host the selected astro-consent build; verify the OSI license, checksum, dependencies and current release history before production: [UNVERIFIED].
3. Recreate categories as `essential`, `analytics` and `marketing`.
4. Replace Cookiebot attributes with the project’s documented `type="text/plain" data-cc-category` form.[[1]]
5. Register PostHog under analytics and Meta Pixel under marketing. Keep all initialization inside consent-granted handlers.
6. Guard Meta Lead so it checks current marketing consent at event time, not merely at page load.
7. Implement a server route for consent receipt logging; avoid collecting unnecessary identifiers.
8. Add Polish/English banner, modal, privacy-policy and settings-link text.
9. Add a version number and deliberately test re-prompting with an old stored choice.
10. Remove Cookiebot only after a clean-profile network test confirms no non-essential request occurs before consent.
11. Test Accept all, Reject all, category changes, withdrawal, reload, navigation, View Transitions, direct static HTML URLs and checkout links.
12. Monitor browser-console errors, Meta/PostHog request timing, consent-log failures, Core Web Vitals and dependency/security alerts.

## Orphan Topics

### Server-side and cross-domain processing

Meta Conversions API and the Easytools checkout are not controlled solely by a browser banner. Document whether data is sent from Vercel or a third-party checkout before and after consent, and ensure the legal basis and vendor disclosures match the actual flow: [UNVERIFIED].

### CDN and supply-chain choice

Self-hosting the consent bundle avoids an unnecessary third-party request before the banner is available. SimpleCMP’s documentation explicitly makes this privacy argument for self-hosting rather than public CDNs.[[9]] Pin versions and use an integrity/checksum process even when the library is open source.

### No-banner and “necessary only” approaches

A banner may be unnecessary for a page that genuinely uses only strictly necessary storage/access, but this site has Meta marketing and PostHog session-recording/heatmap processing. Therefore a no-banner design would require removing or redesigning those technologies, not merely labelling them essential: [UNVERIFIED].

### Open-core and source-available ambiguity

ConsentOS illustrates why “self-hostable” is not synonymous with “open source”: the search result identifies Elastic License 2.0, while the requested scope requires an OSI-approved license.[[10]] License verification should be a release gate.

## Gaps and Open Questions

The scan did not reliably establish current release dates, release frequency, active-maintainer counts, npm download numbers, exact bundle sizes, notable users, CVE histories, accessibility audits, Polish translation quality, consent expiry defaults or server-side logging for most candidates. These are [UNVERIFIED], not assumptions.

Before adoption, perform a final code-and-repository review of astro-consent and Klaro covering: current OSI license; latest release and commit activity; open security issues; dependency tree; exact event names; iframe behavior; storage semantics; version invalidation; focus/ARIA implementation; and whether default first-layer styling gives reject and accept equal prominence. Obtain Polish legal review for the ECL/GDPR boundary and the retention design for consent records. Confidence in the overall recommendation is MEDIUM until those checks are complete.

---

## Sources

*The report's inline `[[n]]` markers index this list — not any numbered source inventory inside the report body. It lists each distinct link the provider returned or the report linked, cited or not; a marker numbered past its end had no source.*

1. [zdenekkurecka/astro-consent](https://github.com/zdenekkurecka/astro-consent)
2. [kiprotect/klaro: Klaro Privacy Manager. An open-source ...](https://github.com/kiprotect/klaro)
3. [EDPB Publishes Report of Outcome of the Cookie Banner Taskforce](https://www.hunton.com/privacy-and-cybersecurity-law-blog/edpb-publishes-report-of-outcome-of-the-cookie-banner-taskforce)
4. [Consent Banner Report](https://noyb.eu/sites/default/files/2024-07/noyb_Cookie_Report_2024.pdf)
5. [orestbida/cookieconsent: :cookie: Simple cross-browser ...](https://github.com/orestbida/cookieconsent/)
6. [replete/biscuitman](https://github.com/replete/biscuitman/)
7. [osano/cookieconsent: A free solution to the EU, GDPR, and ...](https://github.com/osano/cookieconsent)
8. [neikiri / neiki-cookie-banner · GitLab](https://gitlab.com/neikiri/neiki-cookie-banner)
9. [Integrating SimpleCMP into a Static Page — Installation in 5 Minutes](https://simplecmp.eu/en/install-static.html)
10. [ConsentOS - privacy-first cookie consent management ...](https://github.com/consentos/consentos)
11. [haierr1/gdpr-cookie-banner](https://github.com/haierr1/gdpr-cookie-banner)
12. [iainbreen/topostory-marketing](https://github.com/iainbreen/topostory-marketing)
13. [ArteInfoRM/artcokiechoicespro](https://github.com/ArteInfoRM/artcokiechoicespro)
14. [Administrative court: Cookie banner must contain "Reject all" button | heise online](https://www.heise.de/en/news/Administrative-court-Cookie-banner-must-contain-Reject-all-button-10390520.html)
15. [Report on cookie banners – does your banner meet the recommendations? | Rödl](https://www.roedl.pl/en/good-to-know/good-to-know/gdpr/report-on-cookie-banners-does-your-banner-meet-the-recommendations)
16. [Poland cookie consent: Article 399 ECL, UKE and UODO | Kukie.io](https://kukie.io/blog/cookie-consent-poland-uodo-guidelines)