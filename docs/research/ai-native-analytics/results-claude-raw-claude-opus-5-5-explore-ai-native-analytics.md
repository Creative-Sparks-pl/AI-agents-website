---
provider: "claude"
model: "claude-opus-5-5"
brief: "brief-pplx-explore-ai-native-analytics.md"
duration_ms: 167550
input_tokens: 301885
output_tokens: 14474
searches: 38
cost_usd: 0.9760826
truncated: False
citation_scheme: "unified"
---

# Research Results: brief-pplx-explore-ai-native-analytics

**Provider:** claude (claude-opus-5-5)

---

# How Solo Founders and Small Teams Use AI Agents to Read Website Analytics (2024–2026)

## Executive Summary

The setup the brief describes is common now: an AI agent reads the analytics, explains what is happening and proposes changes, while the human mostly stops reading dashboards. Almost every analytics vendor ships a connector for it. Plausible, Matomo, Microsoft Clarity, Amplitude, PostHog, GrowthBook, Statsig and Google's GA4 each have an official or officially documented MCP server, and community servers exist for Umami and Fathom. Because connectors are everywhere, **access is no longer what limits these setups.** Three other things decide whether the loop produces anything you can ship and measure:

1. **Written metric definitions.** dbt Labs' 2026 benchmark found that an LLM querying a semantic layer gets close to 100% of covered questions right. Free-form SQL over the same data scored 64.5% (dbt Labs, 2026 [[1]]) [VENDOR: dbt Labs]. Context matters more than which model you pick.
2. **Decision rules ("skills") on top of the connector.** GrowthBook rebuilt its agent layer after concluding that "MCP is not the product." The API provides capabilities, and separate skills tell the agent when an experiment is warranted and which assumptions need a human to confirm (GrowthBook [[2]]) [VENDOR: GrowthBook].
3. **Methods that work at low traffic.** For sites with little traffic, practitioners recommend dropping classic A/B tests in favour of painted-door tests, sequential testing and qualitative research (Customer Impact [[3]]). AI-written session summaries are where agents actually save time at this scale.

The strongest evidence is vendor documentation plus a handful of practitioner guides. **I found no rigorous first-hand case study of a solo founder's agent-driven conversion loop with before/after numbers.** The closest one, a "20%-converting" Claude Code + PostHog site, comes from a tooling vendor's blog and does not include a controlled comparison (MindStudio [[4]]). Treat everything below about results as thin evidence.

For your site (Astro + Vercel + self-hosted Umami, EU, near-zero budget), a few things follow:
- Keep Umami as the consent-free source of counts.
- Give Claude Code a written metrics file (a "semantic layer lite") and a backlog of questions to work through.
- Use Umami's own database or an MCP server for reads.
- Make qualitative signals and painted-door tests the main experiment tools.
- Add PostHog EU or Clarity only if you accept the consent trade-off.

---

## Map of Approaches

### 1. A connector (MCP server) on the analytics tool you already use
**How it works.** The agent calls a vendor or community MCP server that wraps the tool's reporting API.

**Examples:**
- **Plausible** documents an MCP server, built by the Sentry team, for plain-language questions about traffic, top pages, conversions and goals (Plausible docs [[5]]).
- **Matomo's** MCP server is included in Matomo Cloud and available as a plugin for self-hosted installs. Matomo describes it as an "API gateway or protocol adapter" that does not itself use AI models. It warns that it "cannot guarantee the accuracy… of third-party AI systems" (Matomo FAQ [[6]]).
- **Google's GA4 server** is experimental, read-only and runs locally. It goes through the Data API, so it "inherits that API's limits" (Count [[7]]).
- **Umami** has community servers ranging from "lean" (Macawls [[8]]) to one that claims "66 tools" covering API v2 (mikusnuz [[9]]).
- **Fathom** has a community server (mackenly [[10]]).

**Trade-off.** Setup is quick, but the agent only sees the aggregates the vendor exposes, with the vendor's quotas and thresholds. A connector with a long list of tools is not the same thing as a correct answer.

**Connection.** Matomo's disclaimer and the dbt benchmark point the same way: the connector moves the data, but nothing in it checks the meaning of the numbers (see approach 3).

### 2. Raw events in a database the agent queries with SQL
**How it works.** Event-level data sits in a database the agent can query with SQL. That can be a self-hosted Umami Postgres or MySQL database, a PostHog warehouse queried in HogQL, Plausible's scheduled raw-event exports (Plausible docs [[5]]), or Vercel Drains. Drains stream Web Analytics events, traces and Speed Insights data to any destination (Vercel changelog [[11]]) [VENDOR: Vercel].

**Who uses it.** Simon Willison's NICAR 2026 workshop teaches this exact pattern to data journalists: Claude Code and Codex, a chapter called "asking questions against a database", then exploration and data cleaning (Simon Willison [[12]]).

**Trade-off.** It is the most flexible option and has no vendor lock-in. It is also where agents get numbers subtly wrong, as the next section shows.

**Why it matters for you.** Your self-hosted Umami already *is* a SQL database in the EU. Claude Code can get read-only access to it with no new vendor and no new data transfer beyond what goes into the LLM prompt.

### 3. A semantic layer, or written metric definitions
**How it works.** Metrics are defined once ("signup conversion = distinct sessions with `signup_submit` ÷ sessions on landing pages"), and the agent queries those definitions instead of writing raw SQL.

**Evidence** [VENDOR: dbt Labs]:
- In dbt's 2026 rerun, both frontier models scored 98.2–100% on questions the semantic layer covered, versus 64.5% for text-to-SQL (dbt Labs [[1]]).
- Over all 11 questions the gap was 72.7% vs 64.5%, because the semantic layer *refused* questions outside what it models instead of guessing.
- An independent review of these benchmarks concludes "context moves accuracy more than model choice" (Kalin Gwu, Medium [[13]]).
- dbt's earlier 2023 benchmark reported 83% accuracy on the subset of questions that were addressable (dbt Roundup [[14]]).

**How it transfers to a small site.** You do not need dbt. What carries over is the principle: write the metric definitions down, and accept "can't answer" as a valid response. A `METRICS.md` in the repo, plus a few saved SQL views over Umami, gets most of the benefit [UNVERIFIED: no small-site benchmark of this lightweight version exists].

**Connection.** This is why approach 1 alone produces confident but wrong answers, and why "write the tracking plan first" may really be "write the metric definitions first."

### 4. AI analysts built into the analytics product (plain-language Q&A, auto-insights, anomaly detection)
**Examples:**
- **PostHog AI** summarizes session replays and their event streams. Its "Replay Vision" scanner applies a saved prompt to every matching recording "forever", and a replay "signal" sends rage-click and friction reports to your inbox (PostHog [[15]]) [VENDOR: PostHog].
- **Microsoft Clarity's Copilot** offers chat, summaries of single and grouped sessions, and heatmap summaries that cover click and scroll data across all three device types (Clarity blog [[16]]) [VENDOR: Microsoft].
- **Simple Analytics** sells plain-English chat that produces charts and recommendations (Simple Analytics [[17]]) [VENDOR: Simple Analytics].
- **Amplitude** launched AI Agents in June 2025 and opened them as a beta to all customers alongside its MCP server in October 2025 (Amplitude IR [[18]]) [VENDOR: Amplitude].
- **Contentsquare's** Sense Analyst runs detection continuously across the merged Hotjar and Heap stack. A trade-press analysis notes its value "depends on specific and prioritized recommendations" (CX Today [[19]]).

**Real vs marketing.** One small piece of evidence: a PostHog GitHub issue shows that asking its in-app AI to "tell me if signups look unusual" produced only a threshold alert, or no alert. The MCP alert tool already supported anomaly detectors (PostHog issue #130832 [[20]]). The *outside* connector was ahead of the built-in assistant. That is a useful sign that the agent-in-your-editor path is not a second-class option.

### 5. Experimentation platforms with agent access
**Examples.** GrowthBook (MCP plus agent skills; version 5.2 added "Human in the Loop for agents"), Statsig (an MCP server for gates, experiments and metrics; Statsig [[21]]) and PostHog experiments through MCP (PostHog Claude Code docs [[22]]).

**How GrowthBook frames it.** Approval should not sit on every step or every API call. In the company's words, "autonomy is a risk decision, not a product setting" (GrowthBook [[2]]) [VENDOR: GrowthBook].

### 6. Autonomous AI-driven conversion optimization (generate variants, then let the tool route traffic)
**Examples.** Coframe generates page variants and adapts traffic allocation with bandit-style optimizers (Coframe [[23]]) [VENDOR: Coframe]. Unbounce's Smart Traffic sends each visitor to the variant predicted to convert best (Unbounce [[24]]) [VENDOR: Unbounce]. VWO Copilot builds campaigns from plain-language descriptions. VWO is reported at "$200+/mo" (SalesHive [[25]]).

**Fit.** These products are built for high-traffic sites (Coframe's showcase customers include Ramp and Replit). Their published case studies are vendor-authored.

### 7. A DIY "agent gateway" or scheduled digest
**Examples.** StackOne describes connecting Claude to marketing SaaS through an MCP gateway in "30 minutes or less" (StackOne [[26]]) [VENDOR: StackOne]. Indie Hackers posts describe a "feedback analyzer" agent that turns raw feedback into "a weekly signal" (Indie Hackers [[27]]).

---

## Existing Products (free and paid)

Prices and hosting below are from docs or third-party checks as cited. Fields marked "not verified" were not checked against the vendor's own pages in this research.

| Approach | Product | What it does | Free tier / entry price | EU hosting | Agent access | Evidence of real use |
|---|---|---|---|---|---|---|
| Connector on privacy analytics | **Umami** (your current tool) | Cookieless analytics | Self-host free. Cloud Hobby $0 for 100K events and 1 site (Umami FAQ [[28]], Cloudzy [[29]]) | Self-host anywhere | Community MCP only (mikusnuz [[9]]); direct SQL when self-hosted | Several GitHub servers; no case studies found |
| Connector | **Plausible** | Cookieless analytics | From €6/mo for 10K pageviews (third-party: european-alternatives [[30]]); others report $9 (Techjockey [[31]]). Not verified on Plausible's own pricing page | EU only (Hetzner) | MCP built by Sentry, Stats API, raw exports (docs [[5]]) | Listed in docs; no usage figures found |
| Connector | **Matomo** | Full analytics, CNIL-exemptable setup | Self-host free; Cloud price not verified | Cloud and self-host | Official MCP (included in Cloud, plugin for self-hosted) (FAQ [[6]]) | Official repo (GitHub [[32]]) |
| Connector | **Fathom** | Cookieless analytics | Not verified | Not verified | Community MCP (GitHub [[10]]) | Community only |
| Connector | **GA4** | — | Free | US (Google) | Official experimental local MCP (Count [[7]]) | Many guides |
| Built-in AI + connector | **PostHog** | Analytics, replay, experiments, AI summaries, anomaly alerts | 1M events/mo free; "more than 90%" of companies on free (PostHog pricing [[33]]) [VENDOR]; ~5K recordings free (Mean CEO [[34]]) | EU cloud (per your prior findings) | Official MCP with SQL, flags, experiments (docs [[22]]) | Widely used; the MindStudio guide builds a "$0 CRO stack" on it (MindStudio [[35]]) |
| Behavior AI | **Microsoft Clarity** | Recordings, heatmaps, Copilot summaries | Free (Clarity blog [[36]]) | US; needs consent (your prior finding) | Official MCP (MS Learn [[37]]) | Large free user base [UNVERIFIED: no figure found] |
| Behavior AI | **Contentsquare (formerly Hotjar)** | Recordings, surveys, Sense Analyst | Hotjar pricing now redirects to Contentsquare; reported median negotiated contract $20K/yr (Koji [[38]]) | Not verified | Not verified | Enterprise-oriented |
| Plain-language chat | **Simple Analytics AI** | Chat with your stats | Not verified | EU (Dutch company) — not verified in this research | Not verified | Vendor page only |
| Agent-first experimentation | **GrowthBook** | Flags, experiments, agent skills | Open source / self-host; cloud price not verified | Self-host possible | MCP, CLI, skills (GrowthBook [[39]]) | Vendor-reported case study (Cursor → GrowthBook → Slack) |
| Agent-first experimentation | **Statsig** | Experiments | Not verified | Not verified | Hosted MCP (Statsig [[40]]) | — |
| Enterprise AI agents | **Amplitude** | Dashboard and monitoring agents | Not verified | EU region exists [UNVERIFIED] | MCP since Oct 2025 (IR [[18]]) | Public company; the pattern transfers but the product is oversized for this site |
| Autonomous CRO | **Coframe** | AI-generated variants plus optimization | Not public / not verified | Not verified | Not verified | Vendor case studies (Ramp, Replit) |
| Autonomous CRO | **VWO Copilot** | AI-built tests | ~$200+/mo (SalesHive [[25]]) | Not verified | Not verified | Third-party reviews |
| Raw export | **Vercel Drains** | Streams Web Analytics events | Paid-plan feature [UNVERIFIED] | Destination is yours | Your own DB or SQL | InfoQ coverage (InfoQ [[41]]) |

---

## From Insight to Site Change

**Finding 1: the full loop is documented as a tutorial, but not as a measured case study.** MindStudio describes Claude Code building pages, pasting PostHog experiment snippets into control and test pages, and hosting on Vercel, with "the entire CRO stack" at $0 (MindStudio [[35]]). Its sister post claims 20% conversion (MindStudio [[4]]). The one concrete lift it mentions is "video testimonials dropped Google Ads cost-per-conversion from $200 to $30", which is an ad metric with no stated sample size.
- *For you:* this is the closest template to your stack. It is evidence that the loop can be built, not that it works.
- *Habit:* every change the agent proposes ships as a PR containing a hypothesis, a primary metric, a minimum run time and a stop rule.

**Finding 2: put judgment in skills, not in tools.** GrowthBook's argument is that "the endpoint is a verb. The skill is a playbook." The skill tells the agent when an experiment is warranted and what evidence to bring back for review (GrowthBook [[2]]).
- *For you:* Claude Code supports skills natively, so write a `/weekly-review` skill and a `/propose-test` skill in your repo.
- *Connects to:* the semantic layer finding (definitions are judgment too) and the "backlog of good questions" hypothesis.

**Finding 3: approval belongs at the points of real risk, not on every step.** GrowthBook says the goal is not "human approval on every step" (GrowthBook [[2]]).
- *For you:* let the agent query and draft freely. Require approval for merges to production, changes to pricing or legal copy, and starting or stopping a test.

**Finding 4: autonomous optimizers belong to high-traffic sites.** Coframe's and Unbounce's bandit-style routing only learns fast with volume. I found no small-site results for either.

---

## Privacy and Compliance

- **Consent-free counting.** Cookieless measurement is still the foundation. CNIL updated its consent-exemption guidance for audience measurement on 4 July 2025 and published a self-evaluation tool (PPC Land [[42]]). The exemption covers measurement used only for site performance and not linked back to individuals (Matomo FAQ [[43]]). CNIL also warns that "most large audience measurement offerings" do not qualify (CNIL [[44]]). Caveat: CNIL is France's regulator. The Polish authority (UODO) may read things differently, and I did not find a UODO position.
- **The LLM call is a separate data flow.** A prompt that contains an identifier counts as processing personal data, and the model provider is usually your processor (Anonde [[45]]). Pseudonymizing before anything is sent to the LLM is the standard pattern (Arub Hardwaj [[46]]).
  - *Practical consequence:* aggregated Umami counts (pageviews per path per day) carry close to zero personal-data risk. Raw session rows with IP-derived fields or URL query strings carry more.
  - *Habit:* give the agent SQL **views** with aggregates only, not base tables.
- **Session recordings are the risky part.** PostHog's Replay Vision and Clarity's summaries process recordings that may include form inputs. Clarity also stores data in the US and needs consent for EEA visitors (your prior finding). On a consented-only sample, recordings will be biased toward visitors who accept cookies [UNVERIFIED: no measured bias figure found].
- **Where opinions disagree.** Whether a consent-exempt analytics setup stays exempt once its data is piped into a US LLM is not settled in any source I found. That is an open question, not a known answer.

---

## What Fails

1. **Wrong numbers that look plausible.** Text-to-SQL scores 64.5% even with 2026 frontier models (dbt Labs [[1]]) [VENDOR]. One analytics vendor argues that hallucinations in e-commerce analytics are "almost always a data infrastructure problem" (Saras Analytics [[47]]) [VENDOR]. Count's GA4 guide explicitly says to "check the numbers Claude reports" (Count [[7]]).
   - *Guardrail:* have the agent print its SQL, and keep one known-answer query (for example, last month's signups compared with your email provider's count) as a weekly sanity check.
2. **Assistants that do less than you asked.** In the PostHog issue above, a request for anomaly detection silently became a threshold alert (PostHog #130832 [[20]]).
3. **Cost surprises.** The same issue notes that "every AI detector check uses the organization's AI credits." An AI alert on a busy schedule is not free.
4. **Small samples.** Classic A/B tests "run for months or just produce noise" at low volume (Customer Impact [[3]]).
5. **Generic recommendations.** CX Today's caution about Sense Analyst, that its value depends on specific, prioritized recommendations, applies to every auto-insight feature (CX Today [[19]]).
6. **Lock-in.** After the July 2025 merger, Hotjar's pricing page redirects to Contentsquare (Formbricks [[48]]). Small users of an acquired tool lose control over pricing.

**Thin evidence:** I found **no** documented case of an agent-shipped site change that measurably hurt conversion. Absence of evidence here is likely a reporting gap, not proof that it doesn't happen.

---

## Fit for a Small EU Marketing Site

**What is realistic at modest traffic:**
- Plain-language questions about counts.
- Weekly agent-written reviews.
- AI summaries of qualitative signals.
- Painted-door tests.
- Big swings tested sequentially (before/after with a written stop rule), not 50/50 splits.

Intelligems' solo-founder advice fits this well: pick ONE signal, explore it for 2–4 weeks "depending on your traffic", and favour tests that take under 30 minutes to set up and directly affect revenue (Intelligems [[49]]) [VENDOR: Intelligems].

**What only works at scale:** bandit-style autonomous conversion optimization (Coframe, Smart Traffic), continuous detection across a merged enterprise stack (Contentsquare), and warehouse-scale agents (Amplitude).

**Suggested setup at close to €0:**
1. Add a read-only Postgres role on Umami with aggregate views (sessions, events and conversions per landing page × language × day). Claude Code queries it through a Postgres MCP server or a CLI.
2. Add a `METRICS.md` (definitions, landing-page → positioning map, PL/EN split, what "signup" means) and a `QUESTIONS.md` backlog.
3. Write a `/weekly-review` skill. It produces a report that ends in at most two proposed changes, each with a hypothesis, metric and stop rule, and the human approves the PR.
4. For qualitative signals, use consent-free sources first: an exit or feedback widget, and email replies. Add PostHog EU replay only behind consent, accepting the sample bias.
5. Keep the Meta Pixel out of the agent's scope.

---

## Orphan Topics

### "MCP is the thin part"
GrowthBook's conclusion that the protocol layer should get *thinner* while the system behind it gets *deeper* (GrowthBook [[2]]) runs against the race to count MCP tools: compare the 66-tool Umami server with the "lean" ones. For a coding agent, a small CLI or SQL path plus good skills may beat a big tool catalog. *Connection:* this fits the semantic-layer evidence.

### A refusal is a feature
dbt's semantic layer scored 0% on questions requiring too many entity hops because it refused them rather than guessing (Medium review [[13]]). *Habit:* tell your agent explicitly to answer "not answerable from the defined metrics" instead of improvising.

### The agent watching recordings becomes a queryable event
PostHog's Replay Vision saves each observation as a `$recording_observed` event you can query (PostHog [[15]]) [VENDOR]. Qualitative observations turn into quantitative rows, which blurs the line between approaches 2 and 4. On a low-traffic site, "% of sessions where the visitor didn't understand the pricing" could become the main metric to track [speculation].

### Data journalism carries over to small-site analytics
Willison teaches coding agents for data analysis to journalists through explore, clean and query exercises (Simon Willison [[12]]). These are the same skills a solo founder needs, and his workshop material is more practical than most analytics-vendor content.

### Analytics vendors are adding LLM observability
PostHog's AI observability product traces LLM calls, costs and evaluations (PostHog [[50]]) [VENDOR]. If your "AI skills" product calls LLMs, the same tool could measure both funnel and product quality. This matters for later, not now.

### AI referral traffic is a new segment
Contentsquare's roadmap includes visibility into LLM-referred traffic and how AI-sent visitors convert (CX Today [[19]]). For a site selling AI skills, a "referrer = chatgpt/claude/perplexity" segment in Umami is cheap to set up and probably worth having [UNVERIFIED: no small-site data].

---

## Open Questions and Thin Evidence

- **No independent, measured solo-founder case study** of an agent → change → result loop turned up. Everything about results is either a vendor claim or a tutorial.
- **"The bottleneck is a backlog of good questions"** is supported only indirectly (GrowthBook's skills argument, CX Today's caution about recommendations). It is consensus-ish, not demonstrated.
- **"The agent's first useful job is the tracking plan"** is suggested only by PostHog's handbook, where the agent offers to add tracking events for a new flow (PostHog handbook [[51]]). There are no outcome data.
- The **accuracy of Umami community MCP servers** is unknown. They have no benchmarks, and their GitHub issues were not reviewed.
- **GDPR status of piping consent-exempt analytics into a US LLM:** no regulator guidance was found. Polish (UODO) guidance was not found.
- **Prices left unverified** in the table (Fathom, Matomo Cloud, Simple Analytics, Coframe, GrowthBook Cloud, Statsig, Amplitude) need checking against each vendor's own pricing page before you decide.
- Several sources carry 2026 dates and are recent. Fast-moving capabilities, such as PostHog's anomaly detectors and GrowthBook 5.2, should be rechecked against current docs.

---

## Sources

*The report's inline `[[n]]` markers index this list — not any numbered source inventory inside the report body. It lists each distinct link the provider returned or the report linked, cited or not; a marker numbered past its end had no source.*

1. [dbt Labs, 2026](https://docs.getdbt.com/blog/semantic-layer-vs-text-to-sql-2026)
2. [GrowthBook](https://www.growthbook.io/blog/why-growthbooks-mcp-server-is-just-the-interface)
3. [Customer Impact](https://www.customerimpact.be/en/blog/ab-testing-low-traffic/)
4. [MindStudio](https://www.mindstudio.ai/blog/how-to-build-20-percent-converting-lead-gen-site-claude-code-full-workflow)
5. [Plausible docs](https://plausible.io/docs/data-access)
6. [Matomo FAQ](https://matomo.org/faq/how-to/how-to-configure-the-matomo-mcp-server/)
7. [Count](https://count.co/ai/google-analytics-mcp)
8. [Macawls](https://github.com/Macawls/umami-mcp-server)
9. [mikusnuz](https://github.com/mikusnuz/umami-mcp)
10. [mackenly](https://github.com/mackenly/mcp-fathom-analytics)
11. [Vercel changelog](https://vercel.com/changelog/export-more-data-with-vercel-drains)
12. [Simon Willison](https://simonwillison.net/2026/Mar/16/coding-agents-for-data-analysis/)
13. [Kalin Gwu, Medium](https://medium.com/@kalingwu/text-to-sql-accuracy-semantic-layer-research-f39f62b952ba)
14. [dbt Roundup](https://roundup.getdbt.com/p/semantic-layer-as-the-data-interface)
15. [PostHog](https://posthog.com/learn/session-replay/pocket-guide/replay-vision)
16. [Clarity blog](https://clarity.microsoft.com/blog/the-quick-guide-to-microsoft-claritys-copilot/)
17. [Simple Analytics](https://www.simpleanalytics.com/ai)
18. [Amplitude IR](https://investors.amplitude.com/node/9986/pdf)
19. [CX Today](https://www.cxtoday.com/customer-analytics-intelligence/contentsquare-is-building-a-single-layer-for-ai-powered-customer-analytics/)
20. [PostHog issue #130832](https://github.com/PostHog/posthog/issues/130832)
21. [Statsig](https://www.statsig.com/mcp)
22. [PostHog Claude Code docs](https://posthog.com/docs/model-context-protocol/claude-code)
23. [Coframe](https://www.coframe.com/post/the-math-behind-coframes-optimizers)
24. [Unbounce](https://unbounce.com/marketing-ai/smart-traffic-experiments/)
25. [SalesHive](https://saleshive.com/vendors/vwo)
26. [StackOne](https://www.stackone.com/blog/ai-marketing-analytics-agent-claude/)
27. [Indie Hackers](https://www.indiehackers.com/post/the-first-5-ai-agents-every-indie-hacker-should-build-instead-of-hiring-d931d12c39)
28. [Umami FAQ](https://docs.umami.is/docs/cloud/faq)
29. [Cloudzy](https://cloudzy.com/blog/umami-review/)
30. [european-alternatives](https://european-alternatives.eu/product/plausible.io)
31. [Techjockey](https://www.techjockey.com/us/detail/plausible)
32. [GitHub](https://github.com/matomo-org/plugin-McpServer)
33. [PostHog pricing](https://posthog.com/product-analytics/pricing)
34. [Mean CEO](https://blog.mean.ceo/posthog-news-october-2026/)
35. [MindStudio](https://www.mindstudio.ai/blog/build-ab-test-landing-page-claude-code-free-posthog-vercel)
36. [Clarity blog](https://clarity.microsoft.com/blog/introducing-the-microsoft-clarity-mcp-server-a-smarter-way-to-fetch-analytics-with-ai/)
37. [MS Learn](https://learn.microsoft.com/en-us/clarity/third-party-integrations/clarity-mcp-server)
38. [Koji](https://www.koji.so/blog/hotjar-pricing-2026)
39. [GrowthBook](https://www.growthbook.io/insights/automate-experiment-lifecycle-growthbook-mcp)
40. [Statsig](https://www.statsig.com/updates/update/mcpserver)
41. [InfoQ](https://www.infoq.com/news/2025/10/vercel-drains-observability/)
42. [PPC Land](https://ppc.land/french-data-regulator-updates-cookie-exemption-rules-for-websites/)
43. [Matomo FAQ](https://matomo.org/faq/general/cnil-compliance-for-ecommerce-tracking/)
44. [CNIL](https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications)
45. [Anonde](https://anonde.io/blog/gdpr-llms/)
46. [Arub Hardwaj](https://arubhardwaj.eu/it/blog/gdpr-llms-practical-guide)
47. [Saras Analytics](https://www.sarasanalytics.com/blog/why-your-llm-keeps-getting-ecommerce-data-wrong)
48. [Formbricks](https://formbricks.com/blog/hotjar-pricing)
49. [Intelligems](https://www.intelligems.io/resources/blog/how-should-a-solo-founder-approach-a-b-testing)
50. [PostHog](https://posthog.com/ai-observability)
51. [PostHog handbook](https://posthog.com/handbook/engineering/ai/products)