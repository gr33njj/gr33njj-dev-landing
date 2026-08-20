"use client";

import type { Block } from "./blocks";

const IMG = "/case/mydoctor";

export const MYDOCTOR_BLOCKS: Block[] = [
  { type: "image", src: `${IMG}/feature-graphic.webp`, alt: { en: "Moy Doctor — app cover", ru: "Мой Доктор — обложка приложения" } },
  {
    type: "p",
    en: "“Moy ❤ Doctor” is a PWA and mobile app I built and launched for a medical center in Armavir: online booking, an electronic health record, bonuses and gift certificates in one interface. The same engine adapts to your clinic, your data and your CRM.",
    ru: "«Мой ❤ Доктор» — PWA и мобильное приложение, которое я построил и запустил для медцентра в Армавире: онлайн-запись, электронная медкарта, бонусы и подарочные сертификаты в одном интерфейсе. Тот же движок адаптируется под вашу клинику, вашу базу и вашу CRM.",
  },
  {
    type: "list",
    items: [
      { en: "PWA · Android · iOS — one codebase", ru: "PWA · Android · iOS, один код" },
      { en: "Works with 1C or any other CRM", ru: "Интеграция с 1С или любой другой CRM" },
      { en: "Already live in Google Play and RuStore", ru: "Уже в Google Play и RuStore" },
    ],
  },
  {
    type: "pnode",
    en: <>This is not a pitch mockup. <b>It is running right now</b> at the Moy Doctor clinic in Armavir — <a href="https://app.mydoctorarmavir.ru/" target="_blank" rel="noopener noreferrer" style={{ color: "#ef80ae" }}>app.mydoctorarmavir.ru ↗</a>, <a href="https://play.google.com/store/apps/details?id=ru.mydoctorarmavir.app" target="_blank" rel="noopener noreferrer" style={{ color: "#ef80ae" }}>Google Play ↗</a>, <a href="https://www.rustore.ru/catalog/app/ru.mydoctorarmavir.app" target="_blank" rel="noopener noreferrer" style={{ color: "#ef80ae" }}>RuStore ↗</a>.</>,
    ru: <>Это не мокап для питча. <b>Это работает прямо сейчас</b> в клинике «Мой Доктор», Армавир — <a href="https://app.mydoctorarmavir.ru/" target="_blank" rel="noopener noreferrer" style={{ color: "#ef80ae" }}>app.mydoctorarmavir.ru ↗</a>, <a href="https://play.google.com/store/apps/details?id=ru.mydoctorarmavir.app" target="_blank" rel="noopener noreferrer" style={{ color: "#ef80ae" }}>Google Play ↗</a>, <a href="https://www.rustore.ru/catalog/app/ru.mydoctorarmavir.app" target="_blank" rel="noopener noreferrer" style={{ color: "#ef80ae" }}>RuStore ↗</a>.</>,
  },

  { type: "kicker", n: "01", en: "The problem", ru: "Проблема" },
  { type: "h2", en: "While your patient waits on hold, they book with another clinic", ru: "Пока пациент дозванивается — он уже записался в другую клинику" },
  {
    type: "p",
    en: "The front desk physically can't handle the full call flow at peak hours, and paper loyalty doesn't bring patients back. Every missed call is a patient you will never see.",
    ru: "Регистратура физически не тянет весь поток звонков в пиковые часы, а бумажная лояльность не удерживает пациента. Каждый несостоявшийся звонок — гость, которого вы никогда не увидите.",
  },
  {
    type: "findings",
    items: [
      { tag: { en: "// busy phone line", ru: "// очередь на линии" }, title: { en: "Line is busy — the patient leaves", ru: "Телефон занят — пациент уходит" }, desc: { en: "At peak hours some calls simply never get through — and go to competitors.", ru: "В часы пик часть звонков просто не доходит — и уходит к конкурентам." } },
      { tag: { en: "// paper loyalty", ru: "// бумажная лояльность" }, title: { en: "Discounts counted by eye", ru: "Скидки считаются на глаз" }, desc: { en: "Bonuses get lost in notebooks; the patient sees no reason to come back to you specifically.", ru: "Бонусы теряются в тетрадках, пациент не видит ценности возвращаться именно к вам." } },
      { tag: { en: "// nothing in the patient's pocket", ru: "// ноль в кармане у пациента" }, title: { en: "The clinic is just a sign", ru: "Клиника — просто вывеска" }, desc: { en: "Without an app you have no place on the patient's phone at the moment they choose where to go.", ru: "Без приложения у вас нет места в телефоне пациента в момент, когда он выбирает, куда обратиться." } },
    ],
  },

  { type: "kicker", n: "02", en: "What it looks like", ru: "Как это выглядит" },
  { type: "h2", en: "Screens from App Store / Google Play", ru: "Экраны из App Store / Google Play" },
  { type: "video", src: `${IMG}/mydoc-app.mp4`, poster: `${IMG}/mydoc-app-poster.webp`, caption: { en: "Live demo, recorded from the real app", ru: "Живое демо, записано в реальном приложении" } },
  {
    type: "images",
    items: [
      { src: `${IMG}/appstore-01-hero.webp`, alt: { en: "Home screen", ru: "Главный экран" } },
      { src: `${IMG}/appstore-02-zapis.webp`, alt: { en: "Online booking", ru: "Онлайн-запись" } },
    ],
  },
  {
    type: "images",
    items: [
      { src: `${IMG}/appstore-03-medkarta.webp`, alt: { en: "Health record", ru: "Медкарта" } },
      { src: `${IMG}/appstore-04-sertifikaty.webp`, alt: { en: "Gift certificates", ru: "Сертификаты" } },
    ],
  },
  {
    type: "images",
    items: [
      { src: `${IMG}/appstore-05-bonusy.webp`, alt: { en: "Bonuses", ru: "Бонусы" } },
      { src: `${IMG}/appstore-06-referaly.webp`, alt: { en: "Referrals", ru: "Рефералы" } },
    ],
  },
  { type: "image", src: `${IMG}/appstore-07-vhod.webp`, alt: { en: "Sign in", ru: "Вход" } },

  { type: "kicker", n: "03", en: "What's inside", ru: "Что внутри" },
  { type: "h2", en: "Six modules that cover the whole patient journey", ru: "Шесть модулей, которые закрывают весь путь пациента" },
  {
    type: "p",
    en: "From the first touch to medical history — in one app instead of five separate services.",
    ru: "От первого касания до истории болезни — в одном приложении, а не в пяти разных сервисах.",
  },
  {
    type: "findings",
    items: [
      { tag: { en: "[appointments]", ru: "[appointments]" }, title: { en: "Online booking", ru: "Онлайн-запись" }, desc: { en: "Live slots from your CRM, search by service, reminders 24h and 2h before the visit.", ru: "Живые слоты из вашей CRM, поиск по услугам, напоминания за 24 и 2 часа." } },
      { tag: { en: "[loyalty]", ru: "[loyalty]" }, title: { en: "Bonuses & cashback", ru: "Бонусы и кешбэк" }, desc: { en: "Bronze/Silver/Gold tiers, cashback per visit, referral program.", ru: "Уровни Bronze/Silver/Gold, кешбэк за визит, реферальная программа." } },
      { tag: { en: "[records]", ru: "[records]" }, title: { en: "Electronic health record", ru: "Электронная медкарта" }, desc: { en: "Reports, prescriptions and test results pulled from your system — no paper.", ru: "Заключения, назначения и анализы — подтягиваются из вашей системы без бумаги." } },
      { tag: { en: "[gift-cards]", ru: "[gift-cards]" }, title: { en: "Gift certificates", ru: "Подарочные сертификаты" }, desc: { en: "Several card styles, QR activation right at the front desk.", ru: "Несколько стилей карт, активация по QR прямо на кассе." } },
      { tag: { en: "[admin]", ru: "[admin]" }, title: { en: "Admin panel", ru: "Админ-панель" }, desc: { en: "Patients, transactions, certificates and sync status — all in one place.", ru: "Пациенты, транзакции, сертификаты и статус синхронизации — в одном месте." } },
      { tag: { en: "[account]", ru: "[account]" }, title: { en: "Single account", ru: "Единый аккаунт" }, desc: { en: "Same login as the clinic website — sign in via SMS or clinic ID.", ru: "Тот же логин, что и на сайте клиники — вход по SMS или через ID клиники." } },
    ],
  },

  { type: "kicker", n: "04", en: "Wide format", ru: "Широкий формат" },
  { type: "h2", en: "The same screens for tablets and promo materials", ru: "Те же экраны для планшета и промо-материалов" },
  {
    type: "images",
    items: [
      { src: `${IMG}/play-tab7-01-hero.webp`, alt: { en: "Home screen, wide", ru: "Главный экран, широкий формат" } },
      { src: `${IMG}/play-tab7-02-zapis.webp`, alt: { en: "Booking, wide", ru: "Запись, широкий формат" } },
    ],
  },
  {
    type: "images",
    items: [
      { src: `${IMG}/play-tab7-03-medkarta.webp`, alt: { en: "Health record, wide", ru: "Медкарта, широкий формат" } },
      { src: `${IMG}/play-tab7-04-sertifikaty.webp`, alt: { en: "Certificates, wide", ru: "Сертификаты, широкий формат" } },
    ],
  },

  { type: "kicker", n: "05", en: "Under the hood", ru: "Как устроено" },
  { type: "h2", en: "Built as a product, not a rushed MVP", ru: "Построено как продукт, а не MVP на скорую руку" },
  {
    type: "pnode",
    en: <>Under the hood is architecture sized for a real clinic's load. And yes: the integration is built around your system — not everyone runs 1C, and the engine connects equally well to 1C or any other CRM/HIS via API. The 1C-side API for Moy Doctor was built by <a href="https://d-partners.ru/" target="_blank" rel="noopener noreferrer" style={{ color: "#ef80ae" }}>d-partners.ru</a>.</>,
    ru: <>Под капотом — архитектура на реальную нагрузку клиники. И да: интеграция строится под вашу систему — 1С есть не у всех, движок одинаково хорошо стыкуется и с 1С, и с любой другой CRM или МИС через API. API со стороны 1С для «Мой Доктор» реализовала команда <a href="https://d-partners.ru/" target="_blank" rel="noopener noreferrer" style={{ color: "#ef80ae" }}>d-partners.ru</a>.</>,
  },
  {
    type: "stats",
    stats: [
      { value: "2 layers", en: "PostgreSQL + Redis cache", ru: "Кэш PostgreSQL + Redis" },
      { value: "−79%", en: "Doctor photo compression", ru: "Сжатие фото врачей" },
      { value: "WS", en: "Real-time chat", ru: "Чат в реальном времени" },
      { value: "1 day", en: "Docker + Nginx + SSL", ru: "Docker + Nginx + SSL" },
    ],
  },

  { type: "kicker", n: "06", en: "How we launch", ru: "Как запускаем" },
  { type: "h2", en: "From brief to store release", ru: "От брифа до публикации в сторах" },
  {
    type: "p",
    en: "The same path the Moy Doctor clinic took — now in your brand.",
    ru: "Тот же путь, что прошла клиника «Мой Доктор» — теперь под ваш бренд.",
  },
  {
    type: "steps",
    steps: [
      {
        title: { en: "Brand adaptation", ru: "Адаптация под бренд" },
        body: [{ type: "p", en: "Your logo, colors, domain and copy — the app looks like part of your clinic.", ru: "Ваш логотип, цвета, домен и тексты — приложение выглядит как часть вашей клиники." }],
      },
      {
        title: { en: "Integration with your 1C or other CRM", ru: "Интеграция с вашей 1С или другой CRM" },
        body: [{ type: "p", en: "Doctors, services and schedules sync via API — no 1C? We connect whatever system you already use.", ru: "Врачи, услуги и расписание синхронизируются через API — нет 1С, подключим ту систему, что уже используете." }],
      },
      {
        title: { en: "PWA + Android + iOS", ru: "PWA + Android + iOS" },
        body: [{ type: "p", en: "One codebase — three platforms. Published to RuStore, ready for App Store and Google Play.", ru: "Один код — три платформы. Публикация в RuStore, готовность к App Store и Google Play." }],
      },
      {
        title: { en: "Admin panel, training, support", ru: "Админка, обучение, сопровождение" },
        body: [{ type: "p", en: "The front desk gets a clear control panel. Support doesn't end at release.", ru: "Регистратура получает понятную панель управления. Поддержка не заканчивается на релизе." }],
      },
    ],
  },
];
