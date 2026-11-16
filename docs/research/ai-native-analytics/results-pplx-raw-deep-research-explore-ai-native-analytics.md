---
provider: "pplx"
model: "openai/gpt-6-luna"
brief: "brief-pplx-explore-ai-native-analytics.md"
duration_ms: 124584
input_tokens: 371379
output_tokens: 10453
cost_usd: 0.0336
truncated: False
citation_scheme: "unified"
---

# Research Results: brief-pplx-explore-ai-native-analytics

**Provider:** pplx (openai/gpt-6-luna)

---

# Research report: How People Solve Website Analytics in the AI-Agent Era

**Filename:** `brief-pplx-explore-ai-native-analytics.md`  
**Research date:** November 10, 2026  
**Scope note:** This report prioritizes documented capabilities and dated firsthand accounts. Vendor claims are labeled **[VENDOR: company]**. Where a price, legal conclusion, or independent proof could not be verified, that limitation is stated rather than filled with an estimate.

## Executive Summary

The clearest practical shift is not that AI has made dashboards obsolete. It is that an analytics interface can now be a connector to an agent’s existing workbench: a developer asks a question in an editor, the agent queries analytics, and the result sits next to the code that could fix the problem. PostHog, Mixpanel, Amplitude, Microsoft Clarity, Contentsquare, and Umami now document MCP access in some form; the maturity, permissions, limits, and ability to write changes vary considerably. [[3, 22, 29, 59, 67, 146]]

But **data access is not the main bottleneck**. A useful loop needs an agreed goal, reliable event definitions, a question that can distinguish causes, and a change small enough to evaluate. Research on natural-language SQL finds that queries can execute successfully yet answer the wrong question; schema details and runtime validation help, but business meaning remains a major failure source. [[105, 108, 111]]

For a small marketing site, the strongest near-term pattern is therefore **agent-assisted diagnosis, human-approved change, and disciplined before/after measurement**—not an agent autonomously “optimizing” a site. Low traffic limits what split tests can establish. Practitioner guidance instead recommends using session recordings, usability research, interviews, and feedback to generate hypotheses, then measuring whether a single meaningful change moves both primary and proxy conversions. [[45, 48, 53]]

For this Polish/English Astro site, there is no strong case to replace Umami just to acquire an AI interface. Its self-hosted deployment can now expose an official, read-only MCP server, although the feature is disabled by default and requires Umami v3.4.0 or later. The owner can instead start with an event/metric glossary, a few high-value events, and a read-only agent routine. If the next priority is behavior evidence, Microsoft Clarity is free and offers recordings and AI summaries, but its MCP data-export interface is limited to 10 requests per day and up to three days of data per request. Its privacy and consent fit should be assessed separately from “free.” [[29, 14, 15, 22]]

Five cross-cutting findings stand out:

1. **The first valuable agent task may be defining what to measure**, not interpreting reports. A tracking plan and glossary give the agent a smaller, better-defined language to use. [[103, 107]]
2. **Connectors and raw SQL are not alternatives so much as different trust boundaries.** MCP is convenient; a database with reviewed metric definitions can offer more control and reproducibility. The cost of raw SQL is that the model must infer meaning and joins unless the owner documents them. [[3, 105, 111]]
3. **Qualitative evidence is a practical response to low traffic**, not a lesser substitute for A/B testing. Recordings and customer conversations can reveal friction; they cannot establish that a proposed copy change caused a conversion lift. [[45, 49]]
4. **AI summaries can compress inspection, but may send behavioral or personal data to another processor.** Contentsquare’s documentation, for example, distinguishes the data sent for individual and group session summaries; the privacy review must include the AI layer, not only the analytics host. [[77, 139]]
5. **A good agent workflow is constrained by permissions and reversibility.** In this case, read-only analysis, a proposed patch, human review, a deploy marker, and an explicit rollback path are more defensible than “let the agent change the site.” This is a recommendation based on the documented limits of text-to-SQL and the documented availability of write-capable analytics tools, not a claim that autonomous site changes have been proven safe. [[60, 105]]

## Map of Approaches

### 1. Ask the analytics product directly through MCP

**How it works.** An MCP server exposes analytics queries as tools. The agent can request a funnel, trend, breakdown, or report in natural language, and the server returns results from the analytics system. The approach removes repeated dashboard navigation, but it does not guarantee that the question was well specified or the answer interpreted correctly. [[3, 22, 29]]

**Who uses it.** It is most immediately useful to technical founders and developers who already work in an MCP-capable editor. PostHog documents Claude Code support and tools for analytics, SQL, experiments, and feature flags; Amplitude and Mixpanel document MCP access to analytics data and other product surfaces. [[3, 63, 67]]

**Examples and trade-offs.** PostHog’s hosted MCP supports query tools, SQL, and write-capable actions across products; account region determines whether the request routes to the EU or US server. **[VENDOR: PostHog]** Its breadth is useful, but write capability makes scopes and approvals important. [[4, 7]] Umami’s official MCP is narrower and read-only, and is available for self-hosted deployments from v3.4.0 when enabled. **[VENDOR: Umami]** It may be a smaller change for an owner already running Umami. [[29, 32]]

**Why it matters here.** A connector is attractive because the agent already works inside the Astro repository. The key question is not “Can Claude ask about traffic?” but “Can it answer a repeatable question about positioning-page visits, email signups, purchases, and the path between them—with definitions the owner trusts?” Treat the connector as a transport, not an analytics method.

### 2. Give the agent API results or exported data rather than an MCP server

**How it works.** A script or scheduled job retrieves analytics through an API, exports results, or prepares a small dataset for an agent. Plausible’s Stats API, for example, is a read-only HTTP interface for historical and real-time statistics; the current documentation identifies it as a Business-plan feature. [[90]]

**Who uses it.** This works for a founder who wants repeatable answers in a daily/weekly report, or wants to limit the data the agent can inspect. It can also be easier to version and test than an open-ended agent connection.

**Trade-offs.** Building a script adds maintenance, but can enforce a fixed date range, denominator, locale split, and conversion definition. A product API may return only aggregated metrics; raw events, if available, require a separate privacy and access review. Plausible says raw event exports are not self-serve or real-time and are part of Enterprise plans. [[33]]

**Why it matters here.** A small script could produce a compact bilingual landing-page report from Umami data and place it in the repository or a scheduled message. That is more deterministic than asking an agent to reconstruct a comparison from many unconstrained tool calls. This is an implementation recommendation, not a documented case result.

### 3. Put raw events in a database, then query with SQL

**How it works.** Events are exported or collected in a database/warehouse; the agent inspects table schemas and executes SQL. This gives the owner direct access to event-level data and can reduce reliance on a vendor’s interface.

**What can go wrong.** The hardest failures may be semantic rather than syntactic. A Microsoft engineering evaluation reported approximately 75% accuracy for its custom NL-to-SQL implementations; it found schema and business documentation important, and reported that accuracy collapsed to 38.46% when runtime query validation was removed. Remaining failures often involved business logic even when SQL ran. [[105]] A separate study of NL database interfaces found plausible, executable wrong answers were common among incorrect submissions. [[108]]

**Practical implication.** Raw SQL is not automatically more truthful than a connector. It is valuable when paired with descriptions of table grain, join keys, event meaning, and tested reference queries. Without those, the agent can be “precisely wrong.”

**Why it matters here.** The site’s current event volume may not warrant a warehouse. A compact CSV/API extract or a fixed query script can provide the useful control without creating a data-engineering project.

### 4. Define a small semantic contract: events, metrics, and question templates

**How it works.** A semantic layer or written glossary makes business concepts explicit—such as “signup,” “purchase,” “landing page,” and the denominator for conversion. In larger data stacks, dbt’s Semantic Layer exposes governed metrics to tools including AI agents through its MCP server. [[103, 107]]

**What the evidence says.** dbt’s documentation describes centralized metric definitions and automatically handled joins; it presents this as a way to provide consistent metric meaning across downstream tools. **[VENDOR: dbt]** [[103]] The Microsoft text-to-SQL evaluation reinforces the mechanism: technical schema metadata alone is not enough when fields have domain-specific meanings. [[105]]

**Small-site version.** A full semantic layer is likely overkill. A version-controlled `analytics.md` can define:
- the event name and trigger condition;
- whether an event is client- or server-side;
- what counts as a successful signup or paid purchase;
- the denominator for each conversion rate;
- exclusions, including internal traffic and test purchases;
- page variants and locale mapping;
- standard comparison windows and caveats.

**Connection.** This makes the agent’s prompts reproducible and the owner’s decisions auditable. It also gives a future migration a clearer contract than a collection of dashboard screenshots.

### 5. Use AI to summarize behavior, not just totals

**How it works.** Session replay and heatmap tools capture interactions; AI can summarize a session, a group of sessions, or a page’s patterns. Microsoft Clarity documents Copilot summaries for recordings and heatmaps. **[VENDOR: Microsoft]** [[14, 15]] Contentsquare documents AI-generated summaries and a remote MCP server for querying experience analytics. **[VENDOR: Contentsquare]** [[73, 77, 146]]

**Who uses it.** This is particularly useful when a site has too few conversions to slice confidently but enough visits to inspect recurring usability problems. Practitioner guidance recommends reviewing a modest set of sessions and looking for repeated friction, while warning implicitly against treating one session as a representative sample. [[45, 48]]

**Trade-offs.** Replays are not just anonymous counts. They may include page content, URLs, clicks, error events, and user/session identifiers. Contentsquare’s documentation lists data sent to its AI models for replay summaries and describes additional fields in group summaries. [[77]] Summarization reduces the cost of viewing sessions, but does not remove privacy, masking, or interpretation risks.

**Why it matters here.** A useful question is “Do visitors on the Polish pricing page reach the purchase CTA, and what do sessions show immediately before exit?” That question connects behavior to a specific possible site change. “Summarize my recordings” is less likely to end in an experiment.

### 6. Pair quantitative trends with interviews and on-site feedback

**How it works.** Analytics identifies where a journey changes; interviews, short surveys, or usability sessions help explain why. Low-traffic CRO guidance recommends customer conversations, heuristic audits, recordings, and form analytics before relying on underpowered tests. [[45, 48]]

**What it can and cannot answer.** A handful of observed users may reveal confusion or a missing answer, but cannot estimate the population conversion lift of a new headline. Webflow’s CRO guidance frames qualitative methods and A/B tests as complementary: replay and heatmap evidence explain behavior, while controlled tests estimate the effect of a change. [[49]]

**Why it matters here.** If a particular positioning page gets few visits, an agent can organize interview notes and compare them with page events—but should distinguish “three users asked about compatibility” from “compatibility copy improves purchases.” A human should validate qualitative summaries against the source material.

### 7. Turn anomalies into an operating cadence

**How it works.** Some analytics products offer summaries, alerts, or scheduled reports; an outside agent can also run a fixed query on a schedule. PostHog documents a weekly web analytics digest and MCP routines for traffic, sources, goals, and comparisons. **[VENDOR: PostHog]** [[168]]

**Trade-offs.** A digest is helpful only if it limits itself to meaningful changes and makes the underlying comparison visible. Small sites can generate noisy percentage changes from tiny denominators. A report that says “signups fell 50%” without displaying “from two to one” invites a misleading intervention.

**Small-site habit.** Use a weekly review, not a constant stream of alerts, unless there is a known operational failure such as a broken purchase flow. Report counts, rates, denominators, date range, and comparison period together.

### 8. Let the agent propose code, but keep the experiment and release human-controlled

**How it works.** An agent queries analytics, proposes a hypothesis, drafts a code change, and a human approves the patch. The owner deploys it and measures the result. Some analytics platforms also expose experiments or feature flags through agent connectors. **[VENDOR: PostHog]** [[3, 4]]

**Evidence and limits.** PostHog documents examples of customers using agents to query data, and a founder case in which the MCP became the main way of adding tracking and asking questions. **[VENDOR: PostHog]** The available account of SoundBoost is a vendor-published case, not an independent controlled evaluation. [[161]] There is not strong independent evidence in the sources reviewed that fully autonomous agents consistently increase conversion on low-traffic marketing sites.

**Why it matters here.** The existing human-approval constraint is a strength. The best first “closed loop” is likely not autonomous experimentation; it is an issue with evidence, a reviewed change, and an explicit post-deploy readout.

## Existing Products (free and paid)

Products below are grouped by the approach they represent. Prices are stated only where verified in the cited material. “EU stance” means documented hosting or residency information, not a blanket determination of GDPR compliance. Vendor descriptions are labeled accordingly.

| Approach | Product | What it does | Free tier / entry price | EU hosting / privacy stance | Agent access | Evidence of real use |
|---|---|---|---|---|---|---|
| Lightweight web analytics with agent access | **Umami** | Website statistics; official MCP can query analytics. [[29]] | Self-hosted software is open source; Umami Cloud price not verified here. **[VENDOR: Umami]** [[35]] | Self-hosting allows the operator to choose infrastructure; GDPR treatment depends on configuration and use. [[35]] | Official read-only MCP for self-hosted v3.4.0+; Cloud MCP requires Pro, Business, or Enterprise. [[29, 37]] | Official docs describe supported analytics queries, not independent conversion-lift evidence. |
| Privacy-oriented web analytics | **Plausible** | Aggregated web analytics; API for programmatic stats. [[90]] | Official docs confirm a 30-day trial but do not state current entry price on the subscription-plan page. A third-party page reports $9/month at 10k pageviews; treat that price as **[UNVERIFIED]** pending checkout confirmation. [[89, 98]] | Company says visitor data is processed and stored in the EU, without cookies or persistent identifiers; its legal position is vendor-provided, not a universal legal ruling. **[VENDOR: Plausible]** [[88, 93]] | Business-plan Stats API; a Plausible-hosted doc describes a community-built MCP, not an official integration. [[90, 33]] | Published customer statement from the Rails Foundation is presented on Plausible’s EU hosting page; this is vendor-selected evidence. [[99]] |
| All-in-one analytics and agent platform | **PostHog** | Web/product analytics, replay, experiments, flags, SQL and MCP. [[3, 4]] | **[VENDOR]** 1M events and 5,000 recordings/month on the free tier; usage-based charges above allowances. [[16, 20]] | **[VENDOR]** EU Cloud region in Frankfurt; PostHog says EU data remains in its EU instance. It also warns EU deployment alone does not satisfy all GDPR obligations. [[13, 21]] | Hosted official MCP; supports SQL and analytics, with some write tools. [[3, 7]] | Vendor documents customer examples including Runable and SoundBoost; not independent controlled case studies. [[161]] |
| Session replay and AI behavioral analysis | **Microsoft Clarity** | Free recordings, heatmaps, and AI summaries. [[14, 15]] | **[VENDOR]** Free, with no traffic limit stated on its pricing page. [[15]] | Microsoft says data is held in Azure and describes EU customers’ arrangement with Microsoft Ireland and cross-border transfers under SCCs; this is not the same as EU-only storage. **[VENDOR: Microsoft]** [[14]] | Official MCP server uses Data Export API token; 10 requests/day, max three days of data and three dimensions per request. [[22]] | Microsoft-published Netpeak case reports a 7.36% increase in add-to-cart conversion after redesigning product pages based on behavior evidence. This is vendor-published and not proof that AI caused the lift. [[50]] |
| Experience analytics plus AI/MCP | **Contentsquare** | Replays, heatmaps, funnels, surveys, session summaries, and MCP. [[73, 77, 146]] | **[VENDOR]** Free plan up to 200k sessions/month; Growth from $39/month shown on pricing page. [[73]] | Pricing page reviewed here does not specify EU data residency. Do not assume hosting location from regional billing. [[73]] | Official MCP with OAuth; Free plan includes up to 300 tool calls/month. [[146, 150]] | Official pricing and documentation establish features and limits; no independent small-site uplift evidence established here. |
| Product analytics with agent access | **Amplitude** | Analytics, charts, dashboards, experiments, cohorts, taxonomy through MCP. [[59, 60]] | Current Free-plan price/limits not verified in the pages reviewed; MCP docs say the MCP service account feature is Enterprise or a Plus add-on, while other documentation describes broader existing-customer access. Verify plan eligibility before adopting. [[59, 60]] | **[VENDOR]** EU-residency MCP endpoint exists; use it when data is in Amplitude’s EU region. [[59, 69]] | Official OAuth MCP; read/write actions depend on account permissions and plan. [[60]] | Feature documentation is available; no small marketing-site case with measured conversion lift established here. |
| Product analytics with agent access | **Mixpanel** | Product analytics and MCP, with API support. [[65, 67]] | Current entry price not established from the cited pricing page extract; verify the current plan and query limits before purchase. [[62]] | **[VENDOR]** EU project residency is available but is not the default; ingestion and query endpoints must be configured for the EU. [[58]] | Official MCP endpoint for EU region; free plans may have Query API access limits. [[67]] | No small marketing-site conversion outcome independently verified here. |
| AI-first website analytics and testing | **Humblytics** | Web analytics, experiments, hosted MCP and REST API. [[147, 154]] | **[VENDOR]** First 5,000 data points and one site free; one-time $39 for 100,000 data points is listed for its Agents plan; team plans listed separately. [[151, 154]] | Vendor describes privacy-first anonymization, but the reviewed material does not establish EU-only hosting. Check DPA, subprocessors, and residency before sending EU data. [[151]] | Hosted MCP and REST API listed as available on every plan. [[154]] | Product documentation and pricing establish availability; independent adoption or controlled results not verified here. |
| Low-cost event analytics with MCP | **Databuddy** | Analytics, with docs describing MCP and other integrations. [[155]] | **[VENDOR]** Free up to 10,000 events/month. [[155]] | EU hosting/residency not verified in the cited docs. | Docs identify MCP, but exact scopes and plan restrictions were not independently verified here. [[155]] | Independent evidence of real-world use or measured lifts not established. |

**Product interpretation.** The more comprehensive products are not automatically the best fit. For an owner already using self-hosted Umami, official read-only MCP is a relatively direct path to agent access. For session-level diagnosis, Clarity and Contentsquare offer much richer behavior evidence, but those tools require a separate privacy assessment and may add a second analytics tag. For a privacy-first cloud alternative, Plausible publishes unusually clear data-location claims, but its Stats API is on Business and the MCP documented in its own site is community-built. [[29, 22, 77, 88, 90]]

## From Insight to Site Change

A useful loop for this site can be stated as:

**Question → evidence → hypothesis → patch → release marker → measurement → decision.**

1. **Question.** Ask a question tied to a decision, e.g. “Do visitors on the English positioning page click the free-skill CTA but fail to complete signup more often than visitors on the Polish page?”
2. **Evidence.** Retrieve counts, rates, and denominators for the relevant time window. If the answer depends on a funnel, verify the underlying event names and whether the event fires at the intended point.
3. **Hypothesis.** State a possible cause and a falsifiable change: “The CTA is visible, but its promise does not explain what arrives by email; add a one-sentence deliverable description.”
4. **Patch.** Have the agent draft the Astro change and show the files changed. Do not grant permission to deploy or rewrite pricing/claims without approval.
5. **Measurement.** Mark the deployment date and compare primary events plus useful proxies, such as CTA click and signup start. Avoid reading a small change in purchase count as decisive proof.
6. **Decision.** Keep, revert, or gather more evidence; save the result and uncertainty.

The strongest readily documented pattern is still **AI helping an existing human workflow**, rather than a fully autonomous CRO system. PostHog’s own use-case docs describe querying a funnel, examining paths among drop-offs, and correlating the problem with errors or logs before creating an alert. **[VENDOR: PostHog]** [[161]] That structure is useful because it combines multiple evidence types before proposing a fix.

For lower-volume pages, treat a replay or interview as **hypothesis-generating evidence**, not a conversion-effect estimate. Practitioner guidance recommends examining repeated patterns across sessions, combining them with customer interviews and form analytics, and making a meaningful change at a time. [[45, 48]] For the bilingual site, segment by locale and landing-page positioning only when event counts remain interpretable; otherwise, keep the finding broad and accumulate observations over a longer period.

An A/B test is valuable when it can be run long enough to answer a meaningful question. It is not mandatory for every change. A repair to a broken purchase link can be justified directly; a strategic positioning change should be treated as uncertain if traffic is too low to compare variants. Before/after measurement can be useful operationally, but is vulnerable to changes in traffic source, seasonality, and campaign mix; label it directional rather than causal. **This is a methodological inference**, consistent with CRO guidance distinguishing controlled tests from observational methods. [[49, 53]]

## Privacy and Compliance

**Cookieless is not synonymous with “no privacy work.”** EU requirements can involve both the GDPR and national ePrivacy implementation. The EDPB says the GDPR applies to cookie processing involving personal data and notes that technically necessary cookies are the exception to consent; this does not establish that all analytics or replay tools are exempt. [[133]]

The CNIL’s audience-measurement exemption is a useful example of a **national regulator’s conditional approach**, not a blanket EU exemption. Its criteria include a purpose limited to measuring the publisher’s audience, producing anonymous statistics, not cross-checking with other processing, and not tracking a person across sites; it also recommends informing users and limiting retention. [[134, 135]] Whether a specific tool and configuration qualifies should be checked against the applicable jurisdiction and the site’s actual processing.

Plausible says its visitor data is processed and stored in the EU, and that it does not use cookies or persistent identifiers; it also publishes a DPA. **[VENDOR: Plausible]** [[88, 93]] PostHog documents a Frankfurt EU instance but explicitly says that choosing EU hosting does not by itself satisfy every GDPR obligation. **[VENDOR: PostHog]** [[13]] Clarity, by contrast, describes EU customer contracting and cross-border transfers via Microsoft Ireland and SCCs; this is not an EU-only data-residency claim. **[VENDOR: Microsoft]** [[14]]

**AI processing changes the data-flow map.** An EU-hosted analytics store does not by itself answer whether a replay, URL, event property, or session identifier is sent to a separate model provider. Contentsquare’s help documentation lists session and interaction details sent for replay summaries, and notes that group summaries can include hashed user/session identifiers and issue details. It says its cloud providers host copies of models and that customer data is not sent to the original model developer organizations. **[VENDOR: Contentsquare]** [[77]] This is specific product documentation, not a general assurance for other AI features or third-party agents.

The EDPB says that making personal data available to an organization in a third country can constitute an international transfer, subject to Chapter V requirements; data minimization and a lawful basis still apply. [[139, 140]] For the site owner, practical safeguards include avoiding email addresses and form contents in event properties, masking replay inputs, avoiding unnecessary query strings with personal data, checking processor agreements and subprocessors, and asking whether the external AI client retains prompts or tool results. These are prudent controls, not legal advice.

## What Fails

### Plausible numbers can be wrong numbers

A query may run and return a credible result while using the wrong event, join, denominator, or date definition. The Microsoft evaluation documented business-logic failures among queries that executed; a separate study likewise found many incorrect submissions returned plausible non-empty results. [[105, 108]] Require the agent to show its metric definition and query logic—or use a pre-validated report—when a result will guide a change.

### Tiny samples invite overreaction

A percentage can swing dramatically when a site has only a few conversions. Low-traffic CRO sources recommend qualitative research, larger changes, and micro-conversion measures rather than repeated small split tests. [[43, 45, 47]] For this site, always display raw counts beside rates and do not interpret a one-week difference as a stable trend.

### Generic advice is not an action plan

“Improve the CTA” is not a useful output. A recommendation should identify the page, the observed friction, the proposed code-level change, the metric expected to move, and the conditions under which the owner would revert it. This is a recommended operating standard; the sources reviewed do not establish that generic agent advice routinely improves conversion.

### Connectors can conceal access and write scope

Some MCP servers are read-only; others expose write actions or experiments. Umami documents a read-only server, while PostHog documents write-capable tools and Amplitude documents read/write access according to permissions. [[29, 7, 60]] Least-privilege credentials and project-scoped OAuth access are sensible even for a single-person business.

### “AI analysis” can add processing, not remove it

AI summaries and conversational interfaces may introduce additional processors and transfer questions. Contentsquare’s replay-summary documentation shows why an owner must inspect what is sent, rather than infer privacy from the analytics vendor’s general positioning. [[77, 139]]

### Product claims are not independent results

Vendor case studies can reveal what a team did, but should not be read as causal proof unless the design, baseline, sample, and confounders are clear. The Microsoft-published Netpeak example reports a 7.36% add-to-cart increase after product-page changes informed by Clarity; it does not isolate an AI effect. [[50]] The same caution applies to vendor-published customer examples of analytics agents. [[161]]

## Fit for a Small EU Marketing Site

**Recommended first move: preserve the current Umami setup and make it more legible to an agent.** The site already has a lightweight, self-hosted analytics baseline. Umami’s official read-only MCP makes a low-disruption trial possible if the installed version supports it; on self-hosted instances, the docs say MCP is disabled by default and requires v3.4.0 or later. [[29, 35]]

### A practical sequence

**1. Write the event and metric contract.** Define `free_skill_signup`, `purchase`, primary CTA clicks, the event that marks a completed signup, and how paid revenue is attributed. Specify locale, landing-page variant, and test/internal-traffic handling. This applies the semantic-layer lesson without adding a warehouse. [[103, 105]]

**2. Try read-only agent access.** Connect the agent to self-hosted Umami and test a fixed set of questions: page traffic by landing page and language; clicks and completed signups by variant; purchase counts and revenue, if accurately captured; and comparisons across explicit date ranges. Start with a read-only connection and verify the answer against Umami’s own figures. [[29, 32]]

**3. Use a weekly review with a small question backlog.** Example questions:
- Which page/locale received the most qualified visits this week?
- Did signups change in raw counts and rate, and what was the denominator?
- Did the top CTA receive clicks but not downstream completions?
- Did traffic source or page mix change enough to explain the headline rate?
- What observation would make us reject the proposed explanation?

These prompts are recommendations tailored to the site; they are not claimed as a validated industry playbook.

**4. Add replay only for a named question.** If the unresolved issue is “why do visitors leave?” rather than “how many leave?”, test a behavior tool on the relevant pages. Clarity offers AI summaries and a documented MCP, but the MCP has limited export API requests and Microsoft documents cross-border data arrangements for EU customers. [[14, 22]] Contentsquare provides a larger free session allowance and MCP access, but review the AI and privacy data flows before enabling summaries. [[73, 77, 146]]

**5. Keep deployment and measurement human-approved.** Have the agent propose a patch, show the proposed event implications, and record a deploy marker. Review the result after an appropriate window without describing a small, confounded before/after change as a causal test. This fits the low-traffic constraint and avoids giving the agent authority it does not need.

**Bottom line:** The most proportionate setup is not “migrate to the biggest AI analytics product.” It is **Umami + a versioned measurement contract + a read-only MCP trial + a weekly evidence-to-code review**. Add behavior analytics only when counts cannot answer a concrete “why” question. If EU-only residency is a hard requirement, verify the exact analytics and LLM data paths before selecting a hosted replay or AI-summary feature.

## Orphan Topics — Required section

### The site itself may need to become legible to agents

Analytics products are beginning to describe agent traffic and agent usability as a new measurement problem. PostHog’s 2026 web analytics materials discuss distinguishing AI-agent sessions from human sessions and identifying flows agents fail to complete; its team plan describes this as a developing area, with some work still pending broader release. **[VENDOR: PostHog]** [[120]] This is not yet a reason to optimize a small site for hypothetical agent traffic, but it creates a useful future question: can an AI browser discover the offer, understand the two languages, and reach signup or checkout?

For this site, the transferable practice is to treat accessibility, clear page structure, stable forms, and machine-readable product information as part of conversion reliability—not as a separate “AI optimization” project. The sources reviewed do not establish a measured conversion uplift from making a small bilingual marketing site more agent-readable.

### Analytics questions can become an evaluation set

A recurring set of questions is more useful than a stream of one-off chats if the owner can compare answers over time. This follows from the accuracy evidence: model-generated queries need schema context and execution validation, and successful SQL alone does not guarantee a semantically correct answer. [[105, 108]]

Keep five to ten fixed questions with expected definitions, such as “signup conversion by landing page,” and check the resulting counts against a known report. This turns the agent from an impressive demo into a tool whose failure modes the owner can notice.

### A deploy log is part of analytics

A before/after comparison is difficult to interpret if the owner cannot recall what changed, when it shipped, or whether the traffic mix changed. A short deploy record—date, pages affected, hypothesis, metric, and rollback condition—creates context for the agent’s next readout. This is a practical inference from the need to distinguish business changes from SQL/metric errors; the sources reviewed do not identify a standardized “deploy log for AI analytics.”

### Your agent’s own behavior can become measurable

PostHog’s MCP Analytics is a vendor feature that records tool calls, agent intent, latency, errors, and missing capabilities. **[VENDOR: PostHog]** [[1, 2]] The larger transfer is that an analytics agent should be evaluated too: which questions did it answer, which tools did it call, when did it fail, and where did it make an unsupported recommendation? This matters most if the owner later automates recurring analysis, not necessarily during a first small-site trial.

## Open Questions and Thin Evidence

- **Independent small-team results remain thin.** Sources reviewed document connector availability and vendor customer examples, but few independent cases show a solo founder’s entire workflow—from event schema through agent query to a measured marketing-site change. [[161, 170]]
- **The best alternative to A/B testing is context-dependent.** Practitioner sources consistently recommend recordings, interviews, usability tests, and before/after measurement for low traffic, but a “five users” or “20 recordings” rule should be treated as a heuristic, not a guaranteed discovery threshold. [[43, 45, 49]]
- **Legal conclusions cannot be generalized from vendor claims.** Plausible’s own legal assessment and privacy claims, the CNIL’s conditional audience-measurement exemption, and the EDPB’s transfer guidance address different questions. A no-cookie claim does not establish that session replay or LLM processing requires no review. [[93, 134, 139]]
- **Tool plans and MCP limits change quickly.** Clarity’s export limits, Umami Cloud plan eligibility, Contentsquare tool-call allowances, and product prices should be rechecked before deployment or purchase. [[22, 29, 146, 73]]
- **Autonomous conversion optimization is not established for this use case.** Some products expose experiments or write tools, but the evidence reviewed does not demonstrate that unrestricted agent-driven changes outperform a human-approved workflow for low-volume bilingual marketing pages. [[7, 60]]
- **The central unanswered question is not which AI analyst is smartest.** It is whether the site has enough well-defined events, behavioral evidence, and repeatable decision questions for an agent’s recommendation to be more useful than a human reading a handful of carefully selected sessions. The practical answer is to test that narrowly, with a fixed question set and human approval, before migrating tools or expanding permissions.

---

## Sources

*The report's inline `[[n]]` markers index this list — not any numbered source inventory inside the report body. It lists each distinct link the provider returned or the report linked, cited or not; a marker numbered past its end had no source.*

1. [MCP Analytics - Docs - PostHog](https://posthog.com/docs/mcp-analytics)
2. [Getting started with MCP Analytics - Docs](https://posthog.com/docs/mcp-analytics/start-here)
3. [Use product analytics over PostHog MCP - Docs](https://posthog.com/docs/product-analytics/surfaces/mcp)
4. [PostHog MCP FAQ and advanced setup - Docs](https://posthog.com/docs/model-context-protocol/faq)
5. [How to set up MCP analytics and error tracking](https://posthog.com/tutorials/mcp-analytics)
6. [Implementing MCP tools - Handbook](https://posthog.com/handbook/engineering/ai/implementing-mcp-tools)
7. [model-context-protocol.md](https://posthog.com/docs/model-context-protocol.md)
8. [PostHog MCP – Ask questions. Get answers.](https://posthog.com/mcp)
9. [Official PostHog MCP Server](https://github.com/posthog/mcp)
10. [posthog.com/contents/docs/mcp-analytics/installation/other-languages.mdx at master · PostHog/posthog.com](https://github.com/PostHog/posthog.com/blob/master/contents/docs/mcp-analytics/installation/other-languages.mdx)
11. [Talking to the Warehouse: Text-to-SQL and the Semantic Layer](https://vishalsingh.org/ch17-text-to-sql)
12. [Retrieval-Augmented NL2SQL Generation with Data ...](https://dl.acm.org/doi/10.1145/3767695.3769489)
13. [Introducing PostHog Cloud EU](https://posthog.com/blog/posthog-cloud-eu)
14. [Frequently asked questions](https://learn.microsoft.com/en-us/clarity/faq%20)
15. [Pricing - Clarity](https://clarity.microsoft.com/pricing)
16. [PostHog pricing – Start free, scale when you need](https://posthog.com/pricing)
17. [Data pipelines pricing](https://posthog.com/data-pipelines/pricing)
18. [Self-host PostHog - Docs - PostHog](https://posthog.com/docs/self-host)
19. [FAQ](https://posthog.com/faq)
20. [Product Analytics pricing – PostHog](https://posthog.com/product-analytics/pricing)
21. [Privacy compliance - Docs - PostHog](https://posthog.com/docs/privacy)
22. [Microsoft Clarity MCP Server | Microsoft Learn](https://learn.microsoft.com/en-us/clarity/third-party-integrations/clarity-mcp-server)
23. [PostHog for enterprise](https://posthog.com/enterprise)
24. [PostHog vs Plausible in-depth tool comparison](https://posthog.com/compare/posthog-vs-plausible)
25. [Clarity Overview | Microsoft Learn](https://learn.microsoft.com/en-us/clarity/setup-and-installation/about-clarity)
26. [Product Analytics pricing - Docs - PostHog](https://posthog.com/docs/product-analytics/pricing)
27. [With AI](https://clarity.microsoft.com/lang/en-gb)
28. [MCP – umami](https://docs.umami.is/docs/cloud/mcp)
29. [MCP - Umami docs](https://docs.umami.is/docs/mcp)
30. [Introducing Umami MCP: Your Analytics, in Conversation](https://umami.is/blog/introducing-umami-mcp)
31. [Docs](https://docs.umami.is/docs)
32. [Umami v3.4](https://umami.is/blog/umami-v3.4)
33. [Accessing your Plausible data | Plausible docs](https://plausible.io/docs/data-access)
34. [Sealmetrics Blog | Sealmetrics Docs](https://docs.sealmetrics.com/blog)
35. [FAQ – umami](https://docs.umami.is/docs/faq)
36. [Umami API — Docs, OpenAPI & Kin Score](https://apis.io/providers/umami/)
37. [Overview - Umami](https://docs.umami.is/docs/cloud)
38. [Umami MCP – Your Analytics, in Conversation](https://umami.is/mcp)
39. [developers.fathom.ai](https://developers.fathom.ai/mcp)
40. [Plausible Analytics MCP Server and REST API | MCP.ai](https://mcp.ai/plausible_analytics/en)
41. [Documentation](https://privatrak.com/docs/plausible-alternative)
42. [Who uses Fathom Analytics? 49 products built with it](https://howmakersbuild.com/tools/fathom)
43. [www.webenture.com › blog › cro-without-ab-testingCRO Without A/B Testing: What to Do When You Don't Have ...](https://www.webenture.com/blog/cro-without-ab-testing)
44. [CRO Testing: 7 Test Types, When to Use Each, and How to Plan](https://kirro.io/cro-testing)
45. [CRO Roadmap for Low-Traffic Websites](https://www.zspace.in/blogs/cro-strategy-low-traffic-websites)
46. [Mouseflow: Use-Cases, Insights and Reviews | 2025 Cuspera](https://www.cuspera.com/products/mouseflow-x-668)
47. [A/B Testing With Low Traffic: What To Do Instead](https://younusfardeen.com/blog/ab-testing-low-traffic)
48. [CRO for Low-Traffic Websites: Skip the A/B Test | Entropy](https://entropyand.co/blog/cro-for-low-traffic-websites)
49. [The 8 best CRO tools for every conversion stage | Webflow Blog](https://webflow.com/de/blog/cro-tools)
50. [Netpeak - Success stories from Clarity users](https://clarity.microsoft.com/case-studies/netpeak/)
51. [A/B Testing Alternatives: 7 Better Methods for 2026](https://kirro.io/ab-testing-alternatives)
52. [A/B testing UX: a guide for designers and teams - kirro.io](https://kirro.io/ab-testing-ux)
53. [www.brillmark.com · low-traffic-cro-how-to-improveLow Traffic CRO: How to Improve Conversions When You Don’t ...](https://www.brillmark.com/low-traffic-cro-how-to-improve-conversions-when-you-dont-have-big-numbers/)
54. [What Is a Session Recording and How It Reveals Lost Sales](https://www.crazyegg.com/blog/session-recording/)
55. [Conversion Rate Optimization Case Study: Rains](https://mouseflow.com/customers/rains-case-study/)
56. [Case Studies Archives - Success stories from Clarity users](https://clarity.microsoft.com/case-studies/category/case-studies/)
57. [Beyond A/B Testing: CRO Strategies for Low-Traffic Sites](https://nexusmarketing.com/blog/cro-for-low-traffic-sites/)
58. [EU Residency - Mixpanel](https://docs.mixpanel.com/docs/privacy/eu-residency)
59. [Amplitude MCP Server](https://amplitude.com/docs/api/content/amplitude-ai/amplitude-mcp)
60. [Amplitude MCP Server](https://amplitude.com/docs/amplitude-ai/amplitude-mcp)
61. [Docs MCP server](https://amplitude.com/docs/amplitude-ai/docs-mcp-server)
62. [Pricing](https://mixpanel.com/pricing/)
63. [Connect Amplitude MCP to Claude Code](https://amplitude.com/docs/amplitude-ai%2Famplitude-mcp%2Fclaude-code)
64. [amplitude.com](https://amplitude.com/docs/llms.txt)
65. [Reference - Overview - Mixpanel](https://docs.mixpanel.com/reference/overview)
66. [What Is MCP? Model Context Protocol Explained for Builders | Amplitude](https://www.amplitude.com/explore/data/what-is-mcp)
67. [Mixpanel MCP Server](https://docs.mixpanel.com/docs/mcp)
68. [Amplitude | A new era for product teams](https://www.amplitude.com/mcp-server.md)
69. [How to connect Amplitude MCP to other MCP clients](https://amplitude.com/docs/amplitude-ai/amplitude-mcp/other-clients)
70. [amplitude.json](https://automatable.tools/api/amplitude.json)
71. [EU Data Residency | Mobile & Web User Analytics | Mixpanel](https://mixpanel.com/legal/eu-data-residency/)
72. [Amplitude MCP](https://amplitude.com/releases/amplitude-mcp)
73. [Contentsquare Pricing: Pick Your Plan and Platform](https://contentsquare.com/pricing/)
74. [Contentsquare Free and Growth plans](https://support.contentsquare.com/hc/en-us/articles/37271803160849-Contentsquare-Free-and-Growth-plans)
75. [Contentsquare: Company, Platform, and AI Info Page](https://contentsquare.com/ai-info/)
76. [Start For Free](https://contentsquare.com/solutions/smb/)
77. [How to use Session Replay Summaries](https://support.contentsquare.com/hc/en-us/articles/37271714298897-How-to-use-Session-Replay-Summaries)
78. [Session Replay: Reveal What Customers Experienced](https://contentsquare.com/page-capabilities-session-replay-ppc-ps/)
79. [Contentsquare Pricing: Pick the Plan That Suits Your Needs](https://contentsquare.com/pricing/?ref_type=adv)
80. [Contentsquare](https://contentsquare.com/page-platform-experience-analytics-ppc/)
81. [Hotjar is now part of Contentsquare - Plans and Pricing](https://help.hotjar.com/hc/en-us/articles/36819964833169-Hotjar-Plans)
82. [Contentsquare’s Free Plan: How to Get Started & Benefits](https://contentsquare.com/en/blog/contentsquare-free-plan/)
83. [Contentsquare: AI-first experience platform](https://contentsquare.com/?offer=add-linebreak&swcfpc=1)
84. [What's new in Hotjar](https://contentsquare.com/hotjar/)
85. [What is Hotjar?](https://help.hotjar.com/hc/en-us/articles/36820019634961-What-is-Hotjar)
86. [How Much Does Hotjar Cost? Plans, Limits and Alternatives](https://www.noibu.com/blog/how-much-does-hotjar-cost)
87. [Hotjar: review, 2026 pricing and Microsoft Clarity](https://www.noqode.fr/en/outils/hotjar)
88. [Security and compliance overview | Plausible docs](https://plausible.io/docs/compliance)
89. [Plausible pricing and subscription plans](https://plausible.io/docs/subscription-plans)
90. [Plausible Stats API reference](https://plausible.io/docs/stats-api)
91. [Plausible security and compliance documentation](https://plausible.io/compliance)
92. [Cookieless web analytics: accurate data without the ...](https://plausible.io/cookieless-web-analytics)
93. [Plausible: GDPR, CCPA and cookie law compliant web analytics](https://plausible.io/data-policy)
94. [Stats API v1 reference (legacy) | Plausible docs](https://plausible.io/docs/stats-api-v1)
95. [White label web analytics for SaaS platforms and website builders](https://plausible.io/white-label-web-analytics)
96. [Privacy Policy](https://plausible.io/privacy)
97. [Plausible Analytics documentation | Plausible docs](https://plausible.io/docs)
98. [Plausible Analytics Review: Marketing Pricing and Catches](https://workstak.co/tools/plausible-analytics)
99. [EU-hosted web analytics with no data transfers outside Europe](https://plausible.io/eu-hosted-web-analytics)
100. [GDPR-compliant web analytics without consent: a legal ...](https://plausible.io/blog/legal-assessment-gdpr-eprivacy)
101. [Deploy & Host Plausible Stats API](https://railway.com/deploy/plausible-stats-api--deploy-plausible-analytics-stats-api)
102. [Text-to-SQL AI: How Accurate Is It in 2026? - Count.co](https://count.co/ai/text-to-sql)
103. [dbt Semantic Layer | dbt Developer Hub](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl)
104. [Structured data extraction from unstructured content using ...](https://simonwillison.net/2025/Feb/28/llm-schemas/)
105. [SQL query generation from natural language - ISE Developer Blog](https://devblogs.microsoft.com/ise/llm-sql-query-generation/)
106. [Workshop on Information Technology and Systems, Nashville, Tennessee, 2025](https://web3.arxiv.org/pdf/2601.00224)
107. [Introducing the dbt MCP Server – Bringing Structured Data to ...](https://docs.getdbt.com/blog/introducing-dbt-mcp-server)
108. [Natural Language Interfaces for Databases: What Changes for SQL-Literate Users?](https://arxiv.org/html/2511.14718v4)
109. [Quickstart for the dbt Semantic Layer | dbt Developer Hub](https://docs.getdbt.com/guides/sl-qs)
110. [Ascent: An Agentic System over the Model Context ...](https://arxiv.org/html/2609.24620v1)
111. [Bring structured context to conversational analytics with dbt](https://www.getdbt.com/blog/bring-structured-context-to-conversational-analytics-with-dbt)
112. [Fact-Consistency Evaluation of Text-to-SQL Generation for Business ...](https://arxiv.org/html/2505.00060v1)
113. [Building software on top of Large Language Models](https://simonwillison.net/2025/May/15/building-on-llms/)
114. [The 4 Questions to Ask Before Deploying Semantic Layers in Production](https://www.credibledata.com/blog/posts/semantic-layers-in-production)
115. [Validating LLM-Generated SQL Queries through Metamorphic ...](https://dl.acm.org/doi/10.1145/3797146)
116. [dbt Semantic Layer: Benefits, use cases, and how it works](https://www.fivetran.com/learn/dbt-semantic-layer)
117. [Introducing Zoning insights: Web intelligence at a glance](https://www.amplitude.com/blog/zoning-insights-website-conversion-optimization)
118. [MCP, GEO and Bot Paywalls Explained for AI Agents](https://towardsdatascience.com/how-geo-webmcp-and-bot-paywalls-are-building-the-ai-native-internet/)
119. [Best Conversion Rate Optimization Tools - Flint](https://www.flint.com/articles/best-conversion-rate-optimization-tools)
120. [Web Analytics Team](https://posthog.com/teams/web-analytics)
121. [Best MCP-Ready CRO & Analytics Tools for 2026 - Humblytics](https://humblytics.com/blog/best-mcp-ready-cro-tools-2026)
122. [7 Web Analytics Tools With AI-Powered Insights in 2026](https://www.databuddy.cc/blog/web-analytics-tools-ai-powered-insights-2026)
123. [Crazy Egg vs. Optimizely: Each Tool's True Strengths](https://www.crazyegg.com/blog/crazy-egg-vs-optimizely/)
124. [15 Top Website Optimization Tools for Testing Efficiency](https://www.convert.com/blog/optimization-tools/website-optimization-tools/)
125. [FAQ - Analytics Agent](https://analytics-agent.app/faq/)
126. [DIGITAL ANALYTICS](https://business.adobe.com/products/analytics/web-analytics.html)
127. [48 Best GA4 AI Marketing Tools (2026) - MarTechRadar](https://martechradar.ai/integrations/google-analytics/)
128. [10 Best SEO Tools to Get AI Insights From GSC & GA4 (2026)](https://pikaseo.com/articles/best-ai-tools-for-gsc-ga4-insights)
129. [Mitzu: Details, Reviews, Pricing, & Features](https://checkthat.ai/brands/mitzu)
130. [AnoSys.AI — AI Operational Intelligence Platform](https://anosys.ai/product.html)
131. [AI Privacy Risks & Mitigations - edpb.europa.eu](https://www.edpb.europa.eu/system/files/documents/2025-04/ai-privacy-risks-and-mitigations-in-llms.pdf)
132. [Guidelines 05/2020 on consent under Regulation 2016/679 Version 1](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_202005_consent_en.pdf)
133. [Frequently asked questions](https://www.edpb.europa.eu/sme/find-practical-info/faq_en)
134. [Solutions de mesure d'audience exemptées de consentement - CNIL](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience)
135. [Sheet n°16: Use analytics on your websites and applications](https://www.cnil.fr/fr/node/677)
136. [Frequently Asked Questions | European Data Protection Board](https://www.edpb.europa.eu/contact/frequently-asked-questions_en)
137. [Guidelines 02/2024 on Article 48 GDPR - edpb.europa.eu](https://www.edpb.europa.eu/system/files/2024-12/edpb_guidelines_202402_article48_en.pdf)
138. [Consent under GDPR: When to act and what to do - edpb.europa.eu](https://www.edpb.europa.eu/system/files/2026-04/edpb-summary-consent_en.pdf)
139. [International data transfers | European Data Protection Board](https://www.edpb.europa.eu/sme/be-compliant/international-data-transfers_en)
140. [Guidelines 05/2021 on the Interplay Between the Application ...](https://www.edpb.europa.eu/system/files/documents/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf)
141. [Guidelines 3/2019 on processing of personal data through ...](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_201903_video_devices_en_0.pdf)
142. [1 European Data Protection Board (EDPB) Specific Privacy ...](https://www.edpb.europa.eu/system/files/2025-04/edpb_sps_stakeholder_events_meetings_and_surveys_april_2025.pdf)
143. [International transfers | European Data Protection Supervisor](https://www.edps.europa.eu/data-protection/data-protection/reference-library/international-transfers_en)
144. [Documents | European Data Protection Board](https://www.edpb.europa.eu/documents_en)
145. [Redirecting to /documents/guideline/guidelines-052020-on ...](https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_en)
146. [Claude - MCP](https://docs.contentsquare.com/en/mcp/claude/)
147. [Pricing, Analytics & A/B Testing from $79/mo](https://humblytics.com/pricing)
148. [Contentsquare MCP server - MCP](https://docs.contentsquare.com/fr/mcp/index.md)
149. [Other tools - MCP](https://docs.contentsquare.com/en/mcp/other-tools/index.md)
150. [41563169756945.json](https://support.contentsquare.com/api/v2/help_center/en-us/articles/41563169756945.json)
151. [A/B Testing & CRO FAQ, Setup, Pricing & Integration Help](https://humblytics.com/faq)
152. [Contentsquare MCP Server | Manufact](https://manufact.com/leaderboard/contentsquare)
153. [Documentation](https://docs.humblytics.com/)
154. [LLM Context, Humblytics Product Information](https://humblytics.com/llms)
155. [Databuddy Docs: Install, SDKs, REST API, and MCP](https://www.databuddy.cc/docs)
156. [Contentsquare MCP server: tools, access and limits](https://aicraftbook.com/mcp/contentsquare-mcp)
157. [Changelog, New A/B Testing & Analytics Features | Humblytics](https://humblytics.com/changelog)
158. [Microsoft Copilot - MCP](https://docs.contentsquare.com/fr/mcp/microsoft-copilot/)
159. [Humblytics: Website Analytics and A/B Testing for Your AI Agent](https://humblytics.com/legal)
160. [Build an MCP server for Claude - Claude.ai Documentation](https://claude.com/docs/connectors/building)
161. [PostHog MCP use cases - Docs](https://posthog.com/docs/model-context-protocol/use-cases)
162. [The AI Marketing Agent Isn't a Writer—It's a Strategist | VizopsAI Blog](https://vizops.ai/blog/retargeting-agent-optimization/)
163. [Autonomous Experimentation: Building A Self-Driving AI Software Lab](https://ntechlab.io/case-study/from-manual-experimentation-to-autonomous-rd/)
164. [PostHog's next chapter](https://posthog.com/blog/posthogs-next-chapter)
165. [AI-Powered CRO: How Enterprise Brands Leverage ...](https://www.singlegrain.com/cro/ai-powered-cro-how-enterprise-brands-leverage-predictive-analytics-for-75-higher-conversion-gains-2/)
166. [AI Agents in B2B Marketing: Melih Oztalay on MITechTV Explains What's Next](https://mitechnews.com/mitechtv/ai-agents-in-b2b-marketing-melih-oztalay)
167. [Product analytics that shows you what's actually happening](https://posthog.com/r/product-analytics)
168. [Query web traffic over PostHog MCP - Docs](https://posthog.com/docs/web-analytics/surfaces/mcp)
169. [PostHog MCP - A product analyst that lives in your editor](https://posthog.com/r/posthog-mcp)
170. [Custom Permits Case Study - Associates AI](https://associatesai.team/case-studies/custom-permits)
171. [Privacy-focused web analytics](https://posthog.com/web-analytics)
172. [Accelerating Pipeline Growth: Case Study | Nagent AI](https://nagent.ai/resources/case-studies/accelerating-pipeline-growth)
173. [PostHog MCP for Claude Code - Docs](https://posthog.com/docs/model-context-protocol/claude-code)
174. [Are AI Agents interacting with Online Ads? - arXiv](https://arxiv.org/html/2504.07112v4)
175. [Model Context Protocol (MCP) - Docs](https://posthog.com/docs/model-context-protocol)