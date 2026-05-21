'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Download, ArrowLeftRight, Send } from 'lucide-react'
import '../styles/HistoriqueTransactions.css'
import '../styles/SuccesTransfert.css'

export default function SuccesTransfert() {
  const params = useSearchParams()
  const router = useRouter()

  const montant = params.get('montant') ?? '0'
  const deviseSource = params.get('deviseSource') ?? 'XAF'
  const deviseCible = params.get('deviseCible') ?? 'EUR'
  const montantConverti = params.get('montantConverti') ?? '0'
  const beneficiaire = params.get('beneficiaire') ?? ''
  const beneficiaireEmail = params.get('beneficiaireEmail') ?? ''
  const ref = params.get('ref') ?? `CF-${Date.now()}`
  const frais = params.get('frais') ?? '0'
  const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  return (
    <div className="main">
      <div className="content">
        <div className="sc-container">
          {/* Icône succès */}
          <div className="sc-icon-wrapper">
            <CheckCircle size={56} className="sc-check" />
          </div>

          <h1 className="sc-title">Transfert envoyé !</h1>
          <p className="sc-subtitle">
            Votre transfert a été initié avec succès. Le bénéficiaire recevra les fonds sous peu.
          </p>

          {/* Montant */}
          <div className="sc-amount-card">
            <div className="sc-amount-from">
              <span className="sc-amount-label">Montant envoyé</span>
              <span className="sc-amount-value">{montant} {deviseSource}</span>
            </div>
            <div className="sc-amount-arrow">→</div>
            <div className="sc-amount-to">
              <span className="sc-amount-label">Montant reçu</span>
              <span className="sc-amount-converted">{montantConverti} {deviseCible}</span>
            </div>
          </div>

          {/* Détails */}
          <div className="sc-details-card">
            <div className="sc-detail-row">
              <span>Référence</span>
              <span className="sc-ref">{ref}</span>
            </div>
            <div className="sc-detail-row">
              <span>Date & Heure</span>
              <span>{date}</span>
            </div>
            <div className="sc-detail-row">
              <span>Bénéficiaire</span>
              <div className="sc-contact">
                <div className="sc-avatar">{beneficiaire.charAt(0)}</div>
                <div>
                  <span className="sc-contact-name">{beneficiaire}</span>
                  <span className="sc-contact-email">{beneficiaireEmail}</span>
                </div>
              </div>
            </div>
            <div className="sc-detail-row">
              <span>Frais</span>
              <span>{frais} {deviseSource}</span>
            </div>
            <div className="sc-detail-row">
              <span>Statut</span>
              <span className="sc-status">✓ Complété</span>
            </div>
          </div>

          {/* Actions */}
          <div className="sc-actions">
            <button className="sc-btn-download">
              <Download size={15} /> Télécharger le reçu
            </button>
            <button className="sc-btn-new" onClick={() => router.push('/transfert')}>
              <Send size={15} /> Nouveau transfert
            </button>
            <button className="sc-btn-history" onClick={() => router.push('/transactions')}>
              <ArrowLeftRight size={15} /> Voir les transactions
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <span>© 2025 Cashflow Inc. All rights reserved.</span>
        <div className="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Help Center</a>
        </div>
      </footer>
    </div>
  )
}
