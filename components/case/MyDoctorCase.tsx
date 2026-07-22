"use client";

import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const BASE = "/case/mydoctor";

/* Gallery rows bleed full-width but their content edge lines up with the 1160px container
   (100% = section width, so the scrollbar doesn't skew the math) */
const galleryPad = "max(clamp(20px, 5vw, 64px), calc((100% - 1160px) / 2))";

const tgBtn =
  "relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-ice px-[26px] py-[15px] text-[15px] font-semibold text-[#04121a] shadow-[0_10px_34px_rgba(103,232,249,.3)] transition-transform hover:scale-[1.02]";

function Sheen() {
  return (
    <span className="absolute left-0 top-0 h-full w-2/5 animate-sheen bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)]" />
  );
}

function LightTag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex rounded-md border px-2.5 py-[5px] font-mono text-[12.5px]"
      style={{ color, borderColor: color }}
    >
      {children}
    </span>
  );
}

function Gallery({
  shots,
  height,
  leading,
}: {
  shots: { src: string; alt: string }[];
  height: number;
  leading?: React.ReactNode;
}) {
  return (
    <div
      className="gscroll flex gap-5 overflow-x-auto pb-5 pt-1.5"
      style={{ paddingLeft: galleryPad, paddingRight: galleryPad }}
    >
      {leading}
      {shots.map((s) => (
        <img
          key={s.src}
          src={`${BASE}/${s.src}`}
          alt={s.alt}
          loading="lazy"
          style={{ height }}
          className="w-auto max-w-none flex-none snap-start rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,.25)]"
        />
      ))}
    </div>
  );
}

export default function MyDoctorCase() {
  const { t } = useLanguage();

  const portraitShots = [
    { src: "appstore-01-hero.webp", alt: t("Home screen", "Главный экран") },
    { src: "appstore-02-zapis.webp", alt: t("Online booking", "Онлайн-запись") },
    { src: "appstore-03-medkarta.webp", alt: t("Health record", "Медкарта") },
    { src: "appstore-04-sertifikaty.webp", alt: t("Gift certificates", "Сертификаты") },
    { src: "appstore-05-bonusy.webp", alt: t("Bonuses", "Бонусы") },
    { src: "appstore-06-referaly.webp", alt: t("Referrals", "Рефералы") },
    { src: "appstore-07-vhod.webp", alt: t("Sign in", "Вход") },
  ];

  const wideShots = [
    { src: "play-tab7-01-hero.webp", alt: t("Home screen, wide", "Главный экран, широкий формат") },
    { src: "play-tab7-02-zapis.webp", alt: t("Booking, wide", "Запись, широкий формат") },
    { src: "play-tab7-03-medkarta.webp", alt: t("Health record, wide", "Медкарта, широкий формат") },
    { src: "play-tab7-04-sertifikaty.webp", alt: t("Certificates, wide", "Сертификаты, широкий формат") },
    { src: "play-tab7-05-bonusy.webp", alt: t("Bonuses, wide", "Бонусы, широкий формат") },
    { src: "play-tab7-06-referaly.webp", alt: t("Referrals, wide", "Рефералы, широкий формат") },
    { src: "play-tab7-07-vhod.webp", alt: t("Sign in, wide", "Вход, широкий формат") },
  ];

  const problems = [
    {
      comment: t("// busy phone line", "// очередь на линии"),
      title: t("Line is busy — the patient leaves", "Телефон занят — пациент уходит"),
      desc: t(
        "At peak hours some calls simply never get through — and go to competitors.",
        "В часы пик часть звонков просто не доходит — и уходит к конкурентам."
      ),
    },
    {
      comment: t("// paper loyalty", "// бумажная лояльность"),
      title: t("Discounts counted by eye", "Скидки считаются на глаз"),
      desc: t(
        "Bonuses get lost in notebooks; the patient sees no reason to come back to you specifically.",
        "Бонусы теряются в тетрадках, пациент не видит ценности возвращаться именно к вам."
      ),
    },
    {
      comment: t("// nothing in the patient's pocket", "// ноль в кармане у пациента"),
      title: t("The clinic is just a sign", "Клиника — просто вывеска"),
      desc: t(
        "Without an app you have no place on the patient's phone at the moment they choose where to go.",
        "Без приложения у вас нет места в телефоне пациента в момент, когда он выбирает, куда обратиться."
      ),
    },
  ];

  const modules = [
    {
      tag: "[appointments]",
      color: "text-accent",
      title: t("Online booking", "Онлайн-запись"),
      desc: t(
        "Live slots from your CRM, search by service, reminders 24h and 2h before the visit.",
        "Живые слоты из вашей CRM, поиск по услугам, напоминания за 24 и 2 часа."
      ),
    },
    {
      tag: "[loyalty]",
      color: "text-accent-purple",
      title: t("Bonuses & cashback", "Бонусы и кешбэк"),
      desc: t(
        "Bronze/Silver/Gold tiers, cashback per visit, referral program.",
        "Уровни Bronze/Silver/Gold, кешбэк за визит, реферальная программа."
      ),
    },
    {
      tag: "[records]",
      color: "text-accent-blue",
      title: t("Electronic health record", "Электронная медкарта"),
      desc: t(
        "Reports, prescriptions and test results pulled from your system — no paper.",
        "Заключения, назначения и анализы — подтягиваются из вашей системы без бумаги."
      ),
    },
    {
      tag: "[gift-cards]",
      color: "text-accent",
      title: t("Gift certificates", "Подарочные сертификаты"),
      desc: t(
        "Several card styles, QR activation right at the front desk.",
        "Несколько стилей карт, активация по QR прямо на кассе."
      ),
    },
    {
      tag: "[admin]",
      color: "text-accent-purple",
      title: t("Admin panel", "Админ-панель"),
      desc: t(
        "Patients, transactions, certificates and sync status — all in one place.",
        "Пациенты, транзакции, сертификаты и статус синхронизации — в одном месте."
      ),
    },
    {
      tag: "[account]",
      color: "text-accent-blue",
      title: t("Single account", "Единый аккаунт"),
      desc: t(
        "Same login as the clinic website — sign in via SMS or clinic ID.",
        "Тот же логин, что и на сайте клиники — вход по SMS или через ID клиники."
      ),
    },
  ];

  const metrics = [
    {
      value: t("2 layers", "2 уровня"),
      title: t("PostgreSQL + Redis cache", "Кэш PostgreSQL + Redis"),
      desc: t(
        "Slots open instantly, even when the link to your system is temporarily unstable.",
        "Слоты открываются мгновенно, даже если связь с вашей системой временно нестабильна."
      ),
    },
    {
      value: "−79%",
      title: t("Doctor photo compression", "Сжатие фото врачей"),
      desc: t(
        "Automatic resize and compression of the catalog — the app opens faster.",
        "Автоматический ресайз и компрессия каталога — приложение открывается быстрее."
      ),
    },
    {
      value: "WS",
      title: t("Real-time chat", "Чат в реальном времени"),
      desc: t(
        "Support chat over WebSocket — messages arrive instantly.",
        "Поддержка на WebSocket — сообщения приходят мгновенно."
      ),
    },
    {
      value: t("1 day", "1 день"),
      title: "Docker + Nginx + SSL",
      desc: t(
        "Deploys on your server or in the cloud without lengthy setup.",
        "Разворачивается на вашем сервере или в облаке без долгой настройки."
      ),
    },
  ];

  const timeline = [
    {
      title: t("Brand adaptation", "Адаптация под бренд"),
      desc: t(
        "Your logo, colors, domain and copy — the app looks like part of your clinic.",
        "Ваш логотип, цвета, домен и тексты — приложение выглядит как часть вашей клиники."
      ),
    },
    {
      title: t("Integration with your 1C or other CRM", "Интеграция с вашей 1С или другой CRM"),
      desc: t(
        "Doctors, services and schedules sync via API — no 1C? We connect whatever system you already use.",
        "Врачи, услуги и расписание синхронизируются через API — нет 1С, подключим ту систему, что уже используете."
      ),
    },
    {
      title: "PWA + Android + iOS",
      desc: t(
        "One codebase — three platforms. Published to RuStore, ready for App Store and Google Play.",
        "Один код — три платформы. Публикация в RuStore, готовность к App Store и Google Play."
      ),
    },
    {
      title: t("Admin panel, training, support", "Админка, обучение, сопровождение"),
      desc: t(
        "The front desk gets a clear control panel. Support doesn't end at release.",
        "Регистратура получает понятную панель управления. Поддержка не заканчивается на релизе."
      ),
    },
  ];

  const proofLinks = [
    { href: "https://app.mydoctorarmavir.ru/", label: "app.mydoctorarmavir.ru ↗" },
    { href: "https://play.google.com/store/apps/details?id=ru.mydoctorarmavir.app", label: "Google Play ↗" },
    { href: "https://www.rustore.ru/catalog/app/ru.mydoctorarmavir.app", label: "RuStore ↗" },
  ];

  return (
    <div className="relative">
      {/* HERO */}
      <header className="relative overflow-hidden px-5 pb-16 pt-[120px] sm:px-10 lg:px-16">
        <div
          className="pointer-events-none absolute -right-[10%] -top-[20%] h-[55vw] w-[55vw]"
          style={{ background: "radial-gradient(circle, rgba(103,232,249,.14), transparent 62%)", filter: "blur(40px)" }}
        />
        <div className="relative mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-[7px] font-mono text-xs tracking-wider text-[#9fe9ff]">
              <span className="h-[7px] w-[7px] rounded-full bg-accent-mint shadow-[0_0_10px_#34f5c5]" />
              {t("case study · shipped product, not a mockup", "кейс · готовый продукт, не макет")}
            </div>
            <h1 className="mb-[22px] text-[clamp(32px,4.6vw,54px)] font-bold leading-[1.06] tracking-tight">
              {t(
                "A loyalty and booking app for medical clinics — ",
                "Приложение лояльности и записи для медклиник — "
              )}
              <span className="animate-shimmer text-gradient-ice">
                {t("in your brand. Weeks, not months.", "под ваш бренд за недели, не месяцы.")}
              </span>
            </h1>
            <p className="mb-[30px] max-w-[520px] text-[17px] leading-relaxed text-muted">
              {t(
                "“Moy ❤ Doctor” is a PWA and mobile app I built and launched for a medical center in Armavir: online booking, an electronic health record, bonuses and gift certificates in one interface. The same engine adapts to your clinic, your data and your CRM.",
                "«Мой ❤ Доктор» — PWA и мобильное приложение, которое я построил и запустил для медцентра в Армавире: онлайн-запись, электронная медкарта, бонусы и подарочные сертификаты в одном интерфейсе. Тот же движок адаптируется под вашу клинику, вашу базу и вашу CRM."
              )}
            </p>
            <div className="mb-[30px] flex flex-wrap gap-3.5">
              <a href="https://t.me/gr33njj" target="_blank" rel="noopener noreferrer" className={tgBtn}>
                <Sheen />
                <span className="relative">
                  {t("Discuss an app for my clinic", "Обсудить приложение для моей клиники")}
                </span>
              </a>
              <a
                href="https://app.mydoctorarmavir.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-[rgba(140,180,240,.18)] bg-surface px-[26px] py-[15px] text-[15px] font-medium text-foreground transition-colors hover:border-accent/50"
              >
                {t("Open the live app ↗", "Открыть живое приложение ↗")}
              </a>
            </div>
            <div className="flex flex-wrap gap-6">
              {[
                { c: "text-accent", label: t("PWA · Android · iOS — one codebase", "PWA · Android · iOS, один код") },
                { c: "text-accent-purple", label: t("Works with 1C or any other CRM", "Интеграция с 1С или любой другой CRM") },
                { c: "text-accent-blue", label: t("Already live in Google Play and RuStore", "Уже в Google Play и RuStore") },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2.5 text-[13px] text-muted-dim">
                  <span className={`${p.c} text-base`}>◆</span>
                  {p.label}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-[22px] border border-[rgba(140,180,240,.16)] shadow-[0_30px_80px_-30px_rgba(0,0,0,.7)]">
              <img
                src={`${BASE}/feature-graphic.webp`}
                alt={t("Moy Doctor — app cover", "Мой Доктор — обложка приложения")}
                className="block w-full"
              />
            </div>
          </Reveal>
        </div>
      </header>

      {/* PROOF BAR */}
      <section className="relative border-y border-line bg-[#090b14] px-5 py-[22px] sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-5">
          <p className="m-0 max-w-[460px] text-sm text-muted-dim">
            {t("This is not a pitch mockup. ", "Это не мокап для питча. ")}
            <b className="text-foreground">
              {t("It is running right now", "Это работает прямо сейчас")}
            </b>
            {t(" at the Moy Doctor clinic in Armavir.", " в клинике «Мой Доктор», Армавир.")}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {proofLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[rgba(140,180,240,.18)] px-3.5 py-[9px] font-mono text-[12.5px] text-foreground transition-colors hover:border-accent/50 hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM (light) */}
      <section className="bg-[#eff3f1] px-5 py-[90px] text-[#0e1420] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1160px]">
          <Reveal className="mb-12 max-w-[620px]">
            <LightTag color="#e63950">{t("the problem", "проблема")}</LightTag>
            <h2 className="mb-3.5 mt-[18px] text-[clamp(26px,3.2vw,38px)] font-extrabold leading-[1.15] tracking-tight">
              {t(
                "While your patient waits on hold, they book with another clinic",
                "Пока пациент дозванивается — он уже записался в другую клинику"
              )}
            </h2>
            <p className="m-0 leading-relaxed text-[#5b6472]">
              {t(
                "The front desk physically can't handle the full call flow at peak hours, and paper loyalty doesn't bring patients back. Every missed call is a patient you will never see.",
                "Регистратура физически не тянет весь поток звонков в пиковые часы, а бумажная лояльность не удерживает пациента. Каждый несостоявшийся звонок — гость, которого вы никогда не увидите."
              )}
            </p>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-[rgba(14,20,32,.1)] bg-[rgba(14,20,32,.1)] md:grid-cols-3">
              {problems.map((p) => (
                <div key={p.title} className="bg-[#eff3f1] px-6 py-7">
                  <span className="mb-3 block font-mono text-[11px] text-[#e63950]">{p.comment}</span>
                  <h3 className="mb-2 text-[17px] font-bold">{p.title}</h3>
                  <p className="m-0 text-sm leading-relaxed text-[#5b6472]">{p.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY PORTRAIT (light) */}
      <section className="bg-[#f6f8f7] py-[70px]">
        <div className="mb-[30px] px-5 sm:px-10 lg:px-16">
          <Reveal className="mx-auto flex max-w-[1160px] flex-wrap items-end justify-between gap-5">
            <div>
              <LightTag color="#1f9d6c">{t("what it looks like", "как это выглядит")}</LightTag>
              <h2 className="mt-4 text-[clamp(24px,3vw,32px)] font-extrabold tracking-tight text-[#0e1420]">
                {t("Screens from App Store / Google Play", "Экраны из App Store / Google Play")}
              </h2>
            </div>
            <p className="m-0 max-w-[320px] text-[13.5px] text-[#5b6472]">
              {t(
                "Swipe the cards — the video is a real walkthrough, the screenshots are from the live store listing.",
                "Листайте карточки в сторону — видео снято в живом приложении, скриншоты из реального листинга."
              )}
            </p>
          </Reveal>
        </div>
        <Gallery
          shots={portraitShots}
          height={460}
          leading={
            <div className="relative flex-none snap-start overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,.35)]">
              <video
                src={`${BASE}/mydoc-app.mp4`}
                poster={`${BASE}/mydoc-app-poster.webp`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{ height: 460 }}
                className="block w-auto max-w-none"
              />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[rgba(6,8,15,.72)] px-3 py-1.5 font-mono text-[11px] text-[#9fe9ff] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-mint shadow-[0_0_8px_#34f5c5]" />
                {t("live demo", "живое демо")}
              </span>
            </div>
          }
        />
      </section>

      {/* FEATURES (dark) */}
      <section className="bg-background px-5 py-[90px] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1160px]">
          <Reveal className="mb-12 max-w-[640px]">
            <div className="mb-4 font-mono text-xs uppercase tracking-[.16em] text-accent">
              {t("what's inside", "что внутри")}
            </div>
            <h2 className="mb-3.5 text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-tight">
              {t(
                "Six modules that cover the whole patient journey",
                "Шесть модулей, которые закрывают весь путь пациента"
              )}
            </h2>
            <p className="m-0 leading-relaxed text-muted">
              {t(
                "From the first touch to medical history — in one app instead of five separate services.",
                "От первого касания до истории болезни — в одном приложении, а не в пяти разных сервисах."
              )}
            </p>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-[rgba(140,180,240,.1)] bg-[rgba(140,180,240,.1)] sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((m) => (
                <div key={m.tag} className="min-h-[170px] bg-[#0b0e18] px-[22px] py-[26px]">
                  <div className={`mb-3.5 font-mono text-[11px] ${m.color}`}>{m.tag}</div>
                  <h3 className="mb-2 text-[16.5px] font-semibold">{m.title}</h3>
                  <p className="m-0 text-[13.5px] leading-[1.55] text-muted-dim">{m.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY WIDE (light) */}
      <section className="bg-[#f6f8f7] py-[70px]">
        <div className="mb-[30px] px-5 sm:px-10 lg:px-16">
          <Reveal className="mx-auto max-w-[1160px]">
            <LightTag color="#1f9d6c">{t("wide format", "широкий формат")}</LightTag>
            <h2 className="mt-4 text-[clamp(24px,3vw,32px)] font-extrabold tracking-tight text-[#0e1420]">
              {t(
                "The same screens for tablets and promo materials",
                "Те же экраны для планшета и промо-материалов"
              )}
            </h2>
          </Reveal>
        </div>
        <Gallery shots={wideShots} height={320} />
      </section>

      {/* TRUST / ENGINEERING (light) */}
      <section className="bg-[#eff3f1] px-5 py-[90px] text-[#0e1420] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1160px]">
          <Reveal className="mb-12 max-w-[640px]">
            <LightTag color="#e63950">{t("under the hood", "как устроено")}</LightTag>
            <h2 className="mb-3.5 mt-[18px] text-[clamp(26px,3.2vw,38px)] font-extrabold leading-[1.15] tracking-tight">
              {t("Built as a product, not a rushed MVP", "Построено как продукт, а не MVP на скорую руку")}
            </h2>
            <p className="m-0 leading-relaxed text-[#5b6472]">
              {t(
                "Under the hood is architecture sized for a real clinic's load. And yes: the integration is built around your system — not everyone runs 1C, and the engine connects equally well to 1C or any other CRM/HIS via API. The 1C-side API for Moy Doctor was built by ",
                "Под капотом — архитектура на реальную нагрузку клиники. И да: интеграция строится под вашу систему — 1С есть не у всех, движок одинаково хорошо стыкуется и с 1С, и с любой другой CRM или МИС через API. API со стороны 1С для «Мой Доктор» реализовала команда "
              )}
              <a
                href="https://d-partners.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0e1420] underline decoration-[#e63950]/40 underline-offset-2 transition-colors hover:decoration-[#e63950]"
              >
                d-partners.ru
              </a>
              .
            </p>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((m) => (
                <div key={m.title} className="rounded-xl border border-[rgba(14,20,32,.1)] bg-[#fbfcfb] px-5 py-[22px]">
                  <div className="mb-2.5 font-mono text-[19px] font-semibold text-[#e63950]">{m.value}</div>
                  <h4 className="mb-1.5 text-[13.5px] font-bold">{m.title}</h4>
                  <p className="m-0 text-[12.5px] leading-normal text-[#5b6472]">{m.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE (dark) */}
      <section className="bg-background px-5 py-[90px] sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[900px]">
          <Reveal className="mb-12 max-w-[640px]">
            <div className="mb-4 font-mono text-xs uppercase tracking-[.16em] text-accent">
              {t("how we launch", "как запускаем")}
            </div>
            <h2 className="mb-3.5 text-[clamp(26px,3.6vw,40px)] font-bold leading-[1.1] tracking-tight">
              {t("From brief to store release", "От брифа до публикации в сторах")}
            </h2>
            <p className="m-0 leading-relaxed text-muted">
              {t(
                "The same path the Moy Doctor clinic took — now in your brand.",
                "Тот же путь, что прошла клиника «Мой Доктор» — теперь под ваш бренд."
              )}
            </p>
          </Reveal>
          <Reveal>
            <div className="ml-2 border-l-2 border-[rgba(140,180,240,.14)]">
              {timeline.map((s, i) => (
                <div key={s.title} className={`relative pl-8 ${i < timeline.length - 1 ? "pb-10" : ""}`}>
                  <div className="absolute -left-[19px] -top-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-ice font-mono text-[13px] font-bold text-[#04121a]">
                    {i + 1}
                  </div>
                  <h3 className="mb-1.5 text-[17px] font-semibold">{s.title}</h3>
                  <p className="m-0 max-w-[560px] text-sm leading-relaxed text-muted-dim">{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#05060d_0%,#050810_100%)] px-5 py-[100px] text-center sm:px-10 lg:px-16">
        <div
          className="pointer-events-none absolute -top-[30%] left-1/2 h-[60vw] w-[60vw] -translate-x-1/2"
          style={{ background: "radial-gradient(circle, rgba(103,232,249,.14), transparent 62%)", filter: "blur(40px)" }}
        />
        <Reveal className="relative">
          <div className="mb-[18px] font-mono text-xs uppercase tracking-[.16em] text-accent">
            {t("next step", "следующий шаг")}
          </div>
          <h2 className="mx-auto mb-[18px] max-w-[760px] text-[clamp(28px,4.4vw,46px)] font-bold leading-[1.1] tracking-tight">
            {t("Want the same app for your clinic?", "Хотите такое же приложение для своей клиники?")}
          </h2>
          <p className="mx-auto mb-[34px] max-w-[480px] leading-relaxed text-muted">
            {t(
              "I'll show a live demo and estimate the timeline for your CRM and service structure — no strings attached.",
              "Покажу живое демо и посчитаю сроки под вашу CRM и структуру услуг — без обязательств."
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <a href="https://t.me/gr33njj" target="_blank" rel="noopener noreferrer" className={tgBtn}>
              <Sheen />
              <span className="relative">
                {t("Message me on Telegram — @gr33njj", "Написать в Telegram — @gr33njj")}
              </span>
            </a>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2.5 rounded-xl border border-[rgba(140,180,240,.18)] bg-surface px-[30px] py-4 text-[15.5px] font-medium text-foreground transition-colors hover:border-accent/50"
            >
              {t("Other work", "Другие работы")}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
