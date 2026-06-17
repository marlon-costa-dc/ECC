---
name: content-engine
description: Use when the user wants platform-native content systems for X, LinkedIn, TikTok, YouTube, newsletters, and repurposed multi-platform campaigns, including social posts, threads, scripts, content calendars, or one source asset adapted cleanly across platforms.
origin: ECC
---

# Content Engine

Build platform-native content without flattening the author's real voice into platform slop.

## When to Activate

- writing X posts or threads
- drafting LinkedIn posts or launch updates
- scripting short-form video or YouTube explainers
- repurposing articles, podcasts, demos, docs, or internal notes into public content
- building a launch sequence or ongoing content system around a product, insight, or narrative

## Non-Negotiables

1. Start from source material, not generic post formulas.
2. Adapt the format for the platform, not the persona.
3. One post should carry one actual claim.
4. Specificity beats adjectives.
5. No engagement bait unless the user explicitly asks for it.

## Voice Handling

`brand-voice` is the canonical voice layer. Run it first when there are multiple downstream outputs, the user explicitly cares about style, or the content is launch or outreach. Reuse the resulting `VOICE PROFILE` here instead of rebuilding a second voice model.

## Hard Bans

Delete and rewrite any of these:
- "In today's rapidly evolving landscape"
- "game-changer", "revolutionary", "cutting-edge"
- "here's why this matters" unless it is followed immediately by something concrete
- ending with a LinkedIn-style question just to farm replies
- fake engagement padding that was not present in the source material

## Platform Adaptation Rules

See [references/platform-adaptation.md](references/platform-adaptation.md) for per-platform rules for X, LinkedIn, short video, YouTube, and newsletters.

## Quality Gate

Before delivering:
- every draft sounds like the intended author, not the platform stereotype
- every draft contains a real claim, proof point, or concrete observation
- no generic hype language or fake engagement bait remains
- no duplicated copy across platforms unless requested
- any CTA is earned and user-approved

## Related Skills

- `brand-voice` for source-derived voice profiles
- `crosspost` for platform-specific distribution
- `x-api` for sourcing recent posts and publishing approved X output
