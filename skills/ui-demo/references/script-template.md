---
name: ui-demo-script-template
description: Complete starter script template for the ui-demo skill, demonstrating how to wire the recording helpers into a Playwright session with separate rehearsal and recording modes and stable video output naming.
origin: ECC
---

# UI Demo Script Template

```javascript
'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = process.env.QA_BASE_URL || 'http://localhost:3000';
const VIDEO_DIR = path.join(__dirname, 'videos');
const OUTPUT_NAME = 'demo-FEATURE.webm';
const REHEARSAL = process.argv.includes('--rehearse');

// Paste helpers from recording-helpers.md here.

(async () => {
  const browser = await chromium.launch({ headless: true });

  if (REHEARSAL) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();
    // Run ensureVisible for each selector.
    await browser.close();
    return;
  }

  const context = await browser.newContext({
    recordVideo: { dir: VIDEO_DIR, size: { width: 1280, height: 720 } },
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  try {
    await injectCursor(page);
    await injectSubtitleBar(page);

    await showSubtitle(page, 'Step 1 - Logging in');
    // Login actions.

    await page.goto(`${BASE_URL}/dashboard`);
    await injectCursor(page);
    await injectSubtitleBar(page);
    await showSubtitle(page, 'Step 2 - Dashboard overview');
    // Pan dashboard.

    await showSubtitle(page, 'Step 3 - Main workflow');
    // Action sequence.

    await showSubtitle(page, 'Step 4 - Result');
    await showSubtitle(page, '');
  } catch (err) {
    console.error('DEMO ERROR:', err.message);
  } finally {
    await context.close();
    const video = page.video();
    if (video) {
      const src = await video.path();
      const dest = path.join(VIDEO_DIR, OUTPUT_NAME);
      try {
        fs.copyFileSync(src, dest);
        console.log('Video saved:', dest);
      } catch (e) {
        console.error('ERROR: Failed to copy video:', e.message);
      }
    }
    await browser.close();
  }
})();
```

Run rehearsal with `node demo-script.cjs --rehearse`, then record with `node demo-script.cjs`.
