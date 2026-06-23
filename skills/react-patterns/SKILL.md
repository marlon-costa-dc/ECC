---
name: react-patterns
description: Use when writing or reviewing React 18/19 function components, custom hooks, component trees, Server Components, Client Components, Suspense, forms, or data-fetching decisions.
origin: ECC
---

# React Patterns

## When to Activate

- Writing or modifying React components, hooks, or component trees.
- Reviewing JSX/TSX files or designing composition.
- Migrating class components or `useEffect`-heavy code.
- Choosing between local state, lifted state, Context, and external stores.
- Working with Server Components / Client Components.
- Implementing forms or data fetching with TanStack Query, SWR, or RSC.

## Core Principles

1. **Render is a pure function of props and state.** Derive during render; avoid `useEffect` for derived state.
2. **Side effects live outside render.** Effects, mutations, network calls, and subscriptions belong in event handlers or `useEffect`.
3. **Composition over inheritance.** Compose with `children`, render props, or component props.

## Hooks Discipline

See [rules/react/hooks.md](../../rules/react/hooks.md). Top-level only, never conditional; cleanup subscriptions; use functional updaters; memoize only when proven; extract custom hooks only when reused.

## State Location

- One component: `useState` inside it.
- Parent + few descendants: lift to nearest common ancestor.
- Distant branches, low-frequency reads: React Context.
- High-frequency shared updates: external store.
- Derived from server: TanStack Query, SWR, or RSC.

## Server / Client Boundaries

- Server -> Client: pass serializable props or `children`.
- Client -> Server: invoke Server Actions via `<form action={...}>` or event handlers.
- Never `import` a Server Component from a Client Component file.

## Suspense + Error Boundaries

- Place Suspense boundaries close to the data.
- Error boundaries catch render, lifecycle, and constructor errors — not event handlers or async code.

## Links

- Detailed recipes: [references/patterns-recipes.md](references/patterns-recipes.md)
- Related skills: [react-performance](../react-performance/SKILL.md), [react-testing](../react-testing/SKILL.md), [frontend-patterns](../frontend-patterns/SKILL.md)
- Rules: [rules/react/](../../rules/react/)
