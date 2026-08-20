import type { Block } from "./blocks";

const IMG = "/case/skangar";

const articles: { en: string; ru: string }[] = [
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

export const SKANGAR_BLOCKS: Block[] = [
  {
    type: "p",
    en: "skangar-landing started as an ordinary landing page for a construction company: build it, ship it, done. Later it became clear that for real traffic volume one page is physically not enough — dozens of cities and districts the company actually delivers to, and dozens of search queries a single landing page could never answer.",
    ru: "skangar-landing начинался как обычный лендинг для строительной компании — сделал, сдал, готово. Спустя время стало понятно: для реального объёма трафика одной страницы физически недостаточно — десятки городов и районов, куда компания реально возит и монтирует конструкции, и десятки поисковых запросов, которые лендинг не мог закрыть в принципе.",
  },
  {
    type: "stats",
    stats: [
      { value: "75", en: "live city pages", ru: "живых городских страниц" },
      { value: "13", en: "knowledge-base articles", ru: "статей базы знаний" },
      { value: "JSON-LD", en: "Article/FAQ/Breadcrumb", ru: "Article/FAQ/Breadcrumb" },
    ],
  },
  { type: "image", src: `${IMG}/hero.webp`, alt: { en: "skangar.ru — homepage", ru: "skangar.ru — главная страница" } },

  { type: "kicker", n: "01", en: "Scope", ru: "Масштаб задачи" },
  { type: "h2", en: "Growing without breaking what already worked", ru: "Дорастить, не сломав то, что уже работало" },
  { type: "p", en: "The landing needed to grow into content infrastructure without breaking what already worked:", ru: "Лендинг нужно было дорастить до content-инфраструктуры, не сломав то, что уже работало:" },
  {
    type: "list",
    items: [
      { en: "landing pages for 75 cities and districts across Krasnodar Krai and neighboring regions — not template clones, but pages with real regional specifics (soil types, wind loads, local economy — viticulture here, rice farming there, a port somewhere else)", ru: "посадочные страницы под 75 городов и районов Краснодарского края и соседних регионов — не шаблонные клоны, а с региональной спецификой (грунты, ветровые нагрузки, локальная экономика — где-то виноградарство, где-то рисоводство, где-то порт)" },
      { en: "a “Knowledge Base” section — 13 articles with clustered internal linking, plus a glossary that grew organically to 37 terms alongside the articles", ru: "раздел «База знаний» — 13 статей с кластерной перелинковкой и глоссарий на 37 терминов, выросший органически вместе со статьями" },
      { en: "navigation and site structure had to be rebuilt around this new volume, not bolted on beside it", ru: "навигацию и структуру сайта пришлось пересобирать вокруг этого нового объёма, а не пристраивать сбоку" },
    ],
  },

  { type: "kicker", n: "02", en: "Build", ru: "Сборка кода" },
  { type: "h2", en: "One generator, no copy-paste", ru: "Один генератор, ноль копипасты" },
  {
    type: "p",
    en: "Everything ran on a shared Python generator: one page_shell(), reusable helpers for schema.org markup and breadcrumbs, a single template for 75 city pages with targeted substitution of regional data. Brute-force duplication is a bad idea at this scale, so shared pieces — header, footer, FAQ markup — were factored out from the very start.",
    ru: "Всё держалось на общем Python-генераторе: один page_shell(), переиспользуемые хелперы для схем и хлебных крошек, единый шаблон для 75 городских страниц с точечной заменой региональных данных. Дублирование в лоб — плохая идея на таком масштабе, поэтому общие куски (шапка, футер, вёрстка FAQ) были вынесены в шаред-код с самого начала.",
  },
  {
    type: "p",
    en: "At some point the working copy of the generator itself got lost between sessions — only its output was ever deployed, never the generator itself. The process had to be rebuilt by hand: taking an already-published page as the reference and cloning it with targeted edits instead of blind regex replacement. Slower, but every edit gets checked before deploy — and not a single article shipped to production with a defect.",
    ru: "В какой-то момент рабочая копия генератора оказалась потеряна между сессиями — сам генератор нигде не деплоился, деплоился только его результат. Пришлось восстанавливать процесс вручную: брать уже опубликованную страницу как эталон и клонировать её точечными правками вместо слепой regex-замены. Медленнее, зато каждая правка проверяется перед деплоем — и ни одна статья не ушла в прод с дефектом.",
  },
  {
    type: "quote",
    en: "A good process rests on the discipline of checking, not on the tool — you can lose a tool, but not the habit of checking every deploy.",
    ru: "Хороший процесс держится не на инструменте, а на дисциплине проверки — инструмент можно потерять, привычку проверять каждый деплой — нет.",
  },
  { type: "image", src: `${IMG}/calculator.webp`, alt: { en: "Interactive hangar calculator", ru: "Интерактивный калькулятор ангара" } },

  { type: "kicker", n: "03", en: "Field notes", ru: "Технические моменты" },
  { type: "h2", en: "Three findings worth remembering", ru: "Три находки, которые стоило запомнить" },
  {
    type: "findings",
    items: [
      {
        tag: { en: "// nginx routing", ru: "// nginx-роутинг" },
        title: { en: "A subdomain needs two edits, not one", ru: "Поддомен требует правки в двух местах" },
        desc: { en: "A new city subdomain requires edits in two places in the nginx config — the server_name list and a separate map $host $city_dir. Forgetting the second one meant half a day debugging 404s that looked baseless, even though nginx was honestly matching the domain.", ru: "Поддомен нового города требует правки сразу в двух местах nginx-конфига — списка server_name и отдельного map $host $city_dir. Забыл про второе — полдня отладки 404 на ровном месте, хотя nginx честно матчил домен." },
      },
      {
        tag: { en: "// deploy incident", ru: "// инцидент деплоя" },
        title: { en: "rsync silently collapses multi-source paths", ru: "rsync тихо схлопывает пути при нескольких источниках" },
        desc: { en: "rsync with several source directories in one command silently collapses them into a shared destination folder. One careless deploy temporarily buried the site's homepage under the glossary page.", ru: "rsync с несколькими каталогами-источниками в одной команде без разбора схлопывает их в общий каталог назначения. Один неаккуратный деплой временно похоронил главную страницу сайта под страницей словаря терминов." },
      },
      {
        tag: { en: "// asset pipeline", ru: "// конвейер ассетов" },
        title: { en: "Never force-resize without checking ratios", ru: "Никогда не ресайзь пачкой без проверки пропорций" },
        desc: { en: "Article banners arrived with different source aspect ratios. Force-resizing to one grid of sizes would have quietly distorted part of the images if each one hadn't been checked individually.", ru: "Баннеры для статей приходили с разными исходными пропорциями — форс-ресайз в одну сетку размеров тихо исказил бы часть картинок, если не проверять пропорции каждой отдельно." },
      },
    ],
  },

  { type: "kicker", n: "04", en: "SEO", ru: "SEO" },
  { type: "h2", en: "Structured data, not decoration", ru: "Структурированные данные, а не украшение" },
  {
    type: "list",
    items: [
      { en: "Article / FAQPage / BreadcrumbList JSON-LD on every knowledge-base page", ru: "Article / FAQPage / BreadcrumbList JSON-LD на каждой странице базы знаний" },
      { en: "a unique og:image per article instead of one shared image for the whole site", ru: "уникальный og:image на каждую статью вместо одной общей картинки на весь сайт" },
      { en: "articles were written around exact phrasings from Google Search Console, not “about the topic in general” — with a plan to check impressions and clicks a few weeks after publishing", ru: "статьи писались не «про тему вообще», а под конкретные формулировки из Google Search Console — с расчётом сверить показы и клики через несколько недель после публикации" },
      { en: "internal linking isn't a checkbox: every new article deliberately links to 4–6 already-published ones, forming a cluster instead of a scattered list of texts", ru: "внутренняя перелинковка не для галочки: каждая новая статья осознанно ссылается на 4–6 уже опубликованных, формируя кластер, а не разрозненный список текстов" },
    ],
  },

  { type: "kicker", n: "05", en: "Diagnostics & fixes", ru: "Диагностика и фиксы" },
  { type: "h2", en: "What we found and fixed on the live site", ru: "Что нашли и починили на живом сайте" },
  {
    type: "list",
    items: [
      { en: "Found and explained why content was invisible to crawlers (innerHTML instead of static markup) — fixed on the client's side", ru: "Нашли и объяснили причину невидимости контента для краулеров (innerHTML вместо статичной разметки) — почини­ли сами" },
      { en: "Untangled a Yandex.Webmaster robots.txt error down to a wildcard DNS record (*.skangar.ru) and vhost configuration", ru: "Разобрали ошибку Яндекс.Вебмастера по robots.txt, довели до объяснения через wildcard DNS-запись (*.skangar.ru) и настройки vhost" },
      { en: "Found and assessed the risk of the old WordPress geo-network (a doorway pattern) — chose not to revive it in its old form", ru: "Нашли и оценили риски старой WordPress-гео-сети (doorway-паттерн) — не стали её реанимировать в старом виде" },
      { en: "Ran a full technical audit of the new site: confirmed honest content delivery to every user agent (no cloaking), checked redirects, canonicals, meta tags", ru: "Провели полный технический аудит нового сайта: подтвердили честную отдачу контента для всех User-Agent (без клоакинга), проверили редиректы, canonical, meta-теги" },
      { en: "Found a navigation desync and a soft 404 on /znaniya/dokumenty/", ru: "Нашли на живом сайте рассинхрон навигации и мягкий 404 на /znaniya/dokumenty/" },
    ],
  },
  {
    type: "images",
    items: [
      { src: `${IMG}/knowledge-base.webp`, alt: { en: "Knowledge base index", ru: "Индекс базы знаний" } },
      { src: `${IMG}/article.webp`, alt: { en: "Knowledge base category page", ru: "Страница категории базы знаний" } },
    ],
  },

  { type: "kicker", n: "06", en: "Content", ru: "Контент" },
  { type: "h2", en: "12 knowledge-base articles (and counting)", ru: "12 статей базы знаний (и продолжают выходить)" },
  {
    type: "p",
    en: "Each one shipped with meta data, a mini-FAQ, glossary terms extracted into the dictionary (~35–37 terms accumulated), and live internal linking between articles.",
    ru: "Каждая — с meta-данными, мини-FAQ, терминами в словарь (~35–37 терминов накопилось) и живой внутренней перелинковкой между статьями.",
  },
  {
    type: "list",
    items: [...articles, { en: "Turnkey hangar cost: calculation examples (in progress)", ru: "Стоимость ангара под ключ: примеры расчётов (в процессе)" }],
  },

  { type: "kicker", n: "07", en: "Result", ru: "Результат" },
  { type: "h2", en: "A site that finally answers real queries", ru: "Сайт, который наконец отвечает на реальные запросы" },
  {
    type: "stats",
    stats: [
      { value: "75", en: "live city pages", ru: "живых городских страниц" },
      { value: "13", en: "knowledge-base articles", ru: "статей базы знаний" },
      { value: "37", en: "glossary terms", ru: "терминов в словаре" },
      { value: "100%", en: "JSON-LD coverage", ru: "покрытие JSON-LD" },
    ],
  },
  {
    type: "p",
    en: "75 live city pages, 13 knowledge-base articles with working internal linking, the entire knowledge base marked up with structured data — a site that finally answers real queries instead of just presenting the company.",
    ru: "75 живых городских страниц, 13 статей базы знаний с работающей перелинковкой, вся база знаний размечена структурированными данными — сайт, который наконец отвечает на реальные запросы, а не только представляет компанию.",
  },
  {
    type: "quote",
    en: "A landing page is just the entry point. The real work begins when it turns out one page isn't enough, and you need to design a system that grows without architectural debt — even if you have to rebuild the process from scratch twice along the way.",
    ru: "Лендинг — это только точка входа. Настоящая работа начинается, когда выясняется, что одной страницы недостаточно, и нужно спроектировать систему, которая растёт без архитектурного долга — даже если по пути придётся дважды восстанавливать процесс с нуля.",
  },
  { type: "image", src: `${IMG}/contact.webp`, alt: { en: "Contact form", ru: "Форма контактов" } },
];
