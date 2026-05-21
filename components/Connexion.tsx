"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import "../styles/Connexion.css";
export default function Connexion() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    identifiant: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: logique de connexion
    console.log("Connexion:", form);
  };

  return (
    <div className="connexion-page">

      {/* ── HEADER ── */}
      <header className="connexion-header">
        <div className="connexion-logo">
          <Image
            src="/logo.jpeg"
            alt="Cashflow"
            width={200}
            height={60}
            className="connexion-logo-img"
          />
         
        </div>
        
      </header>

      {/* ── CORPS ── */}
      <main className="connexion-main">

        {/* Icône cadenas décoratif */}
        <div className="connexion-lock-icon" aria-hidden="true">🔒</div>

        {/* Carte formulaire */}
        <div className="connexion-card">
          <h1 className="connexion-title">Bon retour parmi vous</h1>
          <p className="connexion-subtitle">
            Accédez à votre compte multi-devises en un instant.
          </p>

          <form onSubmit={handleSubmit} className="connexion-form">

            {/* Email / identifiant */}
            <div className="connexion-field-group">
              <label htmlFor="identifiant">
                Adresse e-mail ou nom d&apos;utilisateur
              </label>
              <div className="connexion-input-wrap">
                <span className="connexion-input-icon">✉️</span>
                <input
                  id="identifiant"
                  name="identifiant"
                  type="text"
                  placeholder="exemple@cashflow.com"
                  value={form.identifiant}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="connexion-field-group">
              <div className="connexion-label-row">
                <label htmlFor="password">Mot de passe</label>
                <a href="#" className="connexion-forgot-link">
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="connexion-input-wrap">
                <span className="connexion-input-icon">🔒</span>
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
                  className="connexion-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Afficher le mot de passe"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Se souvenir */}
            <label className="connexion-check-label">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              <span>Se souvenir de cet appareil</span>
            </label>

            {/* Bouton Se connecter */}
            <button type="submit" className="connexion-submit-btn">
              Se connecter →
            </button>
          </form>

          {/* Divider */}
          <div className="connexion-divider">
            <span>NOUVEAU SUR CASHFLOW ?</span>
          </div>

          {/* Lien vers inscription */}
          <Link href="/inscription" className="connexion-create-btn">
            Créer un compte professionnel
          </Link>
        </div>

        {/* Liens bas */}
        <div className="connexion-bottom-links">
          <a href="#">⊙ Besoin d&apos;aide ?</a>
          <span>•</span>
          <a href="#">Confidentialité</a>
          <span>•</span>
          <a href="#">Sécurité</a>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="connexion-footer">
        <span>© 2026 Cashflow Inc. All rights reserved.</span>
        <div className="connexion-footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Help Center</a>
        </div>
      </footer>
    </div>
  );
}
