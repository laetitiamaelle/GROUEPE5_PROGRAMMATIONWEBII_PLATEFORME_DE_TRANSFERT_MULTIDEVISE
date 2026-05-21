import Link from 'next/link'
// Importez votre fichier CSS ici s'il n'est pas déjà inclus globalement :
import '../styles/Home.css' 

const services = [
  {
    icon: "💱",
    title: "Taux de change en direct",
    description: "Convertissez instantanément plus de 40 devises mondiales au taux interbancaire réel sans frais cachés."
  },
  {
    icon: "🛡️",
    title: "Sécurité maximale",
    description: "Toutes vos transactions sont chiffrées de bout en bout. Vos fonds sont protégés par des protocoles bancaires stricts."
  },
  {
    icon: "⚡",
    title: "Transferts instantanés",
    description: "Envoyez de l'argent à l'international à la vitesse de l'éclair. Vos bénéficiaires reçoivent les fonds en quelques secondes."
  }
];

export default function HomePage() {
  return (
    <div className="home-container">
      
      {/* Menu du haut */}
      <nav className="home-navbar">
        <div className="home-logo">Cahflow</div>
        <div className="home-nav-links">
          <Link href="/connexion">Se connecter</Link>
        </div>
      </nav>

      {/* Titre et accroche */}
      <header className="home-hero">
        <h1>
          Vos transactions <span className="home-highlight">multidevises</span>, simples et rapides.
        </h1>
        <p>
          Une plateforme unique pour gérer vos portefeuilles en Euros, Dollars et de nombreuses autres monnaies locales en un seul clic.
        </p>
        <button className="home-btn-primary">Créer un compte gratuit</button>
      </header>

      {/* Description des services */}
      <section className="home-features-grid">
        {services.map((service, index) => (
          <div key={index} className="home-card">
            <div className="home-card-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>

    </div>
  )
}
