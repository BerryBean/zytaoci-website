/**
 * Day 4 Build Script
 * 品牌故事：宋代工匠不知道 G2 曲线，但他们做对了同一件事
 * 
 * Models: teapot-with-lid, incense-burner-with-lid, teacup
 */

const fs = require('fs');
const path = require('path');

const DAY_DIR = '/Users/bean/Documents/正窑陶瓷艺术工作室/03-网站/xiaohongshu-images/day-04';
const MODEL_DIR = '/Users/bean/Documents/正窑陶瓷艺术工作室/03-网站/models';

// ========== PHASE 1: Write Card HTML Files ==========

function img2base64(filepath) {
  const data = fs.readFileSync(filepath);
  const ext = path.extname(filepath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${data.toString('base64')}`;
}

// Load model images as base64
console.log('Loading model images...');
const MODEL_TEAPOT = img2base64(path.join(DAY_DIR, 'model-teapot.png'));
const MODEL_BURNER = img2base64(path.join(DAY_DIR, 'model-burner.png'));
const MODEL_TEACUP = img2base64(path.join(DAY_DIR, 'model-teacup.png'));
console.log(`  Teapot: ${(MODEL_TEAPOT.length / 1024).toFixed(0)} KB base64`);
console.log(`  Burner: ${(MODEL_BURNER.length / 1024).toFixed(0)} KB base64`);
console.log(`  Teacup: ${(MODEL_TEACUP.length / 1024).toFixed(0)} KB base64`);

// Card-to-model mapping:
//   Card 2 (宋人工匠) → teapot  |  Card 3 (换语言) → burner
//   Card 4 (G2曲线)    → teapot  |  Card 5 (微米级)  → burner
//   Card 6 (收尾)      → teacup
const MODEL_PLACEHOLDER = 'MODEL_IMG_BASE64'; // placeholder for template strings

// Card 1: Cover - 宋代工匠 × G2 曲线
const card1 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#F8F4EF; font-family:sans-serif; margin:0; }
.bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.12; }
.overlay { position:absolute; inset:0; background:linear-gradient(180deg,rgba(248,244,239,0.6),rgba(248,244,239,0.92)); }
.c { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:0 80px; }
.brand { font-size:15px; color:#8B7355; letter-spacing:8px; margin-bottom:36px; font-family:'Noto Sans SC',sans-serif; }
.tagline { font-size:22px; color:#B5A080; letter-spacing:4px; margin-bottom:28px; font-family:'Noto Serif SC',serif; text-align:center; }
.title { font-size:42px; color:#2C2C2C; font-weight:700; letter-spacing:5px; text-align:center; line-height:1.45; font-family:'Noto Serif SC',serif; }
.div { width:80px; height:2px; background:#8B7355; margin:36px auto; }
.question { font-size:20px; color:#8B7355; letter-spacing:3px; text-align:center; line-height:1.6; font-family:'Noto Sans SC',sans-serif; }
.ft { position:absolute; bottom:56px; left:0; right:0; text-align:center; font-size:13px; color:#bbb; letter-spacing:5px; font-family:'Noto Sans SC',sans-serif; }
</style></head><body>
<div class="c">
  <div class="brand">正窑 · ZHENGYAO</div>
  <div class="tagline">品牌故事 · 02</div>
  <div class="title">宋代工匠<br>不知道 G2 曲线</div>
  <div class="div"></div>
  <div class="question">但他们做对了<br>同一件事</div>
</div>
<div class="ft">数字时代的手工精神工房</div>
</body></html>`;

// Card 2: 宋人工匠的智慧
const card2 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#F8F4EF; font-family:sans-serif; margin:0; }
.bg { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:900px; height:900px; object-fit:contain; opacity:0.18; }
.t { position:absolute; top:100px; left:80px; right:80px; }
.tag { display:inline-block; background:#8B7355; color:#fff; padding:5px 18px; border-radius:16px; font-size:13px; letter-spacing:2px; font-family:'Noto Sans SC',sans-serif; margin-bottom:20px; }
.h { font-size:48px; color:#2C2C2C; font-weight:700; letter-spacing:5px; line-height:1.35; font-family:'Noto Serif SC',serif; }
.b { position:absolute; bottom:120px; left:80px; right:80px; font-size:17px; color:#555; line-height:2.1; font-family:'Noto Sans SC',sans-serif; }
.b strong { color:#8B7355; }
</style></head><body>
<img class="bg" src="${MODEL_PLACEHOLDER}">
<div class="t">
  <div class="tag">千年前的定窑</div>
  <div class="h">不懂参数化<br>不懂微米级</div>
</div>
<div class="b">
  宋代的定窑工匠，<br>
  不知道什么是 G2 连续曲率。<br>
  不知道参数化建模，<br>
  不知道什么叫<strong>「微米级精度的盖口密合」</strong>。<br><br>
  但他们用手感做出了同样温润的器型。<br>
  用经验找到了同样精准的火候。<br>
  用一双眼睛和两只手，<br>
  烧出了后世膜拜千年的<strong>「定窑象牙白」</strong>。
</div>
</body></html>`;

// Card 3: 换了一种语言
const card3 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#3C2F1E; font-family:sans-serif; margin:0; }
.bg { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:880px; height:880px; object-fit:contain; opacity:0.18; }
.t { position:absolute; top:120px; left:80px; right:80px; text-align:center; }
.tag { display:inline-block; border:1px solid rgba(200,170,120,0.55); color:rgba(200,170,120,0.9); padding:5px 18px; border-radius:16px; font-size:13px; letter-spacing:2px; font-family:'Noto Sans SC',sans-serif; margin-bottom:24px; }
.h { font-size:44px; color:#F5EDE0; font-weight:700; letter-spacing:5px; line-height:1.4; font-family:'Noto Serif SC',serif; }
.b { position:absolute; bottom:100px; left:80px; right:80px; text-align:center; font-size:17px; color:rgba(255,255,255,0.55); line-height:2.1; font-family:'Noto Sans SC',sans-serif; }
.b span { color:rgba(200,170,120,0.9); }
</style></head><body>
<img class="bg" src="${MODEL_PLACEHOLDER}">
<div class="t">
  <div class="tag">一千年后 · 同一片泥土</div>
  <div class="h">换了一种语言<br>说的还是那句话</div>
</div>
<div class="b">
  我们做的事情，不是<span>「颠覆传统」</span>。<br>
  是先理解了宋人为什么这样做，<br>
  然后用<span>数学</span>把那份温润重新翻译了一遍。<br><br>
  同一片河北曲阳的泥。<br>
  同一个 1280°C 的窑火。<br>
  同一个追求：<span>做一只好器物</span>。
</div>
</body></html>`;

// Card 4: G2 曲线 + 中空夹壁
const card4 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:linear-gradient(170deg,#F8F4EF,#E8E0D3); font-family:sans-serif; margin:0; }
.bg { position:absolute; bottom:0; right:-60px; width:700px; height:700px; object-fit:contain; opacity:0.45; }
.t { position:absolute; top:120px; left:80px; width:560px; }
.tag { display:inline-block; background:#8B7355; color:#fff; padding:5px 18px; border-radius:16px; font-size:13px; letter-spacing:2px; font-family:'Noto Sans SC',sans-serif; margin-bottom:20px; }
.h { font-size:44px; color:#2C2C2C; font-weight:700; letter-spacing:4px; line-height:1.3; font-family:'Noto Serif SC',serif; }
.body { margin-top:28px; font-size:17px; color:#555; line-height:2; font-family:'Noto Sans SC',sans-serif; }
.hl { color:#8B7355; font-weight:600; }
</style></head><body>
<img class="bg" src="${MODEL_PLACEHOLDER}">
<div class="t">
  <div class="tag">数字翻译传统</div>
  <div class="h">G2 曲线<br>= 宋人手里的「顺滑」</div>
  <div class="body">
    G2 连续曲率，<br>
    数学意义上的<span class="hl">完美弧度</span>。<br>
    而宋人工匠用手感找出的那一道弧，<br>
    恰恰也在追求同一种东西——<br><br>
    <span class="hl">顺滑。温润。不扎手。</span><br><br>
    不同时代，不同工具，<br>
    同一个答案。
  </div>
</div>
</body></html>`;

// Card 5: 微米级密合
const card5 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#F8F4EF; font-family:sans-serif; margin:0; }
.bg { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:880px; height:880px; object-fit:contain; opacity:0.16; }
.t { position:absolute; top:120px; left:80px; right:80px; }
.tag { display:inline-block; background:#8B7355; color:#fff; padding:5px 18px; border-radius:16px; font-size:13px; letter-spacing:2px; font-family:'Noto Sans SC',sans-serif; margin-bottom:20px; }
.h { font-size:48px; color:#2C2C2C; font-weight:700; letter-spacing:4px; line-height:1.3; font-family:'Noto Serif SC',serif; }
.b { position:absolute; bottom:130px; left:80px; right:80px; font-size:17px; color:#555; line-height:2.1; font-family:'Noto Sans SC',sans-serif; }
.b strong { color:#8B7355; }
</style></head><body>
<img class="bg" src="${MODEL_PLACEHOLDER}">
<div class="t">
  <div class="tag">精确到小数点后两位</div>
  <div class="h">中空夹壁<br>微米级密合</div>
</div>
<div class="b">
  不是炫技。<br>
  中空夹壁，就是宋人想要的<strong>「不烫手」</strong>。<br>
  微米级密合，就是他们追求的<strong>「严丝合缝」</strong>。<br><br>
  一千年前用手感和经验，<br>
  一千年后用数学和打印机。<br>
  工具变了，<strong>标准没变</strong>。
</div>
</body></html>`;

// Card 6: 收尾
const card6 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#F8F4EF; font-family:sans-serif; margin:0; }
.bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.08; }
.c { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:0 100px; }
.q { font-size:42px; color:#2C2C2C; font-weight:700; letter-spacing:4px; line-height:1.5; font-family:'Noto Serif SC',serif; }
.div { width:60px; height:2px; background:#8B7355; margin:40px auto; }
.cl { font-size:18px; color:#8B7355; line-height:2; font-family:'Noto Sans SC',sans-serif; letter-spacing:2px; }
.tagline { margin-top:50px; font-size:16px; color:#B5A080; letter-spacing:4px; font-family:'Noto Serif SC',serif; }
.ft { position:absolute; bottom:56px; left:0; right:0; text-align:center; font-size:13px; color:#bbb; letter-spacing:5px; font-family:'Noto Sans SC',sans-serif; }
</style></head><body>
<img class="bg" src="${MODEL_PLACEHOLDER}">
<div class="c">
  <div class="q">我们换了一种语言</div>
  <div class="div"></div>
  <div class="cl">
    但说的是同一句话<br><br>
    <strong>做一只好器物</strong>
  </div>
  <div class="tagline">正窑 · 数字时代的手工精神</div>
</div>
<div class="ft">ZHENGYAO</div>
</body></html>`;

// Write all card files (embed model images for cards 2-6)
const cards = [
  { name: 'card-01-cover.html', content: card1, model: null },
  { name: 'card-02-story.html', content: card2, model: MODEL_TEAPOT },
  { name: 'card-03-language.html', content: card3, model: MODEL_BURNER },
  { name: 'card-04-g2curve.html', content: card4, model: MODEL_TEAPOT },
  { name: 'card-05-precision.html', content: card5, model: MODEL_BURNER },
  { name: 'card-06-ending.html', content: card6, model: MODEL_TEACUP },
];

console.log('Creating card HTML files (with embedded model images)...');
cards.forEach(c => {
  let content = c.content;
  if (c.model) {
    content = content.replaceAll('MODEL_IMG_BASE64', c.model);
  }
  fs.writeFileSync(path.join(DAY_DIR, c.name), content);
  console.log(`  -> ${c.name} (${(content.length / 1024).toFixed(0)} KB)`);
});

console.log('\n✅ All 6 card HTML files created with embedded model backgrounds!');
console.log('Next: Run screenshot.js to capture card screenshots.');
