---
provider: "pplx"
model: "openai/gpt-6-luna"
brief: "brief-pplx-funnel-open-source-cookie-consent.md"
duration_ms: 165069
input_tokens: 342203
output_tokens: 14272
cost_usd: 0.0436
truncated: False
citation_scheme: "unified"
---

# Research Results: brief-pplx-funnel-open-source-cookie-consent

**Provider:** pplx (openai/gpt-6-luna)

---

**Filename: `brief-pplx-funnel-open-source-cookie-consent.md`**

## Executive Summary

**Recommendation: replace Cookiebot with Orestbida’s `vanilla-cookieconsent` v3, self-hosted as part of the Astro site, and add a small first-party consent log.** It is the best fit for this site’s existing Cookiebot-style script tags and modest size: the library supports HTML script gating, a JavaScript consent API, callbacks when consent changes, custom Polish and English translations, and re-consent when its configured revision changes. The main trade-off is that it does not provide Cookiebot-style automatic site scanning or a ready-made consent-record dashboard; the owner will need to maintain the cookie and tracker inventory and implement a modest logging endpoint. [[11, 113, 116, 117, 119]]

**Best alternative if evidence collection is the overriding priority: CookieYes Consent SDK.** Its self-hosted backend is designed to receive versioned consent records, and its releases provide unusually specific package-size information. But it is a very young, pre-1.0 project in November 2026, and its advertised translation set does not include Polish; deployment and independent validation would require more work than the Orestbida migration. [[73, 123, 126, 128, 75]]

**Important legal framing:** a consent library is not a compliance certification. Compliance depends on the real scripts and storage used by the website, the choices shown, the accuracy of the information, and whether optional processing is actually stopped when consent is absent or withdrawn. For a Polish site, Article 399 of the Electronic Communications Law (PKE) requires prior clear information and consent for non-exempt device storage/access; Article 400 applies data-protection consent rules. [[134, 145]] **Confidence: HIGH.**

**Important operational framing:** do not treat Cookiebot’s scan as the only source of truth for the cookie declaration. The site owner remains responsible for checking the real production behavior, including the PostHog session-recording and heatmap setup, Meta Pixel, any browser-side calls to the Conversions API, and third-party embeds. **Inference; confidence: HIGH**, based on the controller’s proof and transparency duties and the limits of automated service discovery. [[45, 119, 63]]

*Research limitation:* this is a landscape of identifiable, active or recently maintained candidates found in current project sources—not a provable inventory of every repository worldwide. Several projects publish neither dependable maintainer counts nor third-party user lists; those facts are marked unavailable rather than inferred from stars. **Confidence: MEDIUM.**

## Phase 1 — Landscape of Open-Source Consent Tools

### Candidate Table

“Maintained” here means there is evidence of project activity or releases during 2025–2026. A new project can meet that activity test and still be too immature to recommend. “Not reported” means the inspected primary sources did not establish the value; it does not mean the capability is absent.

| Candidate | License and model; recent activity | Blocking and API | Polish / English; consent evidence | Size and users; fit for this site |
|---|---|---|---|---|
| **Orestbida `vanilla-cookieconsent` v3** | MIT; client-side library, can be bundled or self-hosted. v3.3.0 was released 3 November 2026. The repository shows a substantial history, but does not establish the number of actively responsible maintainers. [[17, 11]] | Can manage `<script type="text/plain" data-category="…">` tags; also supports callback/event-based integration. `onConsent`, `onFirstConsent`, and `onChange` expose the current choice and changed categories/services. Revision management can invalidate old consent. [[113, 114, 116, 117]] | English is documented; Polish can be supplied as a translation. Translation files may be external or inline. Logging is a developer implementation using callbacks and `fetch`; there is no built-in evidence dashboard. [[185, 119]] | Exact current bundle size and notable production users were not established in inspected sources. Strong fit: familiar tagging, no separate backend requirement for the banner, low-cost static deployment. [[116, 20]] |
| **Silktide Consent Manager v2** | MIT; self-hostable JS and CSS. v1.0 released 28 January 2025; v2.0 released 3 December 2025; v2.0.1 dated 2 July 2026. The repository has 31 commits; active maintainer count is not established. [[18, 21, 28]] | Injects configured scripts after consent and reloads the page after revocation; API provides `onAccept`, `onReject`, consent reads, reset and prompt controls. It can fire a change event for GTM. [[16]] | Text is configurable, so Polish and English can be written by the site owner; no consent log is included. It stores choices in `localStorage`. [[16, 94, 22]] | The project’s own JS file is listed as 30.9 KB unminified; compressed production size was not established. Strong, simple alternative, but tag migration and a consent log still need implementation. [[191, 22]] |
| **tarteaucitron.js** | MIT; self-hosted client-side library, with a separately sold hosted service. The project’s release page lists ongoing v1.x releases through 2026; the repository identifies an independent maintainer, but not a reliable active-maintainer count. [[19, 5, 61]] | Supports configured service-level loading, placeholders, service-specific allow/disallow events and custom services. Its own docs warn that initializing the banner alone does **not** automatically block scripts loaded elsewhere. [[5]] | Translation files and customizable text are supported. The sources inspected did not verify whether its current built-in language files include Polish or how to produce a consent audit log. [[5]] | Size and notable users not established. Active and capable, but service-oriented integration is a less direct migration from the site’s present generic Cookiebot tags. [[5]] |
| **c15t** | Apache-2.0; open-source JavaScript CMP and optional hosted or self-hosted backend. Current project materials describe Astro 6 support and an extensive package ecosystem; the public repository history reports 1,673 commits, but the inspected page did not establish the latest release date or active maintainer count. [[2, 84]] | Offers consent-gated scripts, event dispatch and iframe/network-blocking options; its Astro adapter is designed for Astro. Consent records and policy-version information are part of the platform approach. [[74, 2, 83, 84]] | Project documentation lists 53 languages, but the inspected source did not confirm the specific Polish strings’ completeness or quality. Records can be kept through its backend options; local development mode is explicitly not intended as production evidence storage. [[2, 84]] | Bundle size and independently verified production users not established. Excellent technical scope, but a backend, database, or hosted service makes it more operationally involved than a simple static-site library. [[84]] |
| **CookieYes Consent SDK** | MIT; packages for vanilla JS, UI, core, integrations and an optional self-hosted backend. The project was releasing packages in 2026; its SDK security policy says it is pre-1.0. [[14, 123, 128]] | Vanilla JS support is available. The self-hosted backend stores a consent decision once, with retries and record identifiers. Script integrations and consent state APIs are part of the SDK. [[73, 76, 123]] | Vendor documentation advertises English, Spanish, French, German and Italian—not Polish—so Polish translation would need to be supplied or verified before selection. Self-hosted mode can store records on infrastructure the controller runs. [[73, 75]] | A release measured the banner and recall button at 13.14 KB gzipped, plus 5.34 KB for the two dialogs; these are project measurements against an empty Next.js app, not a direct Astro measurement. Strong evidence feature, but new and more complex. [[123]] |
| **ConsentKit** | MIT; recently released, self-hostable widget/config with optional server logging. Project workflows show v1.2.3 released 8 October 2026; active contributor count is not established. [[162, 4, 165]] | Its documentation describes pre-blocking via `data-ck-category`/`data-ck-src`, versioned choices, a reopen control, and a logging endpoint. Its stated log fields include visitor ID, timestamp, choices, banner version and user agent. [[4]] | Built-in language table lists English and Czech; custom text is supported, so Polish needs owner-written strings and verification of all built-in labels. Logs may be stored in SQLite or CSV through the project’s server options. [[4]] | Size and notable users not established. Interesting feature coverage, but recent release history and a single small project footprint make it a trial candidate rather than the lowest-risk choice for a non-expert owner. [[165, 4]] |
| **Conzent OCI** | Apache-2.0, with a documented license correction in v2.7.3; self-hosted full CMP, not merely a browser library. Public release began in March 2026; later changelog entries extend into September 2026. [[89, 170]] | Full banner and consent logging; installation expects a server stack, and its deployment documentation lists Docker plus database/cache/web-server components. It can supply consent scripts to a site, but requires infrastructure beyond Vercel static hosting. [[206, 89]] | Its project documentation describes 86 banner languages and a cookie/reference database; Polish is plausible but the inspected source does not confirm the precise Polish translation set. Consent records and reporting are platform features. [[89]] | Widget size and independent deployments/users not established. This is the most CMP-like self-hosted option in the scan, but operating its own stack is disproportionate for this site. [[170, 206]] |
| **Tagticians self-hosted CMP** | MIT; self-hosted script/config project. Its repository shows nine commits and 2026 updates, which establishes activity but not a mature maintenance history. [[90, 86]] | Has an embeddable script and API for reading consent, listening for changes, resetting choice and opening preferences; it also emits Google Consent Mode updates. [[86, 90]] | Configurable banner strings could be translated, but the inspected repository did not establish a maintained Polish translation. Server-side consent log features were not established. [[86, 184]] | Size/users not established. A possible low-cost alternative, but the project’s small history and documentation limits leave more verification work than the established libraries. [[90]] |
| **openConsent** | Apache-2.0; maintained, self-hosted project, but the inspected current release is explicitly **0.4.0-beta.1**. [[168, 171]] | Supports explicit purpose-gated scripts, versioned browser choices, withdrawal behavior, and browser/server adapters. It emphasizes explicit registration rather than universal discovery. [[168, 171]] | Its described banner locales are English and Chinese, so it does not meet the Polish-text requirement without additional translation work. The inspected docs do not establish an individual server-side evidence log. [[168]] | Size and notable users not established. Promising developer-oriented approach; beta status and language gap exclude it from the practical shortlist. [[168]] |
| **Klaro** | BSD-3-Clause; free, self-hostable client library. Its latest documented release is v0.7.22 dated 26 March 2024, while its repository page shows activity in 2026; release cadence therefore warrants caution. [[1, 62]] | Supports opt-in `type="text/plain"` script tags with `data-name`, and a JavaScript API with `getConsent`; release notes describe callbacks and optional anonymous consent records. [[62, 1]] | The project’s current listed translations include English but not Polish; custom translations are possible. Optional backend may receive anonymous records, but the inspected docs do not establish an easy audit trail with timestamp, policy version and choices. [[62, 1]] | Size/users not established. It is technically viable, but the long gap since the last documented release and language/evidence needs make it a weaker choice for this migration. [[1]] |
| **ConsentStack** | The `@consentstack/react` component is MIT, but the overall product is a cloud CMP subject to its service terms. [[174, 179]] | Vendor material describes tracker blocking and React integration, but the primary sources inspected did not establish an independent, static Astro self-hosted deployment. [[179, 181]] | Vendor material describes consent logs, but these are tied to its cloud service. Polish support was not verified. [[179, 181]] | Not shortlisted: the cloud-service dependency conflicts with the stated no-recurring-cost, self-hostable preference. **Confidence: MEDIUM.** [[179]] |

**Bundle sizes and named users:** beyond the specific figures above, the inspected project sources generally did not provide comparable minified/gzipped sizes or verifiable notable-user lists. A “not established” entry is more reliable than treating stars, download counts, or vendor customer logos as proof of quality. [[17, 19, 11]]

### Shortlist and Exclusions

**Ranked shortlist**

1. **Orestbida `vanilla-cookieconsent` v3 — recommended.** The closest implementation fit: its documented script-tag control resembles the current Cookiebot pattern, and its callback API can gate Meta Lead events. It supports custom PL/EN translations, revision-based re-consent, and can be self-hosted with the site. [[116, 113, 117, 185]]
2. **Silktide Consent Manager — simplest alternative.** Small self-hostable files, configurable consent types, callbacks and reload-on-revocation. However, it stores choice locally and explicitly leaves proof-of-consent recording to the site owner. [[16, 94, 22]]
3. **CookieYes Consent SDK — strongest ready-made record path.** The self-hosted backend and documented retry/record behavior are appealing, but it is pre-1.0 and the advertised translations omit Polish. [[73, 76, 128, 75]]
4. **tarteaucitron.js — mature service ecosystem.** Active releases and service-level hooks are attractive, but existing scripts must be adapted to its service integration model; its maintainers explicitly warn that it does not automatically stop unrelated scripts already loaded on the page. [[19, 5]]
5. **c15t — strongest framework-aware platform approach.** Astro 6 support, multiple gating mechanisms and consent records make it technically promising. It misses the pragmatic cut because evidence storage calls for a backend or hosted service and adds more moving parts. [[2, 83, 84]]

**Excluded or not promoted**

- **Conzent OCI:** a real open-source self-hosted CMP, but its documented PHP, database, Redis, web-server and Docker requirements imply running a separate server stack. That is a poor fit for a small Vercel site unless the owner actively wants to operate a CMP. [[206, 89]]
- **ConsentKit:** feature-rich and recently released, but the project’s own language table is English/Czech and its release history is very short. Worth a controlled pilot, not the conservative recommendation. [[165, 4]]
- **openConsent:** interesting explicit-tag, versioned-consent design, but it is beta and the published banner locales inspected are English and Chinese. [[168]]
- **Klaro:** still worth knowing, but its latest documented release is from March 2024; a repository update in 2026 does not, by itself, establish a recent release cadence. [[1, 62]]
- **ConsentOS:** not included as an OSI-approved open-source candidate. Its own repository describes the Elastic License 2.0 as source-available and restricts providing the software as a hosted or managed service. [[176, 177]]
- **WordPress-only integrations and consent browser extensions:** excluded by scope; they do not directly supply a framework-independent Astro site implementation. **Confidence: HIGH.**
- **Older or low-activity libraries:** not treated as viable substitutes merely because they remain discoverable in code-search results. The qualifying list above favors evidence of recent project activity over popularity signals. **Confidence: MEDIUM.**

## Phase 2 — Shortlist Deep-Dives

### 1. Orestbida `vanilla-cookieconsent`

**Compliance behavior.** The library exposes the components needed to present a consent choice, but the site owner must configure the design correctly. The project’s documented example includes “Accept all,” “Reject all,” and a preferences option, and its category model permits a read-only necessary category with optional categories. The owner should ensure the first layer visibly offers accept and reject with comparable prominence, and that optional categories start off. [[20]] **Confidence: HIGH for capability; MEDIUM for the exact deployed appearance until tested.**

Granularity can be categories plus services. The site should keep PostHog under statistics and Meta Pixel under marketing, with distinct explanations of their purposes and third parties. Do not treat “statistics” or “marketing” labels alone as sufficient disclosure; the meaningful description is what helps the visitor make an informed choice. [[113, 20, 45]]

The library supports a `revision` value; changing it invalidates previous consent and prompts again. Its `onChange` callback covers changes after consent. The owner should increment the revision after a material change to purpose, vendor, or policy wording that affects what the visitor agreed to. The tool’s built-in validity checks also account for missing consent, revision mismatch, and expired consent cookie. [[115, 117]] **Confidence: HIGH.**

**Proof of consent.** CookieConsent provides callback data, not a complete consent audit service. Its documentation recommends recording first consent and later preference changes using `onFirstConsent` and `onChange`, and gives a `fetch`-based logging pattern. [[119]] A small first-party Vercel endpoint can append a record containing: site/policy version, timestamp, locale, category choices, whether the choice was first consent or a change, and an opaque consent identifier. This suggested record design is an **implementation recommendation**, not a schema supplied or legally mandated by the library.

The controller must be able to demonstrate valid consent and what information was shown at the time; the EDPB does not prescribe one single technical recording method. [[45]] For this site, pair the individual record with the versioned consent configuration, the privacy/cookie text, and dated screenshots of the banner. CNIL’s current recommendation identifies timestamped screenshots for each version and time-stamped code/configuration evidence as ways to support proof; it also recommends retaining choices for an appropriate period, generally six months. [[149, 153]] **Confidence: HIGH on the controller’s proof duty; MEDIUM on the best retention period for this particular Polish site.**

**Cookie declaration and discovery.** CookieConsent can display a manually maintained cookie table in its preference content, but the inspected sources do not show a Cookiebot-style crawler. [[121]] Keep a small source-controlled inventory instead: tracker/vendor, purpose, storage or access mechanism, cookie/local-storage names if observed, duration where known, and the conditions under which it loads. Check actual production browser behavior after consent, after reject, and after withdrawal. This fits a site with roughly 15 real pages better than running a dedicated CMP server, but it is a recurring owner task. **Inference; confidence: MEDIUM.**

**Script blocking and event-driven code.** The library supports the existing style of script tagging using `type="text/plain"` and `data-category`; it also offers `onConsent`, `onFirstConsent` and `onChange`. It warns, however, that a tagged script can be enabled and disabled at most once, while callbacks can run repeatedly. [[116]] Therefore use callbacks for the Meta Lead event and state transitions, not a one-shot script tag that is expected to re-run every time a user toggles the category.

For withdrawal, disabling a category does not undo code that has already run. CookieConsent’s documented script-management behavior is constrained, and its iframe integration is a separate setup. [[116, 122]] For Meta and PostHog, test whether each vendor provides a stop/opt-out operation; if not, a page reload after revocation is a safer approach than pretending the already loaded JavaScript has been unloaded. **Recommendation; confidence: HIGH.**

**Security, accessibility, performance.** The project is self-hostable, allowing the site to avoid a third-party runtime CDN dependency; its docs also describe CDN delivery as an option. Pin the package version, keep it in the lockfile, and deploy assets with the site rather than loading an unpinned “latest” script from a CDN. [[20]] The inspected sources did not provide an independent security audit, release-response history for a named vulnerability, or comparable current minified/gzipped bundle size. Those are evidence gaps, not evidence that there are vulnerabilities. **Confidence: MEDIUM.**

The inspected primary documentation did not provide an independent WCAG audit for the specific deployed theme. Treat accessibility as something to test: keyboard access, focus placement and return, screen-reader labels, contrast, zoom, and the no-choice state. Do not infer accessibility compliance from a library’s general description. **Confidence: MEDIUM.**

**Languages and Astro effort.** The project lets the owner supply translations inline or through external JSON and supports language detection from the document or browser preferences. That is enough to implement polished Polish and English text, but the translations must be authored and reviewed by the business. [[185, 113]] On an Astro static site, install the npm package and initialize it once in a client-side entry point; keep the configuration and translation JSON in the repo. Its script-tag format should make migration relatively direct, but an Astro build should be checked to ensure every page actually includes the bootstrap early enough to prevent vendor scripts from running first. [[20, 116]] **Confidence: HIGH for the library mechanisms; MEDIUM for implementation effort until tested in the actual build.**

### 2. Silktide Consent Manager

Silktide is a credible, low-complexity alternative for a site that wants two local JS/CSS files rather than a CMP backend. Its documented consent types allow required and optional categories, callbacks, script injection, a preferences modal, a choice reset, and changes after the initial decision. It reloads the page on revocation so already-injected scripts do not remain active in the current document. [[16]] Its change log documents an accessibility fix in v2.0.1, while the project’s docs describe keyboard navigation, focus trapping and ARIA labels. [[18, 16]] These are project claims and implementation details, not an independent accessibility certification.

**First-layer controls and localization.** Its examples include accept-all, reject-nonessential and preferences controls, but the owner must confirm equal visual weight in the actual banner. It allows all displayed text to be overwritten, which means PL/EN are possible but depend on the owner’s translations. [[16]] It stores consent in `localStorage`, not a server-side audit log. [[94]]

**Proof and inventory.** Silktide explicitly says that the site owner must send each choice with a timestamp to their own server or analytics if they need proof. [[22]] This is a clear limitation compared with a hosted CMP’s ready-made records. The project’s behavior also makes script withdrawal easier to reason about via reload, but still does not create a declaration or discover cookies. [[16, 94]]

For the current site, Silktide would require replacing the present Cookiebot-tag interpretation with its configured script injection or another custom bridge, then wiring the Meta event to the appropriate accepted marketing state. It is a reasonable fallback if the owner prefers a simple script and is willing to write a small audit endpoint. The repository’s published file size is 30.9 KB unminified for the JS file; the available source did not establish gzip size or a full performance comparison. [[191]]

### 3. CookieYes Consent SDK

CookieYes is architecturally interesting because it separates the core engine, UI, vanilla integration and backend. Its self-hosted backend stores each decision once, supports retry behavior, and documents a server-side record flow; a project release reports a 13.14 KB gzipped banner-plus-recall button and 5.34 KB additional dialog payload in its measurement setup. [[73, 76, 123]] **Confidence: HIGH about what the project documents; MEDIUM about how those measurements translate to this Astro deployment.**

Its largest advantage is proof-of-consent support that is more developed than a callback-only browser library. The record should still be reviewed for the business’s actual legal and operational needs; the project itself says its security policy supports a pre-1.0 SDK. [[73, 128]] Because the project’s own documentation describes the SDK as pre-1.0, choosing it now means accepting more API and behavior change risk than with a mature, narrow client-side library. [[128]]

The largest practical gaps for this case are translation and complexity. The current vendor-authored summary lists five languages—English, Spanish, French, German and Italian—rather than Polish. [[75]] The site would need a verified Polish translation, a backend endpoint/database or custom storage adapter, and tests for consent event timing, Astro hydration, withdrawal, and tracker suppression. **Vendor statements are identified here as [VENDOR: CookieYes]; independent long-term adoption or security audit evidence was not established.**

### 4. tarteaucitron.js and c15t

**tarteaucitron.js** is worth shortlisting for teams that want a catalog of services and an event-driven service model. Its primary docs expose service-specific allowed/disallowed events, custom services and text overrides. The project also stresses that the banner does not automatically block scripts already loaded elsewhere. [[5]] This matters for Astro: manually loading Meta or PostHog outside the service configuration would defeat the consent gate. Its frequent service-oriented updates show activity, but an automatic crawler and a small site’s complete cookie declaration are not established features of the open-source library itself. [[19, 5]]

**c15t** is the strongest framework-aware alternative in this group: current docs list Astro 6, consent-gated scripts, a runtime API and iframe/network-blocker options. [[2, 83]] It can be used with local browser-only choices for development, but production consent records require a backend option or service according to its deployment materials. [[84]] This can be attractive for a larger product stack; for a small static business site, it adds infrastructure and maintenance. Its 53-language catalog is promising, but the exact Polish translation coverage and the first-layer reject design should be verified directly before adoption. [[2]]

### Comparative Compliance Checklist

| Requirement | Orestbida | Silktide | CookieYes SDK | Practical decision for this site |
|---|---|---|---|---|
| First-layer accept and reject | Configurable; verify the actual first layer and visual parity. [[20]] | Documented accept/reject controls; verify styling parity. [[16]] | Do not assume from the SDK name; inspect the rendered banner before launch. **[UNVERIFIED]** | Show **Accept all**, **Reject all**, and **Preferences** together with comparable visual weight. [[30, 31]] |
| No pre-ticked optional choices | Configure optional categories off; necessary can be read-only. [[20]] | `defaultValue` is configurable; ensure optional values are false. [[16]] | Validate defaults in the deployed config. **[UNVERIFIED]** | Test a fresh browser profile and confirm neither PostHog nor Meta runs before affirmative consent. [[30, 54]] |
| Granular purposes | Categories and service choices available. [[113]] | Configurable consent types. [[16]] | Custom categories are supported. [[14]] | Keep statistics and marketing separable, and explain each in PL/EN. |
| Withdrawal and script shutdown | Callback reports changes; reload/stop behavior needs explicit testing. [[116]] | Reloads after revocation. [[16]] | SDK documents vendor stop-tracking operations in its own summary. [[75]] | Footer “Ustawienia cookies / Cookie settings” link should reopen preferences; withdrawal must stop subsequent calls. [[30, 193]] |
| Consent changes and re-consent | Revision invalidates old consent. [[117]] | Reset/API exists; a policy-version strategy must be checked in implementation. [[16]] | Versioned records are part of its backend approach. [[76]] | Maintain an explicit policy version and bump it after material purpose/vendor changes. |
| Server-side evidence | Custom callback-to-endpoint implementation. [[119]] | Owner must send records to their server. [[22]] | Self-hosted backend available. [[73]] | A small first-party log is adequate if tested, protected, retained appropriately, and paired with versioned banner evidence. [[45, 149]] |

## What EU Regulators Require of a Small Website

### Banner Design and Withdrawal

The EDPB Cookie Banner Taskforce report says the vast majority of authorities considered the absence of a reject/refuse option on a layer that offers consent to be inconsistent with valid consent; it also identifies pre-ticked boxes and misleading design as problematic. [[30, 31]] The report does not require one specific banner layout, color scheme, or permanent floating icon. It calls for an easily accessible withdrawal mechanism and case-by-case assessment; a visible, standardized footer link is given as an example. [[30]]

Under GDPR consent guidance, consent must be freely given, specific, informed and unambiguous; it must be possible to withdraw as easily as it was given, and the controller must stop the processing that depended on the withdrawn consent. [[45, 193]] That means the site’s footer link is a reasonable mechanism **if** it is present throughout the site, clearly labeled, and opens controls where a visitor can withdraw in a comparably straightforward way. [[30]]

For a Polish business, the PKE is the national cookie-law reference: Article 399 requires prior clear information and consent except for specified necessity exceptions; Article 400 applies data-protection provisions to consent. [[134, 145]] UODO material published in 2025 reiterates active, informed consent, no preselected boxes, and effective withdrawal, although the UODO page is general guidance and not a technical certification of any CMP. [[106]] **Confidence: HIGH.**

The site should not classify trackers as necessary just because they are useful to the business. Meta Pixel and PostHog session replay/heatmaps are described in the supplied site context as consent-requiring, so they should remain blocked before opt-in and stop being initiated after withdrawal. This classification follows the user’s stated setup and ePrivacy’s prior-consent rule; it is not a new technical finding about the vendors’ full behavior. [[54, 46]]

### Proof of Consent

The controller—not the CMP vendor—has the burden of showing that valid consent was obtained. EDPB guidance says evidence should make it possible to show how and when consent was obtained and what information was presented at that time; it does not prescribe one specific storage technology. [[45]] The evidence should cover both **the individual choice** and **the validity of the mechanism**. CNIL’s current recommendation describes, among other methods, timestamped screenshots for each site version and time-stamped code/configuration evidence. [[149]]

**Minimum practical evidence for this site:**

- A first-party record with an opaque consent identifier, timestamp, site and consent-policy version, language, and category choices; record both initial choice and later changes. CookieConsent provides callbacks suitable for submitting such records, but does not itself provide the server log. [[113, 119]]
- A version-controlled copy of the consent configuration and PL/EN texts, with the revision number and a dated screenshot of the first and preferences layers. CNIL identifies versioned code/configuration and screenshots as possible evidence. [[117, 149]]
- A record of the tested script behavior: before choice, reject, accept, and withdrawal, for both Meta and PostHog. This is a practical recommendation to show that the recorded choice was effective, not a prescribed EDPB record format. [[45, 5]]
- A sensible retention rule. CNIL’s general recommendation is that choices be retained so users are not repeatedly asked; it says six months is generally good practice. The appropriate period must still be considered in context. [[153, 157]]

Avoid collecting extra data simply because it is easy. A raw IP address or full user-agent is not required by the EDPB’s general proof standard cited above. If the business adopts a visitor identifier for auditability, document why it is needed, limit access, and define deletion. **Recommendation; confidence: MEDIUM.** A consent log is personal-data processing in its own right and needs transparent handling.

### Cookie Declaration

Neither the recommended Orestbida library nor a manual banner replaces the business’s duty to describe the technologies it actually uses. Cookiebot’s crawler is a convenience, not a legal guarantee of a complete or correct declaration. **Inference; confidence: HIGH.** The inspected project documentation for Orestbida describes manually supplied cookie-table content and callback logging, not an automatic site crawler. [[121, 119]]

Maintain one source-controlled inventory and use it to update the site’s cookie page and the banner’s preference details. At minimum, record:

| Inventory field | What to maintain |
|---|---|
| Vendor/service | Meta Pixel, PostHog Cloud EU session replay/heatmaps, and any future embed or tracker. |
| Purpose and category | Marketing or statistics, described accurately in Polish and English. |
| Storage/access | Cookie names and other browser storage or device-access mechanisms observed in production. |
| Duration | Observed or vendor-documented duration; mark unknown rather than guessing. |
| Loading condition | The exact category and consent state required before it may run. |
| Last verified | Date, browser/test scenario and site release or consent-policy version. |

This table is an operational recommendation, not a verbatim regulator-mandated schema. It makes manual maintenance practical for a site with a limited number of real pages and reduces the risk of publishing a cookie list that no longer matches actual behavior. **Confidence: MEDIUM.**

## Phase 3 — Recommendation and Migration Outline

**Choose Orestbida `vanilla-cookieconsent` v3, self-hosted, with a small first-party append-only consent log.** It beats the alternatives for this site because it can preserve the existing script-tag approach, gives page JavaScript callbacks for the Meta Lead event, supports explicit re-consent revisions, and does not require a separate database-backed CMP platform to show the banner. [[116, 113, 117]]

**What the owner gives up versus Cookiebot:** automatic crawler-based discovery, a hosted dashboard, turnkey consent logs, and potentially managed maintenance of vendor/cookie descriptions. The sources reviewed do not establish equivalent built-in discovery or hosted audit services for Orestbida; the owner should plan to maintain the inventory and operate the logging endpoint. [[119, 121]]

### Minimum Setup Around the Tool

1. **Use clear categories and neutral first-layer choices.** Configure necessary as always active and non-editable, with statistics and marketing off by default. Put accept, reject and preferences on the first layer; make accept and reject comparably prominent. [[30, 20]]
2. **Implement complete PL/EN translations.** Use the site’s language setting or document language to choose the relevant translation, and check that the preference details and reopen control are translated too. The library supports custom translation files; the business must supply the content. [[185, 113]]
3. **Gate all relevant execution paths.** Keep Meta Pixel, PostHog session replay and heatmaps, their associated initialization code, and consent-gated Meta Lead calls behind marketing/statistics consent respectively. Ensure there are no duplicate script loaders, tag-manager injections or early network requests. The library’s script tags work only for scripts actually passed through the gate. [[116, 5]]
4. **Wire consent state to the conversion event.** Use `onConsent` to initialize behavior from an existing decision, and `onChange` to react to category changes. Before emitting a Meta Lead event, check that marketing is currently accepted; do not infer permission from a previous page load or from an event being queued. [[113, 114]]
5. **Add a small first-party logging endpoint.** Submit timestamped records on first decision and preference changes. Store the consent version and choices; avoid storing raw IP or user-agent unless there is a documented need. CookieConsent’s own guide gives the callback-and-POST pattern. [[119]]
6. **Keep a human-maintained cookie declaration and evidence pack.** Store the inventory, translated descriptions, screenshots of banner versions, and implementation version alongside the site’s policy materials. Refresh the inventory after changing scripts, vendors or configuration. [[149, 153]]
7. **Set a re-consent rule.** Bump the consent revision after a material change in purpose, vendor, or information shown. Use a six-month choice duration as a practical starting point for review, not as a universal statutory expiry: CNIL describes six months as generally good practice, while EDPB consent guidance says validity depends on context and that significant changes require new consent. [[117, 111, 153]]

### Step-by-Step Migration

1. **Inventory the production site before changing the CMP.** Check the actual live pages and network behavior with no stored consent, with rejection, after marketing consent, after statistics consent, and after withdrawing each. Include static example HTML files if they can be accessed publicly, since they may still be crawled or visited. **The latter is a practical inference from the supplied site description.**
2. **Make the new tool the only consent authority.** Remove the Cookiebot loader and any duplicate consent state or tracking initialization. Keep the user-facing footer control but wire it to the new preferences dialog.
3. **Add and pin the library.** Bundle and self-host a specific release instead of relying on an unpinned third-party script; the project documents npm and self-hosted distribution options. [[20]]
4. **Translate and configure the banner.** Implement Polish and English text, optional statistics and marketing categories, first-layer reject and accept controls, and a clear preferences path. Set the initial revision explicitly. [[20, 117, 185]]
5. **Migrate script tags carefully.** Convert Cookiebot category tags to the library’s `type="text/plain"` and `data-category` scheme. Inspect Astro output to confirm the consent bootstrap runs before any optional script can execute. [[116]]
6. **Implement the Meta Lead gate.** Have the event handler check the current marketing state when the event is about to be sent. Test first-time acceptance, a returning accepted visitor, rejection, and later withdrawal. [[113, 114]]
7. **Add and test logging.** Confirm the server accepts first consent and changes, associates records with the right version and categories, handles errors safely, and applies the selected retention policy. [[119, 45]]
8. **Verify every state in a clean browser.** Inspect cookies, storage, script elements and network requests—not just what the banner displays. After withdrawal, reload and confirm that optional trackers do not resume unless consent is given again. [[30]]
9. **Remove Cookiebot only after the new path passes the tests.** Then check all real pages, language variants, footer links and publicly reachable example HTML.

### Risks and Monitoring

- **Consent UI without effective blocking:** a correct-looking banner is insufficient if a tracker is independently loaded elsewhere. Verify actual requests before and after choice. [[5]]
- **Withdrawal that only changes a stored boolean:** a script already loaded may need a vendor opt-out call or a reload before further processing stops. [[45, 116]]
- **Stale cookie declaration:** future integrations or a vendor configuration change can make the published inventory inaccurate. Review the inventory after each analytics/marketing change. **Recommendation; confidence: HIGH.**
- **Consent log overcollection:** an audit log should not silently become a new tracking database. Minimize fields and document retention. The controller must retain evidence only as long as needed for the relevant purpose and legal claims. [[45]]
- **Translation and build regressions:** check both languages and the production Astro build after dependency or consent-config updates. CookieConsent supports external translations, so a missing or malformed translation should be tested explicitly. [[185]]
- **Future Google products:** Google Consent Mode v2 is unnecessary today. If introduced, wire its default-denied state before Google tags and update it on consent changes; do not add it simply because a CMP supports it. [[121]]

## Orphan Topics

### First-Party, Cookie-Free Analytics Is Not Automatically Exempt

The supplied context says self-hosted Umami runs without cookies and without consent. The EU Commission’s guidance recognizes a possible narrow exception for certain first-party anonymous aggregate audience measurement, subject to conditions and safeguards; it is not a blanket exemption for all analytics. [[46]] Keep the Umami configuration and data flows documented, and reassess if it starts using device storage, identifiers or additional processing. **Confidence: HIGH on the caveat; the site-specific status is based on the supplied facts.**

### Third-Party Checkout Is a Separate Boundary

The checkout is on Easytools, according to the supplied context. The site’s CMP controls the site’s own execution; it does not, by itself, establish what consent controls, cookies or disclosures apply on a different checkout domain. Check the checkout provider’s own setup and contractual materials separately. **Inference; confidence: HIGH.** The distinction follows from the site’s domain boundary; no independent Easytools behavior was verified.

### A Manual Inventory Can Be Better Than Unreviewed Automatic Discovery

Cookiebot’s scan-based pricing is the trigger for this project, but automated discovery and consent enforcement are different jobs. A scanner can help find unexpected requests; it cannot determine by itself whether a cookie is necessary, whether a vendor’s purpose description is accurate, or whether consent obtained was valid. **Inference; confidence: HIGH**, consistent with controller proof obligations and the limits of service-specific blocking documented by tarteaucitron. [[45, 5]]

### Self-Hosting Shifts Responsibility; It Does Not Eliminate It

Self-hosting avoids dependence on an external banner runtime or CMP backend only if the owner also takes responsibility for updates, backups where applicable, testing and consent records. Silktide and Orestbida keep consent state in the browser unless the site adds logging; CookieYes, c15t and Conzent offer more backend-oriented paths but bring server or platform choices. [[94, 119, 73, 84, 206]] **Confidence: HIGH.**

## Gaps and Open Questions

1. **Actual current cookie/storage inventory:** not independently observed. The report relies on the supplied description of Meta and PostHog and does not claim to have scanned the live site.
2. **PostHog-specific consent and withdrawal behavior:** the exact current SDK configuration, session-replay startup path and stop behavior were not independently inspected. Test the actual deployed version.
3. **Polish translation quality:** the libraries permit custom translations, but the owner should have the Polish text reviewed for clarity; software documentation cannot establish the legal accuracy of the final wording.
4. **Exact Orestbida and tarteaucitron production bundle sizes:** not established by the sources reviewed. Pin and measure the site’s actual production bundle before launch.
5. **Independent security and accessibility audits:** no independent audit evidence was established for the shortlisted libraries in the sources reviewed. Perform keyboard/screen-reader checks and monitor each project’s releases and security advisories.
6. **Retention and identifier design for the log:** choose a proportionate retention period and determine whether an opaque identifier is genuinely needed. CNIL’s general six-month recommendation concerns retaining user choices, not an automatic universal retention mandate for every consent log. [[153, 45]]
7. **Recent Polish enforcement interpretation:** the PKE statutory source and current UODO material were located, but no site-specific UODO decision about this business or its analytics stack was established. [[145, 106]]

**Bottom line:** Orestbida is the pragmatic, lowest-infrastructure replacement for this site, provided the owner adds a first-party consent log, maintains the cookie declaration, and verifies that all optional requests remain blocked before consent and after withdrawal. [[116, 119, 45]]

---

## Sources

*The report's inline `[[n]]` markers index this list — not any numbered source inventory inside the report body. It lists each distinct link the provider returned or the report linked, cited or not; a marker numbered past its end had no source.*

1. [Releases | Klaro! Documentation](https://klaro.org/docs/releases)
2. [c15t/c15t: Open-source cookie consent manager and ...](https://github.com/c15t/c15t)
3. [Kevinleary.net: Self-Hosted Cookie Consent Management](https://www.kevinleary.net/blog/self-hosted-cookie-consent-management/)
4. [GitHub - sokiicz/consentkit: Self-hosted, open-source cookie ...](https://github.com/sokiicz/consentkit)
5. [GitHub - AmauriC/tarteaucitron.js: Open-source JavaScript ...](https://github.com/AmauriC/tarteaucitron.js/)
6. [cookie-consent · GitHub Topics · GitHub](https://github.com/topics/cookie-consent)
7. [cmp · GitHub Topics](https://github.com/topics/cmp?l=javascript)
8. [c15t](https://github.com/c15t)
9. [consent-management](https://github.com/topics/consent-management?l=javascript)
10. [Awesome-Data-Privacy-Management/README.md at main · ishandutta2007/Awesome-Data-Privacy-Management](https://github.com/ishandutta2007/Awesome-Data-Privacy-Management/blob/main/README.md)
11. [GitHub - orestbida/cookieconsent: :cookie: Simple cross ...](https://github.com/orestbida/cookieconsent)
12. [Build software better, together](https://github.com/topics/klaro)
13. [consent · GitHub Topics](https://github.com/topics/consent)
14. [GitHub - cookieyes/cookieyes: Open-source cookie consent SDK ...](https://github.com/cookieyes/cookieyes)
15. [GitHub - websedit/we_cookie_consent: Cookie Consent Panel (Optin) with DSGVO/GDPR compliant use of cookies for TYPO3. Based on Klaro!.](https://github.com/websedit/we_cookie_consent)
16. [GitHub - silktide/consent-manager: Free banner for collecting consent to cookies and more](https://github.com/silktide/consent-manager/)
17. [Releases · orestbida/cookieconsent - GitHub](https://github.com/orestbida/cookieconsent/releases)
18. [Change Log](https://silktide.com/consent-manager/docs/change-log/)
19. [Releases · AmauriC/tarteaucitron.js - GitHub](https://github.com/AmauriC/tarteaucitron.js/releases)
20. [Getting Started - CookieConsent v3 - Orest Bida](https://cookieconsent.orestbida.com/essential/getting-started.html)
21. [license - silktide/consent-manager](https://github.com/silktide/consent-manager/blob/main/LICENSE)
22. [The best free cookie banner, with Google Consent Mode v2 - Silktide](https://silktide.com/consent-manager/)
23. [build: bump version to 3.2.0 · orestbida/cookieconsent@5169e90](https://github.com/orestbida/cookieconsent/commit/5169e9073a2040111b0614773304939e63826252)
24. [github.com · silktide · consent-managerconsent-manager/README.md at main · silktide/consent-manager](https://github.com/silktide/consent-manager/blob/main/README.md)
25. [tarteaucitron.js 1.32.0: dynamic loading and Matomo](https://tarteaucitron.io/en/changelog-v1-32-0-dynamic-service-loading/)
26. [tarteaucitron.js 1.36.0: OpenAI and Userflow](https://tarteaucitron.io/en/changelog-v1-36-0-openai-userflow-2/)
27. [tarteaucitron.js 1.35.0: services and Consent Mode](https://tarteaucitron.io/en/changelog-v1-35-0-services-consent-mode-security/)
28. [Activity · silktide/consent-manager - GitHub](https://github.com/silktide/consent-manager/activity)
29. [tarteaucitron.js 1.31.0: statistics, performance and accessibility](https://tarteaucitron.io/en/changelog-v1-31-0-statistics-performance-accessibility/)
30. [Report of the work undertaken by the Cookie Banner ...](https://www.edpb.europa.eu/system/files/documents/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf)
31. [EDPB adopts final report of outcome of the cookie banner task force](https://cnil.fr/en/edpb-adopts-final-report-outcome-cookie-banner-task-force)
32. [Report of the work undertaken by the Cookie Banner Taskforce](https://www.edpb.europa.eu/documents/task-force-report/report-of-the-work-undertaken-by-the-cookie-banner-taskforce_en)
33. [Chair of the European Data Protection Board](https://www.edpb.europa.eu/system/files/documents/2023-12/edpb_letter_out20230098_feedback_on_cookie_pledge_draft_principles_en.pdf)
34. [EU Cookie Banner Task Force report | PwC Switzerland](https://www.pwc.ch/en/insights/regulation/eu-cookie-banner-task-force-report.html)
35. [Privacy policy](https://uodo.gov.pl/en/1/975)
36. [The EDPB adopts a report on the outcome of the Cookie Banner ...](https://www.fedma.org/2023/01/19/the-edpb-adopts-a-report-on-the-outcome-of-the-cookie-banner-task-force/)
37. [EDPB Publishes Report of Outcome of the Cookie Banner ...](https://www.hunton.com/privacy-and-cybersecurity-law-blog/edpb-publishes-report-of-outcome-of-the-cookie-banner-taskforce)
38. [(PDF) European Data Protection Bulletin](https://www.twobirds.com/-/media/new-website-content/insights/pdfs/european-data-protection-bulletin-march-2023-final(55364624,-d-,1)(55373021,-d-,1).pdf)
39. [5 Things You Need to Know About the EDPB's Cookie Report](https://www.orrick.com/en/Insights/2023/01/5-Things-You-Need-to-Know-About-the-EDPBs-Cookie-Report)
40. [EDPB Publishes Report of Cookie Banners Taskforce](https://www.insideprivacy.com/eu-data-protection/edpb-publishes-report-of-cookie-banners-taskforce/)
41. [Dark Patterns in Cookie Banners: CNIL issues formal notice to ...](https://cnil.fr/en/dark-patterns-cookie-banners-cnil-issues-formal-notice-website-publishers)
42. [Gérer les cookies et autres traceurs sur le site internet d' ...](https://entreprendre.service-public.gouv.fr/vosdroits/F31228?lang=en)
43. [Polish cookie law: article 399 of the PKE | Katla](https://katla.app/compliance/poland)
44. [Poland cookie consent: Article 399 ECL, UKE and UODO | Kukie.io](https://kukie.io/blog/cookie-consent-poland-uodo-guidelines)
45. [Guidelines 05/2020 on consent under Regulation 2016/ ...](https://www.gov.cy/media/sites/67/2025/09/edpb_guidelines_202005_consent_en-68c26e3725968.pdf)
46. [Cookies and similar technologies](https://commission.europa.eu/resources/europa-web-guide/design-content-and-development/privacy-security-and-legal-notices/cookies-and-similar-technologies_fi)
47. [Diretrizes 05/2020 relativas ao consentimento na aceção do ...](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_pt)
48. [Pokyny č. 05/2020 k souhlasu podle nařízení 2016/679](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_cs)
49. [Lignes directrices 5/2020 sur le consentement au sens du ...](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_fr)
50. [Leitlinien 05/2020 zur Einwilligung gemäß Verordnung 2016/679](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_de)
51. [Guidelines 05/2020 on consent under Regulation 2016/679](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_en)
52. [Richtsnoeren 05/2020 inzake toestemming overeenkomstig ...](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_nl)
53. [Wytyczne 05/2020 dotyczące zgody na mocy ... - Europa](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_pl)
54. [2002/58 - EN - eprivacy directive - EUR-Lex - European Union](https://eur-lex.europa.eu/eli/dir/2002/58/oj/eng)
55. [Orientările 05/2020 - European Data Protection Board](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_ro)
56. [Documents](https://www.edpb.europa.eu/documents_en?page=7&type[guidance]=guidance)
57. [ANNEX I: From pledging to “Best practice principles” in ...](https://commission.europa.eu/document/download/45acedd8-9d80-4d0b-89b3-4ac6ce5425de_en?filename=Annex%20I%20-%20best%20practice%20principles.pdf)
58. [ePrivacy Directive: assessment of transposition, effectiveness and ...](http://publications.europa.eu/resource/cellar/1529b684-d3d0-4445-bcdb-72f5cef237bc.0001.01/DOC_1)
59. [(PDF) web services - European Data Protection Supervisor](https://www.edps.europa.eu/sites/default/files/publication/16-11-07_guidelines_web_services_en.pdf)
60. [module-consent-vanilla/docs/how-it-works.md at main](https://github.com/commercekings/module-consent-vanilla/blob/main/docs/how-it-works.md)
61. [tarteaucitron.io - GDPR Consent Management Platform & Cookie ...](https://tarteaucitron.io/en/)
62. [GitHub - klaro-org/klaro-js: Klaro Privacy Manager. An open-source, privacy-friendly & compliant consent manager for your website.](https://github.com/klaro-org/klaro-js)
63. [tarteaucitron.io Terms update: November 2026](https://tarteaucitron.io/en/terms-and-conditions-update-november-2026/)
64. [cookie-consent/CHANGELOG.md at main · 68publishers/cookie ...](https://github.com/68publishers/cookie-consent/blob/main/CHANGELOG.md)
65. [GitHub - ioweb-gr/tarteaucitron.js: Comply to the European cookie law](https://github.com/ioweb-gr/tarteaucitron.js)
66. [Vanilla Cookieconsent (orestbida/cookieconsent)](https://context7.com/orestbida/cookieconsent)
67. [build: bump version to 3.3.0 · orestbida/cookieconsent@944bb27](https://github.com/orestbida/cookieconsent/commit/944bb270df5be3732d5384d8d5e12c224468f1d1)
68. [cookieconsent_vanilla/CONTRIBUTING.md at master · Vinkdevops/cookieconsent_vanilla](https://github.com/Vinkdevops/cookieconsent_vanilla/blob/master/CONTRIBUTING.md)
69. [silverstripe-vanilla-cookieconsent/docs/configuration.md at main · pixelpoems/silverstripe-vanilla-cookieconsent](https://github.com/pixelpoems/silverstripe-vanilla-cookieconsent/blob/main/docs/configuration.md)
70. [CHANGELOG.md](https://raw.githubusercontent.com/68publishers/cookie-consent/89db05eb37a366b32e191bafe14c89441b0bde6d/CHANGELOG.md)
71. [Klaro! A Simple Consent Manager - GitHub](https://github.com/hessius/klaro)
72. [silverstripe-vanilla-cookieconsent/docs/fluent.md at main · pixelpoems/silverstripe-vanilla-cookieconsent](https://github.com/pixelpoems/silverstripe-vanilla-cookieconsent/blob/main/docs/fluent.md)
73. [cookieyes/sdk/backend at main · cookieyes/cookieyes](https://github.com/cookieyes/cookieyes/tree/main/sdk/backend)
74. [Scripts – JavaScript cookie consent | c15t](https://c15t.com/docs/frameworks/javascript/scripts)
75. [Open-Source Cookie Consent for React and Next.js](https://www.cookieyes.com/blog/react-cookie-consent-sdk/)
76. [cookieyes/sdk/core at main · cookieyes/cookieyes](https://github.com/cookieyes/cookieyes/tree/main/sdk/core)
77. [Open-Source Cookie Consent SDK for React & Next.js | CookieYes](https://developers.cookieyes.com/)
78. [Build a compatible backend · JavaScript | CookieYes for ...](https://developers.cookieyes.com/docs/core/self-host/compatible-backends)
79. [cookieyes/README.md at main · cookieyes/cookieyes](https://github.com/cookieyes/cookieyes/blob/main/README.md)
80. [c15t.com · docs · frameworksTroubleshooting - c15t.com](https://c15t.com/docs/frameworks/javascript/troubleshooting)
81. [Scripts – HTML cookie consent | c15t](https://c15t.com/docs/frameworks/html/scripts)
82. [Scripts – SvelteKit - c15t](https://c15t.com/docs/frameworks/sveltekit/scripts)
83. [createConsentRuntime – JavaScript cookie consent | c15t](https://c15t.com/docs/frameworks/javascript/api/runtime)
84. [c15t/packages/c15t at 19995c4f44adfbdd7cd80a8f25d9942afae6fba5 · c15t/c15t](https://github.com/c15t/c15t/tree/19995c4f44adfbdd7cd80a8f25d9942afae6fba5/packages/c15t)
85. [Scripts – Next.js](https://c15t.com/docs/frameworks/next/scripts)
86. [consent-management-platform/README.md at main · tagticians/consent-management-platform](https://github.com/tagticians/consent-management-platform/blob/main/README.md)
87. [GitHub - tagconcierge/consent-banner-js: A zero-dependency, lightweight (~3kB), consent platform agnostic, cookie banner for any website (compatible with Google Consent Mode).](https://github.com/tagconcierge/consent-banner-js/)
88. [cmp · GitHub Topics](https://github.com/topics/cmp?l=php)
89. [GitHub - conzent-net/oci · GitHub](https://github.com/conzent-net/oci)
90. [GitHub - tagticians/consent-management-platform](https://github.com/tagticians/consent-management-platform)
91. [Tag Pilot](https://github.com/tagconcierge)
92. [Build software better, together](https://github.com/topics/google-consent-mode)
93. [github.com · Yasaltd · cookies-openconsentcmp-GitHub - YasaLtd/Cookies-OpenConsentCMP-: OpenConsent CMP gives...](https://github.com/Yasaltd/cookies-openconsentcmp-)
94. [Documentation](https://silktide.com/consent-manager/docs/)
95. [github.com · noir-hedgehog · openConsentopenConsent/docs/PAID_CMP_COMPARISON.md at main · noir ...](https://github.com/noir-hedgehog/openConsent/blob/main/docs/PAID_CMP_COMPARISON.md)
96. [PD17 Cookie Consent Banner](https://wordpress.org/plugins/pd17-cookie-consent-banner/)
97. [consentos/README.md at master · ConsentOS/consentos](https://github.com/ConsentOS/consentos/blob/master/README.md)
98. [BestWebs Solution Products | Read 3 Reviews on G2](https://www.g2.com/sellers/bestwebs-solution)
99. [Home Page - UODO](https://uodo.gov.pl/en)
100. [Polityka prywatności](https://uodo.gov.pl/pl/1/255)
101. [EDPB](https://uodo.gov.pl/file/3474)
102. [„BIULETYN UODO ”](https://uodo.gov.pl/pl/file/5869)
103. [Legislation- Urząd Ochrony Danych Osobowych.](https://www.uodo.gov.pl/en/480)
104. [Legal acts - UODO](https://uodo.gov.pl/en/660/1464)
105. [New search engine for decisions of the President of the Personal Data Protection Office](https://bip.uodo.gov.pl/en/553/1943)
106. [Problematyka ochrony danych osobowych a pliki cookies](https://nowybiuletyn.uodo.gov.pl/problematyka-ochrony-danych-osobowych-a-pliki-cookies/)
107. [BIULETYN UODO Nr 03/01/24](https://uodo.gov.pl/pl/file/6674)
108. [Prawo](https://uodo.gov.pl/pl/p/prawo)
109. [Rozporządzenie 2016/679 (RODO) i akty towarzyszące](https://uodo.gov.pl/404)
110. [DLA OBYWATELA](https://uodo.gov.pl/pl/p/dla-obywatela)
111. [(PDF) Wytyczne 05/2020 dotyczące zgody na mocy rozporządzenia 2016 ...](https://www.uodo.gov.pl/file/3714)
112. [„BIULETYN UODO ”](https://uodo.gov.pl/pl/file/6227)
113. [Configuration Reference - CookieConsent v3 - Orest Bida](https://cookieconsent.orestbida.com/reference/configuration-reference.html)
114. [Callbacks and Events | CookieConsent](https://cookieconsent.orestbida.com/advanced/callbacks-events.html)
115. [API Reference | CookieConsent](https://cookieconsent.orestbida.com/reference/api-reference.html)
116. [How to manage scripts - CookieConsent v3 - Orest Bida](https://cookieconsent.orestbida.com/advanced/manage-scripts.html)
117. [Revision management - CookieConsent v3 - Orest Bida](https://cookieconsent.orestbida.com/advanced/revision-management.html)
118. [CookieConsent | Consent management Tool](https://cookieconsent.orestbida.com/)
119. [Consent Logging | CookieConsent](https://cookieconsent.orestbida.com/advanced/consent-logging.html)
120. [Troubleshooting - CookieConsent v3 - Orest Bida](https://cookieconsent.orestbida.com/additional/troubleshooting.html)
121. [Google consent mode | CookieConsent](https://cookieconsent.orestbida.com/advanced/google-consent-mode.html)
122. [IframeManager set-up - CookieConsent v3 - Orest Bida](https://cookieconsent.orestbida.com/advanced/iframemanager-setup.html)
123. [Releases · cookieyes/cookieyes](https://github.com/cookieyes/cookieyes/releases)
124. [Accessibility · JavaScript | CookieYes for Developers](https://developers.cookieyes.com/docs/core/accessibility)
125. [cookieyes - GitHub](https://github.com/cookieyes)
126. [Changelog | CookieYes for Developers](https://developers.cookieyes.com/docs/changelog)
127. [backend 0.1.0](https://developers.cookieyes.com/docs/changelog/2026-10-30)
128. [Build software better, together](https://github.com/cookieyes/cookieyes/security)
129. [react 0.13.3](https://developers.cookieyes.com/docs/changelog/2026-10-15)
130. [Accessibility · Next.js | CookieYes for Developers](https://developers.cookieyes.com/docs/nextjs/accessibility)
131. [Consent Articles - CookieYes](https://www.cookieyes.com/category/blog/consent/)
132. [Pull requests · cookieyes/cookieyes](https://github.com/cookieyes/cookieyes/pulls)
133. [Documentation | CookieYes for Developers](https://developers.cookieyes.com/docs)
134. [Art. 399. komunik.elektr. - Przechowywanie informacji lub ...](https://lexlege.pb.pl/prawo-komunikacji-elektronicznej/art-399)
135. [Cookies | Łatweprawko](https://latweprawko.pl/en/cookies)
136. [Data protection and cybersecurity laws in Poland](https://cms.law/en/int/expert-guides/cms-expert-guide-to-data-protection-and-cyber-security-laws/poland)
137. [Privacy policy - EPP](https://www.epp-poland.com/en/privacy-policy/)
138. [Global compliance, local risks – 8 privacy hot spots to consider in ...](https://jdp-law.pl/en/newsletter/global-compliance-local-risks-8-privacy-hot-spots-to-consider-in-poland/)
139. [Data Protected Poland](https://www.linklaters.com/insights/data-protected/data-protected---poland)
140. [E-commerce Law in Poland](https://www.dudkowiak.com/e-commerce-law-in-poland)
141. [Privacy policy](https://pronetkrakow.com.pl/en/content/2-privacy-policy-cookies-policy)
142. [Przechowywanie informacji lub uzyskiwanie dostępu ... - ustawy](https://sip.lex.pl/komunikacja-elektroniczna-cta514/przechowywanie-informacji-lub-uzyskiwanie-dostepu-do-informacji-juz-przechowywanej-w-telekomunikacyjnym-urzadzeniu-koncowym-abonenta-lub-uzytkownika-koncowego-cta3618)
143. [RODO & terms of service - Criminal Law Poland](https://criminallawpoland.com/rodo/)
144. [Data Protection Guide Poland - Multilaw](https://www.multilaw.com/Multilaw/Multilaw/Data_Protection_Laws_Guide/DataProtection_Guide_Poland.aspx)
145. [Ustawa z dnia 12 lipca 2024 r. - Prawo komunikacji ... - ISAP](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001221)
146. [Ustawa z dnia 12 lipca 2024 r. – Prawo komunikacji ... - ISAP](https://isap.sejm.gov.pl/isap.nsf/download.xsp/WDU20240001221/T/D20241221L.pdf)
147. [Prawo komunikacji elektronicznej](https://isap.sejm.gov.pl/isap.nsf/download.xsp/WDU20240001222/O/D20241222.pdf)
148. [Cookies and other tracking devices: the CNIL publishes new ...](https://www.cnil.fr/en/cookies-and-other-tracking-devices-cnil-publishes-new-guidelines)
149. [Recommandation](https://www.cnil.fr/sites/default/files/2026-01/recommandation_cookies_consolidee.pdf)
150. [Orientierungshilfe der Aufsichtsbehörden zur Verarbeitung von ...](https://www.datenschutz-berlin.de/fileadmin/user_upload/pdf/publikationen/DSK/2022/2022-DSK_OH-Werbung.pdf)
151. [Online targeted advertisement: what action plan for the ...](https://www.cnil.fr/en/online-targeted-advertisement-what-action-plan-cnil)
152. [New guidelines for the use of cookies and trackers](https://www.timelex.eu/en/blog/cnils-new-guidelines-and-recommendations-cookies-and-other-trackers)
153. [Cookies et traceurs : comment mettre mon site web en ...](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/comment-mettre-mon-site-web-en-conformite)
154. [OH_Telemedien_2021 Version_1_1_Vorlage_104_DSK_final](https://www.datenschutzkonferenz-online.de/media/oh/20221205_oh_Telemedien_2021_Version_1_1_Vorlage_104_DSK_final.pdf)
155. [CNIL Publishes Draft Recommendations on How to Get ...](https://www.hunton.com/privacy-and-cybersecurity-law-blog/cnil-publishes-draft-recommendations-on-how-to-get-users-consent-for-cookies)
156. [Cookies and other tracking devices: CNIL new guidelines](https://www.twobirds.com/en/insights/2020/france/cookies-et-traceurs-les-nouvelles-recommandations-de-la-cnil)
157. [Questions-réponses sur les lignes directrices modificatives et la recommandation « cookies et autres traceurs » de la CNIL](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ?lang=en)
158. [CNIL Issues Draft Recommendations on Cookies - Jones Day](https://www.jonesday.com/en/insights/2020/01/cnil-issues-draft-recommendations-on-cookies)
159. [Debevoise Update](https://www.debevoise.com/-/media/files/insights/publications/2020/10/20201009-french-dpa-issues-guidance-on-cookies-and.pdf)
160. [German Regulators Publish Cookie Guidance](https://www.globalpolicywatch.com/2022/01/german-regulators-publish-cookie-guidance/)
161. [DSK Orientierungshilfen - Datenschutzkonferenz](https://www.bfdi.bund.de/DE/Fachthemen/Gremienarbeit/Datenschutzkonferenz/DSK-tableOrientierungshilfe.html)
162. [consentkit/LICENSE at main · sokiicz/consentkit](https://github.com/sokiicz/consentkit/blob/main/LICENSE)
163. [Introducing OCI: Open Consent Infrastructure - Conzent](https://getconzent.com/blog/oci-launch/)
164. [openConsent/docs/COOKIE_DECLARATION.md at main · noir-hedgehog/openConsent](https://github.com/noir-hedgehog/openConsent/blob/main/docs/COOKIE_DECLARATION.md)
165. [All Workflow Runs · sokiicz/consentkit](https://github.com/sokiicz/consentkit/actions)
166. [Self-Host OCI: Open-Source Consent Platform - Conzent](https://getconzent.com/oci/self-host/)
167. [OCI — Open Consent Infrastructure](https://getconzent.com/oci/)
168. [noir-hedgehog/openConsent: Open-source consent ...](https://github.com/noir-hedgehog/openConsent)
169. [About Conzent — Free Privacy Compliance for All](https://getconzent.com/about/)
170. [oci/CHANGELOG.md at main · conzent-net/oci](https://github.com/conzent-net/oci/blob/main/CHANGELOG.md)
171. [openConsent/docs/SDK.md at main · noir-hedgehog/openConsent](https://github.com/noir-hedgehog/openConsent/blob/main/docs/SDK.md)
172. [openconsent/LICENSE at main · open-consent-web/openconsent](https://github.com/open-consent-web/openconsent/blob/main/LICENSE)
173. [Apache License 2.0](https://getconzent.com/license/)
174. [ConsentStack/cmp: Open source, developer focused & ...](https://github.com/ConsentStack/cmp)
175. [ConsentOS](https://github.com/ConsentOS)
176. [ConsentOS - privacy-first cookie consent management ...](https://github.com/consentos/consentos)
177. [consentos/LICENSE at master · ConsentOS/consentos](https://github.com/ConsentOS/consentos/blob/master/LICENSE)
178. [ConsentStack](https://github.com/ConsentStack)
179. [Terms of Service | ConsentStack](https://www.consentstack.io/terms-of-service)
180. [consent-management-platform/.gitignore at main · tagticians/consent-management-platform](https://github.com/tagticians/consent-management-platform/blob/main/.gitignore)
181. [Page 4 | Best Consent Management Platforms: User Reviews from November 2026](https://www.g2.com/categories/consent-management-platform-cmp?exec=1ba4110&order=g2_score&page=4)
182. [consentos/CHANGELOG.md at master · ConsentOS/consentos](https://github.com/ConsentOS/consentos/blob/master/CHANGELOG.md)
183. [Consent Management Platform](https://github.com/Consent-Management-Platform)
184. [consent-management-platform/cmp-config.json at main · tagticians/consent-management-platform](https://github.com/tagticians/consent-management-platform/blob/main/cmp-config.json)
185. [Language Config | CookieConsent](https://cookieconsent.orestbida.com/advanced/language-configuration.html)
186. [GitHub - core45/laravel-cookieconsent](https://github.com/core45/laravel-cookieconsent)
187. [cookie-consent/README.md at 3b3f4696cc6fa53274078bd183cb93956a3d08f2 · 68publishers/cookie-consent](https://github.com/68publishers/cookie-consent/blob/3b3f4696cc6fa53274078bd183cb93956a3d08f2/README.md)
188. [CookieConsent v3 Playground](https://playground.cookieconsent.orestbida.com/)
189. [README.md - core45/laravel-cookieconsent](https://github.com/core45/laravel-cookieconsent/blob/main/README.md)
190. [cookie-consent/README.md at main](https://github.com/68publishers/cookie-consent/blob/main/README.md)
191. [silktide-consent-manager/silktide-consent-manager.js at main · OleksandrChernysh/silktide-consent-manager](https://github.com/OleksandrChernysh/silktide-consent-manager/blob/main/silktide-consent-manager.js)
192. [Meet the all-new Silktide](https://silktide.com/blog/meet-the-all-new-silktide/)
193. [Process personal data lawfully | European Data Protection Board](https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en)
194. [Consent under GDPR:](https://www.edpb.europa.eu/system/files/2026-11/edpb_guidelines-at-a-glance_consent-regulation_en.pdf)
195. [Postal address:](https://www.edpb.europa.eu/system/files/2026-09/decision-no-3772.pdf)
196. [Draft recommendation concerning session replay tools - CNIL](https://www.cnil.fr/sites/default/files/2026-02/recommendation_draft_session_replay.pdf)
197. [Key Takeaways From The Cookie Banner Taskforce Report](https://www.legal500.com/intelligence/european-union/privacy/key-takeaways-from-the-cookie-banner-taskforce-report)
198. [(PDF) Recommandation proposant des modalités pratiques de mise en ...](https://dpo-india.com/Resources/CNIL&France/Recommendation-Proposing-Practical-Measures-Compliance-Case-Use'Cookies-Trackers.pdf)
199. [FAQ | Data protection guide for small business | European Data ...](https://www.edpb.europa.eu/sme/find-practical-info/faq_sk?page=1)
200. [Consistency between Data protection Authorities on Cookies - CMS](https://cms.law/en/ita/publication/consistency-between-data-protection-authorities-on-cookies)
201. [Frequently Asked Questions - European Data Protection Board](https://www.edpb.europa.eu/contact/frequently-asked-questions_en?page=2)
202. [Opinion 08/2024 on Valid Consent in the Context of Consent ...](https://www.edpb.europa.eu/system/files/documents/2024-04/edpb_opinion_202408_consentorpay_en.pdf)
203. [The President - European Data Protection Board](https://www.edpb.europa.eu/system/files/2026-07/decision3395-1.pdf)
204. [Guidelines 06/2020 on the interplay of the Second Payment ...](https://www.edpb.europa.eu/system/files_en?file=consultation/edpb_guidelines_202006_interplaypsd2andgdpr.pdf)
205. [Consent under GDPR: When to act and what to do - edpb.europa.eu](https://www.edpb.europa.eu/system/files/2026-04/edpb-summary-consent_en.pdf)
206. [Install Conzent OCI on Your Website | Docker Guide](https://getconzent.com/docs/)
207. [Custom Domain & HTTPS — Conzent](https://getconzent.com/docs/custom-domain/)
208. [oci/docs/README.md at main · conzent-net/oci](https://github.com/conzent-net/oci/blob/main/docs/README.md)
209. [Conzent for Enterprise: WCAG AA, Self-Hosting, DPAs](https://getconzent.com/enterprise/)
210. [Trust & Transparency at Conzent | Data & Privacy](https://getconzent.com/trust/)
211. [Backup & Restore Conzent OCI | Documentation](https://getconzent.com/docs/backup-restore/)
212. [Customisation](https://getconzent.com/features/cookie-banner/)