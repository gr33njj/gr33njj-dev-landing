export interface DesktopProject {
  id: string;
  cat: string[];
  tag: string;
  link: string;
  stack: string;
  isCase?: boolean;
  en: { desc: string; result: string };
  ru: { desc: string; result: string };
}

export const PROJECTS: DesktopProject[] = [
  {
    id: "lis-mini",
    cat: ["fullstack"],
    tag: "FULLSTACK · CRM",
    link: "https://github.com/gr33njj/lis-mini",
    stack: "Python · FastAPI · React · PostgreSQL",
    en: { desc: "Lightweight CRM for small business: fast deployment, minimal interface, no training needed.", result: "Client management without the bloat." },
    ru: { desc: "Лёгкая CRM для малого бизнеса: быстрый деплой, минимальный интерфейс, обучение не нужно.", result: "Управление клиентами без лишнего." },
  },
  {
    id: "skangar-landing",
    cat: ["seo"],
    tag: "SEO · CONTENT",
    link: "/case/skangar",
    stack: "Python · Jinja · JSON-LD · nginx",
    isCase: true,
    en: { desc: "A landing page that outgrew itself into content infrastructure: 75 city pages with real regional specifics, a 13-article knowledge base with a 37-term glossary.", result: "Structured data on every page, cluster internal linking." },
    ru: { desc: "Лендинг, который вырос в контент-инфраструктуру: 75 городских страниц с реальной региональной спецификой, база знаний из 13 статей и глоссарий на 37 терминов.", result: "Структурированные данные на каждой странице, кластерная перелинковка." },
  },
  {
    id: "mydoc-loyalty",
    cat: ["product"],
    tag: "PWA · ANDROID · IOS",
    link: "/case/mydoctor",
    stack: "FastAPI · PostgreSQL · Redis · Docker",
    isCase: true,
    en: { desc: "Loyalty and booking app for a medical clinic: online appointments, e-records, bonuses and gift cards — live in Google Play and RuStore.", result: "Shipped product used by real patients." },
    ru: { desc: "Приложение лояльности и записи для клиники: онлайн-запись, электронная карта, бонусы и подарочные сертификаты — в Google Play и RuStore.", result: "Продукт в проде, им пользуются реальные пациенты." },
  },
  {
    id: "telemedicine",
    cat: ["fullstack", "product"],
    tag: "FULLSTACK · WEBRTC",
    link: "https://github.com/gr33njj/telemedicine",
    stack: "Python · WebRTC · Redis",
    en: { desc: "Platform for online doctor consultations with real-time video over WebRTC.", result: "MVP launched and validated." },
    ru: { desc: "Платформа онлайн-консультаций с врачом: видео в реальном времени на WebRTC.", result: "MVP запущен и проверен на людях." },
  },
  {
    id: "tron-staking-app",
    cat: ["web3"],
    tag: "WEB3 · R&D",
    link: "https://github.com/gr33njj/tron-staking-app",
    stack: "Web3 · React · Tron API",
    en: { desc: "Experimental TRX staking app with yield tracking — a deep dive into blockchain mechanics.", result: "From zero to working on-chain flow." },
    ru: { desc: "Экспериментальный стейкинг TRX с отслеживанием доходности — заход в блокчейн-механику по-настоящему.", result: "С нуля до работающего on-chain флоу." },
  },
  {
    id: "TRAD3",
    cat: ["automation"],
    tag: "TRADING · AUTOMATION",
    link: "/case/trad3",
    stack: "Python · FastAPI · SQLite · Telegram Bot API",
    isCase: true,
    en: { desc: "A reversal-detection system for crypto perpetuals: weighted scoring instead of a rigid state machine, no repainting, alerts straight to Telegram.", result: "27 instruments tracked 24/7, running in paper mode." },
    ru: { desc: "Система поиска разворотов на крипто-перпетуалах: взвешенный скоринг вместо жёсткого автомата, без перерисовки, алерты сразу в Telegram.", result: "27 инструментов под наблюдением 24/7, работает в paper-режиме." },
  },
  {
    id: "GAZON",
    cat: ["automation"],
    tag: "AI AGENTS · CI/CD",
    link: "/case/gazon",
    stack: "Unity 6 · C# · GitHub Actions · Claude Code",
    isCase: true,
    en: { desc: "A Unity 6 WebGL game built almost entirely through CI — a self-hosted runner, headless Claude Code and a scene generated from code, with no Unity Editor on the server.", result: "13 issues closed by one agent commit." },
    ru: { desc: "Игра на Unity 6 WebGL, собранная почти целиком через CI: self-hosted runner, headless Claude Code и сцена, сгенерированная из кода — без Unity Editor на сервере.", result: "13 issues закрыты одним коммитом агента." },
  },
];

export const ARCHIVE: DesktopProject[] = [
  {
    id: "service-desk-bots",
    cat: ["archive"],
    tag: "ARCHIVE · BOTS",
    link: "https://github.com/gr33njj",
    stack: "Python · aiogram · PostgreSQL",
    en: { desc: "Service Desk bots for a corporate helpdesk — ticket routing straight from chat.", result: "Kept internal, still running." },
    ru: { desc: "Боты Service Desk для корпоративного хелпдеска — маршрутизация тикетов прямо из чата.", result: "Внутренний проект, до сих пор в работе." },
  },
  {
    id: "gr33njj.dev v1",
    cat: ["archive"],
    tag: "ARCHIVE · SITE",
    link: "/",
    stack: "Next.js · Tailwind",
    en: { desc: "The previous version of this site. Kept for the diff.", result: "Replaced by the desktop you are looking at." },
    ru: { desc: "Предыдущая версия этого сайта. Оставлена ради сравнения.", result: "Заменена десктопом, который ты сейчас смотришь." },
  },
];

export const CATS = [
  { id: "all", en: "All projects", ru: "Все проекты", glyph: "▣" },
  { id: "fullstack", en: "Fullstack", ru: "Fullstack", glyph: "⌘" },
  { id: "product", en: "Product", ru: "Продукты", glyph: "◫" },
  { id: "automation", en: "Automation & AI", ru: "Автоматизация и AI", glyph: "✦" },
  { id: "web3", en: "Web3", ru: "Web3", glyph: "◇" },
  { id: "seo", en: "SEO & content", ru: "SEO и контент", glyph: "≣" },
];

export const CASES = PROJECTS.filter((p) => p.isCase);

export const CASE_DETAILS = [
  {
    id: "skangar-landing",
    image: "/case/skangar/hero.webp",
    tag: "SEO · CONTENT",
    link: "/case/skangar",
    stack: "Python · Jinja · JSON-LD · nginx",
    en: "A construction-company landing page that outgrew itself into content infrastructure: 75 regional city pages with real local specifics, plus a 13-article knowledge base.",
    ru: "Лендинг строительной компании, который вырос в контент-инфраструктуру: 75 региональных городских страниц с реальной спецификой и база знаний из 13 статей.",
    stats: [
      { value: "75", en: "city pages", ru: "городских страниц" },
      { value: "13", en: "KB articles", ru: "статей базы знаний" },
      { value: "37", en: "glossary terms", ru: "терминов в словаре" },
      { value: "100%", en: "JSON-LD coverage", ru: "покрытие JSON-LD" },
    ],
  },
  {
    id: "mydoc-loyalty",
    image: "/case/mydoctor/feature-graphic.webp",
    tag: "PWA · ANDROID · IOS",
    link: "/case/mydoctor",
    stack: "FastAPI · PostgreSQL · Redis · Docker",
    en: "A patient portal for a real clinic, built solo from scratch — online booking, e-health record, loyalty program. Now serving over 12,000 patients, live in Google Play and RuStore.",
    ru: "Личный кабинет пациента для настоящей клиники, написан с нуля в одиночку — онлайн-запись, электронная медкарта, программа лояльности. Сейчас обслуживает больше 12 000 пациентов, в Google Play и RuStore.",
    stats: [
      { value: "12,000+", en: "patients", ru: "пациентов" },
      { value: "1C", en: "integrated", ru: "интеграция" },
      { value: "PWA", en: "+ Android/iOS", ru: "+ Android/iOS" },
      { value: "Live", en: "Play · RuStore", ru: "Play · RuStore" },
    ],
  },
  {
    id: "TRAD3",
    image: "/case/trad3/signals-list.webp",
    tag: "TRADING · AUTOMATION",
    link: "/case/trad3",
    stack: "Python · FastAPI · SQLite · Telegram Bot API",
    en: "A reversal-detection system for crypto perpetuals — weighted scoring instead of a rigid state machine, no repainting, alerts straight to Telegram. Still paper-only, on purpose.",
    ru: "Система поиска разворотов на крипто-перпетуалах — взвешенный скоринг вместо жёсткого автомата, без перерисовки, алерты прямо в Telegram. Всё ещё только paper-режим, намеренно.",
    stats: [
      { value: "27", en: "instruments watched", ru: "инструментов под наблюдением" },
      { value: "2", en: "Docker containers", ru: "Docker-контейнера" },
      { value: "5", en: "scoring components", ru: "компонентов скоринга" },
      { value: "Paper", en: "mode only", ru: "режим — пока" },
    ],
  },
  {
    id: "GAZON",
    image: "/case/gazon/feature.webp",
    tag: "AI AGENTS · CI/CD",
    link: "/case/gazon",
    stack: "Unity 6 · C# · GitHub Actions · Claude Code",
    en: "A Unity 6 WebGL game built almost entirely through CI — a self-hosted runner, headless Claude Code and a scene generated from code, with no Unity Editor on the server.",
    ru: "Игра на Unity 6 WebGL, собранная почти целиком через CI — self-hosted раннер, headless Claude Code и сцена, сгенерированная из кода, без Unity Editor на сервере.",
    stats: [
      { value: "3", en: "agent surfaces", ru: "агентские поверхности" },
      { value: "13", en: "issues, one commit", ru: "issues одним коммитом" },
      { value: "0", en: "Editor access on VPS", ru: "доступов к Editor на VPS" },
      { value: "2", en: "CI workflows", ru: "CI workflow" },
    ],
  },
];

export const SOCIALS = [
  { label: "Telegram", value: "@gr33njj", href: "https://t.me/gr33njj" },
  { label: "Email", value: "jj.gr33nrec@gmail.com", href: "mailto:jj.gr33nrec@gmail.com" },
  { label: "GitHub", value: "github.com/gr33njj", href: "https://github.com/gr33njj" },
  { label: "X", value: "@stockytiger", href: "https://x.com/stockytiger" },
  { label: "Instagram", value: "@gr33njj", href: "https://www.instagram.com/gr33njj/" },
  {
    label: "YouTube",
    value: "Данил Глухончук",
    href: "https://www.youtube.com/@%D0%94%D0%B0%D0%BD%D0%B8%D0%BB%D0%93%D0%BB%D1%83%D1%85%D0%BE%D0%BD%D1%87%D1%83%D0%BA",
  },
];

export const TOTAL_EXPERIENCE = { en: "5 yr 5 mo of professional experience", ru: "5 лет 5 месяцев опыта" };

export const EXPERIENCE = [
  {
    domain: "Healthcare / Medtech",
    period: { en: "Jul 2025 — present · 1 yr 2 mo", ru: "Июль 2025 — настоящее время · 1 год 2 мес" },
    role: { en: "Fullstack Engineer", ru: "Fullstack Engineer" },
    stack: "Redis · WebSocket · React · FastAPI · CI/CD · REST API · Android · iOS",
    bullets: {
      en: [
        "Designed and built the patient portal from scratch: PWA plus mobile apps, 1C integration, online booking, e-health record, loyalty program, gift certificates and a support desk. Now serving over 12,000 patients.",
        "Built the mobile apps on Capacitor and set up publishing via Codemagic — Android is live on RuStore, iOS is in Apple App Store review.",
        "Three-layer cache (Postgres, Redis, client), so the doctor list opens almost instantly; also stood up a real-time WebSocket support chat.",
        "Custom-built the clinic admin panel on React, no page builders — bookings, loyalty, certificates and support tickets all in one place.",
        "Built a REST API on FastAPI for the clinic's internal services (250 users, 3 branches) and set up CI/CD for it.",
        "Rolled out self-service kiosks and TV panels across branches, running 24/7 at 99.8% SLA; after launching telemedicine, online bookings grew 22%.",
        "Revisited infrastructure spend and cut recurring incidents by 37% along the way.",
      ],
      ru: [
        "С нуля спроектировал и написал личный кабинет пациента: PWA плюс мобильные приложения, интеграция с 1С, онлайн-запись, электронная медкарта, программа лояльности, сертификаты и служба поддержки. Сейчас в системе больше 12 000 пациентов.",
        "Собирал мобильные приложения на Capacitor и настраивал публикацию через Codemagic — Android-версия уже в RuStore, iOS в процессе модерации Apple App Store.",
        "Кэш продуман в три слоя (Postgres, Redis, клиент), поэтому список врачей открывается почти мгновенно; отдельно поднял WebSocket-чат для поддержки в реальном времени.",
        "Админка для клиники самописная, на React, без готовых конструкторов: записи, лояльность, сертификаты и обращения — всё в одном месте.",
        "На FastAPI сделал REST API для внутренних сервисов клиники (250 пользователей, 3 филиала), заодно настроил CI/CD.",
        "Поставил цифровые киоски и ТВ-панели в филиалах, работают круглосуточно с SLA 99,8%; после запуска телемедицины доля онлайн-записей выросла на 22%.",
        "Пересмотрел статьи расходов на инфраструктуру и заодно снизил число повторяющихся инцидентов на 37%.",
      ],
    },
  },
  {
    domain: "Government / Public Sector",
    period: { en: "Jan 2025 — Jul 2025 · 7 mo", ru: "Январь 2025 — Июль 2025 · 7 мес" },
    role: { en: "IT Infrastructure Engineer", ru: "IT Infrastructure Engineer" },
    stack: "Aiogram · Zabbix · Helpdesk",
    bullets: {
      en: [
        "Built a Telegram bot on aiogram that took over part of the department's helpdesk routine — average response time dropped by about 30%.",
        "Stood up Zabbix monitoring; incidents started getting caught earlier and their count dropped 38%.",
        "Set up automated backups for critical services and updated access and information-security policy.",
      ],
      ru: [
        "Написал Telegram-бота на aiogram, который забрал часть рутины в области helpdesk отдела, среднее время реакции упало примерно на 30%.",
        "Поднял мониторинг на Zabbix, инциденты стали ловиться раньше, их количество снизилось на 38%.",
        "Настроил автобэкапы для критичных сервисов, обновил политику доступа и информационной безопасности.",
      ],
    },
  },
  {
    domain: "Freelance / Open Source",
    period: { en: "Jan 2023 — Jan 2025 · 2 yr 1 mo", ru: "Январь 2023 — Январь 2025 · 2 года 1 мес" },
    role: { en: "Python Backend Developer", ru: "Python Backend Developer" },
    stack: "FastAPI · SQLAlchemy · PostgreSQL · CI/CD · REST · VPS",
    bullets: {
      en: ["REST services on FastAPI, SQLAlchemy and PostgreSQL, CI/CD pipelines, auto-deploy to VPS."],
      ru: ["REST-сервисы на FastAPI, SQLAlchemy и PostgreSQL, CI/CD-пайплайны, автодеплой на VPS."],
    },
  },
  {
    domain: "Web3 / Blockchain",
    period: { en: "Feb 2024 — Dec 2024 · 11 mo, part-time", ru: "Февраль 2024 — Декабрь 2024 · 11 мес, по совместительству" },
    role: { en: "Technical Lead", ru: "Technical Lead" },
    stack: "Solidity · Blockchain · Design",
    bullets: {
      en: [
        "Led a cross-functional team of five (backend, frontend, design).",
        "Wrote and integrated Solidity smart contracts, wired the blockchain logic into the frontend.",
        "Restructured the sprint process and removed task duplication.",
      ],
      ru: [
        "Вёл кросс-функциональную команду из пяти человек (бэкенд, фронтенд, дизайн).",
        "Написал и интегрировал смарт-контракты на Solidity, связал блокчейн-логику с фронтендом.",
        "Пересобрал структуру спринтов и убрал дублирование задач.",
      ],
    },
  },
  {
    domain: "E-commerce / Web",
    period: { en: "Apr 2021 — Apr 2023 · 2 yr 1 mo", ru: "Апрель 2021 — Апрель 2023 · 2 года 1 мес" },
    role: { en: "Full-Stack Developer / IT Lead", ru: "Full-Stack Developer / IT Lead" },
    stack: "HTML · CSS · WordPress · CRM",
    bullets: {
      en: [
        "Maintained and developed web platforms on HTML, CSS, JS and WordPress — page load got 25% faster.",
        "Owned server infrastructure, CRM and web services as load steadily grew.",
        "Automated part of the customer-support workflow, closing tickets faster.",
      ],
      ru: [
        "Поддерживал и развивал веб-платформы на HTML, CSS, JS и WordPress — загрузка страниц ускорилась на 25%.",
        "Отвечал за серверную инфраструктуру, CRM и веб-сервисы, пока нагрузка постепенно росла.",
        "Автоматизировал часть работы клиентской поддержки, из-за чего заявки стали закрываться быстрее.",
      ],
    },
  },
];

export const CERTIFICATES = [
  { name: "Building with the Claude API", year: "2026", link: "https://verify.skilljar.com/c/pzh3878fkupp" },
  { name: "Claude Code in Action", year: "2026", link: "https://verify.skilljar.com/c/ks3hq83y7vc2" },
  { name: "Google AI Essentials", year: "2026", link: "https://coursera.org/verify/specialization/83YX1T1SLM1Z" },
  { name: "Introduction to Model Context Protocol", year: "2026", link: "https://verify.skilljar.com/c/y6shgckmj3kb" },
  { name: "Model Context Protocol: Advanced Topics", year: "2026", link: "https://verify.skilljar.com/c/9cp2pqbdy2a3" },
];

export const RESUME_SKILLS = [
  "Python", "FastAPI", "REST API", "PostgreSQL", "SQLite", "MySQL", "SQLAlchemy",
  "Node.js", "JavaScript", "TypeScript", "React", "React Native", "Docker",
  "GitHub", "Nginx", "Linux", "Vue", "MCP",
];


export const STACK_ITEMS = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI",
  "PostgreSQL", "Redis", "Docker", "Kubernetes", "CI/CD", "Nginx",
  "Prometheus", "Grafana", "Tailwind", "Figma",
];

export const SAFARI_LINKS = [
  { host: "trade.gr33njj.dev", en: "TRAD3 panel — Telegram Login, owner-only", ru: "Панель TRAD3 — вход по Telegram, только владелец" },
  { host: "ai.gr33njj.dev", en: "GAZON — live WebGL preview, rebuilds on every commit", ru: "GAZON — живое WebGL-превью, пересобирается на каждый коммит" },
];

export const SYSTEM_STATUS = [
  { en: "Homepage", ru: "Главная страница", ok: true },
  { en: "Blog", ru: "Блог", ok: true },
  { en: "Contact form (email delivery)", ru: "Форма контактов (доставка на email)", ok: true },
  { en: "Case: skangar-landing", ru: "Кейс: skangar-landing", ok: true },
  { en: "Case: mydoc-loyalty", ru: "Кейс: mydoc-loyalty", ok: true },
  { en: "Case: TRAD3", ru: "Кейс: TRAD3", ok: true },
  { en: "Case: GAZON", ru: "Кейс: GAZON", ok: true },
  { en: "trade.gr33njj.dev (TRAD3 panel, owner-only)", ru: "trade.gr33njj.dev (панель TRAD3, только владелец)", ok: true },
  { en: "ai.gr33njj.dev (GAZON WebGL preview)", ru: "ai.gr33njj.dev (WebGL-превью GAZON)", ok: true },
  { en: "Terminal / Developer Mode (this screen)", ru: "Терминал / Developer Mode (этот экран)", ok: true },
  { en: "MCP-backed live data (GitHub stats, deploy feed)", ru: "Живые данные через MCP (статистика GitHub, лента деплоев)", ok: false },
];

export const DEV_INFO = [
  { k: "framework", v: "Next.js 14 · App Router" },
  { k: "language", v: "TypeScript · React 18" },
  { k: "styling", v: "Tailwind CSS" },
  { k: "hosting", v: "self-managed VPS · pm2" },
  { k: "repo", v: "github.com/gr33njj/gr33njj-dev-landing" },
  { k: "deploy", v: "git push → npm run build → pm2 restart" },
  { k: "this screen", v: "client-rendered React, no backend yet" },
  { k: "next up", v: "MCP/BFF for live GitHub + deploy data" },
];

export const NOTES_ENTRIES = [
  { en: { title: "Ice redesign shipped", body: "New dark cyan/purple visual system across the whole site — hero, projects, blog." }, ru: { title: "Редизайн «ice» выкачен", body: "Новая тёмная cyan/purple визуальная система по всему сайту — hero, проекты, блог." } },
  { en: { title: "4 case studies published", body: "skangar-landing, mydoc-loyalty, TRAD3, GAZON — real screenshots, real numbers, honest disclaimers." }, ru: { title: "Опубликовано 4 кейса", body: "skangar-landing, mydoc-loyalty, TRAD3, GAZON — реальные скриншоты, реальные цифры, честные оговорки." } },
  { en: { title: "This desktop screen — WIP", body: "Iterating on motion and layout next. Right-click for the good stuff." }, ru: { title: "Этот десктоп-экран — в процессе", body: "Дальше — доводка анимаций и вёрстки. Правый клик открывает интересное." } },
  { en: { title: "12,000+ patients, one portal", body: "The Moy Doctor clinic app I built solo now runs the booking flow for over 12,000 real patients." }, ru: { title: "12 000+ пациентов, одна система", body: "Приложение клиники «Мой Доктор», которое я собрал в одиночку, теперь ведёт запись больше 12 000 реальных пациентов." } },
  { en: { title: "GAZON: 3 agents, 0 shared memory", body: "The wildest infra story so far — a Unity game built almost entirely through CI, with 13 issues closed in a single agent commit." }, ru: { title: "GAZON: 3 агента, 0 общей памяти", body: "Самая безумная инфраструктурная история — Unity-игра, собранная почти целиком через CI, где 13 issues закрылись одним коммитом агента." } },
  { en: { title: "TRAD3 has never placed a real order", body: "27 instruments watched 24/7, and it's still running in paper mode on purpose — trust gets earned by data, not by rushing." }, ru: { title: "TRAD3 не поставил ни одного реального ордера", body: "27 инструментов под наблюдением 24/7, а система всё ещё в paper-режиме — намеренно: доверие зарабатывается статистикой, а не спешкой." } },
  { en: { title: "A bot as a very patient intern", body: "A Telegram helpdesk bot on aiogram cut a whole department's average response time by about 30%." }, ru: { title: "Бот вместо очень терпеливого стажёра", body: "Telegram-бот для хелпдеска на aiogram снизил среднее время реакции целого отдела примерно на 30%." } },
  { en: { title: "Monitoring pays for itself", body: "Standing up Zabbix at a district IT department cut incident count by 38% — most fires are easier to catch than to fight." }, ru: { title: "Мониторинг окупается сам", body: "После внедрения Zabbix в IT-отделе администрации количество инцидентов упало на 38% — большинство пожаров проще заметить, чем тушить." } },
];

export const TRASH_ENTRIES = [
  { en: { title: "trad3.gr33njj.dev", body: "Guessed domain for the TRAD3 panel. Turned out wrong — a real browser screenshot showed trade.gr33njj.dev instead." }, ru: { title: "trad3.gr33njj.dev", body: "Домен панели TRAD3, угаданный по аналогии. Оказался неверным — реальный скриншот браузера показал trade.gr33njj.dev." } },
  { en: { title: "Old WordPress geo-network (skangar.ru)", body: "A doorway-pattern city network from the previous site. Risk assessed, not revived in its old form." }, ru: { title: "Старая WordPress-гео-сеть (skangar.ru)", body: "Doorway-сеть городских страниц с прошлого сайта. Риски оценены, в старом виде не реанимирована." } },
  { en: { title: "hhcrack — HH.ru application automation", body: "An AI assistant meant to handle job applications on hh.ru. HeadHunter pulled API access for job-seeker accounts entirely — the whole approach depended on it. Shelved, not salvageable." }, ru: { title: "hhcrack — автоматизация откликов на HH.ru", body: "AI-ассистент для откликов на вакансии на hh.ru. HeadHunter полностью закрыл API для соискателей — вся схема строилась именно на нём. Проект закрыт, чинить нечего." } },
  { en: { title: "Blood-analyzer ↔ CRM integration", body: "Every analyzer vendor ships a closed, undocumented protocol that was never meant to talk to anything outside its own bundled software. Not worth the fight for what would've ended up a thin, fragile sync layer." }, ru: { title: "Интеграция анализаторов крови с CRM", body: "У каждого производителя анализаторов — закрытый недокументированный протокол, изначально не рассчитанный на общение с чем-либо, кроме их же софта. Не та война ради тонкого и хрупкого слоя синхронизации." } },
  { en: { title: "True alpha-channel hero video (WebM)", body: "VP9 and VP8 alpha both silently drop the transparency channel on this server's ffmpeg build — verified pixel by pixel, not just taking the encoder's word for it. Animated WebP alpha genuinely works, but hits 10-20MB for a 10-second loop. Composited onto a flat matte instead." }, ru: { title: "Настоящая альфа-прозрачность в фоновом видео (WebM)", body: "VP9- и VP8-альфа на этом сервере тихо теряют канал прозрачности при кодировании — проверено попиксельно, а не на слово энкодеру. Честный alpha-WebP работает, но весит 10-20 МБ на 10-секундный луп. В итоге — композит на сплошной подложке." } },
];

export const APPROACH_STEPS = [
  { en: { title: "I speak outcomes, not stacks", desc: "You tell me the goal; I translate it into a build and a timeline in language you can repeat to your boss." }, ru: { title: "Говорю на языке результата", desc: "Вы называете цель — я перевожу её в сборку и сроки на языке, который вы спокойно повторите руководству." } },
  { en: { title: "One person accountable", desc: "No hand-offs between three contractors. One head owns design, code and delivery from first call to launch." }, ru: { title: "Один ответственный", desc: "Никаких передач между тремя подрядчиками. Одна голова держит дизайн, код и сдачу от первого звонка до запуска." } },
  { en: { title: "Working demos, not promises", desc: "You see something real early and often — so trust is earned by proof, not by invoices." }, ru: { title: "Рабочие демо, не обещания", desc: "Вы видите что-то настоящее рано и часто — доверие строится на доказательствах, а не на счетах." } },
  { en: { title: "Code that outlives launch", desc: "Clean, documented and maintainable — so the next developer thanks you instead of rewriting everything." }, ru: { title: "Код, который переживёт запуск", desc: "Чистый, задокументированный и поддерживаемый — чтобы следующий разработчик сказал спасибо, а не переписывал всё заново." } },
];
