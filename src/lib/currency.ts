import { useEffect, useState } from "react";

/**
 * Paus Pro's prices in the visitor's own currency. The App Store sets its own rounded price in each
 * country, so converted prices are shown as approximate ("≈"). Swedish visitors, and anyone whose
 * country or exchange rate can't be found, see the exact Swedish prices.
 */

const EURO = ["AT", "BE", "BG", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"];

const REGION_CURRENCY: Record<string, string> = {
  ...Object.fromEntries(EURO.map((region) => [region, "EUR"])),
  SE: "SEK", NO: "NOK", DK: "DKK", IS: "ISK", GB: "GBP", CH: "CHF", PL: "PLN", CZ: "CZK", HU: "HUF", RO: "RON",
  US: "USD", CA: "CAD", MX: "MXN", BR: "BRL", AU: "AUD", NZ: "NZD", JP: "JPY", KR: "KRW", IN: "INR",
  SG: "SGD", HK: "HKD", AE: "AED", IL: "ILS", TR: "TRY", ZA: "ZAR",
};

/** Time zones say where someone is better than their language does: plenty of Swedes browse in English. */
const ZONE_REGION: Record<string, string> = {
  "Europe/Stockholm": "SE", "Europe/Oslo": "NO", "Europe/Copenhagen": "DK", "Europe/Helsinki": "FI",
  "Atlantic/Reykjavik": "IS", "Europe/London": "GB", "Europe/Dublin": "IE", "Europe/Berlin": "DE",
  "Europe/Paris": "FR", "Europe/Madrid": "ES", "Europe/Rome": "IT", "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE", "Europe/Vienna": "AT", "Europe/Zurich": "CH", "Europe/Lisbon": "PT",
  "Europe/Warsaw": "PL", "Europe/Prague": "CZ", "Europe/Budapest": "HU", "Europe/Athens": "GR",
  "Europe/Tallinn": "EE", "Europe/Riga": "LV", "Europe/Vilnius": "LT", "Asia/Tokyo": "JP",
  "Pacific/Auckland": "NZ", "America/Toronto": "CA", "America/Vancouver": "CA",
};

/** The visitor's country as a two-letter region code, from the time zone first and the browser language second. */
export function visitorRegion(): string | undefined {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (ZONE_REGION[zone]) return ZONE_REGION[zone];
  if (zone.startsWith("Australia/")) return "AU";
  for (const tag of navigator.languages ?? [navigator.language]) {
    const region = new Intl.Locale(tag).region;
    if (region) return region;
  }
  if (zone.startsWith("America/")) return "US";
  return undefined;
}

/** SEK to `currency`, from two free services in case one is down. */
async function rateFromSEK(currency: string): Promise<number | undefined> {
  const sources = [
    "https://open.er-api.com/v6/latest/SEK",
    `https://api.frankfurter.app/latest?from=SEK&to=${currency}`,
  ];
  for (const url of sources) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const json = (await response.json()) as { rates?: Record<string, number> };
      const rate = json.rates?.[currency];
      if (typeof rate === "number" && rate > 0) return rate;
    } catch {
      // Try the next source.
    }
  }
  return undefined;
}

export function useLocalPrices() {
  const [currency, setCurrency] = useState("SEK");
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const region = visitorRegion();
    const wanted = region ? REGION_CURRENCY[region] : undefined;
    if (!wanted || wanted === "SEK") return;
    let cancelled = false;
    rateFromSEK(wanted).then((found) => {
      if (cancelled || !found) return;
      setCurrency(wanted);
      setRate(found);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isConverted = currency !== "SEK";

  /** A price given in Swedish kronor, as the visitor would read it. */
  function format(sek: number, { approximate = true } = {}): string {
    if (!isConverted) return `${Math.floor(sek)} kr`;
    const amount = sek * rate;
    const text = new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency,
      maximumFractionDigits: amount >= 100 || amount === 0 ? 0 : undefined,
    }).format(amount);
    return approximate && amount > 0 ? `≈ ${text}` : text;
  }

  return { currency, isConverted, format };
}
