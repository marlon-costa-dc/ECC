---
name: article-writing
description: 'Use this skill to use when the user wants polished long-form content
  such as articles, guides, blog posts, tutorials, or newsletter issues that match
  a distinctive voice from examples or brand guidance and require structure, specificity,
  and credibility. DO NOT USE FOR: questions unrelated to article-writing creating
  projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# Article Writing

Write long-form content that sounds like an actual person with a point of view, not generic AI paste.

## When to Activate

- drafting blog posts, essays, launch posts, guides, tutorials, or newsletters
- turning notes, transcripts, or research into polished articles
- matching an existing founder, operator, or brand voice from examples
- tightening structure, pacing, and evidence in existing long-form copy

## Core Rules

1. Lead with the concrete thing: artifact, example, anecdote, number, screenshot, or code.
2. Explain after the example, not before.
3. Keep sentences tight unless the source voice is intentionally expansive.
4. Use proof instead of adjectives.
5. Never invent facts, credibility, or customer evidence.

## Voice Handling

Run `brand-voice` first when the user wants a specific voice; reuse the resulting `VOICE PROFILE`. Do not duplicate a style-analysis pass unless explicitly asked. With no voice references, default to a sharp operator voice: concrete, unsentimental, useful.

## Banned Patterns

Delete and rewrite any of these:
- "In today's rapidly evolving landscape"
- "game-changer", "cutting-edge", "revolutionary"
- "here's why this matters" as a standalone bridge
- fake vulnerability arcs
- a closing question added only to juice engagement
- biography padding that does not move the argument
- generic AI throat-clearing that delays the point

## Quality Gate

Before delivering:
- factual claims are backed by provided sources
- generic AI transitions are gone
- the voice matches supplied examples or the agreed `VOICE PROFILE`
- every section adds something new
- formatting matches the intended medium
