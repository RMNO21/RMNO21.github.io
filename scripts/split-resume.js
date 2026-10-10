const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const faDir = path.join(rootDir, 'fa');
const faProjectsDir = path.join(faDir, 'projects');
const projectsDir = path.join(rootDir, 'projects');

if (!fs.existsSync(faProjectsDir)) {
  fs.mkdirSync(faProjectsDir, { recursive: true });
}

console.log('--- Starting Multilingual Splitting & SEO 100/100 Build ---');

// ==========================================
// 1. SPLIT RESUME.HTML & CREATE FA/RESUME.HTML
// ==========================================
const originalResumeContent = fs.readFileSync(path.join(rootDir, 'resume.html'), 'utf-8');

// Identify the split marker
const enStartIdx = originalResumeContent.indexOf('<!-- ==========================================\r\n     ENGLISH RESUME VERSION');
const enStartIdxFallback = enStartIdx !== -1 ? enStartIdx : originalResumeContent.indexOf('ENGLISH RESUME VERSION');
const faStartIdx = originalResumeContent.indexOf('<!-- ==========================================\r\n     PERSIAN RESUME VERSION');
const faStartIdxFallback = faStartIdx !== -1 ? faStartIdx : originalResumeContent.indexOf('PERSIAN RESUME VERSION');

if (enStartIdxFallback === -1 || faStartIdxFallback === -1) {
  console.error('Could not find EN and FA markers in resume.html!');
  process.exit(1);
}

// Find header before main content
const headerPart = originalResumeContent.substring(0, originalResumeContent.indexOf('<main class="resume-page-wrapper">') + '<main class="resume-page-wrapper">'.length);
const footerPart = originalResumeContent.substring(originalResumeContent.indexOf('</main>'));

// Extract English article
const enArticleRaw = originalResumeContent.substring(
  originalResumeContent.indexOf('<article class="resume-paper lang-content-en"', enStartIdxFallback),
  originalResumeContent.indexOf('</article>', enStartIdxFallback) + '</article>'.length
);

// Clean up English article:
// 1. Remove candidate-name-fa span
let enArticleClean = enArticleRaw.replace(/<span class="candidate-name-fa" lang="fa" itemprop="alternateName">[\s\S]*?<\/span>/, '');
// 2. Remove (رامان تندرو) from alt attribute
enArticleClean = enArticleClean.replace(/alt="Raman Tondro \(رامان تندرو\) - Computer Engineering & Systems Developer"/g, 'alt="Raman Tondro - Computer Engineering & Systems Developer"');
// 3. Remove class lang-content-en and keep resume-paper
enArticleClean = enArticleClean.replace('class="resume-paper lang-content-en"', 'class="resume-paper"');

// Extract Persian article
const faArticleRaw = originalResumeContent.substring(
  originalResumeContent.indexOf('<article class="resume-paper lang-content-fa"', faStartIdxFallback),
  originalResumeContent.indexOf('</article>', faStartIdxFallback) + '</article>'.length
);

let faArticleClean = faArticleRaw.replace('class="resume-paper lang-content-fa"', 'class="resume-paper"');
// Update image paths for fa/ directory
faArticleClean = faArticleClean.replace(/src="assets\//g, 'src="../assets/');

// Build EN RESUME HTML
const enHead = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Raman Tondro - Official Engineering Resume</title>
  
  <!-- Primary Meta Tags -->
  <meta name="title" content="Raman Tondro - Official Engineering Resume">
  <meta name="description" content="Official engineering resume of Raman Tondro (RMNO21) - Computer Engineering student at Shiraz University, Systems & Embedded Developer, Peyman Sakht Infrastructure Technician. Verified credentials in C++, Python, Electronics, and Networks.">
  <meta name="keywords" content="Raman Tondro, Raman Tondro resume, RMNO21, Computer Engineering, Shiraz University, Embedded Systems, ESP32, Peyman Sakht, Systems Architecture">
  <meta name="author" content="Raman Tondro">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="https://rmno21.github.io/resume.html">
  <link rel="alternate" hreflang="en" href="https://rmno21.github.io/resume.html">
  <link rel="alternate" hreflang="fa" href="https://rmno21.github.io/fa/resume.html">
  <link rel="alternate" hreflang="x-default" href="https://rmno21.github.io/resume.html">

  <!-- Open Graph / Social Media -->
  <meta property="og:type" content="profile">
  <meta property="og:url" content="https://rmno21.github.io/resume.html">
  <meta property="og:title" content="Raman Tondro - Engineering Resume">
  <meta property="og:description" content="Systems & Embedded Developer · Computer Engineering @ Shiraz University · Infrastructure Technician at Peyman Sakht · Verified C++, Python, Networks & Electronics credentials.">
  <meta property="og:image" content="https://rmno21.github.io/assets/images/raman-tondro-square.jpg">
  <meta property="og:image:secure_url" content="https://rmno21.github.io/assets/images/raman-tondro-square.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="800">
  <meta property="og:image:height" content="800">
  <meta property="og:image:alt" content="Raman Tondro - Official Resume">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Raman Tondro - Engineering Resume">
  <meta name="twitter:description" content="Systems & Embedded Developer · Computer Engineering @ Shiraz University">
  <meta name="twitter:image" content="https://rmno21.github.io/assets/images/raman-tondro-square.jpg">
  <meta name="twitter:image:alt" content="Raman Tondro">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="https://avatars.githubusercontent.com/u/158779818?v=4">

  <!-- Structured Data: Google Schema Person & Resume -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "Raman Tondro - Official Resume",
    "url": "https://rmno21.github.io/resume.html",
    "mainEntity": {
      "@type": "Person",
      "@id": "https://rmno21.github.io/#person",
      "name": "Raman Tondro",
      "alternateName": ["رامان تندرو", "RMNO21"],
      "jobTitle": "Systems & Embedded Software Developer",
      "image": [
        "https://rmno21.github.io/assets/images/raman-tondro.jpg",
        "https://rmno21.github.io/assets/images/raman-tondro-square.jpg",
        "https://avatars.githubusercontent.com/u/158779818?v=4"
      ],
      "email": "mailto:tondroraman83@gmail.com",
      "telephone": "+989330093381",
      "url": "https://rmno21.github.io/",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Shiraz University",
        "alternateName": "دانشگاه شیراز",
        "sameAs": "https://www.wikidata.org/wiki/Q1417030"
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Peyman Sakht Co.",
        "alternateName": "شرکت پیمان ساخت"
      },
      "sameAs": [
        "https://github.com/RMNO21",
        "https://orcid.org/0009-0008-3052-1874",
        "https://www.wikidata.org/wiki/Q141601053",
        "https://t.me/RMNT21",
        "https://virgool.io/@ramantondro",
        "https://www.youtube.com/@RMNT21"
      ],
      "knowsAbout": [
        "Computer Engineering",
        "Embedded Firmware",
        "ESP32 Microcontrollers",
        "C++",
        "C",
        "Rust",
        "Kotlin",
        "Python",
        "Network Infrastructure",
        "TIA-942 Server Rooms",
        "Fluke DSX Testing",
        "Computer Vision",
        "Linux Systems"
      ]
    }
  }
  </script>

  <!-- Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Vazirmatn:wght@400;500;600;700&display=swap" rel="stylesheet">`;

// Extract style block from original
const styleStart = originalResumeContent.indexOf('<style>');
const styleEnd = originalResumeContent.indexOf('</style>') + '</style>'.length;
const originalStyles = originalResumeContent.substring(styleStart, styleEnd);

const enToolbar = `
</head>
<body>

  <!-- Top Action Toolbar -->
  <aside class="resume-toolbar" aria-label="Resume Actions">
    <div class="toolbar-container">
      <div class="toolbar-left">
        <a href="index.html" class="btn-action">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <span class="toolbar-nav-text">Back to Portfolio</span>
        </a>
        <a href="fa/resume.html" id="langToggleBtn" class="btn-action" aria-label="مشاهده نسخه فارسی رزومه">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          <span id="langDisplay">FA / فارسی</span>
        </a>
        <button id="themeToggleBtn" class="btn-action" aria-label="Toggle Document Theme">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <span id="themeToggleText">Paper Mode (Light)</span>
        </button>
      </div>
      <div class="toolbar-right">
        <button onclick="window.print()" class="btn-action btn-primary" aria-label="Print or Save PDF">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          <span class="toolbar-print-text">Print / Save PDF</span>
        </button>
      </div>
    </div>
  </aside>

  <!-- Resume Document Wrapper -->
  <main class="resume-page-wrapper">`;

const enScript = `
  </main>

  <script>
    // Theme Engine (Light / Dark)
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeText = document.getElementById('themeToggleText');
    const savedTheme = localStorage.getItem('rmn_resume_theme') || 'dark';

    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      if (themeText) themeText.textContent = 'Dark Console Mode';
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('rmn_resume_theme', isLight ? 'light' : 'dark');
        if (themeText) {
          themeText.textContent = isLight ? 'Dark Console Mode' : 'Paper Mode (Light)';
        }
      });
    }
  </script>
</body>
</html>`;

const newEnResume = enHead + '\n' + originalStyles + '\n' + enToolbar + '\n' + enArticleClean + '\n' + enScript;
fs.writeFileSync(path.join(rootDir, 'resume.html'), newEnResume, 'utf-8');
console.log('✓ Successfully created 100% Pure English resume.html');

// Build FA RESUME HTML
const faHead = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>رزومه رسمی مهندسی رامان تندرو | مهندس سیستم‌های نهفته و کامپیوتر</title>
  
  <!-- Primary Meta Tags -->
  <meta name="title" content="رزومه رسمی مهندسی رامان تندرو | مهندس سیستم‌های نهفته و کامپیوتر">
  <meta name="description" content="رزومه رسمی و فنی مهندسی رامان تندرو (RMNO21) - دانشجوی مهندسی کامپیوتر دانشگاه شیراز، توسعه‌دهنده سیستم‌های نهفته، و تکنسین زیرساخت شرکت پیمان ساخت.">
  <meta name="keywords" content="رامان تندرو, رزومه رامان تندرو, RMNO21, مهندسی کامپیوتر, دانشگاه شیراز, سیستم‌های نهفته, ESP32, پیمان ساخت, معماری سیستم">
  <meta name="author" content="رامان تندرو">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="https://rmno21.github.io/fa/resume.html">
  <link rel="alternate" hreflang="fa" href="https://rmno21.github.io/fa/resume.html">
  <link rel="alternate" hreflang="en" href="https://rmno21.github.io/resume.html">
  <link rel="alternate" hreflang="x-default" href="https://rmno21.github.io/resume.html">

  <!-- Open Graph / Social Media -->
  <meta property="og:type" content="profile">
  <meta property="og:url" content="https://rmno21.github.io/fa/resume.html">
  <meta property="og:title" content="رزومه رسمی مهندسی رامان تندرو | مهندس سیستم‌های نهفته و کامپیوتر">
  <meta property="og:description" content="دانشجوی مهندسی کامپیوتر دانشگاه شیراز · توسعه‌دهنده سیستم‌های نهفته · تکنسین زیرساخت شرکت پیمان ساخت · مدارک معتبر C++، پایتون، شبکه و الکترونیک.">
  <meta property="og:image" content="https://rmno21.github.io/assets/images/raman-tondro-square.jpg">
  <meta property="og:image:secure_url" content="https://rmno21.github.io/assets/images/raman-tondro-square.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="800">
  <meta property="og:image:height" content="800">
  <meta property="og:image:alt" content="رزومه رسمی مهندسی رامان تندرو">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="رزومه رسمی مهندسی رامان تندرو">
  <meta name="twitter:description" content="دانشجوی مهندسی کامپیوتر دانشگاه شیراز · توسعه‌دهنده سیستم‌های نهفته">
  <meta name="twitter:image" content="https://rmno21.github.io/assets/images/raman-tondro-square.jpg">
  <meta name="twitter:image:alt" content="رامان تندرو">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="https://avatars.githubusercontent.com/u/158779818?v=4">

  <!-- Structured Data: Google Schema Person & Resume -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "رزومه رسمی مهندسی رامان تندرو",
    "url": "https://rmno21.github.io/fa/resume.html",
    "mainEntity": {
      "@type": "Person",
      "@id": "https://rmno21.github.io/#person",
      "name": "Raman Tondro",
      "alternateName": ["رامان تندرو", "RMNO21"],
      "jobTitle": "مهندس کامپیوتر و توسعه‌دهنده سیستم‌های نهفته",
      "image": [
        "https://rmno21.github.io/assets/images/raman-tondro.jpg",
        "https://rmno21.github.io/assets/images/raman-tondro-square.jpg",
        "https://avatars.githubusercontent.com/u/158779818?v=4"
      ],
      "email": "mailto:tondroraman83@gmail.com",
      "telephone": "+989330093381",
      "url": "https://rmno21.github.io/",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Shiraz University",
        "alternateName": "دانشگاه شیراز",
        "sameAs": "https://www.wikidata.org/wiki/Q1417030"
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Peyman Sakht Co.",
        "alternateName": "شرکت پیمان ساخت"
      },
      "sameAs": [
        "https://github.com/RMNO21",
        "https://orcid.org/0009-0008-3052-1874",
        "https://www.wikidata.org/wiki/Q141601053",
        "https://t.me/RMNT21",
        "https://virgool.io/@ramantondro",
        "https://www.youtube.com/@RMNT21"
      ]
    }
  }
  </script>

  <!-- Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Vazirmatn:wght@400;500;600;700&display=swap" rel="stylesheet">`;

const faToolbar = `
</head>
<body class="lang-fa">

  <!-- Top Action Toolbar -->
  <aside class="resume-toolbar" aria-label="Resume Actions">
    <div class="toolbar-container">
      <div class="toolbar-left">
        <a href="index.html" class="btn-action">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          <span class="toolbar-nav-text">بازگشت به سایت</span>
        </a>
        <a href="../resume.html" id="langToggleBtn" class="btn-action" aria-label="View English Resume">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          <span id="langDisplay">EN / English</span>
        </a>
        <button id="themeToggleBtn" class="btn-action" aria-label="Toggle Document Theme">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <span id="themeToggleText">حالت روشن کاغذ</span>
        </button>
      </div>
      <div class="toolbar-right">
        <button onclick="window.print()" class="btn-action btn-primary" aria-label="Print or Save PDF">
          <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          <span class="toolbar-print-text">چاپ / ذخیره PDF</span>
        </button>
      </div>
    </div>
  </aside>

  <!-- Resume Document Wrapper -->
  <main class="resume-page-wrapper">`;

const faScript = `
  </main>

  <script>
    // Theme Engine (Light / Dark)
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeText = document.getElementById('themeToggleText');
    const savedTheme = localStorage.getItem('rmn_resume_theme') || 'dark';

    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      if (themeText) themeText.textContent = 'حالت تیره کنسول';
    }

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('rmn_resume_theme', isLight ? 'light' : 'dark');
        if (themeText) {
          themeText.textContent = isLight ? 'حالت تیره کنسول' : 'حالت روشن کاغذ';
        }
      });
    }
  </script>
</body>
</html>`;

const newFaResume = faHead + '\n' + originalStyles + '\n' + faToolbar + '\n' + faArticleClean + '\n' + faScript;
fs.writeFileSync(path.join(faDir, 'resume.html'), newFaResume, 'utf-8');
console.log('✓ Successfully created 100% Pure Persian fa/resume.html');
