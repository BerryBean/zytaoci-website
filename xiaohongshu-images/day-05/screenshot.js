/**
 * Screenshot script for Day 5 cards
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const DAY_DIR = '/Users/bean/Documents/正窑陶瓷艺术工作室/03-网站/xiaohongshu-images/day-05';

const cardFiles = [
  'card-01-cover.html',
  'card-02-scene.html',
  'card-03-teapot.html',
  'card-04-cups.html',
  'card-05-design.html',
  'card-06-ending.html',
];

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const cardFile of cardFiles) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1024, height: 1536 });

    const cardPath = path.join(DAY_DIR, cardFile);
    const cardUrl = `file://${cardPath}`;

    console.log(`Screenshotting: ${cardFile}...`);
    await page.goto(cardUrl, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(500);

    const pngName = cardFile.replace('.html', '.png');
    const outputPath = path.join(DAY_DIR, pngName);
    await page.screenshot({ path: outputPath, fullPage: false });

    const stat = fs.statSync(outputPath);
    console.log(`  -> ${pngName} (${(stat.size / 1024).toFixed(1)} KB)`);

    await page.close();
  }

  await browser.close();

  console.log('\n--- Verification ---');
  const { execSync } = require('child_process');
  const hashes = new Map();
  let allUnique = true;
  for (const cardFile of cardFiles) {
    const pngName = cardFile.replace('.html', '.png');
    const pngPath = path.join(DAY_DIR, pngName);
    const hash = execSync(`md5 -q "${pngPath}"`).toString().trim();
    if (hashes.has(hash)) {
      console.log(`  ⚠️  DUPLICATE: ${pngName} == ${hashes.get(hash)}`);
      allUnique = false;
    } else {
      hashes.set(hash, pngName);
      console.log(`  ✓  UNIQUE: ${pngName}`);
    }
  }
  if (allUnique) console.log('\n✅ All 6 card screenshots are distinct!');
  else console.log('\n⚠️  Some cards look too similar.');
})();
