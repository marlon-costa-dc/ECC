- rerun only the targeted tests or integration slices that cover the changed path
- verify whether the burn path is now:
  - blocked
  - deduped
  - downgraded to cheaper analysis
  - or rejected early
- state the final status exactly:
  - changed locally
  - verified locally
  - pushed
  - deployed
  - still blocked

## High-Signal Failure Patterns

### 1. One queue type for all triggers

If pushes, PR syncs, and manual audits all enqueue the same job and the worker always creates a PR, analysis equals PR spam.

### 2. Post-enqueue usage reservation

If usage is checked at the front door but only incremented in the worker, concurrent requests can all pass the gate and exceed quota.

### 3. Free tier on premium path

If free queued jobs can still route into Anthropic or another premium provider when keys exist, that is real spend leakage even if the user never sees the premium result.

### 4. App-generated branches re-enter the webhook

If `pull_request.synchronize`, branch pushes, or comment-triggered runs fire on app-owned branches, the app can recursively analyze its own output.

### 5. Expensive work before persistence safety

If the system can spend tokens and then fail on PR creation, file update, or branch collision, it is burning cost without shipping value.

## Pitfalls

- do not begin with broad repo wandering; settle webhook -> queue -> worker first
- do not mix customer billing inference with code-backed product truth
- do not fix lower-value quality issues before the highest-burn path is contained
- do not claim burn is fixed until the narrow proving step was rerun
- do not push or deploy unless the user asked
- do not touch unrelated repo-local changes if they are already in progress

## Verification

- root causes cite exact file paths and code areas
- fixes are ordered by burn impact, not code neatness
- proving commands are named
- final status distinguishes local change, verification, push, and deployment
