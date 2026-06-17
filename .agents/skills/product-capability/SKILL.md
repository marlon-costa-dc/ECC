---
name: product-capability
description: 'Use this skill to translate PRD intent, roadmap asks, or product discussions
  into an implementation-ready capability plan that exposes constraints, invariants,
  interfaces, and unresolved decisions before multi-service work starts. DO NOT USE
  FOR: questions unrelated to product-capability creating projects or architecture
  from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# product-capability

**UTILITY SKILL**

## Quando usar
## O que fazer
1. **Restate the capability.** One sentence: who, what new capability exists, what outcome changes.
2. **Resolve constraints.** Business rules, scope, invariants, trust boundaries, data ownership, lifecycle, rollout, failure/recovery.
3. **Define the implementation contract.** SRS-style plan: summary, non-goals, actors/surfaces, states/transitions, interfaces, data, constraints, observability, open questions.
4. **Translate into execution.** Declare handoff state: ready, needs review, or needs clarification.
5. **Persist.** Update `PRODUCT.md`, `docs/product/`, or program-spec; create from template if none exists.

## Regras críticas
- Do not invent product truth; mark unresolved questions explicitly.
- Separate user-visible promises from implementation details.
- Call out fixed policy, architecture preference, or open items.
- Flag conflicts with repo constraints instead of smoothing over.
- Prefer one reusable artifact over scattered notes.

## Exemplo

## USE FOR

- Requests about product capability.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to product-capability.
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
