---
name: agent-architecture-audit-reference
description: Supplementary reference for agent-architecture-audit containing the structured report schema, recommended codebase search patterns, quick diagnostic questions, and an expanded severity guide for diagnosing the 12-layer agent stack.
---

# Agent Architecture Audit — Reference

## Severity Guide

| Level | Meaning | Action |
|---|---|---|
| `critical` | Agent can confidently produce wrong operational behavior | Fix before next release |
| `high` | Agent frequently degrades correctness or stability | Fix this sprint |
| `medium` | Correctness usually survives but output is fragile or wasteful | Plan for next cycle |
| `low` | Mostly cosmetic or maintainability issues | Backlog |

## Quick Diagnostic Questions

| # | Question | If Yes → |
|---|----------|----------|
| 1 | Can a required tool be skipped and still answer? | Tool not code-gated |
| 2 | Does old conversation content appear in new turns? | Memory contamination |
| 3 | Is the same info in system prompt AND memory AND history? | Context duplication |
| 4 | Does the platform run a second LLM pass before delivery? | Hidden repair loop |
| 5 | Does output differ between internal generation and user delivery? | Rendering corruption |
| 6 | Are "must use tool" rules only in prompt text? | Tool discipline failure |
| 7 | Can the agent's own monologue become persistent memory? | Memory poisoning |

## Search Patterns

Use `rg` to collect evidence:

```bash
# Tool requirements expressed only in prompt text
rg "must.*tool|required.*call" --type md

# Tool execution without validation
rg "tool_call|toolCall|tool_use" --type py --type ts

# Hidden LLM calls outside main loop
rg "completion|chat\.create|messages\.create|llm\.invoke"

# Memory admission without user-correction priority
rg "memory.*admit|long.*term.*update|persist.*memory" --type py --type ts

# Fallback/repair loops
rg "fallback|retry.*llm|repair.*prompt|re-?prompt" --type py --type ts

# Silent output mutation
rg "mutate|rewrite.*response|transform.*output|shap" --type py --type ts
```

## Report Schema

```json
{
  "schema_version": "ecc.agent-architecture-audit.report.v1",
  "executive_verdict": {
    "overall_health": "high_risk",
    "primary_failure_mode": "string",
    "most_urgent_fix": "string"
  },
  "scope": {
    "target_name": "string",
    "model_stack": ["string"],
    "layers_to_audit": ["string"]
  },
  "findings": [
    {
      "severity": "critical|high|medium|low",
      "title": "string",
      "mechanism": "string",
      "source_layer": "string",
      "root_cause": "string",
      "evidence_refs": ["file:line"],
      "confidence": 0.0,
      "recommended_fix": "string"
    }
  ],
  "ordered_fix_plan": [
    { "order": 1, "goal": "string", "why_now": "string", "expected_effect": "string" }
  ]
}
```

## Failure Mapping Template

For each finding capture:

- **Symptom** — what the user sees
- **Mechanism** — how the wrapper causes it
- **Source layer** — one of the 12 layers
- **Root cause** — deepest cause
- **Evidence** — file:line or log:row
- **Confidence** — 0.0 to 1.0
