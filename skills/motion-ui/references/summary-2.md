            ref={ref}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1,    opacity: 1 }}
            exit={{    scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-6 rounded"
          >
            <h2 id="modal-title">Dialog Title</h2>
            <button onClick={closeModal}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Example() {
  const [open, setOpen] = useState(false)

return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal open={open} closeModal={() => setOpen(false)} />
    </>
  )
}
```

---

### SSR Safety

* Match initial states between server and client renders
* Avoid implicit animation origins (always set `initial` explicitly)
* Wrap motion components in `"use client"` in Next.js App Router

---

### Debugging

Check:

* Wrong import (mixing `motion/react` and `framer-motion`)
* Missing `"use client"` directive in Next.js App Router
* Missing `key` prop on `AnimatePresence` children
* Hydration mismatch (initial state differs between SSR and client)
* `layout` prop misuse on large containers causing reflow jank
* State-driven animation not triggering (check dependency arrays)

---

### QA

* No CLS
* Keyboard works
* Focus trapped in modals
* ARIA roles correct (`role="dialog"`, `aria-modal="true"`)
* Reduced motion respected (`useReducedMotion` + CSS media query)
* No hydration warnings in Next.js
* Animations stop cleanly on unmount (no memory leaks)
* `AnimatePresence mode` set explicitly on all usage sites

---

### Anti-Patterns

---

Continue in `summary-2.md`.
