# GAN-Style Harness Reference

## Architecture

```
PLANNER (Opus 4.6)
  └─ Product Spec --> GENERATOR-EVALUATOR LOOP
                         ┌──────────┐
                    ┌────│GENERATOR │--build--> live app
                    │    │(Opus 4.6)│
                 feedback └────▲─────┘
                    │          │
                    └────│EVALUATOR │<--test---- live app
                         │+Playwright│
                         └──────────┘
```

The Generator produces, the Evaluator critiques, and feedback drives the next iteration. Default: 5-15 iterations, pass threshold 7.0/10.

## Evaluation Rubric

| Criterion | Weight | 1-3 | 4-6 | 7-8 | 9-10 |
| --- | --- | --- | --- | --- | --- |
| Design Quality | 0.3 | Generic / AI slop | Competent | Distinctive identity | Professional designer work |
| Originality | 0.2 | Stock layouts | Some custom choices | Clear creative vision | Genuinely novel |
| Craft | 0.3 | Broken layouts | Works but rough | Polished, responsive | Pixel-perfect micro-interactions |
| Functionality | 0.2 | Core features broken | Happy path works | All features work | Bulletproof edge cases |

Weighted score = Σ(score × weight). Pass threshold configurable.

## Manual Claude Code Workflow

```bash
# Step 1: Plan
claude -p --model opus "You are a Product Planner. Read PLANNER_PROMPT.md. Expand this brief into a full product spec. Write spec.md"

# Step 2-3: Generate then Evaluate (repeat)
claude -p --model opus "You are a Generator. Read spec.md and feedback.md. Implement the next sprint. Start dev server on port 3000."
claude -p --model opus --allowedTools "Read,Bash,mcp__playwright__*" "You are an Evaluator. Test the live app. Score against the rubric. Write feedback.md"
```

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `GAN_MAX_ITERATIONS` | `15` | Max generator-evaluator cycles |
| `GAN_PASS_THRESHOLD` | `7.0` | Weighted score to pass |
| `GAN_PLANNER_MODEL` | `opus` | Planner model |
| `GAN_GENERATOR_MODEL` | `opus` | Generator model |
| `GAN_EVALUATOR_MODEL` | `opus` | Evaluator model |
| `GAN_EVAL_CRITERIA` | `design,originality,craft,functionality` | Comma-separated criteria |
| `GAN_EVAL_MODE` | `playwright` | `playwright`, `screenshot`, or `code-only` |

## Anti-Patterns

1. **Evaluator too lenient** — tighten criteria if it passes everything on iteration 1.
2. **Generator ignoring feedback** — pass feedback as a file, not inline.
3. **Infinite loops** — always set `GAN_MAX_ITERATIONS`.
4. **Evaluator testing superficially** — interact with the live app via Playwright, don't just screenshot.
5. **Evaluator praising its own fixes** — the evaluator only critiques; the generator fixes.
6. **Context exhaustion** — reset context between major phases for long sessions.

## Evolution Across Model Capabilities

- **Stage 1 — Sonnet-class:** full sprint decomposition, 2-agent minimum, heavy scaffolding.
- **Stage 2 — Opus 4.5-class:** full 3-agent harness, sprint contracts, 10-sprint decomposition.
- **Stage 3 — Opus 4.6-class:** single planning pass, continuous generation, end-pass evaluation.

Strip away components as models improve.

## Results

| Metric | Solo Agent | GAN Harness |
| --- | --- | --- |
| Time | 20 min | 4-6 hours |
| Cost | $9 | $125-200 |
| Quality | Barely functional | Production-ready |

Tradeoff: ~20x more time and cost for a qualitative leap in output quality.

## References

- [Anthropic: Harness Design for Long-Running Apps](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- [Martin Fowler: Harness Engineering](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)
- [OpenAI: Harness Engineering](https://openai.com/index/harness-engineering/)
