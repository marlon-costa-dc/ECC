# Motion System v4.2

Production-ready UI motion system for React / Next.js.

Focused on **performance, accessibility, and usability** — not decoration.

## When to Use

Use this motion system when motion:

* Guides attention (e.g., onboarding, key actions)
* Communicates state (loading, success, error, transitions)
* Preserves spatial continuity (layout changes, navigation)

### Appropriate Scenarios

* Interactive components (buttons, modals, menus)
* State transitions (loading → loaded, open → closed)
* Navigation and layout continuity (shared elements, crossfade)

### Considerations

* **Accessibility**: Always support reduced motion
* **Device adaptation**: Adjust for low-end devices
* **Performance trade-offs**: Prefer responsiveness over visual smoothness

### Avoid Using Motion When

* It is purely decorative
* It reduces usability or clarity
* It impacts performance negatively

---

## How It Works

### Core Principle

Motion must:

* Guide attention
* Communicate state
* Preserve spatial continuity

If it does none → remove it.

---

### Installation

[See code example 1 in `code-examples.md`]

---

### Version

* `motion/react` - default for current Motion for React projects (package: `motion`)
* `framer-motion` - legacy import path for projects that still depend on Framer Motion

**Do not mix.** Mixing causes conflicting internal schedulers and broken `AnimatePresence` contexts — components from one package will not coordinate exit animations with components from the other.

To check which version your project uses:

[See code example 2 in `code-examples.md`]

Always import from one source consistently:

[See code example 3 in `code-examples.md`]

---

### Motion Tokens

[See code example 4 in `code-examples.md`]

Usage example:

[See code example 5 in `code-examples.md`]

---

### Performance Rules

**Safe**

* transform
* opacity

**Avoid**

* width / height
* top / left

Rule: responsiveness > smoothness

---

### Device Adaptation

The heuristic combines CPU core count **and** available memory for a more reliable signal. `deviceMemory` is available on Chrome/Android; the fallback covers Safari and Firefox.

[See code example 6 in `code-examples.md`]

---

### Accessibility

#### JS (useReducedMotion)

[See code example 7 in `code-examples.md`]

#### CSS

[See code example 8 in `code-examples.md`]

#### Tailwind

[See code example 9 in `code-examples.md`]

---

### Architecture & Patterns

#### Core Patterns

| Scenario | Pattern |
|---|---|
| Hover feedback | `whileHover` |
| Tap / press feedback | `whileTap` |
| Reveal on scroll | `whileInView` |
| Scroll-linked value | `useScroll` + `useTransform` |
| Conditional mount/unmount | `AnimatePresence` |
| Small layout shifts (single element, < ~300px change) | `layout` prop |
| Large layout shifts or full-page reflows | Avoid `layout`; use CSS transitions or page-level routing instead |
| Complex, imperative sequences | `useAnimate` |

> **Why avoid `layout` on large containers?** Framer's layout animation uses `transform` to reconcile positions, but on elements that span the full viewport or trigger deep reflow, the measurement cost causes visible jank and CLS. Prefer CSS Grid/Flexbox transitions or coordinate with `layoutId` on specific child elements only.

#### Layout & Transitions

---

For additional details, continue reading `summary-1.md`, `summary-2.md`.
