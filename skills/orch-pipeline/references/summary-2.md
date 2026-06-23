- **5. Review** — `code-reviewer` agent / `/code-review`. Add `security-reviewer`
  whenever the diff touches a security trigger (below).
- **6. Commit** — conventional commits (`feat:` / `fix:` / `refactor:` / …), one
  per logical chunk. → **GATE 2.**

## The two gates

This family is **gated, not autonomous**:

1. **GATE 1 — after Plan.** Present the `task_list`; do not write implementation
   code until the user approves.
2. **GATE 2 — before Commit.** Present the diff summary and proposed messages;
   do not commit until the user confirms.

Everything between the gates flows without stopping.

## Agent / command map

---

For additional details, continue reading `summary-1.md`.
