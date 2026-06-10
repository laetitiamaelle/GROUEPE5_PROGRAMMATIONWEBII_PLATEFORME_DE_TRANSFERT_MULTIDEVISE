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
  const [currency, setCurrency] = useState("EUR");
  const [twoFactor, setTwoFactor] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setEmail(user.email);
      setCurrency(user.currency);
    }
  }, [user]);

  async function handleSave() {
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      await apiPatch("/api/v1/profile", { full_name: fullName, email, currency });
      await refresh();
      setSuccessMsg("Profil mis à jour avec succès !");
      onSave();
    } catch (ex) {
      setErrorMsg(ex instanceof Error ? ex.message : "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
    : "—";

  const currencyOptions = [
    { value: "EUR", label: "EUR — Euro" },
    { value: "USD", label: "USD — Dollar américain" },
    { value: "XAF", label: "XAF — Franc CFA" },
  ];

  const currencyLabel =
    currencyOptions.find((c) => c.value === (user?.currency ?? "EUR"))?.label ?? user?.currency ?? "—";

  const general = (
    <div>
      <h2 className={styles.sectionTitle}>Informations personnelles</h2>
      <p className={styles.sectionDesc}>
        Ces informations sont utilisées pour votre profil et les communications liées au compte.
      </p>
      <div className={styles.formGrid}>
        <Input label="Nom complet" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <Input label="Adresse email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div>
          <label style={{ display: "block", marginBottom: 6, fontSize: 14, fontWeight: 500, color: "white" }}>
            Devise principale
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "var(--cash-bg, #0f172a)",
              color: "white",
              fontSize: 14,
              outline: "none",
              cursor: "pointer",
            }}
          >
            {currencyOptions.map((opt) => (
              <option key={opt.value} value={opt.value} style={{ background: "#1e293b" }}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.alert}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 10v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>
          <strong>Information importante :</strong> les changements d&apos;identité peuvent nécessiter une re-vérification KYC.
        </span>
      </div>

      {successMsg && (
        <p style={{ color: "#4ade80", fontSize: 14, marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="#4ade80" strokeWidth="2" />
            <path d="M8 12l3 3 5-5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {successMsg}
        </p>
      )}
      {errorMsg && (
        <p style={{ color: "#f87171", fontSize: 14, marginTop: 12 }}>⚠ {errorMsg}</p>
      )}

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
        <Input label="Devise principale" value={currencyLabel} readOnly />
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
                <div className={styles.metaValue}>{currencyLabel}</div>
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