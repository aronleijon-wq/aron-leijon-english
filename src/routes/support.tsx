import { createFileRoute } from "@tanstack/react-router";
import { EMAIL, meta } from "@/components/Site";

export const Route = createFileRoute("/support")({
  head: () => meta("Paus – Support", "Get help with Paus: contact us or read the frequently asked questions."),
  component: Support,
});

const faq = [
  ["Why isn't blocking working?", "Make sure Paus has Screen Time access under Settings > Screen Time, and that you've selected apps in the Apps tab."],
  ["How do I cancel Paus Pro?", "Settings > [your name] > Subscriptions > Paus Pro."],
  ["How do I delete my data?", "In the app: Rules > Delete all my data. To only leave the league: League > your nickname > Leave league."],
  ["How do I report an inappropriate nickname?", "Press and hold the name in the leaderboard and choose Report."],
  ["Does Paus cost anything?", "The basic version is free. Paus Pro costs 29 SEK/month or 219 SEK/year, with a 7-day free trial."],
];

function Support() {
  return (
    <div className="mx-auto max-w-3xl pt-10">
      <h1 className="text-5xl font-black text-gradient">Support</h1>
      <p className="mt-5 text-lg text-muted-foreground">
        Questions, problems or ideas? Email <span className="text-foreground">{EMAIL}</span> and we'll reply as soon as we can.
      </p>
      <a href={`mailto:${EMAIL}`} className="mt-6 inline-block rounded-full bg-gradient-brand px-7 py-3.5 font-extrabold text-primary-foreground">
        Email us
      </a>
      <h2 className="mt-16 text-2xl font-extrabold">Frequently asked questions</h2>
      <div className="mt-5 space-y-3">
        {faq.map(([q, a]) => (
          <details key={q} className="group rounded-3xl bg-card p-5">
            <summary className="cursor-pointer list-none font-bold marker:hidden">
              <span className="mr-2 inline-block text-accent transition-transform group-open:rotate-90">›</span>{q}
            </summary>
            <p className="mt-3 text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
