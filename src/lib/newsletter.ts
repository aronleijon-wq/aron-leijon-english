import { createServerFn } from "@tanstack/react-start";

/** Newsletter sign-ups are stored in the newsletter_signups table in Lovable Cloud. */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const joinNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string }) => {
    const email = String(input?.email ?? "").trim().toLowerCase();
    if (!EMAIL.test(email) || email.length > 254) throw new Error("invalid-email");
    return { email };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("newsletter_signups")
      .upsert({ email: data.email }, { onConflict: "email", ignoreDuplicates: true });
    if (error) {
      console.error("Newsletter sign-up failed", error.message);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
