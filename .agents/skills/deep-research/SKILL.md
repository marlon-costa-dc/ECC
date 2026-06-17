---
name: deep-research
description: Use this skill to produce thorough, cited research reports by following a structured research workflow. Plan sub-questions, search multiple sources, synthesize findings, and separate fact from inference.
---

# Deep Research

**UTILITY SKILL**

Run multi-source research when the user needs evidence-backed answers, not opinion.

## USE FOR:

- In-depth research, competitive analysis, or technology evaluation.
- Questions requiring synthesis from multiple reputable sources.
- Keywords: "research", "deep dive", "investigate", "current state of".

## DO NOT USE FOR:

- Questions answerable from project files alone (use codebase search first).
- Generating unsourced claims or speculation.

## INVOKES:

- `firecrawl` or `exa` MCPs for search/scrape.
- `brand-voice` or `article-writing` if the output needs polishing.

## Workflow

1. Understand the goal. Ask 1-2 clarifying questions if needed.
2. Plan: break the topic into 3-5 sub-questions.
3. Search: run queries with 2-3 keyword variations; aim for reputable sources.
4. Deep-read: fetch full content of 3-5 key sources.
5. Synthesize: Executive Summary, themes, Key Takeaways, Sources, Methodology.
6. Deliver: short report in chat; long report → summary + full file.

## Examples:

- "Research the current state of nuclear fusion energy".
- "Deep dive into Rust vs Go for backend services in 2026".

## Troubleshooting:

- MCP unavailable → report the gap and use `WebSearch` as fallback.
- Insufficient sources → state the gap explicitly; do not invent.
- Conflicting sources → present both and score confidence.
