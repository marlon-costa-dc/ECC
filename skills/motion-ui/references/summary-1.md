* Shared element transitions → `layoutId` (must be unique per mounted instance)
* Enter / exit transitions → `AnimatePresence` (see `mode` guidance below)

#### AnimatePresence `mode`

Always specify `mode` explicitly — the default (`"sync"`) runs enter and exit simultaneously, which causes visual overlap in most UI patterns.

| `mode` | When to use |
|---|---|
| `"wait"` | Exit completes before enter starts. Use for **modals, toasts, page transitions**. |
| `"sync"` (default) | Enter and exit overlap. Use only when overlap is intentional (e.g., crossfade carousels). |
| `"popLayout"` | Exiting element is popped out of flow immediately; remaining items animate to fill. Use for **lists, tabs, dismissible cards**. |

```tsx
// Modal — always use "wait"
<AnimatePresence mode="wait">
  {open && <Modal key="modal" />}
</AnimatePresence>

// Dismissible list item — use "popLayout"
<AnimatePresence mode="popLayout">
  {items.map(item => <Card key={item.id} />)}
</AnimatePresence>
```

---

### Advanced Patterns (Concepts)

* Parallax (scroll-linked transforms)
* Scroll storytelling (sticky sections)
* 3D tilt (pointer-based transforms)
* Crossfade (shared `layoutId`)
* Progressive reveal (clip-path)
* Skeleton loading (looped opacity)
* Micro-interactions (hover/tap feedback)
* Spring system (physics-based motion)

---

### Modal Essentials

* Focus trap
* Escape close
* Scroll lock
* ARIA roles
* Use `AnimatePresence mode="wait"` so exit animation completes before the next modal enters

#### Full Example

```tsx
import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

function useFocusTrap(ref: React.RefObject<HTMLDivElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return
    const el = ref.current
    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]

function handleKey(e: KeyboardEvent) {
      if (e.key !== "Tab") return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }

el.addEventListener("keydown", handleKey)
    first?.focus()
    return () => el.removeEventListener("keydown", handleKey)
  }, [active, ref])
}

function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [active])
}

function Modal({ open, closeModal }: { open: boolean; closeModal: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

useFocusTrap(ref, open)
  useScrollLock(open)

useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal()
    }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, closeModal])

return (
    // mode="wait" ensures exit animation finishes before any new modal enters
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center bg-black/40"
        >
          <motion.div

> Continued in [`summary-2.md`](summary-2.md)
