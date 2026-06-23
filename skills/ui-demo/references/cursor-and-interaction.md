---
name: ui-demo-cursor-and-interaction
description: Reference snippets for the ui-demo skill covering the SVG cursor overlay, move-and-click helper, and slow-typing helper used during Playwright demo video recording.
origin: ECC
---

# UI Demo Cursor and Interaction Helpers

## Cursor Overlay

```javascript
async function injectCursor(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-cursor')) return;
    const cursor = document.createElement('div');
    cursor.id = 'demo-cursor';
    cursor.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="white" stroke="black" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`;
    cursor.style.cssText = 'position:fixed;z-index:999999;pointer-events:none;width:24px;height:24px;transition:left 0.1s,top 0.1s;filter:drop-shadow(1px 1px 2px rgba(0,0,0,0.3))';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  });
}
```

Call `injectCursor(page)` after every navigation because the overlay is destroyed on navigate.

## Move and Click

```javascript
async function moveAndClick(page, locator, label, opts = {}) {
  const { postClickDelay = 800, ...clickOpts } = opts;
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  if (!await el.isVisible().catch(() => false)) {
    console.error(`WARNING: moveAndClick skipped - "${label}" not visible`);
    return false;
  }
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const box = await el.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 });
    await page.waitForTimeout(400);
  }
  await el.click(clickOpts);
  await page.waitForTimeout(postClickDelay);
  return true;
}
```

## Type Slowly

```javascript
async function typeSlowly(page, locator, text, label, charDelay = 35) {
  const el = typeof locator === 'string' ? page.locator(locator).first() : locator;
  if (!await el.isVisible().catch(() => false)) {
    console.error(`WARNING: typeSlowly skipped - "${label}" not visible`);
    return false;
  }
  await moveAndClick(page, el, label);
  await el.fill('');
  await el.pressSequentially(text, { delay: charDelay });
  await page.waitForTimeout(500);
  return true;
}
```
