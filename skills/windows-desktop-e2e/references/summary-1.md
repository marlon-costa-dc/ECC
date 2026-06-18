def wait_until(self, fn, timeout=ACTION_TIMEOUT, interval=0.3):
        """Poll an arbitrary condition — use when UIA events are unreliable."""
        deadline = time.time() + timeout
        while time.time() < deadline:
            try:
                if fn():
                    return True
            except Exception:
                pass
            time.sleep(interval)
        raise TimeoutError(f"Condition not met within {timeout}s")

# --- Actions ---

def click(self, spec):
        self.wait_visible(spec)
        spec.click_input()

def type_text(self, spec, text):
        self.wait_visible(spec)
        ctrl = spec.wrapper_object()
        try:
            ctrl.set_edit_text(text)
        except Exception as e:
            # Qt 5.x fallback: UIA Value Pattern may be incomplete
            import sys, pywinauto.keyboard as kb
            print(f"[windows-desktop-e2e] set_edit_text failed ({e}), using keyboard fallback", file=sys.stderr)
            ctrl.click_input()
            kb.send_keys("^a")
            kb.send_keys(text, with_spaces=True)

def get_text(self, spec):
        ctrl = spec.wrapper_object()
        for attr in ("window_text", "get_value"):
            try:
                v = getattr(ctrl, attr)()
                if v:
                    return v
            except Exception:
                pass
        return ""

# --- Artifacts ---

def screenshot(self, name):
        os.makedirs(ARTIFACT_DIR, exist_ok=True)
        path = os.path.join(ARTIFACT_DIR, f"{name}.png")
        self.window.capture_as_image().save(path)
        return path
```

### login_page.py

```python
from pages.base_page import BasePage

class LoginPage(BasePage):
    @property
    def username(self): return self.by_id("usernameInput")

@property
    def password(self): return self.by_id("passwordInput")

@property
    def btn_login(self): return self.by_id("btnLogin")

@property
    def error_label(self): return self.by_id("lblError")

def login(self, user, pwd):
        self.type_text(self.username, user)
        self.type_text(self.password, pwd)
        self.click(self.btn_login)

def login_ok(self, user, pwd, main_title="Main Window"):
        self.login(user, pwd)
        return self.wait_window(main_title)

def login_fail(self, user, pwd):
        self.login(user, pwd)
        self.wait_visible(self.error_label)
        return self.get_text(self.error_label)
```

## conftest.py

> For new projects prefer the **Tier 1 sandbox fixture** (see below) — it adds filesystem isolation at zero extra cost. This basic fixture is for minimal/legacy setups only.

```python
import os, pytest
os.environ["QT_ACCESSIBILITY"] = "1"  # Required for Qt 5.x UIA support

from pywinauto import Application
from config import APP_PATH, MAIN_WINDOW_TITLE, LAUNCH_TIMEOUT, ARTIFACT_DIR

@pytest.fixture
def app(request):
    if not APP_PATH:
        pytest.exit("APP_PATH environment variable is not set", returncode=1)
    proc = Application(backend="uia").start(APP_PATH, timeout=LAUNCH_TIMEOUT)
    win  = proc.window(title=MAIN_WINDOW_TITLE)
    win.wait("visible", timeout=LAUNCH_TIMEOUT)
    yield win
    # Screenshot on failure
    if getattr(getattr(request.node, "rep_call", None), "failed", False):
        os.makedirs(ARTIFACT_DIR, exist_ok=True)
        try:
            win.capture_as_image().save(
                os.path.join(ARTIFACT_DIR, f"FAIL_{request.node.name}.png")
            )
        except Exception:
            pass
    # Graceful exit first, force-kill as fallback
    # proc is a pywinauto Application — use wait_for_process_exit(), not wait_for_process()
    try:
        win.close()
        proc.wait_for_process_exit(timeout=5)
    except Exception:
        proc.kill()

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    setattr(item, f"rep_{outcome.get_result().when}", outcome.get_result())
```

### config.py

```python
import os
APP_PATH          = os.environ.get("APP_PATH", "")           # set via env — no default path
MAIN_WINDOW_TITLE = os.environ.get("APP_TITLE", "")
LAUNCH_TIMEOUT    = int(os.environ.get("LAUNCH_TIMEOUT", "15"))
ACTION_TIMEOUT    = int(os.environ.get("ACTION_TIMEOUT", "10"))
ARTIFACT_DIR      = os.path.join(os.path.dirname(__file__), "artifacts")
```

### pytest.ini

```ini
[pytest]
testpaths = tests
markers =
    smoke: fast smoke tests for critical paths
    flaky: known-unstable tests
addopts = -v --tb=short --html=artifacts/report.html --self-contained-html
```

## Locator Strategy

```
AutomationId  >  Name (text)  >  ClassName + index  >  XPath
  (stable)         (readable)       (fragile)           (last resort)
```

Inspect with Accessibility Insights → **Properties** pane → look for `AutomationId` first.

```python
# Inspect at runtime — paste into a REPL to explore the tree
win.print_control_identifiers()
# or narrow scope:
win.child_window(auto_id="groupBox1").print_control_identifiers()
```

## Wait Patterns

```python
# Wait for control to appear
page.wait_visible(page.by_id("statusLabel"))

# Wait for control to disappear (e.g. loading spinner)
page.wait_gone(page.by_id("spinnerOverlay"))

# Wait for a dialog to pop up
dlg = page.wait_window("Confirm Delete")

# Custom condition (e.g. text changes)
page.wait_until(lambda: page.get_text(page.by_id("lblStatus")) == "Ready")
```

**Never use `time.sleep()` as primary synchronization** — use `wait()` or `wait_until()`.

## Artifact Management

```python
# Screenshot on demand
page.screenshot("after_login")

# Full-screen capture (when window is off-screen or minimised)
import pyautogui
pyautogui.screenshot("artifacts/fullscreen.png")

# Screen recording with ffmpeg (start before test, stop after)
import subprocess

def start_recording(name):
    return subprocess.Popen([
        "ffmpeg", "-f", "gdigrab", "-framerate", "10",
        "-i", "desktop", "-y", f"artifacts/videos/{name}.mp4"
    ], stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def stop_recording(proc):
    proc.stdin.write(b"q"); proc.stdin.flush(); proc.wait(timeout=10)
```

## Per-Step Trace (opt-in)

The default failure screenshot is often too thin for diagnosing flaky tests. The step-level trace below is **off by default** — enable it only when reproducing a flaky case.

### Enable

```bash
E2E_TRACE=1 pytest tests/test_login.py -v
# Include typed text in the JSONL log (DO NOT use on tests that type credentials/PII):
E2E_TRACE=1 E2E_TRACE_INCLUDE_TEXT=1 pytest ...
```

### Patch into BasePage

```python
import os, json, time
TRACE_ENABLED      = os.environ.get("E2E_TRACE") == "1"
TRACE_INCLUDE_TEXT = os.environ.get("E2E_TRACE_INCLUDE_TEXT") == "1"

class BasePage:
    _step = 0

def _trace(self, action, spec=None, text=None):
        if not TRACE_ENABLED:
            return
        BasePage._step += 1
        idx = f"{BasePage._step:03d}"
        os.makedirs(ARTIFACT_DIR, exist_ok=True)
        try:
            self.window.capture_as_image().save(
                os.path.join(ARTIFACT_DIR, f"step_{idx}_{action}.png"))
        except Exception:
            pass  # capture failure must not break the test
        rec = {
            "ts": time.time(), "step": BasePage._step, "action": action,
            "locator": getattr(spec, "criteria", None),
            "text": text if TRACE_INCLUDE_TEXT else ("<redacted>" if text else None),
        }
        with open(os.path.join(ARTIFACT_DIR, "trace.jsonl"), "a") as f:
            f.write(json.dumps(rec) + "\n")

---

Continue in `summary-2.md`.
