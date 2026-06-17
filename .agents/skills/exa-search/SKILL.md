---
name: exa-search
description: 'Use this skill to use when performing neural web, code, company, or
  people search via the Exa MCP and synthesizing findings with source attribution
  and decision-ready summaries. DO NOT USE FOR: questions unrelated to exa-search
  creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# exa-search

**UTILITY SKILL**

## When to use
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

## Example
**Input:** a request.
**Output:** a concise response.

## USE FOR

- Requests about exa search.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to exa-search.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
