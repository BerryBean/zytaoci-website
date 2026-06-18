const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const DIR = '/Users/bean/WorkBuddy/2026-06-06-04-14-54/正窑陶瓷艺术工作室/03-网站/xiaohongshu-images/day-02';

const cards = [
  { file: 'card-01-cover.html', output: 'day02-promo-01-cover.png' },
  { file: 'card-02-step1.html', output: 'day02-promo-02-step1.png' },
  { file: 'card-03-step2.html', output: 'day02-promo-03-step2.png' },
  { file: 'card-04-step3.html', output: 'day02-promo-04-step3.png' },
  { file: 'card-05-step4.html', output: 'day02-promo-05-step4.png' },
  { file: 'card-06-ending.html', output: 'day02-promo-06-ending.png' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 1536 });

  for (const card of cards) {
    const filePath = path.join(DIR, card.file);
    const fileUrl = `file://${filePath}`;
    console.log(`Screenshotting: ${card.file}`);
    
    try {
      await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(500); // Wait a bit for images to render
      
      await page.screenshot({
        path: path.join(DIR, card.output),
        clip: { x: 0, y: 0, width: 1024, height: 1536 }
      });
      console.log(`  -> Saved: ${card.output}`);
    } catch (err) {
      console.error(`  -> ERROR on ${card.file}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('All screenshots completed!');
})();
