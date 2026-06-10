import Link from "next/link";
import { Bell, CircleHelp } from "@/components/icons";

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="#111827" stroke="#facc15" strokeWidth="1.5" />
      <path
        d="M8 20c3-6 5-10 8-10s4 4 8 10"
        stroke="#facc15"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="24" cy="8" r="3" fill="#facc15" />
    </svg>
  );
}

export function MarketingHeader({ signInHref = "/login" }: { signInHref?: string }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/[0.06] bg-cash-bg/95 px-6 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2.5">
        <LogoMark />
        <span className="text-lg font-bold tracking-tight text-accent">Cashflow</span>
      </Link>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-white/10 text-cash-muted transition hover:bg-white/[0.06] hover:text-white"
          aria-label="Aide"
        >
          <CircleHelp className="size-5" />
        </button>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-white/10 text-cash-muted transition hover:bg-white/[0.06] hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
        </button>
        <Link
          href={signInHref}
          className="ml-1 rounded-[10px] border border-white/25 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.06]"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
