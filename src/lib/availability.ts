import { createServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { visitorRegion } from "@/lib/currency";

/**
 * Whether Paus can be downloaded where the visitor is. Apple only lists an app in the EU once the
 * developer's trader status is approved, so until then EU visitors are offered the newsletter instead
 * of an App Store link that says the app isn't available. It switches back by itself once Apple lists it.
 */

const APP_ID = "6825835642";
const EU = new Set([
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU",
  "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK",
]);
const HOUR = 60 * 60 * 1000;
const listed = new Map<string, { available: boolean; checkedAt: number }>();

/** Asks Apple's lookup API whether Paus is in the App Store of `country`, at most once an hour per country. */
export const appAvailableIn = createServerFn({ method: "POST" })
  .validator((input: { country: string }) => {
    const country = String(input?.country ?? "").toLowerCase();
    if (!/^[a-z]{2}$/.test(country)) throw new Error("invalid-country");
    return { country };
  })
  .handler(async ({ data }) => {
    const cached = listed.get(data.country);
    if (cached && Date.now() - cached.checkedAt < HOUR) return { available: cached.available };
    try {
      const response = await fetch(`https://itunes.apple.com/lookup?id=${APP_ID}&country=${data.country}`);
      // When Apple can't be asked, assume Paus is there rather than turn visitors away.
      if (!response.ok) return { available: true };
      const json = (await response.json()) as { resultCount?: number };
      const available = (json.resultCount ?? 0) > 0;
      listed.set(data.country, { available, checkedAt: Date.now() });
      return { available };
    } catch {
      return { available: true };
    }
  });

export type Availability = { coming: false } | { coming: true; country: string };

let check: Promise<Availability> | undefined;

async function lookUp(): Promise<Availability> {
  const region = visitorRegion();
  if (!region || !EU.has(region)) return { coming: false };
  try {
    const { available } = await appAvailableIn({ data: { country: region } });
    if (available) return { coming: false };
    const country = new Intl.DisplayNames(["en"], { type: "region" }).of(region) ?? region;
    return { coming: true, country };
  } catch {
    return { coming: false };
  }
}

/** `coming` is true for a visitor whose App Store doesn't have Paus yet. Starts out false, so the page renders the same on the server. */
export function useAvailability(): Availability {
  const [state, setState] = useState<Availability>({ coming: false });
  useEffect(() => {
    let cancelled = false;
    check ??= lookUp();
    check.then((result) => {
      if (!cancelled) setState(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return state;
}
