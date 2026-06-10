import { useState } from "react";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Tabs } from "../components/ui/Tabs";
import { Toggle } from "../components/ui/Toggle";
import { AppFooter } from "../components/layout/AppFooter";
import styles from "./ProfileSettingsPage.module.css";

export type ProfileSettingsPageProps = {
  onSave: () => void;
};

export function ProfileSettingsPage({ onSave }: ProfileSettingsPageProps) {
  const [tab, setTab] = useState("general");
  const [fullName, setFullName] = useState("Alex Rivera");
  const [email, setEmail] = useState("a.rivera@example.com");
  const [phone, setPhone] = useState("+237 600 000 000");
  const [birth, setBirth] = useState("1990-05-15");
  const [twoFactor, setTwoFactor] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(false);

  const general = (
    <div>
      <h2 className={styles.sectionTitle}>Informations personnelles</h2>
      <p className={styles.sectionDesc}>
        Ces informations sont utilisées pour votre profil et les communications liées au compte.
      </p>
      <div className={styles.formGrid}>
        <Input label="Nom complet" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <Input label="Adresse email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input
          label="Numéro de téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          iconLeft={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M8 3h3l1 4-2 1a12 12 0 006 6l1-2 4 1v3a2 2 0 01-2 2h-1C9.5 18 4 12.5 4 5V4a2 2 0 012-2z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          }
        />
        <Input label="Date de naissance" type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
      </div>
      <div className={styles.alert}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 10v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>
          <strong>Information importante :</strong> les changements concernant la devise principale ou l&apos;identité
          peuvent nécessiter une reverification KYC. Certaines modifications ne seront effectives qu&apos;après
          validation par notre équipe conformité.
        </span>
      </div>
      <div className={styles.actions}>
        <Button variant="primary" onClick={onSave}>
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );

  const preferences = (
    <div>
      <h2 className={styles.sectionTitle}>Préférences</h2>
      <p className={styles.sectionDesc}>Personnalisez la langue, les notifications et l&apos;affichage du tableau de bord.</p>
      <div className={styles.formGrid}>
        <Input label="Langue de l&apos;interface" value="Français (FR)" readOnly />
        <Input label="Fuseau horaire" value="Europe/Paris" readOnly />
      </div>
      <div className={styles.alert} style={{ marginTop: 16 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 10v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Les préférences avancées (export, rapports) arrivent prochainement dans cette démo UI.</span>
      </div>
    </div>
  );

  const security = (
    <div className={styles.securityStack}>
      <div className={styles.securityBlock}>
        <Toggle
          id="2fa"
          label="Authentification à deux facteurs"
          hint="Exiger un code supplémentaire à la connexion."
          checked={twoFactor}
          onChange={setTwoFactor}
        />
      </div>
      <div className={styles.securityBlock}>
        <Toggle
          id="alerts"
          label="Alertes de connexion"
          hint="Recevoir un e-mail lors d'une nouvelle connexion."
          checked={loginAlerts}
          onChange={setLoginAlerts}
        />
      </div>
      <p className={styles.sectionDesc} style={{ margin: 0 }}>
        Les options ci-dessous s&apos;appliquent immédiatement à votre session active. Les changements sensibles peuvent
        déclencher une reconnexion sécurisée.
      </p>
    </div>
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Profil &amp; Paramètres</h1>
      <p className={styles.subtitle}>
        Gérez vos informations personnelles, préférences et sécurité de compte.
      </p>

      <div className={styles.hero}>
        <div className={styles.heroMain}>
          <Avatar name="Alex Rivera" size={88} ring />
          <div className={styles.heroText}>
            <div className={styles.heroName}>Alex Rivera</div>
            <div className={styles.badge}>Compte Vérifié</div>
            <div className={styles.emailRow}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 6h16v12H4V6zm0 0l8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              a.rivera@cashflow.com
            </div>
            <div className={styles.metaGrid}>
              <div>
                <div className={styles.meta}>MEMBRE DEPUIS</div>
                <div className={styles.metaValue}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    style={{ marginRight: 6, verticalAlign: "text-bottom" }}
                  >
                    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 3v4M16 3v4M3 11h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Janvier 2023
                </div>
              </div>
              <div>
                <div className={styles.meta}>DEVISE DU COMPTE</div>
                <div className={styles.metaValue}>XAF — Franc CFA</div>
              </div>
            </div>
          </div>
        </div>
        <Button variant="ghost" className={styles.heroBtn}>
          Modifier la photo
        </Button>
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
