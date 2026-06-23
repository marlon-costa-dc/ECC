---
name: motion-foundations
description: Motion tokens, spring presets, performance rules, device adaptation,
  accessibility enforcement, and SSR safety for React / Next.js using motion/react.
  Foundation layer — all other motion skills depend on this.
version: 1.0
category: frontend
author: jeff
---

# Motion Foundations

The base layer of the motion system. Defines every value, constraint, and rule that downstream skills (`motion-patterns`, `motion-advanced`) inherit. Load this skill before any animation work begins.

## When to Use

- Starting any animated component from scratch
- Setting up tokens, spring presets, or easing values
- Implementing prefers-reduced-motion support
- Debugging hydration mismatches from animation initial states
- Evaluating whether an animation should exist at all

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
