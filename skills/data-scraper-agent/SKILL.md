---
name: data-scraper-agent
description: Use when the user wants to build a fully automated AI-powered data collection
  agent that scrapes public sources on a schedule, enriches results with a free LLM,
  stores them in Notion, Sheets, or Supabase, and learns from user feedback, running
  free on...
origin: community
---

# Data Scraper Agent

Build a production-ready, AI-powered data collection agent for any public data source. Runs on a schedule, enriches results with a free LLM, stores to a database, and improves over time.

## When to Use

- User wants to scrape or monitor any public website or API
- User says "build a bot that checks...", "monitor X for me", "collect data from..."
- User wants to track jobs, prices, news, repos, sports scores, events, listings
- User asks how to automate data collection without paid hosting
- User wants an agent that learns from their decisions

## Workflow

1. **Understand the goal**: source, fields, storage, enrichment, frequency.
2. **Design architecture**: see [references/architecture.md](references/architecture.md).
3. **Build scraper source**: REST, HTML, RSS, pagination, JS-rendered patterns in [references/scraper-patterns.md](references/scraper-patterns.md).
4. **Build Gemini client**: fallback and JSON parsing in [references/ai-client.md](references/ai-client.md).
5. **Build AI pipeline**: batch scoring, summaries, filtering in [references/ai-pipeline.md](references/ai-pipeline.md).
6. **Add feedback learning**: positive/negative history in [references/feedback-memory.md](references/feedback-memory.md).

For full details, examples, edge cases, and reference material, read `references/summary.md`.
