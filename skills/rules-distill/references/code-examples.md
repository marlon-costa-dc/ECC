# Code Examples

## Example 1

```bash
bash ~/.claude/skills/rules-distill/scripts/scan-skills.sh
```

## Example 2

```bash
bash ~/.claude/skills/rules-distill/scripts/scan-rules.sh
```

## Example 3

```
Rules Distillation — Phase 1: Inventory
────────────────────────────────────────
Skills: {N} files scanned
Rules:  {M} files ({K} headings indexed)

Proceeding to cross-read analysis...
```

## Example 4

````
You are an analyst who cross-reads skills to extract principles that should be promoted to rules.

## Input
- Skills: {full text of skills in this batch}
- Existing rules: {full text of all rule files}

## Extraction Criteria

Include a candidate ONLY if ALL of these are true:

1. **Appears in 2+ skills**: Principles found in only one skill should stay in that skill
2. **Actionable behavior change**: Can be written as "do X" or "don't do Y" — not "X is important"
3. **Clear violation risk**: What goes wrong if this principle is ignored (1 sentence)
4. **Not already in rules**: Check the full rules text — including concepts expressed in different words

## Matching & Verdict

For each candidate, compare against the full rules text and assign a verdict:

- **Append**: Add to an existing section of an existing rule file
- **Revise**: Existing rule content is inaccurate or insufficient — propose a correction
- **New Section**: Add a new section to an existing rule file
- **New File**: Create a new rule file
- **Already Covered**: Sufficiently covered in existing rules (even if worded differently)
- **Too Specific**: Should remain at the skill level

## Output Format (per candidate)

```

## Example 5

```

## Exclude

- Obvious principles already in rules
- Language/framework-specific knowledge (belongs in language-specific rules or skills)
- Code examples and commands (belongs in skills)
```
