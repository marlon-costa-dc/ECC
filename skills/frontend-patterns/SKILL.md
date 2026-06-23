---
name: frontend-patterns
description: Use when building or reviewing React or Next.js components, state management, data fetching, forms, routing, performance, or accessible responsive UI patterns in a project.
origin: ECC
---

# Frontend Development Patterns

Modern patterns for React, Next.js, and performant user interfaces.

## When to Activate

- Building or reviewing React components, composition, props, or rendering.
- Managing state with hooks, Context, Zustand, or Jotai.
- Implementing data fetching with SWR, TanStack Query, or Server Components.
- Optimizing performance with memoization, virtualization, or code splitting.
- Working with forms, validation, controlled inputs, or Zod schemas.
- Handling client-side routing and navigation.
- Building accessible, responsive UI patterns.

## Core Principles

1. **Composition over inheritance.** Build components from `children`, component props, and compound APIs.
2. **Render is a pure function of props and state.** Derive values during render; avoid `useEffect` for derived state.
3. **Lift state to the nearest common ancestor.** Use Context or external stores only when lifting becomes painful.
4. **Prefer semantic HTML.** Add ARIA only when HTML is insufficient.

## State Location

- One component: `useState` inside it.
- Parent + few descendants: lift to nearest common ancestor.
- Distant branches, low-frequency reads: React Context.
- High-frequency shared updates: external store (Zustand, Jotai, Redux Toolkit).
- Derived from server: TanStack Query, SWR, or RSC.

## Pattern Index

Composition, compound components, render props, custom hooks, context + reducer, `useMemo`/`useCallback`, `React.lazy` + `Suspense`, virtualization.

## Links

- Detailed recipes: [references/component-patterns.md](references/component-patterns.md)
- Related skills: [react-patterns](../react-patterns/SKILL.md), [react-performance](../react-performance/SKILL.md), [frontend-a11y](../frontend-a11y/SKILL.md)
