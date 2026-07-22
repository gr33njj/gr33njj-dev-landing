"use client";

import { useLanguage } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import {
  Eyebrow,
  Kicker,
  ProofBar,
  Quote,
  StatGrid,
  FindingGrid,
  FindingCard,
  ArticleSection,
  P,
  H2,
  List,
  BrowserFrame,
  primaryBtn,
  secondaryBtn,
  Sheen,
} from "@/components/case/shared";
import Link from "next/link";

const IMG = "/case/skangar";

const articles = [
  { en: "What foundation does a hangar need", ru: "Какой фундамент нужен под ангар" },
  { en: "LSTK: what it is and why it pays off", ru: "ЛСТК: что это такое и почему выгодно" },
  { en: "Insulating a hangar: sandwich panels", ru: "Утепление ангара: сэндвич-панели" },
  { en: "What drives the price of a hangar", ru: "От чего зависит цена ангара" },
  { en: "Hangar for farm equipment and a grain store", ru: "Ангар для сельхозтехники и зернохранилище" },
  { en: "Turnkey warehouse for logistics and trade", ru: "Склад под ключ для логистики и торговли" },
  { en: "Production shop made of steel structures", ru: "Производственный цех из металлоконструкций" },
  { en: "How hangar design actually works", ru: "Как проходит проектирование ангара" },
  { en: "Ventilation and microclimate in a hangar", ru: "Вентиляция и микроклимат в ангаре" },
  { en: "10 mistakes when ordering a hangar", ru: "10 ошибок при заказе ангара" },
  { en: "Which hangar to choose — a pillar comparison with geo-clusters", ru: "Какой ангар выбрать — pillar-сравнение с гео-кластерами" },
  { en: "Hangar installation: timeline and stages", ru: "Монтаж ангара: сроки и этапы" },
];

export default function SkangarCase() {
  const { t } = useLanguage();

  return (
    <div className="relative">
      {/* HERO */}
      <header className="relative overflow-hidden px-5 pb-16 pt-[120px] text-center sm:px-10 lg:px-16">
        <div
          className="pointer-events-none absolute -right-[10%] -top-[20%] h-[55vw] w-[55vw]"
          style={{ background: "radial-gradient(circle, rgba(103,232,249,.14), transparent 62%)", filter: "blur(40px)" }}
        />
        <div className="relative mx-auto max-w-[820px]">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow>{t("case study · SEO & content infrastructure", "кейс · SEO-инфраструктура")}</Eyebrow>
            </div>
            <h1 className="mb-[22px] text-[clamp(32px,4.6vw,54px)] font-bold leading-[1.1] tracking-tight">
              {t("A landing page that outgrew itself into ", "Лендинг, который дорос до ")}
              <span className="animate-shimmer text-gradient-ice">
                {t("content infrastructure", "content-инфраструктуры")}
              </span>
            </h1>
            <p className="mx-auto mb-[30px] max-w-[600px] text-[17px] leading-relaxed text-muted">
              {t(
                "skangar-landing started as an ordinary landing page for a construction company: build it, ship it, done. Later it became clear that for real traffic volume one page is physically not enough — dozens of cities and districts the company actually delivers to, and dozens of search queries a single landing page could never answer.",
                "skangar-landing начинался как обычный лендинг для строительной компании — сделал, сдал, готово. Спустя время стало понятно: для реального объёма трафика одной страницы физически недостаточно — десятки городов и районов, куда компания реально возит и монтирует конструкции, и десятки поисковых запросов, которые лендинг не мог закрыть в принципе."
              )}
            </p>
            <div className="mb-[30px] flex flex-wrap justify-center gap-3.5">
              <a href="https://t.me/gr33njj" target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                <Sheen />
                <span className="relative">{t("Discuss a similar project", "Обсудить похожий проект")}</span>
              </a>
              <a href="https://skangar.ru/" target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
                {t("Open skangar.ru ↗", "Открыть skangar.ru ↗")}
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { c: "text-accent", label: t("75 live city pages", "75 живых городских страниц") },
                { c: "text-accent-purple", label: t("13 knowledge-base articles", "13 статей базы знаний") },
                { c: "text-accent-blue", label: t("Article/FAQ/Breadcrumb JSON-LD", "Article/FAQ/Breadcrumb JSON-LD") },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2.5 text-[13px] text-muted-dim">
                  <span className={`${p.c} text-base`}>◆</span>
                  {p.label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal className="mx-auto mt-14 max-w-[980px] px-0 sm:px-6">
          <BrowserFrame url="skangar.ru" src={`${IMG}/hero.webp`} alt={t("skangar.ru — homepage", "skangar.ru — главная страница")} />
        </Reveal>
      </header>

      <ProofBar
        note={t(
          "This is not a one-off landing anymore — it is a live content system serving real regional search intent for a construction company.",
          "Это не разовый лендинг — живая контентная система, которая отвечает на реальные региональные поисковые запросы строительной компании."
        )}
        links={[{ href: "https://skangar.ru/", label: "skangar.ru ↗" }]}
      />

      <ArticleSection>
        <Reveal>
          <Kicker n="01">{t("Scope", "Масштаб задачи")}</Kicker>
          <H2>{t("Growing without breaking what already worked", "Дорастить, не сломав то, что уже работало")}</H2>
          <P>
            {t(
              "The landing needed to grow into content infrastructure without breaking what already worked:",
              "Лендинг нужно было дорастить до content-инфраструктуры, не сломав то, что уже работало:"
            )}
          </P>
          <List
            items={[
              t(
                "landing pages for 75 cities and districts across Krasnodar Krai and neighboring regions — not template clones, but pages with real regional specifics (soil types, wind loads, local economy — viticulture here, rice farming there, a port somewhere else)",
                "посадочные страницы под 75 городов и районов Краснодарского края и соседних регионов — не шаблонные клоны, а с региональной спецификой (грунты, ветровые нагрузки, локальная экономика — где-то виноградарство, где-то рисоводство, где-то порт)"
              ),
              t(
                "a “Knowledge Base” section — 13 articles with clustered internal linking, plus a glossary that grew organically to 37 terms alongside the articles",
                "раздел «База знаний» — 13 статей с кластерной перелинковкой и глоссарий на 37 терминов, выросший органически вместе со статьями"
              ),
              t(
                "navigation and site structure had to be rebuilt around this new volume, not bolted on beside it",
                "навигацию и структуру сайта пришлось пересобирать вокруг этого нового объёма, а не пристраивать сбоку"
              ),
            ]}
          />
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <Kicker n="02">{t("Build", "Сборка кода")}</Kicker>
          <H2>{t("One generator, no copy-paste", "Один генератор, ноль копипасты")}</H2>
          <P>
            {t(
              "Everything ran on a shared Python generator: one page_shell(), reusable helpers for schema.org markup and breadcrumbs, a single template for 75 city pages with targeted substitution of regional data. Brute-force duplication is a bad idea at this scale, so shared pieces — header, footer, FAQ markup — were factored out from the very start.",
              "Всё держалось на общем Python-генераторе: один page_shell(), переиспользуемые хелперы для схем и хлебных крошек, единый шаблон для 75 городских страниц с точечной заменой региональных данных. Дублирование в лоб — плохая идея на таком масштабе, поэтому общие куски (шапка, футер, вёрстка FAQ) были вынесены в шаред-код с самого начала."
            )}
          </P>
          <P>
            {t(
              "At some point the working copy of the generator itself got lost between sessions — only its output was ever deployed, never the generator itself. The process had to be rebuilt by hand: taking an already-published page as the reference and cloning it with targeted edits instead of blind regex replacement. Slower, but every edit gets checked before deploy — and not a single article shipped to production with a defect.",
              "В какой-то момент рабочая копия генератора оказалась потеряна между сессиями — сам генератор нигде не деплоился, деплоился только его результат. Пришлось восстанавливать процесс вручную: брать уже опубликованную страницу как эталон и клонировать её точечными правками вместо слепой regex-замены. Медленнее, зато каждая правка проверяется перед деплоем — и ни одна статья не ушла в прод с дефектом."
            )}
          </P>
          <Quote>
            {t(
              "A good process rests on the discipline of checking, not on the tool — you can lose a tool, but not the habit of checking every deploy.",
              "Хороший процесс держится не на инструменте, а на дисциплине проверки — инструмент можно потерять, привычку проверять каждый деплой — нет."
            )}
          </Quote>
        </Reveal>
      </ArticleSection>

      <section className="px-5 pb-16 sm:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-[900px]">
          <BrowserFrame
            url="skangar.ru/#calculator"
            src={`${IMG}/calculator.webp`}
            alt={t("Interactive hangar calculator", "Интерактивный калькулятор ангара")}
          />
        </Reveal>
      </section>

      <ArticleSection>
        <Reveal>
          <Kicker n="03">{t("Field notes", "Технические моменты")}</Kicker>
          <H2>{t("Three findings worth remembering", "Три находки, которые стоило запомнить")}</H2>
        </Reveal>
        <Reveal>
          <FindingGrid>
            <FindingCard
              tag={t("// nginx routing", "// nginx-роутинг")}
              color="#67e8f9"
              title={t("A subdomain needs two edits, not one", "Поддомен требует правки в двух местах")}
              desc={t(
                "A new city subdomain requires edits in two places in the nginx config — the server_name list and a separate map $host $city_dir. Forgetting the second one meant half a day debugging 404s that looked baseless, even though nginx was honestly matching the domain.",
                "Поддомен нового города требует правки сразу в двух местах nginx-конфига — списка server_name и отдельного map $host $city_dir. Забыл про второе — полдня отладки 404 на ровном месте, хотя nginx честно матчил домен."
              )}
            />
            <FindingCard
              tag={t("// deploy incident", "// инцидент деплоя")}
              color="#a855f7"
              title={t("rsync silently collapses multi-source paths", "rsync тихо схлопывает пути при нескольких источниках")}
              desc={t(
                "rsync with several source directories in one command silently collapses them into a shared destination folder. One careless deploy temporarily buried the site's homepage under the glossary page.",
                "rsync с несколькими каталогами-источниками в одной команде без разбора схлопывает их в общий каталог назначения. Один неаккуратный деплой временно похоронил главную страницу сайта под страницей словаря терминов."
              )}
            />
            <FindingCard
              tag={t("// asset pipeline", "// конвейер ассетов")}
              color="#38bdf8"
              title={t("Never force-resize without checking ratios", "Никогда не ресайзь пачкой без проверки пропорций")}
              desc={t(
                "Article banners arrived with different source aspect ratios. Force-resizing to one grid of sizes would have quietly distorted part of the images if each one hadn't been checked individually.",
                "Баннеры для статей приходили с разными исходными пропорциями — форс-ресайз в одну сетку размеров тихо исказил бы часть картинок, если не проверять пропорции каждой отдельно."
              )}
            />
          </FindingGrid>
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <Kicker n="04">{t("SEO", "SEO")}</Kicker>
          <H2>{t("Structured data, not decoration", "Структурированные данные, а не украшение")}</H2>
          <List
            items={[
              t(
                "Article / FAQPage / BreadcrumbList JSON-LD on every knowledge-base page",
                "Article / FAQPage / BreadcrumbList JSON-LD на каждой странице базы знаний"
              ),
              t(
                "a unique og:image per article instead of one shared image for the whole site",
                "уникальный og:image на каждую статью вместо одной общей картинки на весь сайт"
              ),
              t(
                "articles were written around exact phrasings from Google Search Console, not “about the topic in general” — with a plan to check impressions and clicks a few weeks after publishing",
                "статьи писались не «про тему вообще», а под конкретные формулировки из Google Search Console — с расчётом сверить показы и клики через несколько недель после публикации"
              ),
              t(
                "internal linking isn't a checkbox: every new article deliberately links to 4–6 already-published ones, forming a cluster instead of a scattered list of texts",
                "внутренняя перелинковка не для галочки: каждая новая статья осознанно ссылается на 4–6 уже опубликованных, формируя кластер, а не разрозненный список текстов"
              ),
            ]}
          />
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <Kicker n="05">{t("Diagnostics & fixes", "Диагностика и фиксы")}</Kicker>
          <H2>{t("What we found and fixed on the live site", "Что нашли и починили на живом сайте")}</H2>
          <List
            items={[
              t(
                "Found and explained why content was invisible to crawlers (innerHTML instead of static markup) — fixed on the client's side",
                "Нашли и объяснили причину невидимости контента для краулеров (innerHTML вместо статичной разметки) — почини­ли сами"
              ),
              t(
                "Untangled a Yandex.Webmaster robots.txt error down to a wildcard DNS record (*.skangar.ru) and vhost configuration",
                "Разобрали ошибку Яндекс.Вебмастера по robots.txt, довели до объяснения через wildcard DNS-запись (*.skangar.ru) и настройки vhost"
              ),
              t(
                "Found and assessed the risk of the old WordPress geo-network (a doorway pattern) — chose not to revive it in its old form",
                "Нашли и оценили риски старой WordPress-гео-сети (doorway-паттерн) — не стали её реанимировать в старом виде"
              ),
              t(
                "Ran a full technical audit of the new site: confirmed honest content delivery to every user agent (no cloaking), checked redirects, canonicals, meta tags",
                "Провели полный технический аудит нового сайта: подтвердили честную отдачу контента для всех User-Agent (без клоакинга), проверили редиректы, canonical, meta-теги"
              ),
              t(
                "Found a navigation desync and a soft 404 on /znaniya/dokumenty/",
                "Нашли на живом сайте рассинхрон навигации и мягкий 404 на /znaniya/dokumenty/"
              ),
            ]}
          />
        </Reveal>
      </ArticleSection>

      <section className="px-5 pb-16 sm:px-10 lg:px-16">
        <Reveal className="mx-auto flex max-w-[980px] flex-col gap-6 sm:flex-row">
          <BrowserFrame
            className="sm:flex-1"
            url="skangar.ru/znaniya"
            src={`${IMG}/knowledge-base.webp`}
            alt={t("Knowledge base index", "Индекс базы знаний")}
          />
          <BrowserFrame
            className="sm:flex-1"
            url="skangar.ru/znaniya/stroitelstvo"
            src={`${IMG}/article.webp`}
            alt={t("Knowledge base category page", "Страница категории базы знаний")}
          />
        </Reveal>
      </section>

      <ArticleSection>
        <Reveal>
          <Kicker n="06">{t("Content", "Контент")}</Kicker>
          <H2>{t("12 knowledge-base articles (and counting)", "12 статей базы знаний (и продолжают выходить)")}</H2>
          <P>
            {t(
              "Each one shipped with meta data, a mini-FAQ, glossary terms extracted into the dictionary (~35–37 terms accumulated), and live internal linking between articles.",
              "Каждая — с meta-данными, мини-FAQ, терминами в словарь (~35–37 терминов накопилось) и живой внутренней перелинковкой между статьями."
            )}
          </P>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {articles.map((a, i) => (
              <div
                key={a.ru}
                className="flex items-start gap-3 rounded-lg border border-line bg-[rgba(140,180,240,.03)] px-4 py-3 text-sm text-muted-dim"
              >
                <span className="font-mono text-[11px] text-muted-ghost">{String(i + 1).padStart(2, "0")}</span>
                <span>{t(a.en, a.ru)}</span>
              </div>
            ))}
            <div className="flex items-start gap-3 rounded-lg border border-dashed border-line px-4 py-3 text-sm text-muted-ghost">
              <span className="font-mono text-[11px]">13</span>
              <span>
                {t(
                  "Turnkey hangar cost: calculation examples (in progress)",
                  "Стоимость ангара под ключ: примеры расчётов (в процессе)"
                )}
              </span>
            </div>
          </div>
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <Kicker n="07">{t("Result", "Результат")}</Kicker>
          <H2>{t("A site that finally answers real queries", "Сайт, который наконец отвечает на реальные запросы")}</H2>
          <div className="mb-8">
            <StatGrid
              stats={[
                { value: "75", label: t("live city pages", "живых городских страниц") },
                { value: "13", label: t("knowledge-base articles", "статей базы знаний") },
                { value: "37", label: t("glossary terms", "терминов в словаре") },
                { value: "100%", label: t("JSON-LD coverage", "покрытие JSON-LD") },
              ]}
            />
          </div>
          <P>
            {t(
              "75 live city pages, 13 knowledge-base articles with working internal linking, the entire knowledge base marked up with structured data — a site that finally answers real queries instead of just presenting the company.",
              "75 живых городских страниц, 13 статей базы знаний с работающей перелинковкой, вся база знаний размечена структурированными данными — сайт, который наконец отвечает на реальные запросы, а не только представляет компанию."
            )}
          </P>
          <Quote>
            {t(
              "A landing page is just the entry point. The real work begins when it turns out one page isn't enough, and you need to design a system that grows without architectural debt — even if you have to rebuild the process from scratch twice along the way.",
              "Лендинг — это только точка входа. Настоящая работа начинается, когда выясняется, что одной страницы недостаточно, и нужно спроектировать систему, которая растёт без архитектурного долга — даже если по пути придётся дважды восстанавливать процесс с нуля."
            )}
          </Quote>
        </Reveal>
      </ArticleSection>

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
            {t("Need the same kind of content infrastructure?", "Нужна похожая контентная инфраструктура?")}
          </h2>
          <p className="mx-auto mb-[34px] max-w-[480px] leading-relaxed text-muted">
            {t(
              "I'll look at your query map and tell you honestly whether you need a redesign or a system like this one.",
              "Посмотрю на карту ваших запросов и честно скажу, нужен ли вам редизайн или система вроде этой."
            )}
          </p>
          <div className="mb-14 flex flex-wrap justify-center gap-3.5">
            <a href="https://t.me/gr33njj" target="_blank" rel="noopener noreferrer" className={primaryBtn}>
              <Sheen />
              <span className="relative">{t("Message me on Telegram — @gr33njj", "Написать в Telegram — @gr33njj")}</span>
            </a>
            <Link href="/#work" className={secondaryBtn}>
              {t("Other work", "Другие работы")}
            </Link>
          </div>
          <div className="mx-auto max-w-[600px]">
            <BrowserFrame
              url="skangar.ru/#contact"
              src={`${IMG}/contact.webp`}
              alt={t("Contact form", "Форма контактов")}
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
