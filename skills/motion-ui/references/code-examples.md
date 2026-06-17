# Code Examples

## Example 1

```bash
npm install motion
```

## Example 2

```bash
cat package.json | grep -E '"motion"|"framer-motion"'
```

## Example 3

```ts
// Correct (modern)
import { motion, AnimatePresence } from "motion/react"

// Correct (legacy)
import { motion, AnimatePresence } from "framer-motion"

// Never mix both in the same project
```

## Example 4

```ts
// motionTokens.ts
export const motionTokens = {
  duration: {
    fast: 0.18,
    normal: 0.35,
    slow: 0.6
  },
  // Use these as the `ease` value inside a `transition` object:
  // transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
  easing: {
    smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
    sharp:  [0.4,  0, 0.2, 1] as [number, number, number, number]
  },
  distance: {
    sm: 8,
    md: 16,
    lg: 24
  }
}
```

## Example 5

```tsx
import { motionTokens } from "@/lib/motionTokens"

<motion.div
  initial={{ opacity: 0, y: motionTokens.distance.md }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: motionTokens.duration.normal,
    ease: motionTokens.easing.smooth
  }}
/>
```

## Example 6

```ts
const isLowEnd =
  typeof navigator !== "undefined" && (
    // Low memory (Chrome/Android only; undefined elsewhere → treat as capable)
    (navigator.deviceMemory !== undefined && navigator.deviceMemory <= 2) ||
    // Few cores AND no memory API (covers Safari/Firefox on weak hardware)
    (navigator.deviceMemory === undefined && navigator.hardwareConcurrency <= 4)
  )

const duration = isLowEnd ? 0.2 : 0.4
```

## Example 7

```tsx
import { motion, useReducedMotion } from "motion/react"

export function FadeIn() {
  const reduce = useReducedMotion()

return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
    />
  )
}
```

## Example 8

```css
@media (prefers-reduced-motion: reduce) {
  .motion-safe-transition {
    transition: opacity 0.2s;
  }

.motion-reduce-transform {
    transform: none !important;
  }
}
```

## Example 9

```html
<div class="motion-safe:animate-fade motion-reduce:opacity-100"></div>
```
