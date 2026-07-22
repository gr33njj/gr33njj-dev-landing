"use client";

import { useLanguage } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import {
  Eyebrow,
  Kicker,
  ProofBar,
  CodeBlock,
  Quote,
  StatGrid,
  DisclosureBox,
  ArticleSection,
  P,
  H2,
  List,
  BrowserFrame,
  PhoneFrame,
  TelegramHeader,
  CaseCTA,
  primaryBtn,
  secondaryBtn,
  Sheen,
} from "@/components/case/shared";

const IMG = "/case/trad3";

const architecture = `Binance (ccxt, REST) ──► detection.py (свинги, BOS, ретест, скоринг)
                              │
                              ├─► SQLite (WAL): состояния машин, лог сигналов, MAE/MFE
                              ├─► mplfinance: PNG-график с разметкой
                              ├─► Telegram-бот (aiogram): алерт с кнопками 👍/👎/🗑
                              └─► веб-панель (FastAPI): та же история, с графиками`;

const candleType = `Candle(symbol, tf, ts, o, h, l, c, volume, source)`;

export default function Trad3Case() {
  const { t } = useLanguage();

  return (
    <div className="relative">
      {/* HERO */}
      <header className="relative overflow-hidden px-5 pb-16 pt-[120px] text-center sm:px-10 lg:px-16">
        <div
          className="pointer-events-none absolute -right-[10%] -top-[20%] h-[55vw] w-[55vw]"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,.14), transparent 62%)", filter: "blur(40px)" }}
        />
        <div className="relative mx-auto max-w-[820px]">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow>{t("case study · algorithmic trading system", "кейс · алгоритмическая торговая система")}</Eyebrow>
            </div>
            <h1 className="mb-[22px] text-[clamp(30px,4.4vw,50px)] font-bold leading-[1.12] tracking-tight">
              {t("TRAD3: turning a pretty reversal chart into code ", "TRAD3: превращаю красивую картинку разворота в код, ")}
              <span className="animate-shimmer text-gradient-ice">
                {t("that doesn't lie in hindsight", "который не врёт задним числом")}
              </span>
            </h1>
            <p className="mx-auto mb-[30px] max-w-[620px] text-[17px] leading-relaxed text-muted">
              {t(
                "Every trader loves drawing the same pattern on a historical chart: a strong impulse, a climax, a break of structure, a retest, a new trend. On the screenshot it looks obvious. The problem is it's all drawn after the reversal already happened — in real time the same pattern looks like noise from ten similar false breakouts, and only one of them is real.",
                "Есть паттерн, который любит рисовать каждый трейдер на исторических графиках: сильный импульс, кульминация, слом структуры, ретест, новый тренд. На скриншоте это выглядит очевидно — уровни ровно там, где нужно. Проблема в том, что всё это нарисовано после того, как разворот уже случился. В реальном времени такой же паттерн выглядит как шум из десяти похожих ложных пробоев, и только один из них — настоящий."
              )}
            </p>
            <div className="mb-[30px] flex flex-wrap justify-center gap-3.5">
              <a href="https://t.me/gr33njj" target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                <Sheen />
                <span className="relative">{t("Discuss a similar system", "Обсудить похожую систему")}</span>
              </a>
              <a
                href="https://trade.gr33njj.dev"
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryBtn}
              >
                {t("trade.gr33njj.dev ↗", "trade.gr33njj.dev ↗")}
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { c: "text-accent", label: t("27 instruments tracked", "27 отслеживаемых активов") },
                { c: "text-accent-purple", label: t("Weighted scoring, no repaint", "Взвешенный скоринг, без перерисовки") },
                { c: "text-accent-blue", label: t("FastAPI + Telegram + SQLite", "FastAPI + Telegram + SQLite") },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2.5 text-[13px] text-muted-dim">
                  <span className={`${p.c} text-base`}>◆</span>
                  {p.label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal className="relative mx-auto mt-14 max-w-[480px]">
          <BrowserFrame
            title="TRAD3"
            url="trade.gr33njj.dev/login"
            src={`${IMG}/login.webp`}
            alt={t("TRAD3 login screen, owner-only access", "Экран входа TRAD3, доступ только владельцу бота")}
          />
        </Reveal>
      </header>

      <ProofBar
        note={t(
          "Runs 24/7 against Binance's top crypto perpetuals plus gold and oil, and pushes every alert straight to Telegram. Panel access is Telegram Login-gated to the owner for now.",
          "Работает круглосуточно по топ криптоперпетуумам Binance плюс золото и нефть, каждый алерт улетает в Telegram. Доступ к панели пока по Telegram Login только у владельца."
        )}
        links={[{ href: "https://trade.gr33njj.dev", label: "trade.gr33njj.dev ↗", gated: true }]}
      />

      <ArticleSection>
        <Reveal>
          <Kicker n="01">{t("Idea", "Идея")}</Kicker>
          <H2>{t("Not phase 1 → phase 5, but a score", "Не «фаза 1 → фаза 5», а скоринг")}</H2>
          <P>
            {t(
              "The first naive version was a rigid chain of states: impulse fades → climax → break of level → retest → confirmation. Pretty on paper; in practice half of real reversals never complete that chain — sometimes there's no clear climax, sometimes there's no retest because the trend already reversed without one (a classic V-shaped reversal).",
              "Первая наивная версия — жёсткая цепочка состояний: импульс ослабевает → кульминация → слом уровня → ретест → подтверждение. На бумаге красиво, на практике половина настоящих разворотов эту цепочку не проходят: то кульминации явной нет, то ретеста не случилось, а тренд уже развернулся без него (классический V-разворот)."
            )}
          </P>
          <P>
            {t(
              "So TRAD3 is built on a mandatory core plus weighted scoring, not a rigid sequence:",
              "Поэтому в основе TRAD3 не жёсткая последовательность, а обязательное ядро + взвешенный скоринг:"
            )}
          </P>
          <List
            items={[
              t(
                "Mandatory: a confirmed break of structure (BOS) and confirmation after it — either a retest with a reversal candle, or an impulsive continuation without a retest.",
                "Обязательно: подтверждённый слом структуры (BOS) и подтверждение после него — либо ретест с разворотной свечой, либо импульсное продолжение без ретеста."
              ),
              t(
                "Optional, by points: impulse fading before the break (+2), climax on volume/volatility (+2), a break with expanding volume (+1), RSI/OBV divergence (+1), a clear rejection on the retest (+2).",
                "Дополнительно, по баллам: затухание импульсов до слома (+2), кульминация по объёму/волатильности (+2), слом с расширением объёма (+1), дивергенция RSI/OBV (+1), чёткий отказ на ретесте (+2)."
              ),
            ]}
          />
          <P>
            {t(
              "A signal only flies to Telegram once the score clears a threshold — and the message itself shows what that score is made of.",
              "Сигнал улетает в Telegram только при score выше порога — и в самом сообщении видно, из чего этот score собрался."
            )}
          </P>
          <Quote>
            {t(
              "Not “the system said enter,” but “here are five components, three fired — judge for yourself.”",
              "Не «система сказала войти», а «вот пять компонентов, три сработали, оцени сам»."
            )}
          </Quote>
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <Kicker n="02">{t("No repainting", "Без перерисовки")}</Kicker>
          <H2>{t("A pure function instead of a stateful machine", "Чистая функция вместо stateful-автомата")}</H2>
          <P>
            {t(
              "The key requirement across the whole system: swing points and levels must never move retroactively. A swing high only counts as confirmed once price has pulled back one and a half to two ATR from it — the system deliberately sees structure with a delay of a few bars. That's the price for a backtest that can't lie: what the system showed yesterday won't change today.",
              "Ключевое требование ко всей системе — свинг-точки и уровни не должны задним числом переезжать. Свинг-хай на графике считается подтверждённым только когда цена откатила от него на полтора-два ATR — то есть система специально видит структуру с задержкой в несколько баров. Это цена за то, что на бэктесте не будет красивой лжи: то, что система показала вчера, не поменяется сегодня."
            )}
          </P>
          <P>
            {t(
              "Technically this simplified the architecture more than expected: instead of a murky stateful automaton with persistent state, I ended up with a pure function that recomputes the entire phase picture from scratch on every tick, over a rolling window of ~400 closed bars. Since past swings are never repainted by definition, recomputing from zero gives the same result as an incremental update — without a whole class of bugs like “forgot to reset a counter after a restart.” The only thing that needs to persist between ticks is the fact that a given signal was already sent — a plain UNIQUE constraint in SQLite keyed on symbol, tf, ts_of_break, entry_type.",
              "Технически это упростило архитектуру сильнее, чем я ожидал: вместо мутного stateful-автомата с персистентным состоянием я в итоге написал чистую функцию, которая на каждом тике пересчитывает всю фазовую картину заново на скользящем окне из ~400 закрытых баров. Раз прошлые свинги не перерисовываются по определению, пересчёт с нуля даёт тот же результат, что и инкрементальное обновление, но без классов ошибок вида «забыл сбросить счётчик после рестарта». Всё, что нужно хранить между тиками — это факт, что конкретный сигнал уже был отправлен (обычный UNIQUE-констрейнт в SQLite по ключу symbol, tf, ts_слома, тип_входа)."
            )}
          </P>
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <Kicker n="03">{t("Architecture", "Архитектура")}</Kicker>
          <H2>{t("Two containers, one shared volume", "Два контейнера, один общий volume")}</H2>
          <CodeBlock label="detection pipeline">{architecture}</CodeBlock>
          <P>
            {t(
              "Two Docker containers — the engine and the web panel — share one SQLite volume. The panel deliberately isn't on Next.js: it's a read-only showcase over the same database, it doesn't need a second Node process, FastAPI + Jinja2 is enough. Sign-in is via the Telegram Login Widget, access is currently limited to my own account.",
              "Два Docker-контейнера — движок и веб-панель, — общий volume под SQLite. Панель нарочно не на Next.js: это read-only витрина поверх той же базы, ей не нужен второй Node-процесс, хватает FastAPI + Jinja2. Вход — через Telegram Login Widget, доступ пока только на мой аккаунт."
            )}
          </P>
          <P>
            {t(
              "I also factored out a source-agnostic ",
              "Отдельно заложил абстракцию "
            )}
            <code className="rounded bg-[rgba(140,180,240,.1)] px-1.5 py-0.5 font-mono text-[14px] text-accent">
              {candleType}
            </code>
            {t(
              " abstraction. Right now the only source is Binance, but once forex through MT5 happens (that physically needs a Windows terminal), the detection core won't care where a bar came from. The difference between “crypto now” and “forex later” is just the implementation of one Feed class, not a rewrite of the engine.",
              " — источник-агностичную. Сейчас единственный источник — Binance, но когда дойдут руки до форекса через MT5 (для этого физически нужен Windows-терминал), ядру детекции будет всё равно, откуда пришёл бар. Разница между «крипто сейчас» и «форекс потом» — это только реализация одного класса Feed, а не переписывание движка."
            )}
          </P>
        </Reveal>
      </ArticleSection>

      <section className="px-5 pb-24 pt-4 sm:px-10 lg:px-16">
        {/* Overlapping collage — desktop/tablet */}
        <Reveal className="mx-auto hidden max-w-[1040px] sm:block">
          <div className="relative" style={{ aspectRatio: "1300 / 760" }}>
            <div className="absolute left-[1.5%] top-[1.3%] z-[1] w-[49%] rotate-[-6deg] opacity-90">
              <BrowserFrame
                title="Health"
                url="trade.gr33njj.dev/health"
                src={`${IMG}/health.webp`}
                alt={t("Feed health status", "Здоровье фидов")}
                className="shadow-[0_20px_45px_-15px_rgba(0,0,0,.5)]"
              />
            </div>
            <div className="absolute left-[23%] top-[14.5%] z-[2] w-[58%] rotate-[3deg]">
              <BrowserFrame
                title={t("Signal #4", "Сигнал #4")}
                url="trade.gr33njj.dev/signals/4"
                src={`${IMG}/signal-detail.webp`}
                alt={t("Signal detail: chart, levels, score breakdown", "Разбор сигнала: график, уровни, разбивка score")}
                className="shadow-[0_25px_55px_-15px_rgba(0,0,0,.55)]"
              />
            </div>
            <div className="absolute left-[29%] top-[29%] z-[3] w-[66%] rotate-[-2deg]">
              <BrowserFrame
                title={t("Signals", "Сигналы")}
                url="trade.gr33njj.dev/signals"
                src={`${IMG}/signals-list.webp`}
                alt={t("Signal list and detection state machines", "Список сигналов и состояние машин детекции")}
                className="shadow-[0_35px_70px_-15px_rgba(0,0,0,.6)]"
              />
            </div>
          </div>
        </Reveal>

        {/* Stacked — mobile */}
        <Reveal className="mx-auto flex max-w-[600px] flex-col gap-5 sm:hidden">
          <BrowserFrame
            title={t("Signals", "Сигналы")}
            url="trade.gr33njj.dev/signals"
            src={`${IMG}/signals-list.webp`}
            alt={t("Signal list and detection state machines", "Список сигналов и состояние машин детекции")}
          />
          <BrowserFrame
            title={t("Signal #4", "Сигнал #4")}
            url="trade.gr33njj.dev/signals/4"
            src={`${IMG}/signal-detail.webp`}
            alt={t("Signal detail: chart, levels, score breakdown", "Разбор сигнала: график, уровни, разбивка score")}
          />
          <BrowserFrame
            title="Health"
            url="trade.gr33njj.dev/health"
            src={`${IMG}/health.webp`}
            alt={t("Feed health status", "Здоровье фидов")}
          />
        </Reveal>
      </section>

      <ArticleSection>
        <Reveal>
          <Kicker n="04">{t("Unexpected find", "Неожиданная находка")}</Kicker>
          <H2>{t("Binance doesn't only trade crypto", "Binance торгует не только криптой")}</H2>
          <P>
            {t(
              "On the first run, tickers like XAU/USDT, CL/USDT, and SKHYNIX/USDT snuck into the top-25 by volume — gold, oil, a South Korean stock. Turns out Binance USDM Futures has long sold not just crypto perpetuals but “TRADIFI” perpetuals on commodities and equities, and by volume they comfortably compete with altcoins. Had to filter by the underlyingType == \"COIN\" field in market metadata.",
              "При первом запуске в топ-25 по объёму затесались тикеры типа XAU/USDT, CL/USDT, SKHYNIX/USDT — золото, нефть, южнокорейские акции. Оказалось, Binance USDM Futures давно продаёт не только крипто-перпетуумы, но и «TRADIFI»-перпетуумы на сырьё и акции, и они по объёму спокойно конкурируют с альткоинами. Пришлось фильтровать по полю underlyingType == \"COIN\" в метаданных рынка."
            )}
          </P>
          <P>
            {t(
              "A fun side effect: since gold and oil are there as genuine exchange-traded crypto perpetuals, I simply added XAU/USDT and CL/USDT straight to the watchlist — no Windows VPS or MT5 needed, those are only required for real forex pairs like EURUSD.",
              "Забавный побочный эффект: раз золото и нефть там есть как честные крипто-биржевые перпетуумы, я просто добавил XAU/USDT и CL/USDT в список отслеживаемых активов напрямую — без Windows VPS и MT5, которые нужны только для настоящих форекс-пар вроде EURUSD."
            )}
          </P>
        </Reveal>
      </ArticleSection>

      <section className="scroll-mt-20 px-5 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1040px] grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:items-start">
          <Reveal className="order-2 lg:order-1">
            <p className="mb-4 text-center font-mono text-[11.5px] uppercase tracking-wide text-muted-faint lg:text-left">
              {t("Telegram alerts", "Telegram-алерты")}
            </p>
            <PhoneFrame className="lg:sticky lg:top-24">
              <TelegramHeader title="TRAD3 by gr33njj" subtitle="bot" />
              <div className="flex flex-col gap-3 bg-[#0e1621] p-3">
                <img
                  src={`${IMG}/alert-xau.webp`}
                  alt={t("XAU/USDT SHORT reversal signal, score 5/8", "Сигнал разворота XAU/USDT SHORT, score 5/8")}
                  className="block w-full rounded-xl shadow-[0_6px_20px_rgba(0,0,0,.35)]"
                />
                <img
                  src={`${IMG}/alert-esports.webp`}
                  alt={t("ESPORTS/USDT SHORT reversal signal, score 7/8", "Сигнал разворота ESPORTS/USDT SHORT, score 7/8")}
                  className="block w-full rounded-xl shadow-[0_6px_20px_rgba(0,0,0,.35)]"
                />
              </div>
            </PhoneFrame>
          </Reveal>

          <Reveal className="order-1 max-w-[760px] lg:order-2">
            <Kicker n="05">{t("Honest status", "Честный статус")}</Kicker>
            <H2>{t("What's actually proven, and what isn't", "Что уже честно работает, а что — нет")}</H2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DisclosureBox
                title={t("Battle-tested", "Проверено «в бою»")}
                tone="good"
                items={[
                  t(
                    "Backfill across 27 instruments (25 crypto + gold + oil) runs on real history without a single error.",
                    "Бэкфилл по 27 инструментам (25 крипто + золото + нефть) на реальной истории проходит без единой ошибки."
                  ),
                  t(
                    "The full path from signal to alert — entry/stop/target calculation, chart rendering, Telegram delivery with buttons, saving to the panel — was run end to end by hand.",
                    "Весь путь от сигнала до алерта — расчёт входа/стопа/целей, рендер графика, отправка в Telegram с кнопками, сохранение графика в панели — прогнан вручную end-to-end."
                  ),
                ]}
              />
              <DisclosureBox
                title={t("Not proven yet", "Пока не доказано")}
                tone="honest"
                items={[
                  t(
                    "Thresholds (breakout buffer in ATR, retest zone width, timeouts, scoring weights) are defaults from the initial architecture discussion, not the result of a backtest.",
                    "Пороги (буфер пробоя в ATR, ширина зоны ретеста, таймауты, веса компонентов скоринга) — это дефолты из первоначального обсуждения архитектуры, а не результат бэктеста."
                  ),
                  t(
                    "The system currently runs in pure paper mode: not a single real order, only alerts and my own thumbs-up/down labeling.",
                    "Система сейчас работает в чистом paper-режиме: без единого реального ордера, только алерты и моя собственная разметка кнопками."
                  ),
                ]}
              />
            </div>
            <P>
              {t(
                "The honest next step is to run this same detection offline over a year or two of history and see what percentage of BOS turns out false, instead of trusting numbers picked “by feel” during a brainstorm. I deliberately chose to see the live system in action first and calibrate later, based on accumulated statistics — that's a conscious trade-off, not an oversight.",
                "По-хорошему следующий шаг — прогнать эту же детекцию офлайн по истории за год-два и посмотреть, какой процент BOS оказывается ложным, а не доверять цифрам «на глаз» из брейншторма. Я сознательно выбрал сначала увидеть живую систему в деле, а калибровку сделать по факту накопленной статистики — это тоже осознанный компромисс, а не забывчивость."
              )}
            </P>
          </Reveal>
        </div>
      </section>

      <ArticleSection>
        <Reveal>
          <div className="mb-8">
            <StatGrid
              stats={[
                { value: "27", label: t("instruments tracked", "отслеживаемых активов") },
                { value: "2", label: t("Docker containers", "Docker-контейнера") },
                { value: "5", label: t("scoring components", "компонентов скоринга") },
                { value: "~400", label: t("bars in the rolling window", "баров в скользящем окне") },
              ]}
            />
          </div>
          <Kicker n="06">{t("What's next", "Дальше")}</Kicker>
          <H2>{t("Three directions", "Три направления")}</H2>
          <List
            items={[
              t("Offline calibration of thresholds against accumulated signal history.", "Офлайн-калибровка порогов по накопленной истории сигналов."),
              t(
                "Forex via MT5 — EURUSD/GBPUSD/USDJPY (gold and oil are already covered through Binance).",
                "Форекс через MT5 — EURUSD/GBPUSD/USDJPY (золото и нефть уже закрыты через Binance)."
              ),
              t(
                "Maybe access for a couple more people — Telegram Login already verifies identity, it just needs a wider allow-list.",
                "Может быть, доступ для ещё пары людей — благо Telegram Login и так уже проверяет личность, там просто нужно расширить список допущенных id."
              ),
            ]}
          />
          <Quote>
            {t(
              "For now — watching the alert feed and learning whether to trust my own score.",
              "Пока — смотрю на ленту алертов и учусь доверять или не доверять собственному score."
            )}
          </Quote>
        </Reveal>
      </ArticleSection>

      <CaseCTA
        kicker={t("next step", "следующий шаг")}
        title={t("Need a similar alerting or trading system?", "Нужна похожая торговая или алертинговая система?")}
        desc={t(
          "From market data to a Telegram alert with a chart — I'll design the pipeline for your instruments.",
          "От рыночных данных до алерта в Telegram с графиком — спроектирую пайплайн под ваши инструменты."
        )}
        primaryLabel={t("Message me on Telegram — @gr33njj", "Написать в Telegram — @gr33njj")}
        secondary={t("Other work", "Другие работы")}
      />
    </div>
  );
}
