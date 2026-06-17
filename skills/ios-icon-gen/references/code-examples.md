# Code Examples

## Example 1

```
<output-dir>/<asset-name>.imageset/
  Contents.json
  <asset-name>.png        # 1x (68px default)
  <asset-name>@2x.png     # 2x (136px default)
  <asset-name>@3x.png     # 3x (204px default)
```

## Example 2

```bash
# Check dimensions of existing icon
sips -g pixelWidth -g pixelHeight path/to/existing@2x.png
```

## Example 3

```bash
# Search all collections
$SKILL_DIR/scripts/iconify_gen.sh search "receipt"

# Search within a specific collection
$SKILL_DIR/scripts/iconify_gen.sh search "business card" --prefix mdi

# List available collections
$SKILL_DIR/scripts/iconify_gen.sh collections
```

## Example 4

```bash
# Iconify preview
$SKILL_DIR/scripts/iconify_gen.sh preview mdi:receipt-text-outline
```

## Example 5

```bash
# Basic generation
$SKILL_DIR/scripts/iconify_gen.sh mdi:receipt-text-outline editTool_expenseReport

# Custom color and output location
$SKILL_DIR/scripts/iconify_gen.sh mdi:receipt-text-outline myIcon --color 007AFF --output ./Assets.xcassets/icons
```

## Example 6

```bash
# Basic generation
swift $SKILL_DIR/scripts/generate_icons.swift doc.text.below.ecg editTool_expenseReport

# Custom color, weight, and output
swift $SKILL_DIR/scripts/generate_icons.swift person.crop.rectangle myIcon --color 007AFF --weight regular --output ./Assets.xcassets/icons
```
