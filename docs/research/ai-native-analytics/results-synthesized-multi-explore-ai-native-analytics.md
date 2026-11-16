---
type: synthesis
synthesized_by: subagent
model: claude-opus-5-5
mode: strict
brief: brief-pplx-explore-ai-native-analytics.md
sources:
  - results-pplx-raw-deep-research-explore-ai-native-analytics.md
  - results-youcom-raw-deep-explore-ai-native-analytics.md
  - results-exa-raw-deep-reasoning-explore-ai-native-analytics.md
  - results-claude-raw-claude-opus-5-5-explore-ai-native-analytics.md
synthesized: 2026-11-10
---

# Website Analytics Read by an AI Agent: Approaches, Products and Fit for a Small EU Site (2024–2026)

**Source tags:** `pplx` = Perplexity deep research (openai/gpt-6-luna) · `youcom` = You.com deep · `exa` = Exa deep-reasoning · `claude` = Claude Opus 5.5 web research. All four answered the same brief; none was truncated.

## Navigation

### Topic map

| Section | What's here | What's NOT here |
|---|---|---|
| Executive Summary | Core findings, ten non-obvious ideas, consensus setup | Product prices (§2); legal detail (§4) |
| §1 Map of Approaches | Eleven approaches: connectors, API exports, raw SQL, semantic layer, built-in AI, agent-first tools, replay AI, evidence-stack CRO, cadence, agent experiments, autonomous CRO | Per-product prices and EU stance (§2); site-specific setup (§6) |
| §2 Existing Products | Products grouped by approach: entry price, EU hosting, agent access, evidence of use | How each approach works (§1); legal analysis (§4) |
| §3 From Insight to Site Change | The loop, proposal template, approval points, documented cases, low-volume measurement | Tool setup (§1, §2); privacy (§4) |
| §4 Privacy and Compliance | Cookieless limits, CNIL exemption, replay consent, the LLM as a separate data flow | Polish regulator view (not found); legal advice |
| §5 What Fails | Wrong numbers, noise, generic advice, wrong metric, write access, cost, lock-in | Harmful agent-shipped changes (none found) |
| §6 Fit for a Small EU Marketing Site | Realistic vs scale-only, consensus setup, access-route and replay divergences, first tasks | Enterprise BI (out of scope) |
| §7 Orphan Topics | Tracking plan first, evaluation sets, repo as control plane, thin MCP, refusals, AI referrals, agent-legible sites | Product comparisons (§2) |
| §8 Open Questions and Thin Evidence | Where evidence is vendor-only, heuristic or missing | Answers (none of the sources has them) |

### Question index

| Question | Section |
|---|---|
| Which routes can Claude Code use to read the site's analytics? | §1.1–§1.3 |
| Does Umami have an official MCP server? | §2.1 |
| How often does agent-written SQL return wrong numbers? | §1.3 |
| How much do written metric definitions improve agent accuracy? | §1.4 |
| What goes into a repo metrics file? | §1.4 |
| Which built-in AI analyst features are real, which are marketing? | §1.5 |
| Which new agent-first analytics products exist and what do they cost? | §2.4 |
| What do Clarity's MCP limits allow? | §2.3 |
| What replaces A/B tests when traffic is low? | §1.8, §3.4 |
| What should an agent's change proposal contain? | §3.2 |
| Where should human approval sit? | §3.2 |
| Are there real cases of agent-driven conversion gains? | §3.3, §8.1 |
| Does cookieless analytics remove the consent question? | §4.1 |
| What changes when session replay is added? | §4.2 |
| What data is safe to send to the LLM? | §4.3 |
| How do agents get numbers wrong, and what catches it? | §5.1 |
| Where do AI analytics costs surprise? | §5.8 |
| What weekly routine and prompt should the agent run? | §1.9, §6.2 |
| Which access route and replay tool fit this site? | §6.2 |
| What should the agent do first? | §6.3, §7.1 |
| What only works on high-traffic sites? | §1.11, §6.1 |
| How do I check the agent stays reliable over time? | §7.2 |
| Should AI-assistant referrals be tracked separately? | §7.10 |

### Named-thing index

| Name | Type | Definition | Section |
|---|---|---|---|
| Model Context Protocol (MCP) server | Integration standard | Exposes an analytics tool's queries and actions as tools an agent can call | §1.1 |
| Semantic layer | Data-modeling pattern | Metrics, grain, joins, time zones and exclusions defined once; agent queries governed concepts, not raw columns | §1.4 |
| dbt Semantic Layer / dbt MCP server | Product | dbt's centralized metric definitions exposed to AI agents over MCP | §1.4 |
| dbt 2026 semantic-layer vs text-to-SQL benchmark | Benchmark | 98.2–100% on covered questions vs 64.5% for free-form SQL | §1.4 |
| Microsoft ISE NL-to-SQL evaluation | Benchmark | ~75% accuracy; 38.46% without runtime query validation | §1.3 |
| Golden / known-answer queries | Practice | Queries with verified answers the agent runs before new analysis | §1.4, §7.2 |
| HogQL | Query language | PostHog's SQL interface over events, properties and warehouse data | §1.3 |
| Vercel Drains | Product feature | Streams Vercel Web Analytics events, traces and Speed Insights to any destination | §1.3 |
| Replay Vision | Product feature | PostHog AI applying a saved prompt to every matching session recording | §1.5, §7.8 |
| `$recording_observed` | Event | PostHog event storing each Replay Vision observation as a queryable row | §7.8 |
| Clarity Copilot | Product feature | Microsoft Clarity's chat and session/heatmap summaries | §1.5 |
| Sense Analyst | Product feature | Contentsquare's continuous replay and journey-analysis assistant | §1.5 |
| Discovery AI | Product feature | Lucky Orange's natural-language behavioral Q&A | §1.5 |
| Agent skills (GrowthBook) | Pattern | Playbooks telling the agent when an experiment is warranted; "the skill is a playbook" | §1.10, §7.5 |
| Human in the Loop for agents | Product feature | GrowthBook 5.2 approval layer for agent actions | §1.10 |
| Smart Traffic | Product feature | Unbounce routing of each visitor to the predicted-best variant | §1.11 |
| Bandit-style optimizer | Method | Adaptive traffic allocation across variants; needs volume | §1.11 |
| Painted-door test | Method | Named by practitioners as a low-traffic replacement for classic A/B tests | §1.8 |
| Sequential pre/post test | Method | Baseline period, then fixed post-change period with micro-conversions | §3.4 |
| Evidence-stack CRO | Method | Combine recordings, surveys, interviews, usability tests and funnel counts when A/B is underpowered | §1.8 |
| Decision loop | Framework | Question → evidence → hypothesis → patch → release marker → measurement → decision | §3.1 |
| Evidence-backed proposal template | Template | Observation, evidence, segment, alternatives, change, metrics, window, rollback, confidence | §3.2 |
| Deployment annotation / experiment ledger | Practice | Per-change record of commit, page, hypothesis, metrics and result | §3.1, §7.3 |
| CNIL audience-measurement exemption | Regulatory criterion | French consent exemption for anonymous, publisher-only audience statistics | §4.1 |
| Chapter V GDPR transfer | Legal concept | Making personal data available to a third-country organization can be an international transfer | §4.3 |
| Standard contractual clauses (SCCs) | Legal mechanism | Contract basis Microsoft uses for Clarity's cross-border transfers | §4.2 |
| PostHog MCP Analytics | Product feature | Records an agent's tool calls, intent, latency, errors and missing capabilities | §7.12 |

### Known gaps

- Documented solo-founder or small-team setups with measured results — no source found one (§8.1)
- Event schemas and metric definitions practitioners actually hand to agents, and how they check the numbers — sources offer their own templates and vendor benchmarks only (spans §1.4, §6.2)
- Agent-shipped site changes that hurt conversion, and guardrails learned from them — none found (§5.11)
- Regulator guidance on feeding consent-exempt analytics into a US LLM; Polish (UODO) position; documented lawyer–regulator disagreement — not found (spans §4.3, §8.5)
- Accuracy of AI replay summaries vs a human watching a small sample; measured bias of consent-only replay samples — not found (spans §4.2, §8.3)
- Accuracy and security of Umami community MCP servers; their GitHub issues — not reviewed (§8.6)
- Whether Umami ships an official MCP — sources conflict (see inline marker in §2.1)
- Plausible entry price; Contentsquare price and target size — sources conflict (see inline markers in §2.1, §2.3)
- Which read route and which replay add-on fit this site — sources recommend different options (see inline markers in §6.2)
- Verified prices for Fathom, Matomo Cloud, Simple Analytics, Amplitude, Mixpanel, Hotjar, Lucky Orange, Tinylytics, Agent Analytics, Coframe, GrowthBook Cloud, Statsig, Vercel Drains (§2)
- EU hosting for Fathom, Contentsquare, Hotjar, Lucky Orange, Humblytics, Databuddy, hosted smolanalytics, Gizmo, GrainQL, Tinylytics, Agent Analytics, VWO (§2)
- Real cost-overrun cases — only the PostHog AI-credits note (§5.8)
- Prompts, playbooks and question lists solo founders publicly share — only a Show HN note, an Indie Hackers post and one vendor case; the templates in this report were written by the research sources (spans §1.9, §6.2)

## Executive Summary

The pattern is a decision loop, not a chatbot on a dashboard: the agent sits next to both the data and the code, takes a narrow question, queries analytics or SQL, compares against a baseline, proposes a concrete change and — only with approval — edits code or launches an experiment [[1, 2, 3, 4, 5, 6]].

- **Access is solved; meaning is not.** Official or officially documented MCP servers exist for PostHog, Mixpanel, Amplitude, Clarity, Contentsquare, Plausible, Matomo, GA4, GrowthBook and Statsig, plus community servers for Umami and Fathom [[1, 2, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]. What decides the outcome: written metric definitions, a backlog of decision questions, separating signal from low-volume noise, and keeping unreviewed changes out of production.
- **Metric definitions are the largest accuracy lever.** dbt's 2026 benchmark: 98.2–100% on questions the semantic layer covers vs 64.5% for free-form text-to-SQL [VENDOR: dbt Labs] [[17]]. Microsoft's NL-to-SQL evaluation: ~75%, falling to 38.46% without runtime query validation [[18]].
- **Low traffic changes the method.** Classic A/B tests are underpowered; use recordings, interviews, surveys, painted-door tests and sequential pre/post comparisons with micro-conversions, with the agent as triage and synthesis layer rather than statistical oracle [[19, 20, 21, 22, 23, 24, 25]].
- **Business-impact evidence is vendor- or founder-reported.** No source found an independent, measured solo-founder loop [[26, 27, 28, 29]]. The most concrete case raised a landing page's "next step" rate from 14% to 92% yet produced zero paid conversions after four checkout starts [[27]].
- **All four sources converge on the setup for this site:** keep self-hosted Umami, add a versioned metrics file and question list in the repo, give Claude Code read-only access, run a weekly review that ends in one reversible change shipped as a human-approved PR, and add session replay only for a named "why" question behind consent (§6.2). They diverge on whether Umami has an official MCP (§2.1) and on the read route (§6.2).

**Ideas a tool comparison would not surface:**
1. The first useful agent job is writing the tracking plan and metric dictionary, not analysis (§7.1).
2. A semantic layer that refuses out-of-scope questions scores better than one that guesses — make "not answerable" a valid agent answer (§1.4, §7.6).
3. "MCP is the thin part": judgment belongs in skills and playbooks, not in tool count (§1.10, §7.5).
4. An outside connector can be ahead of the vendor's own built-in AI (§1.5).
5. The repository is the analytics control plane — metrics file, query library, experiment ledger, deploy annotations; the pull request replaces the dashboard (§7.3).
6. Fixed analytics questions with known answers become an evaluation set for the agent (§7.2).
7. Without significance, optimize learning velocity: time from observed friction to a reversible fix (§7.9).
8. Agent-watched recordings become queryable event rows (§7.8).
9. For a site selling AI skills, AI-assistant referrals are a segment worth isolating (§7.10).
10. EU-hosted analytics does not make the agent's prompt EU-only — the LLM call is its own data flow (§4.3).

## 1. Map of Approaches

### 1.1 Connector (MCP server) on the analytics tool

The agent calls a vendor or community MCP server that wraps the tool's reporting API and asks for trends, funnels, breakdowns, recordings or experiments in natural language [[1, 2, 3, 4, 5, 10, 11]].

- **Who uses it:** developer-led teams and solo founders already working in an MCP-capable editor; most valuable when the same agent edits the repository [[1, 8, 30]]. A Show HN builder replaced a dashboard with 42 MCP tools and found that explicit instructions in the Claude configuration file made the agent call analytics more reliably [[31]].
- **Examples:**
  - PostHog: official hosted MCP for Claude Code, Cursor, Codex, VS Code and Windsurf — analytics queries, arbitrary SQL, schema inspection, dashboards, flags, experiments, surveys, replay; routes to the EU or US server by account region; can be restricted to read-only and narrowed by tool group [VENDOR: PostHog] [[1, 4, 5, 32, 33]].
  - Umami: official read-only MCP per one source, community servers per the others (divergence in §2.1). Community servers range from Macawls' "lean" server (local, Docker or hosted) [[34]] to mikusnuz's "66 tools" over API v2, including funnels, retention, journeys, replay and revenue [[15]].
  - Microsoft Clarity: official MCP authenticated with a Data Export API token, with tight request limits (§2.3) [[2, 35]]; fetches metrics such as scroll depth, engagement time, device and browser, later extended to recordings and automated reports [VENDOR: Microsoft] [[36, 37]].
  - Plausible: its docs describe an MCP server built by the Sentry team — a third-party build — for traffic, top pages, conversions and goals [[10]].
  - Matomo: official MCP, included in Matomo Cloud and a plugin for self-hosted installs; Matomo calls it an "API gateway or protocol adapter" that does not itself use AI models and says it "cannot guarantee the accuracy… of third-party AI systems" [[11, 38]].
  - GA4: Google's server is experimental, read-only and local; it goes through the Data API, so it "inherits that API's limits" [[12]].
  - Amplitude, Mixpanel and Contentsquare: official OAuth or remote MCP servers (§2.2, §2.3) [[7, 8, 9, 39]]. Fathom: community server [[16]].
- **Trade-offs:**
  - Fastest setup, but the agent sees only the aggregates, quotas and thresholds the vendor exposes; capability depends on the connector's tool design.
  - Broad connectors expose write operations — PostHog's tool list includes experiment create, launch, freeze, end and ship-variant [[5]]. Community connectors add credential and maintenance risk [[15, 34]]. Vendor lock-in and permission complexity follow.
  - MCP standardizes access, not authorization, semantics or correctness; connectors still need authentication, permission scoping, versioning and choices about which tools to expose [[40]]. Matomo's disclaimer and the dbt benchmark (§1.4) point the same way [[11, 17]].
- **Use it when** the tool is already in place. Start read-only; expose experiment-launch or deploy tools only after the agent has counted correctly on historical questions. Treat the connector as transport, not as an analytics method.

### 1.2 API scripts and scheduled exports

A script pulls analytics through an API into a CSV or JSON snapshot that the agent summarizes — less interactive than MCP, easier to audit, version, test and schedule [[41, 42]].

- **Examples:** Umami documents an API client for self-hosted and Cloud deployments [[41]]. A practitioner built an Umami MCP/LLM reporting workflow on Gemini or a local model; the value came from explicit prompts plus a reporting routine, not from autonomous discovery [[42]]. Plausible's Stats API is read-only and on the Business plan [[43]]; its raw-event exports are scheduled, not self-serve or real-time, and Enterprise-only [[10]]. StackOne describes connecting Claude to marketing SaaS through an MCP gateway in "30 minutes or less" [VENDOR: StackOne] [[44]].
- **Trade-offs:** predictable cost and simple permissions; the script can fix date range, denominator, locale split and conversion definition, which is more deterministic than an agent rebuilding a comparison from unconstrained tool calls. Costs: maintenance, stale data, weaker follow-up questions. Product APIs may return only aggregates; raw events need their own privacy and access review.
- **Use it when** a daily or weekly brief is enough and live exploration is not needed — e.g. a weekly export of page, referrer, language, CTA, signup and purchase data, compared across weekday-normalized periods, capped at three proposed actions.

### 1.3 Raw events in a database the agent queries with SQL

Events sit in a database or warehouse; the agent reads the schema and runs SQL. Options: self-hosted Umami's Postgres or MySQL; PostHog's warehouse via HogQL, covering events, properties, replay context and synced commercial data [[1, 45]]; Plausible's raw exports [[10]]; Vercel Drains, which stream Web Analytics events, traces and Speed Insights data to any destination [VENDOR: Vercel] [[46]]; or a plain PostgreSQL, SQLite or ClickHouse store.

- **Who uses it:** engineering-led teams and technical founders. Simon Willison's NICAR 2026 workshop teaches this pattern to data journalists with Claude Code and Codex, including a chapter on "asking questions against a database" [[47]].
- **Advantages:** maximum flexibility and no vendor coupling; control over retention, joins, cost and model choice; joins site events with orders, signups, page variants and deploy metadata; more auditable than dashboard summaries.
- **Risks:** the query runs but answers the wrong question — wrong table, grain, timestamp, or users counted instead of sessions [[48, 49]].
  - Microsoft's ISE evaluation of its custom NL-to-SQL: ~75% accuracy; schema and business documentation mattered; accuracy collapsed to 38.46% when runtime query validation was removed; remaining failures were business-logic errors in queries that executed [[18]].
  - A study of natural-language database interfaces found plausible, executable wrong answers common among incorrect submissions [[50]].
  - Raw SQL is not more truthful than a connector by default: without documented grain, join keys and event meaning, the model must infer them and can be "precisely wrong" [[18, 51]].
- **Setup cost:** substantial for one person (schemas, tests, definitions). Worth it with several sources — Umami, Stripe, email signups, Git history, search data — and excessive for pageviews and CTA clicks alone; a small site's event volume may not justify a warehouse.
- **Narrow the surface.** Do not give the agent unrestricted production SQL. Expose either a metric tool or a read-only SQL endpoint limited to approved views:

  ```text
  query_metric(metric, date_range, breakdown, filters)
  ```

  Approved views: `landing_page_sessions`, `signup_conversions`, `purchase_conversions`, `page_variant_exposures`, `deployment_annotations`.
- **For this site:** self-hosted Umami already is an EU SQL database; read-only access adds no vendor and no data transfer beyond what goes into the LLM prompt.

### 1.4 Semantic layer, or written metric definitions

Metrics, event grain, valid dimensions, joins, time zones, exclusions and synonyms are defined once; the agent queries governed concepts instead of inventing SQL from raw columns [[48, 52]]. dbt's Semantic Layer centralizes definitions, handles joins and exposes governed metrics to AI agents through the dbt MCP server [VENDOR: dbt] [[53, 54]]. Example definition: *signup conversion = distinct sessions with `signup_submit` ÷ sessions on landing pages*.

- **Evidence:**
  - dbt Labs 2026 rerun: frontier models scored 98.2–100% on questions the semantic layer covered vs 64.5% for text-to-SQL; across all 11 questions 72.7% vs 64.5%, because the semantic layer refused questions outside its model instead of guessing [VENDOR: dbt Labs] [[17]]. dbt's 2023 benchmark: 83% on the addressable subset [[55]].
  - An independent review of these benchmarks: "context moves accuracy more than model choice" [[56]].
  - A 2026 research review: domain evidence and semantic context improve text-to-SQL, but residual error stays material [[57]].
  - Terms such as "revenue", "active customer" and "conversion" have several plausible meanings that schemas do not explain [[48, 52]]; technical metadata alone fails when fields carry domain meaning [[18]].
  - Builder.io keeps a living data dictionary of approved definitions, sources, joins, owners and caveats [[58]]; semantic-layer practitioners add that a definition must state the calculation, business meaning, owner and changing context [[59, 60]].
- **Small-site version:** skip dbt. A version-controlled Markdown or YAML file in the repo plus a few saved SQL views carries most of the benefit [UNVERIFIED: no small-site benchmark of this lightweight version exists]; five canonical metrics and ten event definitions may remove most of the ambiguity. Fields the sources list:
  - event name, trigger condition, client- or server-side;
  - what counts as a successful signup and a paid purchase; the denominator for each rate;
  - exclusions — internal traffic, bots, test purchases, duplicates;
  - page variants and locale mapping (landing page → positioning, PL/EN);
  - attribution window, timezone, standard comparison windows, caveats, examples of expected counts.

  Template as one source wrote it (`/docs/analytics.md`):

  ```markdown
  ## Primary conversions

  signup_completed:
    definition: confirmed free-skill email signup
    denominator: unique sessions with landing-page exposure
    exclude: local development, bots, test addresses

  purchase_completed:
    definition: successful paid checkout webhook
    denominator: unique sessions with product-page exposure

  ## Page variants

  /skills-ai?lang=en&variant=problem
  /skills-ai?lang=pl&variant=problem

  ## Rules

  - Use Europe/Warsaw for reporting dates.
  - Never call a CTA click a conversion.
  - Report fewer than 30 conversions as directional only.
  - Compare Polish and English variants only within the same traffic source where possible.
  ```
- **Habits:** keep known-answer ("golden") queries and have the agent run them before analyzing new data; require every answer to show query, date range, filters, numerator, denominator and a raw-count sanity check; accept "can't answer from the defined metrics" (§7.6). Event-name changes become schema changes reviewed like code.

### 1.5 AI analysts built into the analytics product

The vendor provides plain-language Q&A, auto-insights, anomaly detection, SQL generation or replay summaries inside its own interface. Capability claims below are vendor-sourced.

- **Examples:**
  - PostHog: AI agent modes announced November 2025 (analytics, SQL, session replay) that search data, write SQL, create dashboards, configure surveys and create events [[61]]. Replay Vision applies a saved prompt to every matching recording "forever"; a replay "signal" emails rage-click and friction reports [[62]].
  - Clarity Copilot: chat, single- and grouped-session summaries, heatmap summaries over click and scroll data across three device types [[63, 64, 65]]; Microsoft reports over a million Copilot insights per month — a usage figure, not a quality measure [[36, 37, 66]].
  - Contentsquare Sense Analyst: replay and journey-analysis assistant running detection continuously across the merged Hotjar and Heap stack [[67, 68]].
  - Lucky Orange Discovery AI: natural-language behavioral questions [[69]]. Simple Analytics: plain-English chat that returns charts and recommendations [[70]].
  - Amplitude: AI Agents launched June 2025, opened as a beta to all customers alongside its MCP server in October 2025 [[71]].
- **Trade-offs:** lowest setup effort; replay and dashboard objects already indexed; may include scheduled reports and alerts. But the agent is bounded by the vendor's data model, AI usage can cost extra, "insights" can be generic or optimize engagement over qualified conversion, prompts, sampling and definitions are opaque, and residency and model terms need review. Their value "depends on specific and prioritized recommendations" [[68]].
- **Real vs marketing:** in PostHog issue #130832, asking the in-app AI "tell me if signups look unusual" produced only a threshold alert, or none, while the MCP alert tool already supported anomaly detectors — the outside connector was ahead of the built-in assistant [[72]].
- **Use it when** it replaces substantial setup; skip it when the site already has a privacy-first stack and needs four metrics.

### 1.6 Agent-first analytics products

The API or MCP interface is the primary product, not chat added to a dashboard. Agent Analytics ships a small tracking script, an API for statistics and experiments, a CLI and a growth skill for scheduled agent workflows [[73]]. Others: mcp-analytics, Gizmo Analytics, GrainQL, Tinylytics Agents, Objectiv [[74, 75, 76, 77, 78]], smolanalytics [[79]], Humblytics [[80]], Databuddy [[81]] — prices and hosting in §2.4.

- **Trade-off:** potentially the best ergonomics for a coding agent, but the products are new, vendor claims dominate and independent adoption or outcome data is thin.

### 1.7 AI summaries of behavior: recordings, heatmaps, rage clicks

Replay and heatmap tools capture rage clicks, dead clicks, scroll depth, form hesitation and recurring journeys; AI summarizes a session, a group of sessions or a page [[36, 64, 65, 69, 82, 83, 84, 85]].

- **When it helps:** too few conversions to slice, but enough visits to show recurring friction [[19, 20]]. At this scale, AI-written session summaries are where agents actually save time. One or two repeated misunderstandings can justify a copy or navigation change that an experiment could never validate. It explains why a number moved; it does not replace counting.
- **Evidence quality:** recordings are backed by CRO practice; AI's ability to summarize all meaningful behavior is thinner. A heatmap built from 40–50 sessions can look like a pattern without being one; individual recordings are more reliable [[86]].
- **Data:** replays carry page content, URLs, clicks, errors and user/session identifiers — see what Contentsquare sends to its models (§4.3) [[83]].
- **Use it as:** agent picks and summarizes a small sample; the human watches representative recordings before shipping; "five users fail at the same CTA" is a hypothesis, not an effect size. Ask a question tied to a change — "Do visitors on the Polish pricing page reach the purchase CTA, and what do sessions show immediately before exit?" — not "summarize my recordings".

### 1.8 Evidence-stack CRO: feedback, interviews, usability tests

At low volume, combine recordings, one-question surveys, customer interviews, usability sessions, sales and support language, funnel counts, form analytics and heuristic review; run five to ten user tests or interviews instead of waiting months for an underpowered A/B test [[19, 20, 21, 22, 23]]. Replace classic A/B with painted-door tests, sequential testing and qualitative research [[21]], or sequential pre/post comparisons on micro-conversions [[24, 25]].

- Qualitative methods and A/B tests are complementary: replay and heatmaps explain behavior, controlled tests estimate the effect of a change [[87]].
- **Agent role:** cluster feedback, extract repeated objections, compare Polish and English wording, turn findings into copy proposals — then validate the summary against the source material. Keep "three users asked about compatibility" apart from "compatibility copy improves purchases". An Indie Hackers "feedback analyzer" agent turns raw feedback into "a weekly signal" [[88]].

### 1.9 Cadence: on-demand, digests, anomaly alerts, weekly reviews

Options: on-demand investigation after a launch, daily anomaly alert, weekly conversion review, monthly instrumentation audit, post-deploy comparison. PostHog documents a weekly web analytics digest and MCP routines for traffic, sources, goals and comparisons [VENDOR: PostHog] [[89]]; Basedash runs a scheduled daily Slack brief (§3.3) [[28]].

- The question template matters more than the schedule; a recurring question backlog beats "tell me what is interesting".
- Small denominators make percentage alerts noisy — "signups fell 50%" can mean two became one. Use a weekly review, not a stream of alerts, except for known operational failures such as a broken purchase flow; always report counts, rates, denominators, date range and comparison period together.
- Weekly prompt as one source wrote it:

  ```text
  Review the last 14 days against the preceding 14 days.
  Check data integrity first.
  Report signup_completed and purchase_completed by:
  language, landing-page variant, device, and source.
  Do not rank segments below 30 conversions.
  For the largest credible drop, inspect relevant recordings or feedback.
  Return:
  1. evidence,
  2. likely cause,
  3. one reversible site change,
  4. primary metric,
  5. guardrail metric,
  6. minimum observation window.
  ```

### 1.10 Agent-driven experimentation with a human in the loop

The agent drafts a hypothesis, creates a flag or experiment, edits the site and reads the result. PostHog's MCP tools create, launch, pause, end and read experiments, including sample-size and running-time calculations [[90]]; its GitHub docs show a pricing-page experiment built from a feature flag and a funnel metric [[91]]; Claude Code setup is documented [[92]]. Statsig's MCP covers gates, experiments and metrics [[93]]. GrowthBook pairs MCP with agent skills, and version 5.2 added "Human in the Loop for agents" [[13, 94]].

- **GrowthBook's framing** [VENDOR: GrowthBook] [[94]]:
  - "MCP is not the product." / "The endpoint is a verb. The skill is a playbook." Skills tell the agent when an experiment is warranted and which assumptions need a human to confirm.
  - "Autonomy is a risk decision, not a product setting" — put approval at the risky points, not on every step or API call.
- **Human-in-the-loop sequence:**
  1. agent drafts hypothesis;
  2. agent cites the affected segment and evidence;
  3. agent proposes code diff;
  4. human reviews wording, accessibility, privacy and tracking;
  5. agent creates a draft flag or branch;
  6. human approves deployment;
  7. agent evaluates against predeclared metrics;
  8. human decides whether to roll out.
- **What is real:** the orchestration is documented; agents autonomously finding and shipping winning changes is not established by independent evidence. PostHog's customer examples — a SoundBoost founder making the MCP the main way to add tracking and ask questions, and Runable — are vendor-published [[26]].
- **At low traffic,** use flags for reversibility and staged rollout, not to declare winners from weak samples.

### 1.11 Autonomous AI CRO: generated variants plus traffic routing

The tool generates variants and shifts traffic itself: Coframe with bandit-style optimizers [VENDOR: Coframe] [[95]]; Unbounce Smart Traffic sends each visitor to the variant predicted to convert best [VENDOR: Unbounce] [[96]]; VWO Copilot builds campaigns from plain-language descriptions [[97]].

- Built for high-traffic sites (Coframe's showcase customers include Ramp and Replit); case studies are vendor-authored; no small-site results found for either.

**See also:** §2 (products per approach), §5.1 (why §1.1 and §1.3 return wrong numbers without §1.4), §6.2 (which route fits this site).

## 2. Existing Products (free and paid)

Many vendors now expose an agent interface, but few publish independently verifiable conversion outcomes; "MCP available" means the data can be called, not that the product supplies correct business semantics, useful questions or a safe deployment loop. "EU hosting" below means documented hosting or residency, not a GDPR verdict. Prices change fast — recheck before buying (§8.7).

### 2.1 Privacy-first web analytics with a connector

| Product | Free tier / entry price | EU hosting | Agent access |
|---|---|---|---|
| Umami | Self-host free, infrastructure only [[98, 99]]; Cloud Hobby $0 for 100K events, 1 site [[100, 101, 102]] | Self-host: your choice; Cloud: US or EU region [[100]] | Disputed official MCP (below); API [[41]]; direct SQL when self-hosted |
| Plausible | 30-day trial [[103]]; entry price disputed (below) | EU only (Hetzner), no cookies [VENDOR] [[104, 105]] | Stats API, Business plan [[43]]; Sentry-built MCP [[10]] |
| Matomo | Self-host core free; Cloud unverified | Self-host or Cloud | Official MCP: Cloud, self-host plugin [[11, 38]] |
| Fathom | Unverified | Unverified | Community MCP [[16]] |
| Simple Analytics | Unverified | EU (Dutch company), unverified | Not verified |

- **Umami** — cookieless pageviews and events; the site's current tool. [Divergence: pplx says Umami ships an official read-only MCP, on self-hosted instances from v3.4.0 and disabled by default, with Cloud MCP on the Pro, Business or Enterprise plans [[3, 98, 102, 106]]; youcom and claude say only community MCP servers exist [[15, 34]]; exa names the official API plus community servers [[41, 42]]]. Some community servers are read-only, others expose write or admin tools [[15, 34]]. Cloud region choice does not mean all processing happens there [[100]]. Evidence of use: GitHub repos with stars, setup instructions and tool lists, one documented personal MCP workflow [[42]]; no conversion case studies.
- **Plausible** — cookieless aggregate analytics and goals. [Divergence: pplx reports $9/month for 10k pageviews from a third-party page, unverified [[107]]; youcom reports hosted plans from €9/month [[108]]; claude reports €6/month for 10K pageviews, with other sites saying $9 [[109, 110]]]. Self-hosting is free [[108]]. Publishes a DPA [[105]]. Evidence: a Rails Foundation statement on Plausible's own EU-hosting page — vendor-selected [[111]]; no usage figures. Limited replay and experimentation make it weak as the whole agentic CRO layer.
- **Matomo** — full web analytics, positioned for a CNIL-exemptable setup; MCP described in §1.1. One source found only third-party MCP projects [[112]]; the source that found the official one cites Matomo's own FAQ and plugin repo [[11, 38]].
- **Fathom**, **Simple Analytics** — community MCP only (Fathom) and plain-English chat (Simple Analytics, §1.5); everything else unverified.

### 2.2 Product-analytics platforms with agent access

| Product | Free tier / entry price | EU hosting | Agent access |
|---|---|---|---|
| PostHog | 1M events/month free [[113, 114, 115]]; 5,000 recordings/month free [[113, 114, 116]]; usage-based above [VENDOR] | EU Cloud, Frankfurt [VENDOR] [[117, 118]] | Official hosted MCP: SQL, flags, experiments, replay; read-only mode; EU routing [[1, 4, 5, 33, 92, 119]] |
| Amplitude | Unverified; MCP service account is Enterprise or a Plus add-on [[7, 39]] | EU-residency MCP endpoint [VENDOR] [[7, 120]] | Official OAuth MCP, read/write by permission [[39, 71]] |
| Mixpanel | Unverified [[121]] | EU residency opt-in, not default [VENDOR] [[122]] | Official MCP with EU endpoint; free-plan Query API limits [[8]] |
| GA4 | Free | US (Google) | Experimental read-only local MCP [[12]] |

- **PostHog** — web and product analytics, replay, experiments, flags, surveys, SQL/HogQL, AI summaries and anomaly alerts [[1, 4, 32, 62]]. "More than 90%" of companies stay on the free tier [VENDOR] [[114]]. Some AI-powered MCP tools are billed separately and need AI data processing enabled [[4, 91]]. PostHog itself warns that EU hosting alone does not meet every GDPR obligation [[117]]. Evidence: vendor-published customer examples (Runable, SoundBoost) [[26]]; a MindStudio tutorial builds a "$0 CRO stack" on it [[123]]; independent small-team outcomes limited.
- **Amplitude** — charts, dashboards, experiments, cohorts and taxonomy through MCP [[7, 39]]; Claude Code connection documented [[30]]. One source could not verify the MCP in official docs; two others cite them. Oversized for this site; no small-site case.
- **Mixpanel** — event analytics with MCP and API [[8, 124]]; EU ingestion and query endpoints must be configured explicitly [[122]].
- **GA4** — MCP limits follow the Data API's (§1.1); the guide that documents it tells users to "check the numbers Claude reports" [[12]].

### 2.3 Session replay and behavioral AI

| Product | Free tier / entry price | EU hosting | Agent access |
|---|---|---|---|
| Microsoft Clarity | Free, no traffic limit stated [VENDOR] [[35, 65, 125]] | Azure; EU contracts via Microsoft Ireland, transfers under SCCs — not EU-only [[36, 37, 64, 66, 85, 125]] | Official MCP: 10 requests/day, ≤3 days of data, ≤3 dimensions per request [[2, 35]] |
| Contentsquare (incl. Hotjar) | Disputed (below) | Not stated on pricing page [[82]] | Official OAuth MCP; Free plan 300 tool calls/month [[9, 126]] |
| Hotjar | Paid from ~$32/month reported [[127]]; pricing page now redirects to Contentsquare [[128]] | Unverified | MCP not verified |
| Lucky Orange | Unverified | Unverified | Unverified |

- **Microsoft Clarity** — free recordings, heatmaps and Copilot summaries (§1.5). Needs explicit consent for EEA, UK and Swiss visitors (§4.2) [[125]]. Evidence: Netpeak reports +7.36% add-to-cart conversion after a product-page redesign based on Clarity behavior evidence — Microsoft-published, AI effect not isolated [[129]]; Tasmela paired Clarity with an agent (§3.3) [[27]].
- **Contentsquare** — replays, heatmaps, funnels, surveys, session summaries, Sense Analyst and MCP [[9, 67, 68, 82, 83]]. [Divergence: pplx says a Free plan up to 200k sessions/month and Growth from $39/month [[82]]; claude says it is enterprise-oriented, with a reported median negotiated contract of $20K/year [[130]]]. Don't infer hosting location from regional billing. Its AI data flow is in §4.3. No independent small-site uplift evidence.
- **Hotjar** — recordings, heatmaps, surveys and feedback; widely used in CRO practice, but evidence is practitioner recommendation, not quantified cases [[127]]. Merged into Contentsquare in July 2025 (§5.9).
- **Lucky Orange** — dynamic heatmaps, recordings, form analytics, surveys and Discovery AI; vendor case: Interplay Learning demo conversion 6% → 17%, not independently verified [VENDOR: Lucky Orange] [[69]].

### 2.4 Agent-first analytics (2025–2026 entrants)

| Product | Free tier / entry price | EU hosting | Agent access |
|---|---|---|---|
| Humblytics | 5,000 data points and 1 site free; Agents plan one-time $39 per 100,000 data points [VENDOR] [[80, 131]] | EU-only not established [[131]] | Hosted MCP and REST API on every plan [[80]] |
| Databuddy | Free to 10,000 events/month [VENDOR] [[81]] | Unverified | MCP; scopes unverified [[81]] |
| smolanalytics | Free self-host; hosted free to 1M events/month [VENDOR] [[79]] | Hosted residency unverified | 79 MCP tools, 14 prompts [VENDOR] [[79]] |
| Objectiv | €49/month Basic; €249/month Standard; 14-day trial [VENDOR] [[76]] | EU-hosted [VENDOR] [[76]] | MCP-compatible assistants; "use your own AI" [[76]] |
| mcp-analytics | Free to 100,000 hits/month; Pro €19/month; Enterprise from €299/month [VENDOR] [[77]] | Germany, cookie-banner-free by default [VENDOR] [[77]] | MCP read/write tools, OAuth [[77]] |
| Gizmo Analytics | Free to 10,000 events/month; from $9/month [VENDOR] [[78]] | Unverified | Full MCP on every tier [[78]] |
| GrainQL | 14-day trial; from $29/month [VENDOR] [[74]] | Unverified | Query API and live MCP [[74]] |
| Tinylytics | Unverified | Unverified | 24+ read/write tools; read-only selectable [[75]] |
| Agent Analytics | Unverified | Unverified | API, CLI, agent skill [[73]] |

- Humblytics adds A/B testing [[132]] and separately priced team plans [[80, 131]]; it describes privacy-first anonymization, so check its DPA, subprocessors and residency before sending EU data [[131]].
- smolanalytics also offers agent observability and tracks AI-assistant referrals as a channel (§7.10) [[79]].
- Agent Analytics' evidence is the founder's own OpenClaw projects and workflow [[73]].
- Across this group: vendor pages and docs only; no independent adoption or outcome evidence. mcp-analytics and Objectiv are the only ones claiming EU hosting, and legal fit still needs a controller and DPA review [[76, 77]].

### 2.5 Experimentation and CRO testing with agent access

| Product | Free tier / entry price | EU hosting | Agent access |
|---|---|---|---|
| GrowthBook | Open source, self-host; Cloud unverified | Self-host possible | MCP, CLI, agent skills [[13, 94]] |
| Statsig | Unverified | Unverified | Hosted MCP [[14, 93]] |
| Convert Experiences | ~$99/month [[133]] | "GDPR-focused" per a practitioner source [[133]] | MCP not verified |
| VWO | ~$199–$200+/month [[97, 127]] | Unverified | MCP not verified |

- **GrowthBook** — vendor-reported case: Cursor → GrowthBook → Slack [[13]].
- **Convert** — A/B testing, personalization and surveys [[133]].
- **VWO** — A/B, multivariate and split-URL tests plus behavioral analytics; heavy agency use, limited at low traffic [[127]]; VWO Copilot in §1.11.

### 2.6 Autonomous AI CRO and raw-event export

| Product | Free tier / entry price | EU hosting | Agent access |
|---|---|---|---|
| Coframe | Not public | Unverified | Unverified |
| Unbounce Smart Traffic | Unverified | Unverified | Unverified |
| Vercel Drains | Paid-plan feature [UNVERIFIED] | Destination is yours | Your own database or SQL [[46]] |

- Coframe and Smart Traffic need high traffic (§1.11) [[95, 96]]. Vercel Drains has InfoQ coverage as evidence of use [[134]].

**See also:** §6.2 (which products the sources recommend for this site), §4.2 (consent cost of the replay group), §8.7 (price volatility).

## 3. From Insight to Site Change

The full loop is documented as tutorials and vendor capability, not as measured case studies; the strongest documented pattern is AI assisting a human-run workflow [[26, 29, 123]].

### 3.1 The loop

**Question → evidence → hypothesis → patch → release marker → measurement → decision.** A second source frames the same loop as "event collection → governed interpretation → evidence-backed hypothesis → human-approved site change → measurement".

1. **Question** tied to a decision — e.g. "Do visitors on the English positioning page click the free-skill CTA but fail to complete signup more often than visitors on the Polish page?" or "Which Polish landing page produces more free-skill signups per qualified visit?"
2. **Evidence:** counts, rates, denominators and definitions for an explicit window; verify event names and that events fire where intended; have the agent challenge the instrumentation and match a known manual or SQL result.
3. **Qualitative evidence** if available (§1.7, §1.8).
4. **Hypothesis:** one falsifiable change with a predicted mechanism — e.g. "The CTA is visible, but its promise does not explain what arrives by email; add a one-sentence deliverable description."
5. **Patch:** the agent drafts the Astro change on a branch or PR and shows the files changed; no deploy and no pricing or claims rewrite without approval.
6. **Release marker:** commit SHA, date/time, affected page, language, variant, hypothesis, expected metric, guardrail metric. Umami MCP implementations and PostHog expose annotation or project-context features that can hold this [[4, 135]].
7. **Measurement** after a fixed window: primary events plus proxies such as CTA click and signup start.
8. **Decision:** keep, revert or gather more evidence; record result and uncertainty in an experiment ledger.

PostHog's use-case docs show the multi-evidence version: query a funnel, examine paths among drop-offs, correlate with errors or logs, then create an alert [VENDOR: PostHog] [[26]].

### 3.2 Proposal template and approval points

Proposal format as one source wrote it — it blocks "rewrite the hero because bounce rate is high" recommendations:

```text
Observation:
Evidence:
Segment:
Alternative explanations:
Proposed change:
Primary metric:
Guardrail metric:
Expected direction:
Observation window:
Rollback condition:
Confidence:
```

- Ship every proposed change as a PR carrying hypothesis, primary metric, minimum run time and stop rule; the agent may branch, build and report but never silently merge.
- Encode the judgment as repo skills (§1.10) — in Claude Code, e.g. `/weekly-review` and `/propose-test`.
- Put approval at the risky points (§1.10): let the agent query and draft freely; require approval for merges to production, pricing and legal copy, starting or stopping a test, checkout, tracking, consent, redirects and experiment allocation.

### 3.3 Documented cases — all vendor- or founder-reported

- **MindStudio tutorial:** Claude Code builds pages, pastes PostHog experiment snippets into control and test pages, hosts on Vercel — "the entire CRO stack" at $0; a sister post claims a 20%-converting site without a controlled comparison; its one concrete lift — "video testimonials dropped Google Ads cost-per-conversion from $200 to $30" — is an ad metric with no sample size [[29, 123]]. Closest template to this site's stack; it shows the loop can be built, not that it works.
- **Tasmela:** agent plus Clarity; landing-page "next step" rate 14% → 92%, but zero paid conversions after four checkout initiations — evidence of a useful debugging workflow, not of autonomous optimization [[27]].
- **Basedash:** a scheduled agent posting a daily Slack brief on product data suggested onboarding changes; activation rose from 5% to above 50% ("10x"); the agent's causal share is not established [[28]].
- **Spike AI:** +12% free-trial signups after blog recommendations [[136]]. **Dustin Stout:** +400% conversions after AI landing-page advice [[137]]. Directional only.
- **Demand-gen agency (Mindra):** segmenting by campaign, page and device showed conversion rates from 0.6% to 7.2% behind a blended 3.1% — vendor-sourced, but the segmentation principle transfers [[138]].

### 3.4 Measuring at low volume

- **Segment the target,** not the blend: Polish vs English, landing-page variant, mobile vs desktop, free signup vs paid purchase, organic/direct vs paid.
- **Prefer one big reversible change** — a major copy or hierarchy change, a new page variant, a simpler signup flow, a clearer CTA, a page for a distinct audience — over repeated micro-tests of button color or spacing [[21, 22]].
- **Run sequential pre/post:** baseline period, then a fixed post-change period; track micro-conversions (CTA clicks, form starts, checkout starts, email confirmation); no daily peeking; non-significance does not prove the idea failed [[24]].
- **Label before/after as directional:** traffic source, seasonality and campaign mix confound it [[87, 139]].
- **Skip the test when the fix is obvious:** a broken purchase link is fixed directly; a positioning change stays uncertain when traffic cannot separate variants.

**See also:** §5.4 (Tasmela as a wrong-metric failure), §7.3 (the ledger and PR as memory), §6.2 (weekly loop for this site).

## 4. Privacy and Compliance

### 4.1 Cookieless counting is the foundation, not an exemption

- GDPR and national ePrivacy rules both apply. The EDPB says GDPR covers cookie processing involving personal data and that technically necessary cookies are the consent exception — not all analytics or replay [[140]].
- Pseudonymous identifiers remain personal data if re-identification is possible; minimization, purpose limitation, retention and controller/processor roles still apply [[141]]. Document actual fields, IP handling, hosting, retention and legal basis.
- **CNIL audience-measurement exemption** — a national, conditional approach, not an EU-wide rule. Criteria: purpose limited to measuring the publisher's own audience; anonymous statistics only; no cross-checking with other processing; no tracking across sites; users informed and retention limited [[142, 143]]. Updated 4 July 2025 with a self-evaluation tool [[144]]; covers measurement used only for site performance and not linked back to individuals [[145]]; CNIL warns "most large audience measurement offerings" do not qualify [[146]]. No Polish (UODO) position was found.
- **Vendor positions** (claims, not rulings): Plausible — EU processing and storage, no cookies or persistent identifiers, DPA [[104, 105]]; PostHog — Frankfurt instance, EU hosting alone does not satisfy every obligation [[117]]; Umami Cloud — regional storage does not imply regional processing [[100]]; Clarity — §4.2.

### 4.2 Session replay is a different risk class

- **Clarity:** explicit consent required for EEA, UK and Swiss visitors, with consent signals passed to Clarity; data held in Azure, EU customers contract with Microsoft Ireland, cross-border transfers rest on SCCs — not EU-only storage [[64, 125]]; no EU-only processing option established [[36, 37, 66, 85]]. A 2024 analysis notes Clarity's terms let Microsoft use collected personal data for product improvement and advertising-related profiling — "GDPR ready" is not "right for every controller" [[147]].
- PostHog's Replay Vision and Clarity's summaries process recordings that may contain form inputs. Consent-only samples skew toward visitors who accept cookies [UNVERIFIED: no measured bias figure].
- **Replay checklist:**
  - load replay only after valid analytics consent and pass the consent state to the provider;
  - mask all form fields and user-generated text; exclude checkout and account pages;
  - send no email addresses, order IDs or free-text personal data;
  - document provider role, retention and subprocessors;
  - decide whether the LLM provider may receive replay-derived data; prefer aggregate or redacted summaries.

### 4.3 The LLM call is its own data flow

- An EU-hosted analytics store does not settle what reaches the model. Contentsquare lists the session and interaction details sent for replay summaries; group summaries add hashed user/session identifiers and issue details; it says model copies run at its cloud providers and data is not sent to the original model developers [VENDOR: Contentsquare] [[83]].
- Making personal data available to an organization in a third country can be an international transfer under Chapter V; minimization and a lawful basis still apply [[148, 149]].
- A prompt containing an identifier is processing of personal data, and the model provider is usually your processor [[150]]; pseudonymizing before anything reaches the LLM is the standard pattern [[151]].
- PostHog's MCP proxies queries to the project and separates ordinary calls from AI-powered functions that need AI data processing enabled [VENDOR: PostHog] [[4, 91]]. The Umami practitioner kept visitor data under his control while AI processing ran through Google's API — one setup, not a legal conclusion [[42]].
- **Settle per setup:** which model receives query results; whether prompts, outputs or tool results are retained; training use; whether data leaves the EU; individual-level access; whether credentials permit writes.
- **Lowest-risk pattern:** send aggregated counts and non-identifying event names only. Aggregated Umami counts (pageviews per path per day) carry close to zero personal-data risk; raw session rows with IP-derived fields or query strings carry more. Give the agent aggregate SQL views, not base tables; leave persons, replay and arbitrary SQL out until needed — PostHog supports narrowed tool groups and read-only mode [[5]]. Never send URLs with email addresses, raw form text, replay payloads, IPs, unhashed identifiers or free-text survey answers without documented necessity and contract basis; keep emails and form contents out of event properties.
- **Unsettled:** whether a consent-exempt setup stays exempt once its data is piped into a US LLM — no source found guidance.

**See also:** §2.3 (replay products' hosting), §5.7 (leakage as a failure mode), §6.2 (Meta Pixel kept out of scope).

## 5. What Fails

### 5.1 Wrong numbers that look right

The central technical failure: valid SQL or a tool call with the wrong denominator, grain, join, time zone or event (accuracy figures in §1.3, §1.4) [[18, 48, 49, 50]]. Signup rate silently computed over pageviews, sessions or unique visitors is the typical case. One vendor argues hallucinations in e-commerce analytics are "almost always a data infrastructure problem" [VENDOR: Saras Analytics] [[152]]; the GA4 MCP guide says to "check the numbers Claude reports" [[12]].

- **Guardrails:** every answer returns metric definition, SQL or tool call, date range, denominator and row counts; one known-answer query (e.g. last month's signups vs the email provider's count) runs as a weekly sanity check; reconcile against a hand-calculated sample before trusting any recommendation.

### 5.2 Small samples and overfitting to noise

At low volume, A/B tests "run for months or just produce noise" [[21]]; low-traffic guidance favors qualitative research, larger changes and micro-conversions over repeated split tests [[19, 153, 154]]; small samples and heatmaps create false patterns [[86]].

- **Guardrails:** show raw counts beside every rate; don't read a one-week difference as a trend; require two evidence types to converge (counts plus recordings, or recordings plus feedback); accept "insufficient evidence — collect qualitative evidence" as a valid output.

### 5.3 Generic recommendations

"Improve the headline", "add social proof", "optimize mobile" are not decisions; the caution about Sense Analyst — value "depends on specific and prioritized recommendations" — applies to every auto-insight feature [[68]]. Require page, segment, observed symptom, baseline, mechanism, code-level change, metric and revert condition.

### 5.4 Optimizing the wrong metric

CTA clicks can rise while purchases stay flat — Tasmela's 14% → 92% with zero paid conversions (§3.3) [[27]]. Keep purchase completion or qualified signup primary; clicks and scroll are diagnostic. Never call a CTA click a conversion.

### 5.5 Assistants that do less than asked

A request for anomaly detection silently became a threshold alert in PostHog's in-app AI (§1.5) [[72]].

### 5.6 Write access and unsafe closed loops

Connector scopes differ — read-only (Umami's, per one source), write-capable (PostHog), read/write by permission (Amplitude) [[3, 33, 39]]; PostHog's tools can launch and ship experiments [[5]]. A coding agent with analytics write access and repository write access forms an unsafe loop. Separate read and write credentials; default to read-only and tool filtering [[4, 5]]; use least-privilege, project-scoped OAuth even for one person.

### 5.7 Privacy leakage through the AI layer

AI summaries and chat add processors and transfer questions (§4.3) [[83, 148]]. Masking can fail; sending raw recordings to a general-purpose LLM opens a second processing path. Redact locally and summarize aggregates.

### 5.8 Cost surprises

Usage-based analytics, replay retention and AI calls scale independently; a free analytics tier does not mean free AI analysis. PostHog bills some AI-powered MCP tools separately [[4]], and "every AI detector check uses the organization's AI credits" [[72]]. Raw SQL and vendor APIs can add query charges or retention upgrades [UNVERIFIED].

### 5.9 Lock-in

After the July 2025 merger, Hotjar's pricing page redirects to Contentsquare — small users of an acquired tool lose control over pricing [[128]]. Native connectors also tie the loop to the vendor's event model.

### 5.10 Vendor results read as causal

Netpeak's +7.36% [[129]], PostHog's customer examples [[26]] and the 10x activation and 400% conversion claims [[28, 137]] are hypotheses about possible value, not expected results; none isolates design, baseline, sample or confounders.

### 5.11 No documented harmful case

None of the four sources found an agent-shipped site change that measurably hurt conversion; the two that flagged it read the absence as a reporting gap, not as evidence of safety.

**See also:** §1.4 (the fix for §5.1), §7.2 (evaluation sets catch drift), §3.4 (measurement rules behind §5.2).

## 6. Fit for a Small EU Marketing Site

### 6.1 Realistic at modest traffic vs scale-only

- **Realistic:** plain-language questions about counts; weekly agent-written reviews; AI summaries of qualitative signals; painted-door tests; big swings tested sequentially with a written stop rule.
- **Scale-only:** bandit-style autonomous CRO (Coframe, Smart Traffic), continuous detection across a merged enterprise stack (Contentsquare), warehouse-scale agents (Amplitude).
- Solo-founder testing advice: pick ONE signal, explore it for 2–4 weeks "depending on your traffic", and favor tests that take under 30 minutes to set up and directly affect revenue [VENDOR: Intelligems] [[155]].
- The agent speeds up synthesis; it cannot manufacture information the traffic does not contain.

### 6.2 Recommended setup — consensus, with two divergences

1. **Keep self-hosted Umami** as the consent-free source of counts; do not migrate to a large platform for an AI chat interface. PostHog is the most complete ready-made loop — data access, SQL, replay, flags and experiments in one developer-oriented system — if you accept migrating events, more complexity and its pricing [[1]]; Umami fits the existing privacy and cost posture but has a narrower analytical surface and less mature agent integration.
2. **Commit a metric contract** (§1.4) and a question backlog (`METRICS.md`, `QUESTIONS.md`) to the repo.
3. **Give Claude Code read-only access.** [Divergence: pplx says trial Umami's official read-only MCP on a supported version and verify its answers against Umami's own figures [[3, 106]]; youcom says build a narrow local MCP wrapper returning read-only JSON with definitions attached; exa says build a small read-only adapter over the Umami API with fixed operations [[41, 42]]; claude says create a read-only Postgres role on Umami's database with aggregate views (sessions, events, conversions per landing page × language × day), queried through a Postgres MCP server or CLI].
   - Wrapper tools as one source named them: `get_conversion_summary`, `compare_page_variants`, `get_event_series`, `get_recent_annotations`, `check_tracking_health`.
   - Adapter operations in another: page performance, funnel counts, comparison by language, comparison by landing-page variant, event time series.
4. **Instrument decisions, not every interaction.** Proposed event sets:
   - `landing_page_viewed`, `cta_clicked`, `signup_started`, `signup_completed`, `checkout_started`, `purchase_completed`, with properties `language`, `page_variant`, `device_class`, `source_category`, `deployment_id`;
   - or `page_view` (with `language`, `page_variant`), `skill_cta_click`, `signup_start`, `signup_success`, `checkout_start`, `purchase_success`, optionally `purchase_failure`.
   - No email addresses or free text in events.
5. **Add a standing instruction to Claude Code**, worded by one source as: "Use analytics tools for every performance claim; show raw counts and denominator; compare against the previous period; do not recommend a change without an observed symptom; do not deploy without approval." This matches the report that explicit configuration improved unprompted tool use [[31]].
6. **Run a weekly review** (a `/weekly-review` skill) that ends in one to three proposals, each a PR with hypothesis, metric and stop rule, approved by the human:
   1. check tracking health;
   2. compare the last 14 days with the preceding period;
   3. segment by language, page variant and device;
   4. find one credible drop or friction point;
   5. inspect a few relevant recordings or feedback;
   6. form one hypothesis;
   7. ship one reversible change;
   8. annotate the deployment;
   9. review primary and guardrail metrics;
   10. archive the result in a changelog.

   Backlog questions the sources propose: Which page and locale got the most qualified visits? Did signups change in raw count and rate, over which denominator? Did the top CTA get clicks without downstream completions? Did traffic source or page mix shift enough to explain the headline rate? What is the smallest reversible improvement? What observation would reject the proposed explanation?
7. **Add behavior data only for a named "why" question.** [Divergence: pplx says test Clarity (free, AI summaries, limited MCP) or Contentsquare (larger free allowance, MCP) after reviewing their AI data flows, accepting a possible second analytics tag [[2, 9, 64, 82, 83]]; youcom says evaluate EU-hosted PostHog if traffic and consented visitors suffice, otherwise feedback, interviews and usability tests; exa says consent-gated Clarity for a limited diagnostic period if legally acceptable, otherwise an on-site question or customer interviews [[24, 37, 66]]; claude says consent-free sources first — exit or feedback widget, email replies — then PostHog EU replay behind consent, accepting the sample bias].
8. **Keep the Meta Pixel out of the agent's scope.**
9. **Keep an experiment ledger in Git:** hypothesis, change, launch date, traffic context, primary metric, guardrail metric, observation window, result, decision (§7.3).

### 6.3 First agent tasks

1. "Audit whether the tracking plan can answer our five business questions."
2. "Reconcile the agent's answer with a hand-calculated sample."
3. Only then generate recommendations. The tracking-plan sequence is in §7.1.

### 6.4 What not to do

- Don't migrate to a large analytics platform only to get an AI chat interface.
- Don't let the agent invent metric definitions.
- Don't run formal A/B tests on every copy change, or treat an insignificant result as a winner.
- Don't add session replay without revisiting consent and data-processing documentation.

**See also:** §4.3 (what the read route may send to the LLM), §2.1 (the Umami MCP divergence behind item 3), §7.2 (testing the agent before trusting it).

## 7. Orphan Topics

### 7.1 The tracking plan may be the first high-value agent output

The agent can inspect the site, list conversion paths and spot that the implementation lacks, say, a purchase-completion event or a page-variant property — worth more than an early "insight". Defining what to measure gives the agent a smaller, better-defined language [[53, 54]]. Sequence: (1) agent audits repo and current events; (2) writes a tracking plan; (3) human approves event names; (4) agent implements instrumentation; (5) validates events in staging; (6) analysis starts. Direct support is one PostHog handbook page where the agent offers to add tracking events for a new flow, with no outcome data [[156]]; "write the tracking plan first" may really mean "write the metric definitions first".

### 7.2 Analytics questions become an evaluation set

Keep five to ten fixed questions with expected definitions and manually verified answers (e.g. "signup conversion by landing page"); rerun them after connector, schema or model changes; track correctness, unsupported claims, query cost and whether a recommendation led to a shipped change. Derived from the documented gap between executable and correct SQL and from metric ambiguity, not from a reported practice [UNVERIFIED] [[18, 40, 50, 58, 59]].

### 7.3 The repository is the analytics control plane

Git can hold the tracking plan, metric definitions, query library, experiment ledger and approved prompts — reviewable history that lets the agent link deploys to metric changes; PostHog's positioning explicitly ties analytics to code and post-merge evaluation [[6]].

- **Annotations as memory:** a solo founder forgets what changed, when and why; a deploy record (date, pages, hypothesis, metric, rollback condition) lets the agent separate a behavior shift from a copy change, campaign launch or tracking bug. No standard "deploy log for AI analytics" was found.
- **The PR replaces the dashboard:** the natural output of a coding agent is a pull request with evidence, the copy or layout change, tests, event updates, a measurement plan and rollback instructions — the insight lands where the change ships.

### 7.4 The question backlog is the scarce resource

The scarce resource is a ranked list of decisions, not dashboard access; the strongest workflows give the agent a business objective and recurring questions, as in Basedash's activation focus and daily briefs [[28]]. Keep about ten reusable questions instead of asking for generic insights. Support is indirect — consensus-like, not demonstrated (§8.2).

### 7.5 "MCP is the thin part"

GrowthBook argues the protocol layer should get thinner while the system behind it gets deeper [[94]] — against the race to count tools (the 66-tool Umami server vs lean ones [[15, 34]]; a 42-tool dashboard replacement [[31]]). For a coding agent, a small CLI or SQL path plus good skills may beat a large tool catalog; this fits the semantic-layer evidence (§1.4).

### 7.6 A refusal is a feature

dbt's semantic layer scored 0% on questions needing too many entity hops because it refused rather than guessed [[56]]. Tell the agent to answer "not answerable from the defined metrics" instead of improvising.

### 7.7 Explanation beats detection

Anomaly detection is a commodity; correlating a change with page, browser, language, deploy or funnel stage is the product [[157]]. "Polish mobile visitors stopped reaching checkout after deploy X" is useful; "conversion is down" is not.

### 7.8 Agent-watched recordings become queryable events

PostHog's Replay Vision saves each observation as a `$recording_observed` event [VENDOR: PostHog] [[62]]. Qualitative observations turn into rows, blurring raw SQL (§1.3) and built-in AI (§1.5); on a low-traffic site, "% of sessions where the visitor didn't understand the pricing" could become a main metric [speculation in source].

### 7.9 Low-traffic sites optimize learning velocity

When significance is out of reach, the goal shifts from statistical certainty to the shortest time between observed friction and a reversible improvement, supported by sequential comparisons, micro-conversions and qualitative evidence [[24, 25]].

### 7.10 AI-assistant referrals are a new segment

A 2026 analytics product lists AI-assistant referrals as a tracked channel [[79]]; Contentsquare's roadmap adds visibility into LLM-referred traffic and how it converts [[68]]. For a site selling AI skills, a referrer = ChatGPT/Claude/Perplexity segment in Umami is cheap [UNVERIFIED: no small-site data]; referral volume does not imply purchase intent.

### 7.11 The site may need to be legible to agents

PostHog's 2026 web analytics team works on separating AI-agent sessions from human ones and finding flows agents fail to complete, partly unreleased [VENDOR: PostHog] [[158]]. The transferable habit: treat accessibility, clear structure, stable forms and machine-readable product information as conversion reliability — can an AI browser find the offer, read both languages and reach signup or checkout? No measured uplift exists.

### 7.12 Measure the agent itself

PostHog's MCP Analytics records an agent's tool calls, intent, latency, errors and missing capabilities [VENDOR: PostHog] [[159, 160]]; its AI observability product traces LLM calls, costs and evaluations, so one tool could measure both the funnel and an LLM-calling product [[161]]. Relevant once analysis is automated, not in a first trial.

### 7.13 Data journalism transfers to small-site analytics

Willison's workshop teaches coding agents for data analysis through explore, clean and query exercises — the same skills a solo founder needs, and more practical than most analytics-vendor content [[47]].

## 8. Open Questions and Thin Evidence

### 8.1 No independent solo-founder loop with results

Every result is a vendor claim, a founder report or a tutorial; none shows a solo founder's full workflow from event schema through agent query to a measured marketing-site change [[26, 27, 28, 29, 136, 137, 162]].

### 8.2 The folk hypotheses are only partly supported

- "The bottleneck is a backlog of good questions" — supported indirectly (GrowthBook's skills argument, the caution on generic recommendations) [[68, 94]].
- "The agent's first useful job is the tracking plan" — one PostHog handbook page, no outcome data [[156]].

### 8.3 AI replay summaries vs human review

Their accuracy at low traffic is under-studied; Clarity reports scale and usage, not comparative accuracy or incremental conversion impact [[37, 66, 86]].

### 8.4 Low-traffic thresholds are heuristics

"Five users", "20 recordings" and "under 30 conversions = directional" are decision heuristics; conversion rate, minimum detectable effect, traffic mix and business risk set the real sample need [[19, 21, 87, 153, 163]].

### 8.5 Legal conclusions don't generalize

Vendor legal assessments, the CNIL's conditional exemption and EDPB transfer guidance answer different questions; a no-cookie claim does not clear session replay or LLM processing [[105, 142, 148]]. Treatment is configuration- and jurisdiction-dependent. Safest operating assumption until specialist advice: data minimization, no direct identifiers, EU-controlled infrastructure where feasible, documented processor terms, consent for replay-style data [[100, 141, 164]].

### 8.6 Community MCP servers are unaudited

Community servers may expose credentials, write operations or unbounded data access; the Umami repos document capabilities, not security, and have no accuracy benchmarks [[15, 34]].

### 8.7 Plans, prices and MCP limits move fast

Clarity's export limits, Umami Cloud plan eligibility, Contentsquare's tool-call allowance and product prices need rechecking before adoption [[2, 3, 9, 82]]; legal terms for the newer products are incomplete [[74, 76, 77, 78, 100, 102]]; PostHog's anomaly detectors and GrowthBook 5.2 are recent.

### 8.8 Autonomous optimization is unproven here

Write and experiment tools exist, but nothing shows unrestricted agent-driven changes beating a human-approved workflow on low-volume bilingual marketing pages [[33, 39]].

### 8.9 The real open question

Not which AI analyst is smartest, but whether the site has enough well-defined events, behavioral evidence and repeatable questions for the agent's recommendations to beat a human reading a handful of well-chosen sessions. Test that narrowly — fixed question set, human approval — before migrating tools or widening permissions.

## Sources

1. [Use product analytics over PostHog MCP - Docs](https://posthog.com/docs/product-analytics/surfaces/mcp) [exa, pplx, youcom]
2. [Microsoft Clarity MCP Server | Microsoft Learn](https://learn.microsoft.com/en-us/clarity/third-party-integrations/clarity-mcp-server) [claude, pplx]
3. [MCP - Umami docs](https://docs.umami.is/docs/mcp) [pplx]
4. [Model Context Protocol (MCP) - Docs - PostHog](https://posthog.com/docs/model-context-protocol) [youcom]
5. [PostHog MCP tools reference - Docs - PostHog](https://posthog.com/docs/model-context-protocol/tools) [exa, youcom]
6. [Analytics - Handbook](https://posthog.com/handbook/marketing/positioning/analytics) [exa]
7. [Amplitude MCP Server](https://amplitude.com/docs/api/content/amplitude-ai/amplitude-mcp) [pplx]
8. [Mixpanel MCP Server](https://docs.mixpanel.com/docs/mcp) [pplx]
9. [Claude - MCP](https://docs.contentsquare.com/en/mcp/claude/) [pplx]
10. [Plausible docs](https://plausible.io/docs/data-access) [claude, pplx]
11. [Matomo FAQ](https://matomo.org/faq/how-to/how-to-configure-the-matomo-mcp-server/) [claude]
12. [Count](https://count.co/ai/google-analytics-mcp) [claude]
13. [GrowthBook](https://www.growthbook.io/insights/automate-experiment-lifecycle-growthbook-mcp) [claude]
14. [Statsig](https://www.statsig.com/updates/update/mcpserver) [claude]
15. [mikusnuz](https://github.com/mikusnuz/umami-mcp) [claude, youcom]
16. [mackenly](https://github.com/mackenly/mcp-fathom-analytics) [claude]
17. [dbt Labs, 2026](https://docs.getdbt.com/blog/semantic-layer-vs-text-to-sql-2026) [claude]
18. [SQL query generation from natural language - ISE Developer Blog](https://devblogs.microsoft.com/ise/llm-sql-query-generation/) [pplx]
19. [CRO Roadmap for Low-Traffic Websites](https://www.zspace.in/blogs/cro-strategy-low-traffic-websites) [pplx]
20. [CRO for Low-Traffic Websites: Skip the A/B Test | Entropy](https://entropyand.co/blog/cro-for-low-traffic-websites) [pplx]
21. [A/B Testing With Low Traffic: How to Keep Experimenting](https://www.customerimpact.be/en/blog/ab-testing-low-traffic/) [claude, youcom]
22. [CRO When You Don’t Have Enough Traffic for A/B Testing — Niels Christian](https://nclaursen.dk/blog/cro-without-enough-traffic-for-ab-testing/) [youcom]
23. [Optimization is NOT just A/B Testing](https://www.convert.com/blog/a-b-testing/how-to-successfully-optimize-when-you-cant-ab-test/) [youcom]
24. [Low-Traffic CRO Iterations for SaaS Landing Pages](https://www.uprawmedia.com/blog/low-traffic-cro-iterations) [exa]
25. [#155 | Ethical Testing & Design in Experimentation](https://experimentnation.substack.com/p/155-ethical-testing-and-design-in) [exa]
26. [PostHog MCP use cases - Docs](https://posthog.com/docs/model-context-protocol/use-cases) [pplx]
27. [From 14% to 92% Conversion with an AI Agent (Case Study) — Tasmela](https://tasmela.com/en/blog/increase-conversion-rate-ai-agent) [youcom]
28. [We let AI drive our product roadmap | Basedash](https://www.basedash.com/blog/we-let-ai-drive-our-product-roadmap-and-it-10x-d-our-activation-rate) [exa]
29. [MindStudio](https://www.mindstudio.ai/blog/how-to-build-20-percent-converting-lead-gen-site-claude-code-full-workflow) [claude]
30. [Connect Amplitude MCP to Claude Code](https://amplitude.com/docs/amplitude-ai%2Famplitude-mcp%2Fclaude-code) [pplx]
31. [Show HN: I threw away my analytics dashboard and replaced it with 42 MCP tools | Hacker News](https://news.ycombinator.com/item?id=48233125) [exa]
32. [PostHog MCP FAQ and advanced setup - Docs](https://posthog.com/docs/model-context-protocol/faq) [pplx]
33. [model-context-protocol.md](https://posthog.com/docs/model-context-protocol.md) [pplx]
34. [GitHub - Macawls/umami-mcp-server: A lean MCP Server for Umami analytics · GitHub](https://github.com/Macawls/umami-mcp-server) [claude, youcom]
35. [Introducing the Microsoft Clarity MCP Server: A Smarter Way to Fetch Analytics with AI - Understand your customers](https://clarity.microsoft.com/blog/introducing-the-microsoft-clarity-mcp-server-a-smarter-way-to-fetch-analytics-with-ai/) [claude, youcom]
36. [Clarity Monthly Recap – June 2025 - Understand your customers | Microsoft Clarity Blog](https://clarity.microsoft.com/blog/clarity-monthly-recap-june-2025/) [exa]
37. [Clarity Turns 5: Celebrating Five Years of Insights and Innovation](https://clarity.microsoft.com/blog/clarity-turns-five/) [exa]
38. [GitHub](https://github.com/matomo-org/plugin-McpServer) [claude]
39. [Amplitude MCP Server](https://amplitude.com/docs/amplitude-ai/amplitude-mcp) [pplx]
40. [AI Agent Data Integration: 3 Practical Routes Explained](https://agentic-affairs.com/ai-agent-data-integration/) [exa]
41. [API client](https://v2.umami.is/docs/api/api-client) [exa]
42. [📈 DASHBOARD ANALYSIS (GEMINI-CLI):](https://www.rhelmer.org/blog/ai-powered-analytics-reports-using-mcp/) [exa]
43. [Plausible Stats API reference](https://plausible.io/docs/stats-api) [pplx]
44. [StackOne](https://www.stackone.com/blog/ai-marketing-analytics-agent-claude/) [claude]
45. [(A Better) Agentic CRO via MCP Using PostHog](https://agenticbrand.ai/p/a-better-agentic-cro-via-mcp-using-posthog) [youcom]
46. [Vercel changelog](https://vercel.com/changelog/export-more-data-with-vercel-drains) [claude]
47. [Simon Willison](https://simonwillison.net/2026/Mar/16/coding-agents-for-data-analysis/) [claude]
48. [Semantic Layer for AI: Why LLM Analytics Fail Without One - Knowi](https://www.knowi.com/blog/semantic-layer-for-ai/) [youcom]
49. [Why text-to-SQL fails - Omni Analytics](https://omni.co/blog/why-text-to-sql-fails) [youcom]
50. [Natural Language Interfaces for Databases: What Changes for SQL-Literate Users?](https://arxiv.org/html/2511.14718v4) [pplx]
51. [Bring structured context to conversational analytics with dbt](https://www.getdbt.com/blog/bring-structured-context-to-conversational-analytics-with-dbt) [pplx]
52. [Semantic Layer for AI Agents (2026)](https://cube.dev/articles/semantic-layer-for-ai-agents-2026) [youcom]
53. [dbt Semantic Layer | dbt Developer Hub](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl) [pplx]
54. [Introducing the dbt MCP Server – Bringing Structured Data to ...](https://docs.getdbt.com/blog/introducing-dbt-mcp-server) [pplx]
55. [dbt Roundup](https://roundup.getdbt.com/p/semantic-layer-as-the-data-interface) [claude]
56. [Kalin Gwu, Medium](https://medium.com/@kalingwu/text-to-sql-accuracy-semantic-layer-research-f39f62b952ba) [claude]
57. [Semantic Layers for Reliable LLM-Powered Data Analytics: ​](https://arxiv.org/pdf/2604.25149) [youcom]
58. [Introducing Agent Native Analytics](https://www.builder.io/blog/introducing-agent-native-analytics) [exa]
59. [Medium](https://blog.dataengineerthings.org/semantic-layer-for-ai-beyond-sql-aae652837a5a) [exa]
60. [Medium](https://ian-macomber.medium.com/text-to-analytics-interfaces-in-the-post-ai-era-72b17b59ce66) [exa]
61. [Changelog - PostHog](https://posthog.com/changelog) [youcom]
62. [PostHog](https://posthog.com/learn/session-replay/pocket-guide/replay-vision) [claude]
63. [Clarity blog](https://clarity.microsoft.com/blog/the-quick-guide-to-microsoft-claritys-copilot/) [claude]
64. [Frequently asked questions](https://learn.microsoft.com/en-us/clarity/faq%20) [pplx]
65. [Pricing - Clarity](https://clarity.microsoft.com/pricing) [pplx]
66. [How to Collaborate in Microsoft Clarity (Guide) - Understand your customers | Microsoft Clarity Blog](https://clarity.microsoft.com/blog/clarity-cross-functional-collaboration-guide/) [exa]
67. [AI Agent for Conversion Rate Optimization: How It Works 2026](https://www.youngurbanproject.com/ai-agent-for-conversion-rate-optimization/) [youcom]
68. [CX Today](https://www.cxtoday.com/customer-analytics-intelligence/contentsquare-is-building-a-single-layer-for-ai-powered-customer-analytics/) [claude]
69. [Conversion Rate Optimization: The Complete Guide (2026)](https://www.luckyorange.com/blog/posts/conversion-rate-optimization-guide) [youcom]
70. [Simple Analytics](https://www.simpleanalytics.com/ai) [claude]
71. [Amplitude IR](https://investors.amplitude.com/node/9986/pdf) [claude]
72. [PostHog issue #130832](https://github.com/PostHog/posthog/issues/130832) [claude]
73. [How We Started Agent Analytics | Agent Analytics Blog](https://blog.agentanalytics.sh/blog/how-we-started/) [exa]
74. [GrainQL](https://www.grainql.com/) [exa]
75. [Agents | Tinylytics](https://tinylytics.app/agents) [exa]
76. [Objectiv: cookieless web analytics you can ask questions](https://objectiv.ai/) [exa]
77. [mcp-analytics.com](https://mcp-analytics.com/llms.txt) [exa]
78. [Pricing — Gizmo Analytics](https://gizmoanalytics.io/en/pricing) [exa]
79. [the best analytics MCP servers, and the one honest question to ask of each, smolanalytics](https://smolanalytics.com/blog/best-analytics-mcp-servers) [youcom]
80. [LLM Context, Humblytics Product Information](https://humblytics.com/llms) [pplx]
81. [Databuddy Docs: Install, SDKs, REST API, and MCP](https://www.databuddy.cc/docs) [pplx]
82. [Contentsquare Pricing: Pick Your Plan and Platform](https://contentsquare.com/pricing/) [pplx]
83. [How to use Session Replay Summaries](https://support.contentsquare.com/hc/en-us/articles/37271714298897-How-to-use-Session-Replay-Summaries) [pplx]
84. [AI Conversion Rate Optimization: Smarter CRO With Predictive Analytics](https://contentsquare.com/guides/conversion-rate-optimization/ai/) [youcom]
85. [Microsoft Clarity - Free Heatmaps & Session Recordings](https://clarity.microsoft.com/) [exa]
86. [Conversion Rate Optimisation for Small Traffic Sites: What Actually Works - palvdm.com](https://palvdm.com/blog/cro-low-traffic/) [youcom]
87. [The 8 best CRO tools for every conversion stage | Webflow Blog](https://webflow.com/de/blog/cro-tools) [pplx]
88. [Indie Hackers](https://www.indiehackers.com/post/the-first-5-ai-agents-every-indie-hacker-should-build-instead-of-hiring-d931d12c39) [claude]
89. [Query web traffic over PostHog MCP - Docs](https://posthog.com/docs/web-analytics/surfaces/mcp) [pplx]
90. [Use experiments over PostHog MCP - Docs - PostHog](https://posthog.com/docs/experiments/surfaces/mcp) [youcom]
91. [posthog/services/mcp/README.md at master · PostHog/posthog · GitHub](https://github.com/PostHog/posthog/blob/master/services/mcp/README.md) [youcom]
92. [PostHog Claude Code docs](https://posthog.com/docs/model-context-protocol/claude-code) [claude]
93. [Statsig](https://www.statsig.com/mcp) [claude]
94. [GrowthBook](https://www.growthbook.io/blog/why-growthbooks-mcp-server-is-just-the-interface) [claude]
95. [Coframe](https://www.coframe.com/post/the-math-behind-coframes-optimizers) [claude]
96. [Unbounce](https://unbounce.com/marketing-ai/smart-traffic-experiments/) [claude]
97. [SalesHive](https://saleshive.com/vendors/vwo) [claude]
98. [FAQ – umami](https://docs.umami.is/docs/faq) [pplx]
99. [9 best open source analytics tools for developers and startups - PostHog](https://posthog.com/compare/best-open-source-analytics-tools) [youcom]
100. [Umami FAQ](https://docs.umami.is/docs/cloud/faq) [claude, exa]
101. [Cloudzy](https://cloudzy.com/blog/umami-review/) [claude]
102. [Overview – umami](https://docs.umami.is/docs/cloud) [exa, pplx]
103. [Plausible pricing and subscription plans](https://plausible.io/docs/subscription-plans) [pplx]
104. [Security and compliance overview | Plausible docs](https://plausible.io/docs/compliance) [pplx]
105. [Plausible: GDPR, CCPA and cookie law compliant web analytics](https://plausible.io/data-policy) [pplx]
106. [Umami v3.4](https://umami.is/blog/umami-v3.4) [pplx]
107. [Plausible Analytics Review: Marketing Pricing and Catches](https://workstak.co/tools/plausible-analytics) [pplx]
108. [Open Source Analytics Tools by License and Hosting Model (2026)](https://openpanel.dev/articles/open-source-web-analytics) [youcom]
109. [european-alternatives](https://european-alternatives.eu/product/plausible.io) [claude]
110. [Techjockey](https://www.techjockey.com/us/detail/plausible) [claude]
111. [EU-hosted web analytics with no data transfers outside Europe](https://plausible.io/eu-hosted-web-analytics) [pplx]
112. [The best Matomo alternatives & competitors, compared](https://posthog.com/blog/best-matomo-alternatives) [youcom]
113. [PostHog pricing – Start free, scale when you need](https://posthog.com/pricing) [pplx]
114. [Product Analytics pricing – PostHog](https://posthog.com/product-analytics/pricing) [claude, pplx]
115. [GitHub - PostHog/posthog: :hedgehog: PostHog is the leading platform for building self-driving products. Our developer tools](https://github.com/PostHog/posthog) [youcom]
116. [Mean CEO](https://blog.mean.ceo/posthog-news-october-2026/) [claude]
117. [Introducing PostHog Cloud EU](https://posthog.com/blog/posthog-cloud-eu) [pplx]
118. [Privacy compliance - Docs - PostHog](https://posthog.com/docs/privacy) [pplx]
119. [posthog | Cursor MCP Server](https://cursor.com/marketplace/mcp/posthog) [exa]
120. [How to connect Amplitude MCP to other MCP clients](https://amplitude.com/docs/amplitude-ai/amplitude-mcp/other-clients) [pplx]
121. [Pricing](https://mixpanel.com/pricing/) [pplx]
122. [EU Residency - Mixpanel](https://docs.mixpanel.com/docs/privacy/eu-residency) [pplx]
123. [MindStudio](https://www.mindstudio.ai/blog/build-ab-test-landing-page-claude-code-free-posthog-vercel) [claude]
124. [Reference - Overview - Mixpanel](https://docs.mixpanel.com/reference/overview) [pplx]
125. [Frequently asked questions](https://learn.microsoft.com/en-us/clarity/faq) [youcom]
126. [41563169756945.json](https://support.contentsquare.com/api/v2/help_center/en-us/articles/41563169756945.json) [pplx]
127. [Best CRO Tools in 2026: Honest Review After 800+ A/B Tests](https://grow-conversions.com/blog/best-cro-tools-2026/) [youcom]
128. [Formbricks](https://formbricks.com/blog/hotjar-pricing) [claude]
129. [Netpeak - Success stories from Clarity users](https://clarity.microsoft.com/case-studies/netpeak/) [pplx]
130. [Koji](https://www.koji.so/blog/hotjar-pricing-2026) [claude]
131. [A/B Testing & CRO FAQ, Setup, Pricing & Integration Help](https://humblytics.com/faq) [pplx]
132. [Pricing, Analytics & A/B Testing from $79/mo](https://humblytics.com/pricing) [pplx]
133. [Ecommerce CRO 2026: Agency vs In-House vs Tool Stack Guide](https://improvado.io/blog/ecommerce-cro) [youcom]
134. [InfoQ](https://www.infoq.com/news/2025/10/vercel-drains-observability/) [claude]
135. [r/umamiengine on Reddit: How to Use Umami Analytics With Your AI Agent Using MCP](https://www.reddit.com/r/umamiengine/comments/1wll76q/how_to_use_umami_analytics_with_your_ai_agent/) [youcom]
136. [From Traffic to Conversions – How Squadcast Optimized Engagement with Spike AI](https://getspike.ai/casestudies/from-traffic-to-conversions-how-squadcast-optimized-engagement-with-spike-ai/) [exa]
137. [The 30-Second Solution That Produced 400% Increase in Conversions • Dustin Stout](https://dustinstout.com/400-percent-increase-in-conversions/) [exa]
138. [How a Demand Gen Agency Lifted Paid Conversion 15% by Testing the Page, Not the Average](https://mindra.co/case-studies/landing-page-conversion-tests-demand-gen-agency) [youcom]
139. [www.brillmark.com · low-traffic-cro-how-to-improveLow Traffic CRO: How to Improve Conversions When You Don’t ...](https://www.brillmark.com/low-traffic-cro-how-to-improve-conversions-when-you-dont-have-big-numbers/) [pplx]
140. [Frequently asked questions](https://www.edpb.europa.eu/sme/find-practical-info/faq_en) [pplx]
141. [What Is GDPR-Aligned Product Analytics for B2B SaaS? – SaaS Tracker](https://www.saastracker.eu/resources/what-is-gdpr-compliant-product-analytics/) [exa]
142. [Solutions de mesure d'audience exemptées de consentement - CNIL](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience) [pplx]
143. [Sheet n°16: Use analytics on your websites and applications](https://www.cnil.fr/fr/node/677) [pplx]
144. [PPC Land](https://ppc.land/french-data-regulator-updates-cookie-exemption-rules-for-websites/) [claude]
145. [Matomo FAQ](https://matomo.org/faq/general/cnil-compliance-for-ecommerce-tracking/) [claude]
146. [CNIL](https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications) [claude]
147. [Microsoft Clarity and privacy - Beantin](https://beantin.net/microsoft-clarity-and-privacy/) [youcom]
148. [International data transfers | European Data Protection Board](https://www.edpb.europa.eu/sme/be-compliant/international-data-transfers_en) [pplx]
149. [Guidelines 05/2021 on the Interplay Between the Application ...](https://www.edpb.europa.eu/system/files/documents/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf) [pplx]
150. [Anonde](https://anonde.io/blog/gdpr-llms/) [claude]
151. [Arub Hardwaj](https://arubhardwaj.eu/it/blog/gdpr-llms-practical-guide) [claude]
152. [Saras Analytics](https://www.sarasanalytics.com/blog/why-your-llm-keeps-getting-ecommerce-data-wrong) [claude]
153. [www.webenture.com › blog › cro-without-ab-testingCRO Without A/B Testing: What to Do When You Don't Have ...](https://www.webenture.com/blog/cro-without-ab-testing) [pplx]
154. [A/B Testing With Low Traffic: What To Do Instead](https://younusfardeen.com/blog/ab-testing-low-traffic) [pplx]
155. [Intelligems](https://www.intelligems.io/resources/blog/how-should-a-solo-founder-approach-a-b-testing) [claude]
156. [PostHog handbook](https://posthog.com/handbook/engineering/ai/products) [claude]
157. [What is AI-Native Analytics? (And Why It's Different from Analytics + AI) | TrackCrumb](https://trackcrumb.com/blog/what-is-ai-native-analytics) [exa]
158. [Web Analytics Team](https://posthog.com/teams/web-analytics) [pplx]
159. [MCP Analytics - Docs - PostHog](https://posthog.com/docs/mcp-analytics) [pplx]
160. [Getting started with MCP Analytics - Docs](https://posthog.com/docs/mcp-analytics/start-here) [pplx]
161. [PostHog](https://posthog.com/ai-observability) [claude]
162. [Custom Permits Case Study - Associates AI](https://associatesai.team/case-studies/custom-permits) [pplx]
163. [CRO for Low Traffic Websites (2026)](https://grow-conversions.com/blog/cro-low-traffic/) [youcom]
164. [Integrating an LLM without violating GDPR: 2025 guide · Pierre Kasparian](https://pierrekasparian.com/en/blog/guide/integrate-llm-gdpr) [exa]
