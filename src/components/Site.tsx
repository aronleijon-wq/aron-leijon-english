import { Link } from "@tanstack/react-router";

export const OWNER = "Aron Leijon";
export const EMAIL = "aronleijon@icloud.com";
export const APP_STORE_URL = "https://apps.apple.com/app/id6825835642";

export function Pip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 180" className={`animate-breathe ${className}`} role="img" aria-label="Pip, the Paus mascot">
      <path d="M100 12c52 0 88 40 88 90 0 46-36 70-88 70s-88-24-88-70c0-50 36-90 88-90z" className="fill-pip" />
      <g className="animate-blink">
        <circle cx="72" cy="88" r="20" className="fill-foreground" />
        <circle cx="128" cy="88" r="20" className="fill-foreground" />
        <circle cx="75" cy="92" r="9" className="fill-background" />
        <circle cx="131" cy="92" r="9" className="fill-background" />
      </g>
      <ellipse cx="48" cy="122" rx="12" ry="8" className="fill-cheek" />
      <ellipse cx="152" cy="122" rx="12" ry="8" className="fill-cheek" />
      <path d="M88 124q12 10 24 0" strokeWidth="5" strokeLinecap="round" fill="none" className="stroke-background" />
    </svg>
  );
}

const nav = "rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground";
const active = { className: `${nav} text-foreground bg-secondary` };

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 mx-auto flex max-w-5xl items-center justify-between px-5 py-4 backdrop-blur-md">
      <Link to="/" className="text-2xl font-black text-gradient">Paus</Link>
      <nav className="flex gap-1 text-sm font-bold">
        <Link to="/" className={nav} activeProps={active} activeOptions={{ exact: true }}>Home</Link>
        <a href="/#pricing" className={`${nav} hidden sm:inline`}>Pricing</a>
        <Link to="/support" className={nav} activeProps={active}>Support</Link>
        <Link to="/privacy" className={nav} activeProps={active}>Privacy</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 flex max-w-5xl flex-col items-center gap-3 px-5 pb-10 text-sm text-muted-foreground">
      <div className="flex gap-5 font-bold">
        <Link to="/support" className="hover:text-foreground">Support</Link>
        <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
      </div>
      <p>© 2026 {OWNER}</p>
    </footer>
  );
}

/** Apple's black "Download on the App Store" badge, drawn in HTML so it stays sharp and themeable. */
export function AppStoreBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={APP_STORE_URL}
      className={`group inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-black px-6 py-3 text-left text-white shadow-[0_10px_40px_-10px_rgba(255,79,163,0.6)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_16px_50px_-10px_rgba(139,92,255,0.8)] ${className}`}
    >
      <svg viewBox="0 0 384 512" className="h-8 w-8 fill-white" aria-hidden="true">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <span className="leading-tight">
        <span className="block text-xs font-semibold opacity-80">Download on the</span>
        <span className="block text-2xl font-extrabold tracking-tight">App Store</span>
      </span>
    </a>
  );
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
