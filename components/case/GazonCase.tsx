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
  Steps,
  BrowserFrame,
  ArticleSection,
  P,
  H2,
  List,
  CaseCTA,
  primaryBtn,
  secondaryBtn,
  Sheen,
} from "@/components/case/shared";

const IMG = "/case/gazon";

const pipeline = [
  {
    color: "text-accent",
    ring: "border-[rgba(103,232,249,.3)] bg-[rgba(103,232,249,.12)]",
    title: { en: "VPS agent", ru: "VPS-агент" },
    desc: {
      en: "Claude Code with no Unity Editor. Edits SceneBuilder.cs, commits.",
      ru: "Claude Code без Unity Editor. Правит SceneBuilder.cs, коммитит.",
    },
  },
  {
    color: "text-accent-purple",
    ring: "border-[rgba(168,85,247,.3)] bg-[rgba(168,85,247,.12)]",
    title: { en: "Self-hosted runner", ru: "Self-hosted runner" },
    desc: {
      en: "Developer's Windows PC, behind AmneziaVPN. Start-Process -Wait -PassThru.",
      ru: "Windows PC разработчика, за AmneziaVPN. Start-Process -Wait -PassThru.",
    },
  },
  {
    color: "text-accent",
    ring: "border-[rgba(103,232,249,.3)] bg-[rgba(103,232,249,.12)]",
    title: { en: "Unity 6 batchmode", ru: "Unity 6 batchmode" },
    desc: {
      en: "RegenerateScene() — the scene is assembled from code on every build.",
      ru: "RegenerateScene() — сцена собирается кодом на каждом билде.",
    },
  },
  {
    color: "text-accent-purple",
    ring: "border-[rgba(168,85,247,.3)] bg-[rgba(168,85,247,.12)]",
    title: { en: "curl.exe PUT", ru: "curl.exe PUT" },
    desc: {
      en: "HTTPS to nginx on the VPS → ai.gr33njj.dev is updated.",
      ru: "HTTPS до nginx на VPS → ai.gr33njj.dev обновлён.",
    },
  },
];

const storeThumbs = ["store-2", "store-3", "store-4", "store-5", "store-6"];

const uploadSnippet = `Compress-Archive -Path "Build/WebGL/*" -DestinationPath webgl-upload.zip -Force
curl.exe -X PUT -H "Authorization: Bearer $env:UPLOAD_TOKEN" \`
  --data-binary "@webgl-upload.zip" https://ai.gr33njj.dev/upload -f`;

const chmodSnippet = `execFileSync('chmod', ['-R', 'u+rwX', TARGET_DIR]);
execFileSync('find', [TARGET_DIR, '-mindepth', '1', '-delete']);`;

const startProcessSnippet = `$proc = Start-Process -FilePath $env:UNITY_PATH -ArgumentList @(
  "-batchmode", "-nographics", "-quit",
  "-projectPath", "$PWD",
  "-executeMethod", "Gazon.EditorTools.BuildScript.BuildWebGLCI",
  "-logFile", "unity_build.log"
) -Wait -PassThru -NoNewWindow`;

const sceneBuilderSnippet = `private static void RegenerateScene()
{
    var scenePath = EditorBuildSettings.scenes.FirstOrDefault(s => s.enabled)?.path;
    var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);
    SceneBuilder.BuildScene();
    EditorSceneManager.SaveScene(scene, scenePath);
}`;

const fitToSizeSnippet = `private static void FitToSizeStretch(GameObject instance, Vector3 targetSize)
{
    var size = MeasureBoundsSize(instance, out _);
    instance.transform.localScale = new Vector3(
        targetSize.x / size.x, targetSize.y / size.y, targetSize.z / size.z);
}`;

const logLine = `[FitToSizeStretch] WarehouseShelving: измерено=(0.87, 2.44, 2.13), цель=(6.00, 1.70, 0.70)`;

const fixedOrderSnippet = `// сначала — растяжение в родных осях модели
FitToSizeStretch(visual, new Vector3(ShelfDepth, ShelfLength, topY));
// потом — поворот уже правильно проставленной геометрии
visual.transform.localRotation = ShelfModelRotation;`;

export default function GazonCase() {
  const { t } = useLanguage();

  return (
    <div className="relative">
      {/* HERO */}
      <header className="relative overflow-hidden px-5 pb-16 pt-[120px] text-center sm:px-10 lg:px-16">
        <div
          className="pointer-events-none absolute -right-[10%] -top-[20%] h-[55vw] w-[55vw]"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,.14), transparent 62%)", filter: "blur(40px)" }}
        />
        <div className="relative mx-auto max-w-[820px]">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow>{t("case study · AI agent infrastructure", "кейс · инфраструктура AI-агентов")}</Eyebrow>
            </div>
            <h1 className="mb-[22px] text-[clamp(28px,4vw,46px)] font-bold leading-[1.16] tracking-tight">
              {t("How I built a Unity game through three blind agents ", "Как я собирал Unity-игру через трёх слепых агентов, ")}
              <span className="animate-shimmer text-gradient-ice">
                {t("who negotiated through git", "которые договаривались через git")}
              </span>
            </h1>
            <p className="mx-auto mb-[30px] max-w-[620px] text-[17px] leading-relaxed text-muted">
              {t(
                "Notes on the infrastructure of GAZON — a pickup-point simulator that, for the purposes of this piece, isn't about game design at all. It's about the pipeline that took the project from an HTML/Three.js prototype to a self-building Unity 6 WebGL build, with almost no direct touch of the real Unity Editor on my side.",
                "Заметки об инфраструктуре проекта GAZON — ПВЗ-симулятора, который вообще-то ни разу не про геймдизайн. Это пост про то, как устроен конвейер, который довёл проект от HTML/Three.js прототипа до собирающейся в Unity 6 WebGL-сборки — почти без единого касания реального Unity Editor с моей стороны."
              )}
            </p>
            <div className="mb-[30px] flex flex-wrap justify-center gap-3.5">
              <a href="https://t.me/gr33njj" target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                <Sheen />
                <span className="relative">{t("Discuss AI-driven pipelines", "Обсудить AI-пайплайны")}</span>
              </a>
              <a href="https://ai.gr33njj.dev" target="_blank" rel="noopener noreferrer" className={secondaryBtn}>
                {t("Open the live WebGL preview ↗", "Открыть живое превью ↗")}
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { c: "text-accent", label: t("Self-hosted GitHub Actions runner", "Self-hosted раннер GitHub Actions") },
                { c: "text-accent-purple", label: t("Unity 6 WebGL, code-generated scene", "Unity 6 WebGL, сцена из кода") },
                { c: "text-accent-blue", label: t("3 agent sessions, 0 shared memory", "3 агентские сессии, 0 общей памяти") },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2.5 text-[13px] text-muted-dim">
                  <span className={`${p.c} text-base`}>◆</span>
                  {p.label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal className="relative mx-auto mt-14 max-w-[1000px]">
          <div className="relative overflow-hidden rounded-2xl border border-line shadow-[0_40px_100px_-30px_rgba(0,0,0,.8)]">
            <img
              src={`${IMG}/feature.webp`}
              alt="GAZON — симулятор работы в ПВЗ"
              className="block w-full"
            />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              {["Unity 6 · WebGL", "Self-hosted CI", t("3 AI agents", "3 AI-агента")].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.12] bg-[rgba(9,11,17,.85)] px-3 py-1.5 font-mono text-[12px] text-foreground backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </header>

      <ProofBar
        note={t(
          "The core constraint everything is built around: the VPS running the main AI agent has never had a Unity Editor and never will — the only channel from “code changed” to “how it looks” is whatever can be pulled from a CI log as text.",
          "Ключевое ограничение, вокруг которого выстроено всё: у машины с основным ИИ-агентом (VPS) никогда не было и не будет Unity Editor — единственный канал связи между «код изменился» и «как это выглядит» — то, что можно вытащить из CI-лога текстом."
        )}
        links={[{ href: "https://ai.gr33njj.dev", label: "ai.gr33njj.dev ↗" }]}
      />

      <section className="px-5 py-16 sm:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-[900px]">
          <BrowserFrame
            title="GAZON"
            url="ai.gr33njj.dev"
            src={`${IMG}/webgl-preview.webp`}
            alt={t("Live WebGL build — box intake", "Живая WebGL-сборка — приёмка коробок")}
          />
          <p className="mt-4 text-center font-mono text-[13px] text-muted-faint">
            {t(
              "updates on every build · not a single Unity Editor open on the VPS",
              "обновляется на каждый билд · без единого открытия Unity Editor на VPS"
            )}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-[1040px]">
          <div className="flex flex-col gap-8 rounded-2xl border border-line bg-[#0b0e18] p-6 sm:flex-row sm:items-stretch sm:gap-0 sm:p-10">
            {pipeline.flatMap((step, i) => [
              <div key={step.title.en} className="flex flex-1 flex-col gap-3.5">
                <div className={`flex h-11 w-11 items-center justify-center rounded-[10px] border text-[18px] ${step.color} ${step.ring}`}>
                  ◆
                </div>
                <div className="text-[16px] font-bold">{t(step.title.en, step.title.ru)}</div>
                <div className="text-[13.5px] leading-relaxed text-muted-dim">{t(step.desc.en, step.desc.ru)}</div>
              </div>,
              i < pipeline.length - 1 ? (
                <div
                  key={`arrow-${step.title.en}`}
                  className="hidden w-10 flex-none items-center justify-center font-mono text-[20px] text-accent-blue sm:flex"
                >
                  →
                </div>
              ) : null,
            ])}
          </div>
        </Reveal>
      </section>

      <ArticleSection>
        <Reveal>
          <Kicker n="01">{t("Web panel", "Веб-панель")}</Kicker>
          <H2>{t("Why not just scp", "Почему не просто scp")}</H2>
          <P>
            {t(
              "ai.gr33njj.dev is a live WebGL preview that updates on every build. Sounds like a standard “upload files after the build” task. It wasn't.",
              "ai.gr33njj.dev — живое WebGL-превью, обновляющееся при каждой сборке. Звучит как стандартная задача «залить файлы на сервер после билда». Оказалось нет."
            )}
          </P>
          <P>
            {t(
              "The GitHub Actions runner lives on the developer's home PC — a Windows machine behind AmneziaVPN (a full-tunnel is required just to reach the Anthropic API from the region — without it Claude Code itself wouldn't work on that machine). AmneziaVPN, as it turned out empirically, blocks outbound port 22 completely — scp and ssh to the VPS simply hang or get Permission denied, while HTTPS (443) through the same tunnel goes through without a hitch.",
              "Раннер GitHub Actions крутится на домашнем ПК разработчика — Windows-машина за AmneziaVPN (нужен full-tunnel, чтобы вообще достучаться до Anthropic API из региона — без него не работал бы сам Claude Code на этой машине). А AmneziaVPN, как выяснилось опытным путём, глушит исходящий порт 22 намертво — scp и ssh до VPS просто виснут или получают Permission denied, при этом HTTPS (443) через тот же туннель проходит без единой заминки."
            )}
          </P>
          <P>
            {t(
              "The fix wasn't to find a workaround for SSH, but to drop it: a small Node service on the VPS (/opt/gazon-upload/server.js, a systemd unit listening only on 127.0.0.1:8899), with nginx proxying /upload out with a bearer token. The workflow zips the build and hits it with curl.exe -X PUT — plain HTTPS, the same port that's already open.",
              "Решение — не искать обходной путь для SSH, а выкинуть его: маленький Node-сервис на VPS (/opt/gazon-upload/server.js, systemd-юнит, слушает только 127.0.0.1:8899), nginx проксирует /upload наружу с bearer-токеном. Workflow пакует билд в zip и стучится curl.exe -X PUT — обычный HTTPS, тот самый порт, что и так открыт."
            )}
          </P>
          <CodeBlock label="deploy step (GitHub Actions, Windows runner)">{uploadSnippet}</CodeBlock>
          <P>
            {t(
              "One more detail that surfaced later, while working on the visuals: the service wipes the target folder with find -delete before unpacking. One corrupted archive (unzip restoring a Windows-built zip sometimes drops directories without the execute bit) and the cleanup step starts failing with Permission denied on every subsequent deploy — because it can't even clean up the mess from its own previous crash. A self-blocking state. The fix is a chmod -R u+rwX right before find -delete, so the cleanup step doesn't depend on what the previous run left behind:",
              "Отдельная деталь, которая всплыла уже в процессе работы над визуалом: сервис перед распаковкой чистит целевую папку через find -delete. Один битый архив (unzip, восстанавливающий Windows-собранный zip, иногда роняет директории без execute-бита) — и очистка начинает валиться с Permission denied на каждом следующем деплое, потому что сама не может убрать за собой мусор от предыдущего падения. Само себя блокирующее состояние. Починка — chmod -R u+rwX прямо перед find -delete, чтобы шаг очистки не зависел от того, что натворил предыдущий прогон:"
            )}
          </P>
          <CodeBlock label="server.js">{chmodSnippet}</CodeBlock>
          <Quote>
            {t(
              "A small detail, but a telling one: infrastructure for “just upload files” grows its own fault tolerance the moment it's automatic and nobody watches it every day.",
              "Мелочь, но характерная: инфраструктура для «просто залить файлы» обрастает своей собственной отказоустойчивостью, как только она автоматическая и никто не смотрит на неё каждый день."
            )}
          </Quote>
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <Kicker n="02">{t("CI runner", "CI-раннер")}</Kicker>
          <H2>{t("Hunting an “orphaned” process", "Охота на «осиротевший» процесс")}</H2>
          <P>
            {t(
              "The runner isn't GitHub-hosted, it's self-registered on the home PC (Unity licensing and build time practically force that choice). And that's where the most interesting infrastructure bug of the whole project turned up.",
              "Раннер — не GitHub-hosted, а самостоятельно зарегистрированный на домашнем ПК (Unity лицензии и время сборки такое решение почти навязывают). Именно здесь нашлась самая интересная из инфраструктурных ошибок за весь проект."
            )}
          </P>
          <P>
            {t(
              "The actual bug: a PowerShell call like & \"Unity.exe\" -batchmode ... returns control as soon as the STDOUT/STDERR stream closes — which happens a couple of seconds in, while Unity is still working hard through child processes (bee_backend.exe, netcorerun.exe). The runner decides the step finished and kills the whole process tree as “orphaned” — mid-build. From the outside this looked like random, unexplainable failures at different stages on different runs — exactly the kind of thing that usually gets written off as “flaky CI” and worked around with retries.",
              "Собственно баг: PowerShell-вызов вида & \"Unity.exe\" -batchmode ... возвращает управление, как только закрывается поток STDOUT/STDERR — это происходит через пару секунд, пока Unity ещё вовсю работает через дочерние процессы (bee_backend.exe, netcorerun.exe). Раннер решает, что шаг завершился, и убивает всё дерево процессов как «осиротевшее» — посреди реальной сборки. Со стороны это выглядело как случайные, необъяснимые падения на разных этапах в разных прогонах — то есть ровно то, что обычно списывают на «флакующий CI» и обходят ретраями."
            )}
          </P>
          <P>
            {t(
              "This was diagnosed not by guessing but from the runner's own diagnostic log (_diag/Worker_*.log, grepping for ProcessInvokerWrapper / stream read finished / Kill process). The fix is to not invoke the process via &, but via Start-Process -Wait -PassThru, which blocks on the real process handle instead of the stream closing:",
              "Диагностировалось это не догадкой, а собственным диагностическим логом раннера (_diag/Worker_*.log, грепом по ProcessInvokerWrapper / stream read finished / Kill process). Фикс — не вызывать процесс через &, а через Start-Process -Wait -PassThru, который блокируется на реальном handle процесса, а не на закрытии потока:"
            )}
          </P>
          <CodeBlock label="build.ps1">{startProcessSnippet}</CodeBlock>
          <P>
            {t(
              "Alongside it, a handful of smaller but equally instructive findings: Unity Personal licensing doesn't tolerate an interactive Editor open at the same time as a parallel batch-mode run (they fight for the same license slot); the WebGL module in Unity Hub is called “Web Build Support,” not “WebGL Build Support” (a trap on flat ground); unzip returns exit code 1 on success-with-warnings, not only on real failure — you need to fail on >=2, not on “code isn't zero.”",
              "Рядом — набор более мелких, но по-своему поучительных находок: Unity Personal лицензия не терпит одновременно открытый интерактивный Editor и параллельный batch-mode запуск (конфликтуют за один и тот же слот лицензии); модуль для WebGL в Unity Hub называется «Web Build Support», а не «WebGL Build Support» (ловушка на ровном месте); unzip возвращает код 1 при успехе-с-предупреждениями, а не только при провале — падать нужно от >=2, а не от «код не ноль»."
            )}
          </P>
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <Kicker n="03">{t("SceneBuilder.cs", "SceneBuilder.cs")}</Kicker>
          <H2>{t("The scene as a compiled artifact, not a file", "Сцена как скомпилированный артефакт, а не файл")}</H2>
          <P>
            {t(
              "Architecturally more important than any single bug is how the scene itself is structured. BuildScript.BuildWebGLCI() calls RegenerateScene() before every build: it creates an empty scene and builds absolutely everything in it — walls, shelving, the counter, spawners, managers — through code, via SceneBuilder.BuildScene().",
              "Архитектурно важнее любого отдельного бага — то, как устроена сама сцена. BuildScript.BuildWebGLCI() перед каждой сборкой вызывает RegenerateScene(): создаёт пустую сцену и строит в ней вообще всё — стены, стеллажи, стойку, спавнеры, менеджеры — кодом, через SceneBuilder.BuildScene()."
            )}
          </P>
          <CodeBlock label="BuildScript.cs">{sceneBuilderSnippet}</CodeBlock>
          <P>
            {t(
              "Practical effect: the .unity file stops being the source of truth. Any manual edit in the Scene view that isn't carried over into SceneBuilder.cs will be silently wiped by the next CI run. Annoying if you forget about it mid-session in the Editor. But this is exactly what makes the whole idea of an agent without Editor access possible: since the scene is a deterministic output of code, a scene edit can be made by simply editing a C# file and never opening Unity at all. Shelving, the counter, lighting, post-processing, characters — everything that appeared on the scene over the last few weeks appeared this way.",
              "Практический эффект: .unity-файл перестаёт быть источником истины. Любая ручная правка в Scene view, не перенесённая в код SceneBuilder.cs, будет молча стёрта следующим CI-прогоном. Раздражает, если забыть об этом посреди работы в Editor. Но именно это делает возможной саму идею агента без доступа к Editor: раз сцена — это детерминированный вывод кода, значит правку сцены можно сделать, просто отредактировав C#-файл и ни разу не открыв Unity. Полки, стойка, освещение, пост-обработка, персонажи — всё, что в итоге появилось на сцене за последние недели, появилось так."
            )}
          </P>
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <Kicker n="04">{t("Issue → agent → commit", "Issue → агент → коммит")}</Kicker>
          <H2>{t("A second workflow", "Второй workflow")}</H2>
          <P>
            {t(
              "Besides the build, the repo has agent-task.yml — a dispatcher that takes a GitHub issue, runs headless Claude Code on the runner (claude --dangerously-skip-permissions, without which the agent waits for an interactive confirmation nobody will give) over the issue text, and commits and comments on the result.",
              "Кроме сборки, в репозитории живёт agent-task.yml — диспетчер, который берёт GitHub issue, запускает на раннере headless Claude Code (claude --dangerously-skip-permissions, без него агент ждёт интерактивного подтверждения, которого никто не даст) поверх текста issue, и по итогу коммитит и комментирует."
            )}
          </P>
          <P>
            {t(
              "Debugging this path surfaced two more local but instructive bugs: PowerShell 5.1 without a BOM reads UTF-8 in the system code page — a single Cyrillic string in a generated .ps1 script (comments and YAML fields untouched) broke parsing with “missing terminator”; GITHUB_TOKEN defaults to read-only on private repos — the agent's git push got a 403 until permissions: contents: write was explicitly set on the job.",
              "Отладка этого пути дала ещё пару локальных, но обучающих багов: PowerShell 5.1 без BOM читает UTF-8 в системной кодовой странице — единственная кириллическая строка в generated .ps1-скрипте (комментарии и YAML-поля не задеты) ломала парсинг с «missing terminator»; GITHUB_TOKEN по умолчанию read-only на приватных репозиториях — git push от агента получал 403, пока явно не прописали permissions: contents: write на джобу."
            )}
          </P>
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <Kicker n="05">{t("Protocol", "Протокол")}</Kicker>
          <H2>{t("Issues as a queue for the agent, not just a checklist", "Issues как очередь задач для агента, а не только чек-лист")}</H2>
          <P>
            {t(
              "It started as a plain tracker: after the first working vertical slice, 15 issues went in for everything deferred (mini-games, penalties, the courier, night inventory, the VILBERIS rebrand). Useful, but ordinary.",
              "Начиналось всё как обычный трекер: после первого рабочего вертикального среза завели 15 issues на всё отложенное (мини-игры, штрафы, курьер, ночная инвентаризация, ребрендинг). Полезно, но банально."
            )}
          </P>
          <P>
            {t(
              "What it turned into later is more interesting. When the next big commit closed thirteen of them in one sweep (a full MVP port), they didn't close silently — each issue got a comment with the exact commit hash that resolved it:",
              "Интереснее то, во что это превратилось позже. Когда следующий большой коммит закрыл сразу тринадцать из них одним махом (полный порт MVP), закрывались они не молча — каждому issue ушёл комментарий с конкретным хэшем коммита, который его решил:"
            )}
          </P>
          <Quote>
            {t(
              "Resolved in the full MVP port (commit 1bfc8f7, “Full MVP port: 1:1 room, customer archetypes, phone/shop…”). Verified by CI compilation, balance is left to a live check in the Editor.",
              "Реализовано в полном порте MVP (коммит 1bfc8f7, «Полный порт MVP: комната 1:1, архетипы клиентов, телефон/магазин…»). Проверено компиляцией через CI, баланс — на усмотрение живой проверки в Editor."
            )}
          </Quote>
          <P>
            {t(
              "And issue #20 is no longer a “to-do item” — it's a self-contained brief, written by a human specifically for an agent that has neither memory of previous sessions nor Editor access: with context, with an explicit list of what to check, with a direct instruction that edits must go into code, not the live scene. In effect, the issue became a format for handing off a task between different agent sessions — an inter-agent API on top of an ordinary GitHub tracker.",
              "А issue #20 — уже не «список задач», а самодостаточный бриф, написанный человеком специально для агента, у которого нет ни памяти о предыдущих сессиях, ни доступа к Editor: с контекстом, с явным перечислением, что именно проверить, с прямым указанием, что правки нужно вносить в код, а не в живую сцену. По сути, issue стал форматом передачи задачи между разными агентскими сессиями — межагентным API поверх обычного GitHub-трекера."
            )}
          </P>
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <Kicker n="06">{t("MCP for Unity", "MCP для Unity")}</Kicker>
          <H2>{t("Promise vs. reality", "Обещание и реальность")}</H2>
          <P>
            {t(
              "Back in July, MCP for Unity was set up in the project specifically so the local Claude Code session on the developer's PC would have live access to the Unity console and scene. A reasonable bet: since the VPS session is architecturally blind, at least one session should be able to see what's happening.",
              "Ещё в июле в проект был поставлен MCP for Unity — специально чтобы у локальной Claude Code сессии на ПК разработчика было живое чтение консоли и сцены Unity. Разумная ставка: раз VPS-сессия слепа архитектурно, пусть хотя бы одна из сессий видит происходящее."
            )}
          </P>
          <P>
            {t(
              "In practice, when this was actually needed — figuring out why the shelf labels weren't visible and why the camera felt “too high” — the local session reported that the Unity MCP tools were unavailable in that particular run. Which means: three agent surfaces worked on the project at the same time — this VPS session, a local session on the PC (nominally MCP-connected), and the headless agent from agent-task.yml — and none of them had live render access in the moment. The only one who genuinely had it was the developer, at their own open Editor. Proof of that: the one edit in this whole story that literally no agent could have made — Window → TextMeshPro → Import TMP Essential Resources — was done by a human, by hand, in ten seconds.",
              "На практике, когда это реально понадобилось — разобраться, почему не видны таблички на стеллажах и почему камера ощущается «слишком высокой», — локальная сессия отчиталась, что инструменты Unity-MCP в этом конкретном запуске недоступны. Что означает: на проекте одновременно работали три агентские поверхности — эта VPS-сессия, локальная сессия на ПК (номинально MCP-подключённая), и headless-агент из agent-task.yml — и ни у одной из них в моменте не было живого доступа к рендеру. Единственный, у кого он реально был, — сам разработчик, за своим собственным Editor. Доказательством стало то, что единственная правка, которую в этой истории физически не мог сделать ни один агент — Window → TextMeshPro → Import TMP Essential Resources — сделал человек руками, за десять секунд."
            )}
          </P>
          <P>
            {t(
              "The takeaway isn't “MCP is useless,” it's narrower and more practical: having a capability and having a live connection in a specific session are two different things, and for fine visual tuning it's cheaper to rely on a human with an open Editor than on an agent's self-report of its own capabilities.",
              "Вывод не «MCP не нужен», а более узкий и практичный: наличие возможности и наличие живого подключения в конкретной сессии — разные вещи, и для тонкой визуальной доводки дешевле полагаться на человека с открытым Editor, чем на самоотчёт агента о собственных возможностях."
            )}
          </P>
          <div className="mt-7 overflow-hidden rounded-2xl border border-line">
            <img
              src={`${IMG}/editor-console.webp`}
              alt={t(
                "The developer's own Unity Editor session — real errors in the console",
                "Собственная Unity Editor-сессия разработчика — реальные ошибки в консоли"
              )}
              className="block w-full"
            />
          </div>
          <p className="mt-3 text-center font-mono text-[12.5px] text-muted-faint">
            {t("the one view none of the three agents had", "тот самый вид, которого не было ни у одного из трёх агентов")}
          </p>
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <Kicker n="07">{t("Case in point", "Кейс")}</Kicker>
          <H2>{t("The shelf that lay on its side (and what a blind agent can do about it)", "Стеллаж, который лежал на боку (и что с этим можно сделать вслепую)")}</H2>
          <P>
            {t(
              "The best illustration of where an agent's abilities end without a visual channel — the story of one 3D warehouse shelving model.",
              "Лучшая иллюстрация того, где заканчиваются возможности агента без визуального канала — история одной 3D-модели склада."
            )}
          </P>
          <div className="mb-2 grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-xl border border-line">
              <img
                src={`${IMG}/shelf-bug-1.webp`}
                alt={t("Stretching along mismatched axes — geometric mush", "Растяжение по несовпадающим осям — геометрическое месиво")}
                className="block w-full"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-line">
              <img
                src={`${IMG}/shelf-bug-2.webp`}
                alt={t("Geometry after the wrong order of operations", "Геометрия после неверного порядка операций")}
                className="block w-full"
              />
            </div>
          </div>
          <p className="-mt-1 mb-6 text-center text-[12.5px] text-muted-ghost">
            {t(
              "Real build screenshots — the same bug, two failed attempts, before the fix in step 4.",
              "Реальные скриншоты сборки — один и тот же баг, две неудачные попытки, до фикса в шаге 4."
            )}
          </p>
        </Reveal>
        <Reveal>
          <Steps
            steps={[
              {
                title: t("A ready-made model replaces procedural boards", "Готовая модель заменяет процедурные доски"),
                desc: (
                  <>
                    <P>
                      {t(
                        "A finished shelving model (found on Poly Pizza, downloaded as OBJ) is dropped in place of procedural boards. To avoid depending on whatever units a given asset pack happened to be exported in, a generic helper was written: measure the instance's actual Renderer.bounds and stretch it along each axis independently to the target in-game size.",
                        "Готовая модель стеллажа (найдена на Poly Pizza, скачана как OBJ) подставляется вместо процедурных досок. Чтобы не завязываться на то, в каких единицах измерения экспортирован конкретный ассет-пак, был написан универсальный хелпер: измерить фактический Renderer.bounds инстанса и растянуть его по каждой оси независимо до нужного игрового размера."
                      )}
                    </P>
                    <CodeBlock label="EditorTools/FitToSize.cs">{fitToSizeSnippet}</CodeBlock>
                    <P>
                      {t(
                        "Result, per the human's report: “the shelves aren't labeled, and something's off overall.” No screenshot, just a text description — trusting it and assuming “it's probably the labels” would have been premature.",
                        "Результат — по репорту человека: «стеллажи не подписаны, и вообще что-то не так». Никакой картинки, только текстовое описание — верить ему и предполагать «наверное, дело в тексте» было бы поспешно."
                      )}
                    </P>
                  </>
                ),
              },
              {
                title: t("Diagnosis instead of another guess", "Диагностика вместо очередной догадки"),
                desc: (
                  <>
                    <P>
                      {t(
                        "The same helper started logging actually-measured sizes straight into unity_build.log, which already flows into every CI run's artifacts anyway.",
                        "Тот же хелпер начал логировать реально измеренные размеры прямо в unity_build.log, который и так льётся в артефакт каждого CI-прогона."
                      )}
                    </P>
                    <CodeBlock>{logLine}</CodeBlock>
                    <P>
                      {t(
                        "The numbers said what a human couldn't have put into words: the model's “native” long axis wasn't the one the code assumed. Independent stretching along mismatched axes turned the shelf into geometric mush.",
                        "Число само сказало то, что человек не смог бы сформулировать словами: «родная» длинная ось модели — не та, что предполагалась в коде. Независимое растяжение по неправильно сопоставленным осям превращало стеллаж в геометрическое месиво."
                      )}
                    </P>
                  </>
                ),
              },
              {
                title: t("A rotation fix — numbers check out, human says it's still wrong", "Фикс с поворотом — числа сходятся, человек говорит: всё ещё не так"),
                desc: t(
                  "A rotation was added to align the axes by the rank of measured magnitudes, and the next log confirmed it: stretch factors became sane (×2.5 / ×0.8 / ×0.8 instead of ×7 / ×0.33). The numbers checked out. But the human, opening the build, reported: the shelf is lying on its side.",
                  "Добавлен поворот, выровнявший оси по рангу измеренных величин — и следующий лог подтвердил: коэффициенты растяжения стали вменяемыми (×2.5 / ×0.8 / ×0.8 вместо ×7 / ×0.33). Числа сошлись. Но человек, открыв билд, сообщил: стеллаж лежит на боку."
                ),
              },
              {
                title: t("Where the numbers run out and reading code begins", "Где числа кончаются и начинается чтение кода"),
                desc: (
                  <>
                    <P>
                      {t(
                        "This is where the real bug wasn't the direction of the rotation, but the order of operations: the rotation was applied before the stretch, and Transform.localScale pulls an object along its own, already-rotated local axes — not world axes. The correct order is the reverse: stretch the model first in its native, not-yet-rotated coordinate system, and only then rotate the finished geometry as a whole.",
                        "Настоящая ошибка была не в направлении поворота, а в порядке операций: поворот применялся до растяжения, а Transform.localScale тянет объект вдоль его собственных, уже повёрнутых локальных осей — не вдоль мировых. Правильный порядок обратный: сначала растянуть модель в её родной, ещё не повёрнутой системе координат, и только потом развернуть готовую геометрию целиком."
                      )}
                    </P>
                    <CodeBlock label="WarehouseBuilder.cs">{fixedOrderSnippet}</CodeBlock>
                    <P>
                      {t(
                        "This isn't a guess — it's a bug findable by reading code, without a single glance at the result. And this is exactly the moment where the difference between a “blind agent” and an “agent with diagnostics” becomes tangible: where there's no visual channel, the only lever available is making the system produce numbers you can read, instead of guessing from a description.",
                        "Это не догадка — это баг, который можно найти чтением кода, без единого взгляда на результат. И именно в такой момент разница между «слепым агентом» и «агентом с диагностикой» становится осязаемой: там, где нет визуального канала, единственный доступный рычаг — заставить систему производить числа, которые можно прочитать, вместо того чтобы гадать по описанию."
                      )}
                    </P>
                  </>
                ),
              },
            ]}
          />
          <P>
            {t(
              "The final check — whether the shelf now stands on its own feet or is still somehow off — could only be done by a human. That's the honest boundary of this approach.",
              "Финальную проверку — стоит ли теперь стеллаж на своих ножках или всё ещё как-то не так — сделать мог только человек. Это и есть честная граница подхода."
            )}
          </P>
        </Reveal>
      </ArticleSection>

      <ArticleSection>
        <Reveal>
          <div className="mb-8">
            <StatGrid
              stats={[
                { value: "3", label: t("agent surfaces working at once", "агентские поверхности одновременно") },
                { value: "13", label: t("issues closed in one commit", "issues закрыто одним коммитом") },
                { value: "0", label: t("Editor access from the VPS agent", "доступов к Unity Editor у VPS-агента") },
                { value: "2", label: t("CI workflows: build + agent dispatch", "workflow: сборка + диспетчер агента") },
              ]}
            />
          </div>
          <Kicker n="08">{t("Bottom line", "Что в итоге")}</Kicker>
          <H2>{t("Three things this was worth building for", "Три вещи, ради которых стоило городить эту схему")}</H2>
          <List
            items={[
              t(
                "Code as the source of truth for the scene — paid off completely. It allows structural changes (geometry, lighting, post-processing) without ever opening the Editor, and makes every edit reproducible from scratch on any machine.",
                "Код как источник истины для сцены — окупился полностью. Позволил вносить структурные изменения (геометрия, освещение, пост-обработка) без единого открытия Editor, и делает каждую правку воспроизводимой на любой машине с нуля."
              ),
              t(
                "The CI log as the only channel for an agent without Editor access — works, but demands discipline: if nothing gets logged, the agent just guesses. Worth learning to read unity_build.log by hand once (inside it's not UTF-8, and grep silently treats the file as binary by default — another small trap) to pull real numbers out of it instead of assumptions.",
                "CI-лог как единственный канал для агента без Editor — работает, но требует дисциплины: если ничего не логировать, agent просто гадает. Стоило один раз научиться читать unity_build.log вручную (внутри — не UTF-8, grep по умолчанию принимает файл за бинарный и молчит — тоже отдельная маленькая засада), чтобы вытаскивать из него реальные числа вместо предположений."
              ),
              t(
                "Issues as a protocol between agent sessions — an unexpectedly good fit. GitHub Issues weren't designed as an API for passing tasks between independent AI sessions with no shared memory, but they hold up surprisingly well in that role.",
                "Issues как протокол между агентскими сессиями — неожиданно хорошо сработавшая идея. GitHub Issues не проектировались как API для передачи задач между независимыми ИИ-сессиями без общей памяти, но именно в этой роли они держатся на удивление уверенно."
              ),
            ]}
          />
          <P>
            {t(
              "What this scheme doesn't replace is nothing surprising: perceptual, visual judgment calls (“does this look good,” “is the shelf standing straight”) eventually run into the fact that someone has to look at them with their own eyes. Not because the agents aren't smart enough, but because the task simply has no textual representation from which “does this look good” can be reconstructed. Everything else is a matter of logging discipline and patience for the CI round-trip.",
              "Чего эта схема не заменяет — ничего неожиданного: перцептивные, визуальные решения («красиво ли это», «стоит ли стеллаж ровно») в какой-то момент упираются в то, что кто-то должен на них посмотреть глазами. Не потому что агенты недостаточно умные, а потому что у задачи в принципе нет текстового представления, из которого можно восстановить «выглядит ли это хорошо». Всё остальное — вопрос дисциплины логирования и терпения к раунд-трипу в CI."
            )}
          </P>
        </Reveal>
      </ArticleSection>

      <section className="px-5 pb-20 sm:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-[1040px]">
          <div className="mb-7 flex items-baseline gap-3.5">
            <span className="font-mono text-[13px] text-accent">
              {t("bonus —", "бонус —")}
            </span>
            <span className="font-mono text-[12px] uppercase tracking-wide text-muted-faint">
              {t("we fantasized: a digital storefront", "пофантазировали: витрина цифрового магазина")}
            </span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-[#0d1420]">
            <div className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-8">
              <div className="text-[17px] font-extrabold tracking-wide">
                {t("GAME STOREFRONT", "ИГРОВАЯ ВИТРИНА")}
              </div>
              <div className="font-mono text-[11.5px] text-muted-faint">
                {t("— mockup demo, not a real store —", "— демо-мокап, не настоящий магазин —")}
              </div>
            </div>
            <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row">
              <div className="flex flex-1 flex-col gap-4">
                <div className="overflow-hidden rounded-xl border border-line">
                  <img src={`${IMG}/feature.webp`} alt="GAZON" className="block w-full" />
                </div>
                <div className="grid grid-cols-5 gap-2.5">
                  {storeThumbs.map((s) => (
                    <div key={s} className="overflow-hidden rounded-lg border border-line">
                      <img src={`${IMG}/${s}.webp`} alt="" className="block w-full" />
                    </div>
                  ))}
                </div>
                <div className="overflow-hidden rounded-xl border border-line">
                  <img src={`${IMG}/store-1.webp`} alt={t("Sort the packages", "Сортируй посылки")} className="block w-full" />
                </div>
              </div>
              <div className="flex w-full flex-col gap-4 lg:w-[280px] lg:flex-none">
                <div className="text-[26px] font-extrabold">GAZON</div>
                <p className="text-sm leading-relaxed text-muted-faint">
                  {t(
                    "A pickup-point work simulator. Accept, sort, hand out — and survive to the end of the shift.",
                    "Симулятор работы в ПВЗ. Принимай, сортируй, выдавай — и выживи до конца смены."
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: t("Simulator", "Симулятор"), cls: "border-[rgba(168,85,247,.3)] bg-[rgba(168,85,247,.12)] text-accent-purple" },
                    { label: t("Indie", "Инди"), cls: "border-[rgba(56,189,248,.3)] bg-[rgba(56,189,248,.12)] text-accent-blue" },
                    { label: t("Comedy", "Комедия"), cls: "border-white/10 bg-white/[0.06] text-muted-dim" },
                  ].map((tag) => (
                    <span key={tag.label} className={`rounded-full border px-2.5 py-1 text-[12px] ${tag.cls}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
                <div className="h-px bg-line" />
                <div className="flex flex-col gap-1.5 font-mono text-[13px] text-muted-faint">
                  <div>{t("Developer: gr33njj", "Разработчик: gr33njj")}</div>
                  <div>{t("Publisher: gr33njj", "Издатель: gr33njj")}</div>
                  <div>{t("Release date: soon", "Дата выхода: скоро")}</div>
                </div>
                <div className="h-px bg-line" />
                <div className="flex items-center justify-between rounded-[10px] border border-line bg-[#10131b] p-4">
                  <div className="text-[17px] font-bold">{t("Free", "Бесплатно")}</div>
                  <div className="rounded-lg bg-accent-purple px-4 py-2.5 text-sm font-bold text-white">
                    {t("Play", "Играть")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <CaseCTA
        kicker={t("next step", "следующий шаг")}
        title={t("Building something with AI agents in the loop?", "Строите что-то с ИИ-агентами в контуре разработки?")}
        desc={t(
          "I design CI pipelines and agent workflows that hold up without a human watching every step.",
          "Проектирую CI-пайплайны и агентские workflow, которые держатся без постоянного присмотра человека."
        )}
        primaryLabel={t("Message me on Telegram — @gr33njj", "Написать в Telegram — @gr33njj")}
        secondary={t("Other work", "Другие работы")}
      />
    </div>
  );
}
