'use client'

import {
    Search,
    Bell,
    CircleHelp,
    ArrowRight,
    Send,
    User,
    ArrowLeftRight
} from 'lucide-react'

import '../styles/Transfer.css'

export default function TransferPage() {
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
                            <span className="user-name">Alex Rivera</span>
                            <span className="user-role">Personal Account</span>
                        </div>

                        <img
                            src="https://i.pravatar.cc/40"
                            alt="avatar"
                            className="user-avatar"
                        />
                    </div>
                </div>
            </header>

            <div className="transfer-content">
                <div className="transfer-left">
                    <h1>Initier un transfert</h1>
                    <p className="subtitle">
                        Envoyez des fonds instantanément entre vos comptes multidevises.
                    </p>

                    <div className="section">
                        <div className="section-title">
                            <ArrowLeftRight size={16} />
                            <span>COMPTE DE DÉPART</span>
                        </div>

                        <div className="account-card">
                            <div className="account-left">
                                <div className="currency-circle">€</div>

                                <div>
                                    <h3>Compte Euro (EUR)</h3>
                                    <p>Solde disponible : 4,250.00 €</p>
                                </div>
                            </div>

                            <span className="default-tag">Par défaut</span>
                        </div>
                    </div>

                    <div className="section">
                        <div className="recipient-header">
                            <div className="section-title">
                                <User size={16} />
                                <span>DESTINATAIRE</span>
                            </div>

                            <span className="manage-contact">
                                Gérer les contacts
                            </span>
                        </div>

                        <input
                            className="recipient-search"
                            placeholder="Rechercher par nom ou email..."
                        />

                        <div className="recipient-grid">
                            <div className="recipient-card active">
                                <div className="recipient-info">
                                    <img
                                        src="https://i.pravatar.cc/40?img=11"
                                        alt=""
                                    />

                                    <div>
                                        <h4>Marie Dubois</h4>
                                        <p>m.dubois@email.com</p>
                                    </div>
                                </div>

                                <span className="currency-badge">XAF</span>
                            </div>

                            <div className="recipient-card">
                                <div className="recipient-info">
                                    <img
                                        src="https://i.pravatar.cc/40?img=12"
                                        alt=""
                                    />

                                    <div>
                                        <h4>Jean-Paul Kamga</h4>
                                        <p>jp.kamga@afrique.net</p>
                                    </div>
                                </div>

                                <span className="currency-badge">XAF</span>
                            </div>

                            <div className="recipient-card">
                                <div className="recipient-info">
                                    <img
                                        src="https://i.pravatar.cc/40?img=13"
                                        alt=""
                                    />

                                    <div>
                                        <h4>Sarah Johnson</h4>
                                        <p>s.johnson@global.com</p>
                                    </div>
                                </div>

                                <span className="currency-badge">USD</span>
                            </div>
                        </div>
                    </div>

                    <div className="section">
                        <div className="section-title">
                            <Send size={16} />
                            <span>MONTANT À ENVOYER</span>
                        </div>

                        <div className="amount-box">
                            <span className="euro-symbol">€</span>

                            <input
                                type="text"
                                value="1500"
                                readOnly
                            />

                            <span className="max-btn">Max</span>
                        </div>

                        <p className="minimum">
                            Le montant minimum de transfert est de 10.00 €
                        </p>
                    </div>
                </div>

                <div className="transfer-right">
                    <div className="steps">
                        <div className="step active">1</div>
                        <div className="line"></div>
                        <div className="step">2</div>
                        <div className="line"></div>
                        <div className="step">3</div>
                    </div>

                    <div className="conversion-card">
                        <div className="conversion-header">
                            <h3>Détails de la conversion</h3>
                            <span>Taux en direct</span>
                        </div>

                        <div className="conversion-body">
                            <div className="conversion-values">
                                <div>
                                    <span>VOUS ENVOYEZ</span>
                                    <h2>1 500,00 €</h2>
                                </div>

                                <ArrowRight size={22} />

                                <div>
                                    <span>ILS REÇOIVENT</span>
                                    <h2 className="xaf">
                                        983 935,5 XAF
                                    </h2>
                                </div>
                            </div>

                            <div className="details">
                                <div>
                                    <span>Taux de change</span>
                                    <strong>1 EUR = 655.957 XAF</strong>
                                </div>

                                <div>
                                    <span>Frais de service (1.5%)</span>
                                    <strong className="red">+22,50 €</strong>
                                </div>
                            </div>

                            <div className="total">
                                <span>Total à débiter</span>
                                <h1>1522,50 €</h1>
                            </div>

                            <button className="continue-btn">
                                Continuer vers la confirmation
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <span>© 2026 Cashflow Inc. All rights reserved.</span>

                <div className="footer-links">
                    <a href="#">Terms of Service</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Help Center</a>
                </div>
            </footer>
        </div>
    )
}