---
name: exa-search
description: Use when performing neural web, code, company, or people search via the Exa MCP and synthesizing findings with source attribution and decision-ready summaries.
---

# exa-search

## When to use
- Current web info, news, or facts
- Code examples, API docs, or technical references
- Company or competitor research
- People lookup in a domain

## What to do
1. Ensure the Exa MCP server is configured (`exa-web-search` in `~/.claude.json`).
2. Pick the right tool for the job.
3. Refine with filters/domain/date when results are too broad.
4. Use `crawling_exa` to extract full content from specific URLs.
5. For deep synthesis, start `deep_researcher_start`, then poll `deep_researcher_check`.

## Core tools
- `web_search_exa(query, numResults)` — general web search.
- `web_search_advanced_exa(query, numResults, includeDomains, excludeDomains, startPublishedDate, endPublishedDate)` — filtered search.
- `get_code_context_exa(query, tokensNum)` — code examples and docs.
- `company_research_exa(companyName, numResults)` — company intel.
- `people_search_exa(query, numResults)` — professional profiles.
- `crawling_exa(url, tokensNum)` — full page extraction.
- `deep_researcher_start(query)` / `deep_researcher_check(researchId)` — async deep research.

## Critical rules
- Use `web_search_exa` for broad queries; `web_search_advanced_exa` for domain/date filters.
- Keep `tokensNum` low (1000–2000) for focused snippets, high (5000+) for broad context.
- Combine `company_research_exa` + `web_search_advanced_exa` for thorough company analysis.
- Prefer `deep_researcher_start` only for topics needing AI synthesis.

## Example
```text
web_search_exa(query: "Node.js 22 new features", numResults: 3)
get_code_context_exa(query: "Rust error handling patterns Result type", tokensNum: 3000)
company_research_exa(companyName: "Vercel", numResults: 5)
```
