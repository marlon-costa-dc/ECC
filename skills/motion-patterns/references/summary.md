# Motion Patterns

Copy-paste patterns for the most common UI animation needs.
Every pattern here is built on `motion-foundations` tokens and springs.
Do not define new duration or easing values here — import them.

## When to Activate

- Animating a button, card, modal, or toast notification
- Building list entrances with stagger
- Setting up page transitions in Next.js App Router
- Adding entrance or exit animations to conditional content
- Implementing scroll-reveal, scroll-linked progress, or sticky story sections
- Building expanding cards, accordions, or shared-element transitions

## Outputs

This skill produces:

- Accessible, SSR-safe animation for all standard UI components
- `AnimatePresence`-wrapped conditional renders with correct exit behavior
- Page transition wrapper component for Next.js App Router
- Scroll-reveal and scroll-linked patterns using `useScroll` + `useTransform`
- Layout animation patterns (`layout`, `layoutId`) for expanding and crossfading elements

## Principles

- Every pattern imports from `motion-foundations`. No raw numbers.
- Every conditional render is wrapped in `AnimatePresence` with a `key`.
- Exit animations are always defined alongside enter animations — never as an afterthought.
- `layout` is used only for small, isolated shifts. Large subtrees get explicit transforms.

## Rules

1. **Always wrap conditional renders in `AnimatePresence` with a `key`** on the direct child. Without a key, exit animations never fire.
2. **Always define `exit` when defining `initial` + `animate`.** An animation without an exit is incomplete.
3. **Use `mode="wait"` on page transitions.** Enter must not start until exit completes.
4. **Never use `layout` on subtrees with more than ~5 children or deeply nested DOM.** Use explicit `x`/`y` transforms instead.
5. **Stagger interval must stay between `0.05s` and `0.10s`.** Below feels mechanical; above feels sluggish.
6. **Modals must always include:** focus trap, Escape-key close, scroll lock, `role="dialog"`, `aria-modal="true"`.
7. **Scroll reveals use `viewport={{ once: true }}`.** Repeating on scroll-out is distracting, not informative.
8. **All token values are imported from `motion-foundations`.** No inline numbers.

## Decision Guidance

### Choosing the right pattern

| Situation | Pattern |
| ---------------------------------------- | ---------------------- |
| Element appears / disappears             | `AnimatePresence`      |
| List of items loading in sequence        | Stagger variants       |
| Navigating between routes                | Page transition wrapper|
| Element changes size in place            | `layout` prop          |
| Same element moves across page contexts  | `layoutId`             |
| Element enters when scrolled into view   | `whileInView`          |
| Value tied to scroll position            | `useScroll` + `useTransform` |

### When to use `mode="wait"` vs `mode="sync"`

| Mode | Use when |
| ------- | --------------------------------------- |
| `wait` | Page transitions, content swaps (one at a time) |
| `sync` | Stacked notifications, list items (overlap is fine) |
| `popLayout` | Items removed from a reflow list |

## Core Concepts

### AnimatePresence contract

Three things must always be true:

1. `AnimatePresence` wraps the conditional
2. The direct child has a `key`
3. The child has an `exit` prop

Miss any one of these and the exit animation silently fails.

### layout vs layoutId

- `layout` — animates the element's own size/position change in place
- `layoutId` — links two separate elements, crossfading between them across renders

Use `layout="position"` on text inside an expanding container to prevent text reflow from animating.

## Code Examples

### Button feedback

[See code example 1 in `code-examples.md`]

### Stagger list

[See code example 2 in `code-examples.md`]

### Modal

```tsx
"use client"
import { motion, AnimatePresence } from "motion/react"
import { motionTokens, springs } from "@/lib/motion-tokens"

// Wrap at the call site:
// <AnimatePresence>{isOpen && <Modal key="modal" />}</AnimatePresence>

---

For additional details, continue reading `summary-1.md`, `summary-2.md`.
