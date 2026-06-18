const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 1536 });

  const cards = [
    'card-01-cover.html',
    'card-02-secret.html',
    'card-03-tear.html',
    'card-04-soul.html',
  ];

  for (const card of cards) {
    const out = card.replace('.html', '.png');
    await page.goto(`file://${process.cwd()}/${card}`);
    await page.screenshot({ path: out });
    console.log(`  screensotted ${card}`);
  }

  await browser.close();
})();
