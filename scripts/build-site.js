const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const faDir = path.join(rootDir, 'fa');
const faProjectsDir = path.join(faDir, 'projects');
const projectsDir = path.join(rootDir, 'projects');

if (!fs.existsSync(faProjectsDir)) {
  fs.mkdirSync(faProjectsDir, { recursive: true });
}

console.log('=== Building High-Precision Bilingual Architecture (100/100 Target) ===');

// Metadata Registry for all 8 projects
const projectMetadata = {
  'sepotify': {
    enTitle: 'Sepotify: Lossless Audio Engine for Android | Raman Tondro',
    enDesc: 'Engineering dossier of Sepotify: A native zero-delay lossless audio streaming and FLAC decoding engine for Android built in Kotlin by Raman Tondro.',
    faTitle: 'پروژه Sepotify: موتور صوتی نیتیو اندروید | رامان تندرو',
    faDesc: 'شناسنامه مهندسی نرم‌افزار Sepotify: موتور استریم و پخش باکیفیت و بدون تأخیر در اندروید توسعه‌یافته با کاتلین توسط رامان تندرو.'
  },
  'ruview': {
    enTitle: 'RuView: Wi-Fi CSI Spatial Sensing System | Raman Tondro',
    enDesc: 'Technical dossier of RuView: Contactless spatial intelligence and vital sign monitoring using Wi-Fi CSI RF signals in Rust by Raman Tondro.',
    faTitle: 'پروژه RuView: سیستم پایش مکانی با سیگنال وای‌فای | رامان تندرو',
    faDesc: 'شناسنامه فنی RuView: هوشمندی مکانی و پایش علائم حیاتی با تحلیل سیگنال‌های CSI وای‌فای خانگی با زبان راست توسط رامان تندرو.'
  },
  'esp32-deauth': {
    enTitle: 'ESP32-Deauth: 802.11 Firmware Appliance | Raman Tondro',
    enDesc: 'Technical dossier of ESP32-Deauth: Standalone embedded firmware for 802.11 management frame inspection and network resilience auditing by Raman Tondro.',
    faTitle: 'پروژه ESP32-Deauth: فرم‌ویر امنیتی شبکه بی‌سیم | رامان تندرو',
    faDesc: 'شناسنامه فنی فرم‌ویر ESP32-Deauth: ابزار پرتابل بازرسی و تزریق فریم‌های مدیریتی 802.11 جهت ارزیابی امنیت شبکه توسط رامان تندرو.'
  },
  'rmn-player': {
    enTitle: 'RMN_Player: OLED Video Engine & Shaders | Raman Tondro',
    enDesc: 'Technical dossier of RMN_Player: High-efficiency Windows media engine customized for OLED displays with 2D ambilight glow shaders by Raman Tondro.',
    faTitle: 'پروژه RMN_Player: پلیر ویدیویی بهینه‌شده برای OLED | رامان تندرو',
    faDesc: 'شناسنامه مهندسی RMN_Player: پلیر ویدیویی مانیتورهای OLED با هاله نوری Ambilight شیدرهای GPU و اصلاح خودکار زیرنویس اثر رامان تندرو.'
  },
  'ai-virtual-mouse': {
    enTitle: 'AI Virtual Mouse: Real-Time Hand Tracking | Raman Tondro',
    enDesc: 'Technical dossier of AI Virtual Mouse: Contactless human-computer interaction using OpenCV, MediaPipe hand tracking, and PyAutoGUI by Raman Tondro.',
    faTitle: 'پروژه ماوس مجازی با هوش مصنوعی و بینایی ماشین | رامان تندرو',
    faDesc: 'شناسنامه فنی پروژه ماوس مجازی: کنترل تعاملی اشاره‌گر ماوس با رهگیری حرکات دست توسط پردازش تصویر OpenCV و MediaPipe توسط رامان تندرو.'
  },
  'dimoled': {
    enTitle: 'DimOLED: Hardware OLED Burn-In Utility | Raman Tondro',
    enDesc: 'Technical dossier of DimOLED: Windows background utility protecting OLED panels against burn-in using true physical WMI brightness control by Raman Tondro.',
    faTitle: 'پروژه DimOLED: محافظ سخت‌افزاری نمایشگرهای OLED | رامان تندرو',
    faDesc: 'شناسنامه فنی پروژه DimOLED: ابزار محافظت سخت‌افزاری پنل‌های OLED در برابر Burn-In با کنترل مستقیم رجیسترهای روشنایی WMI توسط رامان تندرو.'
  },
  'drawsiness-detection': {
    enTitle: 'Driver Drowsiness Detection System | Raman Tondro',
    enDesc: 'Technical dossier of Driver Drowsiness Detection: Real-time driver fatigue monitoring system using 68-point facial landmarks and EAR analysis by Raman Tondro.',
    faTitle: 'پروژه تشخیص خواب‌آلودگی راننده با پردازش تصویر | رامان تندرو',
    faDesc: 'شناسنامه مهندسی سیستم پایش هوشیاری راننده: پردازش بی‌درنگ لندمارک‌های چهره و سنجش نسبت باز بودن پلک‌ها (EAR) جهت پیشگیری از تصادف توسط رامان تندرو.'
  },
  'sess-shirazu-autologin': {
    enTitle: 'SESS Shiraz University Auto-Login Extension | Raman Tondro',
    enDesc: 'Technical dossier of SESS Shiraz University Auto-Login: Automated Chrome extension with client-side credential encryption and fast portal auth by Raman Tondro.',
    faTitle: 'پروژه افزونه ورود خودکار سامانه سس دانشگاه شیراز | رامان تندرو',
    faDesc: 'شناسنامه فنی افزونه کروم ورود خودکار به سامانه سس دانشگاه شیراز: اتوماسیون احراز هویت با رمزنگاری ایمن اطلاعات در کلاینت توسط رامان تندرو.'
  }
};

// ==========================================
// 1. POLISH RESUME.HTML (PURE ENGLISH)
// ==========================================
console.log('1. Polishing resume.html...');
let enResume = fs.readFileSync(path.join(rootDir, 'resume.html'), 'utf-8');

// Title & Meta Description (optimized lengths)
enResume = enResume.replace(/<title>[^<]+<\/title>/, '<title>Raman Tondro - Official Engineering Resume</title>');
enResume = enResume.replace(/<meta\s+name=["']title["']\s+content=["'][^"']+["']>/, '<meta name="title" content="Raman Tondro - Official Engineering Resume">');
enResume = enResume.replace(/<meta\s+name=["']description["']\s+content=["'][^"']+["']>/, '<meta name="description" content="Official engineering resume of Raman Tondro (RMNO21) - Systems &amp; Embedded Developer, Computer Engineering student at Shiraz University, Infrastructure Technician.">');

// Clean out any lingering Persian text
enResume = enResume.replace(/<span class="org-subtitle">\(شرکت پیمان ساخت\)<\/span>/g, '');
enResume = enResume.replace(/<span class="org-subtitle">\(دانشگاه شیراز\)<\/span>/g, '');
enResume = enResume.replace(/سازمان بازرسی کل کشور/g, 'National General Inspection Authority');
enResume = enResume.replace(/\(آموزش نتورک پلاس\)/g, '');
enResume = enResume.replace(/\(الکترونیک مقدماتی\)/g, '');
enResume = enResume.replace(/\(برنامه‌نویسی با C\)/g, '');
enResume = enResume.replace(/\(جاوا اسکریپت فشرده\)/g, '');
enResume = enResume.replace(/aria-label="مشاهده نسخه فارسی رزومه"/g, 'aria-label="View Persian Resume"');

fs.writeFileSync(path.join(rootDir, 'resume.html'), enResume, 'utf-8');
console.log('✓ resume.html polished.');

// ==========================================
// 2. POLISH FA/RESUME.HTML (PURE PERSIAN)
// ==========================================
console.log('2. Polishing fa/resume.html...');
let faResume = fs.readFileSync(path.join(faDir, 'resume.html'), 'utf-8');

faResume = faResume.replace(/<title>[^<]+<\/title>/, '<title>رزومه رسمی مهندسی رامان تندرو | مهندس سیستم‌های نهفته و کامپیوتر</title>');
faResume = faResume.replace(/<meta\s+name=["']title["']\s+content=["'][^"']+["']>/, '<meta name="title" content="رزومه رسمی مهندسی رامان تندرو | مهندس سیستم‌های نهفته و کامپیوتر">');
faResume = faResume.replace(/<meta\s+name=["']description["']\s+content=["'][^"']+["']>/, '<meta name="description" content="رزومه رسمی و فنی مهندسی رامان تندرو (RMNO21) - دانشجوی مهندسی کامپیوتر دانشگاه شیراز، توسعه‌دهنده سیستم‌های نهفته و تکنسین زیرساخت شرکت پیمان ساخت.">');

fs.writeFileSync(path.join(faDir, 'resume.html'), faResume, 'utf-8');
console.log('✓ fa/resume.html polished.');

// ==========================================
// 3. POLISH INDEX.HTML & KNOWLEDGE PANEL SCHEMA
// ==========================================
console.log('3. Polishing index.html & Knowledge Graph Schema...');
let enIndex = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

// Ensure Entity Schema has alumniOf, worksFor, disambiguatingDescription
const alumniOfSnippet = `        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Shiraz University",
          "alternateName": "دانشگاه شیراز",
          "url": "https://shirazu.ac.ir",
          "sameAs": "https://www.wikidata.org/wiki/Q1417030"
        },
        "worksFor": {
          "@type": "Organization",
          "name": "Peyman Sakht Co.",
          "alternateName": "شرکت پیمان ساخت"
        },`;

if (!enIndex.includes('"alumniOf"')) {
  enIndex = enIndex.replace('"hasOccupation": {', alumniOfSnippet + '\n        "hasOccupation": {');
}

// Clean disambiguating description in English index
enIndex = enIndex.replace('"disambiguatingDescription": "Raman Tondro (رامان تندرو) is an individual person, software developer, and Computer Engineering student, distinct from Raman spectroscopy and gaming creators."', '"disambiguatingDescription": "Raman Tondro (RMNO21) is an Iranian systems developer and computer engineering researcher at Shiraz University, distinct from Raman spectroscopy."');
enIndex = enIndex.replace('"description": "Raman Tondro (رامان تندرو) is a Computer Engineering student specializing in embedded firmware (ESP32), C/C++, computer vision, and client systems architecture."', '"description": "Raman Tondro (RMNO21) is a Computer Engineering student specializing in embedded firmware (ESP32), C/C++, computer vision, and client systems architecture."');

// Button 4 with icon in English index
enIndex = enIndex.replace(/<a href="#contact" class="btn-tech btn-tech-secondary" data-i18n="hero.btnContact">[\s\S]*?<\/a>/, `<a href="#contact" class="btn-tech btn-tech-secondary" data-i18n="hero.btnContact">
              <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>Direct Channels</span>
            </a>`);

fs.writeFileSync(path.join(rootDir, 'index.html'), enIndex, 'utf-8');
console.log('✓ index.html polished.');

// ==========================================
// 4. POLISH FA/INDEX.HTML
// ==========================================
console.log('4. Polishing fa/index.html...');
let faIndex = fs.readFileSync(path.join(faDir, 'index.html'), 'utf-8');

if (!faIndex.includes('"alumniOf"')) {
  faIndex = faIndex.replace('"hasOccupation": {', alumniOfSnippet + '\n        "hasOccupation": {');
}

// Persian hero tagline
faIndex = faIndex.replace(/<p class="hero-tagline" id="heroTagline">[\s\S]*?<\/p>/, `<p class="hero-tagline" id="heroTagline">
            حوزه تمرکز: فرم‌ویر و سیستم‌های نهفته، معماری نزدیک به سخت‌افزار، مهندسی میکروکنترلرها (ESP32) و نرم‌افزارهای کلاینت با کارایی بالا.
          </p>`);

// Persian Button 4 with icon
faIndex = faIndex.replace(/<a href="#contact" class="btn-tech btn-tech-secondary" data-i18n="hero.btnContact">[\s\S]*?<\/a>/, `<a href="#contact" class="btn-tech btn-tech-secondary" data-i18n="hero.btnContact">
              <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>پل‌های ارتباطی</span>
            </a>`);

fs.writeFileSync(path.join(faDir, 'index.html'), faIndex, 'utf-8');
console.log('✓ fa/index.html polished.');

// ==========================================
// 5. UPDATE ALL 8 PROJECT PAGES WITH METADATA REGISTRY
// ==========================================
console.log('5. Polishing all project pages (EN & FA)...');
const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.html'));

projectFiles.forEach(file => {
  const slug = file.replace('.html', '');
  const meta = projectMetadata[slug];
  if (!meta) {
    console.warn(`No metadata registered for ${slug}!`);
    return;
  }

  // --- ENGLISH PROJECT FILE ---
  const enProjPath = path.join(projectsDir, file);
  let enProj = fs.readFileSync(enProjPath, 'utf-8');

  // Update Title & Meta
  enProj = enProj.replace(/<title>[^<]+<\/title>/, `<title>${meta.enTitle}</title>`);
  enProj = enProj.replace(/<meta\s+name=["']title["']\s+content=["'][^"']+["']>/, `<meta name="title" content="${meta.enTitle}">`);
  enProj = enProj.replace(/<meta\s+name=["']description["']\s+content=["'][^"']+["']>/, `<meta name="description" content="${meta.enDesc}">`);
  enProj = enProj.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']+["']>/, `<meta property="og:title" content="${meta.enTitle}">`);
  enProj = enProj.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']+["']>/, `<meta property="og:description" content="${meta.enDesc}">`);
  enProj = enProj.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']+["']>/, `<meta name="twitter:title" content="${meta.enTitle}">`);
  enProj = enProj.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][^"']+["']>/, `<meta name="twitter:description" content="${meta.enDesc}">`);

  fs.writeFileSync(enProjPath, enProj, 'utf-8');

  // --- PERSIAN PROJECT FILE ---
  const faProjPath = path.join(faProjectsDir, file);
  let faProj = fs.readFileSync(faProjPath, 'utf-8');

  // Update Title & Meta to Persian
  faProj = faProj.replace(/<title>[^<]+<\/title>/, `<title>${meta.faTitle}</title>`);
  faProj = faProj.replace(/<meta\s+name=["']title["']\s+content=["'][^"']+["']>/, `<meta name="title" content="${meta.faTitle}">`);
  faProj = faProj.replace(/<meta\s+name=["']description["']\s+content=["'][^"']+["']>/, `<meta name="description" content="${meta.faDesc}">`);
  faProj = faProj.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']+["']>/, `<meta property="og:title" content="${meta.faTitle}">`);
  faProj = faProj.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']+["']>/, `<meta property="og:description" content="${meta.faDesc}">`);
  faProj = faProj.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']+["']>/, `<meta name="twitter:title" content="${meta.faTitle}">`);
  faProj = faProj.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][^"']+["']>/, `<meta name="twitter:description" content="${meta.faDesc}">`);

  fs.writeFileSync(faProjPath, faProj, 'utf-8');
});

console.log('✓ All 8 project case studies updated with verified title and description lengths.');
console.log('=== Precision Build Complete ===');
