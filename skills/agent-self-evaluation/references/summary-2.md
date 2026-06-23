FAIL: "As I said earlier, this approach is wrong. Score: 1"
```

The evaluation is about the delivered output, not about re-arguing design decisions that were already made. If the approach was wrong, that should have been caught before delivery.

### Mixing personal preference with objective gaps

```
FAIL: "Score: 3. I don't like Python decorators."
```

"Don't like" is not evidence. Cite a concrete readability, testability, or correctness concern, or leave the score at 4+.

## Best Practices

- **Evaluate the output, not the process.** The user cares about what you delivered, not how many iterations you took.
- **One improvement per weak axis.** Don't list 5 things for one axis — pick the highest-impact gap.
- **Tie improvements to user impact.** "Missing error handling means the user's API call will crash silently" beats "add error handling."
- **Be specific about what 'fixed' looks like.** "Re-run with httpx transport configured for retries" beats "fix the library issue."
- **Use tool outputs as evidence.** If tests passed, cite them. If lint is clean, cite it. Don't guess — grep for the proof.
- **If you can't find any gaps, try harder.** A perfect score across all 5 axes is rare. Ask: "If I were the user, what would annoy me about this output?"

## Related Skills

- `agent-eval` — Head-to-head comparison of different coding agents on benchmark tasks
- `verification-loop` — Systematic verification of outputs against expected results
- `security-review` — Security-focused code review checklist
