---
name: ui-to-vue
description: Use when the user has UI screenshots or design exports that need batch conversion into Vue 3 components, particularly when the target application uses Vant, Element Plus, or Ant Design Vue and the user wants a first pass of page components, shared components, and router wiring.
origin: community
---

# UI To Vue

Batch-convert UI design screenshots into Vue 3 Composition API components.

## When to Use

- The user provides a directory of design screenshots or export images.
- The target application is Vue 3.
- The user wants a first pass of page components, shared components, and router wiring.
- The user specifies Vant, Element Plus, or Ant Design Vue.

## When Not to Use

Skip for single bespoke components, non-Vue projects, designs needing detailed interaction or accessibility review, or screenshots containing private customer data.

## Inputs

Group screenshots by module and page state. Supported asset directory names include `assets`, `icons`, `sprites`, `cut`, `images`, and `cut-images`.

## Conversion Model

- Group related screenshots into one page component for list, detail, form, loading, or empty states.
- Map native visual elements to the chosen UI library where practical.
- Prefer page-level assets, then module-level, then global shared assets.
- Extract repeated UI regions into shared components when reuse is clear.

## CLI Usage

Use `npx` so the command works without a global binary:

```bash
export DASHSCOPE_API_KEY=your_key
npx ui-to-vue-converter@1.0.2 --input ./screenshots --ui vant --output ./src
```

Supported `--ui` values: `vant`, `element-plus`, `antd-vue`.

## API Key Handling

Prefer the environment variable `DASHSCOPE_API_KEY`. If a config file is required, keep it out of version control and add `.ui-to-vue.config.json` to `.gitignore`.

## Security and Privacy

- Do not run on private customer designs without permission.
- Pin the converter version in repeatable workflows.
- Review generated code before committing; verify it uses the requested UI library consistently, matches the design baseline, and passes the project's formatter, linter, type checker, and build.
- Do not commit API keys, generated secrets, or customer screenshots.

## References

- npm package: `ui-to-vue-converter`
