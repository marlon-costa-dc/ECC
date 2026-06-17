---
name: skill-comply
description: Visualize whether skills, rules, and agent definitions are actually followed
  — auto-generates scenarios at 3 prompt strictness levels, runs agents, classifies
  behavioral sequences, and reports compliance rates with full tool call timelines
origin: ECC
tools: Read, Bash
---

# skill-comply: Automated Compliance Measurement

Measures whether coding agents actually follow skills, rules, or agent definitions by: 1. Auto-generating expected behavioral sequences (specs) from any .md file 2. Auto-generating scenarios with decreasing prompt strictness (supportive...

## When to Use

- User runs /skill-comply <path>
- User asks "is this rule actually being followed?"
- After adding new rules/skills, to verify agent compliance
- Periodically as part of quality maintenance

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
