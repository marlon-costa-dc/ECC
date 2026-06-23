---
name: google-workspace-ops
description: Use when the user needs to operate across Google Drive, Docs, Sheets, and Slides as one workflow surface to find, summarize, edit, migrate, or clean up shared plans, trackers, decks, and documents without dropping to raw tool calls.
origin: ECC
---

# Google Workspace Ops

Operate shared docs, spreadsheets, and decks as working systems. Use Drive as the entry point, then the right specialist: Docs for text, Sheets for tabular data and formulas, Slides for decks and template migration.

## When to Use

- Find and update a doc, sheet, or deck in place.
- Consolidate plans, trackers, notes, or customer lists in Drive.
- Clean, restructure, or repair a spreadsheet or slide deck.
- Produce summaries from Docs, Sheets, or Slides for decisions.

## Workflow

1. **Find.** Search Drive for the exact file, siblings, duplicates, and recent versions.
2. **Inspect.** Summarize structure (tabs, headings, slide count) before editing.
3. **Edit.** Use index-aware edits for Docs, explicit tabs/ranges for Sheets, and content-first changes for Slides.
4. **Clean.** Surface duplicates, stale docs, and assets that should be archived, merged, or renamed.

## Output Format

```text
ASSET — file name, type, and why it is the right file
CURRENT STATE — structure summary and blockers
ACTION — edits made or recommended
FOLLOW-UPS — archive / merge / duplicate cleanup / next file
```

## Related Skills

- `google-workspace-ops/references/workspace-patterns.md` for detailed patterns and common formulas
