---
provider: "claude"
model: "claude-opus-5-5"
brief: "brief-pplx-funnel-open-source-cookie-consent.md"
duration_ms: 227757
input_tokens: 289922
output_tokens: 16407
searches: 26
cost_usd: 0.849846
truncated: False
citation_scheme: "unified"
---

# Research Results: brief-pplx-funnel-open-source-cookie-consent

**Provider:** claude (claude-opus-5-5)

---

# Replacing Cookiebot with an Open-Source Consent Tool on agents.creativesparks.pl

## Executive Summary

**Recommendation: use Orest Bida's CookieConsent v3** (`vanilla-cookieconsent`, MIT licence), served from your own site. Add three small things around it: a server route that logs consent, a cookie table you write by hand, and a rule for when to ask visitors again (re-consent).

Why this tool fits:
- **It works almost the same way as your current Cookiebot setup.** You keep `type="text/plain"` on blocked scripts and add a `data-category` attribute (CookieConsent docs: manage scripts [[1]]).
- **Your page code can see and react to consent.** It has `onConsent` and `onChange` callbacks and an `acceptedCategory()` check, which is what the Meta Lead logic needs (manage scripts [[1]]).
- **"Accept" and "Reject" buttons look the same by default** (`equalWeightButtons: true`). Consent expires after 182 days by default (Config reference [[2]]).
- **It can ask everyone again when your cookie list changes.** You raise a `revision` number in the settings (Revision management [[3]]).
- **It is actively maintained.** Version 3.3.0 is on npm (npm [[4]]), and one security scanner reports about 76,000 weekly downloads (Socket [[5]]). Confidence: HIGH.

What you give up compared with Cookiebot:
- **No automatic cookie scanner or auto-generated cookie list.**
- **No stored consent records out of the box.** The project says plainly that it "does not store Consent Records" and "is not a CMP" (Introduction [[6]]). You build the log yourself. On Vercel that is about 30 lines of code.
- **No built-in Polish text.** The project ships no default categories or translations (Introduction [[6]]), so you write the Polish and English wording.

**The alternatives:**
- **c15t** (Apache-2.0) is the strongest "full platform" option. It can run local-only, against a self-hosted backend, or against a paid hosted backend (c15t GitHub [[7]]). It is built around React, Next.js and Vue, which is a poor match for a mostly-static Astro site.
- **tarteaucitron.js** is the best-known French option, with frequent releases (up to v1.34.0) (releases [[8]]). It works service by service, not by tag-and-category, so the move from Cookiebot is bigger.
- **Silktide Consent Manager** (MIT) is simple and supports Google Consent Mode v2 (Silktide GitHub [[9]]), but it does less.
- **Klaro** has open issues as recent as December 2025 but no clear release rhythm (issues [[10]]).

## Phase 1 — Landscape of Open-Source Consent Tools

How I searched: GitHub, npm, project documentation, security scanners, and integration packages. I could not reliably get exact release dates for every project from GitHub pages, which my fetch tool sometimes served from stale caches. Where a date is missing, the table says so.

### Candidate Table

| Tool | Licence | Hosting model | Recent release evidence | Blocking method | PL/EN | JS API / events | Consent logging | Bundle size | Status |
|---|---|---|---|---|---|---|---|---|---|
| **CookieConsent v3 (orestbida)** | MIT (docs [[6]]) | Client-side library (UMD/ESM) | v3.3.0 on npm, adds an exports map (release [[11]]; npm [[4]]); v3.0.0 in Jan 2024 (discussion [[12]]) | `type="text/plain"` + `data-category` / `data-service` (docs [[1]]) | You supply all text; no built-in translations | Yes: `onConsent`, `onChange`, `acceptedCategory`, `acceptedService` | DIY via `fetch` + `consentId` (docs [[13]]) | [UNVERIFIED] about 20–25 kB gzipped JS+CSS; not measured | Active |
| **c15t** | Apache-2.0 (GitHub [[7]]) | Open core: local-only, self-hosted backend, or hosted on inth.com | Recently published on npm (npm [[14]]) | Framework components + headless API; script loaders | [UNVERIFIED] coverage of Polish | Yes (headless APIs) | Built-in with hosted or self-hosted backend (GitHub [[7]]) | Not measured | Active, young |
| **tarteaucitron.js** | MIT [UNVERIFIED: licence not checked in repo] | Client-side; optional paid hosted version [UNVERIFIED] | v1.26 → v1.34.0 visible on releases page (releases [[8]]); v1.34.0 adds a title-position option (newreleases [[15]]) | Per-service loaders: the library injects each service's own script | Many languages incl. PL [UNVERIFIED] | Events per service [UNVERIFIED detail] | None built-in [UNVERIFIED] | Not measured | Active |
| **Klaro (KIProtect)** | BSD-3 [UNVERIFIED] | Client-side library + paid KIProtect hosted CMP | Issues opened Dec 2025 (issues [[10]]); no confirmed 2025 release found | `type="text/plain"` + `data-name` | Many languages [UNVERIFIED for PL] | `consentUpdate`-style watchers (klaro-gridsome [[16]]) | Client-side only; server storage asked about in issue #532 (issue [[17]]) | Issue #527 says files are "much larger than documented" (issues [[10]]) | Unclear |
| **Silktide Consent Manager** | MIT (Silktide GitHub [[9]]) | Client-side | Repo updated Jul 2026 (GitHub [[9]]) | Consent-type callbacks; GCM v2 (docs [[18]]) | User-supplied text [UNVERIFIED] | Callbacks | None | "Lightweight" [VENDOR: Silktide] | Active, small |
| **Osano cookieconsent v3** | MIT | Client-side | Last release 3.1.1 years ago (releases [[19]]); README pushes Osano's hosted product (README [[20]]) | Notice banner, no real prior blocking [UNVERIFIED] | — | Limited | None | — | **Excluded** |
| **CookieConsent v2 (orestbida)** | MIT | Client-side | "Maintenance mode (only bugfix updates)" (docs [[6]]) | Same as v3 | — | Yes | DIY | — | Superseded |
| **68publishers/cookie-consent** | [UNVERIFIED] | Wrapper on orestbida + GTM/GCM (GitHub [[21]]) | Not checked | Inherited | — | — | Optional CMP app | — | Niche |
| **astro-cookie-consent (digital-craft-ltd)** | [UNVERIFIED] | Astro components on orestbida (GitHub [[22]]) | Not checked | Inherited | — | — | — | — | Integration helper |
| **Svelte 5 Klaro port** | [UNVERIFIED] | Port of Klaro with 25 languages (GitHub topic [[23]]) | Not checked | — | — | — | — | — | Excluded (Svelte-specific) |
| **Silktide forks** (haasz, fleetingstork) | MIT | Forks (haasz [[24]], fleetingstork [[25]]) | — | — | — | — | — | — | Excluded (forks) |
| **Plugins tied to one CMS** (Klaro for Silverstripe/Contao/TYPO3, Grav orestbida plugin) | various | CMS-bound (Silverstripe [[26]], Contao [[27]], TYPO3 [[28]], Grav [[29]]) | — | — | — | — | — | — | Excluded (CMS-only) |

Evidence quality: the maintainer counts for each project are LOW-confidence or missing. I could not reliably get contributor numbers. Releases on the orestbida project come mostly from one maintainer, with outside contributors on many pull requests: the v3.1.0 notes credit at least four contributors besides the maintainer (releases [[30]]). A security scanner lists the npm package as published by a second account ("tillsanders") (Socket [[5]]). That suggests more than one person can publish, which helps against a single point of failure but also adds supply-chain risk.

### Shortlist and Exclusions

**Ranked shortlist:**
1. **CookieConsent v3 (orestbida)**
   - Its tagging matches Cookiebot almost one to one.
   - It has events for the Meta Lead logic, re-consent by revision, equal-weight buttons by default, an `iframemanager` companion for embeds (docs nav [[2]]), and a documented Google Consent Mode guide.
   - It has a large install base and Astro-specific integrations.
2. **c15t**
   - It is the only candidate with first-party consent storage you can self-host.
   - It was cut to second place because its React/Next/Vue focus adds weight and complexity on a static Astro site, and it is younger.
3. **tarteaucitron.js**
   - It releases often and is widely used on French public-sector sites.
   - It is lower here because the move from Cookiebot is bigger (scripts are turned into per-service definitions), and its accessibility record is mixed (see Phase 2).
4. **Silktide Consent Manager**
   - It is simple and has an MIT licence and GCM v2 support.
   - It has the thinnest feature set (no service-level toggles or revisions that I could confirm) and little independent evidence.

**Missed the cut:**
- **Klaro.** Its open issues include "outdated JavaScript" (#561, Dec 2025) and a bundle-size complaint (issues [[10]]), with no confirmed 2025 release. I could not confirm whether it is maintained. Confidence: MEDIUM.
- **Osano cookieconsent.** No releases in years; effectively replaced by Osano's hosted product.
- **CMS plugins.** Excluded by scope.

## Phase 2 — Shortlist Deep-Dives

### 1. CookieConsent v3 (orestbida)

**Compliance behaviour.**
- **Equal-weight buttons.** `guiOptions.consentModal.equalWeightButtons` defaults to `true`, so the default design avoids the "reject is a faint link" pattern regulators object to (Config reference [[2]]). Confidence: HIGH (primary docs).
- **Reject button on the first screen.** It appears if you configure it. The tool lets you leave it out, so it is the owner's job to keep it.
- **No pre-ticked boxes.** Categories are off by default unless you mark them `enabled` or `readOnly`. [UNVERIFIED in fetched docs; this is the standard configuration pattern]
- **Expiry.** `expiresAfterDays` defaults to 182 and can depend on the choice, for example a shorter life for "reject" (Config reference [[2]]). A 6-month default is in line with the period CNIL suggests for keeping a choice (see below).
- **Re-consent.** Changing `revision` asks every earlier visitor again, with an optional `{{revisionMessage}}` (Revision management [[3]]).
- **Withdrawal.** Call `CookieConsent.showPreferences()` from a footer link [UNVERIFIED method name from memory; check against the API reference]. Scripts tagged with `data-category="!marketing"` run when a category is switched off, which you can use for clean-up (manage scripts [[1]]).
- **Cookie walls.** The optional `disablePageInteraction` overlay (Config reference [[2]]) should stay **off**. EDPB/UODO guidance treats cookie walls as generally not freely given (cookiebaner.pl summarising UODO [[31]]).

**Proof of consent.**
- The library is client-side only. Its FAQ says you must "implement your own API and database" (FAQ [[32]]).
- It does provide the building blocks. The cookie holds a `consentId`, and `getUserPreferences()` returns `acceptType`, `acceptedCategories` and `rejectedCategories`. The docs show a `fetch` POST to your own endpoint, sent on first consent and on every change (Consent logging [[13]]).
- Since v3.1.0 the cookie also stores the language of the consent, and a bug that wiped `lastConsentTimestamp` was fixed (releases [[30]]). Both help as evidence.
- So a full record (ID, timestamp, revision, language, choices) is possible both in the browser and on the server, once you add a Vercel route.

**Script blocking.**
- Inline and external scripts are covered through `type="text/plain"`, `data-category`, optional `data-service` (a separate toggle per service) and `data-src` (manage scripts [[1]]).
- iframes need the separate IframeManager library (FAQ [[32]]; docs nav [[2]]).
- `onChange` passes `changedCategories`, which covers "fire Meta Lead only if marketing was granted" and "stop PostHog recording on withdrawal".

**Security and maintenance.**
- Snyk keeps a vulnerability page for the package (Snyk [[33]]). I found no published CVE for v3 [UNVERIFIED that none exists; search was not exhaustive].
- Supply-chain risk is lowest if you bundle it from npm with a pinned version, not load it from jsDelivr.
- Responsiveness: Astro-specific bugs were reported, including the banner not showing with View Transitions (#728) and a bug with Astro 5 and the client-side router (#728 [[34]]; issues [[35]]). I could not confirm whether these are fixed. If you use `<ClientRouter />`, test this.

**Accessibility and performance.**
- `lazyHtmlGeneration` delays building the modal markup "to improve the TTI score" (Config reference [[2]]).
- I found no independent WCAG audit. Accessibility claims are UNVERIFIED, so test by keyboard and with NVDA or VoiceOver.

**Translations.** You define all text in a `translations` object per language. Language can follow `<html lang>` [UNVERIFIED option name `autoDetect: 'document'`]. This fits Astro's `/pl/` and `/en/` routes well.

**Astro effort.**
- Low. Add one `<script>` module in the base layout and change `data-cookieconsent="marketing"` to `data-category="marketing"` on your tags.
- A community package already wraps it for Astro with GCM helpers (astro-cookie-consent [[22]]).
- Estimate: 0.5–1 day, including the log route. SPECULATIVE.

### 2. c15t

- **Architecture.** Apache-2.0. It can run "with a hosted backend on inth.com, a self-hosted consent backend, or offline/local-only mode ... for static deployments" (GitHub [[7]]). It supports Google Consent Mode v2 and IAB TCF (GitHub [[7]]).
- **Proof of consent.** Server-side records are built in when you use the hosted or self-hosted backend (GitHub [[7]]). This is its main advantage over orestbida.
- **PostHog.** It has a documented PostHog integration. By default it loads PostHog's script on every page and calls `opt_out_capturing()` until consent (c15t PostHog docs [[36]]). That still loads a third-party script before consent, which a cautious reading of ePrivacy Article 5(3) might question. SPECULATIVE.
- **Trade-offs.** The project is young: the organisation is about a year old (c15t org [[37]]). Its founder describes the aim as simplifying consent for developers (Heavybit podcast [[38]]). It mainly targets React, Next.js and Vue.
- **Unknowns.** I did not measure bundle size, a11y or Polish coverage.
- **Astro effort.** Medium: use the JavaScript core or a React island, plus hosting a backend database if you want server logs.

### 3. tarteaucitron.js

- **Releases and model.** It has a steady release rhythm (v1.26.0 to v1.34.0 visible on page 1 of releases) (releases [[8]]). Its own tagline promises "a compliant and accessible cookie banner" [VENDOR: tarteaucitron]. It defines services such as `facebookpixel` that the library injects itself. Moving from Cookiebot therefore means rewriting your Meta and PostHog snippets into service definitions, not just retagging them. [UNVERIFIED that a PostHog service exists]
- **Accessibility evidence is mixed.**
  - A 2021-era issue tracks accessibility work (#868 [[39]]).
  - A 2024 RGAA audit of venissieux.fr flagged that tarteaucitron's ARIA role "is not recognised" (audit PDF [[40]]).
  - The French Tech mission's accessibility statement exempts the TarteAuCitron manager from its RGAA assessment (La French Tech [[41]]).
  - Confidence that it is fully WCAG-conformant: LOW.

### 4. Silktide Consent Manager

- **Basics.** MIT; repository `silktide/consent-manager`, updated Jul 2026 (GitHub [[9]]). Silktide promotes it as free, open source and ready for GCM v2 (Silktide [[42]]) [VENDOR: Silktide]. Its GTM guide warns not to `defer` the script, so it is ready before Consent Initialization tags run (docs [[18]]).
- **Gaps.** I could not confirm revisions, service-level toggles, or HTML-tag blocking. Evidence is thin, almost all from the vendor.

## What EU Regulators Require of a Small Website

### Banner Design and Withdrawal

- **Who enforces in Poland.** UODO follows EDPB guidelines: consent to cookies must be freely given, informed and unambiguous (UODO Biuletyn 03/2025 [[43]]). Under Polish law the cookie rule (Art. 173 of the Telecommunications Law, now replaced by the Electronic Communications Law) falls partly under the telecoms regulator UKE, not UODO [UNVERIFIED; please confirm with Polish counsel]. A Polish court ruling discussed whether every cookie is personal data. It noted that passive consent through browser settings alone is not enough (prawo.pl [[44]]).
- **EDPB Guidelines 05/2020.** Scrolling or swiping is not consent (Lexology [[45]]). Withdrawal must be as easy as giving consent (EDPB Guidelines 05/2020 [[46]]). Cookie walls are addressed in the same guidelines (DataGuidance [[47]]).
- **EDPB Cookie Banner Taskforce (Jan 2023).** It coordinated authorities' handling of noyb's complaints (Lexology [[48]]; EDPB [[49]]). Most authorities considered these practices non-compliant [UNVERIFIED wording; check the report itself]:
  - no reject option on the first screen
  - pre-ticked boxes
  - deceptive link designs
  - contrast that nudges toward "accept"
  - wrongly classifying cookies as "essential"
  - no permanent way to withdraw
- **CNIL.** It fined Google €150M and Facebook €60M because refusing was not as simple as accepting (Clubic [[50]]; BDM [[51]]).
- **DSK (Germany).** Its Telemedien guidance (v1.1, Dec 2022) sets out the German view (DSK PDF [[52]]).
- **noyb** continues to file waves of complaints (noyb 500+ complaints [[53]]), and has had wins such as ORF.at being required to fix its banner (noyb ORF [[54]]).
- Confidence on the overall rules (reject on the first screen, equal prominence, easy withdrawal): HIGH.

### Proof of Consent

- **The legal basis.** GDPR Art. 7(1) requires the controller to be able to *demonstrate* consent. The EDPB guidelines discuss how (EDPB 05/2020 [[46]]).
- **CNIL guidelines (délibération 2020-091).** They expect proof, and describe proof of *refusal* as part of the picture (Légifrance [[55]]; Lexology summary [[56]]). CNIL also recommends that proof be available to third parties who rely on the consent (Taylor Wessing [[57]]). Its companion recommendation suggests keeping the user's choice for about 6 months [UNVERIFIED exact figure] (CNIL recommandation [[58]]).
- **What is still unsettled.** No regulator requires a specific database. Some Klaro maintainers argue that if nothing loads without consent, server logs matter less (Klaro #532 [[17]]). That is a contrarian view. **Consensus:** keep a log of pseudonymous ID, timestamp, banner version or revision, language and choices. Confidence: MEDIUM.

### Cookie Declaration

- **What it must cover.** Users must be told each tracker's purpose, who sets it and how long it lasts, before they consent (EDPB/CNIL; CNIL recommandation [[58]]).
- **Doing it without a crawler.** Keep a hand-written table: name, provider, purpose, category, lifetime, storage type. Store it as JSON in the repository. Render it in the privacy policy and in the preferences modal's `cookieTable` sections [UNVERIFIED option name]. Check it each quarter in DevTools (Application → Cookies and Local Storage).
- **What goes in the table:**
  - Meta Pixel cookies: `_fbp` (cookieconsent.com [[59]])
  - PostHog `ph_*` cookies and local storage
  - Your own `cc_cookie` (Config reference [[2]])

## Phase 3 — Recommendation and Migration Outline

**Recommendation: CookieConsent v3, self-bundled from npm, with a Vercel consent-log route.**

**Why it beats the others:**
1. **Least migration effort.** Its blocking model is the same as Cookiebot's.
2. **Your Meta Lead rule maps directly onto the API** (`acceptedCategory('marketing')` with `onConsent` / `onChange`).
3. **Compliant defaults.** Equal-weight buttons and 182-day expiry are on by default, and re-consent is built in.
4. **Proven in Astro.** It has the largest user base and existing Astro integrations.
5. **Light.** No backend is needed for the banner itself.

c15t would win only if you wanted consent records managed for you without writing any code. That comes with a heavier framework stack or a hosted dependency.

**What you give up compared with Cookiebot:**
- the automatic cookie scan and auto-generated declaration
- hosted consent logs
- automatic blocking of scripts you forgot to tag
- Cookiebot's pre-written translations

**Minimum compliance setup to add around the tool:**
1. **First screen:** "Akceptuj wszystkie / Odrzuć wszystkie / Ustawienia" ("Accept all / Reject all / Settings"), with equal weight.
2. **Categories:** necessary (read-only), statistics (PostHog), marketing (Meta). All off by default.
3. **Consent log:** an `/api/consent` route storing:
   - `consentId`, timestamp, revision, language, accepted and rejected categories, `acceptType`
   - a hash of the user agent; no IP address, or a truncated one
   - Storage can be Vercel KV/Postgres or append-only logs. Keep records for the consent lifetime plus the limitation period [SPECULATIVE retention; ask counsel].
4. **Cookie declaration:** a JSON source rendered in both languages.
5. **Re-consent rule:** raise `revision` whenever you add a vendor or purpose, or change a category.
6. **Footer link** in both languages: "Ustawienia cookies" / "Cookie settings".

**Step-by-step migration:**
1. List every script and cookie currently tagged for Cookiebot (DevTools, plus Cookiebot's last scan report as a starting point).
2. `npm i vanilla-cookieconsent@3.3.x` and pin the exact version.
3. Write the configuration and Polish/English translations in one `consent.ts`, imported by the base layout.
4. Retag scripts: change `data-cookieconsent="marketing"` to `data-category="marketing"` and keep `type="text/plain"`. Add `data-service="Meta Pixel"` and `data-service="PostHog"`.
5. Meta: call `fbq('consent','revoke')` before `init`, then `grant` on consent, as Meta's consent API allows (CookieHub [[60]]; DEV [[61]]). Simpler and stricter: don't load the pixel at all until marketing consent.
6. Conversions API: on the server routes, send Lead only if the client passes the marketing flag. Read it from `cc_cookie` on the request [SPECULATIVE design].
7. PostHog: load only on statistics consent, and call `opt_out_capturing()` in `onChange` when it is switched off. PostHog also offers a `cookieless_mode` (PostHog tutorial [[62]]). Session recording still needs consent in my reading. SPECULATIVE.
8. Add the consent-log route and call it from `onConsent` and `onChange` (Consent logging [[13]]).
9. Tag the static example HTML files the same way, or confirm they load no trackers.
10. Test the following, then remove Cookiebot and cancel the subscription:
    - fresh visit: zero `_fbp` or `ph_` cookies and no requests to facebook.net or PostHog
    - reject flow
    - withdrawal flow
    - View Transitions, if you use them
    - keyboard-only and screen reader

**Risks to monitor:**
- **Forgetting to tag a new script.** Nothing scans for you any more. Do a quarterly DevTools audit.
- **Astro router bugs** (#728 [[34]]).
- **Maintainer concentration.** Watch the release feed and Snyk.
- **Polish law changes** (Electronic Communications Law) and new UODO statements.
- **Meta CAPI deduplication** working correctly with consent.

## Orphan Topics

### Consent without any banner: cookieless analytics as the real cost saver
Your Umami setup already removes analytics from the consent question. PostHog's `cookieless_mode: "always"` never stores data in cookies or local storage. In that mode it ignores opt-in and opt-out calls (PostHog tutorial [[62]]). Moving session replay behind consent while running cookieless aggregate analytics could cut the banner's scope to marketing only.

### "Load but opt out" versus "don't load": a hidden split between tools
- c15t's PostHog helper loads the script before consent and opts it out (c15t [[36]]).
- Meta's `fbq('consent','revoke')` pattern does the same with the pixel (DEV [[61]]).
- Contacting a third-party server before consent sends the visitor's IP address. It is debatable whether that is allowed under Art. 5(3) and the GDPR. The strict "don't load" pattern is safer. SPECULATIVE / contested.

### The library is not a CMP, and the project says so
The orestbida project describes its own limits openly: it is not a CMP, stores no records, does not implement TCF, and does not support Google AdSense from 2024 (Introduction [[6]]). That is unusual for a project, and it is a signal of trust worth weighing.

### Server-side consent signals for Conversions API
CAPI calls are made from your server, so the banner cannot block them. The consent check has to happen in your server code, a gap the documentation of every library I reviewed leaves out. SPECULATIVE.

### Open core drifting toward SaaS
- Osano's free library now mainly serves as a funnel to its hosted product (README [[20]]).
- c15t pairs an open library with a hosted inth.com backend (GitHub [[7]]).
- The same could happen to other projects. SPECULATIVE.

## Gaps and Open Questions

- **Release dates.** I could not reliably get exact dates for orestbida v3.2.x and v3.3.0, or for tarteaucitron v1.34.0. The npm page shows v3.3.0 as recently published (npm [[4]]).
- **Unchecked figures.** Bundle sizes, maintainer counts and Polish translation coverage were not measured or verified for any tool.
- **Accessibility.** No independent WCAG audit was found for orestbida, c15t or Silktide.
- **Klaro.** Whether it is maintained is unresolved.
- **Polish rules.** I did not find a dedicated UODO guideline on records of consent for cookies, or confirmation of which Polish authority enforces the new Electronic Communications Law cookie rule.
- **Taskforce report.** Its exact wording should be read directly (EDPB [[49]]).

---

## Sources

*The report's inline `[[n]]` markers index this list — not any numbered source inventory inside the report body. It lists each distinct link the provider returned or the report linked, cited or not; a marker numbered past its end had no source.*

1. [CookieConsent docs: manage scripts](https://cookieconsent.orestbida.com/advanced/manage-scripts.html)
2. [Config reference](https://cookieconsent.orestbida.com/reference/configuration-reference.html)
3. [Revision management](https://cookieconsent.orestbida.com/advanced/revision-management.html)
4. [npm](https://www.npmjs.com/package/vanilla-cookieconsent)
5. [Socket](https://socket.dev/npm/package/vanilla-cookieconsent)
6. [Introduction](https://cookieconsent.orestbida.com/essential/introduction.html)
7. [c15t GitHub](https://github.com/c15t/c15t)
8. [releases](https://github.com/AmauriC/tarteaucitron.js/releases)
9. [Silktide GitHub](https://github.com/silktide)
10. [issues](https://github.com/kiprotect/klaro/issues)
11. [release](https://github.com/orestbida/cookieconsent/releases/tag/v3.3.0)
12. [discussion](https://github.com/orestbida/cookieconsent/discussions/619)
13. [docs](https://cookieconsent.orestbida.com/advanced/consent-logging.html)
14. [npm](https://www.npmjs.com/package/c15t)
15. [newreleases](https://newreleases.io/project/github/AmauriC/tarteaucitron.js/release/v1.34.0)
16. [klaro-gridsome](https://www.npmjs.com/package/klaro-gridsome)
17. [issue](https://github.com/kiprotect/klaro/issues/532)
18. [docs](https://silktide.com/consent-manager/docs/google-consent-mode/)
19. [releases](https://github.com/osano/cookieconsent/releases)
20. [README](https://github.com/osano/cookieconsent/blob/dev/README.md)
21. [GitHub](https://github.com/68publishers/cookie-consent)
22. [GitHub](https://github.com/digital-craft-ltd/astro-cookie-consent)
23. [GitHub topic](https://github.com/topics/klaro)
24. [haasz](https://github.com/haasz/silktide-consent-manager)
25. [fleetingstork](https://github.com/fleetingstork/silktide-consent)
26. [Silverstripe](https://github.com/lerni/klaro-cookie-consent)
27. [Contao](https://github.com/pdir/klaro-consent-manager)
28. [TYPO3](https://packagist.org/packages/erhaweb/klaro-consent-manager)
29. [Grav](https://github.com/pmoreno-rodriguez/grav-plugin-orestbida-cookie-consent)
30. [releases](https://github.com/orestbida/cookieconsent/releases)
31. [cookiebaner.pl summarising UODO](https://cookiebaner.pl/2026/08/25/wytyczne-uodo-cookies-wordpress/)
32. [FAQ](https://cookieconsent.orestbida.com/additional/faq.html)
33. [Snyk](https://security.snyk.io/package/npm/vanilla-cookieconsent)
34. [#728](https://github.com/orestbida/cookieconsent/issues/728)
35. [issues](https://github.com/orestbida/cookieconsent/issues)
36. [c15t PostHog docs](https://c15t.com/docs/integrations/posthog)
37. [c15t org](https://github.com/c15t)
38. [Heavybit podcast](https://www.heavybit.com/library/podcasts/open-source-ready/ep-18-consent-management-with-christopher-burns)
39. [#868](https://github.com/AmauriC/tarteaucitron.js/issues/868)
40. [audit PDF](https://venissieux.fr/wp-content/uploads/2024/06/RGAA-Rapport-Audit-SITE-WEB-VILLE-VENISSIEUX.pdf)
41. [La French Tech](https://lafrenchtech.gouv.fr/en/accessibility/)
42. [Silktide](https://silktide.com/consent-manager/why-consent-v2/)
43. [UODO Biuletyn 03/2025](https://uodo.gov.pl/pl/file/5869)
44. [prawo.pl](https://www.prawo.pl/biznes/wazny-wyrok-wsa-nie-kazde-cookies-jest-dana-osobowa,512328.html)
45. [Lexology](https://www.lexology.com/library/detail.aspx?g=bec71b2e-36da-418a-a811-6193be8b4965)
46. [EDPB Guidelines 05/2020](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_202005_consent_en.pdf)
47. [DataGuidance](https://www.dataguidance.com/news/eu-edpb-adopts-guidelines-consent-under-gdpr)
48. [Lexology](https://www.lexology.com/library/detail.aspx?g=029679c6-1996-44b1-82ce-fb3082f32a76)
49. [EDPB](https://www.edpb.europa.eu/our-work-tools/our-documents/other/report-work-undertaken-cookie-banner-taskforce_en)
50. [Clubic](https://www.clubic.com/pro/legislation-loi-internet/cnil/actualite-402129-le-cookie-de-trop-la-cnil-epingle-google-et-facebook-a-hauteur-de-150-et-60-millions-d-euros.html)
51. [BDM](https://www.blogdumoderateur.com/google-facebook-lourdement-sanctionnes-cnil/)
52. [DSK PDF](https://www.datenschutzkonferenz-online.de/media/oh/20221205_oh_Telemedien_2021_Version_1_1_Vorlage_104_DSK_final.pdf)
53. [noyb 500+ complaints](https://noyb.eu/en/noyb-aims-end-cookie-banner-terror-and-issues-more-500-gdpr-complaints)
54. [noyb ORF](https://noyb.eu/en/noyb-success-orfat-must-correct-misleading-cookie-banner)
55. [Légifrance](https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000042398005)
56. [Lexology summary](https://www.lexology.com/library/detail.aspx?g=43d395f0-ab5b-4a51-9184-31ef113b26b0)
57. [Taylor Wessing](https://www.taylorwessing.com/en/insights-and-events/insights/2020/10/french-data-protection-authority-publishes-new-guidelines)
58. [CNIL recommandation](https://www.cnil.fr/sites/default/files/atoms/files/recommandation-cookies-et-autres-traceurs.pdf)
59. [cookieconsent.com](https://www.cookieconsent.com/cookies/fbp/)
60. [CookieHub](https://support.cookiehub.com/article/551-meta-pixel-consent-mode)
61. [DEV](https://dev.to/builderify/your-meta-pixel-is-tracking-visitors-before-they-accept-cookies-heres-how-to-fix-it-1af)
62. [PostHog tutorial](https://posthog.com/tutorials/cookieless-tracking)