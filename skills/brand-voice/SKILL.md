---
name: brand-voice
description: Use when the user wants to build a source-derived writing style profile from real posts, essays, launch notes, docs, or site copy and reuse that profile across content, outreach, and social workflows without generic AI writing tropes.
origin: ECC
---

# Brand Voice

Build a durable voice profile from real source material, then reuse it everywhere instead of re-deriving style from scratch.

## When to Activate

- the user wants content or outreach in a specific voice
- writing for X, LinkedIn, email, launch posts, threads, or product updates
- adapting a known author's tone across channels

## Source Priority

Use the strongest real source set available:

1. recent original X posts and threads (use `x-api` if live access is available)
2. articles, essays, memos, launch notes, or newsletters
3. real outbound emails or DMs that worked
4. product docs, changelogs, README framing, and site copy

Do not use generic platform exemplars.

## What to Extract

- rhythm and sentence length
- compression vs explanation
- capitalization norms
- parenthetical use
- question frequency and purpose
- what the author never does

## Output Contract

Produce a reusable `VOICE PROFILE` block using the schema in [references/voice-profile-schema.md](references/voice-profile-schema.md). Keep it structured and short enough to reuse in session context.

## Affaan / ECC Defaults

If the user wants Affaan / ECC voice and live sources are thin:

- direct, compressed, concrete
- specifics, mechanisms, receipts, and numbers beat adjectives
- capitalization is conventional unless there is a real reason to break it
- questions are rare and should not be used as bait
- tone can be sharp, blunt, skeptical, or dry
- transitions should feel earned

## Hard Bans

Delete and rewrite any of these:
- fake curiosity hooks
- "not X, just Y"
- forced lowercase
- LinkedIn thought-leader cadence
- bait questions

## Persistence Rules

Reuse the latest confirmed `VOICE PROFILE` across related tasks. Save durable profiles only where the user requests. Do not create repo-tracked voice fingerprints unless explicitly asked.

## Downstream Use

Use this skill before or inside `content-engine`, `crosspost`, `lead-intelligence`, article or launch writing, and outbound across X, LinkedIn, and email.
