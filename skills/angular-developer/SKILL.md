---
name: angular-developer
description: Use when creating, scaffolding, or debugging Angular projects, components, services, routes, forms, dependency injection, signals, SSR, accessibility, animations, styling, tests, or CLI tooling.
---

# Angular Developer

Use this skill when working in an Angular codebase or starting a new Angular project.

## Triggers

- Scaffold or modify components, services, directives, pipes, guards, or resolvers
- Implement signals, forms, DI, routing, lazy loading, guards, or resolvers
- Add ARIA patterns, animations, Tailwind/component styling
- Write tests or use Angular CLI / MCP server

## Project Defaults

- Use latest stable Angular unless a version is requested.
- Prefer Signal Forms for new code when supported.
- Run `ng build` after generating code and fix errors.

## `ng new` Rules

1. Explicit version: `npx @angular/cli@<version> new <name>`
2. No version and `ng version` works: `ng new <name>`
3. No version and `ng version` fails: `npx @angular/cli@latest new <name>`

## Reference Index

Detailed references are in [`references/`](references/). Key files:

- Forms: [signal-forms.md](references/signal-forms.md)
- ARIA: [angular-aria.md](references/angular-aria.md)
- Tooling: [cli.md](references/cli.md), [mcp.md](references/mcp.md)

## Anti-Patterns

- No `null`/`undefined` initial Signal Form values; use `''`, `0`, or `[]`.
- Access field state by calling the field: `form.field().valid()`.
- Do not set `min`, `max`, `value`, `disabled`, or `readonly` on `[formField]` inputs.
- Call `inject()` only inside an injection context.
- Use `computed()` for derived state, not `effect()`.
- In nested `@for`, use `let outerIdx = $index`; `$parent` does not exist.

## Related Skills

`tdd-workflow`, `security-review`, `frontend-patterns`
