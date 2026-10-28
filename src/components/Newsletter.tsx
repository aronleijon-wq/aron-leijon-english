import { useState, type FormEvent } from "react";
import { Check, Mail } from "lucide-react";
import { useAvailability } from "@/lib/availability";
import { joinNewsletter } from "@/lib/newsletter";

/** "Join the Paus newsletter" – sign-ups are stored in Lovable Cloud. */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const availability = useAvailability();

  async function submit(event: FormEvent) {
    event.preventDefault();
    setState("sending");
    try {
      const result = await joinNewsletter({ data: { email } });
      setState(result.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-card/70 p-8 text-center sm:p-10">
      <Mail className="mx-auto h-10 w-10 text-accent" />
      <h2 className="mt-4 text-3xl font-black">Join the Paus newsletter</h2>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        {availability.coming
          ? `Paus is coming to ${availability.country} very soon. Leave your email and we'll tell you the day it's out – plus tips to scroll less. No spam.`
          : "Tips to scroll less, and news when Pip learns new tricks. No spam."}
      </p>
      {state === "done" ? (
        <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent/15 px-5 py-3 font-bold text-accent">
          <Check className="h-5 w-5" /> You're in! Pip says hi.
        </p>
      ) : (
        <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-label="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-w-0 flex-1 rounded-full border border-white/15 bg-background px-5 py-3.5 font-semibold text-foreground outline-none transition focus:border-[#FF4FA3]"
          />
          <button
            type="submit"
            disabled={state === "sending"}
            className="rounded-full bg-gradient-moving px-7 py-3.5 font-extrabold text-primary-foreground transition duration-300 hover:scale-[1.03] disabled:opacity-60"
          >
            {state === "sending" ? "Joining…" : availability.coming ? "Notify me" : "Subscribe"}
          </button>
        </form>
      )}
      {state === "error" && <p className="mt-3 text-sm text-[#FF4FA3]">Something went wrong. Please try again.</p>}
      <p className="mt-4 text-xs text-muted-foreground">
        We'll only email you about Paus. Unsubscribe anytime. See our <a href="/privacy" className="underline">privacy policy</a>.
      </p>
    </div>
  );
}
