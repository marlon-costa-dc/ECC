---
name: architecture-decision-records
description: Use when capturing architectural decisions during Claude Code sessions as structured, discoverable ADRs with context, alternatives, rationale, and consequences.
origin: ECC
---

# architecture-decision-records

## When to use
- User says "record this decision", "ADR this", or "we decided to..."
- Choosing between significant alternatives (framework, library, database, pattern, API design)
- User asks "why did we choose X?" (read existing ADRs)
- Architectural trade-offs are discussed during planning

## What to do
1. **Detect** the decision moment and extract the core choice
2. **Gather** context, constraints, alternatives considered, and rationale
3. **Draft** an ADR using the format below
4. **Number** it by scanning existing `docs/adr/*.md`
5. **Confirm** with the user before writing any files
6. **Write** to `docs/adr/NNNN-decision-title.md` and append to `docs/adr/README.md`

## Critical rules
- Ask before creating `docs/adr/` or initial files; never write without explicit approval
- Be specific ("Use Prisma" not "use an ORM")
- Record the why; include rejected alternatives with reasons
- State honest consequences: positive, negative, risks
- Keep it readable in 2 minutes; use present tense
- Mark backfilled decisions with the original date
- Superseded ADRs must link to their replacement
- Do not record trivial decisions (naming, formatting)

## Example

```markdown
# ADR-NNNN: [Title]

**Date**: YYYY-MM-DD
**Status**: proposed | accepted | deprecated | superseded by ADR-NNNN
**Deciders**: [who was involved]

## Context
[2-5 sentences describing the situation and constraints]

## Decision
[1-3 sentences stating the chosen approach]

## Alternatives Considered
- **Option A**: pros/cons and why rejected
- **Option B**: pros/cons and why rejected

## Consequences
- **Positive**: [benefits]
- **Negative**: [trade-offs]
- **Risks**: [risk and mitigation]
```
