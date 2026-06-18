const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const http = require('http');

const DAY_DIR = '/Users/bean/Documents/正窑陶瓷艺术工作室/03-网站/xiaohongshu-images/day-04';
const MODEL_DIR = '/Users/bean/Documents/正窑陶瓷艺术工作室/03-网站/models';

// 3 models to render
const renderTasks = [
  { model: 'teapot-with-lid.glb', orbit: '30deg 75deg 12m', name: 'model-teapot' },
  { model: 'incense-burner-with-lid.glb', orbit: '-20deg 70deg 10m', name: 'model-burner' },
  { model: 'teacup.glb', orbit: '10deg 80deg 8m', name: 'model-teacup' },
];

// Simple HTTP server to serve HTML + GLB files (avoids file:// fetch restrictions)
function startServer(port) {
  return new Promise((resolve) => {
    const mimeTypes = {
      '.html': 'text/html',
      '.glb': 'model/gltf-binary',
      '.js': 'application/javascript',
      '.css': 'text/css',
    };

    const server = http.createServer((req, res) => {
      let filePath;
      if (req.url.startsWith('/models/')) {
        filePath = path.join(MODEL_DIR, req.url.replace('/models/', ''));
      } else {
        const urlPath = req.url.split('?')[0];
        filePath = path.join(DAY_DIR, urlPath === '/' ? 'index.html' : urlPath);
      }
      
      const ext = path.extname(filePath);
      try {
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { 
          'Content-Type': mimeTypes[ext] || 'application/octet-stream',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(content);
      } catch (e) {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(port, () => {
      console.log(`HTTP server started on port ${port}`);
      resolve(server);
    });
  });
}

(async () => {
  // Delete old PNGs
  for (const task of renderTasks) {
    const oldPath = path.join(DAY_DIR, `${task.name}.png`);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  const PORT = 8976;
  const server = await startServer(PORT);
  const browser = await chromium.launch({ headless: true });

  for (const task of renderTasks) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1024, height: 1024 });

    // Write HTML using HTTP-served model path
    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1024px; height:1024px; overflow:hidden; background:transparent; }
model-viewer { width:100%; height:100%; --poster-color:transparent; }
</style></head><body>
<model-viewer src="http://localhost:${PORT}/models/${task.model}"
  camera-orbit="${task.orbit}"
  exposure="0.8"
  shadow-intensity="1.0"
  interaction-prompt="none"
  environment-image="neutral"
  auto-rotate
  rotation-per-second="15deg">
</model-viewer>
</body></html>`;

    const htmlPath = path.join(DAY_DIR, `render-${task.name}.html`);
    fs.writeFileSync(htmlPath, html);

    console.log(`Loading model: ${task.model} (orbit: ${task.orbit})...`);
    await page.goto(`http://localhost:${PORT}/render-${task.name}.html`, { 
      waitUntil: 'networkidle', 
      timeout: 30000 
    });

    // Wait for model-viewer to load the 3D model
    let loaded = false;
    try {
      await page.waitForFunction(() => {
        const mv = document.querySelector('model-viewer');
        return mv && mv.loaded;
      }, { timeout: 25000 });
      loaded = true;
      console.log(`  Model loaded!`);
    } catch (e) {
      console.log(`  Warning: model load timeout: ${e.message.substring(0, 60)}`);
    }

    // Let it rotate for a bit so we capture a good angle
    if (loaded) {
      console.log(`  Waiting 2s for rotation...`);
      await page.waitForTimeout(2000);
    } else {
      await page.waitForTimeout(5000);
    }

    const outputPath = path.join(DAY_DIR, `${task.name}.png`);
    await page.screenshot({ path: outputPath, omitBackground: true, clip: { x: 0, y: 0, width: 1024, height: 1024 } });
    const stat = fs.statSync(outputPath);
    console.log(`  -> Saved: ${task.name}.png (${(stat.size / 1024).toFixed(1)} KB)`);

    await page.close();
  }

  await browser.close();
  server.close();

  // Verify distinctness
  console.log('\n--- Verification ---');
  const { execSync } = require('child_process');
  const hashes = new Map();
  let allUnique = true;
  for (const task of renderTasks) {
    const hash = execSync(`md5 -q "${path.join(DAY_DIR, `${task.name}.png`)}"`).toString().trim();
    if (hashes.has(hash)) {
      console.log(`  ⚠️  DUPLICATE: ${task.name}.png == ${hashes.get(hash)} (${hash})`);
      allUnique = false;
    } else {
      hashes.set(hash, task.name);
      console.log(`  ✓  UNIQUE: ${task.name}.png (${hash})`);
    }
  }
  if (allUnique) {
    console.log(`\n✅ All 3 renders are distinct!`);
  } else {
    console.log(`\n❌ Duplicates detected. Models may be too similar from these angles.`);
  }
})();
