import { createFileRoute } from "@tanstack/react-router";
import { Pip, meta } from "@/components/Site";

export const Route = createFileRoute("/")({
  head: () => meta("Paus – Take back your time", "Paus blocks the apps that steal your attention – and turns resisting them into a game."),
  component: Index,
});

const features = [
  ["Focus sessions", "Block distracting apps and stay in the zone."],
  ["Streaks & rewards", "Earn XP, level up and keep your streak alive."],
  ["Leagues", "Compete with friends and the whole world."],
  ["Mindful pauses", "A moment to reflect before you open an app."],
];

function Index() {
  return (
    <div className="pt-8 text-center">
      <Pip className="mx-auto w-48 sm:w-64" />
      <h1 className="mt-8 text-5xl font-black leading-tight sm:text-6xl text-gradient">Take back your time</h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
        Paus blocks the apps that steal your attention – and turns resisting them into a game.
      </p>
      <button disabled className="mt-8 cursor-not-allowed rounded-full bg-gradient-brand px-7 py-3.5 font-extrabold text-primary-foreground opacity-80">
        Coming soon to the App Store
      </button>
      <div className="mt-20 grid gap-4 text-left sm:grid-cols-2">
        {features.map(([t, d]) => (
          <div key={t} className="rounded-3xl bg-card p-6">
            <h2 className="text-lg font-extrabold text-accent">{t}</h2>
            <p className="mt-1 text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
