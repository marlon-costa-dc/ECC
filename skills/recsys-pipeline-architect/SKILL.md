---
name: recsys-pipeline-architect
description: Design composable recommendation, ranking, and feed pipelines using the
  six-stage Source→Hydrator→Filter→Scorer→Selector→SideEffect framework popularized
  by xAI's open-sourced For You algorithm. Use this skill whenever the user is building
  any system that...
origin: community
---

# recsys-pipeline-architect

A spec-and-scaffold skill for building composable recommendation, ranking, and feed pipelines. It encodes the **six-stage pattern** — Source → Hydrator → Filter → Scorer → Selector → SideEffect — popularized by xAI's open-sourced [For...

## When to Use

- User wants to build any system that picks "the top K items for a user/context"
- User asks "how should I rank X" or describes a feed/personalization problem
- User has a scoring function and needs the pipeline plumbing around it
- User wants to migrate from a single relevance score to multi-action prediction with tunable weights
- User is wrapping an LLM/ML scorer and needs filters, hydrators, side-effects, and a runnable scaffold in their stack (TypeScript / Go / Python)
- Triggers: "recommendation system", "feed algorithm", "ranking pipeline", "for you feed", "candidate pipeline", "content recommender", "pipeline architecture for recsys", "RAG retrieval reranker"

## Workflow

1. **Clarify the use case** (one round, three questions): items being ranked? input context? language/runtime?
2. **Identify the candidate sources**: usually in-network (followed/owned/subscribed) + out-of-network (ML retrieval / trending / similar-to-liked)
3. **List required hydrations**: for each filter and scorer, what data does it need that the source did not provide?
4. **List the filters**: duplicate, self, age, block/mute, previously-served, eligibility. Order matters — cheap before expensive.
5. **Design the scorer chain**: primary (ML) → combiner (multi-action with weights) → diversity → business rules
6. **Selector**: sort descending by final score, take top K (or stratified mix for in-network/out-of-network)

For full details, examples, edge cases, and reference material, read `references/summary.md`.
