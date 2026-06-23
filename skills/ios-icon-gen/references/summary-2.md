| `heroicons` | HeroIcons | 1200+ | Tailwind CSS companion |

Browse all: <https://icon-sets.iconify.design/>

## Scripts Reference

| Script | Source | Path |
|--------|--------|------|
| `iconify_gen.sh` | Iconify API (275k+ icons) | `$SKILL_DIR/scripts/iconify_gen.sh` |
| `generate_icons.swift` | SF Symbols (5k+ icons) | `$SKILL_DIR/scripts/generate_icons.swift` |

## Best Practices

- **Search before generating** -- browse available icons to find the best match
- **Match existing project style** -- check dimensions, color, and weight of existing icons before generating new ones
- **Use Iconify for variety** -- 200+ collections means you can find the exact style you need
- **Use SF Symbols for Apple consistency** -- they match system UI perfectly
- **Generate directly to asset catalog** -- use `--output ./Assets.xcassets/icons` to skip manual copying
- **Verify visually** -- always preview the @2x PNG before committing

## Anti-Patterns

---

For additional details, continue reading `summary-1.md`.
