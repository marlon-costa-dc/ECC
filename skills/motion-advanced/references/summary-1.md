<motion.div
  drag
  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
  dragElastic={0.1}
  whileDrag={{
    scale: motionTokens.scale.pop,
    boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
  }}
  dragTransition={springs.release}
/>
```

### Drag-to-dismiss sheet

```tsx
"use client"
import { motion, useMotionValue, useTransform } from "motion/react"

export function BottomSheet({ onClose }: { onClose: () => void }) {
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, 200], [1, 0])

return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0 }}
      style={{ y, opacity }}
      onDragEnd={(_, info) => {
        // Rule 3: combine offset + velocity
        if (info.offset.y > 120 || info.velocity.y > 500) onClose()
      }}
    />
  )
}
```

### Reorderable list

```tsx
"use client"
import { Reorder } from "motion/react"

export function SortableList() {
  const [items, setItems] = useState(initialItems)
  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems}>
      {items.map((item) => (
        <Reorder.Item key={item.id} value={item}>
          {item.label}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
```

### Swipe detection

```tsx
"use client"
import { motion } from "motion/react"

const OFFSET_THRESHOLD  = 50
const VELOCITY_THRESHOLD = 300

<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(_, info) => {
    const swipedRight = info.offset.x > OFFSET_THRESHOLD  || info.velocity.x > VELOCITY_THRESHOLD
    const swipedLeft  = info.offset.x < -OFFSET_THRESHOLD || info.velocity.x < -VELOCITY_THRESHOLD
    if (swipedRight) onSwipeRight()
    if (swipedLeft)  onSwipeLeft()
  }}
/>
```

### Long press hook

```tsx
import { useRef } from "react"

export function useLongPress(callback: () => void, ms = 600) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  return {
    onPointerDown:  () => { timerRef.current = setTimeout(callback, ms) },
    onPointerUp:    () => clearTimeout(timerRef.current),
    onPointerLeave: () => clearTimeout(timerRef.current),
  }
}
```

### Word-by-word reveal

```tsx
"use client"
import { motion } from "motion/react"
import { springs } from "@/lib/motion-tokens"

export function AnimatedText({ text }: { text: string }) {
  return (
    <motion.p
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      initial="hidden"
      animate="visible"
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1"
          variants={{
            hidden:  { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: springs.gentle },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}
```

### Number counter

```tsx
"use client"
import { useRef, useEffect } from "react"
import { animate } from "motion"
import { motionTokens } from "@/lib/motion-tokens"

export function Counter({ to }: { to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)

useEffect(() => {
    const controls = animate(0, to, {
      duration: motionTokens.duration.crawl,
      ease: motionTokens.easing.smooth,
      onUpdate: (v) => {
        if (nodeRef.current) nodeRef.current.textContent = Math.round(v).toString()
      },
    })
    return controls.stop   // Rule 7: cleanup
  }, [to])

return <span ref={nodeRef} />
}
```

### SVG path draw-on

```tsx
"use client"
import { motion } from "motion/react"
import { motionTokens } from "@/lib/motion-tokens"

<motion.path
  d="M 0 100 Q 50 0 100 100"
  initial={{ pathLength: 0, opacity: 0 }}
  animate={{ pathLength: 1, opacity: 1 }}
  transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
/>
```

### Stroke progress ring

```tsx
"use client"
import { motion } from "motion/react"
import { motionTokens } from "@/lib/motion-tokens"

const CIRCUMFERENCE = 2 * Math.PI * 40   // r=40

export function ProgressRing({ progress }: { progress: number }) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
      <motion.circle
        cx="50" cy="50" r="40"
        fill="none" stroke="#6366f1" strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        animate={{ strokeDashoffset: CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE }}
        transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
        style={{ rotate: -90, transformOrigin: "center" }}
      />
    </svg>
  )
}
```

### useScrollReveal hook

```tsx
"use client"
import { useRef } from "react"
import { useScroll, useTransform } from "motion/react"
import { motionTokens } from "@/lib/motion-tokens"

export function useScrollReveal() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y       = useTransform(scrollYProgress, [0, 0.3], [motionTokens.distance.lg, 0])
  return { ref, style: { opacity, y } }
}

// Usage
const { ref, style } = useScrollReveal()
<motion.section ref={ref} style={style} />
```

### Cursor follower

```tsx
"use client"
import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { springs } from "@/lib/motion-tokens"

export function CursorFollower() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, springs.gentle)
  const sy = useSpring(y, springs.gentle)

---

Continue in `summary-2.md`.
