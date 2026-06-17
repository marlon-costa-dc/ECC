---
name: verification-loop
description: 'Use this skill to a comprehensive verification system for Claude Code
  sessions. DO NOT USE FOR: questions unrelated to verification-loop creating projects
  or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# Verification Loop Skill

**UTILITY SKILL**

## Verification Phases

### Phase 1: Build Verification

If build fails, STOP and fix before continuing.

### Phase 2: Type Check

Report all type errors. Fix critical ones before continuing.

### Phase 3: Lint Check

### Phase 4: Test Suite

Report:
- Total tests: X
- Passed: X
- Failed: X
- Coverage: X%

### Phase 5: Security Scan

### Phase 6: Diff Review

Review each changed file for:
- Unintended changes
- Missing error handling
- Potential edge cases

## Output Format

After running all phases, produce a verification report:


## Continuous Mode

For long sessions, run verification every 15 minutes or after major changes:


## Integration with Hooks

This skill complements PostToolUse hooks but provides deeper verification.
Hooks catch issues immediately; this skill provides comprehensive review.

## USE FOR

- Requests about verification loop.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to verification-loop.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Critical rules

- Prefer canonical sources.
- Require evidence before claiming success.

## Example

**Input:** a request.
**Output:** a concise response.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
