import { createFileRoute } from "@tanstack/react-router";
import { EMAIL, OWNER, meta } from "@/components/Site";

export const Route = createFileRoute("/privacy")({
  head: () => meta("Paus – Privacy Policy", "How Paus handles your data: no account, no ads, no tracking."),
  component: Privacy,
});

const sections: [string, string][] = [
  ["In short", "Paus works without an account. Almost everything stays on your phone. If you join the league, your nickname and points are visible to other players. We never sell data and use no advertising or tracking."],
  ["Data controller", `${OWNER}. Contact: ${EMAIL}.`],
  ["What stays only on your phone", "Your rules, schedules, focus sessions, XP, level, streak, trophies and the reasons you give when taking a pause are stored only locally on your phone. Which apps you block and how long you use them is handled by Apple's Screen Time. Paus only sees anonymous tokens for the apps, and that information never leaves your phone."],
  ["The league", "If you choose a nickname and join the league, the following is stored in Apple's iCloud service CloudKit: nickname, weekly points, level, division, league group, country and an anonymous identifier that iCloud creates for the app. This data is visible to other players on the leaderboards. Your Apple ID, name or email is never shared. The legal basis is that you chose to join (contract). The data remains until you leave the league."],
  ["Reports", "If someone reports a nickname, the nickname and an anonymous identifier are stored so we can review it. Inappropriate names are removed."],
  ["Purchases", "Subscriptions are handled entirely by Apple. We never receive your card details. You cancel your subscription under Settings > [your name] > Subscriptions."],
  ["Notifications", "Paus sends reminders and pause notifications locally from your phone. No notification data is sent to us."],
  ["Your rights", `You can leave the league and delete your nickname at any time under League, or delete all your data under Rules > Delete all my data. You have the right to know what data we hold about you, to have it corrected or deleted, and to lodge a complaint with the Swedish Authority for Privacy Protection (IMY). Contact ${EMAIL} with questions.`],
  ["Children", "Paus is intended for people aged 13 or older. If you are younger, don't join the league without talking to an adult."],
  ["Changes", "If this policy changes, we will update the date above and tell you about important changes in the app."],
];

function Privacy() {
  return (
    <article className="mx-auto max-w-3xl pt-10">
      <h1 className="text-4xl font-black leading-tight sm:text-5xl text-gradient">Privacy Policy for Paus</h1>
      <p className="mt-3 text-muted-foreground">Last updated October 20, 2026</p>
      {sections.map(([h, t]) => (
        <section key={h} className="mt-10">
          <h2 className="text-xl font-extrabold text-accent">{h}</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">{t}</p>
        </section>
      ))}
    </article>
  );
}
