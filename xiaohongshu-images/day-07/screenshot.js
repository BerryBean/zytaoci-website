const { chromium } = require('playwright');
const path = require('path');

const DIR = '/Users/bean/Documents/正窑陶瓷艺术工作室/03-网站/xiaohongshu-images/day-07';

const cards = [
  { file: 'card-01-cover.html', output: 'card-01-cover.png' },
  { file: 'card-02-questions.html', output: 'card-02-questions.png' },
  { file: 'card-03-print.html', output: 'card-03-print.png' },
  { file: 'card-04-steps.html', output: 'card-04-steps.png' },
  { file: 'card-05-craftsman.html', output: 'card-05-craftsman.png' },
  { file: 'card-06-closing.html', output: 'card-06-closing.png' },
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
