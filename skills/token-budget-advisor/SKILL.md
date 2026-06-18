---
name: token-budget-advisor
description: Use when the user explicitly asks to control response length, depth, or token budget, or mentions tokens, budget, short answer, detailed answer, exhaustive answer, or answer depth before you reply.
---

# token-budget-advisor

## Quando usar
- User mentions token budget/count/usage, response length, answer depth, or short/detailed/exhaustive answer.

**Do not trigger** when: a level is already set, request is one-word/one-line, or "token" means auth/session/payment.

## O que fazer
1. **Estimate input tokens**: prose `words × 1.3`; code-heavy/mixed `chars / 4`.
2. **Classify complexity**: Simple 3×–8×, Medium 8×–20×, Complex 15×–40×, Creative 10×–30×.
3. **Present depth options** before answering:
   ```
   Input: ~[N] tokens | Complexity: [level]
   [1] Essential (25%)  → direct answer only
   [2] Moderate  (50%)  → answer + context + 1 example
   [3] Detailed  (75%)  → full answer with alternatives
   [4] Exhaustive (100%) → everything, no limits
   Which level? (1-4 or "25% depth", etc.)
   ```
4. **Respond at the chosen level.**

   | Level | Target | Include | Omit |
   |-------|--------|---------|------|
   | 25% | 2-4 sentences | Direct answer, key conclusion | Context, examples |
   | 50% | 1-3 paragraphs | Answer + context + 1 example | Deep analysis, edge cases |
   | 75% | Structured | Examples, pros/cons, alternatives | Extreme edge cases |
   | 100% | No limit | Everything | Nothing |

## Regras críticas
- If the user signals a level, respond immediately at that level.
- Maintain the chosen level silently unless changed.
- Disclaimer: estimates are ~85-90% accurate, ±15% variance.
- Never exceed the model's output-token limit.

## Exemplo
- "Give me the short version first." → offer options or answer at 25%.
- "Respond at 50% depth." → answer at 50% directly.
