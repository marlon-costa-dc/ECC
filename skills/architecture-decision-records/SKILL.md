---
name: architecture-decision-records
description: 'Use this skill to use when capturing architectural decisions during
  Claude Code sessions as structured, discoverable ADRs with context, alternatives,
  rationale, and consequences. DO NOT USE FOR: questions unrelated to architecture-decision-records
  creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# architecture-decision-records

## When to use
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

## Example

**Input:** a request.
**Output:** a concise response.
