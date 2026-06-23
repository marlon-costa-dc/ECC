---
name: vue-patterns
description: Vue.js 3 Composition API patterns, component architecture, reactivity best practices, Pinia state management, Vue Router navigation, and Nuxt SSR patterns. Activates for Vue, Nuxt, Vite, or Pinia projects.
origin: ECC
---

# Vue.js Patterns and Best Practices

Comprehensive guide for Vue.js 3 development using Composition API (`<script setup>`), covering component design, reactivity, state management, routing, testing, and SSR patterns. Nuxt-specific guidance is included where it differs from vanilla Vue.

## When to Activate

Activate this skill when:
- The project uses Vue.js (any version), Nuxt, Vite + Vue, or Pinia.
- The user asks about Vue component architecture, composables, reactivity, or state management.
- Reviewing Vue Single-File Components (`.vue` files).
- Setting up Vue Router, Pinia stores, or Vite/Vitest configuration.
- Discussing Vue-specific performance, security, or SSR patterns.

---

## 1. Project Structure

### Recommended Layout (Feature-First)

```
src/
├── api/              # API client and endpoint definitions
├── assets/           # Static assets (images, fonts, icons)
├── components/       # Shared/reusable components
│   ├── base/         # Base UI primitives (Button, Input, Modal)
│   └── features/     # Feature-specific shared components
├── composables/      # Reusable Composition API logic
├── layouts/          # Page layouts (optional)
├── pages/            # Route-level page components
├── router/           # Vue Router configuration
├── stores/           # Pinia stores
├── types/            # TypeScript type definitions
├── utils/            # Pure utility functions
└── App.vue           # Root component
```

### File Naming

| Convention | When to Use |
|-----------|-------------|
| `PascalCase.vue` | All components (enforced by `vue/multi-word-component-names`) |
| `useCamelCase.ts` | Composables |
| `camelCase.ts` | Utilities, API clients, types |
| `kebab-case` directories | Route segments, feature folders |

---

## 2. Component Architecture

### Single-File Component Order

```vue
<script setup lang="ts">
// 1. Imports (vue → ecosystem → absolute → relative)
// 2. Props & Emits & Slots
// 3. Composables
// 4. Local state (ref/reactive)
// 5. Computed properties
// 6. Methods
// 7. Watchers
// 8. Lifecycle hooks
</script>

<template>
  <!-- Template content -->
</template>

<style scoped>
  /* Scoped styles */
</style>
```

### Presentational vs Container

> **Extended guidance**: see `references/summary-*.md` for the full content that exceeded the Waza token budget.

