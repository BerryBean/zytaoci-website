const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 1536 });

  const base = 'file:///Users/bean/WorkBuddy/2026-06-06-04-14-54/%E6%AD%A3%E7%AA%91%E9%99%B6%E7%93%B7%E8%89%BA%E6%9C%AF%E5%B7%A5%E4%BD%9C%E5%AE%A4/03-%E7%BD%91%E7%AB%99/xiaohongshu-images/day-01-promo/';
  const cards = ['card1','card2','card3','card4'];

  for (const name of cards) {
    await page.goto(base + name + '.html');
    await page.waitForTimeout(600);
    await page.screenshot({ path: name + '.png' });
    console.log('✅ ' + name + '.png 生成完成');
  }

  await browser.close();
  console.log('Day 1 promo 图片全部完成！');
})();
