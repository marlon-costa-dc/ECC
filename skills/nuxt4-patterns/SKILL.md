---
name: nuxt4-patterns
description: Use when building or debugging Nuxt 4 applications with SSR, hybrid rendering, hydration mismatches, route rules, lazy loading, or page-level data fetching via useFetch and useAsyncData.
---

# Nuxt 4 Patterns

Use this skill for Nuxt 4 SSR/hybrid apps, hydration issues, route rules, lazy loading, and data fetching.

## Triggers

- Hydration mismatches between server and client markup
- Route-level rendering: prerender, SWR, ISR, `ssr: false`
- Performance work: lazy components, lazy hydration, payload size
- Page/component data fetching with `useFetch`, `useAsyncData`, or `$fetch`
- Routing, middleware, or SSR/client differences

## Rules

- **Hydration safety.** Keep the first render deterministic; avoid `Date.now()`, `Math.random()`, browser-only APIs, and storage reads in SSR state. Move browser-only logic behind `onMounted()`, `import.meta.client`, `ClientOnly`, or `.client.vue`. Use Nuxt's `useRoute()` and reserve `ssr: false` for truly browser-only areas.
- **Data fetching.** Prefer `await useFetch()` for SSR-safe reads. Use `useAsyncData()` for custom fetchers. Use `$fetch()` for writes or client-only actions. Use `lazy: true` for non-blocking data; use `server: false` only for non-SEO data. Example: `useAsyncData(() => $fetch('/api/articles/' + slug))` and `useFetch('/api/comments', { lazy: true, server: false })`.
- **Route rules.** Use `routeRules` in `nuxt.config.ts` for `prerender`, `swr`, `isr`, `ssr: false`, `cache`, and `redirect` per route group.
- **Lazy loading.** Use the `Lazy` prefix plus `v-if` for non-critical components, lazy-hydrate below-the-fold UI, and use `NuxtLink` for prefetching.

## Checklist

- SSR and hydrated client markup match.
- Page data uses `useFetch` or `useAsyncData`, not top-level `$fetch`.
- Non-critical data is lazy with explicit pending UI.
- Route rules match SEO/freshness needs.
- Heavy interactive islands are lazy-loaded or lazily hydrated.
