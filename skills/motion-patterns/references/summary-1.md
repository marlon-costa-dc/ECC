export function Modal({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/*Overlay*/}
      <motion.div
        className="fixed inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

{/*Panel — accessibility requirements: focus trap, Escape close,
          scroll lock, role="dialog", aria-modal="true"*/}
      <motion.div
        role="dialog"
        aria-modal="true"
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 rounded-xl bg-white p-6"
        initial={{
          opacity: 0,
          scale: motionTokens.scale.press,
          y: motionTokens.distance.sm,
        }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{
          opacity: 0,
          scale: motionTokens.scale.press,
          y: motionTokens.distance.sm,
        }}
        transition={springs.gentle}
      />
    </>
  )
}
```

### Toast stack

```tsx
"use client"
import { motion, AnimatePresence } from "motion/react"
import { motionTokens, springs } from "@/lib/motion-tokens"

<AnimatePresence mode="sync">
  {toasts.map((t) => (
    <motion.div
      key={t.id}
      layout
      initial={{
        opacity: 0,
        x: motionTokens.distance.xl,
        scale: motionTokens.scale.subtle,
      }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{
        opacity: 0,
        x: motionTokens.distance.xl,
        scale: motionTokens.scale.subtle,
      }}
      transition={springs.snappy}
    />
  ))}
</AnimatePresence>
```

### Page transition (Next.js App Router)

```tsx
// components/page-transition.tsx
"use client"
import { motion, AnimatePresence } from "motion/react"
import { usePathname } from "next/navigation"
import { motionTokens } from "@/lib/motion-tokens"

const variants = {
  initial: { opacity: 0, y: motionTokens.distance.sm },
  enter:   { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -motionTokens.distance.sm },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{
          duration: motionTokens.duration.normal,
          ease: motionTokens.easing.smooth,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### Scroll reveal

```tsx
"use client"
import { motion } from "motion/react"
import { motionTokens, springs } from "@/lib/motion-tokens"

<motion.div
  initial={{ opacity: 0, y: motionTokens.distance.lg }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}   // once: true — rule 7
  transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
/>
```

### Scroll progress bar

```tsx
"use client"
import { motion, useScroll } from "motion/react"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-indigo-500 origin-left w-full"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

### Expanding card

```tsx
"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { springs, motionTokens } from "@/lib/motion-tokens"

export function ExpandingCard({ title, body }: { title: string; body: string }) {

> Continued in [`summary-2.md`](summary-2.md)
