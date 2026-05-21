import Link from 'next/link'
import styles from '../styles/Home.css'

// Données simples pour décrire vos services
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
    <div className={styles.container}>
      
      {/* Menu du haut */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>GlobalPay</div>
        <div className={styles.navLinks}>
          <Link href="/connexion">Se connecter</Link>
        </div>
      </nav>

      {/* Titre et accroche */}
      <header className={styles.hero}>
        <h1>
          Vos transactions <span className={styles.highlight}>multidevises</span>, simples et rapides.
        </h1>
        <p>
          Une plateforme unique pour gérer vos portefeuilles en Euros, Dollars et de nombreuses autres monnaies locales en un seul clic.
        </p>
        <button className={styles.btnPrimary}>Créer un compte gratuit</button>
      </header>

      {/* Description des services */}
      <section className={styles.featuresGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardIcon}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>

    </div>
  )
}
