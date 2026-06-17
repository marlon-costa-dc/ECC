---
name: eval-harness
description: 'Use this skill to use when defining, running, or reporting Claude Code
  evals with pass@k metrics, task variants, and reproducible evaluation criteria as
  part of eval-driven development. DO NOT USE FOR: questions unrelated to eval-harness
  creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---
# eval-harness

**UTILITY SKILL**

## USE FOR

- Requests about eval harness.
- Workflows described in this skill.
- Operator tasks within this scope.


## DO NOT USE FOR

- questions unrelated to eval-harness.
- creating projects or architecture from scratch.


## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.


## Critical rules

- Define expected behavior before implementation; never retrofit evals to match output.
- Prefer deterministic code-based graders over model-based or human graders.
- Version eval definitions with the code they validate.


## Example

**Input:** a request.
**Output:** a concise response.


## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
