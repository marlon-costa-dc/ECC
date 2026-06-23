# Product Lens — Think Before You Build

This lane owns product diagnosis, not implementation-ready specification writing.

If the user needs a durable PRD-to-SRS or capability-contract artifact, hand off to `product-capability`.

## When to Use

- Before starting any feature — validate the "why"
- Weekly product review — are we building the right thing?
- When stuck choosing between features
- Before a launch — sanity check the user journey
- When converting a vague idea into a product brief before engineering planning starts

## How It Works

### Mode 1: Product Diagnostic

Like YC office hours but automated. Asks the hard questions:

[See code example 1 in `code-examples.md`]

Output: a `PRODUCT-BRIEF.md` with answers, risks, and a go/no-go recommendation.

If the result is "yes, build this," the next lane is `product-capability`, not more founder-theater.

### Mode 2: Founder Review

Reviews your current project through a founder lens:

[See code example 2 in `code-examples.md`]

### Mode 3: User Journey Audit

Maps the actual user experience:

[See code example 3 in `code-examples.md`]

### Mode 4: Feature Prioritization

When you have 10 ideas and need to pick 2:

[See code example 4 in `code-examples.md`]

## Output

All modes output actionable docs, not essays. Every recommendation has a specific next step.

## Integration

Pair with:
- `/browser-qa` to verify the user journey audit findings
- `/design-system audit` for visual polish assessment
- `/canary-watch` for post-launch monitoring
- `product-capability` when the product brief needs to become an implementation-ready capability plan
