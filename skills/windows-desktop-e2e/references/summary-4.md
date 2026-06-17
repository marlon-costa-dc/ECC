def find_image_on_screen(template_path, confidence=0.85):
    """Locate a template image on screen. Returns (x, y) center or None."""
    screen   = np.array(pyautogui.screenshot())
    template = np.array(Image.open(template_path))
    result   = cv2.matchTemplate(
        cv2.cvtColor(screen, cv2.COLOR_RGB2BGR),
        cv2.cvtColor(template, cv2.COLOR_RGB2BGR),
        cv2.TM_CCOEFF_NORMED,
    )
    _, max_val, _, max_loc = cv2.minMaxLoc(result)
    if max_val >= confidence:
        h, w = template.shape[:2]
        return max_loc[0] + w // 2, max_loc[1] + h // 2
    return None

def click_image(template_path, confidence=0.85):
    pos = find_image_on_screen(template_path, confidence)
    if pos is None:
        raise RuntimeError(f"Image not found on screen: {template_path}")
    pyautogui.click(*pos)
```

### DPI / Scaling Rules (screenshot mode only)

Screenshot matching is brutally sensitive to Windows display scaling (100% / 125% / 150%). Three hard rules:

1. **Capture templates at the same scale as the target machine.** Don't try to rescue a mismatch with `PIL.Image.resize` — `cv2.matchTemplate` is very fragile against resampling artefacts.
2. **Pin the CI display scaling.** On `windows-latest` add a step like `Set-DisplayResolution 1920 1080 -Force` and disable per-monitor DPI scaling, so screenshot dimensions are reproducible.
3. **Record the scale alongside each artefact.** On capture, write `GetDpiForWindow(hwnd) / 96` to `artifacts/<test>/metadata.json` — postmortems become obvious instead of guess-work.

> Process-level DPI awareness (`SetProcessDpiAwarenessContext`) **can conflict with Qt's own DPI handling** when the app under test is Qt-based. Prefer "same-scale templates + CI pin" over flipping process-wide DPI mode in fixtures.

### Debugging Match Confidence

When tuning the `confidence` threshold, the only sane workflow is to **see** where the match landed. The helper below is diagnosis-only — do not call it from test code.

```python
def debug_match(template_path, out="artifacts/match_debug.png", confidence=0.85):
    """Diagnosis-only. Draw the best-match rectangle + score back on the current screen.

NOT for production tests — use when calibrating confidence or chasing false matches.
    """
    import os, cv2, pyautogui, numpy as np
    screen = np.array(pyautogui.screenshot())[:, :, ::-1]
    tpl    = cv2.imread(template_path)
    if tpl is None:
        raise RuntimeError(f"Template unreadable: {template_path}")
    res    = cv2.matchTemplate(screen, tpl, cv2.TM_CCOEFF_NORMED)
    _, mv, _, ml = cv2.minMaxLoc(res)
    h, w   = tpl.shape[:2]
    colour = (0, 255, 0) if mv >= confidence else (0, 0, 255)  # green pass / red fail
    cv2.rectangle(screen, ml, (ml[0]+w, ml[1]+h), colour, 2)
    cv2.putText(screen, f"score={mv:.3f} thr={confidence}",
                (ml[0], max(20, ml[1]-6)),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, colour, 2)
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    cv2.imwrite(out, screen)
    return mv
```

**Use sparingly** — image matching breaks on DPI changes, theme switches, and partial occlusion.
Always try UIA first; fall back to screenshots only for genuinely unreachable controls.

## Anti-Patterns

```python
# BAD: fixed sleep
time.sleep(3)
page.click(page.by_id("btnSubmit"))

# GOOD: condition wait
page.wait_visible(page.by_id("btnSubmit"))
page.click(page.by_id("btnSubmit"))
```

```python
# BAD: brittle class+index locator as primary strategy
page.by_class("Edit", index=2).type_keys("hello")

# GOOD: AutomationId
page.by_id("usernameInput").set_edit_text("hello")
```

```python
# BAD: assert on pixel coordinates
assert btn.rectangle().left == 120

# GOOD: assert on content / state
assert page.get_text(page.by_id("lblStatus")) == "Logged in"
assert page.by_id("btnLogout").is_enabled()
```

```python
# BAD: share app instance across all tests (state leaks)
@pytest.fixture(scope="session")
def app(): ...

# GOOD: fresh process per test (or per class at most)
@pytest.fixture(scope="function")
def app(): ...
```

## Running Tests

```bash
# All tests
pytest tests/ -v

# Smoke only
pytest tests/ -m smoke -v

# Specific file
pytest tests/test_login.py -v

# With custom app path
APP_PATH="C:\build\Release\MyApp.exe" APP_TITLE="MyApp" pytest tests/ -v

# Detect flaky tests (repeat each 5 times)
pip install pytest-repeat
pytest tests/test_login.py --count=5 -v
```

## Related Skills

- `e2e-testing` — Playwright E2E for web applications
- `cpp-testing` — C++ unit/integration testing with GoogleTest
- `cpp-coding-standards` — C++ code style and patterns
