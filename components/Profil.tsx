'use client'
import { useState } from 'react'
import { User, Mail, Phone, MapPin, Shield, Bell, Key, Camera, Edit2, Check, X, Search } from 'lucide-react'

import '../styles/Profil.css'

const USER_DATA = {
  nom: 'Alex Rivera',
  email: 'a.rivera@example.com',
  telephone: '+237 600 000 000',
  pays: 'Cameroun',
  ville: 'Yaoundé',
  compteType: 'Personal Account',
  solde: '2 450 000',
  devise: 'XAF',
  membreDepuis: 'Janvier 2023',
  transfertsEffectues: 47,
  totalEnvoye: '14 280 000 XAF',
}

type SectionKey = 'infos' | 'securite' | 'notifications'

export default function Profil() {
  const [sectionActive, setSectionActive] = useState<SectionKey>('infos')
  const [editField, setEditField] = useState<string | null>(null)
  const [formData, setFormData] = useState({ ...USER_DATA })
  const [savedData, setSavedData] = useState({ ...USER_DATA })
  const [notifications, setNotifications] = useState({
    transfertReussi: true,
    transfertRecu: true,
    alerteSecurite: true,
    newsletter: false,
    resumeHebdo: true,
  })
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleEdit = (field: string) => setEditField(field)

  const handleSave = () => {
    setSavedData({ ...formData })
    setEditField(null)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2500)
  }

  const handleCancel = () => {
    setFormData({ ...savedData })
    setEditField(null)
  }

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))

  }

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
              <span className="user-name">{savedData.nom}</span>
              <span className="user-role">{savedData.compteType}</span>
            </div>
            <img src="https://i.pravatar.cc/40" alt="avatar" className="user-avatar" />
          </div>
        </div>
      </header>

      <div className="content">
        <div className="pr-page-header">
          <div>
            <h1>Profil & Paramètres</h1>
            <p>Gérez vos informations personnelles, préférences et sécurité de compte.</p>
          </div>
        </div>

        <div className="pr-top-card">
          <div className="pr-top-card-left">
            <div className="pr-card-avatar-wrapper">
              <img src="https://i.pravatar.cc/100" alt="avatar" className="pr-card-avatar" />
              <button className="pr-avatar-edit">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h2>{savedData.nom}</h2>
              <span className="pr-card-badge">Compte Vérifié</span>
            </div>
          </div>

          <div className="pr-top-card-info">
            <div className="pr-top-info-row">
              <div>
                <span className="pr-top-label">Adresse email</span>
                <p>{savedData.email}</p>
              </div>
              <div>
                <span className="pr-top-label">Devise du compte</span>
                <p>{savedData.devise} - Franc CFA</p>
              </div>
            </div>
            <div className="pr-top-info-row">
              <div>
                <span className="pr-top-label">Membre depuis</span>
                <p>{savedData.membreDepuis}</p>
              </div>
              <button className="pr-card-action">Modifier la photo</button>
            </div>
          </div>
        </div>

        <div className="pr-tab-list">
          <button className={`pr-tab-button ${sectionActive === 'infos' ? 'active' : ''}`} onClick={() => setSectionActive('infos')}>
            Informations Générales
          </button>
          <button className={`pr-tab-button ${sectionActive === 'notifications' ? 'active' : ''}`} onClick={() => setSectionActive('notifications')}>
            Préférences
          </button>
          <button className={`pr-tab-button ${sectionActive === 'securite' ? 'active' : ''}`} onClick={() => setSectionActive('securite')}>
            Sécurité
          </button>
        </div>

        <div className="pr-section-card">
          {sectionActive === 'infos' && (
            <>
              <h3>Informations personnelles</h3>
              <div className="pr-form-grid">
                {[
                  { key: 'nom', label: 'Nom complet' },
                  { key: 'email', label: 'Adresse email' },
                  { key: 'telephone', label: 'Numéro de téléphone' },
                  { key: 'ville', label: 'Ville' },
                  { key: 'pays', label: 'Pays' },
                ].map(({ key, label }) => (
                  <div key={key} className="pr-form-row">
                    <label>{label}</label>
                    {editField === key ? (
                      <div className="pr-field-edit">
                        <input
                          className="pr-input"
                          value={formData[key as keyof typeof formData]}
                          onChange={e => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                          autoFocus
                        />
                        <button className="pr-btn-save" onClick={handleSave}><Check size={14} /></button>
                        <button className="pr-btn-cancel" onClick={handleCancel}><X size={14} /></button>
                      </div>
                    ) : (
                      <div className="pr-field-display">
                        <span>{savedData[key as keyof typeof savedData]}</span>
                        <button className="pr-btn-edit" onClick={() => handleEdit(key)}>
                          <Edit2 size={13} /> Modifier
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pr-warning-card">
                <strong>Information importante</strong>
                <p>Les changements concernant la devise principale de votre compte nécessitent une autorisation préalable de l'administration. Veuillez contacter le support technique pour toute demande de modification.</p>
              </div>

              <div className="pr-form-actions">
                <button className="pr-submit-button">Enregistrer les modifications</button>
              </div>
            </>
          )}

          {sectionActive === 'notifications' && (
            <>
              <h3>Préférences de notifications</h3>
              <div className="pr-form-grid notifications-grid">
                {[
                  { key: 'transfertReussi', label: 'Transfert réussi', desc: 'Recevoir une notification à chaque transfert envoyé' },
                  { key: 'transfertRecu', label: 'Transfert reçu', desc: 'Être notifié lors de la réception de fonds' },
                  { key: 'alerteSecurite', label: 'Alertes de sécurité', desc: 'Connexion depuis un nouvel appareil ou lieu' },
                  { key: 'resumeHebdo', label: 'Résumé hebdomadaire', desc: 'Rapport de vos transactions chaque lundi' },
                  { key: 'newsletter', label: 'Newsletter & offres', desc: 'Actualités et promotions Cashflow' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="pr-notif-row">
                    <div>
                      <span className="pr-notif-label">{label}</span>
                      <p className="pr-notif-desc">{desc}</p>
                    </div>
                    <button className={`pr-toggle ${notifications[key as keyof typeof notifications] ? 'on' : 'off'}`} onClick={() => toggleNotif(key as keyof typeof notifications)}>
                      <span className="pr-toggle-knob"></span>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {sectionActive === 'securite' && (
            <>
              <h3>Sécurité du compte</h3>
              <div className="pr-security-row">
                <div>
                  <span>Mot de passe</span>
                  <p>Dernière modification il y a 3 mois</p>
                </div>
                <button className="pr-btn-action">Modifier</button>
              </div>
              <div className="pr-security-row">
                <div>
                  <span>Authentification à deux facteurs</span>
                  <p>Activée — via application</p>
                </div>
                <button className="pr-btn-action">Gérer</button>
              </div>
              <div className="pr-security-row">
                <div>
                  <span>Email de récupération</span>
                  <p>{savedData.email}</p>
                </div>
                <button className="pr-btn-action">Modifier</button>
              </div>
            </>
          )}
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
