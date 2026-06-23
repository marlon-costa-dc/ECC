# Extended guidance


Structure the code for reproducibility and iteration.
- **Start Simple:** Build a baseline model first (e.g., a simple scikit-learn Logistic Regression or a barebones PyTorch linear layer).
- **Reproducibility:** Apply `pytorch-patterns` or similar best practices: fix random seeds, make code device-agnostic, and explicitly document tensor/array shapes.
- **Automated Evidence:** Require tests for the data transforms and inference schema. Do not accept a model without an evaluation script comparing it against the baseline.

## Phase 5: Handoff to MLOps

Once the baseline model is integrated, shift focus to continuous operations.
- **Refer to `mle-workflow`:** Guide the user toward setting up experiment tracking, model registries, and drift detection.
- **CI/CD:** Add the model evaluation step to the existing CI pipeline to ensure future commits do not degrade model performance.

## Iterative Agent Workflow

When assisting a user via this playbook, agents should:
1. **Ask clarifying questions** to complete Phase 1 before proposing architectures.
2. **Draft a data contract** in Phase 2 for user approval.
3. **Write the decoupling interface** (API/Service) in Phase 3 *before* writing the training loop.
4. **Deliver a reproducible script** in Phase 4 that trains the model and saves the artifact.
