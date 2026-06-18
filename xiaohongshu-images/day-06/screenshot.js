const { chromium } = require('playwright');
const path = require('path');

const DIR = '/Users/bean/Documents/正窑陶瓷艺术工作室/03-网站/xiaohongshu-images/day-06';

const cards = [
  { file: 'card-01-cover.html', output: 'card-01-cover.png' },
  { file: 'card-02-incense.html', output: 'card-02-incense.png' },
  { file: 'card-03-vase.html', output: 'card-03-vase.png' },
  { file: 'card-04-box.html', output: 'card-04-box.png' },
  { file: 'card-05-set.html', output: 'card-05-set.png' },
  { file: 'card-06-ending.html', output: 'card-06-ending.png' },
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
      await page.waitForTimeout(500);
      
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
