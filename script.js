/**
 * Personal Portfolio & Identity Engine
 * Raman Tondro (رامان تندرو) - RMNO21
 */

const translations = {
  en: {
    langLabel: "FA / فارسی",
    "nav.about": "Biography",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "hero.status": "Available for Engineering Projects & Research",
    "hero.role": "Computer Engineering Student & Electrical/Computer Technician",
    "hero.tagline": "Bridging the gap between hardware circuits and high-performance software architecture. Passionate about embedded microcontrollers (ESP32), computer vision, Android applications, and network security tooling.",
    "hero.cta.projects": "Explore Projects",
    "hero.cta.github": "GitHub Profile (@RMNO21)",
    "hero.cta.contact": "Get in Touch",
    "metrics.repos": "Public Repositories",
    "metrics.followers": "GitHub Followers",
    "metrics.stacks": "Languages & Frameworks",
    "metrics.passion": "Open-Source Dedication",
    "about.tag": "Official Biography",
    "about.title": "About Raman Tondro (درباره رامان تندرو)",
    "about.subtitle": "Background, academic journey, and engineering principles",
    "projects.tag": "Engineering Portfolio",
    "projects.title": "Featured Open-Source Repositories",
    "projects.subtitle": "Handcrafted systems spanning embedded hardware, computer vision, mobile, and security",
    "skills.tag": "Technical Capabilities",
    "skills.title": "Skills & Engineering Stack",
    "skills.subtitle": "Languages, hardware architectures, and developer frameworks",
    "contact.tag": "Get Connected",
    "contact.title": "Connect With Raman Tondro",
    "contact.subtitle": "For collaboration, project inquiries, or technical discussion"
  },
  fa: {
    langLabel: "EN / انگلیسی",
    "nav.about": "بیوگرافی",
    "nav.projects": "پروژه‌ها",
    "nav.skills": "مهارت‌ها",
    "nav.contact": "ارتباط",
    "hero.status": "آماده برای پروژه‌های مهندسی و همکاری پژوهشی",
    "hero.role": "دانشجوی مهندسی کامپیوتر و تکنسین برق و کامپیوتر",
    "hero.tagline": "پیوند میان مدارهای سخت‌افزاری و معماری نرم‌افزارهای پرسرعت. متمرکز بر میکروکنترلرهای تعبیه‌شده (ESP32)، بینایی ماشین، توسعه اپلیکیشن‌های اندروید و ابزارهای امنیت شبکه.",
    "hero.cta.projects": "مشاهده پروژه‌ها",
    "hero.cta.github": "پروفایل گیت‌هاب (@RMNO21)",
    "hero.cta.contact": "تماس و ارتباط",
    "metrics.repos": "مخازن عمومی گیت‌هاب",
    "metrics.followers": "دنبال‌کنندگان گیت‌هاب",
    "metrics.stacks": "زبان‌ها و فریم‌ورک‌ها",
    "metrics.passion": "تعهد به متن‌باز",
    "about.tag": "بیوگرافی رسمی",
    "about.title": "درباره رامان تندرو (About Raman Tondro)",
    "about.subtitle": "پیشینه، مسیر دانشگاهی و اصول مهندسی",
    "projects.tag": "نمونه کارهای مهندسی",
    "projects.title": "پروژه‌های شاخص منبع‌باز",
    "projects.subtitle": "سیستم‌های توسعه‌یافته در حوزه‌های سخت‌افزار، بینایی ماشین، موبایل و امنیت",
    "skills.tag": "توانمندی‌های فنی",
    "skills.title": "مهارت‌ها و فناوری‌های مورد استفاده",
    "skills.subtitle": "زبان‌های برنامه‌نویسی، معماری‌های سخت‌افزاری و ابزارهای توسعه",
    "contact.tag": "پل‌های ارتباطی",
    "contact.title": "راه‌های ارتباط با رامان تندرو",
    "contact.subtitle": "جهت همکاری‌های فنی، پروژه‌ها و گفتگوهای پژوهشی"
  }
};

let currentLang = localStorage.getItem("preferred_lang") || "en";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("preferred_lang", lang);
  
  if (lang === "fa") {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "fa");
    document.body.classList.add("lang-fa");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.setAttribute("lang", "en");
    document.body.classList.remove("lang-fa");
  }

  // Update translatable elements
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  const langLabel = document.getElementById("langLabel");
  if (langLabel && translations[lang]) {
    langLabel.textContent = translations[lang].langLabel;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const nextLang = currentLang === "en" ? "fa" : "en";
      setLanguage(nextLang);
    });
  }

  if (currentLang !== "en") {
    setLanguage(currentLang);
  }

  // Optional: Fetch live GitHub statistics
  fetchLiveGitHubStats();
});

async function fetchLiveGitHubStats() {
  try {
    const response = await fetch("https://api.github.com/users/RMNO21");
    if (!response.ok) return;
    const data = await response.json();
    
    // If successful, update repo & follower metrics if present
    const repoMetric = document.querySelector(".metrics-grid .metric-card:nth-child(1) .metric-num");
    const followerMetric = document.querySelector(".metrics-grid .metric-card:nth-child(2) .metric-num");
    
    if (repoMetric && data.public_repos) {
      repoMetric.textContent = `${data.public_repos}+`;
    }
    if (followerMetric && data.followers) {
      followerMetric.textContent = `${data.followers}+`;
    }
  } catch (e) {
    // Fail silently; fallback static metrics are already in place
  }
}
