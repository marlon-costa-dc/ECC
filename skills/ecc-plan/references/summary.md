# /plan — Implementation Planning

## When to Activate

- Starting a new feature
- Complex refactoring
- Architectural changes
- Any multi-step implementation task

## Delegation

For complex plans, delegate to the `plan` subagent:

[See code example 1 in `code-examples.md`]

The `plan` agent runs in isolated context, focuses purely on planning without executing code.

## Planning Process

### 1. Requirements Analysis
- Understand the feature request completely
- Ask clarifying questions if needed
- Identify success criteria
- List assumptions and constraints

### 2. Architecture Review
- Analyze existing codebase structure
- Identify affected components
- Review similar implementations
- Consider reusable patterns

### 3. Step Breakdown
Create detailed steps with:
- Clear, specific actions
- File paths and locations
- Dependencies between steps
- Estimated complexity
- Potential risks

### 4. Implementation Order
- Prioritize by dependencies
- Group related changes
- Minimize context switching
- Enable incremental testing

## Output Format

[See code example 2 in `code-examples.md`]

## Post-Planning

After creating the plan:
1. Present it to the user for approval
2. Break into incremental commits
3. Execute step by step
4. Verify each step before proceeding
