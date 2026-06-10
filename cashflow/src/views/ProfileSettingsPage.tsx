"use client";

import { useState, useEffect } from "react";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Tabs } from "../components/ui/Tabs";
import { Toggle } from "../components/ui/Toggle";
import { AppFooter } from "../components/layout/AppFooter";
import { useCurrentUser } from "../contexts/UserContext";
import { apiPatch } from "../lib/api-client";
import styles from "./ProfileSettingsPage.module.css";

export type ProfileSettingsPageProps = {
  onSave: () => void;
};

export function ProfileSettingsPage({ onSave }: ProfileSettingsPageProps) {
  const { user, loading, refresh } = useCurrentUser();
  const [tab, setTab] = useState("general");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+237 600 000 000");
  const [birth, setBirth] = useState("");
  const [twoFactor, setTwoFactor] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  async function handleSave() {
    setSaving(true);
    try {
      await apiPatch("/api/v1/profile", { full_name: fullName, email });
      await refresh();
      onSave();
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
    : "—";

  const currencyLabel: Record<string, string> = {
    EUR: "EUR — Euro",
    USD: "USD — Dollar",
    XAF: "XAF — Franc CFA",
  };

  const general = (
    <div>
      <h2 className={styles.sectionTitle}>Informations personnelles</h2>
      <p className={styles.sectionDesc}>Ces informations sont utilisées pour votre profil et les communications liées au compte.</p>
      <div className={styles.formGrid}>
        <Input label="Nom complet" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <Input label="Adresse email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Numéro de téléphone" value={phone} onChange={(e) => setPhone(e.target.value)}
          iconLeft={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M8 3h3l1 4-2 1a12 12 0 006 6l1-2 4 1v3a2 2 0 01-2 2h-1C9.5 18 4 12.5 4 5V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" /></svg>}
        />
        <Input label="Date de naissance" type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
      </div>
      <div className={styles.alert}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 10v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span><strong>Information importante :</strong> les changements d&apos;identité peuvent nécessiter une reverification KYC.</span>
      </div>
      <div className={styles.actions}>
        <Button variant="primary" onClick={handleSave} disabled={saving || loading}>
          {saving ? "Enregistrement..." : "Enregistrer les modifications"}
        </Button>
      </div>
    </div>
  );

  const preferences = (
    <div>
      <h2 className={styles.sectionTitle}>Préférences</h2>
      <p className={styles.sectionDesc}>Personnalisez la langue, les notifications et l&apos;affichage.</p>
      <div className={styles.formGrid}>
        <Input label="Langue de l'interface" value="Français (FR)" readOnly />
        <Input label="Fuseau horaire" value="Europe/Paris" readOnly />
        <Input label="Devise principale" value={currencyLabel[user?.currency ?? "EUR"] ?? user?.currency ?? "—"} readOnly />
      </div>
    </div>
  );

  const security = (
    <div className={styles.securityStack}>
      <div className={styles.securityBlock}>
        <Toggle id="2fa" label="Authentification à deux facteurs" hint="Exiger un code supplémentaire à la connexion." checked={twoFactor} onChange={setTwoFactor} />
      </div>
      <div className={styles.securityBlock}>
        <Toggle id="alerts" label="Alertes de connexion" hint="Recevoir un e-mail lors d'une nouvelle connexion." checked={loginAlerts} onChange={setLoginAlerts} />
      </div>
      <p className={styles.sectionDesc} style={{ margin: 0 }}>
        Rôle du compte : <strong>{user?.role === "admin" ? "Administrateur" : "Utilisateur"}</strong>
      </p>
    </div>
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Profil &amp; Paramètres</h1>
      <p className={styles.subtitle}>Gérez vos informations personnelles, préférences et sécurité de compte.</p>

      <div className={styles.hero}>
        <div className={styles.heroMain}>
          <Avatar name={loading ? "..." : (user?.name ?? "?")} size={88} ring />
          <div className={styles.heroText}>
            <div className={styles.heroName}>{loading ? "Chargement..." : (user?.name ?? "—")}</div>
            <div className={styles.badge}>{user?.role === "admin" ? "Administrateur" : "Compte Vérifié"}</div>
            <div className={styles.emailRow}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 6h16v12H4V6zm0 0l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {user?.email ?? "—"}
            </div>
            <div className={styles.metaGrid}>
              <div>
                <div className={styles.meta}>MEMBRE DEPUIS</div>
                <div className={styles.metaValue}>{memberSince}</div>
              </div>
              <div>
                <div className={styles.meta}>DEVISE DU COMPTE</div>
                <div className={styles.metaValue}>{currencyLabel[user?.currency ?? "EUR"] ?? user?.currency ?? "—"}</div>
              </div>
            </div>
          </div>
        </div>
        <Button variant="ghost" className={styles.heroBtn}>Modifier la photo</Button>
      </div>

      <div className={styles.cardSection}>
        <Tabs
          activeId={tab}
          onChange={setTab}
          tabs={[
            { id: "general", label: "Informations Générales", content: general },
            { id: "prefs", label: "Préférences", content: preferences },
            { id: "security", label: "Sécurité", content: security },
          ]}
        />
      </div>
      <AppFooter />
    </div>
  );
}