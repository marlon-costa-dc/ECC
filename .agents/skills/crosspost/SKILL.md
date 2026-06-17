---
name: crosspost
description: Use when the user wants to distribute one piece of content across X, LinkedIn, Threads, and Bluesky as platform-native versions without posting identical copy.
---

# crosspost

## Quando usar
- the user wants to publish the same idea across multiple platforms
- a launch, update, release, or essay needs platform-specific versions
- the user says "crosspost", "post this everywhere", or "adapt this for X and LinkedIn"

## O que fazer
1. Pick the strongest source version. Run `content-engine` first if voice shaping is needed.
2. Capture the voice fingerprint with `brand-voice` if not already captured; reuse the `VOICE PROFILE`.
3. Adapt one core idea per platform:
   - **X**: compressed; lead with the sharpest claim; thread only if needed; no hashtags or filler.
   - **LinkedIn**: add only context outsiders need; don't fake founder-reflection or force a closing question.
   - **Threads**: readable and direct; don't write fake hyper-casual copy.
   - **Bluesky**: concise; preserve cadence; avoid hashtags and feed-gaming language.
4. Return the primary version, each variant, what changed and why, and any unresolved publishing constraint.

## Regras críticas
- Never post identical copy across platforms.
- Preserve the author's voice; adapt for constraints, not stereotypes.
- Do not invent a CTA, question, or moral the source did not earn.
- Do not add cross-platform references unless genuinely useful.
- Delete and rewrite: "Excited to share", "Here's what I learned", "What do you think?", "link in bio" (unless true), and generic takeaways not in the source.

## Related Skills
- `brand-voice` for reusable source-derived voice capture
- `content-engine` for voice shaping and source shaping
- `x-api` for X publishing workflows
