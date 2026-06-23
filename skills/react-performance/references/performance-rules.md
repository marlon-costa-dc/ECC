# React Performance Rules

Detailed rules and examples for the [react-performance](../SKILL.md) skill. Adapted from [Vercel Labs `react-best-practices`](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices).

## 1. Eliminating Waterfalls (CRITICAL)

Waterfalls are the #1 performance killer. Every sequential `await` adds full network latency.

- Check cheap sync conditions before `await`.
- Move `await` into the branch that uses it.
- Run independent work with `Promise.all`.
- Start promises early and await late.
- Push `<Suspense>` boundaries close to the data; reserve space to avoid layout shift.
- Split sibling awaits into child Server Components so React runs them in parallel.

```tsx
// INCORRECT
const user = await getUser(id);
const posts = await getPosts(id);
const followers = await getFollowers(id);

// CORRECT
const [user, posts, followers] = await Promise.all([
  getUser(id), getPosts(id), getFollowers(id),
]);

// CORRECT — start early, await late
const userP = getUser(id);
const postsP = getPosts(id);
const profile = await getProfile(id);
if (profile.private) return null;
const [user, posts] = await Promise.all([userP, postsP]);
```

## 2. Bundle Size Optimization (CRITICAL)

- Use direct imports instead of barrel `index.ts` files.
- Use statically analyzable dynamic import paths.
- Use `next/dynamic` for heavy components.
- Defer analytics, logging, and support scripts after hydration.
- Preload on hover/focus.

```tsx
// INCORRECT
import { Button, Card, Modal } from "@/components";

// CORRECT
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

// Dynamic import
import dynamic from "next/dynamic";
const HeavyChart = dynamic(() => import("./HeavyChart"), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

## 3. Server-Side Performance (HIGH)

- Authenticate and authorize inside every Server Action.
- Use `React.cache` for per-request deduplication.
- Cache cross-request data with an LRU or `unstable_cache`.
- Avoid duplicate serialization in RSC props by lifting Client Components and passing `children`.
- Hoist static I/O to module scope.
- Avoid mutable module-level state; use request-scoped storage.
- Minimize data passed to Client Components.
- Use `after()` for non-blocking work after the response is sent.

```tsx
import { cache } from "react";
export const getUser = cache(async (id: string) => db.user.findUnique({ where: { id } }));
```

## 4. Client-Side Data Fetching (MEDIUM-HIGH)

- Use SWR or TanStack Query for deduplication.
- Deduplicate global event listeners through a singleton hook/subject.
- Use passive listeners for scroll.
- Version `localStorage` schemas and keep payloads small.

## 5. Re-render Optimization (MEDIUM)

- Do not subscribe to state used only in callbacks; read from store in the handler.
- Extract expensive work into memoized components.
- Hoist default non-primitive props (`const EMPTY: Item[] = []`).
- Use primitive effect dependencies.
- Subscribe to derived booleans, not raw values.
- Derive during render, never via `useEffect`.
- Use functional `setState` for stable callbacks.
- Use lazy state initializer for expensive values.
- Avoid `useMemo` for simple primitives.
- Split hooks with independent dependencies.
- Move interaction logic into event handlers.
- Use `startTransition` for non-urgent updates.
- Use `useDeferredValue` for expensive renders.
- Use `useRef` for transient frequent values.
- Never define components inside components.

```tsx
// INCORRECT — new object identity every render
useEffect(() => {}, [{ id, name }]);

// CORRECT
useEffect(() => {}, [id, name]);

// INCORRECT — Inner is a new component on every Outer render
function Outer() {
  const Inner = () => <span />;
  return <Inner />;
}
```

## 6. Rendering Performance (MEDIUM)

- Animate the wrapper, not the SVG.
- Use `content-visibility: auto` for long lists.
- Hoist static JSX to module scope.
- Reduce SVG coordinate precision.
- Use inline scripts for values needed before hydration (theme, locale).
- Suppress expected hydration mismatches narrowly with `suppressHydrationWarning`.
- Use React 19 `<Activity>` for show/hide instead of mount/unmount.
- Use ternary over `&&` for conditional render to avoid rendering `0`.
- Pair `startTransition` with loading states.
- Use React DOM resource hints (`preload`, `preconnect`).
- Use `defer` or `async` on `<script>` tags appropriately.
- Virtualize long lists once visible items exceed ~50 non-trivial rows.

```css
.row { content-visibility: auto; contain-intrinsic-size: auto 80px; }
```

## 7. JavaScript Performance (LOW-MEDIUM)

- Batch DOM/CSS changes via class swap or `cssText`.
- Use `Map`/`Set` for membership and repeated lookups.
- Cache property access in loops (`const len = arr.length`).
- Memoize pure functions with a module-level `Map`.
- Cache `localStorage` reads.
- Combine `filter().map()` into one pass.
- Check array length before expensive comparisons.
- Early return from functions.
- Hoist `RegExp` out of loops.
- Use `O(n)` min/max instead of `sort()`.
- Use `toSorted()` when immutability matters.
- Use `requestIdleCallback` for non-critical work.

## 8. Advanced Patterns (LOW)

- Values from `useEffectEvent` are stable; do not add them to effect deps.
- For stable callbacks passed to memoized children, use an event-handler ref pattern.
- Guard module-level singletons with an app-load flag, not `useEffect`.
- Use `useLatest` for stable callback refs.

```tsx
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
```

## Automated Tools

- Next.js 13.5+ Optimize Package Imports.
- React Compiler (canary) for auto-memoization.
- Turbopack for faster builds and tree-shaking.
- `@next/bundle-analyzer` to visualize first-load JS.

When React Compiler ships, demote manual `rerender-*` rules to review-only.

## Lighthouse / Web Vitals Mapping

| Metric | Most Relevant Categories |
|---|---|
| LCP | Waterfalls, Bundle Size, Resource Hints |
| INP | Re-render, Rendering, JavaScript |
| CLS | Rendering (Suspense placement, image dimensions) |
| TBT | Bundle Size, JavaScript, Defer Third-Party |
