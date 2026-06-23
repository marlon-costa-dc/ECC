| 1 | Output cannot be acted on without significant rework or clarification. | "Here's a design idea." (No code, no file, no PR. User has to start from scratch.) |

## Conciseness

| Score | Anchor | Example |
|---|---|---|
| 5 | Every sentence earns its place. No redundancy. Information density is high. | 30 lines that say what 60 lines would. No repeated points. No filler. |
| 4 | Minor redundancy. One paragraph could be tightened. | Good overall but repeats the motivation in both the PR description and code comments. |
| 3 | Noticeable redundancy. 20%+ of content could be removed without loss. | Explains the same concept three times (in summary, body, and conclusion). Verbose examples. |
| 2 | Significantly bloated. 40%+ of content is filler or repetition. | 200 lines for a task that needed 60. Restates the user's question. Includes irrelevant background. |
| 1 | Noise-to-signal ratio is inverted. More filler than substance. | 500-line response to a 2-line question. Most of it is boilerplate, repetition, or irrelevant context. |

## Edge Cases

### When the user gave unclear instructions

If the user's request was ambiguous, do NOT penalize completeness for not reading minds. Instead, note in the evaluation: "User's request was ambiguous about [scope]. I chose interpretation [chosen interpretation]. If they meant [alternative interpretation], this score would drop to [score]."

### When the task is inherently simple

A 3-line bug fix can legitimately score 5/5/5/5/5. The rubric scales with complexity — a simple task done perfectly IS a 5.0. Don't invent gaps to justify lower scores.

### When you caught your own error mid-task

If you made an error, caught it, and fixed it before delivering — that's a 5 on Accuracy for the final output. The evaluation is about what the user received, not your internal process. Note the self-correction as evidence of thoroughness, not as a penalty.

### When the tool output contradicts your claim

If you claimed "tests pass" but the terminal output shows a failure — that's an automatic Accuracy ≤ 2. Tool output is ground truth. Claims without verification are the most common source of low accuracy scores.
