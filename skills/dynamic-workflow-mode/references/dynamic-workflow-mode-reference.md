# Dynamic Workflow Mode Reference

Detailed templates, eval gates, and anti-patterns for task-local harnesses.

## Task-Local Harness Template

```markdown
# Dynamic Workflow Harness

Objective:
- Ship:
- Do not ship:

Inputs:
- Repo or workspace:
- External systems:
- Credentials policy:

Loop:
1. Discover current state.
2. Generate or update the smallest useful artifact.
3. Run eval checks.
4. Record status and handoff.
5. Stop on failed gate, unclear ownership, or unsafe external action.

Eval:
- Command:
- Expected pass signal:
- Failure owner:

Handoff:
- Status:
- Evidence:
- Next action:
```

## Eval Gates by Work Type

| Work Type | Eval Gate |
| --- | --- |
| Code feature | Focused test, lint, coverage, and one integration path |
| UI/control pane | Browser smoke with screenshot and overflow/error checks |
| Agent workflow | Fixture transcript or seeded work item with expected routing |
| Research/content | Source-neutral brief, claim checklist, and publish-ready outline |
| Integration | Dry-run command, config validation, and no-secret scan |

## Anti-Patterns

- Generating scripts that hide the real decision logic from the operator.
- Treating dynamic workflow mode as permission to skip tests.
- Creating one-off docs when a shared skill or status artifact is the real product.
- Running multiple agents without ownership, merge gate, or conflict policy.
- Letting raw private research data leak into public docs.
