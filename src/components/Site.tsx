import { Link } from "@tanstack/react-router";

export const OWNER = "Aron Leijon";
export const EMAIL = "aronleijon@icloud.com";

export function Pip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 180" className={`animate-breathe ${className}`} role="img" aria-label="Pip, the Paus mascot">
      <path d="M100 12c52 0 88 40 88 90 0 46-36 70-88 70s-88-24-88-70c0-50 36-90 88-90z" className="fill-pip" />
      <circle cx="72" cy="88" r="20" className="fill-foreground" />
      <circle cx="128" cy="88" r="20" className="fill-foreground" />
      <circle cx="75" cy="92" r="9" className="fill-background" />
      <circle cx="131" cy="92" r="9" className="fill-background" />
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
    <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
      <Link to="/" className="text-2xl font-black text-gradient">Paus</Link>
      <nav className="flex gap-1 text-sm font-bold">
        <Link to="/" className={nav} activeProps={active} activeOptions={{ exact: true }}>Home</Link>
        <Link to="/support" className={nav} activeProps={active}>Support</Link>
        <Link to="/privacy" className={nav} activeProps={active}>Privacy</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 flex max-w-3xl flex-col items-center gap-3 px-5 pb-10 text-sm text-muted-foreground">
      <div className="flex gap-5 font-bold">
        <Link to="/support" className="hover:text-foreground">Support</Link>
        <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
      </div>
      <p>© 2026 {OWNER}</p>
    </footer>
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
