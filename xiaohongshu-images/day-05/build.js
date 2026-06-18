/**
 * Day 5 Build Script
 * 生活美学：下午四点，光线最好。茶席上，只有这些就够了。
 * 
 * Models: teapot-with-lid, teacup
 * Theme: 暖白 / 午后光线 / 茶席日常
 */

const fs = require('fs');
const path = require('path');

const DAY_DIR = '/Users/bean/Documents/正窑陶瓷艺术工作室/03-网站/xiaohongshu-images/day-05';
const MODEL_DIR = '/Users/bean/Documents/正窑陶瓷艺术工作室/03-网站/models';

function img2base64(filepath) {
  const data = fs.readFileSync(filepath);
  const ext = path.extname(filepath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${data.toString('base64')}`;
}

// Load model images as base64
console.log('Loading model images...');
const MODEL_TEAPOT = img2base64(path.join(DAY_DIR, 'model-teapot.png'));
const MODEL_TEACUP = img2base64(path.join(DAY_DIR, 'model-teacup.png'));
console.log(`  Teapot: ${(MODEL_TEAPOT.length / 1024).toFixed(0)} KB`);
console.log(`  Teacup: ${(MODEL_TEACUP.length / 1024).toFixed(0)} KB`);

const MODEL_PLACEHOLDER = 'MODEL_IMG_BASE64';

// Google Fonts import (shared across cards)
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Sans+SC:wght@300;400&display=swap" rel="stylesheet">`;

// ─────────────────────────────────────────────
// Card 1: 封面 — 下午四点，光线最好
// ─────────────────────────────────────────────
const card1 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">${FONTS}<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#FAF7F0; }

/* 柔和光晕背景 */
.light-glow {
  position:absolute;
  top:-100px; left:-80px;
  width:900px; height:900px;
  background:radial-gradient(ellipse, rgba(255,230,170,0.35) 0%, transparent 65%);
  pointer-events:none;
}
.light-glow2 {
  position:absolute;
  bottom:0; right:-60px;
  width:600px; height:600px;
  background:radial-gradient(ellipse, rgba(222,200,160,0.18) 0%, transparent 60%);
  pointer-events:none;
}

/* 模型图 */
.model-wrap {
  position:absolute;
  bottom: -30px; right: -60px;
  width:700px; height:700px;
  opacity:0.18;
}
.model-wrap img { width:100%; height:100%; object-fit:contain; }

.content {
  position:absolute; inset:0;
  display:flex; flex-direction:column;
  justify-content:space-between;
  padding:80px 80px 80px 100px;
}

.brand {
  font-family:'Noto Sans SC',sans-serif;
  font-size:14px; letter-spacing:7px;
  color:#9B8660;
}

.main {
  flex:1; display:flex; flex-direction:column;
  justify-content:center;
}
.time-label {
  font-family:'Noto Serif SC',serif;
  font-size:18px; letter-spacing:5px;
  color:#B5A080; margin-bottom:28px;
}
.title-line1 {
  font-family:'Noto Serif SC',serif;
  font-size:56px; font-weight:700;
  color:#2C2C2C; line-height:1.3;
  letter-spacing:6px; margin-bottom:8px;
}
.title-line2 {
  font-family:'Noto Serif SC',serif;
  font-size:48px; font-weight:400;
  color:#5A4A35; line-height:1.3;
  letter-spacing:5px; margin-bottom:40px;
}
.div-line { width:60px; height:2px; background:#C8A87A; margin-bottom:36px; }
.subtitle {
  font-family:'Noto Sans SC',sans-serif;
  font-size:20px; color:#8B7355;
  letter-spacing:3px; line-height:1.8;
}

.footer {
  display:flex; align-items:center; gap:16px;
}
.logo-text {
  font-family:'Noto Serif SC',serif;
  font-size:20px; letter-spacing:6px; color:#8B7355;
}
.day-badge {
  font-family:'Noto Sans SC',sans-serif;
  font-size:13px; letter-spacing:3px; color:#B5A080;
}
</style></head>
<body>
<div class="light-glow"></div>
<div class="light-glow2"></div>
<div class="model-wrap"><img src="${MODEL_PLACEHOLDER}" alt="teapot"></div>
<div class="content">
  <div class="brand">正窑陶瓷艺术工作室</div>
  <div class="main">
    <div class="time-label">生活美学 · Day 5</div>
    <div class="title-line1">下午四点，</div>
    <div class="title-line2">光线最好。</div>
    <div class="div-line"></div>
    <div class="subtitle">茶席上，<br>只有这些就够了。</div>
  </div>
  <div class="footer">
    <div class="logo-text">正窑</div>
    <div class="day-badge">ZHENGYAO CERAMIC</div>
  </div>
</div>
</body></html>`;

// ─────────────────────────────────────────────
// Card 2: 茶席场景 — 不需要很多东西
// ─────────────────────────────────────────────
const card2 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">${FONTS}<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#F5F0E8; }

.warm-bg {
  position:absolute; inset:0;
  background:linear-gradient(160deg, #FDF8EE 0%, #F5EDD8 50%, #EDE0C4 100%);
}

/* 光柱 — 模拟斜射阳光 */
.sunray {
  position:absolute;
  top:-200px; left:40px;
  width:380px; height:1200px;
  background:linear-gradient(180deg, rgba(255,220,130,0.22) 0%, transparent 80%);
  transform:rotate(-20deg);
  transform-origin:top left;
  pointer-events:none;
}

.model-bg {
  position:absolute;
  bottom:-60px; right:-80px;
  width:750px; height:750px;
  opacity:0.22;
}
.model-bg img { width:100%; height:100%; object-fit:contain; }

.content {
  position:absolute; inset:0;
  display:flex; flex-direction:column;
  padding:100px 90px;
}

.section-tag {
  font-family:'Noto Sans SC',sans-serif;
  font-size:13px; letter-spacing:6px; color:#9B8660;
  margin-bottom:70px;
}

.body-text {
  flex:1;
  display:flex; flex-direction:column;
  justify-content:center;
}

.opening {
  font-family:'Noto Serif SC',serif;
  font-size:30px; color:#2C2C2C;
  letter-spacing:4px; line-height:1.8;
  margin-bottom:48px;
}

.scene-lines {
  display:flex; flex-direction:column; gap:22px;
  padding-left:24px;
  border-left:3px solid rgba(139,115,85,0.35);
}
.scene-line {
  font-family:'Noto Sans SC',sans-serif;
  font-size:19px; color:#5A4A35;
  letter-spacing:2px; line-height:1.85;
}

.closing {
  margin-top:56px;
  font-family:'Noto Serif SC',serif;
  font-size:24px; color:#8B7355;
  letter-spacing:4px; line-height:1.6;
  font-style:italic;
}

.bottom {
  font-family:'Noto Sans SC',sans-serif;
  font-size:13px; color:#B5A080; letter-spacing:4px;
}
</style></head>
<body>
<div class="warm-bg"></div>
<div class="sunray"></div>
<div class="model-bg"><img src="${MODEL_PLACEHOLDER}" alt="teapot"></div>
<div class="content">
  <div class="section-tag">SCENE 01 · 午后光线</div>
  <div class="body-text">
    <div class="opening">不需要很多东西。</div>
    <div class="scene-lines">
      <div class="scene-line">一张素色的麻布茶席。</div>
      <div class="scene-line">一把白瓷茶壶，壶嘴刚好对齐杯沿。</div>
      <div class="scene-line">四个小茶杯，排成一行。</div>
      <div class="scene-line">窗外是四点的光，斜斜地照进来，<br>刚好打在壶身上。</div>
    </div>
    <div class="closing">壶身是暖的。<br>因为有茶。因为有光。</div>
  </div>
  <div class="bottom">正窑陶瓷艺术工作室</div>
</div>
</body></html>`;

// ─────────────────────────────────────────────
// Card 3: 茶壶特写 — 喝茶是陪伴
// ─────────────────────────────────────────────
const card3 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">${FONTS}<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#2C2418; }

/* 深棕暖色调，模拟昏暗茶室 */
.bg-gradient {
  position:absolute; inset:0;
  background:radial-gradient(ellipse at 30% 40%, #4a3820 0%, #2C2418 55%, #1a160f 100%);
}

.model-hero {
  position:absolute;
  top:80px; left:50%; transform:translateX(-50%);
  width:780px; height:780px;
  opacity:0.75;
}
.model-hero img { width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 20px 60px rgba(0,0,0,0.8)); }

/* 茶汤倒影效果 */
.reflection {
  position:absolute;
  top:700px; left:50%; transform:translateX(-50%);
  width:780px; height:200px;
  opacity:0.12;
  transform:translateX(-50%) scaleY(-0.3);
  filter:blur(8px);
}
.reflection img { width:100%; height:100%; object-fit:contain; }

.content {
  position:absolute;
  bottom:0; left:0; right:0;
  padding:0 90px 100px;
}

.quote-mark {
  font-size:80px; color:rgba(180,140,80,0.35);
  font-family:serif; line-height:1; margin-bottom:8px;
}
.main-text {
  font-family:'Noto Serif SC',serif;
  font-size:28px; color:#F0E6D0;
  letter-spacing:4px; line-height:1.85;
  margin-bottom:36px;
}
.sub-text {
  font-family:'Noto Sans SC',sans-serif;
  font-size:17px; color:#9B8660;
  letter-spacing:3px; line-height:1.9;
  margin-bottom:48px;
}
.brand-line {
  font-family:'Noto Serif SC',serif;
  font-size:16px; color:#7A6040; letter-spacing:5px;
}
</style></head>
<body>
<div class="bg-gradient"></div>
<div class="model-hero"><img src="${MODEL_PLACEHOLDER}" alt="teapot"></div>
<div class="reflection"><img src="${MODEL_PLACEHOLDER}" alt=""></div>
<div class="content">
  <div class="quote-mark">"</div>
  <div class="main-text">喝茶这件事，<br>说到底不是品鉴，是陪伴。</div>
  <div class="sub-text">一只好茶壶不会抢你的注意力。<br>它就安静地在那里——<br>每次你伸手，重心刚好，断水刚好，<br>温度刚好。</div>
  <div class="brand-line">正窑陶瓷 · 让美可被触碰</div>
</div>
</body></html>`;

// ─────────────────────────────────────────────
// Card 4: 茶杯场景 — 四个杯子排成一行
// ─────────────────────────────────────────────
const card4 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">${FONTS}<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#FAF6EE; }

.bg {
  position:absolute; inset:0;
  background:linear-gradient(135deg, #FFF8EC 0%, #FAF0DC 60%, #F0E4C4 100%);
}

/* 四个茶杯排列 */
.cups-row {
  position:absolute;
  top:160px; left:50%; transform:translateX(-50%);
  display:flex; gap:20px;
  width:880px;
}
.cup-wrap {
  flex:1; height:320px;
  opacity:0.82;
  filter:drop-shadow(0 8px 24px rgba(0,0,0,0.12));
}
.cup-wrap img { width:100%; height:100%; object-fit:contain; }

/* 倒影行 */
.cups-row-reflect {
  position:absolute;
  top:440px; left:50%; transform:translateX(-50%);
  display:flex; gap:20px;
  width:880px;
}
.cup-reflect {
  flex:1; height:100px;
  opacity:0.12;
  transform:scaleY(-1);
  filter:blur(4px);
}
.cup-reflect img { width:100%; height:100%; object-fit:contain; }

.content {
  position:absolute; inset:0;
  display:flex; flex-direction:column;
  padding:80px 90px;
}

.top-space { flex:1; }

.body-area {
  padding-top: 420px;
}

.number-row {
  display:flex; gap:48px; margin-bottom:48px;
}
.num-item { display:flex; flex-direction:column; align-items:center; gap:8px; }
.num { font-family:'Noto Serif SC',serif; font-size:40px; color:#C8A87A; font-weight:700; }
.num-label { font-family:'Noto Sans SC',sans-serif; font-size:14px; color:#9B8660; letter-spacing:2px; }

.div-line { width:48px; height:1px; background:#C8A87A; margin:0 0 40px; }

.body-text {
  font-family:'Noto Serif SC',serif;
  font-size:26px; color:#2C2C2C;
  letter-spacing:4px; line-height:1.9;
  margin-bottom:28px;
}
.body-sub {
  font-family:'Noto Sans SC',sans-serif;
  font-size:17px; color:#8B7355;
  letter-spacing:2px; line-height:1.8;
  margin-bottom:56px;
}
.brand {
  font-family:'Noto Sans SC',sans-serif;
  font-size:13px; color:#B5A080; letter-spacing:5px;
}
</style></head>
<body>
<div class="bg"></div>
<div class="cups-row">
  <div class="cup-wrap"><img src="${MODEL_PLACEHOLDER}" alt="teacup"></div>
  <div class="cup-wrap"><img src="${MODEL_PLACEHOLDER}" alt="teacup"></div>
  <div class="cup-wrap"><img src="${MODEL_PLACEHOLDER}" alt="teacup"></div>
  <div class="cup-wrap"><img src="${MODEL_PLACEHOLDER}" alt="teacup"></div>
</div>
<div class="cups-row-reflect">
  <div class="cup-reflect"><img src="${MODEL_PLACEHOLDER}" alt=""></div>
  <div class="cup-reflect"><img src="${MODEL_PLACEHOLDER}" alt=""></div>
  <div class="cup-reflect"><img src="${MODEL_PLACEHOLDER}" alt=""></div>
  <div class="cup-reflect"><img src="${MODEL_PLACEHOLDER}" alt=""></div>
</div>
<div class="content">
  <div class="top-space"></div>
  <div class="body-area">
    <div class="number-row">
      <div class="num-item"><div class="num">4</div><div class="num-label">个茶杯</div></div>
      <div class="num-item"><div class="num">1</div><div class="num-label">把茶壶</div></div>
      <div class="num-item"><div class="num">∞</div><div class="num-label">个下午</div></div>
    </div>
    <div class="div-line"></div>
    <div class="body-text">四个小茶杯，排成一行。</div>
    <div class="body-sub">这是茶席上最安静的美学——<br>东西不多，但每一件都刚好在它该在的位置。</div>
    <div class="brand">正窑陶瓷艺术工作室</div>
  </div>
</div>
</body></html>`;

// ─────────────────────────────────────────────
// Card 5: 设计理念 — 不让它「惊艳」你，让它「舒服」你
// ─────────────────────────────────────────────
const card5 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">${FONTS}<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#3A2E22; }

.bg {
  position:absolute; inset:0;
  background:linear-gradient(150deg, #4A3C28 0%, #3A2E22 45%, #281E14 100%);
}

.model-side {
  position:absolute;
  top:60px; right:-100px;
  width:700px; height:700px;
  opacity:0.35;
}
.model-side img { width:100%; height:100%; object-fit:contain; }

.content {
  position:absolute; inset:0;
  padding:100px 90px;
  display:flex; flex-direction:column;
}

.tag {
  font-family:'Noto Sans SC',sans-serif;
  font-size:13px; letter-spacing:6px; color:#7A6040;
  margin-bottom:80px;
}

.contrast-block {
  margin-bottom:60px;
}
.contrast-item {
  display:flex; align-items:flex-start; gap:24px;
  margin-bottom:36px;
}
.ci-icon {
  font-size:28px; margin-top:4px; flex-shrink:0;
}
.ci-text { flex:1; }
.ci-label {
  font-family:'Noto Sans SC',sans-serif;
  font-size:14px; letter-spacing:3px; color:#7A6040;
  margin-bottom:6px;
}
.ci-main {
  font-family:'Noto Serif SC',serif;
  font-size:26px; color:#F0E6D0;
  letter-spacing:4px; line-height:1.5;
}

.div-line { width:60px; height:1px; background:#5A4A35; margin:40px 0; }

.big-statement {
  font-family:'Noto Serif SC',serif;
  font-size:30px; color:#C8A87A;
  letter-spacing:4px; line-height:1.8;
  margin-bottom:32px;
}
.sub-statement {
  font-family:'Noto Sans SC',sans-serif;
  font-size:18px; color:#8B7060;
  letter-spacing:3px; line-height:1.9;
}

.footer {
  margin-top:auto;
  font-family:'Noto Serif SC',serif;
  font-size:15px; color:#5A4A35; letter-spacing:5px;
}
</style></head>
<body>
<div class="bg"></div>
<div class="model-side"><img src="${MODEL_PLACEHOLDER}" alt="teapot"></div>
<div class="content">
  <div class="tag">DESIGN PHILOSOPHY · 设计理念</div>
  <div class="contrast-block">
    <div class="contrast-item">
      <div class="ci-icon">✗</div>
      <div class="ci-text">
        <div class="ci-label">不是这个</div>
        <div class="ci-main">让它「惊艳」你</div>
      </div>
    </div>
    <div class="contrast-item">
      <div class="ci-icon">✓</div>
      <div class="ci-text">
        <div class="ci-label">而是这个</div>
        <div class="ci-main">让它「舒服」你</div>
      </div>
    </div>
  </div>
  <div class="div-line"></div>
  <div class="big-statement">重心刚好。断水刚好。<br>温度刚好。</div>
  <div class="sub-statement">不多不少。<br>这是我们在设计时最在意的事。</div>
  <div class="footer">正窑陶瓷 · 静 · 准 · 厚 · 轻</div>
</div>
</body></html>`;

// ─────────────────────────────────────────────
// Card 6: 收尾 — 互动引导
// ─────────────────────────────────────────────
const card6 = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">${FONTS}<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1536px; position:relative; overflow:hidden; background:#FAF7F0; }

.bg {
  position:absolute; inset:0;
  background:linear-gradient(170deg, #FFFBF0 0%, #FAF4E0 55%, #F5ECD0 100%);
}
/* 午后光晕 */
.glow {
  position:absolute;
  top:0; left:0;
  width:700px; height:700px;
  background:radial-gradient(ellipse at 20% 20%, rgba(255,220,120,0.28) 0%, transparent 60%);
}

.model-center {
  position:absolute;
  top:100px; left:50%; transform:translateX(-50%);
  width:700px; height:700px;
  opacity:0.28;
}
.model-center img { width:100%; height:100%; object-fit:contain; }

.content {
  position:absolute; inset:0;
  display:flex; flex-direction:column;
  align-items:center;
  padding:80px 80px 100px;
}

.top-brand {
  font-family:'Noto Sans SC',sans-serif;
  font-size:13px; letter-spacing:7px;
  color:#B5A080; align-self:flex-start;
}

.spacer { flex:1; }

.bottom-area {
  text-align:center; width:100%;
}

.slogan {
  font-family:'Noto Serif SC',serif;
  font-size:34px; color:#2C2C2C;
  letter-spacing:6px; line-height:1.7;
  margin-bottom:20px;
}
.slogan em {
  font-style:normal; color:#8B7355;
}

.div-wrap { display:flex; align-items:center; gap:20px; justify-content:center; margin:28px 0; }
.div-line { width:60px; height:1px; background:#C8A87A; }
.div-dot { width:6px; height:6px; background:#C8A87A; border-radius:50%; }

.interact {
  font-family:'Noto Sans SC',sans-serif;
  font-size:19px; color:#5A4A35;
  letter-spacing:3px; line-height:1.9;
  margin-bottom:40px;
}
.interact-hl {
  font-family:'Noto Serif SC',serif;
  font-size:22px; color:#8B7355;
  letter-spacing:4px; display:block;
  margin-top:12px;
}

.tags {
  display:flex; flex-wrap:wrap; justify-content:center; gap:12px; margin-bottom:40px;
}
.tag {
  font-family:'Noto Sans SC',sans-serif;
  font-size:13px; color:#9B8660;
  background:rgba(139,115,85,0.08);
  padding:7px 18px; border-radius:20px;
  letter-spacing:1px;
}

.footer-logo {
  font-family:'Noto Serif SC',serif;
  font-size:22px; color:#8B7355; letter-spacing:8px;
}
</style></head>
<body>
<div class="bg"></div>
<div class="glow"></div>
<div class="model-center"><img src="${MODEL_PLACEHOLDER}" alt="teapot"></div>
<div class="content">
  <div class="top-brand">正窑陶瓷艺术工作室</div>
  <div class="spacer"></div>
  <div class="bottom-area">
    <div class="slogan">下午四点，<br>泡一壶茶，<br><em>就是这一刻。</em></div>
    <div class="div-wrap">
      <div class="div-line"></div>
      <div class="div-dot"></div>
      <div class="div-line"></div>
    </div>
    <div class="interact">
      你一天中什么时候喝茶最舒服？
      <span class="interact-hl">来评论区聊聊 ☕</span>
    </div>
    <div class="tags">
      <div class="tag">#茶席日常</div>
      <div class="tag">#白瓷茶具</div>
      <div class="tag">#慢生活</div>
      <div class="tag">#正窑陶瓷</div>
      <div class="tag">#器物之美</div>
    </div>
    <div class="footer-logo">正 窑</div>
  </div>
</div>
</body></html>`;

// ─────────────────────────────────────────────
// Write all card files with embedded model images
// ─────────────────────────────────────────────
const cards = [
  { name: 'card-01-cover.html',   content: card1, model: MODEL_TEAPOT },
  { name: 'card-02-scene.html',   content: card2, model: MODEL_TEAPOT },
  { name: 'card-03-teapot.html',  content: card3, model: MODEL_TEAPOT },
  { name: 'card-04-cups.html',    content: card4, model: MODEL_TEACUP },
  { name: 'card-05-design.html',  content: card5, model: MODEL_TEAPOT },
  { name: 'card-06-ending.html',  content: card6, model: MODEL_TEAPOT },
];

console.log('\nCreating card HTML files...');
cards.forEach(c => {
  let content = c.content;
  if (c.model) {
    content = content.replaceAll(MODEL_PLACEHOLDER, c.model);
  }
  fs.writeFileSync(path.join(DAY_DIR, c.name), content);
  console.log(`  -> ${c.name} (${(content.length / 1024).toFixed(0)} KB)`);
});

console.log('\n✅ All 6 Day 5 card HTML files created!');
console.log('Next: Run render-models.js to render transparent model images, then screenshot.js');
