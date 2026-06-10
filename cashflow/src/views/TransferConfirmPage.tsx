"use client";

import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { AppFooter } from "../components/layout/AppFooter";
import { apiPost } from "../lib/api-client";
import styles from "./TransferConfirmPage.module.css";

type Contact = { id: string; name: string; email: string; currency: string; avatarSeed: string };

type Preview = {
  contact: Contact;
  amountEur: number;
  feeEur: number;
  totalDebitEur: number;
  receiveXaf: number;
  eurToXaf: number;
  feePct: number;
  updatedAt: string;
  sourceLabel: string;
};

const fmt = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtInt = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

function genRef() {
  const d = new Date();
  const ymd = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(10000 + Math.random() * 89999);
  return `CF-${ymd}-${rand}`;
}

export function TransferConfirmPage({
  amount,
  contactId,
  onConfirm,
  onEdit,
  confirming = false,
}: {
  amount: number;
  contactId: string;
  onConfirm: (preview: Preview, ref: string) => void | Promise<void>;
  onEdit: () => void;
  confirming?: boolean;
}) {
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [ref] = useState(genRef);

  useEffect(() => {
  apiPost<Preview>("/api/v1/transfer/preview", { amountEur: amount, contactId })
    .then((p) => setPreview(p))
    .catch((e) => setErr(e instanceof Error ? e.message : "Erreur"))
    .finally(() => setLoading(false));
}, [amount, contactId]);

  if (loading) return <div className="p-8 text-cash-muted">Chargement…</div>;
  if (err || !preview) return <p className="p-8 text-danger">{err ?? "Données introuvables."}</p>;

  const receiveCurrency = preview.contact.currency;
  const receiveLabel =
    receiveCurrency === "XAF"
      ? `${fmtInt.format(preview.receiveXaf)} XAF`
      : `${fmt.format(preview.receiveXaf)} ${receiveCurrency}`;

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <div className={styles.main}>
          <div className={styles.kicker}>TRANSFERT D&apos;ARGENT &gt; CONFIRMATION</div>
          <h1 className={styles.title}>Vérifiez les détails du transfert</h1>
          <p className={styles.subtitle}>
            Vérifiez attentivement les informations ci-dessous avant de confirmer. Les transferts sont traités selon le
            taux affiché et peuvent être soumis à des délais bancaires.
          </p>

          <div className={styles.summary}>
            <div className={styles.summaryHead}>
              <div>
                <div className={styles.summaryTitle}>Résumé de la transaction</div>
                <div className={styles.ref}>Réf. {ref}</div>
              </div>
              <div className={styles.badge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 11V8a5 5 0 0110 0v3M6 11h12v9a1 1 0 01-1 1H7a1 1 0 01-1-1v-9z" stroke="currentColor" strokeWidth="2" />
                </svg>
                Taux Verrouillé
              </div>
            </div>

            <div className={styles.partyRow}>
              <div className={styles.party}>
                <div className={styles.partyLabel}>EXPÉDITEUR</div>
                <div className={styles.partyName}>Votre compte</div>
                <div className={styles.partyEmail}>Compte Euro principal</div>
                <div className={styles.rowMeta}>
                  <span className={styles.currency}>EUR</span>
                  <span className={styles.accountType}>Compte Courant</span>
                </div>
              </div>

              <div className={styles.arrowCircle} aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <div className={styles.party}>
                <div className={styles.partyLabel}>DESTINATAIRE</div>
                <div className={styles.partyName}>{preview.contact.name}</div>
                <div className={styles.partyEmail}>{preview.contact.email}</div>
                <div className={styles.rowMeta}>
                  <span className={styles.currency}>{receiveCurrency}</span>
                  <span className={styles.accountType}>Compte bénéficiaire</span>
                </div>
              </div>
            </div>

            <div className={styles.rows}>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Montant envoyé</span>
                <span className={styles.rowValue}>{fmt.format(preview.amountEur)} EUR</span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Frais de service ({preview.feePct}%)</span>
                <span className={styles.rowValue}>{fmt.format(preview.feeEur)} EUR</span>
              </div>
              <div className={styles.rateHighlight}>
                <span>Taux de change appliqué</span>
                <span>1 EUR = {preview.eurToXaf} {receiveCurrency}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Montant reçu (estimé)</span>
                <span className={styles.rowValue}>{receiveLabel}</span>
              </div>
              <div className={[styles.row, styles.totalRow].join(" ")}>
                <span className={styles.totalLabel}>Total à débiter</span>
                <span className={styles.totalValue}>{fmt.format(preview.totalDebitEur)} EUR</span>
              </div>
            </div>

            <div className={styles.infoBox}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="9" stroke="#9ca3af" strokeWidth="2" />
                <path d="M12 10v5M12 8h.01" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>
                Le taux affiché est garanti pendant <strong style={{ color: "#e5e7eb" }}>15 minutes</strong>. Passé ce
                délai, un nouveau taux pourra s&apos;appliquer avant validation finale par votre banque.
              </span>
            </div>

            <div className={styles.actions}>
              <Button variant="secondary" onClick={onEdit}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Modifier les détails
              </Button>
              <Button variant="primary" disabled={confirming} onClick={() => void onConfirm(preview, ref)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {confirming ? "Traitement…" : "Confirmer le transfert"}
              </Button>
            </div>

            <div className={styles.footerLinks}>
              <a href="#terms-transfer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M8 6h13M8 12h13M8 18h13M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" strokeWidth="2" />
                </svg>
                Conditions de transfert
              </a>
              <a href="#security-reports">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 3l7 4v6c0 5-3.5 8.5-7 9.5-3.5-1-7-4.5-7-9.5V7l7-4z" stroke="currentColor" strokeWidth="2" />
                </svg>
                Rapports de sécurité
              </a>
            </div>
          </div>
        </div>

        <aside className={styles.rail} aria-label="Informations contextuelles">
          <div className={styles.security}>
            <div className={styles.securityTitle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 3l7 4v6c0 5-3.5 8.5-7 9.5-3.5-1-7-4.5-7-9.5V7l7-4z" stroke="currentColor" strokeWidth="2" />
              </svg>
              Sécurité Garantie
            </div>
            <ul className={styles.list}>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Protection contre la fraude
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Conformité AML/KYC
              </li>
            </ul>
          </div>

          <div className={styles.support}>
            <h3>Besoin d&apos;aide ?</h3>
            <p>Notre équipe support est disponible 7j/7 pour vous accompagner sur ce transfert.</p>
            <Button variant="secondary" size="sm" fullWidth>
              Contacter l&apos;assistance
            </Button>
          </div>

          <div className={styles.disclaimer}>
            Les transferts internationaux peuvent être irréversibles une fois confirmés. Vérifiez le bénéficiaire et la
            devise avant validation.
          </div>
        </aside>
      </div>

      <AppFooter />
    </div>
  );
}