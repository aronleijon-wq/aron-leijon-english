import { createFileRoute } from "@tanstack/react-router";
import { EMAIL, meta } from "@/components/Site";

export const Route = createFileRoute("/support")({
  head: () => meta("Paus – Support", "Get help with Paus: contact us or read the frequently asked questions.", "/support"),
  component: Support,
});

const faq = [
  ["Why isn't blocking working?", "Make sure Paus has Screen Time access under Settings > Screen Time, and that you've chosen apps in the Apps tab."],
  ["What is a step session?", "A focus session that ends when you've walked a number of steps instead of after a set time. Start one on the Home tab and choose 1,000, 2,000 or 5,000 steps. The apps stay locked until you've walked them – a step session can't be stopped or paused. Step sessions are part of Paus Pro."],
  ["My steps aren't counted. What do I do?", "Paus needs access to Steps in Health and to Motion & Fitness. Check the Health app (tap your profile picture > Apps > Paus) and Settings > Privacy & Security > Motion & Fitness. During a step session Paus checks your steps every few minutes, and right away when you open the app."],
  ["Can I get around a block?", "That's the point – it's hard. Pauses cost XP after the first one each day. Strict focus and step sessions can't be stopped or paused, and with Paus Pro you can stop Paus from being deleted while a block is on."],
  ["Do I need an account?", "No, everything works without one. You can sign in with Apple or with your email if you'd like Pip to greet you by name."],
  ["How do I cancel Paus Pro?", "Settings > [your name] > Subscriptions > Paus Pro."],
  ["How do I delete my account and data?", "In the app: tap the profile button on the Home tab > your name (or My account) > Delete account and all data. To only leave the league: League tab > the profile button > Leave the league and remove my name."],
  ["How do I report an inappropriate nickname?", "Press and hold the name in the leaderboard and choose Report."],
  ["Does Paus cost anything?", "The basic version is free. Paus Pro costs 29 SEK/month or 219 SEK/year in Sweden, with a 7-day free trial. The App Store shows the price for your country."],
  ["Is Paus on Android, or in my country?", "Paus is for iPhone, on iOS 17 or later. If it isn't in your country's App Store yet, join the newsletter on the home page and we'll email you the day it arrives."],
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
