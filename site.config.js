/**
 * Raman Tondro - Official Portfolio Configuration
 * Central source of truth for site content, projects, and metadata.
 */

window.SITE_CONFIG = {
  profile: {
    name: "Raman Tondro",
    persianName: "رامان تندرو",
    handle: "RMNO21",
    tagline: "Systems & Embedded Developer | Low-level Architecture & Microcontrollers",
    persianTagline: "توسعه‌دهنده سیستم‌های نهفته | معماری نزدیک به سخت‌افزار و میکروکنترلرها",
    status: "Status: Active · Open to technical collaboration",
    persianStatus: "وضعیت: فعال · آماده همکاری‌های فنی و مهندسی",
    location: "Iran",
    persianLocation: "ایران",
    email: "tondroraman83@gmail.com",
    github: "https://github.com/RMNO21",
    orcid: "https://orcid.org/0009-0008-3052-1874",
    wikidata: "https://www.wikidata.org/wiki/Q141601053",
    youtube: "https://www.youtube.com/@RMNT21",
    telegram: "https://t.me/RMNT21",
    phone: "+989330093381",
    resumeUrl: "resume.html",
    avatar: "https://avatars.githubusercontent.com/u/158779818?v=4",
    portrait: "assets/images/raman-tondro-square.jpg",
    bio: [
      "Focus: Embedded firmware (ESP32), low-level architecture, bare-metal C/C++, native client systems & edge vision.",
      "Engineering Directive: Direct hardware control, minimal abstraction overhead, deterministic execution."
    ],
    persianBio: [
      "حوزه تمرکز: فرم‌ویر و میکروکنترلرهای ESP32، معماری نزدیک به سخت‌افزار و سیستم‌های پایه، توسعه کلاینت‌های نیتیو و پردازش تصویر در لبه.",
      "جهت‌گیری مهندسی: کنترل مستقیم سخت‌افزار، حذف سربار لایه‌ها، عملکرد قطعی و پایدار."
    ]
  },

  skills: [
    {
      category: "Embedded & Hardware",
      items: ["ESP32 / ESP8266", "C & C++", "FreeRTOS", "802.11 Wi-Fi Raw Frames", "Digital Circuit Design", "Proteus"]
    },
    {
      category: "Software & Mobile",
      items: ["Kotlin (Android SDK)", "Python", "Lua", "AutoHotkey (Win32 APIs)", "Rust (Embedded/Systems)", "Bash / Shell"]
    },
    {
      category: "Vision & Signal Processing",
      items: ["OpenCV", "MediaPipe", "Facial Landmark Detection", "CSI Wi-Fi Sensing", "FFmpeg Multi-pass"]
    },
    {
      category: "Infrastructure & Security",
      items: ["Linux Kernel & Distros", "Network Packet Auditing", "Git & CI/CD", "Reverse Engineering", "Wireshark"]
    }
  ],

  projects: [
    {
      title: "Sepotify",
      category: "mobile",
      tag: "Android / Kotlin",
      description: "Native zero-delay audio streaming and offline playback engine for Android with lossless FLAC decoding and background service isolation.",
      persianDescription: "موتور پخش و استریم نیتیو موزیک در اندروید با تأخیر صفر، پشتیبانی از دیکود فایل‌های Lossless FLAC و معماری سرویس پس‌زمینه بدون کرش.",
      stack: ["Kotlin", "Android SDK", "FLAC", "Media3"],
      url: "https://github.com/RMNO21/Sepotify",
      caseStudyUrl: "projects/sepotify.html",
      stars: 6
    },
    {
      title: "RuView",
      category: "embedded",
      tag: "RF Sensing / Rust",
      description: "Spatial intelligence and vital sign monitoring using commodity Wi-Fi CSI signals without requiring cameras or optical sensors.",
      persianDescription: "هوشمندی مکانی و پایش علائم حیاتی و حضور افراد با تحلیل سیگنال‌های CSI وای‌فای خانگی بدون نیاز به هیچ‌گونه دوربین نوری.",
      stack: ["Rust", "Wi-Fi CSI", "RF Analysis", "IoT"],
      url: "https://github.com/RMNO21/RuView",
      caseStudyUrl: "projects/ruview.html",
      stars: 2
    },
    {
      title: "ESP32-Deauth",
      category: "security",
      tag: "Firmware / C++",
      description: "Standalone embedded firmware for ESP32 microcontrollers executing 802.11 management frame inspection, injection, and security auditing.",
      persianDescription: "فرم‌ویر میکروکنترلر ESP32 جهت بازرسی و تزریق فریم‌های مدیریتی 802.11 و ارزیابی پروتکل‌های امنیتی شبکه‌های بی‌سیم.",
      stack: ["C++", "ESP32", "802.11", "Network Auditing"],
      url: "https://github.com/RMNO21/esp32-deauth",
      caseStudyUrl: "projects/esp32-deauth.html",
      stars: 3
    },
    {
      title: "RMN_Player",
      category: "vision",
      tag: "Media / Lua",
      description: "High-efficiency Windows media engine customized for OLED monitors with dynamic ambilight glow shaders and auto subtitle repair.",
      persianDescription: "پلیر ویدیویی پرسرعت برای مانیتورهای OLED با هاله نوری Ambilight شیدرهای GPU، دیکود سخت‌افزاری و اصلاح خودکار زیرنویس‌های فارسی.",
      stack: ["Lua", "MPV Engine", "GLSL Shaders", "Win32"],
      url: "https://github.com/RMNO21/rmn-player",
      caseStudyUrl: "projects/rmn-player.html",
      stars: 2
    },
    {
      title: "sess-shirazu-autologin",
      category: "automation",
      tag: "Browser / Scripting",
      description: "High-performance browser extension automating portal authentication with smart CAPTCHA reset.",
      persianDescription: "افزونه مرورگر سریع برای ورود خودکار به سامانه دانشگاهی با قابلیت تشخیص و ریست هوشمند کپچا.",
      stack: ["JavaScript", "Chrome MV3", "DOM", "Automation"],
      url: "https://github.com/RMNO21/sess-shirazu-autologin",
      caseStudyUrl: "projects/sess-shirazu-autologin.html",
      stars: 1
    },
    {
      title: "Drawsiness-detection",
      category: "vision",
      tag: "Computer Vision",
      description: "Real-time driver fatigue monitor tracking ocular blink duration and facial 68-point landmarks via computer vision to prevent collisions.",
      persianDescription: "سیستم پایش زمان‌واقعی خستگی و خواب‌آلودگی راننده بر پایه نرخ پلک‌زدن و لندمارک‌های چهره جهت پیشگیری از تصادفات جاده‌ای.",
      stack: ["Python", "OpenCV", "Dlib", "Facial Landmarks"],
      url: "https://github.com/RMNO21/drawsiness-detection",
      caseStudyUrl: "projects/drawsiness-detection.html",
      stars: 1
    },
    {
      title: "ai-virtual-mouse",
      category: "vision",
      tag: "Vision / Win32",
      description: "Jitter-free computer vision virtual mouse for Windows using MediaPipe hand tracking, decoupled gesture state machines, and Win32 APIs.",
      persianDescription: "موس مجازی بدون لرزش در ویندوز با رهگیری حرکات دست توسط MediaPipe و شبیه‌سازی دقیق ماوس با Win32 API.",
      stack: ["Python", "MediaPipe", "Win32", "OpenCV"],
      url: "https://github.com/RMNO21/AI-Virtual-Mouse",
      caseStudyUrl: "projects/ai-virtual-mouse.html",
      stars: 2
    },
    {
      title: "Mort",
      category: "automation",
      tag: "CLI Tooling",
      description: "Intelligent CLI media orchestrator that parses MKV codecs, groups multi-season TV shows, tags audio tracks, and cleans directory trees.",
      persianDescription: "ابزار خط فرمانی جهت سازماندهی خودکار، تگ‌گذاری و دسته‌بندی فایل‌های ویدیویی MKV و سریال‌های چندفصلی.",
      stack: ["Python", "CLI", "Media Parsing", "Regex"],
      url: "https://github.com/RMNO21/Mort",
      stars: 3
    },
    {
      title: "Linux_Mirrors",
      category: "security",
      tag: "Linux / DevOps",
      description: "Resilient cross-distribution Linux mirror routing manager designed for uninterrupted package updates during network anomalies.",
      persianDescription: "مدیریت و مسیریابی هوشمند میرورهای لینوکس جهت دانلود پایدار و پرسرعت پکیج‌ها در شرایط اختلال شبکه.",
      stack: ["Bash", "Linux", "Network Routing", "Shell"],
      url: "https://github.com/RMNO21/Linux_Mirrors",
      stars: 2
    },
    {
      title: "DimOLED",
      category: "automation",
      tag: "Win32 / AHK",
      description: "Zero-flicker background utility protecting OLED monitors against burn-in through direct hardware luminance regulation without latency.",
      persianDescription: "ابزار بهینه‌سازی پس‌زمینه جهت محافظت از نمایشگرهای OLED در برابر پیکسل سوختگی با تنظیم نرم روشنایی در سطح سخت‌افزار.",
      stack: ["AutoHotkey", "Win32 API", "OLED Tech"],
      url: "https://github.com/RMNO21/DimOLED",
      caseStudyUrl: "projects/dimoled.html",
      stars: 1
    }
  ],

  terminal: {
    prompt: "raman@arch-box:~$",
    banner: [
      "===========================================================",
      "  RAMAN TONDRO [RMNO21] - SYSTEMS & EMBEDDED KERNEL SHELL  ",
      "  Type 'help' for available commands or 'whoami' to inspect.",
      "==========================================================="
    ],
    commands: {
      help: "Available commands: whoami, bio, projects, skills, resume, contact, specs, clear, exit",
      whoami: "Raman Tondro: Systems Developer & Embedded Firmware Engineer",
      resume: "Opening official resume: https://rmno21.github.io/resume.html",
      contact: "Email: tondroraman83@gmail.com | Telegram: @RMNT21 | GitHub: https://github.com/RMNO21",
      specs: [
        "OS: Arch Linux x86_64 / FreeRTOS (ESP32)",
        "Kernel: 6.10-hardened-rt",
        "Hardware Target: ESP32-WROOM-32 / Android ARM64",
        "Primary Stack: C++20, Rust, Kotlin, Python 3.12",
        "Status: Active & Compiling"
      ]
    }
  }
};
