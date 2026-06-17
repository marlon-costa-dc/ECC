---
name: cost-tracking
description: Use when answering questions about Claude Code token usage, spending, budgets, cost breakdowns by project or date from a local SQLite cost-tracking database.
origin: community
---

# cost-tracking

## When to use
- User asks about spending, usage, tokens, budgets, or cost breakdowns.
- User wants cost comparison by project, tool, session, model, or date.
- User requests a CSV export of recent usage.

## What to do
1. Check prerequisites: `sqlite3` installed and `~/.claude-cost-tracker/usage.db` exists.
2. Query the `usage` table; prefer `cost_usd` over manual token pricing.
3. Report today vs yesterday, total spend, top projects/tools, and session averages.
4. For exports, use bounded `LIMIT` queries; avoid unbounded `SELECT *`.

## Critical rules
- Do not fabricate data if the database is missing; say cost tracking is not configured.
- Use `cost_usd` as the source of truth; do not hard-code model pricing.
- Do not recommend unreviewed hooks or plugins.

## Example
```bash
sqlite3 ~/.claude-cost-tracker/usage.db "
  SELECT
    'Today: $' || ROUND(COALESCE(SUM(CASE WHEN date(timestamp) = date('now') THEN cost_usd END), 0), 4) ||
    ' | Total: $' || ROUND(COALESCE(SUM(cost_usd), 0), 4) ||
    ' | Calls: ' || COUNT(*) ||
    ' | Sessions: ' || COUNT(DISTINCT session_id)
  FROM usage;
"
```
