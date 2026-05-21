'use client'
import { Search, Clock, Bell, Download, Plus, Filter, ArrowUpRight, ArrowDownLeft, RefreshCw, Info } from 'lucide-react'
import './HistoriqueTransactions.css'

export default function HistoriqueTransactions() {
  const data = [
    { date: '14 Oct 2023', ref: 'CF-2024-001', type: 'Envoi', contact: 'Marie Dupont', origine: '150,000 XAF', converti: '228.67 EUR', statut: 'Complété' },
    { date: '12 Oct 2023', ref: 'CF-2024-002', type: 'Réception', contact: 'Global Services LLC', origine: '500 USD', converti: '305,250 XAF', statut: 'Complété' },
    { date: '10 Oct 2023', ref: 'CF-2024-003', type: 'Conversion', contact: 'Compte Pro Personnel', origine: '1,200 EUR', converti: '1,260 USD', statut: 'En attente' },
    { date: '08 Oct 2023', ref: 'CF-2024-004', type: 'Envoi', contact: 'Jean-Marc K.', origine: '75,000 XAF', converti: '122.85 USD', statut: 'Complété' },
    { date: '05 Oct 2023', ref: 'CF-2024-005', type: 'Réception', contact: 'Freelance Corp', origine: '2,000 EUR', converti: '1,311,914 XAF', statut: 'Échoué' },
  ]

  return (
    <div className="main">
      <header className="topbar">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search transactions or contacts..." className="search" />
        </div>
        <div className="topbar-right">
          <button className="icon-btn"><Clock size={20} /></button>
          <button className="icon-btn"><Bell size={20} /></button>
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
        <div className="header">
          <div>
            <h1>Historique des Transactions</h1>
            <p>Consultez et gérez l'ensemble de vos mouvements financiers multi-devises.</p>
          </div>
          <div className="actions">
            <button className="btn-dark"><Download size={16} /> Exporter (CSV)</button>
            <button className="btn-yellow"><Plus size={16} /> Nouveau Transfert</button>
          </div>
        </div>

        <div className="filters">
          <div className="filters-title">
            <Filter size={16} />
            <span>Filtres de recherche</span>
          </div>
          <div className="filters-grid">
            <button className="filter-btn">Toute période</button>
            <button className="filter-btn">Toutes devises</button>
            <button className="filter-btn">Statut (Complété...)</button>
            <input type="text" placeholder="Rechercher un contact..." className="filter-input" />
          </div>
        </div>

        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Date & Ref</th>
                <th>Type</th>
                <th>Contrepartie</th>
                <th>Origine</th>
                <th>Converti</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  <td>
                    <span className="date">{row.date}</span>
                    <span className="ref">{row.ref}</span>
                  </td>
                  <td>
                    <div className="type-cell">
                      <div className={`type-icon ${row.type === 'Envoi' ? 'send' : row.type === 'Réception' ? 'receive' : 'convert'}`}>
                        {row.type === 'Envoi' ? <ArrowUpRight size={14} /> : row.type === 'Réception' ? <ArrowDownLeft size={14} /> : <RefreshCw size={14} />}
                      </div>
                      <span>{row.type}</span>
                    </div>
                  </td>
                  <td>{row.contact}</td>
                  <td className="montant">{row.origine}</td>
                  <td className="montant-converti">{row.converti}</td>
                  <td>
                    <span className={`statut ${row.statut === 'Complété' ? 'statut-complete' : row.statut === 'En attente' ? 'statut-attente' : 'statut-echoue'}`}>
                      {row.statut}
                    </span>
                  </td>
                  <td><Info size={16} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <span>Affichage de 1-5 sur 24 transactions</span>
            <div className="page-btns">
              <button>Précédent</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <span>...</span>
              <button>5</button>
              <button>Suivant</button>
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