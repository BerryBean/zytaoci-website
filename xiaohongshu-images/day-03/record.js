const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    recordVideo: {
      dir: __dirname,
      size: { width: 1080, height: 1920 }
    }
  });

  const page = await context.newPage();
  await page.goto('http://localhost:8263/showcase.html', { waitUntil: 'networkidle' });

  // Wait for model-viewer GLB model to load
  await page.evaluate(() => {
    return new Promise((resolve) => {
      const viewer = document.querySelector('model-viewer');
      if (!viewer) { resolve(); return; }
      const check = () => {
        const canvas = viewer.shadowRoot ? viewer.shadowRoot.querySelector('canvas') : null;
        if (canvas || viewer.loaded) { resolve(); return; }
        setTimeout(check, 200);
      };
      viewer.addEventListener('load', () => resolve());
      setTimeout(check, 500);
    });
  });

  // Record ~36s to have enough buffer
  await page.waitForTimeout(36000);

  await context.close();
  await browser.close();
  console.log('Recording complete');
})();
