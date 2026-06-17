---
name: exa-search
description: Use when the user needs neural web search, code examples, company intelligence, people lookup, or AI-powered deep research using the Exa MCP server instead of generic search.
origin: ECC
---

# Exa Search

> **Drift-prone skill.** Confirm the configured Exa MCP tool surface, parameters, and account limits before relying on a specific search mode, category, or livecrawl behavior.

Neural search for web content, code, companies, and people via the Exa MCP server.

## When to Activate

- User needs current web information, news, or facts.
- Searching for code examples, API docs, or technical references.
- Researching companies, competitors, market players, or professional profiles.
- User says "search for", "look up", "find", or "what's the latest on".

## MCP Requirement

Configure the Exa MCP server (e.g., `exa-mcp-server`) with a valid `EXA_API_KEY`. This repo documents `web_search_exa` and `get_code_context_exa`; verify exact tool names if your server exposes more.

## Core Tools

- **`web_search_exa`** — General web search. Parameters: `query`, `numResults` (default 8), `type` (default `auto`), `livecrawl` (default `fallback`), `category` (optional, e.g. `company`).
- **`get_code_context_exa`** — Code and docs from GitHub, Stack Overflow, and docs sites. Parameters: `query`, `tokensNum` (default 5000, range 1000-50000).

## Usage Patterns

- **Quick lookup:** `web_search_exa(query: "Node.js 22 new features", numResults: 3)`
- **Code research:** `get_code_context_exa(query: "Rust error handling patterns", tokensNum: 3000)`
- **Company/people:** `web_search_exa(query: "Vercel funding 2026", category: "company")`
- **Technical deep dive:** Combine `web_search_exa` with `get_code_context_exa`.

Use operators (`site:`, quoted phrases, `intitle:`) to narrow results. Lower `tokensNum` for focused snippets; raise it for comprehensive context.

## Related Skills

- `deep-research`
- `market-research`
