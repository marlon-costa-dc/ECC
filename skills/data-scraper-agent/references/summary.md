# Data Scraper Agent

Build a production-ready, AI-powered data collection agent for any public data source. Runs on a schedule, enriches results with a free LLM, stores to a database, and improves over time.

**Stack: Python · Gemini Flash · GitHub Actions · Notion / Sheets / Supabase**

## When to Activate

- User wants to scrape or monitor any public website or API
- User says "build a bot that checks...", "monitor X for me", "collect data from..."
- User wants to track jobs, prices, news, repos, sports scores, events, listings
- User asks how to automate data collection without paid hosting
- User wants an agent that learns from their decisions

## Core Concepts

Three layers: **COLLECT → ENRICH → STORE** (scraper, LLM, database).

Free stack: `requests`/`BeautifulSoup` for scraping, `playwright` for JS-rendered sites, Gemini Flash for AI, Notion/Sheets/Supabase for storage, GitHub Actions cron for scheduling, JSON feedback file for learning.

AI fallback chain: `gemini-2.0-flash-lite → gemini-2.0-flash → gemini-2.5-flash → gemini-flash-lite-latest`.

Batch API calls (e.g., 5 items per call) to stay inside free-tier rate limits.

## Workflow

1. **Understand the goal**: source, fields, storage, enrichment, frequency.
2. **Design architecture**: see [references/architecture.md](references/architecture.md).
3. **Build scraper source**: REST, HTML, RSS, pagination, JS-rendered patterns in [references/scraper-patterns.md](references/scraper-patterns.md).
4. **Build Gemini client**: fallback and JSON parsing in [references/ai-client.md](references/ai-client.md).
5. **Build AI pipeline**: batch scoring, summaries, filtering in [references/ai-pipeline.md](references/ai-pipeline.md).
6. **Add feedback learning**: positive/negative history in [references/feedback-memory.md](references/feedback-memory.md).
7. **Add storage layer**: deduplicate and push items in [references/storage.md](references/storage.md).
8. **Orchestrate**: wire scraper, AI, storage in `main.py` in [references/orchestration.md](references/orchestration.md).
9. **Schedule**: GitHub Actions cron workflow in [references/deployment.md](references/deployment.md).
10. **Configure**: `config.yaml`, `.env.example`, `requirements.txt` in [references/deployment.md](references/deployment.md).

## Anti-Patterns

- One LLM call per item; fix by batching
- Hardcoded keywords; fix with `config.yaml`
- No rate limit; fix with `time.sleep(1)`
- Secrets in code; fix with `.env` + GitHub Secrets
- No deduplication; fix by checking URL before push
- Ignoring `robots.txt`; respect crawl rules
- `maxOutputTokens` too low; use 2048+

## References

- [references/architecture.md](references/architecture.md) — project directory structure
- [references/scraper-patterns.md](references/scraper-patterns.md) — source templates and scraping patterns
- [references/ai-client.md](references/ai-client.md) — Gemini REST client with fallback
- [references/ai-pipeline.md](references/ai-pipeline.md) — batch AI analysis pipeline
- [references/feedback-memory.md](references/feedback-memory.md) — feedback learning
- [references/storage.md](references/storage.md) — Notion sync example
- [references/orchestration.md](references/orchestration.md) — `main.py` orchestrator
- [references/deployment.md](references/deployment.md) — GitHub Actions, config, requirements, checklist, examples
