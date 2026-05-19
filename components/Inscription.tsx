"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import "../styles/Inscription.css";

export default function Inscription() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    password: "",
    confirm: "",
    devise: "XAF",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: logique d'inscription
    console.log("Inscription:", form);
  };

  return (
    <div className="inscription-page">

      {/* ── HEADER ── */}
      <header className="inscription-header">
        <div className="inscription-logo">
          <Image
            src="/logo.jpeg"
            alt="Cashflow"
            width={200}
            height={60}
            className="inscription-logo-img"
          />
         
        </div>
        <div className="inscription-header-actions">
          
          {/* Sign In → mène à /connexion depuis la page inscription */}
          <Link href="/connexion" className="inscription-signin-btn">
            Sign In
          </Link>
        </div>
      </header>

      {/* ── CORPS — 2 colonnes ── */}
      <main className="inscription-main">

        {/* Colonne gauche — marketing */}
        <div className="inscription-left">
          <h1 className="inscription-hero">
            Rejoignez la nouvelle ère du transfert{" "}
            <span className="inscription-accent">multi-devises.</span>
          </h1>
          <p className="inscription-hero-sub">
            Gérez vos fonds entre XAF, EUR et USD avec des taux transparents
            et une sécurité bancaire.
          </p>

          <ul className="inscription-feature-list">
            <li className="inscription-feature-item">
              <span className="inscription-feature-icon">🛡️</span>
              <div>
                <strong>Sécurité Totale</strong>
                <p>Vos transactions sont protégées par un cryptage de bout en bout.</p>
              </div>
            </li>
            <li className="inscription-feature-item">
              <span className="inscription-feature-icon">🌐</span>
              <div>
                <strong>Multi-devises</strong>
                <p>Échangez instantanément entre les zones CEMAC, Europe et USA.</p>
              </div>
            </li>
            <li className="inscription-feature-item">
              <span className="inscription-feature-icon">👤</span>
              <div>
                <strong>Support Dédié</strong>
                <p>Une équipe d&apos;experts à votre écoute pour toutes vos opérations.</p>
              </div>
            </li>
          </ul>

          <div className="inscription-note">
            <span>ℹ️</span>
            <em>
              Note : Le changement de devise principale nécessite
              l&apos;intervention de l&apos;administrateur après la création.
            </em>
          </div>
        </div>

        {/* Colonne droite — formulaire */}
        <div className="inscription-right">
          <h2 className="inscription-form-title">Créer un compte</h2>
          <p className="inscription-form-sub">
            Remplissez les informations ci-dessous pour commencer à transférer.
          </p>

          <form onSubmit={handleSubmit} className="inscription-form">

            {/* Nom complet */}
            <div className="inscription-field-group">
              <label htmlFor="nom">Nom complet</label>
              <input
                id="nom"
                name="nom"
                type="text"
                placeholder="Mbarga Alain"
                value={form.nom}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="inscription-field-group">
              <label htmlFor="email">Adresse Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Alain.Mbarga@exemple.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mot de passe + Confirmer côte à côte */}
            <div className="inscription-field-row">
              <div className="inscription-field-group">
                <label htmlFor="password">Mot de passe</label>
                <div className="inscription-input-wrap">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="inscription-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Afficher"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="inscription-field-group">
                <label htmlFor="confirm">Confirmer</label>
                <div className="inscription-input-wrap">
                  <input
                    id="confirm"
                    name="confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="inscription-eye-btn"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label="Afficher"
                  >
                    {showConfirm ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
            </div>

            {/* Devise */}
            <div className="inscription-field-group">
              <div className="inscription-devise-label">
                <label htmlFor="devise">Devise du compte</label>
                <span className="inscription-badge">RECOMMANDÉ</span>
              </div>
              <select
                id="devise"
                name="devise"
                value={form.devise}
                onChange={handleChange}
              >
                <option value="XAF">Franc CFA (XAF) — Afrique Centrale</option>
                <option value="EUR">Euro (EUR) — Europe</option>
                <option value="USD">Dollar (USD) — États-Unis</option>
              </select>
              <span className="inscription-hint">
                ℹ️ C&apos;est la devise dans laquelle vos soldes seront affichés par défaut.
              </span>
            </div>

            {/* Bouton créer */}
            <button type="submit" className="inscription-submit-btn">
              Créer le compte
            </button>

            {/* Lien connexion */}
            <p className="inscription-switch-link">
              Vous avez déjà un compte ?{" "}
              <Link href="/connexion">Se connecter</Link>
            </p>
          </form>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="inscription-footer">
        <span>© 2026 Cashflow Inc. All rights reserved.</span>
        <div className="inscription-footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Help Center</a>
        </div>
      </footer>
    </div>
  );
}
