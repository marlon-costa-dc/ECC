---
name: configure-ecc
description: Use when the user wants to install, configure, verify, or optimize an
  Everything Claude Code setup, including selectively installing skills and rules to
  user-level or project-level directories and validating the resulting paths and cross-references.
origin: ECC
---

# Configure Everything Claude Code (ECC)

An interactive, step-by-step installation wizard for the Everything Claude Code project. Uses `AskUserQuestion` to guide users through selective installation of skills and rules, then verifies correctness and offers optimization.

## When to Use

- User says "configure ecc", "install ecc", "setup everything claude code", or similar
- User wants to selectively install skills or rules from this project
- User wants to verify or fix an existing ECC installation
- User wants to optimize installed skills or rules for their project

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

## Skill Source Roots

- Core agent-facing skills are copied from `$ECC_ROOT/.agents/skills/<skill-name>`.
- Niche and long-tail skills are copied from `$ECC_ROOT/skills/<skill-name>`.

When copying a selected skill directory, strip any trailing slash from the source before deriving the destination name:

```bash
dest="$target_root/$(basename "${src%/}")"
cp -R "${src%/}" "$dest"
```

For full details, examples, edge cases, and reference material, read `references/summary.md`.
