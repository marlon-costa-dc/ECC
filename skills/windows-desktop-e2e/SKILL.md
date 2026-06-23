---
name: windows-desktop-e2e
description: E2E testing for Windows native desktop apps (WPF, WinForms, Win32/MFC,
  Qt) using pywinauto and Windows UI Automation.
origin: ECC
---

# Windows Desktop E2E Testing

End-to-end testing for Windows native desktop applications using **pywinauto** backed by Windows UI Automation (UIA). Covers WPF, WinForms, Win32/MFC, and Qt (5.x / 6.x) — with Qt-specific guidance as a dedicated section.

## When to Use

- Writing or running E2E tests for a Windows native desktop application
- Setting up a desktop GUI test suite from scratch
- Diagnosing flaky or failing desktop automation tests
- Adding testability (AutomationId, accessible names) to an existing app
- Integrating desktop E2E into a CI/CD pipeline (GitHub Actions windows-latest)

## Workflow

1. spawning processes outside the job (LIMIT_KILL_ON_JOB_CLOSE)

For full details, examples, edge cases, and reference material, read `references/summary.md`.
