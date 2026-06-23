---
name: deep-research
description: Use when the user needs thorough, cited research on any topic and requires synthesis of multiple web sources with evidence and source attribution before making a decision or recommendation.
origin: ECC
---

# Deep Research

> **Drift-prone skill.** Verify current firecrawl/exa MCP tool names, quotas, and result shapes before promising coverage or quoting live source counts.

Produce cited research reports from multiple web sources using firecrawl and exa MCP tools.

## When to Activate

- User asks to research any topic in depth, do a competitive analysis, or evaluate a technology.
- Due diligence on companies, investors, or technologies.
- User says "research", "deep dive", "investigate", or "what's the current state of".

## MCP Requirements

Configure at least one of:
- **firecrawl** — `firecrawl_search`, `firecrawl_scrape`, `firecrawl_crawl`
- **exa** — `web_search_exa`, `web_search_advanced_exa`, `crawling_exa`

Both together give the best coverage.

## Workflow

1. **Understand the goal.** Ask 1-2 clarifying questions unless the user says "just research it".
2. **Plan.** Break the topic into 3-5 sub-questions.
3. **Search.** For each sub-question, run `firecrawl_search` or `web_search_exa` with 2-3 keyword variations. Aim for 15-30 sources; prioritize academic, official, and reputable news.
4. **Deep-read.** Fetch full content for 3-5 key sources with `firecrawl_scrape` or `crawling_exa`.
5. **Synthesize.** Write a report with an executive summary, themed sections with inline citations, key takeaways, a numbered source list, and methodology.
6. **Deliver.** Post short reports in chat; save long reports to a file and post the summary.

Parallelize sub-questions with subagents for broad topics.

## Quality Rules

1. Every claim needs a source; flag single-source claims as unverified.
2. Prefer sources from the last 12 months; acknowledge gaps explicitly.
3. Never hallucinate. If data is insufficient, say so.

## Examples

- "Research the current state of nuclear fusion energy"
- "Investigate the competitive landscape for AI code editors"
