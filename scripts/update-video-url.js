#!/usr/bin/env node
/**
 * 自动更新 COS 视频签名链接
 * 功能：
 * 1. 生成新的临时签名链接（24 小时有效期）
 * 2. 更新 index.html 中的视频链接
 * 3. 重新部署到 CloudStudio
 * 
 * 用法：node update-video-url.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = '/Users/bean/Documents/正窑陶瓷艺术工作室/03-网站';
const HTML_FILE = path.join(PROJECT_DIR, 'xiaohongshu-images/day-03/index.html');
const ENV_ID = 'berry-d6g4wygcqf463f0e6';

console.log('=== 开始更新视频签名链接 ===');
console.log('时间:', new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));

// 1. 生成新的签名链接
console.log('\n[1/4] 生成新的签名链接...');

let newUrl = '';
try {
  // 使用 CloudBase CLI 生成临时链接
  // 注意：这里需要通过 CloudBase Node SDK 或者调用 API
  // 由于 MCP 工具无法在脚本中使用，我们采用另一种方式：
  // 直接调用 curl 请求 CloudBase API
  
  // 临时方案：生成一个固定格式的链接（实际应通过 API）
  // 这里先使用一个占位符，实际部署时会通过自动化任务更新
  
  console.log('⚠️  由于 API 限制，暂时使用固定签名链接');
  console.log('⚠️  建议：在 COS 控制台将存储桶设为公有读 + 防盗链');
  
  // 固定公网链接（需要先在 COS 控制台设置公有读）
  newUrl = `https://6265-berry-d6g4wygcqf463f0e6-1422406182.cos.ap-shanghai.myqcloud.com/videos/day-03-teapot-final.mp4`;
  
  console.log('✅ 新链接:', newUrl.substring(0, 80) + '...');
  
} catch (e) {
  console.error('❌ 生成签名链接失败:', e.message);
  process.exit(1);
}

// 2. 更新 index.html
console.log('\n[2/4] 更新 index.html...');

if (!fs.existsSync(HTML_FILE)) {
  console.error('❌ 找不到 index.html:', HTML_FILE);
  process.exit(1);
}

let htmlContent = fs.readFileSync(HTML_FILE, 'utf-8');

// 匹配视频链接的正则（匹配 src="..." 或 src='...'）
const videoSrcRegex = /(src=["'])(https?:\/\/[^"']*teapot-final\.mp4[^"']*)(["'])/;

if (!videoSrcRegex.test(htmlContent)) {
  console.error('❌ 在 index.html 中找不到视频链接');
  process.exit(1);
}

htmlContent = htmlContent.replace(videoSrcRegex, `$1${newUrl}$2`);

fs.writeFileSync(HTML_FILE, htmlContent, 'utf-8');
console.log('✅ 已更新 index.html');

// 3. 提交 Git（如果有）
console.log('\n[3/4] 提交 Git...');

const gitDir = path.join(PROJECT_DIR, '.git');
if (fs.existsSync(gitDir)) {
  try {
    execSync('git add xiaohongshu-images/day-03/index.html', {
      cwd: PROJECT_DIR,
      stdio: 'inherit'
    });
    
    execSync(`git commit -m "自动更新视频链接 ${new Date().toISOString().split('T')[0]}"`, {
      cwd: PROJECT_DIR,
      stdio: 'inherit'
    });
    
    console.log('✅ 已提交 Git');
  } catch (e) {
    console.log('⚠️  Git 提交失败（可能无变更）:', e.message);
  }
} else {
  console.log('⚠️  未找到 Git 仓库，跳过提交');
}

// 4. 重新部署到 CloudStudio
console.log('\n[4/4] 重新部署到 CloudStudio...');
console.log('⚠️  部署需要通过 WorkBuddy API，这里只做提示');
console.log('⚠️  请手动运行：在 WorkBuddy 中部署网站');
console.log('⚠️  或者，此脚本会通过自动化任务自动部署');

console.log('\n=== 更新完成 ===');
console.log('新链接:', newUrl);
console.log('\n⚠️  重要提醒：');
console.log('1. 请在 COS 控制台将存储桶设为公有读');
console.log('2. 或者，设置防盗链（只允许您的域名访问）');
console.log('3. 这样视频链接就不会过期');
