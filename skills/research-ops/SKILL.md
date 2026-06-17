---
name: research-ops
description: Use this skill for evidence-first current-state research. Classify the ask, pick the lightest useful evidence path, and report sourced facts, inferences, and recommendations separately.
---

# Research Ops

**UTILITY SKILL**

Operator wrapper around the research stack. Tells you when and how to use `exa-search`, `deep-research`, `market-research`, or `lead-intelligence` together.

## USE FOR:

- "Research", "look up", "compare", "who should I talk to", "what's the latest".
- Answers that depend on current public information.
- Turning repeated lookups into monitored workflows.

## DO NOT USE FOR:

- Questions answerable from local code or docs alone.
- Unsourced speculation.

## INVOKES:

- `exa-search` for fast current-web discovery.
- `deep-research` for multi-source synthesis with citations.
- `market-research` for recommendations or ranked decisions.
- `lead-intelligence` for people/company targeting.
- `knowledge-ops` to store results in durable context.

## Workflow

1. **Start from user evidence** — normalize into facts, needs verification, open questions.
2. **Classify the ask** — factual / comparison / enrichment / monitoring candidate.
3. **Take the lightest path**:
   - `exa-search` for quick discovery.
   - `deep-research` for synthesis/multi-source.
   - `market-research` for recommendations.
   - `lead-intelligence` for target ranking.
4. **Report with evidence boundaries** — sourced facts, user context, inference, recommendation.
5. **Decide if it should become a monitor** — flag recurring questions.

## Output Format

```text
QUESTION TYPE
- factual / comparison / enrichment / monitoring

EVIDENCE
- sourced facts | user-provided context

INFERENCE
- what follows from the evidence

RECOMMENDATION
- answer or next move | monitor?
```

## Examples:

- "Compare these two tools" → classify → `market-research` + recommendation.
- "Who is the CEO of X?" → `exa-search` → sourced fact.

## Troubleshooting:

- Answer already in repo → use local search, not research.
- Conflicting sources → present both and score confidence.
- Freshness-sensitive answer → include concrete dates.
