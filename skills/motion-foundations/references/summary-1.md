1. `prefers-reduced-motion: reduce` — disables all transforms, limits opacity transitions to ≤ 0.2s
2. Low-end device detection — reduces duration, removes non-essential animations
3. Design preference — everything else

Motion must degrade gracefully. It must never disappear abruptly in a way
that causes layout shift or confuses orientation.

```tsx
// hooks/use-reduced-motion.tsx
"use client"
import { useReducedMotion } from "motion/react"

export function useSafeMotion(fullY: number = 16) {
  const reduce = useReducedMotion()
  return {
    initial: { opacity: 0, y: reduce ? 0 : fullY },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: reduce ? 0 : -fullY },
  }
}
```

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  .motion-safe-transition  { transition: opacity 0.15s; }
  .motion-reduce-transform { transform: none !important; }
}
```

```html
<!-- Tailwind -->
<div class="motion-safe:animate-fade motion-reduce:opacity-100"></div>
```

### SSR / hydration safety

**Rule: `initial` must always match what the server renders.**

```tsx
// WRONG — server renders opacity:1 but initial says 0 → hydration mismatch
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />

// CORRECT — use AnimatePresence or defer to client mount
"use client"
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])

<motion.div
  initial={{ opacity: mounted ? 0 : 1 }}
  animate={{ opacity: 1 }}
/>
```

## Code Examples

### End-to-end: tokens + springs + accessibility + SSR guard

```tsx
// components/fade-in-card.tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { motionTokens, springs } from "@/lib/motion-tokens"
import { useSafeMotion } from "@/hooks/use-reduced-motion"
import { motionConfig } from "@/lib/motion-config"

interface FadeInCardProps {
  children: React.ReactNode
  delay?: number
}

export function FadeInCard({ children, delay = 0 }: FadeInCardProps) {
  // SSR guard — initial must match server output (opacity: 1)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

// Accessibility — disables transform when reduced motion is preferred
  const safeMotion = useSafeMotion(motionTokens.distance.md)

// Device gate — skip animation on low-end hardware
  if (!motionConfig.shouldAnimate() || !mounted) {
    return <div>{children}</div>
  }

return (
    <motion.div
      initial={safeMotion.initial}
      animate={safeMotion.animate}
      exit={safeMotion.exit}
      transition={{
        ...springs.gentle,
        delay,
      }}
      whileHover={{ scale: motionTokens.scale.pop }}
      whileTap={{ scale: motionTokens.scale.press }}
    >
      {children}
    </motion.div>
  )
}
```

## Constraints / Non-Goals

This skill does **not** cover:

- UI component patterns (button, modal, stagger) → see `motion-patterns`
- Drag, gestures, SVG, text animations, custom hooks → see `motion-advanced`
- CSS-only animations or Tailwind `animate-*` classes without `motion/react`
- Third-party animation libraries (GSAP, anime.js, etc.)
- Motion design decisions (when to animate, what to emphasize) — that is a design concern, not a code constraint

## Anti-Patterns

| Anti-pattern | Rule violated | Fix |
| --------------------------------------- | ------- | ------------------------------- |
| `import { motion } from "framer-motion"` | Rule 1 | Use `motion/react` |
| `initial={{ opacity: 0 }}` on SSR component | Rule 2 | Add mount guard |

> Continued in [`summary-2.md`](summary-2.md)
