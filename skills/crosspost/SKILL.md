---
name: crosspost
description: Use when the user wants multi-platform content distribution across X, LinkedIn, Threads, and Bluesky, with per-platform adaptation using content-engine patterns and no identical copy posted cross-platform.
origin: ECC
---

# Crosspost

Distribute content across platforms without turning it into the same fake post in four costumes.

## When to Activate

- the user wants to publish the same underlying idea across multiple platforms
- a launch, update, release, or essay needs platform-specific versions
- the user says "crosspost", "post this everywhere", or "adapt this for X and LinkedIn"

## Core Rules

1. Do not publish identical copy across platforms.
2. Preserve the author's voice across platforms.
3. Adapt for constraints, not stereotypes.
4. One post should still be about one thing.
5. Do not invent a CTA, question, or moral if the source did not earn one.

## Workflow

### Step 1: Start with the Primary Version

Pick the strongest source version first: original X post, article, launch note, thread, memo, or changelog. Use `content-engine` first if the source still needs voice shaping.

### Step 2: Capture the Voice Fingerprint

Run `brand-voice` first if the source voice is not already captured in the current session. Reuse the resulting `VOICE PROFILE` directly.

### Step 3: Adapt by Platform Constraint

See [references/platform-adaptation.md](references/platform-adaptation.md) for X, LinkedIn, Threads, and Bluesky rules.

## Posting Order

Default:
1. post the strongest native version first
2. adapt for the secondary platforms
3. stagger timing only if the user wants sequencing help

Do not add cross-platform references unless useful.

## Quality Gate

Before delivering:
- each version reads like the same author under different constraints
- no platform version feels padded or sanitized
- no copy is duplicated verbatim across platforms
- any extra context added for LinkedIn is actually necessary

## Related Skills

- `brand-voice` for reusable source-derived voice capture
- `content-engine` for source shaping and platform-native drafts
- `x-api` for X publishing workflows
