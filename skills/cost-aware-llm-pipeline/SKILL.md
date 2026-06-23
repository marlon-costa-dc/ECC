---
name: cost-aware-llm-pipeline
description: Cost optimization patterns for LLM API usage — model routing by task
  complexity, budget tracking, retry logic, and prompt caching.
origin: ECC
---

# Cost-Aware LLM Pipeline

Patterns for controlling LLM API costs while maintaining quality. Combines model routing, budget tracking, retry logic, and prompt caching into a composable pipeline.

## When to Use

- Building applications that call LLM APIs (Claude, GPT, etc.)
- Processing batches of items with varying complexity
- Need to stay within a budget for API spend
- Optimizing cost without sacrificing quality on complex tasks

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
