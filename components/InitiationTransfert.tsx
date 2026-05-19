'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Send, ChevronDown, RefreshCw, Info, User, Search } from 'lucide-react'
import '../styles/InitiationTransfert.css'

const DEVISES = [
  { code: 'XAF', nom: 'Franc CFA', drapeau: '🇨🇲' },
  { code: 'EUR', nom: 'Euro', drapeau: '🇪🇺' },
  { code: 'USD', nom: 'Dollar US', drapeau: '🇺🇸' },
  { code: 'GBP', nom: 'Livre Sterling', drapeau: '🇬🇧' },
  { code: 'CAD', nom: 'Dollar Canadien', drapeau: '🇨🇦' },
]

const TAUX: Record<string, Record<string, number>> = {
  XAF: { EUR: 0.00152, USD: 0.00165, GBP: 0.00130, CAD: 0.00224, XAF: 1 },
  EUR: { XAF: 655.96, USD: 1.085, GBP: 0.857, CAD: 1.475, EUR: 1 },
  USD: { XAF: 605.50, EUR: 0.922, GBP: 0.790, CAD: 1.360, USD: 1 },
  GBP: { XAF: 767.20, EUR: 1.167, USD: 1.266, CAD: 1.723, GBP: 1 },
  CAD: { XAF: 445.80, EUR: 0.678, USD: 0.735, GBP: 0.580, CAD: 1 },
}

const CONTACTS = [
  { id: 1, nom: 'Marie Dupont', email: 'marie.dupont@email.com', pays: '🇫🇷' },
  { id: 2, nom: 'Jean Kamga', email: 'jean.kamga@email.com', pays: '🇨🇲' },
  { id: 3, nom: 'Global Services LLC', email: 'contact@globalservices.com', pays: '🇺🇸' },
  { id: 4, nom: 'Sarah Mballa', email: 'sarah.mballa@email.com', pays: '🇨🇲' },
]

export default function InitiationTransfert() {
  const router = useRouter()
  const [montant, setMontant] = useState('')
  const [deviseSource, setDeviseSource] = useState('XAF')
  const [deviseCible, setDeviseCible] = useState('EUR')
  const [montantConverti, setMontantConverti] = useState('0.00')
  const [frais, setFrais] = useState('0.00')
  const [contactSearch, setContactSearch] = useState('')
  const [contactSelectionne, setContactSelectionne] = useState<typeof CONTACTS[0] | null>(null)
  const [showContacts, setShowContacts] = useState(false)
  const [motif, setMotif] = useState('')
  const [erreur, setErreur] = useState('')

  const contactsFiltres = CONTACTS.filter(c =>
    c.nom.toLowerCase().includes(contactSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(contactSearch.toLowerCase())
  )

  useEffect(() => {
    const val = parseFloat(montant)
    if (!isNaN(val) && val > 0) {
      const taux = TAUX[deviseSource]?.[deviseCible] ?? 1
      const converti = val * taux
      const fraisVal = val * 0.015
      setMontantConverti(converti.toFixed(2))
      setFrais(fraisVal.toFixed(2))
    } else {
      setMontantConverti('0.00')
      setFrais('0.00')
    }
  }, [montant, deviseSource, deviseCible])

  const inverserDevises = () => {
    setDeviseSource(deviseCible)
    setDeviseCible(deviseSource)
  }

  const handleSubmit = () => {
    setErreur('')
    const val = parseFloat(montant)
    if (!montant || isNaN(val) || val <= 0) {
      setErreur('Veuillez saisir un montant valide.')
      return
    }
    if (!contactSelectionne) {
      setErreur('Veuillez sélectionner un bénéficiaire.')
      return
    }
    const params = new URLSearchParams({
      montant,
      deviseSource,
      deviseCible,
      montantConverti,
      frais,
      beneficiaire: contactSelectionne.nom,
      beneficiaireEmail: contactSelectionne.email,
      motif,
      taux: TAUX[deviseSource]?.[deviseCible]?.toString() ?? '1',
    })
    router.push(`/transfert/confirmation?${params.toString()}`)
  }

  const devSource = DEVISES.find(d => d.code === deviseSource)
  const devCible = DEVISES.find(d => d.code === deviseCible)

  return (
    <div className="main">
      <header className="topbar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search transactions or contacts..." className="search" />
        </div>
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
        <div className="tf-header">
          <div>
            <h1>Nouveau Transfert</h1>
            <p>Envoyez de l'argent à l'international en quelques secondes.</p>
          </div>
          <div className="tf-steps">
            <div className="tf-step active"><span>1</span> Initiation</div>
            <div className="tf-step-line"></div>
            <div className="tf-step"><span>2</span> Confirmation</div>
            <div className="tf-step-line"></div>
            <div className="tf-step"><span>3</span> Succès</div>
          </div>
        </div>

        <div className="tf-grid">
          {/* Formulaire */}
          <div className="tf-card">
            <h2 className="tf-card-title">Détails du transfert</h2>

            {/* Montant & devises */}
            <div className="tf-field">
              <label>Montant à envoyer</label>
              <div className="tf-amount-row">
                <input
                  type="number"
                  placeholder="0.00"
                  value={montant}
                  onChange={e => setMontant(e.target.value)}
                  className="tf-input tf-amount"
                />
                <select
                  value={deviseSource}
                  onChange={e => setDeviseSource(e.target.value)}
                  className="tf-select"
                >
                  {DEVISES.map(d => (
                    <option key={d.code} value={d.code}>{d.drapeau} {d.code}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="tf-swap-row">
              <div className="tf-rate-info">
                <Info size={14} />
                <span>1 {deviseSource} = {TAUX[deviseSource]?.[deviseCible]?.toFixed(4)} {deviseCible}</span>
              </div>
              <button className="tf-swap-btn" onClick={inverserDevises} title="Inverser les devises">
                <RefreshCw size={16} />
              </button>
            </div>

            <div className="tf-field">
              <label>Montant reçu (estimé)</label>
              <div className="tf-amount-row">
                <input
                  type="text"
                  readOnly
                  value={montantConverti}
                  className="tf-input tf-amount tf-readonly"
                />
                <select
                  value={deviseCible}
                  onChange={e => setDeviseCible(e.target.value)}
                  className="tf-select"
                >
                  {DEVISES.filter(d => d.code !== deviseSource).map(d => (
                    <option key={d.code} value={d.code}>{d.drapeau} {d.code}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bénéficiaire */}
            <div className="tf-field">
              <label>Bénéficiaire</label>
              <div className="tf-contact-wrapper">
                {contactSelectionne ? (
                  <div className="tf-contact-selected">
                    <div className="tf-contact-avatar">{contactSelectionne.nom.charAt(0)}</div>
                    <div>
                      <span className="tf-contact-name">{contactSelectionne.nom}</span>
                      <span className="tf-contact-email">{contactSelectionne.email}</span>
                    </div>
                    <button className="tf-contact-clear" onClick={() => setContactSelectionne(null)}>✕</button>
                  </div>
                ) : (
                  <>
                    <div className="tf-contact-search">
                      <User size={14} className="tf-contact-icon" />
                      <input
                        type="text"
                        placeholder="Rechercher un contact..."
                        value={contactSearch}
                        onChange={e => { setContactSearch(e.target.value); setShowContacts(true) }}
                        onFocus={() => setShowContacts(true)}
                        className="tf-contact-input"
                      />
                    </div>
                    {showContacts && contactSearch && (
                      <div className="tf-contact-dropdown">
                        {contactsFiltres.length === 0 ? (
                          <div className="tf-contact-empty">Aucun contact trouvé</div>
                        ) : contactsFiltres.map(c => (
                          <button
                            key={c.id}
                            className="tf-contact-item"
                            onClick={() => { setContactSelectionne(c); setShowContacts(false); setContactSearch('') }}
                          >
                            <div className="tf-contact-avatar">{c.nom.charAt(0)}</div>
                            <div>
                              <span className="tf-contact-name">{c.pays} {c.nom}</span>
                              <span className="tf-contact-email">{c.email}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Motif */}
            <div className="tf-field">
              <label>Motif du transfert <span className="tf-optional">(optionnel)</span></label>
              <input
                type="text"
                placeholder="Ex: Aide familiale, Facture, ..."
                value={motif}
                onChange={e => setMotif(e.target.value)}
                className="tf-input"
              />
            </div>

            {erreur && <div className="tf-error">{erreur}</div>}

            <button className="tf-submit-btn" onClick={handleSubmit}>
              <Send size={16} /> Continuer vers la confirmation
            </button>
          </div>

          {/* Récapitulatif */}
          <div className="tf-summary-card">
            <h2 className="tf-card-title">Récapitulatif</h2>

            <div className="tf-summary-amount">
              <span className="tf-summary-label">Vous envoyez</span>
              <span className="tf-summary-value">{montant || '0'} {deviseSource}</span>
            </div>

            <div className="tf-summary-breakdown">
              <div className="tf-summary-line">
                <span>Frais de transfert (1.5%)</span>
                <span>{frais} {deviseSource}</span>
              </div>
              <div className="tf-summary-line">
                <span>Taux de change</span>
                <span>1 {deviseSource} = {TAUX[deviseSource]?.[deviseCible]?.toFixed(4)} {deviseCible}</span>
              </div>
              <div className="tf-summary-divider"></div>
              <div className="tf-summary-line tf-summary-total">
                <span>Le bénéficiaire reçoit</span>
                <span className="tf-summary-converted">{montantConverti} {deviseCible}</span>
              </div>
            </div>

            <div className="tf-summary-info">
              <Info size={14} />
              <span>Taux garanti 30 minutes après confirmation</span>
            </div>

            {contactSelectionne && (
              <div className="tf-summary-beneficiary">
                <span className="tf-summary-label">Bénéficiaire</span>
                <div className="tf-summary-contact">
                  <div className="tf-contact-avatar">{contactSelectionne.nom.charAt(0)}</div>
                  <div>
                    <span className="tf-contact-name">{contactSelectionne.nom}</span>
                    <span className="tf-contact-email">{contactSelectionne.email}</span>
                  </div>
                </div>
              </div>
            )}
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
