---
provider: "youcom"
model: "you.com/deep+free-form"
brief: "brief-pplx-funnel-open-source-cookie-consent.md"
duration_ms: 93546
cost_usd: 0.1
truncated: False
citation_scheme: "unified"
---

# Research Results: brief-pplx-funnel-open-source-cookie-consent

**Provider:** youcom (you.com/deep+free-form)

---

# `brief-pplx-funnel-open-source-cookie-consent.md`

## Executive Summary

For `agents.creativesparks.pl`, the strongest practical replacement for Cookiebot is **tarteaucitron.js**, self-hosted from the Astro build and configured manually for Meta Pixel, Meta Conversions API, and PostHog. It is MIT-licensed, actively released, supports category/service-level blocking, iframe placeholders, consent callbacks, Polish customisation, and Google Consent Mode v2 for future use. [[1]] [[2]] [[3]] 

The main alternative is **Silktide Consent Manager**: MIT-licensed, client-side, accessible, lightweight, self-hostable, and equipped with callbacks and consent-state APIs. However, the available documentation does not establish a central consent log, automatic cookie scanner, or Polish translation catalogue. [[4]] [[5]]

**Klaro** remains technically capable and particularly easy to migrate from because its blocking model resembles the current Cookiebot markup (`type="text/plain"` plus data attributes). Its weaknesses are the absence of Polish in the documented built-in translations and a relatively quiet upstream project: the latest documented official release is v0.7.21 from March 2024, while the repository search result reports a latest push in March 2025. [[6]] [[7]]

**c15t** is the most technically ambitious candidate: it advertises Astro 6 support, consent-aware integrations for Meta and PostHog, 53 translations, server-side adapters, and consent records. It is Apache-2.0 licensed. However, its documentation is newer, its ecosystem is more complex, and its strongest logging/dashboard features are connected to the Inth service rather than being clearly equivalent to a simple self-hosted static deployment. Treat it as promising but not the lowest-maintenance choice. [[8]] [[8]] 

No consent library makes a website legally compliant by itself. The owner remains responsible for identifying every tracker, classifying purposes correctly, preventing pre-consent requests, retaining evidence of the interface and choices shown, and ensuring withdrawal actually stops future processing. The EDPB explicitly places the burden of demonstrating consent on the controller. [[9]] [[10]]

**Recommendation:** deploy tarteaucitron.js locally, with two optional categories:

- Statistics: PostHog Cloud EU session recording and heatmaps.
- Marketing: Meta Pixel and Meta Conversions API.

Keep Umami outside the consent gate only after documenting that its actual configuration remains cookie-free and does not create comparable tracking identifiers. [UNVERIFIED: the exact current Umami configuration and PostHog persistence settings on this website were not inspected.]

---

## Phase 1 — Landscape of Open-Source Consent Tools

### Candidate Table

| Candidate | Licence / model | Maintenance evidence | Blocking and APIs | Polish / English | Logging, size, users | Assessment |
|---|---|---|---|---|---|---|
| **tarteaucitron.js** | MIT; self-hosted JavaScript library, with separate paid Pro service | Official repository shows frequent 2025 releases, including v1.34.0 and security fixes for ReDoS; npm reports v1.37.0 in 2026. [[2]] [[11]]| Service catalogue, disabled-by-default loading, placeholders, callbacks, iframe and script handling; `dataLayer` and Consent Mode support. It does not automatically block scripts merely because the library is installed. [[1]]| English is included; Polish availability was not verified. Custom translations are supported. [UNVERIFIED] | Large service catalogue; a third-party technical comparison measured approximately 138 KB raw. [[12]]| Strongest operational fit where a catalogue and active maintenance matter more than minimum bytes. |
| **Silktide Consent Manager** | MIT; self-hosted JS/CSS | GitHub reports active 2025–2026 maintenance and only four open issues in the retrieved repository view. [[4]] [[13]]| Automatic script injection after consent, callbacks, `getConsentChoice()`, `getAcceptedConsents()`, and GTM/Consent Mode integration. Revocation causes reload to remove injected scripts. [[4]]| English documented; arbitrary text configuration. Polish built-in support not verified. [UNVERIFIED] | Lightweight claim is vendor-originated; no central consent log or scanner is documented in the repository material. [[4]] [[14]]| Excellent simple banner; requires an external logging and audit process. |
| **Klaro** | BSD-3-Clause; self-hosted library; optional commercial service | 832 commits and a large user base are visible in GitHub; official releases page documents v0.7.21 on 26 March 2024. [[6]] [[7]]| Strong attribute-based blocking for scripts; contextual consent for iframes; `getConsent()`, watchers, callbacks, cookie deletion, and manual `klaro.show()`. [[15]] [[16]]| English plus many European languages, but Polish is absent from the documented built-in list. [[6]]| Official README claims 57 KB minified/gzipped including styles and translations. No built-in audit log in the open-source frontend is documented. [[6]]| Very good migration fit, but upstream quietness and missing Polish reduce confidence. |
| **CookieConsent by Orest Bida** (`vanilla-cookieconsent`) | MIT; self-hosted, dependency-free library | v3.1.0 was released 4 February 2025; npm reports zero dependencies and 44 versions. [[17]] [[18]]| Category/attribute-based gating and callbacks; API details are documented by the project. [[17]]| English and configurable translations; Polish was not verified. [UNVERIFIED] | npm lists approximately 149 KB package size, but this is not a transferred or gzipped size. [[19]]| Good library, but it does not provide a cookie scanner or central consent evidence system. |
| **c15t** | Apache-2.0; open-source packages with optional Inth-hosted backend | Repository activity is very recent, with active pull requests and releases in 2026. [[8]] [[20]]| Consent-gated scripts, vendor integrations, Astro adapter, browser/headless modes, Meta and PostHog integrations, and Consent Mode v2. [[8]]| Project claims 53 languages; Polish must be checked in the actual translation package. [VENDOR: c15t] [[8]]| Claims policy-versioned records and an Inth dashboard; exact self-hosted audit-log deployment is unclear. [[8]]| Technically attractive for Astro, but comparatively new and potentially tied to Inth for the most valuable CMP features. |
| **Consenti** | Apache-2.0; optional self-hosted Node backend and browser-only mode | Repository and website describe active development in 2026; the project explicitly identifies itself as single-maintainer. [[21]] [[22]]| Frontend widget, granular categories, events, GPC, i18n, script/plugin API, optional backend, scanner, audit log, exports, and SQLite/Postgres support. [[21]]| BCP-47 i18n is documented; Polish support was not independently verified. [UNVERIFIED] | Optional append-only audit log and admin dashboard; Node 20+ backend is required for server storage. [[21]]| Most complete self-hostable platform found, but greater operational complexity and single-maintainer risk are inappropriate unless audit logging is a priority. |
| **ConsentOS** | Elastic License 2.0, source-available rather than OSI-approved; self-hosted Docker platform | Public repository exists, but maintenance and security-response history were not independently established. [UNVERIFIED] | Claims auto-blocking of script creation, cookie writes and storage APIs; scanner, audit trails and dashboard. [[23]]| [UNVERIFIED] | Claims approximately 2 KB loader plus 26 KB bundle; requires Docker, Node, Python and persistent services. [[23]]| Excluded from the OSI-open-source shortlist because ELv2 is source-available, not an OSI-approved licence. |
| **ConsentKit** | MIT; static widget plus optional Node/PHP logging server | Repository is visible and apparently active in 2026, but maintainer depth and vulnerability history are not established. [UNVERIFIED] | Claims pre-blocking, Shadow DOM, GCM v2, versioned consent, event signalling and optional timestamped logging. [[24]]| English and Czech built in; Polish not documented. [[24]]| Claims under 10 KB gzipped and local/SQLite/CSV logging. These are project claims, not independent measurements. [[24]]| Interesting small-site option, but too little independent evidence for a regulator-facing recommendation. |
| **Osano Cookie Consent** | MIT; self-hosted banner library; hosted product separate | The repository says Osano maintains it, but the same README says the open-source version requires developers to build callbacks, storage and blocking themselves. [[25]]| Banner and callbacks; full blocking, multilingual support, blockchain consent storage and dashboard belong to the hosted service, not necessarily the open-source package. [[25]]| Hosted service claims 38 languages; open-source language coverage is not equivalent. [VENDOR: Osano] | No suitable open-source audit trail documented. | Excluded: it is primarily a notice UI, not a complete blocker for this migration. |
| **Orejime** | Open-source JavaScript fork focused on accessibility | Maintainer activity and current releases were not established from primary sources. [UNVERIFIED] | Fork of Klaro with purpose/service consent and accessibility focus. [[26]]| [UNVERIFIED] | [UNVERIFIED] | Excluded pending proof of current maintenance and Polish support. |
| **Haven** | Open-source TypeScript consent manager | Public project exists, but current release cadence and security response were not established. [UNVERIFIED] | Advertises a full-featured consent manager for JavaScript frameworks. [[26]]| [UNVERIFIED] | [UNVERIFIED] | Excluded because evidence is too thin. |
| **grrr-amsterdam cookie-consent** | MIT; JavaScript utility | Repository exists, but current release frequency was not established. [UNVERIFIED] | Conditional scripts, iframes and elements; `getPreferences()` API. [[27]]| [UNVERIFIED] | [UNVERIFIED] | Useful technical primitive, not a documented full CMP. |
| **68publishers cookie-consent** | MIT; Orest Bida wrapper with GTM/CMP integration | Repository activity appears old in the retrieved result. [UNVERIFIED] | WCAG 2 support, storage synchronisation, GTM and CMP integration. [[28]]| Default translations; Polish not verified. | Optional CMP application integration; no evidence of an independent current backend. | Excluded as a wrapper with unclear maintenance. |
| **tagconcierge/consent-banner-js** | MIT; dependency-free banner | v2.0.0 released 2 September 2025. [[29]]| Approx. 3 KB claim, callbacks and consent-state object; script blocking must be built by the integrator. [[29]]| Configurable text; Polish must be written manually. | No audit log or scanner. | Too primitive for the requested migration unless the owner accepts building the compliance layer. |
| **jamestomasino cookieconsent** | Open-source, dependency-free GCM banner | Repository describes a current implementation but not a full CMP. [[30]]| LocalStorage, versioned consent envelope, public API and GCM v2. | [UNVERIFIED] | Explicitly lacks TCF, vendor lists, consent records, scanning and proof workflows. [[30]]| Excluded. |
| **Klaxit cookie-consent** | MIT | Repository was archived on 24 December 2025. [[31]]| Events and category state existed. [[31]]| [UNVERIFIED] | [UNVERIFIED] | Excluded as archived. |
| **Osano original npm package** | MIT | Third-party repository data identifies last release in 2019 and no recent commits. [[32]]| Primarily notice UI. | [UNVERIFIED] | [UNVERIFIED] | Excluded as unmaintained. |

### Shortlist and Exclusions

1. **tarteaucitron.js — recommended:** active releases, MIT licence, service catalogue, script and embed controls, callbacks, and future Consent Mode support. [[1]] [[2]] 
2. **Silktide Consent Manager — best lightweight alternative:** strong accessibility and simple API, but evidence of central logging is absent. [[4]] 
3. **Klaro — best migration similarity:** existing Cookiebot-style inert script tags can be adapted directly, but Polish and maintenance are concerns. [[6]] [[15]] 
4. **c15t — best Astro-oriented modern option:** native Astro adapter and vendor integrations, but newer architecture and possible hosted-backend dependence increase risk. [[8]] 
5. **Consenti — best full self-hosted platform:** optional audit log, dashboard, scanner and database, but it introduces a Node service and single-maintainer dependency. [[21]]

---

## Phase 2 — Shortlist Deep-Dives

### 1. tarteaucitron.js

#### Compliance behaviour

The library supports accept, deny and customisation controls, with `DenyAllCta`, `AcceptAllCta`, `highPrivacy`, `serviceDefaultState: "wait"`, and granular service-level settings. These settings can implement first-layer accept/reject parity, but the configuration must be tested visually; the library’s existence does not guarantee compliant design. [[1]] 

Use:

- `highPrivacy: true`;
- `serviceDefaultState: "wait"`;
- `DenyAllCta: true`;
- equal-sized and equally prominent accept/reject controls;
- all optional services disabled before affirmative consent;
- a permanent footer “Ustawienia cookies / Cookie settings” link or visible icon.

The EDPB task force says pre-ticked boxes are invalid, reject/refuse must be available, dark patterns must be avoided, and withdrawal must be as easy as consent. [[33]]

#### Proof of consent

The open-source library stores a browser-side consent state, but the retrieved documentation does not establish a regulator-ready central log containing a consent ID, timestamp, rendered policy version, IP minimisation strategy, and complete choice history. [UNVERIFIED]

For this small site, implement a minimal first-party consent record:

```json
{
  "consent_id": "random-uuid",
  "timestamp": "2026-11-11T09:57:00Z",
  "policy_version": "2026-11-11",
  "locale": "pl",
  "choices": {
    "statistics": false,
    "marketing": true
  }
}
```

Store the current choice locally to enforce it. Send a pseudonymised event to a Vercel server route or another first-party endpoint only if the owner accepts the additional personal-data processing and documents it. Do not collect a raw IP merely because the logging endpoint makes it technically available.

EDPB Guidelines 05/2020 allow controllers to choose their own evidence method, but require evidence of how, when and based on what information consent was obtained; merely showing the current website configuration is insufficient. [[9]]

#### Cookie declaration

tarteaucitron has service definitions containing cookie information and purposes, but the site owner must still create and review the policy. [[34]] 

Maintain a version-controlled table:

| Service | Category | Cookies / storage | Purpose | Retention | Third parties |
|---|---|---|---|---|---|
| Meta Pixel | Marketing | `_fbp`, browser storage, network identifiers | Advertising measurement and remarketing | Confirm from current Meta documentation | Meta |
| PostHog Cloud EU | Statistics | PostHog cookies/localStorage, session recording data | Product analytics, heatmaps and recordings | Confirm project configuration | PostHog |
| Umami | Necessary or statistics only if justified | Confirm actual storage | Aggregate analytics | Confirm configuration | Self-hosted Umami |

The EDPB warns that “essential” classification is difficult and changes as services change; the website owner must maintain the list. [[33]]

#### Script blocking and events

tarteaucitron provides service-level loaders and callbacks. Custom Meta and PostHog services can be declared with `needConsent: true`, a service type, cookie patterns, a JavaScript loader, and a fallback. [[34]] 

The Meta Lead event must be called only from the marketing-consent callback:

```js
function fireMetaLead() {
  if (window.tarteaucitron &&
      tarteaucitron.state &&
      tarteaucitron.state.meta_pixel === true) {
    window.fbq?.('track', 'Lead');
  }
}
```

[UNVERIFIED: the exact current public state property and callback names should be confirmed against the pinned tarteaucitron version before deployment.]

For Meta Conversions API, consent must also gate the server route. A browser-side consent flag is not sufficient if the route can be called independently from a page without validating the current consent state. [UNVERIFIED: the site’s current CAPI route implementation was not inspected.]

#### Security and maintenance

The project has a visible security policy and recent security releases, including a ReDoS fix and a security fix concerning cookie deletion. [[2]] Self-hosting avoids runtime dependence on a third-party CDN, but creates a patching responsibility. Pin the exact version, commit the built assets, use Subresource Integrity only if loading from an external immutable URL, and review dependency changes before upgrades.

#### Accessibility and performance

The project documents accessibility controls, including placing the banner near the top of the document for accessibility and providing a persistent settings icon. [[1]] Its service catalogue is substantially larger than a bespoke two-category banner, so it is unlikely to be the smallest option. A third-party source measured approximately 138 KB raw; measure the actual production bundle after tree-shaking and compression. [[12]]

#### Astro implementation

Add the self-hosted script and configuration in the shared layout before any optional script. Preserve the Cookiebot migration pattern only where compatible; tarteaucitron’s preferred model is service registration rather than merely changing `type`.

For Astro:

1. Put the tarteaucitron loader in the base layout.
2. Register Meta and PostHog as explicit services.
3. Remove or inert the original vendor tags.
4. Fire page-level conversion code from a consent callback.
5. Test every static example HTML file separately; Astro layout changes do not automatically protect standalone files.

---

### 2. Silktide Consent Manager

Silktide offers granular consent types, automatic script injection, callbacks, accessibility features, and a public state API. [[4]] 

Its strengths are:

- MIT licence;
- no account or page limit in the documented open-source implementation;
- direct customisation;
- keyboard navigation, focus trapping and ARIA labels;
- `getConsentChoice()` and `getAcceptedConsents()`;
- explicit `onAccept` and `onReject` hooks. [[4]] 

Its weaknesses are:

- no documented automatic cookie crawler;
- no documented central evidence database;
- no documented Polish translation package;
- custom integration is required for Meta Conversions API;
- scripts are injected after consent, so revocation may require a reload to ensure all vendor state is removed. [[4]] 

For this site, Silktide would be easy to implement:

```js
{
  id: "statistics",
  required: false,
  defaultValue: false,
  onAccept: () => startPostHog(),
  onReject: () => stopPostHog()
}
```

However, the owner would need to build the consent log and cookie inventory independently. That is acceptable for a technically controlled site, but less suitable for an owner who wants Cookiebot-like operational assurance.

**Confidence:** HIGH for the documented client-side API; MEDIUM for accessibility because the evidence is primarily project documentation; LOW for Polish built-in translations and central record keeping.

---

### 3. Klaro

Klaro is the most natural conceptual migration from Cookiebot. It supports inert script tags using `type="text/plain"`, moves the real source to `data-src`, restores the original type through `data-type`, and associates the tag with a configured service. [[6]] 

Example:

```html
<script
  type="text/plain"
  data-type="text/javascript"
  data-name="posthog"
  data-src="/posthog-init.js">
</script>
```

Klaro exposes `getConsent()`, watchers, `updateConsent()`, `resetConsents()`, and manual opening through `klaro.show()`. It can also block contextual iframe content and delete configured cookies after withdrawal. [[15]] [[16]] 

Advantages:

- closest to the current Cookiebot migration model;
- BSD-3-Clause;
- self-hostable;
- iframe/contextual consent support;
- cookie-pattern deletion;
- well-defined JavaScript API;
- documented bundle size of 57 KB minified/gzipped for the full build. [[6]] 

Disadvantages:

- Polish is not among the documented built-in languages. [[6]]
- The official release page’s latest documented release is March 2024. [[7]]
- No robust open-source central consent audit log is documented.
- The owner must manually declare services and maintain cookie patterns.
- A Drupal integration demonstrates that automatic attribution and unknown-resource blocking can be experimental and can miss or conflict with other resource loaders. [[35]] [[36]] 

Klaro would be a good engineering choice if the project already used it or if migration minimalism dominated. For a new deployment in 2026, tarteaucitron’s release activity is the stronger maintenance signal.

---

### 4. c15t

c15t is the strongest framework-oriented candidate. Its repository documents Astro 5, 6 and 7 adapters, plain HTML support, headless runtime support, consent-aware loaders for Meta and PostHog, 53-language translations, Google Consent Mode v2 and consent records. [[8]] 

It also claims:

- Apache-2.0 licence;
- policy-based regional behaviour;
- SSR-compatible consent resolution;
- vendor integrations;
- Node SDK;
- Astro-specific package;
- audit and policy features through Inth. [[8]] [[8]] 

This is attractive for the site because the requested framework is Astro 6 and the required vendors are Meta and PostHog. The central concern is architectural complexity: a small static site would gain a large ecosystem, but may still need an Inth account or backend for the documented consent-record dashboard. The open-source browser package and the hosted audit layer should not be treated as equivalent without verifying the actual licence and deployment instructions.

The repository is recent, so there is less long-term evidence than for tarteaucitron or Klaro. [UNVERIFIED: independent accessibility audits, production security history, exact self-hosted record-storage implementation, and Polish translation quality were not established.]

**Decision:** retain as a pilot candidate, not the default recommendation.

---

### 5. Consenti

Consenti is the best candidate if the business specifically requires a self-hosted audit dashboard. It offers a browser widget, optional Node API, SQLite/Postgres/Mongo/MySQL options, append-only audit logs, export, administrative roles, scanner support and event lifecycle hooks. [[21]] 

The trade-off is operational:

- Node 20+ backend;
- persistent storage;
- authentication and patching;
- database backups;
- one-maintainer risk explicitly acknowledged by the project. [[21]] 

For a 15-page static site, this is likely more infrastructure than necessary. It becomes attractive if consent evidence must be centralised and the owner already operates a private backend.

---

## What EU Regulators Require of a Small Website

### Banner Design and Withdrawal

The EDPB task force distinguishes:

- national law implementing Article 5(3) ePrivacy for storing or reading device information;
- GDPR for subsequent personal-data processing. [[33]] 

The practical baseline is:

1. No optional script, pixel, storage or embed before consent.
2. No pre-ticked optional categories.
3. Clear purpose descriptions.
4. Granular category choices.
5. A first-layer reject option whenever an accept option is offered.
6. Equal prominence and equivalent effort for accept and reject.
7. Withdrawal available at any time and no harder than consent.
8. No cookie wall for this website.
9. No “legitimate interest” shortcut for placing non-essential cookies. [[33]] 

The EDPB’s task-force report is a minimum common denominator, not a complete legal safe harbour; national rules continue to apply. [[10]] 

France’s CNIL recommends accept and refuse controls at the same level, granular purposes, retained evidence of consent and refusal, and a visible withdrawal mechanism. It also recommends preserving choices for approximately six months so users are not repeatedly prompted. [[37]] [[38]] 

Germany’s DSK similarly expects clear, complete information, equivalent accept/reject choices, granular consent and withdrawal without additional effort. [[39]] [[40]] 

Poland’s electronic communications framework changed in 2024. Current secondary sources identify Article 399 of the Electronic Communications Law as requiring advance information and consent before storing or reading non-essential information on terminal equipment, with UKE responsible for the electronic-communications rule and UODO responsible for GDPR processing. [[41]] [[42]]

### Proof of Consent

The owner should retain:

- consent ID;
- date and time;
- language and country/region logic used;
- policy/configuration version;
- exact category choices;
- services covered by each category;
- banner and preference-centre text or a versioned snapshot;
- withdrawal and subsequent changes;
- technical evidence that optional scripts were blocked before consent.

EDPB Guidelines 05/2020 state that the controller must be able to demonstrate consent and should be able to show how consent was obtained, when it was obtained and what information was presented. [[9]] 

A browser cookie alone is useful for enforcement but is weak as audit evidence: it can show the current state, not necessarily what the user saw when choosing. Store a versioned policy/configuration file in Git and log changes. For this small business, a first-party server route writing append-only JSONL or SQLite is sufficient if it is secured, backed up and documented. [UNVERIFIED: the lawful retention period and exact identity-linking design should be confirmed with legal advice.]

### Cookie Declaration

Cookiebot’s automatic crawl is a convenience, not a legal requirement. The owner should run a repeatable manual or CI audit:

1. Open a clean browser profile.
2. Visit every real page and standalone HTML example.
3. Test no choice, reject all, statistics only, marketing only, and accept all.
4. Record cookies, localStorage, sessionStorage, network hosts, iframes and dynamically created scripts.
5. Compare observed resources with the version-controlled service registry.
6. Update the cookie declaration and policy.
7. Repeat after every new marketing or analytics change.

The EDPB specifically notes that automated tools can list cookies but cannot determine their essentiality by themselves; the site owner must document the purpose. [[33]]

---

## Phase 3 — Recommendation and Migration Outline

### Recommendation

Choose **tarteaucitron.js**, self-hosted and pinned to a reviewed release.

It beats the alternatives because:

- it has current release and security evidence;
- it is MIT licensed;
- it supports service-level rather than merely banner-level consent;
- it handles scripts and embeds;
- it has callbacks for Meta Lead and PostHog initialisation;
- it supports future Consent Mode v2;
- it avoids Cookiebot’s page-count crawler pricing;
- it can be customised in Polish and English even if Polish is not a built-in language;
- it does not require a recurring SaaS account.

The owner gives up:

- automatic Cookiebot scanning and declarations;
- vendor-maintained legal configuration;
- a ready-made central consent dashboard;
- automatic updates to third-party cookie metadata;
- vendor support and a contractual service layer.

This is an engineering recommendation, not a statement that tarteaucitron is “certified” or automatically legally compliant.

### Minimum Compliance Setup

Create a repository-owned consent manifest:

```js
export const consentConfig = {
  version: "2026-11-11",
  categories: {
    statistics: ["posthog"],
    marketing: ["meta-pixel", "meta-capi"]
  }
};
```

Add:

- Polish and English banner text;
- equal accept/reject controls;
- category-level settings;
- permanent footer withdrawal link;
- versioned privacy/cookie policy;
- consent record endpoint or documented local-only evidence strategy;
- six-month minimum remembered-choice target for French visitors, with a shorter or equivalent re-consent policy if the business prefers;
- immediate re-consent when purposes, vendors or material processing changes;
- tests for all 15 pages and standalone example HTML;
- deletion or suppression of existing optional cookies after withdrawal.

### Migration Outline

1. **Inventory**
   - List every Cookiebot-managed script, iframe, inline snippet and server-side CAPI call.
   - Identify requests made before the banner appears.
   - Confirm whether PostHog uses cookies, localStorage, or memory persistence.
   - Confirm whether Meta CAPI is triggered independently of browser marketing consent.

2. **Pin and self-host**
   - Install tarteaucitron from npm or download a reviewed release.
   - Commit the exact JS, CSS, service definitions and licences.
   - Do not use an unversioned CDN URL.

3. **Define purposes**
   - `statistics`: PostHog session recordings and heatmaps.
   - `marketing`: Meta Pixel and Meta Lead/CAPI.
   - `necessary`: consent storage and site operation only.

4. **Configure neutral UI**
   - Polish default for Polish pages; English for English pages.
   - Use “Akceptuj wszystkie”, “Odrzuć wszystkie”, “Dostosuj ustawienia”.
   - Make accept and reject equal in size, contrast, location and click count.

5. **Migrate tags**
   - Remove Cookiebot attributes.
   - Register Meta and PostHog as tarteaucitron services.
   - Ensure the vendor source is absent from the initial HTML or is inert.
   - Gate iframes and any third-party embeds.

6. **Wire events**
   - On statistics consent, initialise PostHog.
   - On marketing consent, initialise Meta Pixel.
   - Fire the Meta Lead event only after verifying marketing consent.
   - Reject or ignore CAPI requests when marketing consent is absent.

7. **Implement withdrawal**
   - Link the footer to `tarteaucitron.userInterface.openPanel()` or the version-specific equivalent. [UNVERIFIED: confirm exact API in the pinned release.]
   - Delete/suppress controlled cookies and prevent reinitialisation.
   - Reload the page after withdrawal if necessary to remove vendor code safely.

8. **Add evidence**
   - Store the manifest version and consent choices.
   - Keep append-only server logs if central evidence is required.
   - Avoid storing raw IP addresses unless justified and documented.

9. **Run tests**
   - Fresh browser: no optional cookies or vendor network calls.
   - Reject all: no Meta or PostHog calls.
   - Statistics only: PostHog works; Meta does not.
   - Marketing only: Meta works; PostHog does not.
   - Withdrawal: future calls stop and controlled cookies are removed.
   - Navigate between Astro pages and test every static HTML example.

10. **Remove Cookiebot**
    - Delete the Cookiebot script and dashboard configuration only after confirming equivalent blocking.
    - Keep a dated export/screenshot of the old configuration for migration records.

### Risks and Monitoring

- New scripts can bypass the consent registry.
- Astro server routes can send data without browser consent if not guarded.
- Meta or PostHog may change cookies, endpoints or SDK behaviour.
- A library update can alter markup, callbacks or cookie deletion.
- Consent logs can themselves become personal-data processing.
- Standalone HTML files may not inherit the Astro layout.
- Accessibility must be retested after visual customisation.
- The owner should perform a quarterly tracker scan and an immediate audit before launching any new advertising, chat, video or form provider.

---

## Orphan Topics

### Consent is not limited to cookies

The EDPB task-force report discusses cookies, but modern tracking can also use localStorage, sessionStorage, pixels, fingerprinting and dynamically created network requests. A “cookieless” configuration is not automatically exempt. [UNVERIFIED: the retrieved EDPB 2023 material is focused on cookies; the exact application to every PostHog mode should be reviewed against current EDPB technical-scope guidance.]

### Cross-domain checkout

Easytools is a separate domain. Consent given on `agents.creativesparks.pl` should not automatically be assumed to cover tracking performed on the Easytools checkout domain. The checkout operator must provide its own lawful consent mechanism unless there is a documented, lawful and technically reliable shared-consent arrangement. [UNVERIFIED: Easytools’ current processor/controller roles and checkout tracking configuration were not examined.]

### Server-side Meta Conversions API

Server-side conversion calls can be overlooked because they do not set browser cookies. If the event is based on a marketing identifier or a browser action collected through a marketing tool, the server route must still respect the marketing consent decision. [UNVERIFIED: the precise legal basis and data flow of the current CAPI implementation require code and data-flow review.]

### Self-hosting changes the security model

Self-hosting removes dependence on a CMP CDN but transfers responsibility for patching, integrity, backups, uptime and incident response to the site owner. The safest approach is to pin versions, use Dependabot/Renovate, review release notes, and run browser regression tests after upgrades.

---

## Gaps and Open Questions

- [UNVERIFIED] Exact Polish translation availability in tarteaucitron.js, Silktide, c15t, Consenti and ConsentKit.
- [UNVERIFIED] Exact production bundle sizes after Astro tree-shaking and Brotli compression.
- [UNVERIFIED] Current PostHog Cloud EU persistence and session-recording configuration.
- [UNVERIFIED] Current Meta Pixel and Meta Conversions API data flows and identifiers.
- [UNVERIFIED] Whether the site’s Vercel server routes can provide durable, backed-up consent logging without introducing unnecessary personal-data collection.
- [UNVERIFIED] Exact tarteaucitron callback/state API names for the pinned release.
- [UNVERIFIED] Whether all static example HTML files are served through the same headers and layout as Astro pages.
- [UNVERIFIED] Current UODO or UKE enforcement position specifically on this website’s planned server-side consent-log design.
- [UNVERIFIED] Independent WCAG 2.1/2.2 audit results for each shortlisted library.
- [UNVERIFIED] Whether c15t’s audit records can be fully self-hosted without Inth and without recurring charges.
- [UNVERIFIED] Whether Consenti’s single-maintainer model has received an independent security review.

The recommendation should therefore be implemented only after a short technical audit of the deployed site and a browser-network test matrix.

---

## Sources

*The report's inline `[[n]]` markers index this list — not any numbered source inventory inside the report body. It lists each distinct link the provider returned or the report linked, cited or not; a marker numbered past its end had no source.*

1. [GitHub - AmauriC/tarteaucitron.js: Open-source JavaScript cookie consent manager for GDPR / RGPD. Customizable banner, service-level controls and Google Consent Mode v2 support. · GitHub](https://github.com/AmauriC/tarteaucitron.js/)
2. [Releases · AmauriC/tarteaucitron.js · GitHub](https://github.com/AmauriC/tarteaucitron.js/releases)
3. [tarteaucitron.js/LICENSE at master · AmauriC/tarteaucitron.js · GitHub](https://github.com/AmauriC/tarteaucitron.js/blob/master/LICENSE)
4. [GitHub - silktide/consent-manager: Free banner for collecting consent to cookies and more · GitHub](https://github.com/silktide/consent-manager)
5. [consent-manager/LICENSE at main · silktide/consent-manager · GitHub](https://github.com/silktide/consent-manager/blob/main/LICENSE)
6. [GitHub - kiprotect/klaro: Klaro Privacy Manager. An open-source, privacy-friendly & compliant consent manager for your website. · GitHub](https://github.com/kiprotect/klaro)
7. [Releases](https://klaro.org/docs/releases)
8. [GitHub - c15t/c15t: Open-source cookie consent manager and GDPR cookie banner for React, Next.js, Vue and JavaScript. Google Consent Mode v2 and IAB TCF. · GitHub](https://github.com/c15t/c15t)
9. [adopted 1 Guidelines 05/2020 on consent under Regulation 2016/679 Version 1.1](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_202005_consent_en.pdf)
10. [Report of the work undertaken by the Cookie Banner Taskforce](https://www.edpb.europa.eu/our-work-tools/our-documents/other/report-work-undertaken-cookie-banner-taskforce_en)
11. [tarteaucitronjs - npm](https://www.npmjs.com/package/tarteaucitronjs)
12. [architecture patterns worth adopting from tarteaucitron.js and vanilla-cookieconsent · Issue #33 · tariktunc/blakfy-cookie · GitHub](https://github.com/tariktunc/blakfy-cookie/issues/33)
13. [silktide repositories · GitHub](https://github.com/orgs/silktide/repositories?type=all)
14. [Conzent vs Silktide Consent Manager](https://getconzent.com/vs/silktide/)
15. [API - Javascript API](https://klaro.org/docs/api/js_api)
16. [Integrate Klaro Consent Management](https://www.fabian-kleiser.de/blog/integrate-klaro-consent-management/)
17. [GitHub - orestbida/cookieconsent: :cookie: Simple cross-browser cookie-consent plugin written in vanilla js · GitHub](https://github.com/orestbida/cookieconsent/)
18. [vanilla-cookieconsent 3.1.0 on npm - Libraries.io - security & maintenance data for open source software](https://libraries.io/npm/vanilla-cookieconsent)
19. [vanilla-cookieconsent](https://npm.io/package/vanilla-cookieconsent)
20. [c15t · GitHub](https://github.com/c15t)
21. [GitHub - santoshe61/consenti: GDPR, CCPA, TCF, and GPC compliant Open-Source Cookie Consent management platform. Works with any stack. Admin dashboard included. Backend optional. Zero Dependencies · GitHub](https://github.com/santoshe61/consenti)
22. [Consenti — Open Source Cookie Consent & CMP](https://consenti.dev/)
23. [GitHub - ConsentOS/consentos: ConsentOS - privacy-first cookie consent management platform. Self-hosted alternative to OneTrust, Cookiebot, CookieYes. · GitHub](https://github.com/ConsentOS/consentos)
24. [GitHub - sokiicz/consentkit: Self-hosted, open-source cookie consent management. No SaaS. No fees. Works on FTP/shared hosting. · GitHub](https://github.com/sokiicz/consentkit)
25. [GitHub - osano/cookieconsent: A free solution to the EU, GDPR, and California Cookie Laws · GitHub](https://github.com/osano/cookieconsent)
26. [21 Top Free JavaScript Libraries for GDPR-Compliant Cookie Management](https://medevel.com/why-cookie-consent-is-important/)
27. [GitHub - grrr-amsterdam/cookie-consent: Cookie consent with accessible dialog, agnostic tag triggers and conditional content, script and embed hooks. · GitHub](https://github.com/grrr-amsterdam/cookie-consent)
28. [GitHub - 68publishers/cookie-consent: :cookie: Cookie-consent widget with GTM, GCM & CMP integration · GitHub](https://github.com/68publishers/cookie-consent)
29. [GitHub - tagconcierge/consent-banner-js: A zero-dependency, lightweight (~3kB), consent platform agnostic, cookie banner for any website (compatible with Google Consent Mode). · GitHub](https://github.com/tagconcierge/consent-banner-js)
30. [GitHub - jamestomasino/cookieconsent: A totally free implementation of a Consent Mode V2 Cookie Banner · GitHub](https://github.com/jamestomasino/cookieconsent)
31. [GitHub - klaxit/cookie-consent: 🍪 Neat cookie consent popup for the EU, GDPR and California Cookie Laws · GitHub](https://github.com/klaxit/cookie-consent)
32. [Cookieconsent Alternatives](https://awesomeopensource.com/project/osano/cookieconsent)
33. [Adopted 1 Report of the work undertaken by the Cookie Banner Taskforce](https://www.edpb.europa.eu/system/files/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf)
34. [tarteaucitronjs](https://npm.io/package/tarteaucitronjs)
35. [No, not "Claro", but "Klaro" (Cookie & Consent Management)](https://www.drupaleasy.com/blogs/ultimike/2024/12/no-not-claro-klaro-cookie-consent-management)
36. [OEmbed lazy load incompatible with Klaro inline iframe blocking (#3559208)](https://www.drupal.org/project/oembed_lazyload/issues/3559208)
37. [CNIL’s New Guidelines and Recommendations On Cookie Consent](https://www.cookieyes.com/blog/cnil-guidelines-and-recommendations-on-cookie-consent/)
38. [New guidelines for the use of cookies and trackers](https://www.timelex.eu/en/blog/cnils-new-guidelines-and-recommendations-cookies-and-other-trackers)
39. [German Guide on TDDDG: Consent and Cookies - Securiti](https://securiti.ai/blog/german-ttdsg-guide/)
40. [New requirements for cookies under the TTDSG](https://www.heuking.de/en/news-events/newsletter-articles/detail/new-requirements-for-cookies-under-the-ttdsg-german-data-protection-authorities-publish-guidance-for-telemedia-providers.html)
41. [Cookie Consent in Poland: UODO Rules & Compliance](https://kukie.io/blog/cookie-consent-poland-uodo-guidelines)
42. [Polish cookie law: article 399 of the PKE](https://katla.app/compliance/poland)