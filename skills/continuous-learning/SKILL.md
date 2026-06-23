---
name: continuous-learning
description: '[DEPRECATED - use continuous-learning-v2] Legacy v1 stop-hook skill
  extractor. v2 is a strict superset with instinct-based, project-scoped, hook-reliable
  learning. Do not invoke v1; route continuous learning, session learning, and pattern
  extraction...'
origin: ECC
---

# Continuous Learning Skill - DEPRECATED

> **DEPRECATED 2026-04-28.** Use `continuous-learning-v2` instead. v2 is a strict superset: stop-hook observation becomes PreToolUse/PostToolUse observation, full skills become atomic instincts with confidence scoring, and global-only...

## When to Use

- Setting up automatic pattern extraction from Claude Code sessions
- Configuring the Stop hook for session evaluation
- Reviewing or curating learned skills in ~/.claude/skills/learned/
- Adjusting extraction thresholds or pattern categories
- Comparing v1 (this) vs v2 (instinct-based) approaches

## Workflow

1. **Session Evaluation**: Checks if session has enough messages (default: 10+)
2. **Pattern Detection**: Identifies extractable patterns from the session
3. **Skill Extraction**: Saves useful patterns to ~/.claude/skills/learned/

For full details, examples, edge cases, and reference material, read `references/summary.md`.
