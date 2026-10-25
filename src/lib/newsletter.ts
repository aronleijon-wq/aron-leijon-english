import { createServerFn } from "@tanstack/react-start";

/**
 * Newsletter sign-ups go to a Resend contact list. The API key never reaches the browser: it is read on the
 * server from the RESEND_API_KEY secret, with RESEND_AUDIENCE_ID naming the list. Until the key is set,
 * the sign-up box stays hidden.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const newsletterReady = createServerFn({ method: "GET" }).handler(async () => Boolean(process.env["RESEND_API_KEY"]));

export const joinNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string }) => {
    const email = String(input?.email ?? "").trim().toLowerCase();
    if (!EMAIL.test(email) || email.length > 254) throw new Error("invalid-email");
    return { email };
  })
  .handler(async ({ data }) => {
    const key = process.env["RESEND_API_KEY"];
    if (!key) return { ok: false as const };
    const audience = process.env["RESEND_AUDIENCE_ID"];
    const url = audience ? `https://api.resend.com/audiences/${audience}/contacts` : "https://api.resend.com/contacts";
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, unsubscribed: false }),
    });
    // Signing up twice is fine: Resend answers that the contact already exists.
    if (response.ok || response.status === 409 || response.status === 422) return { ok: true as const };
    console.error("Resend sign-up failed", response.status, await response.text());
    return { ok: false as const };
  });
