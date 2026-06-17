---
name: search-first
description: 'Use this skill to use when starting implementation work and you should
  search existing tools, libraries, patterns, or documentation before writing custom
  code or inventing APIs. DO NOT USE FOR: questions unrelated to search-first creating
  projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# search-first

**UTILITY SKILL**

## When to use
- Starting a feature that likely has existing solutions
- Adding a dependency or integration
- Before writing a new utility, helper, or abstraction

## What to do
1. **Define the need**: state functionality, language/framework, and constraints
2. **Search in parallel**:
   - Repo: `rg` through modules and tests
   - Packages: npm/PyPI for relevant libraries
   - Tools: available MCP servers and skills
   - OSS: GitHub/web search for maintained implementations
3. **Evaluate**: score candidates on functionality, maintenance, docs, license, and deps
4. **Decide**: adopt, extend/wrap, compose, or build custom
5. **Implement**: install, configure, or write minimal informed code

## Critical rules
- Always check the repo first
- Check MCP servers and skills before adding deps
- Report skipped search channels honestly
- Prefer adopt/extend over custom code
- Avoid massive packages for one small feature

## Example
Need: dead link checker for markdown
Search: npm "markdown dead link checker"
Found: `textlint-rule-no-dead-link`
Action: adopt — install and configure
Result: zero custom code

## USE FOR

- Requests about search first.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to search-first.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
