---
name: bun-runtime
description: 'Use this skill to bun as runtime, package manager, bundler, and test
  runner. When to choose Bun vs Node, migration notes, and Vercel support. Bun is
  a fast all-in-one JavaScript runtime and toolkit: runtime, package manager, bundler,
  and test runner. DO NOT USE FOR: questions unrelated to bun-runtime creating projects
  or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# Bun Runtime

**UTILITY SKILL**

## When to Use

- **Prefer Bun** for: new JS/TS projects, scripts where install/run speed matters, Vercel deployments with Bun runtime, and when you want a single toolchain (run + install + test + build).
- **Prefer Node** for: maximum ecosystem compatibility, legacy tooling that assumes Node, or when a dependency has known Bun issues.

Use when: adopting Bun, migrating from Node, writing or debugging Bun scripts/tests, or configuring Bun on Vercel or other platforms.

## Examples

### Run and install


### Scripts and env


### Testing



### Runtime API


## Best Practices

- Commit the lockfile (`bun.lock` or `bun.lockb`) for reproducible installs.
- Prefer `bun run` for scripts. For TypeScript, Bun runs `.ts` natively.
- Keep dependencies up to date; Bun and the ecosystem evolve quickly.

## USE FOR

- Requests about bun runtime.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to bun-runtime.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Critical rules

- Prefer canonical sources.
- Require evidence before claiming success.

## Example

**Input:** a request.
**Output:** a concise response.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
