1. AI tends to make the **same category of mistake** repeatedly
2. Bugs cluster in complex areas (auth, multi-path logic, state management)
3. Once tested, that exact regression **cannot happen again**
4. Test count grows organically with bug fixes — no wasted effort

## Quick Reference

| AI Regression Pattern | Test Strategy | Priority |
|---|---|---|
| Sandbox/production mismatch | Assert same response shape in sandbox mode |  High |
| SELECT clause omission | Assert all required fields in response |  High |
| Error state leakage | Assert state cleanup on error |  Medium |
| Missing rollback | Assert state restored on API failure |  Medium |
| Type cast masking null | Assert field is not undefined |  Medium |

## DO / DON'T

**DO:**
- Write tests immediately after finding a bug (before fixing it if possible)
- Test the API response shape, not the implementation
- Run tests as the first step of every bug-check
- Keep tests fast (< 1 second total with sandbox mode)
- Name tests after the bug they prevent (e.g., "BUG-R1 regression")

**DON'T:**
- Write tests for code that has never had a bug
- Trust AI self-review as a substitute for automated tests
- Skip sandbox path testing because "it's just mock data"
- Write integration tests when unit tests suffice
- Aim for coverage percentage — aim for regression prevention
