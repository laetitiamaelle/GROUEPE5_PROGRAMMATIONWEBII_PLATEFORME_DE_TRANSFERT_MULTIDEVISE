'use client'

import {
    Search,
    Bell,
    CircleHelp,
    RefreshCw,
    Clock,
    Shield
} from 'lucide-react'

import '../styles/ExchangesRates.css'

export default function ExchangeRates() {

    const rates = [
        {
            pair: 'XAF ↔ EUR',
            source: 'Banque Centrale des États de l’Afrique de l’Ouest',
            value: '655.957',
            variation: '+0.02%',
            positive: true,
            updated: 'Mis à jour : Il y a 12 minutes'
        },

        {
            pair: 'XAF ↔ USD',
            source: 'Thomson Reuters API',
            value: '612.420',
            variation: '-0.15%',
            positive: false,
            updated: 'Mis à jour : Il y a 8 minutes'
        },

        {
            pair: 'EUR ↔ USD',
            source: 'European Central Bank',
            value: '1.0825',
            variation: '+0.45%',
            positive: true,
            updated: 'Mis à jour : En direct'
        }
    ]

    return (
        <div className="main">

            <header className="topbar">
                <div className="search-box">
                    <Search size={16} className="search-icon" />

                    <input
                        type="text"
                        placeholder="Search transactions or contacts..."
                        className="search"
                    />
                </div>

                <div className="topbar-right">
                    <button className="icon-btn">
                        <CircleHelp size={18} />
                    </button>

                    <button className="icon-btn">
                        <Bell size={18} />
                    </button>

                    <div className="user">
                        <div className="user-info">
                            <span className="user-name">
                                Marcelle Kouamé
                            </span>

                            <span className="user-role">
                                Personal Account
                            </span>
                        </div>

                        <img
                            src="https://i.pravatar.cc/40?img=15"
                            alt="avatar"
                            className="user-avatar"
                        />
                    </div>
                </div>
            </header>

            <div className="exchange-content">

                <div className="exchange-header">
                    <div>
                        <span className="admin-label">
                            ADMINISTRATION CENTRALE
                        </span>

                        <h1>Tableau des Taux de Change</h1>

                        <p>
                            Gérez et surveillez les conversions en temps réel pour le réseau Cashflow.
                        </p>
                    </div>

                    <div className="header-actions">
                        <button className="interval-btn">
                            Intervalle auto : 12h
                        </button>

                        <button className="refresh-btn">
                            <RefreshCw size={16} />
                            Forcer la mise à jour
                        </button>
                    </div>
                </div>

                <div className="rates-grid">
                    {rates.map((rate, index) => (
                        <div className="rate-card" key={index}>

                            <div className="rate-top">
                                <div>
                                    <h3>{rate.pair}</h3>

                                    <p>{rate.source}</p>
                                </div>

                                <span className={`variation ${rate.positive ? 'positive' : 'negative'}`}>
                                    {rate.variation}
                                </span>
                            </div>

                            <h1 className="rate-value">
                                {rate.value}
                            </h1>

                            <div className="updated">
                                <Clock size={13} />
                                <span>{rate.updated}</span>
                            </div>

                            <div className={`graph-placeholder ${rate.positive ? 'green' : 'red'}`}></div>

                            <div className="rate-actions">
                                <button>Historique</button>
                                <button>Analyses</button>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="bottom-section">

                    <div className="data-status">

                        <h2>État des flux de données</h2>

                        <p>
                            Visualisation de la latence de synchronisation par source externe.
                        </p>

                        <div className="status-list">

                            <div className="status-item">
                                <span>Banque Centrale (BEAC)</span>

                                <div className="status-right">
                                    <span>Latence : 14ms</span>
                                    <span className="status-badge success">
                                        Opérationnel
                                    </span>
                                </div>
                            </div>

                            <div className="status-item">
                                <span>European Central Bank API</span>

                                <div className="status-right">
                                    <span>Latence : 42ms</span>
                                    <span className="status-badge success">
                                        Opérationnel
                                    </span>
                                </div>
                            </div>

                            <div className="status-item">
                                <span>XE.com Real-time Stream</span>

                                <div className="status-right">
                                    <span>Latence : 890ms</span>
                                    <span className="status-badge danger">
                                        Instable
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="security-card">

                        <h2>Actions de Sécurité</h2>

                        <p>
                            Contrôles d'urgence pour la stabilité de la plateforme.
                        </p>

                        <div className="security-box">

                            <Shield size={18} />

                            <div>
                                <h4>Gel du spread de conversion</h4>

                                <p>
                                    Fige temporairement les taux pour éviter la volatilité extrême.
                                </p>
                            </div>

                            <button>
                                Activer le gel manuel
                            </button>
                        </div>

                    </div>

                </div>

                <div className="stats-grid">

                    <div className="stat-card">
                        <span>VOLUME CONVERTI (24H)</span>
                        <h2>€ 1.2M</h2>
                        <p>+12% vs hier</p>
                    </div>

                    <div className="stat-card">
                        <span>TRANSACTIONS ADMIN</span>
                        <h2>48</h2>
                        <p>Toutes validées</p>
                    </div>

                    <div className="stat-card">
                        <span>ÉCART MOYEN SPREAD</span>
                        <h2>0.15%</h2>
                        <p>Optimisé</p>
                    </div>

                    <div className="stat-card">
                        <span>TEMPS DE RÉPONSE</span>
                        <h2>1.2s</h2>
                        <p>Source ECB</p>
                    </div>

                </div>

            </div>
        </div>
    )
}