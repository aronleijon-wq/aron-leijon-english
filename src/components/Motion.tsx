import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Camera, Gamepad2, Lock, MessageCircle, Music2, Play, ShoppingBag } from "lucide-react";

/** Playful motion for the home page. Everything holds still for people who prefer reduced motion. */

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// MARK: Pip

/** Pip's face. The pupils look towards `--lx` and `--ly` (−1 to 1) set on any element around it. */
export function PipFace({ className = "" }: { className?: string }) {
  const pupil: CSSProperties = {
    transform: "translate(calc(var(--lx, 0) * 7px), calc(var(--ly, 0) * 6px))",
    transition: "transform 0.15s ease-out",
  };
  return (
    <svg viewBox="0 0 200 180" className={`animate-breathe w-full ${className}`} role="img" aria-label="Pip, the Paus mascot">
      <path d="M100 12c52 0 88 40 88 90 0 46-36 70-88 70s-88-24-88-70c0-50 36-90 88-90z" className="fill-pip" />
      <g className="animate-blink">
        <circle cx="72" cy="88" r="20" className="fill-foreground" />
        <circle cx="128" cy="88" r="20" className="fill-foreground" />
        <circle cx="72" cy="88" r="9" className="fill-background" style={pupil} />
        <circle cx="128" cy="88" r="9" className="fill-background" style={pupil} />
      </g>
      <ellipse cx="48" cy="122" rx="12" ry="8" className="fill-cheek" />
      <ellipse cx="152" cy="122" rx="12" ry="8" className="fill-cheek" />
      <path d="M88 124q12 10 24 0" strokeWidth="5" strokeLinecap="round" fill="none" className="stroke-background" />
    </svg>
  );
}

const pipLines = [
  "Hi! I'm Pip.",
  "Your apps can wait.",
  "One more video? Not tonight.",
  "Every focused minute makes me happier.",
  "Let's take back your time.",
];

/** Pip, whose eyes follow the pointer. Tapping Pip makes it squish and say something. */
export function PipFollow({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [line, setLine] = useState<{ index: number; key: number } | null>(null);
  const [pokes, setPokes] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const look = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height * 0.45);
      const distance = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, distance / 260);
      node.style.setProperty("--lx", String((dx / distance) * reach));
      node.style.setProperty("--ly", String((dy / distance) * reach));
    };
    window.addEventListener("pointermove", look, { passive: true });
    window.addEventListener("pointerdown", look, { passive: true });
    return () => {
      window.removeEventListener("pointermove", look);
      window.removeEventListener("pointerdown", look);
    };
  }, []);

  function poke() {
    setPokes((n) => n + 1);
    setLine((previous) => ({ index: previous ? (previous.index + 1) % pipLines.length : 0, key: Date.now() }));
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {line && (
        <span
          key={line.key}
          onAnimationEnd={() => setLine(null)}
          className="animate-bubble absolute bottom-[96%] left-1/2 z-10 whitespace-nowrap rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-[#141028] shadow-xl"
        >
          {pipLines[line.index]}
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white" />
        </span>
      )}
      <button type="button" onClick={poke} aria-label="Say hi to Pip" className="block w-full cursor-pointer rounded-full">
        <span key={pokes} className={`block ${pokes ? "animate-squish" : ""}`}>
          <PipFace />
        </span>
      </button>
    </div>
  );
}

// MARK: Apps being paused

const orbit = [
  { Icon: Play, color: "#FF4F6D", left: "3%", top: "14%", delay: 0 },
  { Icon: Music2, color: "#8B5CFF", left: "80%", top: "6%", delay: -2 },
  { Icon: Camera, color: "#FFB547", left: "84%", top: "58%", delay: -4 },
  { Icon: MessageCircle, color: "#38C8F0", left: "0%", top: "64%", delay: -6 },
  { Icon: Gamepad2, color: "#3CF0B0", left: "20%", top: "84%", delay: -8 },
  { Icon: ShoppingBag, color: "#FF4FA3", left: "64%", top: "86%", delay: -10 },
];

/** App icons drifting around `children`, getting paused one after another. */
export function AppOrbit({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex h-56 max-w-md items-center justify-center sm:h-80">
      {orbit.map(({ Icon, color, left, top, delay }, i) => (
        <div key={i} aria-hidden="true" className="animate-float absolute" style={{ left, top, animationDelay: `${delay / 2}s` }}>
          <div className="relative">
            <div
              className="animate-tile-lock flex h-11 w-11 items-center justify-center rounded-2xl shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7)] sm:h-14 sm:w-14"
              style={{ background: `linear-gradient(140deg, ${color}, ${color}aa)`, animationDelay: `${delay}s` }}
            >
              <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <span
              className="animate-lock-pop absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#141028] shadow-lg"
              style={{ animationDelay: `${delay}s` }}
            >
              <Lock className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </div>
        </div>
      ))}
      {children}
    </div>
  );
}

// MARK: The scroll story

const posts: [string, string][] = [
  ["#8B5CFF", "#FF4FA3"],
  ["#FFB547", "#FF4F6D"],
  ["#38C8F0", "#3CF0B0"],
  ["#FF4FA3", "#FFB547"],
  ["#3CF0B0", "#8B5CFF"],
  ["#FF4F6D", "#38C8F0"],
];

function Post({ from, to }: { from: string; to: string }) {
  return (
    <div className="mb-3 rounded-2xl bg-white/5 p-2.5">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-6 w-6 rounded-full" style={{ background: from }} />
        <span className="h-2.5 w-20 rounded-full bg-white/20" />
      </div>
      <div className="aspect-[4/5] rounded-xl" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }} />
      <div className="mt-2 flex gap-2">
        <span className="h-2.5 w-10 rounded-full bg-white/20" />
        <span className="h-2.5 w-16 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

/** How far through the story Pip pauses the phone. */
const PAUSE_AT = 0.66;
const stages = [
  { at: 0, time: "11:42 PM", text: "Just one more video…" },
  { at: 0.33, time: "12:58 AM", text: "An hour gone. You didn't even notice." },
  { at: PAUSE_AT, time: "1:03 AM", text: "Pip steps in. Apps paused – time to sleep." },
];

function duration(minutes: number) {
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}m`;
}

/** A phone that keeps scrolling as you scroll the page, until Pip pauses it. */
export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const box = node.getBoundingClientRect();
      const total = box.height - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, Math.max(0, -box.top / total)) : 1);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const stage = stages.reduce((found, next) => (progress >= next.at ? next : found));
  const index = stages.indexOf(stage);
  const paused = progress >= PAUSE_AT;
  const doom = Math.min(1, progress / PAUSE_AT);
  const minutes = Math.round(130 + (372 - 130) * doom);

  return (
    <section ref={ref} className="relative h-[220vh]" aria-label="What a night of scrolling looks like, until Pip pauses it">
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center">
        <div className="grid w-full items-center gap-6 md:grid-cols-2 md:gap-12">
          <div className="text-center md:text-left">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-muted-foreground">One night, three moments</p>
            <p key={stage.time} className="animate-rise mt-3 text-5xl font-black text-gradient sm:text-7xl">{stage.time}</p>
            <p key={stage.text} className="animate-rise mx-auto mt-3 max-w-sm text-lg font-bold sm:text-2xl md:mx-0">{stage.text}</p>
            <div className="mt-5 flex justify-center gap-2 md:justify-start" aria-hidden="true">
              {stages.map((s, i) => (
                <span key={s.time} className={`h-1.5 rounded-full transition-all duration-500 ${i <= index ? "w-10 bg-gradient-brand" : "w-5 bg-white/15"}`} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3" aria-hidden="true">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-extrabold transition-colors duration-500 ${
                paused ? "border-accent/50 bg-accent/15 text-accent" : "border-white/10 bg-card/80"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${paused ? "bg-accent" : "animate-pulse bg-[#FF4F6D]"}`} />
              {paused ? "Apps paused" : <>Screen time today <span className="tabular-nums text-[#FF7A8C]">{duration(minutes)}</span></>}
            </div>
            <div className="relative aspect-[9/19.5] h-[min(30rem,50svh)] overflow-hidden rounded-[2.6rem] border-[6px] border-[#211b40] bg-[#0b0918] shadow-[0_40px_90px_-30px_rgba(139,92,255,0.9)] md:h-[min(34rem,72svh)]">
              <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
              <div className="absolute inset-x-3 top-10 bottom-0 overflow-hidden">
                <div className="animate-feed" style={{ animationPlayState: paused ? "paused" : "running" }}>
                  {[...posts, ...posts].map(([from, to], i) => (
                    <Post key={i} from={from} to={to} />
                  ))}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[#FF2D55] mix-blend-overlay transition-opacity duration-300" style={{ opacity: paused ? 0 : doom * 0.45 }} />
              <div
                className={`absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-[#0b0918]/95 px-5 text-center transition-transform duration-700 [transition-timing-function:cubic-bezier(0.2,0.9,0.2,1.05)] ${
                  paused ? "translate-y-0" : "translate-y-full"
                }`}
              >
                <div className="w-24">
                  <PipFace />
                </div>
                <p className="rounded-2xl bg-white px-3 py-2 text-sm font-extrabold text-[#141028] sm:px-4 sm:text-base">Not now. You've got this!</p>
                <p className="text-xs font-bold text-muted-foreground">Paused by Paus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// MARK: Small things

/** A row of words sliding by forever. */
export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="mask-fade-x overflow-hidden" aria-hidden="true">
      <div className={`animate-marquee flex w-max hover:[animation-play-state:paused] ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mr-3 whitespace-nowrap rounded-full border border-white/10 bg-card/70 px-5 py-2.5 text-sm font-extrabold sm:text-base">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/** A thin brand-coloured line along the top that fills as the page is read. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={ref} aria-hidden="true" className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-gradient-brand" />;
}

/** Tilts its card towards the mouse, with a soft glare where the pointer is. */
export function Tilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(event: ReactPointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse" || prefersReducedMotion()) return;
    const box = node.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    node.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg)`;
    node.style.setProperty("--gx", `${x * 100}%`);
    node.style.setProperty("--gy", `${y * 100}%`);
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "";
  }
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className="tilt relative h-full transition-transform duration-200 ease-out">
      {children}
      <span aria-hidden="true" className="tilt-glare pointer-events-none absolute inset-0 rounded-3xl" />
    </div>
  );
}

const confettiColors = ["#8B5CFF", "#FF4FA3", "#FFB547", "#3CF0B0", "#38C8F0"];

/** A small burst of confetti every time `burst` goes up. */
export function Confetti({ burst }: { burst: number }) {
  if (!burst || prefersReducedMotion()) return null;
  return (
    <span key={burst} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-10">
      {Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2 + burst * 0.4;
        const distance = 70 + ((i * 37) % 70);
        const style = {
          background: confettiColors[i % confettiColors.length],
          "--dx": `${Math.cos(angle) * distance}px`,
          "--dy": `${Math.sin(angle) * distance - 24}px`,
          "--r": `${(i * 47) % 360}deg`,
        } as CSSProperties;
        return <span key={i} className="animate-confetti absolute h-3 w-2 rounded-sm" style={style} />;
      })}
    </span>
  );
}
