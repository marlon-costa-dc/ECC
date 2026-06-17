---
name: gan-style-harness
description: Use when building high-quality applications autonomously through a GAN-style generator-evaluator loop, especially for frontend design, full-stack projects, or any task where "AI slop" aesthetics are unacceptable and higher cost is justified.
origin: ECC-community
tools: Read, Write, Edit, Bash, Grep, Glob, Task
---

# GAN-Style Harness

A multi-agent harness that separates generation from evaluation, creating an adversarial feedback loop that drives quality beyond what a single agent can achieve. Inspired by [Anthropic's harness design paper](https://www.anthropic.com/engineering/harness-design-long-running-apps).

## When to Use

- Building complete applications from a brief prompt.
- Frontend design tasks requiring high visual quality.
- Full-stack projects that need working features, not just code.
- Any task where "AI slop" aesthetics are unacceptable.

## When NOT to Use

- Quick single-file fixes.
- Tight budget constraints.
- Simple refactoring or already well-specified tasks with tests.

## The Three Agents

1. **Planner** — expands a brief prompt into a full product spec with user stories, technical requirements, and evaluation criteria.
2. **Generator** — implements features across the stack and manages git between iterations.
3. **Evaluator** — tests the live running app with Playwright, scores against criteria, and returns structured feedback.

## Usage

```bash
# Full three-agent harness
/project:gan-build "Build a project management app with Kanban boards and dark mode"

# Frontend design mode (no planner)
/project:gan-design "Create a landing page for a crypto portfolio tracker"

# Shell script
GAN_MAX_ITERATIONS=10 GAN_PASS_THRESHOLD=7.5 ./scripts/gan-harness.sh "..."
```

## References

- Full architecture, rubric, configuration, anti-patterns, and results: [references/gan-style-reference.md](references/gan-style-reference.md)
- Anthropic paper: https://www.anthropic.com/engineering/harness-design-long-running-apps
