import Link from "next/link";

export function MarketingFooter({ year = 2026 }: { year?: number }) {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-5 text-xs text-cash-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} Cashflow Inc. All rights reserved.
        </span>
        <nav className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Liens pied de page">
          <Link href="#terms" className="hover:text-white">
            Terms of Service
          </Link>
          <Link href="#privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#help" className="hover:text-white">
            Help Center
          </Link>
        </nav>
      </div>
    </footer>
  );
}
