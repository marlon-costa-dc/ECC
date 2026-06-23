# Windows Desktop E2E Testing

End-to-end testing for Windows native desktop applications using **pywinauto** backed by Windows UI Automation (UIA). Covers WPF, WinForms, Win32/MFC, and Qt (5.x / 6.x) — with Qt-specific guidance as a dedicated section.

## When to Activate

- Writing or running E2E tests for a Windows native desktop application
- Setting up a desktop GUI test suite from scratch
- Diagnosing flaky or failing desktop automation tests
- Adding testability (AutomationId, accessible names) to an existing app
- Integrating desktop E2E into a CI/CD pipeline (GitHub Actions `windows-latest`)

### When NOT to Use

- Web applications → use `e2e-testing` skill (Playwright)
- Electron / CEF / WebView2 apps → the HTML layer needs browser automation, not UIA
- Mobile apps → use platform-specific tools (UIAutomator, XCUITest)
- Pure unit or integration tests that don't need a running GUI

## Core Concepts

All Windows desktop automation relies on **UI Automation (UIA)**, a Windows-built-in accessibility API. Every supported framework exposes a tree of UIA elements with properties Claude can read and act on:

[See code example 1 in `code-examples.md`]

**UIA quality by framework:**

| Framework | AutomationId | Reliability | Notes |
|-----------|-------------|-------------|-------|
| WPF | ★★★★★ | Excellent | `x:Name` maps directly to AutomationId |
| WinForms | ★★★★☆ | Good | `AccessibleName` = AutomationId |
| UWP / WinUI 3 | ★★★★★ | Excellent | Full Microsoft support |
| Qt 6.x | ★★★★★ | Excellent | Accessibility enabled by default; class names change to `Qt6*` |
| Qt 5.15+ | ★★★★☆ | Good | Improved Accessibility module |
| Qt 5.7–5.14 | ★★★☆☆ | Fair | Needs `QT_ACCESSIBILITY=1`; objectName manual |
| Win32 / MFC | ★★★☆☆ | Fair | Control IDs accessible; text matching common |

## Setup & Prerequisites

[See code example 2 in `code-examples.md`]

Verify UIA is reachable:

[See code example 3 in `code-examples.md`]

Install **Accessibility Insights for Windows** (free, from Microsoft) — your DevTools equivalent for inspecting the UIA element tree before writing any test.

## Testability Setup (by Framework)

The single most impactful thing you can do is **give every interactive control a stable AutomationId** before writing tests.

### WPF

[See code example 4 in `code-examples.md`]

### WinForms

[See code example 5 in `code-examples.md`]

### Win32 / MFC

[See code example 6 in `code-examples.md`]

### Qt — see dedicated section below

---

## Page Object Model

[See code example 7 in `code-examples.md`]

### base_page.py

```python
import os, time
from pywinauto import Desktop
from config import ACTION_TIMEOUT, ARTIFACT_DIR

class BasePage:
    def __init__(self, window):
        self.window = window

# --- Locators (priority order) ---

def by_id(self, auto_id, **kw):
        """AutomationId — most stable. Use as first choice."""
        return self.window.child_window(auto_id=auto_id, **kw)

def by_name(self, name, **kw):
        """Visible text / accessible name."""
        return self.window.child_window(title=name, **kw)

def by_class(self, cls, index=0, **kw):
        """Control class + index — fragile, avoid if possible."""
        return self.window.child_window(class_name=cls, found_index=index, **kw)

# --- Waits ---

def wait_visible(self, spec, timeout=ACTION_TIMEOUT):
        spec.wait("visible", timeout=timeout)
        return spec

def wait_gone(self, spec, timeout=ACTION_TIMEOUT):
        spec.wait_not("visible", timeout=timeout)
        return spec

def wait_window(self, title, timeout=ACTION_TIMEOUT):
        """Wait for a new top-level window (dialogs, child windows)."""
        dlg = Desktop(backend="uia").window(title=title)
        dlg.wait("visible", timeout=timeout)
        return dlg

---

For additional details, continue reading `summary-1.md`, `summary-2.md`, `summary-3.md`, `summary-4.md`.
