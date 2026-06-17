---
name: tinystruct-patterns
description: Expert guidance for developing with the tinystruct Java framework. Use
  when working on the tinystruct codebase or any project built on tinystruct — including
  creating Application classes, @Action-mapped routes, unit tests, ActionRegistry,
  HTTP/CLI...
origin: ECC
---

# tinystruct Development Patterns

Architecture and implementation patterns for building modules with the **tinystruct** Java framework – a lightweight, high-performance framework that treats CLI and HTTP as equal citizens, requiring no `main()` method and minimal...

## When to Use

- Creating new Application modules by extending AbstractApplication.
- Defining routes and command-line actions using @Action.
- Handling per-request state via Context.
- Performing JSON serialization using the native Builder and Builders components.
- Working with database persistence via AbstractData POJOs.
- Generating POJOs from database tables using the generate command.

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
