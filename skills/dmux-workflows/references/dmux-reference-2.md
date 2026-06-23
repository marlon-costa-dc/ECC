  "workers": [
    { "name": "seed-check", "task": "Verify seeded files are present before starting work." }
  ]
}
```

## Troubleshooting

- **Pane not responding:** Switch to the pane directly or inspect it with `tmux capture-pane -pt <session>:0.<pane-index>`.
- **Merge conflicts:** Use git worktrees to isolate file changes per pane.
- **High token usage:** Reduce the number of parallel panes. Each pane is a full agent session.
- **tmux not found:** Install with `brew install tmux` (macOS) or `apt install tmux` (Linux).
