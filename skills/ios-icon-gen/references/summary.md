# iOS Icon Generator

Generate PNG icon imagesets for Xcode asset catalogs from two sources.

## When to Activate

- Generating icon assets for an iOS/macOS Xcode project
- Searching for icons across open source collections
- Creating PNG imagesets (1x, 2x, 3x) for asset catalogs
- Replacing placeholder icons with production-quality assets
- Matching existing icon styles in an Xcode project

## Core Principles

### 1. Two Sources, One Output Format
Both sources produce identical Xcode-compatible imagesets. Choose based on need:

| Source | Icons | Requires | Best for |
|--------|-------|----------|----------|
| **Iconify API** | 275,000+ from 200+ collections | Internet | Wide selection, specific styles, open source icons |
| **SF Symbols** | 5,000+ Apple symbols | macOS only | Apple-native style, offline use |

### 2. Always Match Existing Style
Before generating, check the project's existing icons for size, color, and weight consistency.

### 3. Output Structure
Both methods produce a complete Xcode imageset:

[See code example 1 in `code-examples.md`]

## Examples

### Step 1: Assess Requirements

Determine icon needs: what the icon represents, preferred style, target color, and size.

If the project already has icons, check existing style:

[See code example 2 in `code-examples.md`]

### Step 2: Search for Icons

**Iconify API (recommended for wide selection):**

[See code example 3 in `code-examples.md`]

**SF Symbols (for Apple-native style):**
Browse the SF Symbols app or reference common names:

| Use Case | Symbol Name |
|----------|-------------|
| Document | `doc.text`, `doc.fill` |
| Receipt | `doc.text.below.ecg`, `receipt` |
| Person | `person.crop.rectangle`, `person.text.rectangle` |
| Camera | `camera`, `camera.fill` |
| Scan | `doc.viewfinder`, `qrcode.viewfinder` |
| Settings | `gearshape`, `slider.horizontal.3` |

### Step 3: Preview (Optional)

[See code example 4 in `code-examples.md`]

### Step 4: Generate

**Iconify API:**

[See code example 5 in `code-examples.md`]

Options: `--size <pt>` (default: 68), `--color <hex>` (default: 8E8E93), `--output <dir>` (default: /tmp/icons)

**SF Symbols:**

[See code example 6 in `code-examples.md`]

Options: `--size <pt>` (default: 68), `--color <hex>` (default: 8E8E93), `--weight <name>` (default: thin), `--output <dir>` (default: /tmp/icons)

### Step 5: Verify and Integrate

1. Read the generated @2x PNG to verify visually
2. Copy to asset catalog if not output there directly:
   ```bash
   cp -r /tmp/icons/<name>.imageset path/to/Assets.xcassets/<group>/
   ```
3. Build the project to verify Xcode picks up the new assets

## Popular Iconify Collections

| Prefix | Name | Count | Style |
|--------|------|-------|-------|
| `mdi` | Material Design Icons | 7400+ | Filled + outline variants |
| `ph` | Phosphor | 9000+ | 6 weights per icon |
| `solar` | Solar | 7400+ | Bold, linear, outline |
| `tabler` | Tabler Icons | 6000+ | Consistent stroke width |
| `lucide` | Lucide | 1700+ | Clean, minimal |
| `ri` | Remix Icon | 3100+ | Filled + line variants |
| `carbon` | Carbon | 2400+ | IBM design language |
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
