import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppStoreBadge, Pip, meta } from "@/components/Site";

export const Route = createFileRoute("/i/$code")({
  head: ({ params }) =>
    meta(
      "You're invited to Paus",
      "A friend invited you to Paus, the app blocker with Pip. Add their code and you both get 5 days of Pro for free.",
      `/i/${params.code}`,
    ),
  component: Invite,
});

/** The page an invite link opens: the friend's code, ready to copy, next to the App Store. */
function Invite() {
  const { code } = Route.useParams();
  const clean = code.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(clean);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Without clipboard access the code is still there to read and type.
    }
  }

  return (
    <div className="mx-auto max-w-xl pt-10 text-center">
      <Pip className="mx-auto h-28 w-32" />
      <h1 className="mt-6 text-4xl font-black text-gradient sm:text-5xl">You're invited to Paus</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        A friend wants to scroll less with you. Add their code in the app and you both get{" "}
        <span className="font-bold text-foreground">5 days of Pro for free</span>.
      </p>

      <button
        type="button"
        onClick={copy}
        className="mx-auto mt-8 block w-full max-w-xs rounded-3xl bg-card px-6 py-5 transition hover:scale-[1.02]"
        aria-label={`Copy the invite code ${clean}`}
      >
        <span className="block text-sm font-semibold text-muted-foreground">Your friend's code</span>
        <span className="mt-1 block font-mono text-4xl font-black tracking-[0.25em]">{clean}</span>
        <span className="mt-2 block text-sm font-semibold text-accent">{copied ? "Copied!" : "Tap to copy"}</span>
      </button>

      <ol className="mx-auto mt-10 max-w-sm space-y-3 text-left">
        {[
          "Download Paus and set it up.",
          "Open the League tab and choose a nickname.",
          "Tap Add under Friends and paste the code.",
        ].map((step, i) => (
          <li key={step} className="flex items-start gap-3 rounded-2xl bg-card/60 p-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-black text-primary-foreground">
              {i + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex justify-center">
        <AppStoreBadge />
      </div>
    </div>
  );
}
