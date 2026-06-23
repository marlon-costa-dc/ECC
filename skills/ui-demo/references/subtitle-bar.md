---
name: ui-demo-subtitle-bar
description: Reference snippet for the ui-demo skill covering the subtitle bar injection and showSubtitle helper used to annotate Playwright demo videos during recording.
origin: ECC
---

# UI Demo Subtitle Bar

```javascript
async function injectSubtitleBar(page) {
  await page.evaluate(() => {
    if (document.getElementById('demo-subtitle')) return;
    const bar = document.createElement('div');
    bar.id = 'demo-subtitle';
    bar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:999998;text-align:center;padding:12px 24px;background:rgba(0,0,0,0.75);color:white;font-family:-apple-system,"Segoe UI",sans-serif;font-size:16px;font-weight:500;transition:opacity 0.3s;pointer-events:none';
    bar.style.opacity = '0';
    document.body.appendChild(bar);
  });
}

async function showSubtitle(page, text) {
  await page.evaluate((t) => {
    const bar = document.getElementById('demo-subtitle');
    if (!bar) return;
    bar.textContent = t || '';
    bar.style.opacity = t ? '1' : '0';
  }, text);
  if (text) await page.waitForTimeout(800);
}
```
