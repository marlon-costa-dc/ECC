---
name: e2e-testing
description: 'Use this skill to use when writing, configuring, or debugging Playwright
  end-to-end tests, Page Object Models, CI/CD integration, artifacts, flaky-test strategies,
  and cross-browser coverage. DO NOT USE FOR: questions unrelated to e2e-testing creating
  projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# e2e-testing

**UTILITY SKILL**

## USE FOR

- Requests about e2e testing.
- Workflows described in this skill.
- Operator tasks within this scope.


## DO NOT USE FOR

- questions unrelated to e2e-testing.
- creating projects or architecture from scratch.


## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.


## Critical rules

- Never use `waitForTimeout()` for synchronization; wait for responses, load states, or visible locators.
- Keep tests independent; use `beforeEach` for setup, not shared mutable state.
- Avoid production for financial or destructive flows; gate with `test.skip(process.env.NODE_ENV === 'production')`.


## Example

**Input:** a request.
**Output:** a concise response.


## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
