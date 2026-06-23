---
name: content-hash-cache-pattern
description: Cache expensive file processing results using SHA-256 content hashes
  — path-independent, auto-invalidating, with service layer separation.
origin: ECC
---

# Content-Hash File Cache Pattern

Cache expensive file processing results (PDF parsing, text extraction, image analysis) using SHA-256 content hashes as cache keys. Unlike path-based caching, this approach survives file moves/renames and auto-invalidates when content...

## When to Use

- Building file processing pipelines (PDF, images, text extraction)
- Processing cost is high and same files are processed repeatedly
- Need a --cache/--no-cache CLI option
- Want to add caching to existing pure functions without modifying them

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
