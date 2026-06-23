# PyTorch Data and Checkpoint Examples

## Custom Dataset

```python
class ImageDataset(Dataset):
    def __init__(
        self,
        image_dir: str,
        labels: dict[str, int],
        transform: transforms.Compose | None = None,
    ) -> None:
        self.image_paths = list(Path(image_dir).glob("*.jpg"))
        self.labels = labels
        self.transform = transform

    def __len__(self) -> int:
        return len(self.image_paths)

    def __getitem__(self, idx: int) -> tuple[torch.Tensor, int]:
        img = Image.open(self.image_paths[idx]).convert("RGB")
        label = self.labels[self.image_paths[idx].stem]
        if self.transform:
            img = self.transform(img)
        return img, label
```

## Efficient DataLoader

```python
dataloader = DataLoader(
    dataset,
    batch_size=32,
    shuffle=True,
    num_workers=4,
    pin_memory=True,
    persistent_workers=True,
    drop_last=True,
)
```

## Custom Collate for Variable-Length Data

```python
def collate_fn(
    batch: list[tuple[torch.Tensor, int]]
) -> tuple[torch.Tensor, torch.Tensor]:
    sequences, labels = zip(*batch)
    padded = nn.utils.rnn.pad_sequence(
        sequences, batch_first=True, padding_value=0
    )
    return padded, torch.tensor(labels)

dataloader = DataLoader(dataset, batch_size=32, collate_fn=collate_fn)
```

## Save and Load Checkpoints

```python
def save_checkpoint(
    model: nn.Module,
    optimizer: torch.optim.Optimizer,
    epoch: int,
    loss: float,
    path: str,
) -> None:
    torch.save(
        {
            "epoch": epoch,
            "model_state_dict": model.state_dict(),
            "optimizer_state_dict": optimizer.state_dict(),
            "loss": loss,
        },
        path,
    )

def load_checkpoint(
    path: str,
    model: nn.Module,
    optimizer: torch.optim.Optimizer | None = None,
) -> dict:
    checkpoint = torch.load(
        path, map_location="cpu", weights_only=True
    )
    model.load_state_dict(checkpoint["model_state_dict"])
    if optimizer:
        optimizer.load_state_dict(checkpoint["optimizer_state_dict"])
    return checkpoint
```
