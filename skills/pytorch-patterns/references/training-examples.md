# PyTorch Training Examples

## Standard Training Loop

```python
def train_one_epoch(
    model: nn.Module,
    dataloader: DataLoader,
    optimizer: torch.optim.Optimizer,
    criterion: nn.Module,
    device: torch.device,
    scaler: torch.amp.GradScaler | None = None,
) -> float:
    model.train()
    total_loss = 0.0

    for batch_idx, (data, target) in enumerate(dataloader):
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad(set_to_none=True)

        with torch.amp.autocast("cuda", enabled=scaler is not None):
            output = model(data)
            loss = criterion(output, target)

        if scaler is not None:
            scaler.scale(loss).backward()
            scaler.unscale_(optimizer)
            torch.nn.utils.clip_grad_norm_(
                model.parameters(), max_norm=1.0
            )
            scaler.step(optimizer)
            scaler.update()
        else:
            loss.backward()
            torch.nn.utils.clip_grad_norm_(
                model.parameters(), max_norm=1.0
            )
            optimizer.step()

        total_loss += loss.item()

    return total_loss / len(dataloader)
```

## Validation Loop

```python
@torch.no_grad()
def evaluate(
    model: nn.Module,
    dataloader: DataLoader,
    criterion: nn.Module,
    device: torch.device,
) -> tuple[float, float]:
    model.eval()
    total_loss = 0.0
    correct = 0
    total = 0

    for data, target in dataloader:
        data, target = data.to(device), target.to(device)
        output = model(data)
        total_loss += criterion(output, target).item()
        correct += (output.argmax(1) == target).sum().item()
        total += target.size(0)

    return total_loss / len(dataloader), correct / total
```

## Mixed Precision Training

```python
scaler = torch.amp.GradScaler("cuda")
for data, target in dataloader:
    with torch.amp.autocast("cuda"):
        output = model(data)
        loss = criterion(output, target)
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()
    optimizer.zero_grad(set_to_none=True)
```

## Gradient Checkpointing

```python
from torch.utils.checkpoint import checkpoint

class LargeModel(nn.Module):
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = checkpoint(self.block1, x, use_reentrant=False)
        x = checkpoint(self.block2, x, use_reentrant=False)
        return self.head(x)
```

## torch.compile

```python
model = MyModel().to(device)
model = torch.compile(model, mode="reduce-overhead")
# Modes: "default" (safe), "reduce-overhead" (faster), "max-autotune" (fastest)
```
