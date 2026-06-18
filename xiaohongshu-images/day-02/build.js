const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const DIR = '/Users/bean/WorkBuddy/2026-06-06-04-14-54/正窑陶瓷艺术工作室/03-网站/xiaohongshu-images/day-02';

// Read image and convert to base64
function img2base64(filepath) {
  const data = fs.readFileSync(filepath);
  const ext = path.extname(filepath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${data.toString('base64')}`;
}

const teapotImg = img2base64(path.join(DIR, 'teapot-set.png'));
const cupImg = img2base64(path.join(DIR, 'cup1.png'));

// Card 1: Cover
const card1 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#F8F4EF; font-family:sans-serif; }
.bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.13; }
.overlay { position:absolute; inset:0; background:linear-gradient(180deg,rgba(248,244,239,0.7),rgba(248,244,239,0.95)); }
.c { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
.brand { font-size:15px; color:#8B7355; letter-spacing:8px; margin-bottom:40px; font-family:'Noto Sans SC',sans-serif; }
.title { font-size:48px; color:#2C2C2C; font-weight:700; letter-spacing:6px; text-align:center; line-height:1.4; font-family:'Noto Serif SC',serif; }
.div { width:80px; height:2px; background:#8B7355; margin:36px auto; }
.sub { font-size:20px; color:#8B7355; letter-spacing:4px; }
.steps { display:flex; gap:36px; margin-top:60px; }
.step { text-align:center; }
.sn { width:56px; height:56px; border-radius:50%; background:#8B7355; color:#fff; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:700; font-family:Inter,sans-serif; margin:0 auto 10px; }
.sl { font-size:14px; color:#666; letter-spacing:2px; font-family:'Noto Sans SC',sans-serif; }
.ft { position:absolute; bottom:56px; left:0; right:0; text-align:center; font-size:13px; color:#bbb; letter-spacing:5px; font-family:'Noto Sans SC',sans-serif; }
</style></head><body>
<img class="bg" src="${teapotImg}">
<div class="overlay"></div>
<div class="c">
  <div class="brand">正窑 · ZHENGYAO</div>
  <div class="title">一只 3D 打印茶壶<br>要经历 4 步</div>
  <div class="div"></div>
  <div class="sub">每步缺一不可</div>
  <div class="steps">
    <div class="step"><div class="sn">1</div><div class="sl">数字建模</div></div>
    <div class="step"><div class="sn">2</div><div class="sl">3D 打印</div></div>
    <div class="step"><div class="sn">3</div><div class="sl">手工上釉</div></div>
    <div class="step"><div class="sn">4</div><div class="sl">高温烧制</div></div>
  </div>
</div>
<div class="ft">数字时代的手工精神工房</div>
</body></html>`;

// Card 2: Step 1
const card2 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#F8F4EF; font-family:sans-serif; }
.bg { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:900px; height:900px; object-fit:contain; opacity:0.2; }
.t { position:absolute; top:120px; left:80px; right:80px; }
.tag { display:inline-block; background:#8B7355; color:#fff; padding:5px 18px; border-radius:16px; font-size:13px; letter-spacing:2px; font-family:'Noto Sans SC',sans-serif; margin-bottom:20px; }
.h { font-size:52px; color:#2C2C2C; font-weight:700; letter-spacing:5px; line-height:1.3; font-family:'Noto Serif SC',serif; }
.b { position:absolute; bottom:140px; left:80px; right:80px; font-size:17px; color:#555; line-height:2; font-family:'Noto Sans SC',sans-serif; }
.b strong { color:#8B7355; }
</style></head><body>
<img class="bg" src="${teapotImg}">
<div class="t">
  <div class="tag">STEP 01 · 数字建模</div>
  <div class="h">把弧线<br>算到毫米</div>
</div>
<div class="b">
  茶壶的<strong>重心</strong>在哪，倒水时手感如何，<br>
  盖子的<strong>密合度</strong>要几丝——<br><br>
  这些要在建模阶段就算清楚。<br>
  精确到毫米。<br><br>
  <strong>不是差不多，是算清楚。</strong>
</div>
</body></html>`;

// Card 3: Step 2
const card3 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#2C2C2C; font-family:sans-serif; }
.bg { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:850px; height:850px; object-fit:contain; opacity:0.25; }
.t { position:absolute; top:120px; left:80px; right:80px; }
.tag { display:inline-block; border:1px solid rgba(255,255,255,0.4); color:rgba(255,255,255,0.8); padding:5px 18px; border-radius:16px; font-size:13px; letter-spacing:2px; font-family:'Noto Sans SC',sans-serif; margin-bottom:20px; }
.h { font-size:52px; color:#F5F0E8; font-weight:700; letter-spacing:5px; line-height:1.3; font-family:'Noto Serif SC',serif; }
.b { position:absolute; bottom:140px; left:80px; right:80px; font-size:17px; color:rgba(255,255,255,0.55); line-height:2; font-family:'Noto Sans SC',sans-serif; }
</style></head><body>
<img class="bg" src="${teapotImg}">
<div class="t">
  <div class="tag">STEP 02 · 3D 打印</div>
  <div class="h">像蛋糕裱花<br>一层一层</div>
</div>
<div class="b">
  把定窑白瓷泥调成膏状，<br>
  像蛋糕裱花一样，<br>
  一层一层堆出器物的雏形。<br><br>
  这不是炫技，是解题。<br>
  不是所有形态都能用手工成形。
</div>
</body></html>`;

// Card 4: Step 3
const card4 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:linear-gradient(170deg,#F8F4EF,#E8E0D3); font-family:sans-serif; }
.bg { position:absolute; bottom:0; right:-60px; width:700px; height:700px; object-fit:contain; opacity:0.5; }
.t { position:absolute; top:140px; left:80px; width:520px; }
.tag { display:inline-block; background:#8B7355; color:#fff; padding:5px 18px; border-radius:16px; font-size:13px; letter-spacing:2px; font-family:'Noto Sans SC',sans-serif; margin-bottom:20px; }
.h { font-size:48px; color:#2C2C2C; font-weight:700; letter-spacing:5px; line-height:1.3; font-family:'Noto Serif SC',serif; }
.body { margin-top:32px; font-size:17px; color:#555; line-height:2; font-family:'Noto Sans SC',sans-serif; }
.hl { color:#8B7355; font-weight:600; }
</style></head><body>
<img class="bg" src="${cupImg}">
<div class="t">
  <div class="tag">STEP 03 · 手工上釉</div>
  <div class="h">打印完<br>只是半成品</div>
  <div class="body">
    素烧后，<span class="hl">手工施透明釉</span>。<br>
    这一步，是<span class="hl">手的温度</span>。<br><br>
    上得太厚，烧出来会流釉；<br>
    太薄，烧出来没有光泽。<br><br>
    全凭手感和经验。<br>
    <strong style="color:#8B7355;">3D 打印给不了这个。</strong>
  </div>
</div>
</body></html>`;

// Card 5: Step 4
const card5 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#3C2F1E; font-family:sans-serif; }
.bg { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:880px; height:880px; object-fit:contain; opacity:0.22; }
.c { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; padding:0 100px; text-align:center; }
.tag { display:inline-block; border:1px solid rgba(200,170,120,0.5); color:rgba(200,170,120,0.9); padding:5px 18px; border-radius:16px; font-size:13px; letter-spacing:2px; font-family:'Noto Sans SC',sans-serif; margin:0 auto 28px; width:fit-content; }
.h { font-size:52px; color:#F5EDE0; font-weight:700; letter-spacing:5px; line-height:1.4; font-family:'Noto Serif SC',serif; }
.b { margin-top:32px; font-size:17px; color:rgba(255,255,255,0.5); line-height:2; font-family:'Noto Sans SC',sans-serif; }
.brand { position:absolute; bottom:60px; left:0; right:0; text-align:center; font-size:13px; color:rgba(255,255,255,0.25); letter-spacing:6px; }
</style></head><body>
<img class="bg" src="${cupImg}">
<div class="c">
  <div class="tag">STEP 04 · 高温烧制</div>
  <div class="h">1280°C<br>窑火见真章</div>
  <div class="b">
    12 小时升温，12 小时降温。<br><br>
    釉面在火中自然流淌，<br>
    形成定窑标志性的<span style="color:rgba(200,170,120,0.9);">「泪痕」</span>纹理。<br><br>
    每一只都不一样。<br>
    <span style="color:rgba(200,170,120,0.9);">火的意志，不可控，也不可替代。</span>
  </div>
</div>
<div class="brand">正窑 · ZHENGYAO</div>
</body></html>`;

// Card 6: Ending
const card6 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#F8F4EF; font-family:sans-serif; }
.bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.1; }
.c { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:0 120px; }
.q { font-size:42px; color:#2C2C2C; font-weight:700; letter-spacing:4px; line-height:1.5; font-family:'Noto Serif SC',serif; }
.div { width:60px; height:2px; background:#8B7355; margin:40px auto; }
.cl { font-size:18px; color:#8B7355; line-height:2; font-family:'Noto Sans SC',sans-serif; letter-spacing:2px; }
.cta { margin-top:50px; padding:14px 48px; border:1.5px solid #8B7355; color:#8B7355; font-size:16px; letter-spacing:4px; border-radius:30px; font-family:'Noto Sans SC',sans-serif; text-decoration:none; display:inline-block; }
</style></head><body>
<img class="bg" src="${teapotImg}">
<div class="c">
  <div class="q">从数字<br>到窑火</div>
  <div class="div"></div>
  <div class="cl">
    从 0 到 1<br>
    这中间没有捷径<br><br>
    正窑 · 经典壶杯套件<br>
    在主页
  </div>
  <div class="cta">前往选购 →</div>
</div>
</body></html>`;

// Write files
const cards = [
  { name: 'card-01-cover.html', content: card1 },
  { name: 'card-02-step1.html', content: card2 },
  { name: 'card-03-step2.html', content: card3 },
  { name: 'card-04-step3.html', content: card4 },
  { name: 'card-05-step4.html', content: card5 },
  { name: 'card-06-ending.html', content: card6 },
];

cards.forEach(c => fs.writeFileSync(path.join(DIR, c.name), c.content));
console.log('HTML files created');

// Now screenshot
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 1536 });

  const outputs = [
    { file: 'card-01-cover.html', output: 'day02-promo-01-cover.png' },
    { file: 'card-02-step1.html', output: 'day02-promo-02-step1.png' },
    { file: 'card-03-step2.html', output: 'day02-promo-03-step2.png' },
    { file: 'card-04-step3.html', output: 'day02-promo-04-step3.png' },
    { file: 'card-05-step4.html', output: 'day02-promo-05-step4.png' },
    { file: 'card-06-ending.html', output: 'day02-promo-06-ending.png' },
  ];

  for (const o of outputs) {
    const filepath = path.join(DIR, o.file);
    await page.goto(`file://${filepath}`, { waitUntil: 'networkidle' });
    await page.screenshot({
      path: path.join(DIR, o.output),
      clip: { x: 0, y: 0, width: 1024, height: 1536 }
    });
    console.log(`Screenshot: ${o.output}`);
  }

  await browser.close();
  console.log('All done!');
})();
