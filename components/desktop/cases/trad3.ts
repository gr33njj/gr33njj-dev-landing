import type { Block } from "./blocks";

const IMG = "/case/trad3";

const architecture = `Binance (ccxt, REST) ──► detection.py (свинги, BOS, ретест, скоринг)
                              │
                              ├─► SQLite (WAL): состояния машин, лог сигналов, MAE/MFE
                              ├─► mplfinance: PNG-график с разметкой
                              ├─► Telegram-бот (aiogram): алерт с кнопками 👍/👎/🗑
                              └─► веб-панель (FastAPI): та же история, с графиками`;

export const TRAD3_BLOCKS: Block[] = [
  { type: "image", src: `${IMG}/login.webp`, alt: { en: "TRAD3 login screen, owner-only access", ru: "Экран входа TRAD3, доступ только владельцу бота" } },
  {
    type: "p",
    en: "Every trader loves drawing the same pattern on a historical chart: a strong impulse, a climax, a break of structure, a retest, a new trend. On the screenshot it looks obvious. The problem is it's all drawn after the reversal already happened — in real time the same pattern looks like noise from ten similar false breakouts, and only one of them is real.",
    ru: "Есть паттерн, который любит рисовать каждый трейдер на исторических графиках: сильный импульс, кульминация, слом структуры, ретест, новый тренд. На скриншоте это выглядит очевидно — уровни ровно там, где нужно. Проблема в том, что всё это нарисовано после того, как разворот уже случился. В реальном времени такой же паттерн выглядит как шум из десяти похожих ложных пробоев, и только один из них — настоящий.",
  },
  {
    type: "list",
    items: [
      { en: "27 instruments tracked", ru: "27 отслеживаемых активов" },
      { en: "Weighted scoring, no repaint", ru: "Взвешенный скоринг, без перерисовки" },
      { en: "FastAPI + Telegram + SQLite", ru: "FastAPI + Telegram + SQLite" },
    ],
  },
  {
    type: "p",
    en: "Runs 24/7 against Binance's top crypto perpetuals plus gold and oil, and pushes every alert straight to Telegram. Panel access is Telegram Login-gated to the owner for now.",
    ru: "Работает круглосуточно по топ криптоперпетуумам Binance плюс золото и нефть, каждый алерт улетает в Telegram. Доступ к панели пока по Telegram Login только у владельца.",
  },

  { type: "kicker", n: "01", en: "Idea", ru: "Идея" },
  { type: "h2", en: "Not phase 1 → phase 5, but a score", ru: "Не «фаза 1 → фаза 5», а скоринг" },
  {
    type: "p",
    en: "The first naive version was a rigid chain of states: impulse fades → climax → break of level → retest → confirmation. Pretty on paper; in practice half of real reversals never complete that chain — sometimes there's no clear climax, sometimes there's no retest because the trend already reversed without one (a classic V-shaped reversal).",
    ru: "Первая наивная версия — жёсткая цепочка состояний: импульс ослабевает → кульминация → слом уровня → ретест → подтверждение. На бумаге красиво, на практике половина настоящих разворотов эту цепочку не проходят: то кульминации явной нет, то ретеста не случилось, а тренд уже развернулся без него (классический V-разворот).",
  },
  {
    type: "p",
    en: "So TRAD3 is built on a mandatory core plus weighted scoring, not a rigid sequence:",
    ru: "Поэтому в основе TRAD3 не жёсткая последовательность, а обязательное ядро + взвешенный скоринг:",
  },
  {
    type: "list",
    items: [
      { en: "Mandatory: a confirmed break of structure (BOS) and confirmation after it — either a retest with a reversal candle, or an impulsive continuation without a retest.", ru: "Обязательно: подтверждённый слом структуры (BOS) и подтверждение после него — либо ретест с разворотной свечой, либо импульсное продолжение без ретеста." },
      { en: "Optional, by points: impulse fading before the break (+2), climax on volume/volatility (+2), a break with expanding volume (+1), RSI/OBV divergence (+1), a clear rejection on the retest (+2).", ru: "Дополнительно, по баллам: затухание импульсов до слома (+2), кульминация по объёму/волатильности (+2), слом с расширением объёма (+1), дивергенция RSI/OBV (+1), чёткий отказ на ретесте (+2)." },
    ],
  },
  {
    type: "p",
    en: "A signal only flies to Telegram once the score clears a threshold — and the message itself shows what that score is made of.",
    ru: "Сигнал улетает в Telegram только при score выше порога — и в самом сообщении видно, из чего этот score собрался.",
  },
  {
    type: "quote",
    en: "Not “the system said enter,” but “here are five components, three fired — judge for yourself.”",
    ru: "Не «система сказала войти», а «вот пять компонентов, три сработали, оцени сам».",
  },

  { type: "kicker", n: "02", en: "No repainting", ru: "Без перерисовки" },
  { type: "h2", en: "A pure function instead of a stateful machine", ru: "Чистая функция вместо stateful-автомата" },
  {
    type: "p",
    en: "The key requirement across the whole system: swing points and levels must never move retroactively. A swing high only counts as confirmed once price has pulled back one and a half to two ATR from it — the system deliberately sees structure with a delay of a few bars. That's the price for a backtest that can't lie: what the system showed yesterday won't change today.",
    ru: "Ключевое требование ко всей системе — свинг-точки и уровни не должны задним числом переезжать. Свинг-хай на графике считается подтверждённым только когда цена откатила от него на полтора-два ATR — то есть система специально видит структуру с задержкой в несколько баров. Это цена за то, что на бэктесте не будет красивой лжи: то, что система показала вчера, не поменяется сегодня.",
  },
  {
    type: "p",
    en: "Technically this simplified the architecture more than expected: instead of a murky stateful automaton with persistent state, I ended up with a pure function that recomputes the entire phase picture from scratch on every tick, over a rolling window of ~400 closed bars. Since past swings are never repainted by definition, recomputing from zero gives the same result as an incremental update — without a whole class of bugs like “forgot to reset a counter after a restart.” The only thing that needs to persist between ticks is the fact that a given signal was already sent — a plain UNIQUE constraint in SQLite keyed on symbol, tf, ts_of_break, entry_type.",
    ru: "Технически это упростило архитектуру сильнее, чем я ожидал: вместо мутного stateful-автомата с персистентным состоянием я в итоге написал чистую функцию, которая на каждом тике пересчитывает всю фазовую картину заново на скользящем окне из ~400 закрытых баров. Раз прошлые свинги не перерисовываются по определению, пересчёт с нуля даёт тот же результат, что и инкрементальное обновление, но без классов ошибок вида «забыл сбросить счётчик после рестарта». Всё, что нужно хранить между тиками — это факт, что конкретный сигнал уже был отправлен (обычный UNIQUE-констрейнт в SQLite по ключу symbol, tf, ts_слома, тип_входа).",
  },

  { type: "kicker", n: "03", en: "Architecture", ru: "Архитектура" },
  { type: "h2", en: "Two containers, one shared volume", ru: "Два контейнера, один общий volume" },
  { type: "code", label: "detection pipeline", code: architecture },
  {
    type: "p",
    en: "Two Docker containers — the engine and the web panel — share one SQLite volume. The panel deliberately isn't on Next.js: it's a read-only showcase over the same database, it doesn't need a second Node process, FastAPI + Jinja2 is enough. Sign-in is via the Telegram Login Widget, access is currently limited to my own account.",
    ru: "Два Docker-контейнера — движок и веб-панель, — общий volume под SQLite. Панель нарочно не на Next.js: это read-only витрина поверх той же базы, ей не нужен второй Node-процесс, хватает FastAPI + Jinja2. Вход — через Telegram Login Widget, доступ пока только на мой аккаунт.",
  },
  {
    type: "pnode",
    en: "I also factored out a source-agnostic Candle(symbol, tf, ts, o, h, l, c, volume, source) abstraction. Right now the only source is Binance, but once forex through MT5 happens (that physically needs a Windows terminal), the detection core won't care where a bar came from. The difference between “crypto now” and “forex later” is just the implementation of one Feed class, not a rewrite of the engine.",
    ru: "Отдельно заложил абстракцию Candle(symbol, tf, ts, o, h, l, c, volume, source) — источник-агностичную. Сейчас единственный источник — Binance, но когда дойдут руки до форекса через MT5 (для этого физически нужен Windows-терминал), ядру детекции будет всё равно, откуда пришёл бар. Разница между «крипто сейчас» и «форекс потом» — это только реализация одного класса Feed, а не переписывание движка.",
  },
  {
    type: "images",
    items: [
      { src: `${IMG}/signals-list.webp`, alt: { en: "Signal list and detection state machines", ru: "Список сигналов и состояние машин детекции" } },
      { src: `${IMG}/signal-detail.webp`, alt: { en: "Signal detail: chart, levels, score breakdown", ru: "Разбор сигнала: график, уровни, разбивка score" } },
    ],
  },
  { type: "image", src: `${IMG}/health.webp`, alt: { en: "Feed health status", ru: "Здоровье фидов" } },

  { type: "kicker", n: "04", en: "Unexpected find", ru: "Неожиданная находка" },
  { type: "h2", en: "Binance doesn't only trade crypto", ru: "Binance торгует не только криптой" },
  {
    type: "p",
    en: "On the first run, tickers like XAU/USDT, CL/USDT, and SKHYNIX/USDT snuck into the top-25 by volume — gold, oil, a South Korean stock. Turns out Binance USDM Futures has long sold not just crypto perpetuals but “TRADIFI” perpetuals on commodities and equities, and by volume they comfortably compete with altcoins. Had to filter by the underlyingType == \"COIN\" field in market metadata.",
    ru: "При первом запуске в топ-25 по объёму затесались тикеры типа XAU/USDT, CL/USDT, SKHYNIX/USDT — золото, нефть, южнокорейские акции. Оказалось, Binance USDM Futures давно продаёт не только крипто-перпетуумы, но и «TRADIFI»-перпетуумы на сырьё и акции, и они по объёму спокойно конкурируют с альткоинами. Пришлось фильтровать по полю underlyingType == \"COIN\" в метаданных рынка.",
  },
  {
    type: "p",
    en: "A fun side effect: since gold and oil are there as genuine exchange-traded crypto perpetuals, I simply added XAU/USDT and CL/USDT straight to the watchlist — no Windows VPS or MT5 needed, those are only required for real forex pairs like EURUSD.",
    ru: "Забавный побочный эффект: раз золото и нефть там есть как честные крипто-биржевые перпетуумы, я просто добавил XAU/USDT и CL/USDT в список отслеживаемых активов напрямую — без Windows VPS и MT5, которые нужны только для настоящих форекс-пар вроде EURUSD.",
  },

  { type: "kicker", n: "05", en: "Honest status", ru: "Честный статус" },
  { type: "h2", en: "What's actually proven, and what isn't", ru: "Что уже честно работает, а что — нет" },
  {
    type: "images",
    items: [
      { src: `${IMG}/alert-xau.webp`, alt: { en: "XAU/USDT SHORT reversal signal, score 5/8", ru: "Сигнал разворота XAU/USDT SHORT, score 5/8" } },
      { src: `${IMG}/alert-esports.webp`, alt: { en: "ESPORTS/USDT SHORT reversal signal, score 7/8", ru: "Сигнал разворота ESPORTS/USDT SHORT, score 7/8" } },
    ],
  },
  {
    type: "disclosure",
    good: {
      title: { en: "Battle-tested", ru: "Проверено «в бою»" },
      items: [
        { en: "Backfill across 27 instruments (25 crypto + gold + oil) runs on real history without a single error.", ru: "Бэкфилл по 27 инструментам (25 крипто + золото + нефть) на реальной истории проходит без единой ошибки." },
        { en: "The full path from signal to alert — entry/stop/target calculation, chart rendering, Telegram delivery with buttons, saving to the panel — was run end to end by hand.", ru: "Весь путь от сигнала до алерта — расчёт входа/стопа/целей, рендер графика, отправка в Telegram с кнопками, сохранение графика в панели — прогнан вручную end-to-end." },
      ],
    },
    honest: {
      title: { en: "Not proven yet", ru: "Пока не доказано" },
      items: [
        { en: "Thresholds (breakout buffer in ATR, retest zone width, timeouts, scoring weights) are defaults from the initial architecture discussion, not the result of a backtest.", ru: "Пороги (буфер пробоя в ATR, ширина зоны ретеста, таймауты, веса компонентов скоринга) — это дефолты из первоначального обсуждения архитектуры, а не результат бэктеста." },
        { en: "The system currently runs in pure paper mode: not a single real order, only alerts and my own thumbs-up/down labeling.", ru: "Система сейчас работает в чистом paper-режиме: без единого реального ордера, только алерты и моя собственная разметка кнопками." },
      ],
    },
  },
  {
    type: "p",
    en: "The honest next step is to run this same detection offline over a year or two of history and see what percentage of BOS turns out false, instead of trusting numbers picked “by feel” during a brainstorm. I deliberately chose to see the live system in action first and calibrate later, based on accumulated statistics — that's a conscious trade-off, not an oversight.",
    ru: "По-хорошему следующий шаг — прогнать эту же детекцию офлайн по истории за год-два и посмотреть, какой процент BOS оказывается ложным, а не доверять цифрам «на глаз» из брейншторма. Я сознательно выбрал сначала увидеть живую систему в деле, а калибровку сделать по факту накопленной статистики — это тоже осознанный компромисс, а не забывчивость.",
  },

  {
    type: "stats",
    stats: [
      { value: "27", en: "instruments tracked", ru: "отслеживаемых активов" },
      { value: "2", en: "Docker containers", ru: "Docker-контейнера" },
      { value: "5", en: "scoring components", ru: "компонентов скоринга" },
      { value: "~400", en: "bars in the rolling window", ru: "баров в скользящем окне" },
    ],
  },
  { type: "kicker", n: "06", en: "What's next", ru: "Дальше" },
  { type: "h2", en: "Three directions", ru: "Три направления" },
  {
    type: "list",
    items: [
      { en: "Offline calibration of thresholds against accumulated signal history.", ru: "Офлайн-калибровка порогов по накопленной истории сигналов." },
      { en: "Forex via MT5 — EURUSD/GBPUSD/USDJPY (gold and oil are already covered through Binance).", ru: "Форекс через MT5 — EURUSD/GBPUSD/USDJPY (золото и нефть уже закрыты через Binance)." },
      { en: "Maybe access for a couple more people — Telegram Login already verifies identity, it just needs a wider allow-list.", ru: "Может быть, доступ для ещё пары людей — благо Telegram Login и так уже проверяет личность, там просто нужно расширить список допущенных id." },
    ],
  },
  {
    type: "quote",
    en: "For now — watching the alert feed and learning whether to trust my own score.",
    ru: "Пока — смотрю на ленту алертов и учусь доверять или не доверять собственному score.",
  },
];
