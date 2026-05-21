import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/home.css'

// Définition de l'interface pour le typage des fonctionnalités
interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

const featuresData: FeatureItem[] = [
  {
    icon: "💱",
    title: "Taux en Temps Réel",
    description: "Convertissez instantanément vos fonds avec les taux de change interbancaires les plus bas du marché."
  },
  {
    icon: "🛡️",
    title: "Sécurité Bancaire",
    description: "Vos transactions et données multidevises sont protégées par un chiffrement de bout en bout de niveau militaire."
  },
  {
    icon: "🌍",
    title: "+50 Devises Disponibles",
    description: "Gérez l'Euro, le Dollar, le Yen et des dizaines d'autres devises locales ou numériques depuis un seul compte."
  }
];

export default function HomePage(): JSX.Element {
  return (
    <div className={styles.container}>
      
      {/* Barre de navigation / Header */}
      <header className={styles.header}>
        <div className={styles.logo}>MultiXchange</div>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navLink}>Tableau de bord</Link>
          <Link href="/tarifs" className={styles.navLink}>Tarifs</Link>
          <Link href="/aide" className={styles.navLink}>Support</Link>
        </nav>
        <button className={styles.btnConnect}>Espace Client</button>
      </header>

      {/* Section Principale (Hero) */}
      <main className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1>
            Gérez vos transactions <br />
            <span className={styles.highlight}>Multidevises</span> sans frontières.
          </h1>
          <p>
            Une plateforme fintech robuste, rapide et sécurisée conçue pour les entreprises et les particuliers. Payez, convertissez et recevez des fonds à l'international instantanément.
          </p>
          <div className={styles.ctaGroup}>
            <button className={styles.btnPrimary}>Ouvrir un compte</button>
            <button className={styles.btnSecondary}>Voir la démo</button>
          </div>
        </div>

        {/* Visuel d'illustration exploitant le Next Image optimisé */}
        <div className={styles.heroRight}>
          <div className={styles.cardContainer}>
            <Image
              src="/dashboard-preview.png" // Placez une belle capture d'écran de votre app ou un pattern abstrait dans /public
              alt="Aperçu de l'application de transaction"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
              priority // Priorité absolue car l'image est sur la page d'accueil principale
            />
          </div>
        </div>
      </main>

      {/* Grille des caractéristiques clés */}
      <section className={styles.features}>
        {featuresData.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.icon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

    </div>
  )
}
