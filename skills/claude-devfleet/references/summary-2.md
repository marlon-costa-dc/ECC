1. `create_project(name="My Project")` → returns `project_id`.
2. `create_mission(project_id=project_id, title="...", prompt="...", auto_dispatch=true)` for the first (root) mission → capture `root_mission_id`.
   `create_mission(project_id=project_id, title="...", prompt="...", auto_dispatch=true, depends_on=["<root_mission_id>"])` for each subsequent task.
3. `dispatch_mission(mission_id=...)` on the first mission to start the chain.
4. `get_report(mission_id=...)` when done.

### Sequential with review

1. `create_project(name="...")` → get `project_id`.
2. `create_mission(project_id=project_id, title="Implement feature", prompt="...")` → get `impl_mission_id`.
3. `dispatch_mission(mission_id=impl_mission_id)`, then poll with `get_mission_status` until complete.
4. `get_report(mission_id=impl_mission_id)` to review results.
5. `create_mission(project_id=project_id, title="Review", prompt="...", depends_on=[impl_mission_id], auto_dispatch=true)` — auto-starts since the dependency is already met.

## Guidelines

---

For additional details, continue reading `summary-1.md`.
