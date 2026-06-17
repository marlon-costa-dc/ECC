def click(self, spec):
        self.wait_visible(spec); self._trace("click_before", spec)
        spec.click_input();      self._trace("click_after",  spec)

def type_text(self, spec, text):
        self.wait_visible(spec); self._trace("type_before", spec, text)
        # ... existing set_edit_text / keyboard fallback ...
        self._trace("type_after", spec)
```

### Caveats

- **PII / credentials**: `type_text` content is `<redacted>` by default. Never set `E2E_TRACE_INCLUDE_TEXT=1` on login or payment flows.
- **Overhead**: ~50–200ms per action + one PNG per step on disk. Don't enable on the default CI matrix — only on a dedicated flake-repro job.
- **Artifact bloat**: a long flow produces tens of MB; tune `retention-days` accordingly.
- **Parallel/rerun hygiene**: this simple example appends to `trace.jsonl` and uses a class-level counter. Clear the artifact directory before reruns, and use per-worker artifact dirs for parallel tests.
- **Coverage gap**: actions performed outside `BasePage` (raw `pywinauto` calls in test code) are not traced.

## Flaky Test Handling

```python
# Quarantine — equivalent to Playwright's test.fixme()
@pytest.mark.skip(reason="Flaky: animation race on slow CI. Issue #42")
def test_animated_transition(self, app): ...

# Skip in CI only
@pytest.mark.skipif(os.environ.get("CI") == "true", reason="Flaky in CI #43")
def test_heavy_load(self, app): ...
```

Common causes and fixes:

| Cause | Fix |
|-------|-----|
| Control not ready | Replace `time.sleep` with `wait_visible` |
| Window not focused | Add `win.set_focus()` before interactions |
| Animation in progress | `wait_until(lambda: not loading_indicator.exists())` |
| Dialog timing | `wait_window(title, timeout=15)` |
| CI display not ready | Set `DISPLAY` or use virtual desktop in CI |
| `set_edit_text` raises NotImplementedError | UIA ValuePattern missing (common on Qt 5.x) — `BasePage.type_text` already falls back to `keyboard.send_keys` |
| Control exists but `wait_visible` times out | Window minimised or off-screen — call `win.restore()` + `win.set_focus()` before waiting |

## Test Isolation & Sandbox

Three tiers of isolation — use the lightest tier that satisfies your needs.

### Tier 1 — Filesystem Isolation (default, always use)

Each test gets its own `APPDATA` / `LOCALAPPDATA` / `TEMP` via `subprocess.Popen` and `Application.connect()`. pytest's `tmp_path` fixture handles cleanup automatically.

```python
# conftest.py — replace the basic `app` fixture with this
import os, subprocess, pytest
from pywinauto import Application
from config import APP_PATH, APP_ARGS, APP_TITLE, LAUNCH_TIMEOUT, ACTION_TIMEOUT, ARTIFACT_DIR

@pytest.fixture(scope="function")
def app(request, tmp_path):
    """Fresh process + isolated user-data dirs per test."""
    if not APP_PATH:
        pytest.exit("APP_PATH not set", returncode=1)

# Redirect all per-user storage to an isolated tmp directory
    sandbox_env = os.environ.copy()
    sandbox_env["QT_ACCESSIBILITY"]  = "1"
    sandbox_env["APPDATA"]           = str(tmp_path / "AppData" / "Roaming")
    sandbox_env["LOCALAPPDATA"]      = str(tmp_path / "AppData" / "Local")
    sandbox_env["TEMP"] = sandbox_env["TMP"] = str(tmp_path / "Temp")
    for p in (sandbox_env["APPDATA"], sandbox_env["LOCALAPPDATA"], sandbox_env["TEMP"]):
        os.makedirs(p, exist_ok=True)

if not APP_TITLE:
        pytest.exit("APP_TITLE environment variable is not set", returncode=1)

# shlex.split handles quoted args with spaces; plain split() breaks on them
    import shlex
    # Launch via subprocess so we can pass env; connect pywinauto by PID
    proc = subprocess.Popen(
        [APP_PATH] + shlex.split(APP_ARGS),
        env=sandbox_env,
    )
    pw_app = Application(backend="uia").connect(process=proc.pid, timeout=LAUNCH_TIMEOUT)
    win    = pw_app.window(title=APP_TITLE)
    win.wait("visible", timeout=LAUNCH_TIMEOUT)
    yield win

if getattr(getattr(request.node, "rep_call", None), "failed", False):
        os.makedirs(ARTIFACT_DIR, exist_ok=True)
        try:
            win.capture_as_image().save(
                os.path.join(ARTIFACT_DIR, f"FAIL_{request.node.name}.png")
            )
        except Exception:
            pass
    try:
        win.close()
        proc.wait(timeout=5)
    except Exception:
        proc.kill()
    # tmp_path is cleaned up automatically by pytest

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    setattr(item, f"rep_{outcome.get_result().when}", outcome.get_result())
```

### Tier 2 — Windows Job Object (optional: process-lifetime containment)

Attach the process to a Job Object so it is **automatically terminated** when
the test fixture's job handle is GC'd. Also prevents the app from spawning
child processes that escape fixture cleanup.

> **Scope of isolation:** Job Objects do NOT virtualize filesystem access or
> block network traffic. File-write and network isolation require AppContainer,
> Windows Firewall rules, or Tier 3 (Windows Sandbox). Use Tier 2 only for
> process-lifetime and child-process containment.

Requires no extra dependencies.

```python
import ctypes, ctypes.wintypes as wt

def restrict_process(pid: int):
    """
    Attach the process to a Job Object that prevents it from:
    - spawning processes outside the job (LIMIT_KILL_ON_JOB_CLOSE)
    Does NOT block network — use Windows Firewall rules for that.
    """
    JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE = 0x00002000
    # Minimal rights: SET_QUOTA (0x0100) | TERMINATE (0x0001)
    PROCESS_SET_QUOTA_AND_TERMINATE    = 0x0101

kernel32 = ctypes.windll.kernel32
    job   = kernel32.CreateJobObjectW(None, None)
    hproc = kernel32.OpenProcess(PROCESS_SET_QUOTA_AND_TERMINATE, False, pid)

# Correct struct layout — LimitFlags is at offset +16, not +44
    class JOBOBJECT_BASIC_LIMIT_INFORMATION(ctypes.Structure):
        _fields_ = [
            ("PerProcessUserTimeLimit", wt.LARGE_INTEGER),
            ("PerJobUserTimeLimit",     wt.LARGE_INTEGER),
            ("LimitFlags",             wt.DWORD),
            ("MinimumWorkingSetSize",   ctypes.c_size_t),
            ("MaximumWorkingSetSize",   ctypes.c_size_t),
            ("ActiveProcessLimit",      wt.DWORD),
            ("Affinity",               ctypes.c_size_t),
            ("PriorityClass",          wt.DWORD),
            ("SchedulingClass",        wt.DWORD),
        ]

---

Continue in `summary-3.md`.
