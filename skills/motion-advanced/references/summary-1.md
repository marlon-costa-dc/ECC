# Motion Advanced

Complex, interactive, and physics-based animation patterns.
Requires `motion-foundations` to be set up first.
Use these when `motion-patterns` is not enough.

## When to Activate

- Building drag-to-dismiss sheets, swipe gestures, or reorderable lists
- Animating text word-by-word, character-by-character, or as a live counter
- Drawing SVG paths, morphing icons, or animating circular progress
- Writing a custom animation hook (`useScrollReveal`, magnetic button, cursor follower)
- Sequencing multi-step animations imperatively with `useAnimate`
- Building spinners, shimmer skeletons, pulse indicators, or loading button states

## Outputs

This skill produces:

- Drag interactions: draggable cards, drag-to-dismiss sheets, `Reorder.Group` lists
- Gesture hooks: swipe detection, long press, pinch outline
- Text animation components: word reveal, character typewriter, number counter
- SVG animation: path draw-on, icon morph, stroke progress ring
- Custom hooks: `useScrollReveal`, `useHoverScale`, `useNavigationDirection`, `useInViewOnce`
- Imperative sequences via `useAnimate` with interrupt-safe `async/await`
- Loader components: spinner, shimmer, pulse dot, progress bar, button loading state

## Principles

- Physics-based motion (`useSpring`, `springs.*`) always feels more natural than duration-based for direct manipulation.
- `useMotionValue` + `useTransform` computes derived values without triggering re-renders.
- `useAnimate` sequences are imperative and interrupt-safe — calling `animate()` mid-flight cancels the previous animation automatically.
- Motion values (`useMotionValue`, `useSpring`) are SSR-safe and do not cause hydration errors.

## Rules

1. **Drag interactions must be tested on touch devices**, not just mouse. `drag` prop works on both but feel and threshold differ.
2. **Infinite animations must pause when `document.visibilityState === "hidden"`.** Background tabs must not consume GPU/CPU.
3. **Swipe threshold must be explicit.** Never infer intent from velocity alone; combine `offset` + `velocity` checks.
4. **`useAnimate` scope ref must be attached to a mounted DOM element.** Calling `animate()` before mount throws silently.
5. **Motion values must not be recreated on render.** `useMotionValue(0)` inside a component body is correct; `new MotionValue(0)` in a render is not.
6. **All token values are imported from `motion-foundations`.** No inline numbers.
7. **Custom hooks must handle cleanup.** Every `window.addEventListener` needs a matching `removeEventListener` in the `useEffect` return.
8. **SVG morphing requires equal path command counts.** Paths with different command structures snap instead of interpolating.

## Decision Guidance

### Choosing the right advanced API

| Scenario | API |
| ------------------------------ | -------------------------------- |
| Drag with physics on release | `drag` + `dragTransition: springs.release` |
| Ordered drag-to-reorder list | `Reorder.Group` + `Reorder.Item` |
| Dismiss on drag offset | `drag="y"` + `onDragEnd` offset check |
| Swipe left/right | `drag="x"` + `onDragEnd` offset check |
| Long press | `useLongPress` hook |
| Value smoothed over time | `useSpring` |
| Value derived from another | `useTransform` |
| Multi-step sequence | `useAnimate` with `async/await` |
| One-shot imperative animation | `animate()` from `motion` |
| Text entering word by word | Stagger on `inline-block` spans |
| SVG drawing on | `pathLength` 0 → 1 |
| SVG morph | `d` attribute tween (equal commands) |
| Circular progress | `strokeDashoffset` tween |

### When to use `useSpring` vs a spring transition

| | `useSpring` | `transition: springs.*` |
| -------------- | ---------------------------------------- | ----------------------- |
| Use for | Cursor follower, pointer-tracked values | Discrete state changes |
| Updates | Continuous, on every frame | Triggered by state change |

> Continued in [`summary-2.md`](summary-2.md)
