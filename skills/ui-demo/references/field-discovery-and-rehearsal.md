---
name: ui-demo-field-discovery-and-rehearsal
description: Reference snippets for the ui-demo skill covering field discovery on target pages and a rehearsal helper that verifies every selector resolves before recording begins.
origin: ECC
---

# UI Demo Field Discovery and Rehearsal

## Field Discovery

Run this on every page before scripting:

```javascript
const fields = await page.evaluate(() => {
  const els = [];
  document.querySelectorAll('input, select, textarea, button, [contenteditable]').forEach(el => {
    if (el.offsetParent !== null) {
      els.push({
        tag: el.tagName,
        type: el.type || '',
        name: el.name || '',
        placeholder: el.placeholder || '',
        text: el.textContent?.trim().substring(0, 40) || '',
        contentEditable: el.contentEditable === 'true',
        role: el.getAttribute('role') || '',
      });
    }
  });
  return els;
});
console.log(JSON.stringify(fields, null, 2));
```

For `<select>` elements, also dump options:

```javascript
Array.from(el.options).map(o => ({ value: o.value, text: o.text }))
```

## Rehearsal Helper

```javascript
async function ensureVisible(page, locator, label) {
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  const visible = await el.isVisible().catch(() => false);
  if (!visible) {
    console.error(`REHEARSAL FAIL: "${label}" not found`);
    return false;
  }
  console.log(`REHEARSAL OK: "${label}"`);
  return true;
}
```
