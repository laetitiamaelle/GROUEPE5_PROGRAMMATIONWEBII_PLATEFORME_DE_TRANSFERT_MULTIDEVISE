"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "../ui/Avatar";
import { useCurrentUser } from "@/contexts/UserContext";
import { apiPost } from "@/lib/api-client";
import styles from "./AppHeader.module.css";

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="2" y="2" width="28" height="28" rx="8" fill="#111827" stroke="#facc15" strokeWidth="1.5" />
      <path d="M8 20c3-6 5-10 8-10s4 4 8 10" stroke="#facc15" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="24" cy="8" r="3" fill="#facc15" />
    </svg>
  );
}

export function AppHeader() {
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  const userName = loading ? "..." : (user?.name ?? "Utilisateur");
  const userSubtitle = user?.role === "admin" ? "Administrateur" : "Compte Personnel";

  async function handleLogout() {
    try {
      await apiPost("/api/v1/auth/logout");
    } finally {
      router.push("/login");
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <LogoMark />
        <span className={styles.brandName}>Cashflow</span>
      </div>
      <div className={styles.searchWrap}>
        <label className={styles.search}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input type="search" placeholder="Search transactions or contacts..." autoComplete="off" />
        </label>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.iconBtn} aria-label="Aide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 16v-1M12 8c-1.5 0-2.5 1-2.5 2.2 0 1.2 1 1.8 2 2.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 10a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M10 20h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className={styles.user}>
          <Avatar name={userName} size={36} />
          <div className={styles.userText}>
            <span className={styles.userName}>{userName}</span>
            <span className={styles.userMeta}>{userSubtitle}</span>
          </div>
        </div>
        <button type="button" className={styles.iconBtn} aria-label="Déconnexion" onClick={handleLogout} title="Se déconnecter">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}