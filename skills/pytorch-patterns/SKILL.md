---
name: pytorch-patterns
description: Use when writing, reviewing, debugging, or optimizing PyTorch deep-learning code so models, training loops, data loaders, checkpoints, and inference stay reproducible and production-ready.
origin: ECC
---

# PyTorch Development Patterns

## When to Activate

- Writing or reviewing PyTorch models, training scripts, or data pipelines
- Debugging training loops, device mismatches, or data loader bottlenecks
- Optimizing GPU memory, training speed, or inference latency
- Setting up reproducible experiments and safe serialization

## Core Principles

- Derive `device` from availability; use `.to(device)` instead of `.cuda()`.
- Pin seeds and set `cudnn.deterministic=True`, `benchmark=False` for reproducibility.
- Annotate tensor shapes in `forward`; validate dimensions.
- Organize layers in named submodules; initialize weights explicitly.
- Use `zero_grad(set_to_none=True)`, `@torch.no_grad()` for eval, AMP, and `pin_memory=True`.
- Save full `state_dict` plus epoch, optimizer, loss; load with `weights_only=True`.
- Use gradient checkpointing and `torch.compile`; profile with `torch.profiler`.

## Quick Reference

| Idiom | Why |
|-------|-----|
| `model.train()` / `model.eval()` | Correct dropout / batch-norm behavior |
| `@torch.no_grad()` | Disable gradients for inference |
| `optimizer.zero_grad(set_to_none=True)` | Faster gradient clearing |
| `.to(device)` | Device-agnostic placement |
| `torch.amp.autocast` | Mixed precision for ~2x speed |
| `pin_memory=True` | Faster CPU→GPU transfer |
| `torch.compile` | JIT compilation (PyTorch 2.0+) |
| `weights_only=True` | Secure checkpoint loading |
| `torch.manual_seed` | Reproducible experiments |

## Anti-Patterns

- Calling `.cuda()` or `.item()` before backward
- Forgetting `model.eval()` during validation
- Moving the model to GPU inside the training loop
- In-place operations that break autograd
- Saving the whole model instead of `state_dict`

## Reference

See [references/code-examples.md](references/code-examples.md) for full training-loop, model, dataset, DataLoader, checkpointing, AMP, and gradient-checkpointing examples.
