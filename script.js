/**
 * Minimalist Systems Engineer & Terminal Engine
 * Raman Tondro (RMNO21)
 */

(function () {
  const config = window.SITE_CONFIG || {};

  const i18n = {
    en: {
      pageTitle: "Raman Tondro | Systems & Embedded Engineer",
      langBtn: "FA / فارسی",
      headerName: config.profile?.name || "Raman Tondro",
      headerSub: "Systems Developer",
      heroTitle: config.profile?.name || "Raman Tondro",
      heroTagline: config.profile?.bio?.[0] || "Focus: Embedded firmware, low-level architecture, microcontrollers (ESP32) & high-performance client systems.",
      "nav.projects": "Projects",
      "nav.terminal": "Terminal",
      "nav.skills": "Stack",
      "nav.about": "Dossier",
      "nav.resume": "Resume",
      "nav.contact": "Contact",
      "hero.status": config.profile?.status || "Status: Active · Open to technical collaboration",
      "hero.btnResume": "Official Resume",
      "hero.btnProjects": "Explore Repositories",
      "hero.btnTerminal": "Open Shell Terminal",
      "hero.btnContact": "Direct Channels",
      "projects.label": "System Repositories",
      "projects.headline": "Engineered Implementations",
      "skills.label": "Technical Scope",
      "skills.headline": "Engineering Stack & Toolchain",
      "about.label": "System Dossier",
      "about.headline": "Technical Profile & Scope",
      "sidebar.nameLabel": "Identity",
      "sidebar.locationLabel": "Location",
      "sidebar.targetLabel": "Core Domain",
      "sidebar.githubLabel": "GitHub Handle",
      sidebarName: config.profile?.name || "Raman Tondro",
      sidebarLocation: "Iran",
      sidebarTarget: "Embedded Firmware & Low-Level Systems",
      "contact.label": "Endpoints",
      "contact.headline": "Direct Channels",
      footerCopy: "&copy; 2026 Raman Tondro &middot; Systems Architecture &middot; Hosted on GitHub Pages",
      bioParagraphs: [
        "<strong>Profile:</strong> Systems & Embedded Software Developer &middot; Computer Engineering & Hardware Technology.",
        "<strong>Technical Scope:</strong> Bare-metal C/C++ firmware on <strong>ESP32</strong>, 802.11 raw packet inspection, low-latency audio engines (<strong>Kotlin</strong>), and real-time edge computer vision.",
        "<strong>Engineering Directive:</strong> Direct hardware control, minimal abstraction overhead, deterministic execution."
      ]
    },
    fa: {
      pageTitle: "رامان تندرو | مهندسی سیستم‌ها و نهفته",
      langBtn: "EN / English",
      headerName: config.profile?.persianName || "رامان تندرو",
      headerSub: "توسعه‌دهنده سیستم‌های نهفته",
      heroTitle: config.profile?.persianName || "رامان تندرو",
      heroTagline: config.profile?.persianBio?.[0] || "حوزه تمرکز: فرم‌ویر و سیستم‌های نهفته، معماری سطح پایین، مهندسی میکروکنترلرها (ESP32) و نرم‌افزارهای کلاینت با کارایی بالا.",
      "nav.projects": "پروژه‌ها",
      "nav.terminal": "ترمینال",
      "nav.skills": "مهارت‌ها",
      "nav.about": "شناسنامه",
      "nav.resume": "رزومه رسمی",
      "nav.contact": "ارتباط",
      "hero.status": config.profile?.persianStatus || "وضعیت: فعال · آماده همکاری‌های فنی و مهندسی",
      "hero.btnResume": "مشاهده رزومه و مدارک",
      "hero.btnProjects": "مشاهده مخازن",
      "hero.btnTerminal": "کنسول خط فرمان",
      "hero.btnContact": "پل‌های ارتباطی",
      "projects.label": "مخازن و سیستم‌ها",
      "projects.headline": "پیاده‌سازی‌های مهندسی",
      "skills.label": "ابعاد فنی",
      "skills.headline": "معماری فنی و پشته ابزارها",
      "about.label": "شناسنامه سیستم",
      "about.headline": "مشخصات و ابعاد فنی",
      "sidebar.nameLabel": "هویت",
      "sidebar.locationLabel": "موقعیت",
      "sidebar.targetLabel": "تمرکز تخصصی",
      "sidebar.githubLabel": "شناسه گیت‌هاب",
      sidebarName: config.profile?.persianName || "رامان تندرو",
      sidebarLocation: "ایران",
      sidebarTarget: "فرم‌ویر و سیستم‌های سطح پایین",
      "contact.label": "پل‌های ارتباطی",
      "contact.headline": "راه‌های ارتباط مستقیم",
      footerCopy: "&copy; ۲۰۲۶ رامان تندرو &middot; معماری سیستم‌های نهفته &middot; میزبانی روی گیت‌هاب پیجز",
      bioParagraphs: [
        "<strong>پروفایل:</strong> توسعه‌دهنده سیستم‌ها و فرم‌ویر نهفته &middot; مهندسی کامپیوتر و فناوری‌های سخت‌افزاری.",
        "<strong>محورهای تخصصی:</strong> برنامه‌نویسی سطح پایین C/++C روی <strong>ESP32</strong>، آنالیز پکت‌های خام 802.11، موتورهای استریم نیتیو (<strong>کاتلین</strong>) و بینایی ماشین بی‌درنگ در لبه پردازش.",
        "<strong>جهت‌گیری مهندسی:</strong> دسترسی مستقیم به سخت‌افزار، کارایی قطعی، حذف لایه‌های سربار و توسعه سیستم‌های خودکفا."
      ]
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const paramLang = urlParams.get("lang");
  let currentLang = (paramLang === "fa" || paramLang === "en") ? paramLang : (localStorage.getItem("rmn_lang") || "en");

  // --- Dynamic Project Catalog Rendering ---
  function renderProjects(filter = "all") {
    const container = document.getElementById("projectsCatalog");
    if (!container || !config.projects) return;

    const filtered = filter === "all"
      ? config.projects
      : config.projects.filter(p => p.category === filter);

    container.innerHTML = filtered.map(p => {
      const desc = currentLang === "fa" && p.persianDescription ? p.persianDescription : p.description;
      const stackHtml = p.stack.map(s => `<span class="stack-badge">${s}</span>`).join("");

      return `
        <article class="project-card-tech" data-category="${p.category}">
          <div class="project-top-row">
            <span class="project-tag-pill">${p.tag}</span>
            <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="project-repo-link" aria-label="${p.title} on GitHub">
              <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
          <h3 class="project-name-tech">${p.title}</h3>
          <p class="project-summary-tech">${desc}</p>
          <div class="project-stack-row">
            ${stackHtml}
          </div>
        </article>
      `;
    }).join("");
  }

  // --- Dynamic Skills Matrix Rendering ---
  function renderSkills() {
    const container = document.getElementById("skillsMatrix");
    if (!container || !config.skills) return;

    container.innerHTML = config.skills.map(s => `
      <div class="skill-matrix-card">
        <div class="skill-matrix-category">${s.category}</div>
        <ul class="skill-list-items">
          ${s.items.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `).join("");
  }

  // --- Interactive Terminal Engine (Option B) ---
  const cmdHistory = [];
  let historyIdx = -1;

  function initTerminal() {
    const output = document.getElementById("terminalOutput");
    const input = document.getElementById("terminalInput");
    const termWindow = document.getElementById("terminalWindow");
    if (!output || !input) return;

    // Display Banner
    if (config.terminal?.banner) {
      output.innerHTML = `<span class="out-banner">${config.terminal.banner.join("\n")}</span>\n\nType '<span class="out-cmd">help</span>' for a list of available commands.\n\n`;
    }

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const rawCmd = input.value.trim();
        input.value = "";
        if (!rawCmd) return;

        cmdHistory.push(rawCmd);
        historyIdx = cmdHistory.length;

        executeTerminalCommand(rawCmd, output);
        if (termWindow) {
          termWindow.scrollTop = termWindow.scrollHeight;
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIdx > 0) {
          historyIdx--;
          input.value = cmdHistory[historyIdx] || "";
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIdx < cmdHistory.length - 1) {
          historyIdx++;
          input.value = cmdHistory[historyIdx] || "";
        } else {
          historyIdx = cmdHistory.length;
          input.value = "";
        }
      }
    });

    // Keyboard shortcut: Pressing '~' or '/' focuses terminal
    window.addEventListener("keydown", (e) => {
      if ((e.key === "~" || e.key === "`") && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
        const termElem = document.getElementById("terminal");
        if (termElem) termElem.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  function executeTerminalCommand(cmdStr, outputElem) {
    const cmd = cmdStr.toLowerCase().trim();
    const promptLine = `<span class="terminal-prompt">${config.terminal?.prompt || "raman@arch-box:~$"}</span> ${escapeHtml(cmdStr)}\n`;
    let response = "";

    switch (cmd) {
      case "help":
        response = `Available commands:
  • <span class="out-cmd">whoami</span>    - Prints identity, university and focus
  • <span class="out-cmd">bio</span>       - Displays full developer biography
  • <span class="out-cmd">projects</span>  - Lists primary open-source systems
  • <span class="out-cmd">skills</span>    - Technical toolchain breakdown
  • <span class="out-cmd">resume</span>    - Official verified resume & credentials
  • <span class="out-cmd">specs</span>     - Architecture & hardware specifications
  • <span class="out-cmd">contact</span>   - Direct communication channels
  • <span class="out-cmd">clear</span>     - Clears the terminal screen
  • <span class="out-cmd">neofetch</span>  - System banner representation`;
        break;

      case "resume":
        response = `Official Engineering Dossier & Verified Credentials:\n<a href="resume.html" style="color:#38bdf8; text-decoration:underline;">➜ Click here to open resume.html (Print / PDF Ready)</a>\n\nVerified credentials: Sololearn, FaraDars, Maktabkhooneh & Social Security Organization of Iran.`;
        break;

      case "whoami":
        response = currentLang === "fa"
          ? (config.profile?.persianName + ": توسعه‌دهنده سیستم‌ها و فرم‌ویر نهفته (ESP32) | مهندسی کامپیوتر")
          : "Raman Tondro: Systems Developer & Embedded Firmware (ESP32) Engineer";
        break;

      case "bio":
        response = currentLang === "fa"
          ? (config.profile?.persianBio || []).join("\n\n")
          : (config.profile?.bio || []).join("\n\n");
        break;

      case "projects":
        response = (config.projects || [])
          .map(p => `• <span class="out-highlight">${p.title}</span> [${p.tag}]: ${currentLang === 'fa' && p.persianDescription ? p.persianDescription : p.description}`)
          .join("\n\n");
        break;

      case "skills":
        response = (config.skills || [])
          .map(s => `[${s.category}]\n  ${s.items.join(", ")}`)
          .join("\n\n");
        break;

      case "specs":
      case "neofetch":
        response = `
   /\\       raman@arch-box
  /  \\      --------------
 / /\\ \\     OS: Arch Linux x86_64 / FreeRTOS
/ /__\\ \\    Host: ESP32-WROOM-32 / Android ARM64
\\/____\\/    Kernel: 6.10.4-hardened-rt
            Stack: C++20, Rust, Kotlin, Python, GLSL
            Focus: Embedded Firmware & Real-time Systems
            Status: Active & Compiling`;
        break;

      case "contact":
        response = `Email: <a href="mailto:${config.profile?.email}" style="color:#38bdf8;">${config.profile?.email}</a>\nGitHub: <a href="${config.profile?.github}" target="_blank" style="color:#38bdf8;">${config.profile?.github}</a>`;
        break;

      case "clear":
        outputElem.innerHTML = "";
        return;

      case "exit":
        response = "Session stays persistent. Terminal cannot be killed.";
        break;

      case "sudo":
      case "sudo rm -rf /":
        response = "<span style='color:#ef4444;'>Permission denied: Raman is root. You are not in the sudoers file. This incident will be reported.</span>";
        break;

      default:
        response = `<span style="color:#ef4444;">zsh: command not found: ${escapeHtml(cmd)}</span>. Type '<span class="out-cmd">help</span>' for available commands.`;
        break;
    }

    outputElem.innerHTML += promptLine + response + "\n\n";
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // --- Language Toggle Engine ---
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("rmn_lang", lang);

    if (lang === "fa") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "fa");
      document.body.classList.add("lang-fa");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
      document.body.classList.remove("lang-fa");
    }

    const dict = i18n[lang] || i18n.en;

    // Document title
    if (dict.pageTitle) {
      document.title = dict.pageTitle;
      const titleEl = document.getElementById("pageTitle");
      if (titleEl) titleEl.textContent = dict.pageTitle;
    }

    // Update all data-i18n attributes
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update specific ID targets
    const langDisplay = document.getElementById("langDisplay");
    if (langDisplay) langDisplay.textContent = dict.langBtn;

    const headerName = document.getElementById("headerName");
    if (headerName) headerName.textContent = dict.headerName;

    const headerSub = document.getElementById("headerSub");
    if (headerSub) headerSub.textContent = dict.headerSub;

    const heroTitle = document.getElementById("heroTitle");
    if (heroTitle) heroTitle.textContent = dict.heroTitle;

    const heroTagline = document.getElementById("heroTagline");
    if (heroTagline) heroTagline.textContent = dict.heroTagline;

    const bioEditorial = document.getElementById("bioEditorial");
    if (bioEditorial && dict.bioParagraphs) {
      bioEditorial.innerHTML = dict.bioParagraphs.map(p => `<p>${p}</p>`).join("");
    }

    const sidebarName = document.getElementById("sidebarName");
    if (sidebarName) {
      sidebarName.innerHTML = (lang === "fa")
        ? `رامان تندرو <span class="sidebar-info-sub" dir="ltr">(Raman Tondro)</span>`
        : `Raman Tondro <span class="sidebar-info-sub" dir="rtl">(رامان تندرو)</span>`;
    }

    const sidebarLoc = document.getElementById("sidebarLocation");
    if (sidebarLoc) sidebarLoc.textContent = dict.sidebarLocation;

    const sidebarTarget = document.getElementById("sidebarTarget");
    if (sidebarTarget) sidebarTarget.textContent = dict.sidebarTarget;

    const footerCopy = document.getElementById("footerCopy");
    if (footerCopy) footerCopy.innerHTML = dict.footerCopy;

    // Re-render project descriptions in chosen language
    const activeFilter = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "all";
    renderProjects(activeFilter);
  }

  // --- Setup Event Listeners ---
  document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize language first so all dynamic text and projects match
    setLanguage(currentLang);
    renderSkills();
    initTerminal();

    // 2. Filter Buttons
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProjects(btn.getAttribute("data-filter") || "all");
      });
    });

    // 3. Language Toggle
    const langBtn = document.getElementById("langToggleBtn");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        const nextLang = currentLang === "en" ? "fa" : "en";
        setLanguage(nextLang);
      });
    }
  });
})();
