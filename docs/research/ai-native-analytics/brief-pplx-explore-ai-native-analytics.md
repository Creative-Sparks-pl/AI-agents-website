# Research - How People Solve Website Analytics in the AI-Agent Era (Exploratory)

## Research Persona

You are a senior web analytics and conversion-optimization practitioner who has set up analytics for dozens of small businesses and has spent the last two years wiring LLM agents into analytics workflows. You think in decision loops — data → insight → site change → measured result — and you are skeptical of any "AI insight" that does not end in a concrete change someone can ship and measure.

## Main Prompt

Explore broadly how website owners — especially solo founders and small teams — are handling analytics now that AI agents can read the data themselves. The pattern we care about: the human no longer reads dashboards; an AI agent reads the analytics, explains what is happening, and proposes (or tests) improvements to the site. Map the **approaches and practices** people use, and the **ready-made products** — popular and new, free and paid — that already deliver this.

## Scope

- Time period: 2024–2026; prioritize 2025–2026 practice.
- Geography: global, English-language sources; the EU / GDPR angle matters.
- Domain: marketing and landing-page sites and small SaaS; product-analytics practice where it transfers.
- Exclude: enterprise BI copilots (Tableau, Power BI, Looker) unless the pattern transfers to small sites; ad-platform attribution; mobile-app-only analytics; GA4 setup tutorials.

## Depth

Minimum 3,000 words. Minimum 15 sources. Map-style findings with connection highlights between themes.

## Citations

Every factual claim must have a source. Mark unsourced claims [UNVERIFIED]. Label vendor-sourced claims [VENDOR: company name]. Source priorities: practitioner write-ups and case studies describing a real setup and its results first; official documentation (with its date) for any claim about what a tool can do; vendor marketing last.

## Quality Guardrails

Present multiple perspectives. Quantify over adjective. Flag thin evidence. Distinguish fact from consensus from speculation. Highlight connections between findings across themes.

## Anti-hallucination

If you lack reliable information on a point, say so explicitly rather than generating plausible-sounding content. Do not invent source names, URLs, or tool features. Capabilities of fast-moving tools must cite documentation or a dated first-hand report.

## Context

### What we already know

- The site: a bilingual (Polish / English) marketing site built with Astro and hosted on Vercel, selling AI skills. Goals: free-skill email signups and paid purchases, compared across several landing pages that test different positioning. Traffic may be too low for statistically significant A/B tests.
- Current tracking: self-hosted Umami (cookieless, EU database) for pageviews and a few click events; Meta Pixel plus Conversions API behind Cookiebot consent, used for ad attribution only.
- The owner works daily in Claude Code — an AI coding agent with MCP support — inside the site's repository, so the agent can already edit the site.
- Constraints: EU data residency and GDPR; running cost near zero; the agent proposes and the human approves.
- Already found: PostHog has an official MCP server (SQL queries, insights, feature flags, experiments), an EU cloud and a cookieless mode; community-built Umami MCP servers exist with basic stats; Microsoft Clarity has an official MCP server for recordings and behavior data, stores data in the US and needs consent for EEA visitors.

### What we're hunting for

Surprises and patterns we would not find by comparing tools. For example:
- "The setups that worked skipped the analytics tool's connector and gave the agent raw events in a SQL database instead."
- "The bottleneck is not data access but a backlog of good questions — agents without one produce generic advice."
- "Low-traffic sites can't get significant A/B results, so practitioners lean on AI-summarized session recordings or user feedback instead."
- "The first useful thing an agent did was write the tracking plan, not analyze anything."
- Patterns from adjacent fields — data engineering's semantic layers for LLMs, observability and on-call agents, CRO agencies — that transfer to a small site.

## Research directions

Beyond the prescribed subtopics, mine sources for unique framings, idiosyncratic frameworks, contrarian asides, evolution of views over time, and cross-domain transfers. Surface findings outside the prescribed list visibly — not buried in an Orphan Topics catch-all.

### 1. How agents get at the data
- Connectors (MCP servers) on analytics tools vs raw events exported to a database or warehouse the agent queries with SQL vs API scripts vs scheduled exports.
- Semantic layers or written metric definitions that keep the agent's numbers correct; what practitioners report about agents getting numbers wrong.

### 2. What "AI-native analytics" means in practice
- Built-in AI analysts in analytics products and new agent-first entrants (2025–2026): which capabilities are real and used, which are marketing.
- Group by approach (ask-in-plain-language, auto-generated insights, anomaly detection, agent connectors), not by vendor.

### 3. From insight to site change
- Closed loops: the agent proposes a change, implements it in code, runs an experiment, reads the result.
- Real examples of AI-driven conversion optimization or autonomous experimentation; human-in-the-loop patterns and guardrails.

### 4. Understanding behavior, not only counts
- AI summaries of session recordings, heatmaps, rage clicks, surveys and on-site feedback.
- How this complements or replaces quantitative analytics, especially on low-traffic sites.

### 5. Cadence and workflow
- On-demand questions vs scheduled AI digests vs anomaly alerts vs weekly reviews.
- How solo founders and small teams actually run this day to day; prompts, playbooks and question lists people share.

### 6. Privacy and compliance in the agent era
- Cookieless analytics, EU hosting, consent, personal data in recordings, and sending analytics data to an LLM provider.

### 7. What fails
- Wrong numbers, overfitting to noise, small samples, generic recommendations, cost surprises, lock-in — with real cases.

### 8. Small site vs large company
- What is realistic for a small site with modest traffic, versus what only works at scale.

### 9. Ready-made products that already do this
- Free and paid products, popular and new, that already deliver "the AI reads the analytics and recommends site changes" — look well beyond the three already found.
- For each: which approach it represents, free tier and entry price, EU hosting and GDPR stance, whether an outside agent can reach its data (MCP server or API), and evidence of real use (adoption, reviews, case studies).

## Preferred sources

- Practitioner write-ups, indie-founder and growth-engineer blogs describing their own setup and results
- Conference talks, podcasts and long-form newsletters on analytics and experimentation (e.g. CXL, Lenny's Newsletter)
- Writers on LLMs querying data with SQL (e.g. Simon Willison) and on semantic layers (e.g. dbt Labs)
- GitHub repositories of analytics MCP servers and agent setups, with their issues and discussions
- Official documentation and engineering blogs of analytics vendors — labeled [VENDOR]

## Required Output Structure

- ## Executive Summary
- ## Map of Approaches
  - ### (one H3 per approach found: how it works, who uses it, examples, trade-offs)
- ## Existing Products (free and paid)
  - A table grouped by approach: product, what it does, free tier / entry price, EU hosting, agent access (MCP / API), evidence of real use
- ## From Insight to Site Change
- ## Privacy and Compliance
- ## What Fails
- ## Fit for a Small EU Marketing Site
- ## Orphan Topics — Required section. Surface findings outside the prescribed subtopics here, with their own H3 framings. Treat as a first-class section, not a salvage bin.
- ## Open Questions and Thin Evidence

## Output format

Narrative findings organized by theme. For each finding:
- The insight, with its source
- Why it matters for our case (a small EU marketing site run by one person with a coding agent)
- How it could translate into a setup or a habit
- Connections to other findings

Aim for 5–10 ideas that would NOT have come out of a tool comparison.

## Anti-goals

- Do NOT copy "top 10 analytics tools" listicles — every product in the table needs its price and EU stance checked against its own documentation
- Do NOT return GA4 or tag-manager setup tutorials
- Do NOT return generic "use data to make decisions" advice
- Do NOT return enterprise BI copilot material unless the pattern transfers to a small site
- Do NOT state tool capabilities without documentation or a first-hand report

## Suggested follow-ups

1. Of the approaches found, which have documented results from solo founders or small teams, and what exactly did they set up?
2. For the agent-queries-raw-SQL approach: which event schemas and metric definitions do practitioners give the agent, and how do they check its numbers?
3. What do practitioners do instead of A/B tests when traffic is too low for significance, and how do AI tools fit in?
4. Which privacy setups let an EU site give an AI agent analytics access without a consent banner, and where do lawyers and regulators disagree?
5. What failure stories exist of agent-driven site changes that hurt conversion, and what guardrails came out of them?

Save your report as: `brief-pplx-explore-ai-native-analytics.md`
