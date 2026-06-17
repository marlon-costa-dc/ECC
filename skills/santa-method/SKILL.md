---
name: santa-method
description: Multi-agent adversarial verification with convergence loop. Two independent
  review agents must both pass before output ships.
origin: Ronald Skelton - Founder, RapportScore.ai
---

# Santa Method

Multi-agent adversarial verification framework. Make a list, check it twice. If it's naughty, fix it until it's nice.

## When to Use

- Output will be published, deployed, or consumed by end users
- Compliance, regulatory, or brand constraints must be enforced
- Code ships to production without human review
- Content accuracy matters (technical docs, educational material, customer-facing copy)
- Batch generation at scale where spot-checking misses systemic patterns
- Hallucination risk is elevated (claims, statistics, API references, legal language)

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
