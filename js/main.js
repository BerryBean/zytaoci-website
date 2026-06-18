/* ============================================
   正窑陶瓷艺术工作室 — 主交互逻辑
   Zhengyao Ceramic Art Studio — Main JS
   ============================================ */

// --- Language Toggle ---
const LANG_KEY = 'zhengyao-lang';
const htmlEl = document.documentElement;
const bodyEl = document.body;
const toggleBtn = document.getElementById('lang-toggle');

function getPreferredLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved) return saved;
  const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
  return nav.startsWith('en') ? 'en' : 'zh';
}

function setLang(lang) {
  bodyEl.classList.remove('lang-zh', 'lang-en');
  bodyEl.classList.add('lang-' + lang);
  localStorage.setItem(LANG_KEY, lang);
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'en' ? '中文' : 'EN';
  }
  htmlEl.lang = lang === 'en' ? 'en' : 'zh-CN';
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', function () {
    const current = bodyEl.classList.contains('lang-en') ? 'en' : 'zh';
    setLang(current === 'en' ? 'zh' : 'en');
  });
}

// Init language
setLang(getPreferredLang());

// --- Mobile Nav Toggle ---
const mobileToggle = document.getElementById('nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
    });
  });
}

// --- Scroll Fade-In Animation ---
function initFadeIn() {
  var items = document.querySelectorAll('.fade-in');
  if (!items.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  items.forEach(function (item) {
    observer.observe(item);
  });
}

// --- Nav Background on Scroll ---
function initNavScroll() {
  var nav = document.querySelector('.nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 50) {
      nav.style.boxShadow = '0 1px 6px rgba(0,0,0,0.06)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// --- Init ---
document.addEventListener('DOMContentLoaded', function () {
  initFadeIn();
  initNavScroll();
});
