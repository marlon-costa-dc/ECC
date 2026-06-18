info = JOBOBJECT_BASIC_LIMIT_INFORMATION()
    info.LimitFlags = JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE
    ok = kernel32.SetInformationJobObject(job, 2, ctypes.byref(info), ctypes.sizeof(info))
    if not ok:
        raise ctypes.WinError()
    kernel32.AssignProcessToJobObject(job, hproc)
    kernel32.CloseHandle(hproc)
    return job  # keep alive — job closes (kills proc) when GC'd

# After proc = subprocess.Popen(...):  job = restrict_process(proc.pid)
```

### Tier 3 — Windows Sandbox (CI full-OS isolation)

When you need a clean Windows image per run (no leftover registry keys, no
shared GPU state, true isolation), run the **entire test suite** inside
[Windows Sandbox](https://learn.microsoft.com/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-overview).

**Requirement:** Windows 10/11 Pro or Enterprise, Virtualization enabled.

Create `e2e-sandbox.wsb` in your project root:

```xml
<Configuration>
  <MappedFolders>
    <!-- App binary (read-only) -->
    <MappedFolder>
      <HostFolder>C:\path\to\your\build\Release</HostFolder>
      <SandboxFolder>C:\app</SandboxFolder>
      <ReadOnly>true</ReadOnly>
    </MappedFolder>
    <!-- Test suite (read-write for artifacts) -->
    <MappedFolder>
      <HostFolder>C:\path\to\your\e2e_test</HostFolder>
      <SandboxFolder>C:\e2e_test</SandboxFolder>
      <ReadOnly>false</ReadOnly>
    </MappedFolder>
  </MappedFolders>
  <LogonCommand>
    <!--
      Windows Sandbox starts with no Python. Install it silently first,
      then install deps and run tests. Artifacts are written back to the
      host via the MappedFolder above.
    -->
    <Command>powershell -Command "
      winget install --id Python.Python.3.11 --silent --accept-package-agreements;
      $env:PATH += ';' + $env:LOCALAPPDATA + '\Programs\Python\Python311\Scripts';
      cd C:\e2e_test;
      pip install -r requirements.txt;
      pytest tests\ -v
    "</Command>
  </LogonCommand>
</Configuration>
```

Launch: `WindowsSandbox.exe e2e-sandbox.wsb`

> pywinauto and the app both run **inside** the sandbox (same session required).
> Artifacts are written back to the host via the mapped folder.

## Tier comparison

| Tier | Isolation | Setup cost | Works on CI | Use when |
|------|-----------|-----------|-------------|----------|
| 1 — `tmp_path` env redirect | Filesystem | Zero | Always | Default for all tests |
| 2 — Job Object | Process tree | Low | Always | Prevent child-process escape |
| 3 — Windows Sandbox | Full OS | Medium | Needs Pro/Enterprise image | Nightly clean-room runs |

### Prevent hanging tests

Add `pytest-timeout` to cap any single test. In `pytest.ini` set `timeout = 60` and `timeout_method = thread`. Note: `thread` method cannot kill Qt app subprocesses on Windows — add `atexit.register(lambda: [p.kill() for p in psutil.Process().children(recursive=True)])` in `conftest.py` to reap orphans.

## CI/CD Integration

```yaml
# .github/workflows/e2e-desktop.yml
name: Desktop E2E
on: [push, pull_request]

jobs:
  e2e:
    runs-on: windows-latest   # real GUI environment, no Xvfb needed
    steps:
      - uses: actions/checkout@v4

- uses: actions/setup-python@v5
        with: { python-version: "3.11" }

- name: Install deps
        run: pip install pywinauto pytest pytest-html Pillow

- name: Build app
        run: cmake --build build --config Release  # adjust to your build system

- name: Run E2E
        env:
          APP_PATH: ${{ github.workspace }}\build\Release\MyApp.exe
          APP_TITLE: "My Application"
          CI: "true"
        run: pytest tests/ --html=artifacts/report.html --self-contained-html --junitxml=artifacts/results.xml -v

- uses: actions/upload-artifact@v4
        if: always()
        with:
          name: e2e-artifacts
          path: artifacts/
          retention-days: 14
```

## Qt Specific

### Enable UIA in Qt 5.x

Qt 5.x accessibility is disabled by default in some builds (especially 5.7–5.14). Set the environment variable **before** launching. Qt 6.x enables accessibility by default — skip this step for Qt 6.

```python
# conftest.py — add at module top
import os
os.environ["QT_ACCESSIBILITY"] = "1"
```

Or export it in CI:

```yaml
env:
  QT_ACCESSIBILITY: "1"
```

### Add Stable Identifiers to Qt Widgets

```cpp
// Preferred: both objectName and accessibleName
void setTestId(QWidget* w, const char* id) {
    w->setObjectName(id);
    w->setAccessibleName(id);  // becomes UIA Name property
}

// In your dialog constructor:
setTestId(ui->usernameEdit, "usernameInput");
setTestId(ui->passwordEdit, "passwordInput");
setTestId(ui->loginButton,  "btnLogin");
setTestId(ui->errorLabel,   "lblError");
```

Centralise all IDs in a header to avoid typos:

```cpp
// test_ids.h
#define TID_USERNAME   "usernameInput"
#define TID_PASSWORD   "passwordInput"
#define TID_BTN_LOGIN  "btnLogin"
#define TID_LBL_ERROR  "lblError"
```

### Qt-Specific Quirks

**QComboBox** — the dropdown is a separate top-level window:

```python
from pywinauto import Desktop

def select_combo_item(page, combo_spec, item_text):
    page.click(combo_spec)
    # Dropdown appears as a new root-level window
    # class_name varies by Qt version — verify with Accessibility Insights
    # Qt 5.x: "Qt5QWindowIcon"  |  Qt 6.x: "Qt6QWindowIcon" — verify with Accessibility Insights
    popup = Desktop(backend="uia").window(class_name_re="Qt[56]QWindowIcon")
    popup.wait("visible", timeout=5)
    popup.child_window(title=item_text).click_input()
```

**QMessageBox / QDialog** — also separate top-level windows:

```python
dlg = page.wait_window("Confirm")          # wait for dialog title
dlg.child_window(title="OK").click_input() # click button inside it
```

**QTableWidget / QTableView** — row/cell access:

```python
table = page.by_id("tblUsers").wrapper_object()
cell  = table.cell(row=0, column=1)
print(cell.window_text())
```

**Self-drawn controls** (`paintEvent`-only, `QGraphicsView`, `QOpenGLWidget`) — UIA cannot see their internals. Use the Fallback section below.

## Fallback: Screenshot Mode

When a control is not reachable via UIA (self-drawn, third-party, game engine):

```bash
pip install pyautogui Pillow opencv-python
```

```python
import pyautogui, cv2, numpy as np
from PIL import Image

---

Continue in `summary-4.md`.
