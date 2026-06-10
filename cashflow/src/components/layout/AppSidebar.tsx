"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { apiPost } from "@/lib/api-client";
import styles from "./AppSidebar.module.css";

export type NavKey =
  | "home"
  | "transfer"
  | "transactions"
  | "contacts"
  | "rates"
  | "admin"
  | "profile";

const pathByKey: Record<NavKey, string> = {
  home: "/home",
  transfer: "/transfer",
  transactions: "/transactions",
  contacts: "/contacts",
  rates: "/rates",
  admin: "/admin",
  profile: "/profile",
};

type Item = { key: NavKey; label: string; icon: "home" | "transfer" | "tx" | "users" | "rates" | "admin" | "user" };

const mainItems: Item[] = [
  { key: "home", label: "Home", icon: "home" },
  { key: "transfer", label: "Transfer", icon: "transfer" },
  { key: "transactions", label: "Transactions", icon: "tx" },
  { key: "contacts", label: "Contacts", icon: "users" },
];

const manageItems: Item[] = [
  { key: "rates", label: "Exchange Rates", icon: "rates" },
  { key: "admin", label: "Admin Panels", icon: "admin" },
  { key: "profile", label: "Profil & Paramètres", icon: "user" },
];

function NavIcon({ name }: { name: Item["icon"] }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24" as const, fill: "none" as const };
  switch (name) {
    case "home":
      return (
        <svg {...common} className={styles.icon} aria-hidden>
          <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "transfer":
      return (
        <svg {...common} className={styles.icon} aria-hidden>
          <path d="M7 7h10M7 7l3-3M7 7l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 17H7M17 17l-3 3M17 17l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "tx":
      return (
        <svg {...common} className={styles.icon} aria-hidden>
          <path d="M6 7h12M6 12h12M6 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "users":
      return (
        <svg {...common} className={styles.icon} aria-hidden>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="M4 19c1.5-3 4-4 5-4s3.5 1 5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="17" cy="9" r="2" stroke="currentColor" strokeWidth="2" />
          <path d="M15 19h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "rates":
      return (
        <svg {...common} className={styles.icon} aria-hidden>
          <path d="M4 18V6M8 18V10M12 18V8M16 18v-6M20 18V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "admin":
      return (
        <svg {...common} className={styles.icon} aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M9 9h6M9 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...common} className={styles.icon} aria-hidden>
          <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="M6 19c1.5-2.5 4-4 6-4s4.5 1.5 6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}

function activeNavKey(pathname: string | null): NavKey {
  if (!pathname) return "home";
  if (pathname.startsWith("/transfer")) return "transfer";
  if (pathname.startsWith("/rates")) return "rates";
  if (pathname.startsWith("/admin")) return "admin";
  const match = (Object.keys(pathByKey) as NavKey[]).find((k) => pathByKey[k] === pathname);
  return match ?? "home";
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const active = activeNavKey(pathname);

  async function onLogout() {
    try {
      await apiPost("/api/v1/auth/logout");
    } catch {
      /* session déjà expirée */
    }
    router.push("/login");
  }

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav} aria-label="Navigation principale">
        <div className={styles.groupLabel}>MAIN NAVIGATION</div>
        {mainItems.map((item) => (
          <Link
            key={item.key}
            href={pathByKey[item.key]}
            className={[styles.item, active === item.key ? styles.active : ""].filter(Boolean).join(" ")}
          >
            <NavIcon name={item.icon} />
            {item.label}
          </Link>
        ))}
        <div className={styles.groupLabel}>MANAGEMENT</div>
        {manageItems.map((item) => (
          <Link
            key={item.key}
            href={pathByKey[item.key]}
            className={[styles.item, active === item.key ? styles.active : ""].filter(Boolean).join(" ")}
          >
            <NavIcon name={item.icon} />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.footer}>
        <button type="button" className={styles.logout} onClick={() => void onLogout()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M10 17l-1-1 3-3H3v-2h9l-3-3 1-1 5 5-5 5z" fill="currentColor" />
            <path d="M14 4h5a1 1 0 011 1v14a1 1 0 01-1 1h-5" stroke="currentColor" strokeWidth="2" />
          </svg>
          Log Out
        </button>
      </div>
    </aside>
  );
}