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
