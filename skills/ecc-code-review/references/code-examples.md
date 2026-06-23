# Code Examples

## Example 1

```
Use coder agent to review: [description of changes]
```

## Example 2

```markdown
## Code Review: [Feature/Change]

### Summary
[1-2 sentence overall assessment: PASS with notes, or NEEDS CHANGES]

### Issues Found
| Severity | File:Line | Issue | Suggestion |
|----------|-----------|-------|------------|
|  Critical | `auth.ts:42` | SQL injection risk | Use parameterized query |
|  Medium | `utils.ts:88` | Missing null check | Add `if (!data)` guard |
|  Low | `types.ts:12` | Typo in comment | Fix spelling |

### Positive Notes
- [What's done well]

### Action Items
- [ ] [Task 1]
- [ ] [Task 2]
```
