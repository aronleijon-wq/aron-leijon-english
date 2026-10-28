import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { BarChart3, Check, Flame, Footprints, Lock, ShieldCheck, Sparkles, Timer, Trophy } from "lucide-react";
import { APP_STORE_URL, AppStoreBadge, Pip, meta } from "@/components/Site";
import { AppOrbit, Confetti, Marquee, PipFollow, ScrollProgress, ScrollStory, Tilt } from "@/components/Motion";
import { useAvailability } from "@/lib/availability";
import { useLocalPrices } from "@/lib/currency";
import { NewsletterSignup } from "@/components/Newsletter";

export const Route = createFileRoute("/")({
  head: () => meta(
    "Paus – Take back your time",
    "Paus blocks the apps that steal your time and turns focusing into a game. New: step sessions that keep your apps locked until you've walked.",
  ),
  component: Index,
});

/** Fades its children in the first time they scroll into view. */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setShown(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${shown ? "revealed" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** Counts from 0 up to `to` the first time the returned ref is on screen. */
function useCountUp<T extends HTMLElement>(to: number, duration = 1800) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setValue(to * (1 - Math.pow(1 - t, 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);
  return [ref, value] as const;
}

function CountUp({ to, decimals = 0, duration = 1800 }: { to: number; decimals?: number; duration?: number }) {
  const [ref, value] = useCountUp<HTMLSpanElement>(to, duration);
  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}

function Blobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-drift absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#8B5CFF]/30 blur-3xl" />
      <div className="animate-drift absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[#FF4FA3]/20 blur-3xl [animation-delay:-6s]" />
      <div className="animate-drift absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-[#3CF0B0]/10 blur-3xl [animation-delay:-12s]" />
    </div>
  );
}

const headline = ["Take", "back", "your", "time."];

const features = [
  { icon: Lock, title: "Block what distracts you", text: "Pick any apps or websites and Pip pauses them – on a schedule, with a daily limit or right now." },
  { icon: Timer, title: "Focus sessions", text: "Start a session, put the phone down and earn XP for every minute you stay focused." },
  { icon: Sparkles, title: "Meet Pip", text: "Your little companion cheers when you focus and gets sad when you scroll too much." },
  { icon: Trophy, title: "Levels & trophies", text: "Climb from Scroll Zombie to Legend, unlock trophies and finish daily quests." },
  { icon: Flame, title: "Weekly leagues", text: "Compete with friends and players everywhere. Every focused minute counts." },
  { icon: BarChart3, title: "See your progress", text: "A clear screen time report, widgets and a Live Activity on your Lock Screen." },
];

const screens = [
  ["life-math", "Pip works out how much of your life goes to your phone"],
  ["levels", "Levels from Scroll Zombie to Legend"],
  ["lock-screen", "A focus session on the Lock Screen"],
  ["notification", "A notification from Pip cheering you on"],
];

const steps = [
  ["1", "Choose your apps", "Tell Pip which apps steal your time. Paus uses Apple's Screen Time, so it just works."],
  ["2", "Focus and pause", "Start a focus session or a step session, or let your schedule do it. Need a break? Take a pause – it has a cost."],
  ["3", "Level up", "Earn XP, keep your streak and climb the league while your screen time goes down."],
];

const freeFeatures = ["Block apps and websites", "Focus sessions with XP", "Pip, levels and trophies", "Weekly leagues", "One schedule"];
const proFeatures = ["Step sessions: walk to unlock", "Unlimited schedules", "Daily time limits", "Strict focus mode", "Protection against deleting the app", "Personal tips from Pip"];

function Pricing() {
  const [yearly, setYearly] = useState(true);
  const [burst, setBurst] = useState(0);
  const price = useLocalPrices();
  const availability = useAvailability();
  return (
    <section id="pricing" className="scroll-mt-24 pt-28">
      <Reveal className="text-center">
        <h2 className="text-4xl font-black sm:text-5xl">Choose your <span className="text-gradient">level</span></h2>
        <p className="mt-4 text-lg text-muted-foreground">Start free. Upgrade when you want more control.</p>
        <div className="relative mt-8 inline-flex rounded-full bg-card p-1.5" role="group" aria-label="Billing period">
          <Confetti burst={burst} />
          {[["Monthly", false], ["Yearly", true]].map(([label, value]) => (
            <button
              key={String(label)}
              onClick={() => {
                // A little celebration for picking the better deal.
                if (value && !yearly) setBurst((n) => n + 1);
                setYearly(value as boolean);
              }}
              aria-pressed={yearly === value}
              className={`relative rounded-full px-6 py-2.5 text-sm font-extrabold transition-all duration-300 ${
                yearly === value ? "bg-gradient-brand text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label as string}
              {value && <span className="ml-2 rounded-full bg-black/25 px-2 py-0.5 text-xs">−37%</span>}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Reveal delay={100}>
          <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-card/80 p-8 transition duration-300 hover:-translate-y-1">
            <h3 className="text-2xl font-black">Free</h3>
            <p className="mt-1 text-muted-foreground">Everything you need to start.</p>
            <p className="mt-6 text-5xl font-black">{price.format(0, { approximate: false })}</p>
            <p className="text-sm text-muted-foreground">forever</p>
            <ul className="mt-8 flex-1 space-y-3">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{f}</li>
              ))}
            </ul>
            <AppStoreBadge className="mt-8 self-start" />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative h-full rounded-[2rem] bg-gradient-moving p-[2px] shadow-[0_20px_80px_-20px_rgba(255,79,163,0.6)] transition duration-300 hover:-translate-y-1">
            <span className="absolute -top-3.5 left-8 rounded-full bg-gradient-brand px-4 py-1 text-xs font-black uppercase tracking-wider text-primary-foreground">Most popular</span>
            <div className="flex h-full flex-col rounded-[calc(2rem-2px)] bg-card p-8">
              <h3 className="text-2xl font-black">Paus <span className="text-gradient">Pro</span></h3>
              <p className="mt-1 text-muted-foreground">For when you're serious about your time.</p>
              <div key={String(yearly)} className="animate-pop mt-6">
                <p className="text-5xl font-black">{price.format(yearly ? 219 : 29)}<span className="text-lg font-bold text-muted-foreground">{yearly ? " / year" : " / month"}</span></p>
                <p className="text-sm text-muted-foreground">{yearly ? `${price.isConverted ? "" : "≈ "}${price.format(219 / 12)} a month · save 37%` : "billed monthly"}</p>
              </div>
              <p className="mt-6 font-bold">Everything in Free, plus:</p>
              <ul className="mt-3 flex-1 space-y-3">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF4FA3]" />{f}</li>
                ))}
              </ul>
              <a
                href={availability.coming ? "/#newsletter" : APP_STORE_URL}
                className="mt-8 rounded-full bg-gradient-moving px-7 py-4 text-center font-extrabold text-primary-foreground transition duration-300 hover:scale-[1.02]"
              >
                {availability.coming ? "Get notified at launch" : "Try 7 days free"}
              </a>
              <p className="mt-3 text-center text-xs text-muted-foreground">Then {price.format(yearly ? 219 : 29)}{yearly ? "/year" : "/month"}. Cancel anytime in the App Store.</p>
              {price.isConverted && (
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  Converted from Swedish kronor. The App Store shows the exact price for your country.
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const STEP_GOAL = 2000;

/** A step session as it shows on the Lock Screen, counting down while it is on screen. */
function StepSessionCard() {
  const [ref, walked] = useCountUp<HTMLDivElement>(1450, 2600);
  const steps = Math.round(walked);
  const format = (n: number) => n.toLocaleString("en-US");
  return (
    <div ref={ref} className="mx-auto w-full max-w-sm rounded-[2.5rem] border border-white/10 bg-[#0b0918] p-4 shadow-[0_30px_80px_-30px_rgba(139,92,255,0.8)] sm:p-5" aria-hidden="true">
      <p className="text-center text-sm font-bold text-muted-foreground">Thursday, October 29</p>
      <p className="text-center text-6xl font-black tracking-tight">9:41</p>
      <div className="mt-6 flex items-center gap-3 rounded-3xl bg-white/10 p-3 backdrop-blur sm:gap-4 sm:p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand sm:h-12 sm:w-12">
          <Pip className="w-8 sm:w-9" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="whitespace-nowrap font-extrabold">Step session</p>
          <p className="whitespace-nowrap text-xs text-muted-foreground sm:text-sm">{format(steps)} of {format(STEP_GOAL)} steps</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${(steps / STEP_GOAL) * 100}%` }} />
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black leading-none text-gradient sm:text-3xl">{format(STEP_GOAL - steps)}</p>
          <p className="whitespace-nowrap text-xs font-bold text-muted-foreground">steps left</p>
        </div>
      </div>
    </div>
  );
}

function StepSessions() {
  const points = [
    "Choose 1,000, 2,000 or 5,000 steps",
    "No pause button and no way around it",
    "Steps left right on your Lock Screen",
    "Your apps unlock by themselves when you're done",
  ];
  return (
    <section className="pt-28">
      <Reveal>
        <div className="grid items-center gap-10 rounded-[2rem] border border-white/10 bg-card/70 p-6 sm:p-12 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-3 py-1 text-xs font-black uppercase tracking-wider text-primary-foreground">
              <Footprints className="h-4 w-4" aria-hidden="true" /> New
            </span>
            <h2 className="mt-5 text-4xl font-black sm:text-5xl">Walk to <span className="text-gradient">unlock.</span></h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start a step session and your apps stay locked until you've walked. Counted by your iPhone and Apple Watch – your steps never leave your phone.
            </p>
            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{point}</li>
              ))}
            </ul>
          </div>
          <StepSessionCard />
        </div>
      </Reveal>
    </section>
  );
}

/** The share of waking hours that 5 hours a day takes, filling up on screen. */
function LifeBar() {
  const [ref, value] = useCountUp<HTMLDivElement>(31, 2000);
  return (
    <div ref={ref} className="mx-auto mt-10 max-w-xl text-left">
      <div className="flex justify-between gap-4 text-sm font-bold text-muted-foreground">
        <span>Your waking hours</span>
        <span className="text-foreground">{Math.round(value)}% on your phone</span>
      </div>
      <div className="mt-2 h-4 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-brand shadow-[0_0_20px_rgba(255,79,163,0.6)]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

const benefits = ["Less scrolling", "More sleep", "Better focus", "Real conversations", "Calmer evenings", "Time for friends", "More time outside", "Better grades"];
const tricks = ["Earn XP", "Keep your streak", "Climb the league", "Walk to unlock", "Strict focus", "Daily limits", "Pip cheers you on", "Unlock trophies"];

function Index() {
  const availability = useAvailability();
  return (
    <div id="top">
      <Blobs />
      <ScrollProgress />

      {/* Hero */}
      <section className="pt-6 text-center sm:pt-12">
        <AppOrbit>
          <div className="relative w-40 sm:w-60">
            <div className="absolute inset-4 rounded-full bg-[#3CF0B0]/30 blur-3xl" />
            <div className="animate-float relative">
              <PipFollow />
            </div>
          </div>
        </AppOrbit>
        <p className="animate-rise mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/70 px-4 py-1.5 text-sm font-bold">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          {availability.coming ? `Coming to ${availability.country} very soon` : "Out now on the App Store"}
        </p>
        <h1 className="mt-6 text-5xl font-black leading-[1.05] sm:text-7xl">
          {headline.map((word, i) => (
            <Fragment key={word}>
              {i > 0 && " "}
              <span className="animate-rise inline-block text-gradient" style={{ animationDelay: `${150 + i * 120}ms` }}>
                {word}
              </span>
            </Fragment>
          ))}
        </h1>
        <p className="animate-rise mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl" style={{ animationDelay: "650ms" }}>
          Paus blocks the apps that steal your time – and turns focusing into a game. With Pip by your side.
        </p>
        <div className="animate-rise mt-9 flex flex-col items-center gap-3" style={{ animationDelay: "800ms" }}>
          <AppStoreBadge />
          <p className="text-sm text-muted-foreground">Free to download · 7 days of Pro free</p>
        </div>
      </section>

      {/* Screens */}
      <section className="mt-20 -mx-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none]">
        <div className="mx-auto flex w-max gap-5 sm:w-auto sm:justify-center">
          {screens.map(([name, alt], i) => (
            <Reveal key={name} delay={i * 120}>
              <img
                src={`/screens/${name}.webp`}
                alt={alt}
                width={540}
                height={1174}
                loading="lazy"
                className={`w-52 rounded-[2rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition duration-500 hover:-translate-y-2 hover:rotate-0 sm:w-56 ${i % 2 ? "sm:translate-y-10 sm:rotate-2" : "sm:-rotate-2"}`}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <ScrollStory />

      {/* The math */}
      <section className="pt-24 text-center">
        <Reveal>
          <p className="text-lg font-bold text-muted-foreground">At 5 hours a day, most of us will spend</p>
          <p className="mt-2 text-7xl font-black text-gradient sm:text-9xl"><CountUp to={18.4} decimals={1} /> years</p>
          <p className="mt-3 text-lg text-muted-foreground">of our waking life looking at a phone. Paus helps you win some of it back.</p>
          <LifeBar />
        </Reveal>
      </section>

      <StepSessions />

      {/* What you get back */}
      <section className="space-y-3 pt-24">
        <Marquee items={benefits} />
        <Marquee items={tricks} reverse />
      </section>

      {/* Features */}
      <section className="pt-28">
        <Reveal className="text-center">
          <h2 className="text-4xl font-black sm:text-5xl">Less scrolling. <span className="text-gradient">More living.</span></h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 100} className="h-full">
              <Tilt>
                <div className="group h-full rounded-3xl border border-white/10 bg-card/80 p-7 transition duration-300 hover:border-white/25 hover:shadow-[0_20px_60px_-25px_rgba(139,92,255,0.7)]">
                  <div className="inline-flex rounded-2xl bg-gradient-brand p-3 transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold">{title}</h3>
                  <p className="mt-2 text-muted-foreground">{text}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="pt-28">
        <Reveal className="text-center">
          <h2 className="text-4xl font-black sm:text-5xl">How it works</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map(([n, title, text], i) => (
            <Reveal key={n} delay={i * 150}>
              <div className="h-full rounded-3xl bg-card/60 p-7">
                <span className="text-6xl font-black text-gradient">{n}</span>
                <h3 className="mt-3 text-xl font-extrabold">{title}</h3>
                <p className="mt-2 text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Pricing />

      {/* Privacy */}
      <section className="pt-28">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-white/10 bg-card/70 p-10 text-center sm:flex-row sm:text-left">
            <ShieldCheck className="h-14 w-14 shrink-0 text-accent" />
            <div>
              <h2 className="text-2xl font-black">Your data stays on your phone</h2>
              <p className="mt-2 text-muted-foreground">
                Paus is built on Apple's Screen Time. What you do on your phone never leaves it. No ads, no tracking, no account needed.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="scroll-mt-24 pt-28">
        <Reveal>
          <NewsletterSignup />
        </Reveal>
      </section>

      {/* Final call */}
      <section className="pt-28 text-center">
        <Reveal>
          <div className="mx-auto w-28 animate-float"><PipFollow /></div>
          <h2 className="mt-6 text-4xl font-black sm:text-5xl">Pip is waiting for you.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Download Paus and start taking back your time today.</p>
          <AppStoreBadge className="mt-8" />
        </Reveal>
      </section>
    </div>
  );
}
