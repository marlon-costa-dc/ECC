| Interrupt | Smooth — physics picks up from velocity | Restarts from current value |

## Core Concepts

### useMotionValue + useTransform

Reactive computation without re-renders:

[See code example 1 in `code-examples.md`]

### useAnimate

Returns `[scope, animate]`. The scope ref must be attached to a DOM element.
`animate()` calls are interrupt-safe — calling mid-flight cancels the previous run.

[See code example 2 in `code-examples.md`]

## Code Examples

### Draggable card

```tsx
"use client"
import { motion } from "motion/react"
import { springs, motionTokens } from "@/lib/motion-tokens"

---

For additional details, continue reading `summary-1.md`, `summary-2.md`, `summary-3.md`.
