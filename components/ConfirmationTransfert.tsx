'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, AlertCircle, ArrowLeft, Send, Shield } from 'lucide-react'
import { useState } from 'react'
import '../styles/ConfirmationTransfert.css'

export default function ConfirmationTransfert() {
  const params = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

  const montant = params.get('montant') ?? '0'
  const deviseSource = params.get('deviseSource') ?? 'XAF'
  const deviseCible = params.get('deviseCible') ?? 'EUR'
  const montantConverti = params.get('montantConverti') ?? '0'
  const frais = params.get('frais') ?? '0'
  const beneficiaire = params.get('beneficiaire') ?? ''
  const beneficiaireEmail = params.get('beneficiaireEmail') ?? ''
  const motif = params.get('motif') ?? ''
  const taux = params.get('taux') ?? '1'

  const ref = `CF-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`

  const handleConfirmer = async () => {
    setLoading(true)
    setErreur('')
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1500))
    const successParams = new URLSearchParams({
      montant, deviseSource, deviseCible, montantConverti,
      beneficiaire, beneficiaireEmail, ref, frais
    })
    router.push(`/transfert/succes?${successParams.toString()}`)
  }

  return (
    <div className="main">
      <header className="topbar">
        <button className="topbar-back" onClick={() => router.back()}>
          <ArrowLeft size={16} /> Retour
        </button>
        <div className="topbar-right">
          <div className="user">
            <div className="user-info">
              <span className="user-name">Alex Rivera</span>
              <span className="user-role">Personal Account</span>
            </div>
            <img src="https://i.pravatar.cc/40" alt="avatar" className="user-avatar" />
          </div>
        </div>
      </header>

      <div className="content">
        <div className="cf-header">
          <div>
            <h1>Confirmer le transfert</h1>
            <p>Vérifiez les détails avant de valider définitivement.</p>
          </div>
          <div className="tf-steps">
            <div className="tf-step done"><span>✓</span> Initiation</div>
            <div className="tf-step-line active-line"></div>
            <div className="tf-step active"><span>2</span> Confirmation</div>
            <div className="tf-step-line"></div>
            <div className="tf-step"><span>3</span> Succès</div>
          </div>
        </div>

        <div className="cf-container">
          <div className="cf-card">
            {/* Avertissement */}
            <div className="cf-warning">
              <AlertCircle size={16} />
              <span>Cette opération est irréversible une fois confirmée.</span>
            </div>

            {/* Montant */}
            <div className="cf-amount-block">
              <div className="cf-from">
                <span className="cf-label">Vous envoyez</span>
                <span className="cf-big-amount">{montant} <span className="cf-currency">{deviseSource}</span></span>
              </div>
              <div className="cf-arrow">→</div>
              <div className="cf-to">
                <span className="cf-label">Le bénéficiaire reçoit</span>
                <span className="cf-big-amount yellow">{montantConverti} <span className="cf-currency">{deviseCible}</span></span>
              </div>
            </div>

            {/* Détails */}
            <div className="cf-details">
              <h3 className="cf-section-title">Détails de la transaction</h3>
              <div className="cf-detail-row">
                <span>Bénéficiaire</span>
                <div className="cf-contact-mini">
                  <div className="cf-avatar">{beneficiaire.charAt(0)}</div>
                  <div>
                    <span className="cf-contact-name">{beneficiaire}</span>
                    <span className="cf-contact-email">{beneficiaireEmail}</span>
                  </div>
                </div>
              </div>
              <div className="cf-detail-row">
                <span>Taux de change</span>
                <span>1 {deviseSource} = {parseFloat(taux).toFixed(4)} {deviseCible}</span>
              </div>
              <div className="cf-detail-row">
                <span>Frais de transfert</span>
                <span>{frais} {deviseSource}</span>
              </div>
              {motif && (
                <div className="cf-detail-row">
                  <span>Motif</span>
                  <span>{motif}</span>
                </div>
              )}
              <div className="cf-detail-row">
                <span>Référence</span>
                <span className="cf-ref">{ref}</span>
              </div>
            </div>

            {/* Sécurité */}
            <div className="cf-security">
              <Shield size={14} />
              <span>Transaction sécurisée — Taux garanti 30 min</span>
            </div>

            {erreur && <div className="cf-error">{erreur}</div>}

            {/* Boutons */}
            <div className="cf-actions">
              <button className="cf-btn-annuler" onClick={() => router.push('/transfert')}>
                Annuler
              </button>
              <button className="cf-btn-confirmer" onClick={handleConfirmer} disabled={loading}>
                {loading ? (
                  <span className="cf-loading">Traitement en cours...</span>
                ) : (
                  <><Send size={15} /> Confirmer le transfert</>
                )}
              </button>
            </div>
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