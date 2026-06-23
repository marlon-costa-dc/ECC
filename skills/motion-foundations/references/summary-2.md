| Skipping `useReducedMotion` check | Rule 3 | Use `useSafeMotion` hook |
| `animate={{ width: "100%" }}` | Rule 4 | Use `scaleX` transform instead |
| `transition={{ duration: 0.4 }}` inline | Rule 5 | Use `motionTokens.duration.normal` |
| `{ stiffness: 300, damping: 30 }` inline | Rule 6 | Use `springs.snappy` |
| Missing `"use client"` directive | Rule 7 | Add to top of file |
| `navigator.hardwareConcurrency` at module level | Rule 8 | Wrap in `typeof navigator !== "undefined"` |

## Related Skills

- **`motion-patterns`** — consumes tokens and springs defined here to build button, modal, stagger, page transition, and scroll patterns. Does not redefine any values.
- **`motion-advanced`** — consumes tokens and springs defined here for drag, SVG, text, and gesture patterns. Adds `useAnimate` sequences and custom hooks on top of this foundation.
