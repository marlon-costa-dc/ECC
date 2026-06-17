---
name: security-review
description: 'Use this skill to review code and configs for security risks. Scan for
  secrets, validate input, check auth, and enforce secure patterns before merging
  sensitive changes. DO NOT USE FOR: questions unrelated to security-review creating
  projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# Security Review

**UTILITY SKILL**

## USE FOR

- Requests about security review.
- Workflows described in this skill.
- Operator tasks within this scope.


## DO NOT USE FOR

- questions unrelated to security-review.
- creating projects or architecture from scratch.


## Workflow

1. Scan for hardcoded secrets and credentials.
2. Validate all input with strict schemas (whitelist).
3. Use parameterized queries / ORMs; never concatenate SQL.


## Critical rules

- Prefer canonical sources.
- Require evidence before claiming success.


## Example

**Input:** a request.
**Output:** a concise response.


## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
