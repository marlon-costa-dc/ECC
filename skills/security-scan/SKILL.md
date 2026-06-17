---
name: security-scan
description: Use when setting up a new Claude Code project, after modifying configuration files, before committing configuration changes, or during periodic security hygiene checks.
origin: ECC
---

# Security Scan

Audit your Claude Code configuration for security issues using [AgentShield](https://github.com/affaan-m/agentshield).

## When to Activate

- Setting up a new Claude Code project
- After modifying `.claude/settings.json`, `CLAUDE.md`, or MCP configs
- Before committing configuration changes
- When onboarding to a new repository with existing Claude Code configs
- Periodic security hygiene checks

## What It Scans

| File | Checks |
|------|--------|
| `CLAUDE.md` | Hardcoded secrets, auto-run instructions, prompt injection patterns |
| `settings.json` | Overly permissive allow lists, missing deny lists, dangerous bypass flags |
| `mcp.json` | Risky MCP servers, hardcoded env secrets, npx supply chain risks |
| `hooks/` | Command injection via interpolation, data exfiltration, silent error suppression |
| `agents/*.md` | Unrestricted tool access, prompt injection surface, missing model specs |

## Quick Start

```bash
npx ecc-agentshield scan .
npx ecc-agentshield scan --min-severity medium
```

## Severity Levels

| Grade | Score | Meaning |
|-------|-------|---------|
| A | 90-100 | Secure configuration |
| B | 75-89 | Minor issues |
| C | 60-74 | Needs attention |
| D | 40-59 | Significant risks |
| F | 0-39 | Critical vulnerabilities |

## Links

- [Detailed usage, output formats, auto-fix, CI, and result interpretation](references/usage.md)
- [GitHub](https://github.com/affaan-m/agentshield)
- [npm](https://www.npmjs.com/package/ecc-agentshield)
