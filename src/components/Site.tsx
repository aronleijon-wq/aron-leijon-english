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

/** Paus on social media. Add LinkedIn or X here when those accounts exist; the footer lays out whatever is listed. */
const socials: { name: string; href: string; path: string }[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/pausapp.co/",
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.6-.1 4.8-.1M12 0C8.7 0 8.3 0 7.1.1 5.8.1 4.9.3 4.1.6c-.8.3-1.5.7-2.1 1.4C1.3 2.6.9 3.3.6 4.1.3 4.9.1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.2.6 2.9.3.8.7 1.5 1.4 2.1.6.7 1.3 1.1 2.1 1.4.8.3 1.6.5 2.9.6 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.5-.7 2.1-1.4.7-.6 1.1-1.3 1.4-2.1.3-.8.5-1.6.6-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.5-1.4-2.1-.6-.7-1.3-1.1-2.1-1.4-.8-.3-1.6-.5-2.9-.6C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61595245918049",
    path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z",
  },
];

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 flex max-w-5xl flex-col items-center gap-5 px-5 pb-10 text-sm text-muted-foreground">
      <div className="flex flex-col items-center gap-3">
        <p className="font-extrabold text-foreground">Follow Paus</p>
        <div className="flex gap-3">
          {socials.map(({ name, href, path }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Paus on ${name}`}
              className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-card transition duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-brand hover:shadow-[0_12px_30px_-10px_rgba(255,79,163,0.7)]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-muted-foreground transition group-hover:fill-white" aria-hidden="true">
                <path d={path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
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
