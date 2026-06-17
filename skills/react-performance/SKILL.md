---
name: react-performance
description: Use when writing, reviewing, or refactoring React 18/19 or Next.js code for performance, diagnosing slow loads, auditing bundle size, checking Core Web Vitals, or removing waterfalls.
origin: ECC
---

# React Performance

Performance patterns for React 18/19 and Next.js, adapted from [Vercel Labs `react-best-practices`](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices).

## When to Activate

- Writing or reviewing React/Next.js code for performance.
- Diagnosing slow page loads, interactions, or high CPU.
- Auditing bundle size or Lighthouse Core Web Vitals regressions.
- Removing waterfalls in Server Components or API routes.
- Reducing client-side re-renders.
- Optimizing long lists, animations, or hydration.

## Priority Rule Set

1. **Waterfalls** — check sync conditions before `await`; defer awaits; `Promise.all`; `<Suspense>` close to data.
2. **Bundle size** — direct imports over barrels; dynamic imports; defer third-party scripts.
3. **Server** — authenticate Server Actions; `React.cache`; cache cross-request data; no mutable module state.
4. **Client fetching** — SWR or TanStack Query; never `useEffect` + `fetch` for shared data.
5. **Re-renders** — derive during render; subscribe to derived booleans; hoist non-primitive defaults; split hooks.
6. **Rendering** — virtualize lists; `content-visibility: auto`; hoist static JSX; prefer `? :` over `&&`.
7. **JavaScript** — batch DOM changes; `Map`/`Set`; cache loop properties; combine `filter().map()`.
8. **Advanced** — do not add `useEffectEvent` values to deps; event-handler refs for stable callbacks.

## Links

- Detailed rules, examples, mapping: [references/performance-rules.md](references/performance-rules.md)
- Related skills: [react-patterns](../react-patterns/SKILL.md), [react-testing](../react-testing/SKILL.md), [frontend-patterns](../frontend-patterns/SKILL.md), [nextjs-turbopack](../nextjs-turbopack/SKILL.md)
- Rules: [rules/react/](../../rules/react/)
