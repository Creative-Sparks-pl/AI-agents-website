---
type: synthesis
synthesized_by: subagent
model: claude-opus-5-5
mode: strict
brief: brief-pplx-funnel-open-source-cookie-consent.md
sources:
  - results-claude-raw-claude-opus-5-5-funnel-open-source-cookie-consent.md
  - results-exa-raw-deep-reasoning-funnel-open-source-cookie-consent.md
  - results-pplx-raw-deep-research-funnel-open-source-cookie-consent.md
  - results-youcom-raw-deep-funnel-open-source-cookie-consent.md
synthesized: 2026-11-11
---

# Open-Source Cookie Consent to Replace Cookiebot on agents.creativesparks.pl

Source tags: `claude` = results-claude-raw-claude-opus-5-5 · `exa` = results-exa-raw-deep-reasoning · `pplx` = results-pplx-raw-deep-research · `youcom` = results-youcom-raw-deep. None of the four inputs is truncated.

## Navigation

### Topic map

| Section | What's here | What's NOT here |
|---|---|---|
| §1 Executive Summary | Where the four sources agree and split on the pick; what any pick still requires | Per-tool evidence (§3); migration steps (§5.4) |
| §2.1 Candidate Table | ~30 tools plus CMS-bound plugins and forks: licence, hosting model, verdict; details for tools not deep-dived | Shortlisted tools' details (§3); maintainer counts and notable users (no source established them) |
| §2.2 Shortlist and Exclusions | How often each tool was shortlisted and at what rank; exclusion reasons | Feature evidence (§3) |
| §3.1–§3.8 Deep-dives | Per tool: compliance defaults, proof of consent, declaration, script blocking, security, accessibility, size, translations, Astro effort | Independent WCAG audits, CVE histories, Core Web Vitals measurements (none found) |
| §3.9 Compliance checklist | CookieConsent v3 vs Silktide vs CookieYes SDK on six requirements | tarteaucitron, c15t, Klaro (see §3.2, §3.4, §3.5) |
| §4.1 Banner Design and Withdrawal | EDPB taskforce, EDPB 05/2020, CNIL, DSK, Polish PKE/UODO; a merged banner checklist | Decisions about this site's own stack (none exist) |
| §4.2 Proof of Consent | Burden of proof, CNIL evidence methods, record fields, data minimization, log storage and retention | A UODO guideline on consent records (not found) |
| §4.3 Cookie Declaration | What it must say, inventory fields, manual audit procedure | Vendor-documented Meta/PostHog cookie lifetimes (not retrieved) |
| §5.1–§5.2 Recommendation | The three competing picks and their reasons; what is lost and gained vs Cookiebot | A single consensus pick (none) |
| §5.3–§5.5 Setup, migration, risks | Minimum compliance setup, step-by-step migration, what to monitor | Legal sign-off on retention (left to counsel) |
| §6 Orphan Topics | Cookieless scope, load-vs-don't-load, server-side CAPI gating, checkout boundary, open-core drift, self-hosting responsibility, manual vs automatic inventory | — |
| §7 Gaps and Open Questions | Checks and decisions the owner must close before switching | Coverage gaps (see Known gaps below) |

### Question index

| Question | Section |
|---|---|
| Which tool should the site adopt, and do the sources agree? | §1, §5.1 |
| Which tool's tagging is closest to Cookiebot's `type="text/plain"` model? | §3.1, §3.5, §3.6 |
| How do I fire the Meta Lead only when marketing consent is present? | §3.1, §5.3, §5.4 |
| How do I gate Meta Conversions API calls sent from the server? | §5.4, §6.3 |
| What must the first banner layer show? | §4.1, §5.3 |
| What must a consent record contain, and where should it live? | §4.2 |
| How long should a stored choice last? | §3.1, §4.2, §5.3 |
| When must every visitor be asked again? | §3.1, §5.3 |
| How do I keep a cookie declaration without Cookiebot's crawler? | §4.3 |
| Which tools have built-in, self-hostable consent logging? | §2.1, §3.4, §3.7, §3.8 |
| Which tools ship Polish text? | §2.1, §3 (none confirmed) |
| Does withdrawing consent stop scripts that already ran? | §3.1, §3.3 |
| Why was a given tool dropped? | §2.2 |
| What do I lose compared with Cookiebot? | §5.2 |
| Which Polish law and which authority govern cookies? | §4.1 |
| Do Umami or PostHog's cookieless mode need consent? | §6.1 |
| Is tarteaucitron.js accessible? | §3.2 |
| What should I monitor after switching? | §5.5 |

### Named-thing index

| Name | Type | Definition | Section |
|---|---|---|---|
| CookieConsent v3 (`vanilla-cookieconsent`) | Consent library | Orest Bida's MIT client-side banner: category/service script gating, callbacks, revisions | §3.1 |
| IframeManager | Companion library | Separate orestbida library that gates iframes and embeds | §3.1 |
| astro-cookie-consent | Integration | Astro components wrapping CookieConsent, with Consent Mode helpers | §2.1, §3.1 |
| tarteaucitron.js | Consent library | French MIT library that loads consent-gated services from a service catalogue | §3.2 |
| Silktide Consent Manager | Consent library | MIT JS/CSS banner that injects configured scripts after consent | §3.3 |
| c15t | Consent platform | Apache-2.0 open-core CMP with local, self-hosted or inth.com backend | §3.4 |
| Inth (inth.com) | Hosted service | c15t's hosted backend and dashboard | §3.4 |
| Klaro | Consent library | BSD-3-Clause KIProtect library using inert scripts tagged `data-name` | §3.5 |
| Orejime | Consent library | Accessibility-focused fork of Klaro | §2.1 |
| astro-consent | Astro integration | Astro-native consent integration with `data-cc-category` blocking | §3.6 |
| CookieYes Consent SDK | Consent SDK | MIT, pre-1.0 packages with an optional self-hosted record backend | §3.7 |
| Consenti | Consent platform | Apache-2.0 widget with optional Node backend, audit log and scanner | §3.8 |
| ConsentKit, Conzent OCI, openConsent, Tagticians CMP, ConsentStack, ConsentOS, Biscuitman, Osano cookieconsent, SimpleCMP | Consent tools | Non-shortlisted candidates | §2.1 |
| `revision` | Config option | CookieConsent value; changing it invalidates earlier consent and re-prompts | §3.1 |
| `equalWeightButtons` | Config option | CookieConsent setting, default `true`, styling accept and reject equally | §3.1 |
| `expiresAfterDays` | Config option | CookieConsent consent lifetime, default 182 days | §3.1 |
| `consentId` / `cc_cookie` | Consent data | CookieConsent's per-visitor consent identifier and the cookie holding it | §3.1, §4.3 |
| `highPrivacy`, `serviceDefaultState`, `DenyAllCta` | Config options | tarteaucitron settings for opt-in defaults and a first-layer deny button | §3.2 |
| `cookieless_mode` | PostHog option | Mode that stores nothing on the device and ignores opt-in/opt-out calls | §6.1 |
| `fbq('consent','revoke' / 'grant')` | Meta Pixel API | Loads the pixel but holds tracking until granted | §5.4, §6.2 |
| Google Consent Mode v2 | Consent signal | Google's consent signals for its tags; a future nice-to-have here | §5.5 |
| IAB TCF | Ad-industry framework | Publisher consent framework for ad networks; out of scope | §3.4 |
| EDPB Guidelines 05/2020 | Regulator guidance | EU consent conditions, withdrawal and burden of proof | §4.1, §4.2 |
| EDPB Cookie Banner Taskforce report (Jan 2023) | Regulator report | Common DPA positions on banner practices raised by noyb's complaints | §4.1 |
| CNIL délibération 2020-091 and recommendation | Regulator guidance | French cookie rules: refusal parity, proof methods, six-month choice retention | §4.1, §4.2 |
| DSK Orientierungshilfe Telemedien (v1.1, Dec 2022) | Regulator guidance | German DPAs' guidance on consent for online services | §4.1 |
| PKE Art. 399 / 400 | Polish statute | Electronic Communications Law: prior information and consent for device storage; GDPR consent rules apply | §4.1 |
| ePrivacy Directive Art. 5(3) | EU law | Consent rule for storing or reading information on a user's device | §4.1 |
| GDPR Art. 7(1) / 7(3) | EU law | Controller must demonstrate consent; withdrawal as easy as giving it | §4.1, §4.2 |
| Elastic License 2.0 | Licence | Source-available, not OSI-approved; bars offering the software as a hosted service | §2.1, §6.6 |
| RGAA | Accessibility standard | French accessibility framework used in a 2024 audit that flagged tarteaucitron | §3.2 |
| UKE / UODO | Polish authorities | Electronic-communications regulator / data-protection authority | §4.1 |
| noyb | NGO | Files mass complaints against cookie banners | §4.1 |

### Known gaps

- Active maintainer counts — no source established them for any tool (§2.1)
- Notable production users — none established for any tool (§2.1)
- npm or jsDelivr download data — only one weekly figure surfaced, for CookieConsent v3 (§3.1)
- Comparable gzipped bundle sizes — only project claims or raw/package sizes; none measured for CookieConsent v3, c15t or tarteaucitron (spans §2.1, §3.1–§3.7)
- Independent WCAG 2.1/2.2 audits — none for CookieConsent v3, Silktide, c15t, CookieYes SDK or astro-consent; tarteaucitron's third-party evidence is mixed (spans §3.1–§3.7)
- Effect on Core Web Vitals — no measurements in any source (spans §3.1–§3.8)
- CVE and security-response history — only tarteaucitron's security releases surfaced (spans §3.1–§3.8)
- Built-in Polish translations — not confirmed for any shortlisted tool (spans §2.1, §3)
- Consent expiry defaults — documented only for CookieConsent v3 (spans §3.2–§3.8)
- Klaro's latest version and recent activity — sources conflict (see inline marker in §3.5)
- c15t's fit for a static Astro site — sources conflict (see inline marker in §3.4)
- Whether c15t's consent records can be fully self-hosted without Inth or recurring charges (§3.4)
- astro-consent's licence, release history and maintainers (§3.6)
- An independent security review of Consenti (§3.8)
- A UODO guideline on records of consent for cookies — none found (§4.2)
- Which Polish authority enforces the PKE cookie rule — only secondary sources; not confirmed from a primary text (§4.1)
- Retention period for a consent log — no regulator figure; sources defer to legal review (§4.2)
- Vendor-documented lifetimes of Meta and PostHog cookies (§4.3)
- PostHog's consent and withdrawal behaviour in the deployed SDK, and Meta CAPI deduplication under consent — not inspected (spans §5.4, §5.5)
- Exact release dates for CookieConsent v3.2.x and tarteaucitron v1.34.0–v1.37.0 (spans §3.1, §3.2)
- A single recommended tool — no consensus (see inline marker in §5.1)

## 1. Executive Summary

The sources do not agree on one tool. Two of four recommend CookieConsent v3 (orestbida, `vanilla-cookieconsent`); one recommends tarteaucitron.js and one astro-consent (§5.1).

- **CookieConsent v3 is the closest fit to the current Cookiebot setup.** Blocked scripts keep `type="text/plain"` and take a `data-category`; `onConsent`/`onChange` callbacks and `acceptedCategory()` gate the Meta Lead; raising `revision` re-asks everyone; accept and reject are equal-weight by default; consent lasts 182 days by default [[1, 2, 3]].
  - MIT; v3.3.0 released 3 November 2026; about 76,000 weekly npm downloads [[4, 5, 6]].
  - Three of four sources shortlist it; the one ranking it third did not verify its API, blocking or revisions [[6]].
  - It ships no scanner, no stored consent records ("does not store Consent Records", "is not a CMP") and no translations, so the owner writes the PL/EN text and a small Vercel log route (about 30 lines) [[7, 8]].
- **tarteaucitron.js has the strongest release and security record** (frequent releases, a ReDoS fix, v1.37.0 on npm in 2026) and a service catalogue with Consent Mode v2, but it needs Meta and PostHog rewritten as service definitions, its accessibility evidence is mixed, and it measures about 138 KB raw [[9, 10, 11, 12, 13]].
- **Silktide and c15t each make three of four shortlists but rank lower**: Silktide does less (no confirmed revisions or HTML-tag blocking); c15t has built-in consent records but needs a backend or its hosted service (§3.3, §3.4).
- **No open-source candidate replaces Cookiebot's crawler, hosted consent records and vendor-managed updates at zero cost.** Whatever the pick, the owner adds a consent log, a hand-kept cookie declaration, a footer withdrawal link, a re-consent rule, and a consent check inside the server route that sends Conversions API events [[7, 8, 14, 15]].
- **The legal floor is settled (HIGH):** a reject option on every layer that offers accept, withdrawal as easy as consent, proof of consent on the controller, and for Poland prior information and consent under Art. 399 of the Electronic Communications Law (PKE) [[15, 16, 17, 18, 19]].

## 2. Phase 1 — Landscape of Open-Source Consent Tools

### 2.1 Candidate Table

"Maintained" means evidence of activity or releases in 2025–2026; a new project can pass that test and still be too immature to recommend. Stars and download counts are not treated as quality evidence.

| Tool | Licence | Hosting model | Verdict |
|---|---|---|---|
| CookieConsent v3 (orestbida) | MIT [[5, 7]] | Client-side library | Shortlisted (§3.1) |
| tarteaucitron.js | MIT [[20]] | Client-side; paid hosted service sold separately [[21]] | Shortlisted (§3.2) |
| Silktide Consent Manager | MIT [[22]] | Client-side JS + CSS | Shortlisted (§3.3) |
| c15t | Apache-2.0 [[23]] | Open core: local, self-hosted or inth.com backend | Shortlisted (§3.4) |
| Klaro (KIProtect) | BSD-3-Clause [[24, 25]] | Client-side; paid hosted CMP | Split (§3.5) |
| astro-consent | Unverified | Astro integration | Shortlisted once (§3.6) |
| CookieYes Consent SDK | MIT [[26]] | Library + optional self-hosted backend | Shortlisted once (§3.7) |
| Consenti | Apache-2.0 [[27]] | Widget + optional Node backend | Shortlisted once (§3.8) |
| Biscuitman | MIT [[28]] | Client-side | Shortlisted once |
| Osano cookieconsent | MIT [[29]] | Client-side; hosted product separate | Split |
| ConsentKit | MIT [[30]] | Widget + optional Node/PHP log server | Pilot only |
| Conzent OCI | Apache-2.0 [[31]] | Self-hosted full CMP (Docker) | Excluded |
| openConsent | Apache-2.0 [[32]] | Self-hosted; beta | Excluded |
| Tagticians CMP | MIT [[33]] | Self-hosted script | Not shortlisted |
| ConsentStack | MIT component, cloud product [[34, 35]] | Cloud CMP | Excluded |
| ConsentOS | Elastic License 2.0 [[36, 37, 38]] | Self-hosted Docker platform | Excluded |
| SimpleCMP | Unverified | Self-hosted bundle | Not shortlisted |
| neiki-cookie-banner | Unverified | Vanilla JS (GitLab) | Not shortlisted |
| tagconcierge/consent-banner-js | MIT [[39]] | Client-side | Too primitive |
| grrr-amsterdam/cookie-consent | MIT [[40]] | JS utility | Too primitive |
| jamestomasino/cookieconsent | Open source [[41]] | Consent Mode banner | Excluded |
| gdpr-cookie-banner (haierr1) | Unverified | ~170-line implementation | Reference only |
| topostory-marketing | Unverified | Site-specific code | Excluded |
| 68publishers/cookie-consent | MIT [[42]] | CookieConsent wrapper + GTM/CMP app | Excluded |
| astro-cookie-consent (digital-craft-ltd) | Unverified | Astro wrapper of CookieConsent | Helper |
| Orejime, Haven | Open source [[43]] | Client-side | Excluded |
| CookieConsent v2 (orestbida) | MIT | Client-side | Superseded |
| Klaxit cookie-consent | MIT [[44]] | Client-side | Archived |

Details for tools not deep-dived in §3:

- **ConsentKit** — v1.2.3 released 8 October 2026 after a very short history; pre-blocks via `data-ck-category`/`data-ck-src`, versioned choices, a reopen control, Shadow DOM and Consent Mode v2; a logging endpoint stores visitor ID, timestamp, choices, banner version and user agent in SQLite or CSV; English and Czech built in; claims under 10 KB gzipped (project claim) [[45, 46]].
- **Conzent OCI** — public release March 2026, changelog into September 2026, licence corrected to Apache-2.0 in v2.7.3; needs PHP, a database, Redis, a web server and Docker; 86 banner languages (Polish not confirmed), a cookie reference database, built-in consent records and reporting [[31, 47, 48]].
- **openConsent** — current release 0.4.0-beta.1; explicit purpose-gated scripts, versioned browser choices, withdrawal, browser/server adapters; banner locales English and Chinese only; no individual server-side evidence log documented [[32, 49]].
- **Tagticians CMP** — nine commits with 2026 updates; API to read consent, listen for changes, reset and open preferences; emits Consent Mode updates; no maintained Polish or server log established [[33, 50]].
- **ConsentStack** — tracker blocking and consent logs are tied to its cloud service; no self-hosted static deployment established [[35, 51]].
- **ConsentOS** — repository created April 2026; claims blocking of script creation, cookie writes and storage APIs, a scanner, audit trails and a dashboard; claims a ~2 KB loader plus 26 KB bundle; needs Docker, Node, Python and persistent services; its licence bars offering it as a hosted or managed service [[36, 37, 38]].
- **Biscuitman** — the smallest quantified option, about 3–4 kB compressed (project claim); injects scripts after granular consent, stores consent in localStorage, exposes `window.Consent` and custom document events; 10 stars, no open issues, created 2024; no server log, automatic re-consent or robust iframe handling established — MEDIUM for features, LOW for compliance completeness [[28]].
- **Osano cookieconsent** — the project itself says open-source users must build GeoIP, callbacks, database consent saving and post-consent script loading; full blocking, multilingual support (38 languages [VENDOR: Osano]), consent storage and a dashboard belong to the hosted product [[29]]. [Divergence: exa says Osano states it actively maintains the library and ranks it fifth as technically viable [[29]]; claude says the last release, 3.1.1, was years ago and the README pushes the hosted product [[52, 53]]; youcom says the original npm package was last released in 2019 [[54]]]
- **SimpleCMP** — self-host two files, declare services, and use `src=""` plus `data-src` so URLs are injected only after consent; iframe placeholders; its docs discourage public CDNs for privacy reasons; OSI licence and release history unverified [[55]].
- **neiki-cookie-banner** — zero-dependency vanilla JS for static HTML and self-hosting; blocking behaviour, API, Polish and size unverified [[56]].
- **tagconcierge/consent-banner-js** — v2.0.0 released 2 September 2025; about 3 KB (claim); callbacks and a consent-state object; the integrator builds script blocking; no log or scanner [[39]].
- **grrr-amsterdam/cookie-consent** — conditional scripts, iframes and elements with a `getPreferences()` API; a primitive, not a full CMP [[40]].
- **jamestomasino/cookieconsent** — localStorage, a versioned consent envelope, a public API and Consent Mode v2; explicitly lacks TCF, vendor lists, consent records, scanning and proof workflows [[41]].
- **gdpr-cookie-banner (haierr1)** — ~170 lines; clones inert `text/plain` scripts into executable ones after opt-in, a `data-src` iframe pattern, a `cookieconsent` CustomEvent, localStorage, footer reopening, keyboard/ARIA support; useful as a reference implementation [[57]].
- **topostory-marketing** — application code showing first-layer Accept/Reject/Customize, PostHog and Intercom blocking, a shared consent cookie and footer settings; not a maintained product [[58]].
- **68publishers/cookie-consent** — CookieConsent wrapper with GTM/Consent Mode and an optional CMP app; WCAG 2 support, storage sync, default translations; activity appears old [[42]].
- **astro-cookie-consent (digital-craft-ltd)** — Astro components on top of CookieConsent, with Consent Mode helpers [[59]].
- **Orejime** (accessibility-focused Klaro fork) and **Haven** (TypeScript consent manager) — surfaced only through a listicle; current maintenance and Polish support unproven [[43]].
- **CookieConsent v2** — "Maintenance mode (only bugfix updates)" [[7]]. **Klaxit cookie-consent** — archived 24 December 2025 [[44]].
- **Excluded by scope (CMS- or framework-bound, or forks)** — Klaro plugins for Silverstripe, Contao and TYPO3; a Grav plugin for CookieConsent; a Svelte 5 Klaro port with 25 languages; Silktide forks; the PrestaShop module Art Cookie Choices Pro (despite Polish and Consent Mode support); WordPress-only integrations and consent browser extensions [[60, 61, 62, 63, 64, 65, 66, 67]].

### 2.2 Shortlist and Exclusions

Four tools reach three of the four shortlists; only CookieConsent v3 is ranked first more than once.

| Tool | Shortlisted (ranks) | Case for | Case against |
|---|---|---|---|
| CookieConsent v3 | 3 of 4 (1, 1, 3) | Cookiebot-like tags; events; revision | No log, scanner or PL text |
| tarteaucitron.js | 3 of 4 (1, 3, 4) | Releases; security fixes; catalogue | Service rewrite; mixed a11y |
| Silktide | 3 of 4 (2, 2, 4) | Simple; reload on revoke | Thin features; vendor-only evidence |
| c15t | 3 of 4 (2, 4, 5) | Built-in records; Astro adapter | Backend or Inth; young |
| Klaro | 2 of 4 (2, 3) | Cookiebot-like tags; iframe consent | Release gap; no PL |
| astro-consent | 1 of 4 (1) | Astro-native; View Transitions | Licence, releases unverified |
| CookieYes SDK | 1 of 4 (3) | Self-hosted record backend | Pre-1.0; no PL |
| Biscuitman | 1 of 4 (4) | 3–4 kB; events | Thin governance |
| Consenti | 1 of 4 (5) | Audit log, dashboard, scanner | Node service; one maintainer |
| Osano cookieconsent | 1 of 4 (5) | MIT; simple | DIY logging and blocking |

- **Klaro's standing is contested.** [Divergence: exa ranks Klaro second as the mature, framework-independent fallback [[25]] and youcom third for migration similarity [[25, 68]]; claude drops it because maintenance is unconfirmed [[69]] and pplx because its last documented release is from March 2024 [[24, 70]]]
- **c15t's edge on self-hosted records is narrower than claimed.** [Divergence: claude calls c15t the only candidate with first-party consent storage you can self-host [[23]]; pplx and youcom find self-hosted record storage in CookieYes SDK, ConsentKit, Conzent OCI and Consenti [[27, 31, 46, 71]]]
- **Exclusion reasons:**
  - Not an OSI licence: ConsentOS (Elastic License 2.0, source-available) — make licence verification a release gate [[36, 37, 38]].
  - Needs its own server stack: Conzent OCI (PHP, database, Redis, web server, Docker) — disproportionate for a small Vercel site [[31, 48]].
  - Too young or missing Polish: ConsentKit (English/Czech, very short history — pilot only), openConsent (beta, English/Chinese) [[32, 45, 46]].
  - Cloud dependency: ConsentStack [[35]].
  - Notice UI without real prior blocking: Osano, jamestomasino, tagconcierge [[29, 39, 41]].
  - Archived or superseded: Klaxit, Osano's original npm package, CookieConsent v2 [[7, 44, 54]].
  - Thin evidence: Orejime, Haven, neiki-cookie-banner, SimpleCMP, Tagticians [[33, 43, 55, 56]].
  - Site-specific code: topostory-marketing, gdpr-cookie-banner [[57, 58]].

## 3. Phase 2 — Shortlist Deep-Dives

### 3.1 CookieConsent v3 (orestbida, `vanilla-cookieconsent`)

**Maintenance.** Actively released and widely installed; maintainer depth is unclear.
- v3.0.0 in January 2024; v3.1.0 on 4 February 2025; v3.3.0 released 3 November 2026, adding an exports map; 44 versions; zero dependencies [[5, 6, 72, 73, 74]].
- About 76,000 weekly downloads per a security scanner [[4]].
- Releases come mostly from one maintainer; the v3.1.0 notes credit at least four other contributors; a second account ("tillsanders") can publish to npm — less single-point-of-failure, more supply-chain surface [[4, 5]]. The active maintainer count is not established [[5, 6]].

**Compliance behaviour.** The defaults are sound, but the owner must keep the reject button.
- `guiOptions.consentModal.equalWeightButtons` defaults to `true` [[2]].
- The reject button appears only if configured; the documented example shows "Accept all", "Reject all" and a preferences option [[75]].
- A read-only necessary category plus optional categories; keep optional ones off by default [[75]].
- Granularity is categories plus services (`data-service` gives a per-service toggle); a category label alone is not enough disclosure — describe each purpose and third party [[1, 2, 14]].
- `expiresAfterDays` defaults to 182 and can vary by choice, e.g. a shorter life for "reject" [[2]].
- Raising `revision` re-prompts every earlier visitor, with an optional `{{revisionMessage}}`; validity checks cover missing consent, revision mismatch and an expired cookie [[3, 76]].
- Withdrawal: a footer link calls `CookieConsent.showPreferences()` [UNVERIFIED method name]; scripts tagged `data-category="!marketing"` run when the category is switched off, which can drive clean-up [[1]].
- Leave the `disablePageInteraction` overlay off; EDPB/UODO treat cookie walls as generally not freely given [[2, 77]].

**Proof of consent.** The library gives the pieces; the owner builds the store.
- Client-side only; the FAQ says to "implement your own API and database" [[78]].
- The cookie holds a `consentId`; `getUserPreferences()` returns `acceptType`, `acceptedCategories` and `rejectedCategories`; the docs give a `fetch` POST pattern fired from `onFirstConsent` and `onChange` [[8]].
- Since v3.1.0 the cookie also stores the consent language, and a bug that wiped `lastConsentTimestamp` is fixed [[5]].

**Cookie declaration.** A hand-maintained cookie table can be shown inside the preferences modal; there is no crawler [[79]].

**Script blocking and events.** Same tagging idea as Cookiebot; use callbacks for anything that must re-run.
- Inline and external scripts: `type="text/plain"` + `data-category`, optional `data-service`, `data-src` [[1]].
- `onConsent`, `onFirstConsent` and `onChange` expose the current choice and the changed categories/services [[2, 80]].
- A tagged script can be enabled and disabled at most once while callbacks run every time, so put the Meta Lead and state changes in callbacks [[1]].
- iframes need the separate IframeManager library [[78, 81]].
- Switching a category off does not undo code that already ran: call the vendor's opt-out or reload the page [[1, 81]].

**Security.**
- A Snyk page exists; no published CVE for v3 was found (search not exhaustive) [[82]].
- Bundle it from npm with a pinned version in the lockfile rather than an unpinned CDN script [[75]].
- Astro bugs were reported — banner not showing with View Transitions (#728) and a bug with the Astro 5 client router; fix status unconfirmed, so test with `<ClientRouter />` [[83, 84]].

**Accessibility and performance.**
- `lazyHtmlGeneration` defers modal markup "to improve the TTI score" [[2]].
- No independent WCAG audit; test keyboard, focus placement and return, screen-reader labels, contrast and zoom.
- Size: about 20–25 kB gzipped JS+CSS [UNVERIFIED, not measured]; npm.io lists ~149 KB package size, which is not transfer size [[85]].

**Translations.** No default categories or translations ship [[7]]; translations go inline or in external JSON, and the language can follow the document (`<html lang>`) or the browser [[2, 86]].

**Astro effort.** Low — about 0.5–1 day including the log route (SPECULATIVE).
- One `<script>` module in the base layout; change `data-cookieconsent="marketing"` to `data-category="marketing"`.
- Confirm in the built output that the bootstrap runs on every page before any optional script [[1, 75]].
- An Astro wrapper and a Google Consent Mode guide already exist [[59, 79]].

### 3.2 tarteaucitron.js

**Maintenance and security.** The most active release record of the shortlist.
- v1.26.0 to v1.34.0 visible on the releases page; v1.34.0 adds a title-position option; frequent 2025 releases including ReDoS fixes and a cookie-deletion security fix; v1.37.0 on npm in 2026; a visible security policy [[9, 10, 87]].
- An independent maintainer; a hosted service sold separately [[13, 21]]. Widely used on French public-sector sites.

**Compliance behaviour.** Use these settings and test the visual result [[13]]:
- `highPrivacy: true`;
- `serviceDefaultState: "wait"`;
- `DenyAllCta: true`;
- equal-sized and equally prominent accept/reject controls;
- all optional services disabled before affirmative consent;
- a permanent footer "Ustawienia cookies / Cookie settings" link or visible icon.

**Script blocking.** Service-based, so migration is a rewrite, not a retag.
- The library injects each service's script itself (e.g. `facebookpixel`); custom services declare `needConsent: true`, a type, cookie patterns, a JS loader and a fallback; placeholders, per-service allowed/disallowed events, `dataLayer` and Consent Mode v2 [[13, 88]].
- Initializing the banner does not block scripts loaded elsewhere — a Meta or PostHog snippet outside the service configuration defeats the gate [[13]].
- Whether a PostHog service exists is unverified.
- Meta Lead gate [UNVERIFIED property names; confirm against the pinned release]:

```js
function fireMetaLead() {
  if (window.tarteaucitron &&
      tarteaucitron.state &&
      tarteaucitron.state.meta_pixel === true) {
    window.fbq?.('track', 'Lead');
  }
}
```

- Withdrawal: footer link to `tarteaucitron.userInterface.openPanel()` [UNVERIFIED]; delete or suppress controlled cookies; reload if vendor code must go.

**Proof and declaration.** Browser-side state only; no central log documented [[13]]. Service definitions carry cookie information and purposes, but the owner still writes the policy [[88]].

**Accessibility is mixed (confidence of full WCAG conformance: LOW).**
- The project documents placing the banner near the top of the document and a persistent settings icon, and promises "a compliant and accessible cookie banner" [VENDOR: tarteaucitron] [[13]].
- A 2021-era issue tracks accessibility work [[89]]; a 2024 RGAA audit of venissieux.fr flagged that its ARIA role "is not recognised" [[12]]; La French Tech's accessibility statement exempts it from RGAA assessment [[90]].

**Size and languages.** About 138 KB raw per a third-party comparison, so unlikely to be the smallest option; measure the production bundle after compression [[11]]. Translation files and text overrides exist; built-in Polish is unverified [[13]].

**Astro steps:** loader in the base layout before any optional script; register Meta and PostHog as services; remove or inert the original vendor tags; fire conversion code from consent callbacks; test each standalone HTML file separately.

### 3.3 Silktide Consent Manager

**Maintenance.** v1.0 on 28 January 2025, v2.0 on 3 December 2025, v2.0.1 on 2 July 2026 (with an accessibility fix); 31 commits; four open issues [[91, 92, 93, 94, 95]].

**API and blocking.** Config-driven injection, not HTML-tag blocking.
- Consent types with `required` and `defaultValue`; `onAccept`/`onReject`; `getConsentChoice()`, `getAcceptedConsents()`; reset and prompt controls; a change event for GTM [[94]].
- Injects configured scripts after consent and reloads the page on revocation so injected scripts do not linger [[94]].
- Revisions, service-level toggles and HTML-tag blocking could not be confirmed, so Cookiebot tags need a bridge to its configuration.
- Example category:

```js
{
  id: "statistics",
  required: false,
  defaultValue: false,
  onAccept: () => startPostHog(),
  onReject: () => stopPostHog()
}
```

**Compliance and proof.** Examples show accept-all, reject-non-essential and preferences controls — confirm equal weight [[94]]. Consent sits in `localStorage`; Silktide says the owner must send each choice with a timestamp to their own server for proof [[96, 97, 98]].

**Other.**
- Keyboard navigation, focus trapping and ARIA labels are project claims, not an audit [[94]].
- For GTM, do not `defer` the script, so it is ready before Consent Initialization tags; Consent Mode v2 ready [VENDOR: Silktide] [[99, 100]].
- 30.9 KB unminified JS, measured on a third-party copy of the file; gzip size unknown [[101]].
- All text overridable; no Polish package; no account or page limit [[94]].
- Confidence: HIGH for the client-side API, MEDIUM for accessibility, LOW for Polish and record keeping.

### 3.4 c15t

**Architecture.** Runs with a hosted backend on inth.com, a self-hosted backend, or offline/local-only "for static deployments"; supports Google Consent Mode v2 and IAB TCF [[23]].

**Astro fit is disputed.** [Divergence: claude says c15t is built around React, Next.js and Vue, a poor match for a mostly static Astro site [[23]]; pplx and youcom say its docs list Astro 6 support, Astro 5/6/7 adapters, plain HTML and a headless runtime [[23, 102]]]

**Blocking and integrations.**
- Consent-gated scripts, event dispatch, iframe and network blockers, a runtime API [[23, 102, 103]].
- Consent-aware Meta and PostHog loaders [[23]]; the PostHog helper loads PostHog on every page and calls `opt_out_capturing()` until consent — a third-party load before consent (§6.2) [[104]].
- Policy-based regional behaviour, SSR-compatible consent resolution, a Node SDK [[23]].

**Proof of consent.** Server-side records with the hosted or self-hosted backend [[23]]; local mode is not production evidence storage [[105]]; the dashboard and strongest audit features sit with Inth, and full self-hosting without Inth is unconfirmed [[23]].

**Maturity.** The organisation is about a year old; 1,673 commits; active pull requests and releases in 2026 [[105, 106, 107]]. Its founder describes the aim as simplifying consent for developers [[108]].

**Other.** 53 languages claimed, Polish quality unverified [VENDOR: c15t] [[23]]. Bundle size and accessibility not measured. Astro effort: medium — the JS core or a React island, plus a backend database for server logs. Treat as a pilot candidate, not the default.

### 3.5 Klaro

**Blocking and API.** The closest model to Cookiebot's markup.

```html
<script
  type="text/plain"
  data-type="text/javascript"
  data-name="posthog"
  data-src="/posthog-init.js">
</script>
```

- Inert scripts via `type="text/plain"`, `data-type`, `data-src` and `data-name` [[24, 25]].
- `getConsent()`, watchers, `updateConsent()`, `resetConsents()`, manual `klaro.show()`; contextual consent for iframes; deletes configured cookies after withdrawal [[68, 109, 110]].
- Purpose-based; designed to stop third-party apps from running without consent [[25]].
- A Drupal integration shows automatic attribution and unknown-resource blocking are experimental and can conflict with other loaders [[111, 112]].

**Maintenance is the weak point.** The latest documented release dates from 26 March 2024 [[70]]. [Divergence: pplx says that release is v0.7.22 and the repository shows activity in 2026 [[24, 70]]; youcom says it is v0.7.21 and the repository's last push was in March 2025 [[25, 70]]; claude found issues opened in December 2025 but no confirmed 2025 release [[69]]]
- Open issues include "outdated JavaScript" (#561, December 2025) and files "much larger than documented" (#527) [[69]]; 832 commits [[25]].

**Other.**
- Proof: client-side; release notes mention optional anonymous consent records sent to a backend, but no audit trail with timestamp, version and choices is established; server storage is requested in issue #532 [[24, 70, 113]].
- No Polish among the built-in translations [[24, 25]].
- README claims 57 KB minified and gzipped, including styles and translations [[25]].
- A paid hosted CMP exists alongside the library.

### 3.6 astro-consent

Single-repository evidence; MEDIUM confidence until licence and release history are checked [[114]].
- Astro integration emitting hashed, self-hostable assets; blocks `type="text/plain"` scripts tagged `data-cc-category`; supports View Transitions [[114]].
- Typed runtime API and document events; versioned consent for re-prompting; configurable text and locale resolution; dialog semantics, focus trap and restoration, Escape handling; zero runtime dependencies; CSP-safe output [[114]].
- Its events can build a client-side record (random consent ID, timestamp, policy/config version, choices); a server log is not documented [[114]].
- Unverified: licence, latest release, cadence, maintainers, bundle size, CVEs, expiry, and whether default styling gives accept and reject equal prominence.

### 3.7 CookieYes Consent SDK

The strongest ready-made record path, but pre-1.0 and without Polish.
- Separate core, UI, vanilla JS, integrations and optional self-hosted backend packages; the backend stores each decision once, with retries, record identifiers and versioned records [[26, 71, 115, 116]].
- Its security policy describes a pre-1.0 SDK — expect API and behaviour changes [[117]].
- 13.14 KB gzipped for banner plus recall button, and 5.34 KB more for the two dialogs, measured on an empty Next.js app [[118]].
- Languages: English, Spanish, French, German, Italian — not Polish [VENDOR: CookieYes] [[119]]. Documents vendor stop-tracking operations and custom categories [[26, 119]].

### 3.8 Consenti

The most complete self-hostable platform found, with operational cost to match [[27, 120]].
- Browser-only mode or an optional Node 20+ API with SQLite, Postgres, Mongo or MySQL; append-only audit log, exports, admin roles and dashboard, scanner, event hooks, GPC, BCP-47 i18n, script/plugin API [[27]].
- The project acknowledges a single maintainer [[27]].
- Running it means persistent storage, authentication, patching and backups — more than a 15-page static site needs unless central evidence is a priority.

### 3.9 Comparative compliance checklist

| Requirement | CookieConsent v3 | Silktide | CookieYes SDK |
|---|---|---|---|
| First-layer accept + reject | Configurable [[75]] | Documented [[94]] | Unverified |
| Optional choices off | Configurable [[75]] | `defaultValue` [[94]] | Unverified |
| Granular purposes | Categories + services [[2]] | Consent types [[94]] | Custom categories [[26]] |
| Withdrawal stops scripts | Callback; test reload [[1]] | Reloads page [[94]] | Vendor stop calls [[119]] |
| Re-consent on change | `revision` [[3]] | Reset API; versioning unclear [[94]] | Versioned records [[115]] |
| Server-side evidence | DIY endpoint [[8]] | DIY endpoint [[97]] | Self-hosted backend [[71]] |

For every tool, check visual parity and a fresh-profile run before launch [[17, 121]].

## 4. What EU Regulators Require of a Small Website

### 4.1 Banner Design and Withdrawal

**Offer reject on every layer that offers accept.** The EDPB Cookie Banner Taskforce (January 2023) found that the vast majority of authorities treat its absence as invalid consent [[16, 17, 122]]. Confidence: HIGH.
- Also flagged: pre-ticked boxes, deceptive link design, contrast nudging toward accept, misclassifying cookies as essential, no permanent way to withdraw, and "legitimate interest" for non-essential cookies [[17, 123, 124, 125]].
- The report is a minimum common denominator, not a safe harbour, and national rules still apply; it prescribes no layout, colour or floating icon — a visible, standardized footer link is given as an example of easy withdrawal [[16, 17, 124]].
- Two legal layers: national rules implementing ePrivacy Art. 5(3) govern storing or reading on the device; GDPR governs the processing that follows [[125]].

**EDPB Guidelines 05/2020.** Consent must be freely given, specific, informed and unambiguous; scrolling or swiping is not consent; withdrawal must be as easy as giving consent (GDPR Art. 7(3)), and dependent processing must stop [[14, 15, 126, 127, 128]]. The same guidelines address cookie walls, which EDPB and UODO treat as generally not freely given [[77, 129]].

**National regulators.**
- CNIL fined Google €150M and Facebook €60M because refusing was not as simple as accepting [[130, 131]]; it recommends accept and refuse at the same level, granular purposes and a visible withdrawal mechanism [[132, 133]].
- DSK (Germany; Telemedien guidance v1.1, December 2022): refusal must be clearly recognisable and equivalent in effort, size, contrast and prominence; "settings or reject" leading to a second layer is not an immediate refusal option [[128, 134, 135, 136]]. A 2025 German administrative-court decision requires a visible first-layer "reject all" wherever "accept all" is offered [[137]].
- Poland: the Electronic Communications Law (PKE, of 12 July 2024, in force 10 November 2024) replaced the Telecommunications Law's cookie rule. Art. 399 requires prior clear information and consent for non-exempt device storage or access; Art. 400 applies data-protection consent rules [[18, 19, 138]].
  - Secondary sources split enforcement: UKE for the electronic-communications rule, UODO for GDPR processing [[138, 139]].
  - UODO follows the EDPB; its 2025 material repeats active, informed consent, no preselected boxes and effective withdrawal [[140, 141]].
  - A Polish administrative-court ruling held that not every cookie is personal data, and that passive consent through browser settings alone is not enough [[142]].
- noyb keeps filing waves of complaints (500+), and won a correction of ORF.at's banner [[143, 144]].

**Do not label a tracker "necessary" because it is useful to the business**; Meta Pixel and PostHog replay/heatmaps stay blocked before opt-in [[121, 145]].

**Banner checklist (both languages)** [[125, 128, 146]]:
1. No optional script, pixel, storage or embed before consent.
2. No pre-ticked optional categories; essential operation separated from statistics and marketing.
3. Clear purpose descriptions with granular category choices.
4. Accept all, Reject all and Customize on the first layer, equal in size, contrast, position and click count.
5. No "continued browsing equals consent", no cookie wall, no legitimate-interest shortcut.
6. A persistent footer link or icon labelled as cookie settings; withdrawal in roughly as many actions as acceptance.

### 4.2 Proof of Consent

**The controller must be able to show how, when and on what information consent was given.** EDPB guidance prescribes no storage technology, and showing only the current site configuration is not enough [[14, 15]].

- CNIL (délibération 2020-091 and its recommendation) expects proof of refusal as well as consent, and recommends proof be available to third parties relying on the consent [[147, 148, 149]].
- CNIL names timestamped screenshots of each site version and time-stamped code/configuration as evidence methods [[150]].
- CNIL calls keeping the user's choice for six months generally good practice; this concerns how long the choice is remembered, not how long a log is kept [[132, 151, 152, 153]].
- **A browser cookie alone is weak evidence** — it shows the current state, not what the visitor saw.
- **Contrarian view:** Klaro maintainers argue that if nothing loads without consent, server logs matter less [[113]]. The consensus is still to keep a log (MEDIUM).

**What to record** (union of all four sources):
- Individual record: pseudonymous consent ID; timestamp; banner/policy version or revision; language; accepted and rejected categories (and services per category); first consent vs later change; withdrawal or supersession; source domain [[2, 8, 114]].
- Evidence of the mechanism: version-controlled configuration and PL/EN texts with the revision number, dated screenshots of the first and preferences layers, and a record of tested blocking (before choice, reject, accept, withdrawal) for Meta and PostHog [[3, 13, 14, 150]].
- Record template:

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

**Minimize and secure the log.** The log is personal-data processing in its own right.
- No raw IP or full user agent is needed for the EDPB proof standard; one variant stores a hash of the user agent and no IP, or a truncated one [[14]].
- Storage options: Vercel KV/Postgres or append-only logs; append-only JSONL or SQLite that is secured and backed up; a tamper-evident record where proportionate.
- Retention is unsettled: keep evidence only as long as needed for its purpose and legal claims [[14]]; one suggestion is the consent lifetime plus the limitation period (SPECULATIVE); all sources defer the figure to legal review.

### 4.3 Cookie Declaration

**Tell visitors, before they consent, each tracker's purpose, who sets it and how long it lasts** [[153]].

- A crawler is a convenience, not a legal requirement or a guarantee of a correct list; automated tools can list cookies but cannot decide whether one is essential, and that classification shifts as services change [[125]].
- **Inventory fields** (one source-controlled file, rendered in the privacy policy and the preferences modal in both languages):
  - service/vendor and provider; first or third party; international-transfer notes;
  - category and purpose, in Polish and English;
  - storage or access mechanism: cookie names, localStorage/sessionStorage keys, pixels, SDKs, network hosts;
  - duration — observed or vendor-documented, marked unknown rather than guessed;
  - loading condition (category and consent state required);
  - last verified: date, browser scenario, site release or revision.
- **Entries to start with:** Meta Pixel `_fbp` [[154]]; PostHog `ph_*` cookies and localStorage; CookieConsent's own `cc_cookie` [[2]]; Umami with its actual storage documented.
- **Audit procedure** (each release, at least quarterly, and before adding any ad, chat, video or form provider):
  1. Open a clean browser profile.
  2. Visit every real page and every standalone HTML example.
  3. Test no choice, reject all, statistics only, marketing only and accept all.
  4. Record cookies, localStorage, sessionStorage, network hosts, iframes and dynamically created scripts.
  5. Compare what you observed with the version-controlled registry.
  6. Update the declaration and the policy.
  7. Repeat after every analytics or marketing change.

## 5. Phase 3 — Recommendation and Migration Outline

### 5.1 Recommendation

[Divergence: claude and pplx recommend CookieConsent v3, self-bundled from npm with a first-party consent-log route [[1, 8]]; youcom recommends tarteaucitron.js, self-hosted and pinned [[9, 13]]; exa recommends astro-consent after a licence and release check, with Klaro as fallback [[25, 114]]]

- **Why CookieConsent v3:** least migration effort because its blocking model matches Cookiebot's; the Meta Lead rule maps onto `acceptedCategory('marketing')` with `onConsent`/`onChange`; compliant defaults and built-in re-consent (§3.1); the largest install base and existing Astro integrations; no backend needed for the banner [[1, 2, 3, 59]].
  - c15t wins only if consent records must be managed without writing code, at the cost of a heavier stack or a hosted dependency (§3.4).
  - If evidence collection is the overriding priority, the CookieYes SDK is the alternative (§3.7) [[71]].
- **Why tarteaucitron.js:** current release and security evidence, MIT, service-level consent, script and embed handling, callbacks for Meta Lead and PostHog, future Consent Mode v2, no SaaS account; a stronger maintenance signal than Klaro's [[9, 13]].
- **Why astro-consent:** Astro-native, keeps the inert-script pattern, typed events, consent versioning, self-hostable, zero runtime dependencies, PL/EN-capable locale config [[114]].
- **Evidence strength differs.** The CookieConsent v3 case rests on the project's own configuration, script, revision and logging pages; the tarteaucitron case on its repository, releases and npm page, without confirming Polish or callback names; the astro-consent case on a single repository page [[2, 3, 8, 9, 10, 114]].

### 5.2 What the owner gives up, and gains, versus Cookiebot

- Gives up: the automatic crawler and auto-generated declaration; hosted consent logs and dashboard; automatic blocking of scripts nobody tagged; pre-written translations; vendor-maintained cookie metadata and categorisation; vendor support and a contractual service layer [[8, 79]].
- Gains: no page-count pricing, fixed hosting cost, local assets, less vendor and supply-chain exposure, full control over the consent model.
- No candidate offers verified automatic crawling, legal classification, regulator-grade hosted records and vendor updates at zero cost.

### 5.3 Minimum compliance setup around the tool

1. **First layer:** "Akceptuj wszystkie / Odrzuć wszystkie / Ustawienia" ("Accept all / Reject all / Settings"; "Dostosuj ustawienia" is an alternative label), equal weight [[17, 75]].
2. **Categories:** necessary (read-only; consent storage and site operation only), statistics (PostHog replay and heatmaps), marketing (Meta Pixel, Meta Lead/CAPI); optional ones off by default.
3. **Complete PL/EN translations**, including the preferences layer and reopen control; have a native speaker review the Polish "reject all", category and withdrawal wording [[2, 86]].
4. **Gate every execution path:** no duplicate loaders, tag-manager injections or early requests; the static example HTML files get the same gate [[1, 13]].
5. **Check marketing consent at the moment the Meta Lead fires**, not at page load or when the event was queued [[2, 80]].
6. **Make the CAPI server route refuse or ignore Lead events without marketing consent** (§6.3).
7. **Consent log route** recording the §4.2 fields on first decision and every change, with a documented retention and access policy [[8]].
8. **Cookie declaration** from one JSON source in both languages (§4.3).
9. **Evidence pack:** inventory, screenshots of each banner version, configuration version [[150, 151]].
10. **Re-consent rule:** bump the revision or version on any new vendor, purpose or category, or a material change to what was shown [[3]].
11. **Choice duration:** six months as a starting point for review, not a statutory expiry — EDPB guidance ties validity to context and requires new consent after significant changes [[3, 151, 155]].
12. **Footer link** in both languages: "Ustawienia cookies" / "Cookie settings".
13. **Umami:** document that it stays cookie-free (§6.1).

Consent manifest template:

```js
export const consentConfig = {
  version: "2026-11-11",
  categories: {
    statistics: ["posthog"],
    marketing: ["meta-pixel", "meta-capi"]
  }
};
```

### 5.4 Step-by-step migration from Cookiebot

1. **Inventory production first.** List every Cookiebot-managed script, iframe, inline snippet and server-side CAPI call; cookies, storage and network requests, including requests before the banner appears; whether PostHog uses cookies, localStorage or memory; use Cookiebot's last scan as a starting list.
2. **Pin and self-host** — e.g. `npm i vanilla-cookieconsent@3.3.x` with the exact version locked; commit built assets and licences; never an unversioned CDN URL; for a less-proven tool, verify licence, checksum and dependencies first [[75]].
3. **Configure** in one `consent.ts` (config plus PL/EN translations) imported by the base layout; set the initial revision explicitly [[3, 75, 86]].
4. **Retag scripts:** `data-cookieconsent="marketing"` → `data-category="marketing"`, keep `type="text/plain"`, add `data-service="Meta Pixel"` / `data-service="PostHog"`; check the Astro output runs the bootstrap first [[1]]. (tarteaucitron: register services instead, §3.2; astro-consent: `data-cc-category` [[114]].)
5. **Meta Pixel:** strictest is not loading it until marketing consent; alternatively call `fbq('consent','revoke')` before `init`, then `grant` on consent [[156, 157]].
6. **Meta Lead and CAPI:** check the current marketing state when sending; server routes send Lead only when the client passes the marketing flag, e.g. read from `cc_cookie` on the request (SPECULATIVE design) [[2, 80]].
7. **PostHog:** load only on statistics consent; call `opt_out_capturing()` in `onChange` on withdrawal; reload if loaded code cannot be stopped.
8. **Consent log:** call the route from `onFirstConsent`/`onConsent` and `onChange`; test error handling, version tagging and retention [[8, 14]].
9. **Static example HTML files:** tag them the same way or confirm they load no trackers.
10. **Test in a clean browser** — cookies, storage, script elements and network, not just the banner [[17]]:
    - fresh visit: no `_fbp` or `ph_` cookies, no requests to facebook.net or PostHog;
    - reject all; statistics only; marketing only; accept all;
    - withdrawal, then reload: trackers do not resume;
    - returning visitor; an old stored choice against a new revision;
    - navigation and View Transitions; keyboard and screen reader; mobile; CSP; JavaScript disabled; direct static HTML URLs; checkout links.
11. **Remove Cookiebot only after the tests pass**; keep a dated export or screenshot of its configuration for the migration record, then cancel the subscription.

### 5.5 Risks and what to monitor

- **A tracker loaded outside the gate:** the banner looks right but blocks nothing, and nothing scans for you any more — verify real requests [[13]].
- **Withdrawal that only flips a stored flag** while loaded code keeps running [[1, 14]].
- **Astro router bugs** in CookieConsent (#728) [[83]].
- **Maintainer concentration and library updates** that change markup, callbacks or cookie deletion — watch release feeds and Snyk, use Dependabot or Renovate, rerun browser tests after upgrades.
- **Translation and build regressions** — test both languages after any dependency or config change [[86]].
- **Vendor changes** to Meta or PostHog cookies, endpoints or SDKs; **stale declarations** after any integration change.
- **Server routes sending data without browser consent**; Meta CAPI deduplication under consent.
- **Log overcollection** — minimize fields and document retention [[14]].
- **Accessibility regressions** after visual customisation.
- **Polish law changes** (PKE) and new UODO statements.
- **Operational signals:** console errors, Meta/PostHog request timing, consent-log failures, Core Web Vitals, dependency and security alerts.
- **If Google tags arrive:** set Consent Mode v2 default-denied before the tags and update it on change; do not add it just because the tool supports it [[79]].

## 6. Orphan Topics

### 6.1 Cookieless is not automatically consent-free

- PostHog's `cookieless_mode: "always"` stores nothing in cookies or localStorage and ignores opt-in and opt-out calls; running cookieless aggregate analytics with session replay behind consent could shrink the banner to marketing only (session recording still needs consent — SPECULATIVE) [[158]].
- The European Commission recognises only a narrow exception for some first-party anonymous aggregate audience measurement, with conditions — not a blanket exemption [[145]].
- Tracking through localStorage, sessionStorage, pixels, fingerprinting or network requests can fall under consent rules too [UNVERIFIED for every PostHog mode].
- Document Umami's actual configuration and data flow, and reassess if it adds device storage, identifiers or extra processing [[145]].
- A no-banner design would require removing or redesigning Meta and PostHog replay, not relabelling them essential.

### 6.2 "Load but opt out" versus "don't load"

- c15t's PostHog helper and Meta's `fbq('consent','revoke')` pattern both load the vendor script before consent and hold it opted out [[104, 157]].
- Loading contacts a third-party server and sends the visitor's IP before consent; whether ePrivacy Art. 5(3) and GDPR allow that is debatable, so not loading is the safer pattern (SPECULATIVE / contested).

### 6.3 Server-side Conversions API needs its own consent check

- CAPI calls leave from the server, so no banner can block them; the server route must validate current marketing consent, a step every reviewed library's documentation leaves out (SPECULATIVE).
- A browser flag is not sufficient if the route can be called without checking it; document what is sent from Vercel before and after consent [UNVERIFIED: the site's CAPI route was not inspected].

### 6.4 The checkout domain is a separate consent boundary

- Consent given on agents.creativesparks.pl does not cover tracking on the Easytools checkout domain; the checkout operator needs its own mechanism unless a documented, lawful shared-consent arrangement exists. Check its setup and contracts separately [UNVERIFIED: Easytools' roles and tracking not examined].

### 6.5 A library that says what it is not

- CookieConsent's own introduction states it is not a CMP, stores no consent records, does not implement TCF and has not supported Google AdSense since 2024 — an unusually candid scope statement, worth weighing as a trust signal [[7]].

### 6.6 Open core, source-available and drift toward SaaS

- Osano's free library now mainly funnels users to its hosted product; c15t pairs its open library with the inth.com backend [[23, 53]].
- ConsentOS shows that "self-hostable" is not "open source": Elastic License 2.0 is source-available, so licence verification belongs in the release checklist [[36]].
- Other projects could drift the same way (SPECULATIVE).

### 6.7 Self-hosting shifts responsibility; it does not remove it

- Self-hosting avoids a third-party request before the banner exists and dependence on an external runtime; SimpleCMP's docs make this privacy case against public CDNs [[55]].
- The owner then owns updates, integrity, backups, uptime, testing and consent records; Silktide and CookieConsent keep state in the browser unless logging is added, while CookieYes, c15t and Conzent bring server or platform choices [[8, 48, 71, 96, 105]].
- Pin versions and run an integrity/checksum process; use Subresource Integrity only when loading from an external immutable URL.

### 6.8 A manual inventory can beat unreviewed automatic discovery

- Scanning and consent enforcement are different jobs: a scanner finds unexpected requests but cannot judge whether a cookie is necessary, whether a purpose description is accurate, or whether consent was valid [[13, 14]].

## 7. Gaps and Open Questions

Coverage gaps are listed once, under Known gaps at the top. Open questions the owner must close before switching:

- **Repository check of the chosen tool:** current OSI licence, latest release and commit activity, open security issues, dependency tree, exact event names, iframe behaviour, storage semantics, revision invalidation, focus/ARIA, and whether default styling gives accept and reject equal prominence.
  - CookieConsent v3: confirm `showPreferences()`, the language auto-detect option and the cookie-table option names; whether the Astro View Transitions and client-router bugs are fixed.
  - tarteaucitron.js: confirm the consent-state property and `openPanel()` names, a Polish language file and a PostHog service.
  - astro-consent: confirm licence and release history before relying on it.
- **Legal review:** the PKE/GDPR boundary and which authority enforces it; consent-log retention period; whether an opaque visitor identifier is needed at all.
- **Measure, don't assume:** production bundle size after compression and the effect on Core Web Vitals.
- **Inspect the live stack:** PostHog persistence, replay start/stop behaviour and Meta CAPI data flow and deduplication on the deployed site; whether the static example HTML files share the Astro layout and headers.
- **Polish wording:** native-speaker review of the banner, categories and withdrawal text.

## Sources

1. [CookieConsent docs: manage scripts](https://cookieconsent.orestbida.com/advanced/manage-scripts.html) [claude, pplx]
2. [Config reference](https://cookieconsent.orestbida.com/reference/configuration-reference.html) [claude, pplx]
3. [Revision management](https://cookieconsent.orestbida.com/advanced/revision-management.html) [claude, pplx]
4. [Socket](https://socket.dev/npm/package/vanilla-cookieconsent) [claude]
5. [Releases · orestbida/cookieconsent - GitHub](https://github.com/orestbida/cookieconsent/releases) [claude, pplx]
6. [GitHub - orestbida/cookieconsent: :cookie: Simple cross ...](https://github.com/orestbida/cookieconsent) [exa, pplx, youcom]
7. [Introduction](https://cookieconsent.orestbida.com/essential/introduction.html) [claude]
8. [Consent Logging | CookieConsent](https://cookieconsent.orestbida.com/advanced/consent-logging.html) [claude, pplx]
9. [Releases · AmauriC/tarteaucitron.js · GitHub](https://github.com/AmauriC/tarteaucitron.js/releases) [claude, pplx, youcom]
10. [tarteaucitronjs - npm](https://www.npmjs.com/package/tarteaucitronjs) [youcom]
11. [architecture patterns worth adopting from tarteaucitron.js and vanilla-cookieconsent · Issue #33 · tariktunc/blakfy-cookie · GitHub](https://github.com/tariktunc/blakfy-cookie/issues/33) [youcom]
12. [audit PDF](https://venissieux.fr/wp-content/uploads/2024/06/RGAA-Rapport-Audit-SITE-WEB-VILLE-VENISSIEUX.pdf) [claude]
13. [GitHub - AmauriC/tarteaucitron.js: Open-source JavaScript ...](https://github.com/AmauriC/tarteaucitron.js/) [pplx, youcom]
14. [Guidelines 05/2020 on consent under Regulation 2016/ ...](https://www.gov.cy/media/sites/67/2025/09/edpb_guidelines_202005_consent_en-68c26e3725968.pdf) [pplx]
15. [adopted 1 Guidelines 05/2020 on consent under Regulation 2016/679 Version 1.1](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_202005_consent_en.pdf) [claude, youcom]
16. [EDPB Publishes Report of Outcome of the Cookie Banner Taskforce](https://www.hunton.com/privacy-and-cybersecurity-law-blog/edpb-publishes-report-of-outcome-of-the-cookie-banner-taskforce) [exa]
17. [Report of the work undertaken by the Cookie Banner ...](https://www.edpb.europa.eu/system/files/documents/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf) [pplx]
18. [Art. 399. komunik.elektr. - Przechowywanie informacji lub ...](https://lexlege.pb.pl/prawo-komunikacji-elektronicznej/art-399) [pplx]
19. [Ustawa z dnia 12 lipca 2024 r. - Prawo komunikacji ... - ISAP](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001221) [pplx]
20. [tarteaucitron.js/LICENSE at master · AmauriC/tarteaucitron.js · GitHub](https://github.com/AmauriC/tarteaucitron.js/blob/master/LICENSE) [youcom]
21. [tarteaucitron.io - GDPR Consent Management Platform & Cookie ...](https://tarteaucitron.io/en/) [pplx]
22. [license - silktide/consent-manager](https://github.com/silktide/consent-manager/blob/main/LICENSE) [pplx, youcom]
23. [c15t GitHub](https://github.com/c15t/c15t) [claude, pplx, youcom]
24. [GitHub - klaro-org/klaro-js: Klaro Privacy Manager. An open-source, privacy-friendly & compliant consent manager for your website.](https://github.com/klaro-org/klaro-js) [pplx]
25. [GitHub - kiprotect/klaro: Klaro Privacy Manager. An open-source, privacy-friendly & compliant consent manager for your website. · GitHub](https://github.com/kiprotect/klaro) [exa, youcom]
26. [GitHub - cookieyes/cookieyes: Open-source cookie consent SDK ...](https://github.com/cookieyes/cookieyes) [pplx]
27. [GitHub - santoshe61/consenti: GDPR, CCPA, TCF, and GPC compliant Open-Source Cookie Consent management platform. Works with any stack. Admin dashboard included. Backend optional. Zero Dependencies · GitHub](https://github.com/santoshe61/consenti) [youcom]
28. [replete/biscuitman](https://github.com/replete/biscuitman/) [exa]
29. [osano/cookieconsent: A free solution to the EU, GDPR, and ...](https://github.com/osano/cookieconsent) [exa, youcom]
30. [consentkit/LICENSE at main · sokiicz/consentkit](https://github.com/sokiicz/consentkit/blob/main/LICENSE) [pplx]
31. [GitHub - conzent-net/oci · GitHub](https://github.com/conzent-net/oci) [pplx]
32. [noir-hedgehog/openConsent: Open-source consent ...](https://github.com/noir-hedgehog/openConsent) [pplx]
33. [GitHub - tagticians/consent-management-platform](https://github.com/tagticians/consent-management-platform) [pplx]
34. [ConsentStack/cmp: Open source, developer focused & ...](https://github.com/ConsentStack/cmp) [pplx]
35. [Terms of Service | ConsentStack](https://www.consentstack.io/terms-of-service) [pplx]
36. [ConsentOS - privacy-first cookie consent management ...](https://github.com/consentos/consentos) [exa, pplx]
37. [consentos/LICENSE at master · ConsentOS/consentos](https://github.com/ConsentOS/consentos/blob/master/LICENSE) [pplx]
38. [GitHub - ConsentOS/consentos: ConsentOS - privacy-first cookie consent management platform. Self-hosted alternative to OneTrust, Cookiebot, CookieYes. · GitHub](https://github.com/ConsentOS/consentos) [youcom]
39. [GitHub - tagconcierge/consent-banner-js: A zero-dependency, lightweight (~3kB), consent platform agnostic, cookie banner for any website (compatible with Google Consent Mode). · GitHub](https://github.com/tagconcierge/consent-banner-js) [youcom]
40. [GitHub - grrr-amsterdam/cookie-consent: Cookie consent with accessible dialog, agnostic tag triggers and conditional content, script and embed hooks. · GitHub](https://github.com/grrr-amsterdam/cookie-consent) [youcom]
41. [GitHub - jamestomasino/cookieconsent: A totally free implementation of a Consent Mode V2 Cookie Banner · GitHub](https://github.com/jamestomasino/cookieconsent) [youcom]
42. [GitHub - 68publishers/cookie-consent: :cookie: Cookie-consent widget with GTM, GCM & CMP integration · GitHub](https://github.com/68publishers/cookie-consent) [claude, youcom]
43. [21 Top Free JavaScript Libraries for GDPR-Compliant Cookie Management](https://medevel.com/why-cookie-consent-is-important/) [youcom]
44. [GitHub - klaxit/cookie-consent: 🍪 Neat cookie consent popup for the EU, GDPR and California Cookie Laws · GitHub](https://github.com/klaxit/cookie-consent) [youcom]
45. [All Workflow Runs · sokiicz/consentkit](https://github.com/sokiicz/consentkit/actions) [pplx]
46. [GitHub - sokiicz/consentkit: Self-hosted, open-source cookie ...](https://github.com/sokiicz/consentkit) [pplx, youcom]
47. [oci/CHANGELOG.md at main · conzent-net/oci](https://github.com/conzent-net/oci/blob/main/CHANGELOG.md) [pplx]
48. [Install Conzent OCI on Your Website | Docker Guide](https://getconzent.com/docs/) [pplx]
49. [openConsent/docs/SDK.md at main · noir-hedgehog/openConsent](https://github.com/noir-hedgehog/openConsent/blob/main/docs/SDK.md) [pplx]
50. [consent-management-platform/README.md at main · tagticians/consent-management-platform](https://github.com/tagticians/consent-management-platform/blob/main/README.md) [pplx]
51. [Page 4 | Best Consent Management Platforms: User Reviews from November 2026](https://www.g2.com/categories/consent-management-platform-cmp?exec=1ba4110&order=g2_score&page=4) [pplx]
52. [releases](https://github.com/osano/cookieconsent/releases) [claude]
53. [README](https://github.com/osano/cookieconsent/blob/dev/README.md) [claude]
54. [Cookieconsent Alternatives](https://awesomeopensource.com/project/osano/cookieconsent) [youcom]
55. [Integrating SimpleCMP into a Static Page — Installation in 5 Minutes](https://simplecmp.eu/en/install-static.html) [exa]
56. [neikiri / neiki-cookie-banner · GitLab](https://gitlab.com/neikiri/neiki-cookie-banner) [exa]
57. [haierr1/gdpr-cookie-banner](https://github.com/haierr1/gdpr-cookie-banner) [exa]
58. [iainbreen/topostory-marketing](https://github.com/iainbreen/topostory-marketing) [exa]
59. [GitHub](https://github.com/digital-craft-ltd/astro-cookie-consent) [claude]
60. [GitHub topic](https://github.com/topics/klaro) [claude]
61. [haasz](https://github.com/haasz/silktide-consent-manager) [claude]
62. [fleetingstork](https://github.com/fleetingstork/silktide-consent) [claude]
63. [Silverstripe](https://github.com/lerni/klaro-cookie-consent) [claude]
64. [Contao](https://github.com/pdir/klaro-consent-manager) [claude]
65. [TYPO3](https://packagist.org/packages/erhaweb/klaro-consent-manager) [claude]
66. [Grav](https://github.com/pmoreno-rodriguez/grav-plugin-orestbida-cookie-consent) [claude]
67. [ArteInfoRM/artcokiechoicespro](https://github.com/ArteInfoRM/artcokiechoicespro) [exa]
68. [API - Javascript API](https://klaro.org/docs/api/js_api) [youcom]
69. [issues](https://github.com/kiprotect/klaro/issues) [claude]
70. [Releases | Klaro! Documentation](https://klaro.org/docs/releases) [pplx, youcom]
71. [cookieyes/sdk/backend at main · cookieyes/cookieyes](https://github.com/cookieyes/cookieyes/tree/main/sdk/backend) [pplx]
72. [discussion](https://github.com/orestbida/cookieconsent/discussions/619) [claude]
73. [vanilla-cookieconsent 3.1.0 on npm - Libraries.io - security & maintenance data for open source software](https://libraries.io/npm/vanilla-cookieconsent) [youcom]
74. [release](https://github.com/orestbida/cookieconsent/releases/tag/v3.3.0) [claude]
75. [Getting Started - CookieConsent v3 - Orest Bida](https://cookieconsent.orestbida.com/essential/getting-started.html) [pplx]
76. [API Reference | CookieConsent](https://cookieconsent.orestbida.com/reference/api-reference.html) [pplx]
77. [cookiebaner.pl summarising UODO](https://cookiebaner.pl/2026/08/25/wytyczne-uodo-cookies-wordpress/) [claude]
78. [FAQ](https://cookieconsent.orestbida.com/additional/faq.html) [claude]
79. [Google consent mode | CookieConsent](https://cookieconsent.orestbida.com/advanced/google-consent-mode.html) [pplx]
80. [Callbacks and Events | CookieConsent](https://cookieconsent.orestbida.com/advanced/callbacks-events.html) [pplx]
81. [IframeManager set-up - CookieConsent v3 - Orest Bida](https://cookieconsent.orestbida.com/advanced/iframemanager-setup.html) [pplx]
82. [Snyk](https://security.snyk.io/package/npm/vanilla-cookieconsent) [claude]
83. [#728](https://github.com/orestbida/cookieconsent/issues/728) [claude]
84. [issues](https://github.com/orestbida/cookieconsent/issues) [claude]
85. [vanilla-cookieconsent](https://npm.io/package/vanilla-cookieconsent) [youcom]
86. [Language Config | CookieConsent](https://cookieconsent.orestbida.com/advanced/language-configuration.html) [pplx]
87. [newreleases](https://newreleases.io/project/github/AmauriC/tarteaucitron.js/release/v1.34.0) [claude]
88. [tarteaucitronjs](https://npm.io/package/tarteaucitronjs) [youcom]
89. [#868](https://github.com/AmauriC/tarteaucitron.js/issues/868) [claude]
90. [La French Tech](https://lafrenchtech.gouv.fr/en/accessibility/) [claude]
91. [Change Log](https://silktide.com/consent-manager/docs/change-log/) [pplx]
92. [Activity · silktide/consent-manager - GitHub](https://github.com/silktide/consent-manager/activity) [pplx]
93. [silktide repositories · GitHub](https://github.com/orgs/silktide/repositories?type=all) [youcom]
94. [GitHub - silktide/consent-manager: Free banner for collecting consent to cookies and more · GitHub](https://github.com/silktide/consent-manager) [pplx, youcom]
95. [Silktide GitHub](https://github.com/silktide) [claude]
96. [Documentation](https://silktide.com/consent-manager/docs/) [pplx]
97. [The best free cookie banner, with Google Consent Mode v2 - Silktide](https://silktide.com/consent-manager/) [pplx]
98. [Conzent vs Silktide Consent Manager](https://getconzent.com/vs/silktide/) [youcom]
99. [docs](https://silktide.com/consent-manager/docs/google-consent-mode/) [claude]
100. [Silktide](https://silktide.com/consent-manager/why-consent-v2/) [claude]
101. [silktide-consent-manager/silktide-consent-manager.js at main · OleksandrChernysh/silktide-consent-manager](https://github.com/OleksandrChernysh/silktide-consent-manager/blob/main/silktide-consent-manager.js) [pplx]
102. [createConsentRuntime – JavaScript cookie consent | c15t](https://c15t.com/docs/frameworks/javascript/api/runtime) [pplx]
103. [Scripts – JavaScript cookie consent | c15t](https://c15t.com/docs/frameworks/javascript/scripts) [pplx]
104. [c15t PostHog docs](https://c15t.com/docs/integrations/posthog) [claude]
105. [c15t/packages/c15t at 19995c4f44adfbdd7cd80a8f25d9942afae6fba5 · c15t/c15t](https://github.com/c15t/c15t/tree/19995c4f44adfbdd7cd80a8f25d9942afae6fba5/packages/c15t) [pplx]
106. [c15t org](https://github.com/c15t) [claude, youcom]
107. [npm](https://www.npmjs.com/package/c15t) [claude]
108. [Heavybit podcast](https://www.heavybit.com/library/podcasts/open-source-ready/ep-18-consent-management-with-christopher-burns) [claude]
109. [Integrate Klaro Consent Management](https://www.fabian-kleiser.de/blog/integrate-klaro-consent-management/) [youcom]
110. [klaro-gridsome](https://www.npmjs.com/package/klaro-gridsome) [claude]
111. [No, not "Claro", but "Klaro" (Cookie & Consent Management)](https://www.drupaleasy.com/blogs/ultimike/2024/12/no-not-claro-klaro-cookie-consent-management) [youcom]
112. [OEmbed lazy load incompatible with Klaro inline iframe blocking (#3559208)](https://www.drupal.org/project/oembed_lazyload/issues/3559208) [youcom]
113. [issue](https://github.com/kiprotect/klaro/issues/532) [claude]
114. [zdenekkurecka/astro-consent](https://github.com/zdenekkurecka/astro-consent) [exa]
115. [cookieyes/sdk/core at main · cookieyes/cookieyes](https://github.com/cookieyes/cookieyes/tree/main/sdk/core) [pplx]
116. [Changelog | CookieYes for Developers](https://developers.cookieyes.com/docs/changelog) [pplx]
117. [Build software better, together](https://github.com/cookieyes/cookieyes/security) [pplx]
118. [Releases · cookieyes/cookieyes](https://github.com/cookieyes/cookieyes/releases) [pplx]
119. [Open-Source Cookie Consent for React and Next.js](https://www.cookieyes.com/blog/react-cookie-consent-sdk/) [pplx]
120. [Consenti — Open Source Cookie Consent & CMP](https://consenti.dev/) [youcom]
121. [2002/58 - EN - eprivacy directive - EUR-Lex - European Union](https://eur-lex.europa.eu/eli/dir/2002/58/oj/eng) [pplx]
122. [EDPB adopts final report of outcome of the cookie banner task force](https://cnil.fr/en/edpb-adopts-final-report-outcome-cookie-banner-task-force) [pplx]
123. [Lexology](https://www.lexology.com/library/detail.aspx?g=029679c6-1996-44b1-82ce-fb3082f32a76) [claude]
124. [EDPB](https://www.edpb.europa.eu/our-work-tools/our-documents/other/report-work-undertaken-cookie-banner-taskforce_en) [claude, youcom]
125. [Adopted 1 Report of the work undertaken by the Cookie Banner Taskforce](https://www.edpb.europa.eu/system/files/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf) [youcom]
126. [Lexology](https://www.lexology.com/library/detail.aspx?g=bec71b2e-36da-418a-a811-6193be8b4965) [claude]
127. [Process personal data lawfully | European Data Protection Board](https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en) [pplx]
128. [Consent Banner Report](https://noyb.eu/sites/default/files/2024-07/noyb_Cookie_Report_2024.pdf) [exa]
129. [DataGuidance](https://www.dataguidance.com/news/eu-edpb-adopts-guidelines-consent-under-gdpr) [claude]
130. [Clubic](https://www.clubic.com/pro/legislation-loi-internet/cnil/actualite-402129-le-cookie-de-trop-la-cnil-epingle-google-et-facebook-a-hauteur-de-150-et-60-millions-d-euros.html) [claude]
131. [BDM](https://www.blogdumoderateur.com/google-facebook-lourdement-sanctionnes-cnil/) [claude]
132. [CNIL’s New Guidelines and Recommendations On Cookie Consent](https://www.cookieyes.com/blog/cnil-guidelines-and-recommendations-on-cookie-consent/) [youcom]
133. [New guidelines for the use of cookies and trackers](https://www.timelex.eu/en/blog/cnils-new-guidelines-and-recommendations-cookies-and-other-trackers) [youcom]
134. [DSK PDF](https://www.datenschutzkonferenz-online.de/media/oh/20221205_oh_Telemedien_2021_Version_1_1_Vorlage_104_DSK_final.pdf) [claude]
135. [German Guide on TDDDG: Consent and Cookies - Securiti](https://securiti.ai/blog/german-ttdsg-guide/) [youcom]
136. [New requirements for cookies under the TTDSG](https://www.heuking.de/en/news-events/newsletter-articles/detail/new-requirements-for-cookies-under-the-ttdsg-german-data-protection-authorities-publish-guidance-for-telemedia-providers.html) [youcom]
137. [Administrative court: Cookie banner must contain "Reject all" button | heise online](https://www.heise.de/en/news/Administrative-court-Cookie-banner-must-contain-Reject-all-button-10390520.html) [exa]
138. [Poland cookie consent: Article 399 ECL, UKE and UODO | Kukie.io](https://kukie.io/blog/cookie-consent-poland-uodo-guidelines) [exa, youcom]
139. [Polish cookie law: article 399 of the PKE](https://katla.app/compliance/poland) [youcom]
140. [UODO Biuletyn 03/2025](https://uodo.gov.pl/pl/file/5869) [claude]
141. [Problematyka ochrony danych osobowych a pliki cookies](https://nowybiuletyn.uodo.gov.pl/problematyka-ochrony-danych-osobowych-a-pliki-cookies/) [pplx]
142. [prawo.pl](https://www.prawo.pl/biznes/wazny-wyrok-wsa-nie-kazde-cookies-jest-dana-osobowa,512328.html) [claude]
143. [noyb 500+ complaints](https://noyb.eu/en/noyb-aims-end-cookie-banner-terror-and-issues-more-500-gdpr-complaints) [claude]
144. [noyb ORF](https://noyb.eu/en/noyb-success-orfat-must-correct-misleading-cookie-banner) [claude]
145. [Cookies and similar technologies](https://commission.europa.eu/resources/europa-web-guide/design-content-and-development/privacy-security-and-legal-notices/cookies-and-similar-technologies_fi) [pplx]
146. [Report on cookie banners – does your banner meet the recommendations? | Rödl](https://www.roedl.pl/en/good-to-know/good-to-know/gdpr/report-on-cookie-banners-does-your-banner-meet-the-recommendations) [exa]
147. [Légifrance](https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000042398005) [claude]
148. [Lexology summary](https://www.lexology.com/library/detail.aspx?g=43d395f0-ab5b-4a51-9184-31ef113b26b0) [claude]
149. [Taylor Wessing](https://www.taylorwessing.com/en/insights-and-events/insights/2020/10/french-data-protection-authority-publishes-new-guidelines) [claude]
150. [Recommandation](https://www.cnil.fr/sites/default/files/2026-01/recommandation_cookies_consolidee.pdf) [pplx]
151. [Cookies et traceurs : comment mettre mon site web en ...](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/comment-mettre-mon-site-web-en-conformite) [pplx]
152. [Questions-réponses sur les lignes directrices modificatives et la recommandation « cookies et autres traceurs » de la CNIL](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ?lang=en) [pplx]
153. [CNIL recommandation](https://www.cnil.fr/sites/default/files/atoms/files/recommandation-cookies-et-autres-traceurs.pdf) [claude]
154. [cookieconsent.com](https://www.cookieconsent.com/cookies/fbp/) [claude]
155. [(PDF) Wytyczne 05/2020 dotyczące zgody na mocy rozporządzenia 2016 ...](https://www.uodo.gov.pl/file/3714) [pplx]
156. [CookieHub](https://support.cookiehub.com/article/551-meta-pixel-consent-mode) [claude]
157. [DEV](https://dev.to/builderify/your-meta-pixel-is-tracking-visitors-before-they-accept-cookies-heres-how-to-fix-it-1af) [claude]
158. [PostHog tutorial](https://posthog.com/tutorials/cookieless-tracking) [claude]
