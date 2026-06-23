# Code Examples

## Example 1

```bash
#!/bin/bash
# daily-dev.sh — Sequential pipeline for a feature branch

set -e

# Step 1: Implement the feature
claude -p "Read the spec in docs/auth-spec.md. Implement OAuth2 login in src/auth/. Write tests first (TDD). Do NOT create any new documentation files."

# Step 2: De-sloppify (cleanup pass)
claude -p "Review all files changed by the previous commit. Remove any unnecessary type tests, overly defensive checks, or testing of language features (e.g., testing that TypeScript generics work). Keep real business logic tests. Run the test suite after cleanup."

# Step 3: Verify
claude -p "Run the full build, lint, type check, and test suite. Fix any failures. Do not add new features."

# Step 4: Commit
claude -p "Create a conventional commit for all staged changes. Use 'feat: add OAuth2 login flow' as the message."
```

## Example 2

```bash
# Research with Opus (deep reasoning)
claude -p --model opus "Analyze the codebase architecture and write a plan for adding caching..."

# Implement with Sonnet (fast, capable)
claude -p "Implement the caching layer according to the plan in docs/caching-plan.md..."

# Review with Opus (thorough)
claude -p --model opus "Review all changes for security issues, race conditions, and edge cases..."
```

## Example 3

```bash
# Pass context via files, not prompt length
echo "Focus areas: auth module, API rate limiting" > .claude-context.md
claude -p "Read .claude-context.md for priorities. Work through them in order."
rm .claude-context.md
```

## Example 4

```bash
# Read-only analysis pass
claude -p --allowedTools "Read,Grep,Glob" "Audit this codebase for security vulnerabilities..."

# Write-only implementation pass
claude -p --allowedTools "Read,Write,Edit,Bash" "Implement the fixes from security-audit.md..."
```

## Example 5

```bash
# Start the default session
node scripts/claw.js

# Named session with skill context
CLAW_SESSION=my-project CLAW_SKILLS=tdd-workflow,security-review node scripts/claw.js
```
