# Liquid Glass Design System (iOS 26)

Patterns for implementing Apple's Liquid Glass — a dynamic material that blurs content behind it, reflects color and light from surrounding content, and reacts to touch and pointer interactions. Covers SwiftUI, UIKit, and WidgetKit integration.

## When to Activate

- Building or updating apps for iOS 26+ with the new design language
- Implementing glass-style buttons, cards, toolbars, or containers
- Creating morphing transitions between glass elements
- Applying Liquid Glass effects to widgets
- Migrating existing blur/material effects to the new Liquid Glass API

## Core Pattern — SwiftUI

### Basic Glass Effect

The simplest way to add Liquid Glass to any view:

[See code example 1 in `code-examples.md`]

### Customizing Shape and Tint

[See code example 2 in `code-examples.md`]

Key customization options:
- `.regular` — standard glass effect
- `.tint(Color)` — add color tint for prominence
- `.interactive()` — react to touch and pointer interactions
- Shape: `.capsule` (default), `.rect(cornerRadius:)`, `.circle`

### Glass Button Styles

[See code example 3 in `code-examples.md`]

### GlassEffectContainer for Multiple Elements

Always wrap multiple glass views in a container for performance and morphing:

[See code example 4 in `code-examples.md`]

The `spacing` parameter controls merge distance — closer elements blend their glass shapes together.

### Uniting Glass Effects

Combine multiple views into a single glass shape with `glassEffectUnion`:

[See code example 5 in `code-examples.md`]

### Morphing Transitions

Create smooth morphing when glass elements appear/disappear:

[See code example 6 in `code-examples.md`]

### Extending Horizontal Scrolling Under Sidebar

To allow horizontal scroll content to extend under a sidebar or inspector, ensure the `ScrollView` content reaches the leading/trailing edges of the container. The system automatically handles the under-sidebar scrolling behavior when the layout extends to the edges — no additional modifier is needed.

## Core Pattern — UIKit

### Basic UIGlassEffect

[See code example 7 in `code-examples.md`]

### UIGlassContainerEffect for Multiple Elements

[See code example 8 in `code-examples.md`]

### Scroll Edge Effects

[See code example 9 in `code-examples.md`]

### Toolbar Glass Integration

[See code example 10 in `code-examples.md`]

## Core Pattern — WidgetKit

### Rendering Mode Detection

[See code example 11 in `code-examples.md`]

### Accent Groups for Visual Hierarchy

[See code example 12 in `code-examples.md`]

### Image Rendering in Accented Mode

[See code example 13 in `code-examples.md`]

### Container Background

[See code example 14 in `code-examples.md`]

## Key Design Decisions

---

For additional details, continue reading `summary-1.md`.
