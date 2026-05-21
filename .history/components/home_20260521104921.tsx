import Image from 'next/image'
import Link from 'next/link'
import styles from './Home.module.css'

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

export default function HomePage() {
  return (
    <div className={<u>styles.container</u>}>
      
      {/* Barre de navigation / Header */}
      <header className={<u>styles.header</u>}>
        <div className={<u>styles.logo</u>}>MultiXchange</div>
        <nav className={<u>styles.nav</u>}>
          <Link href="/dashboard" className={<u>styles.navLink</u>}>Tableau de bord</Link>
          <Link href="/tarifs" className={<u>styles.navLink</u>}>Tarifs</Link>
          <Link href="/aide" className={<u>styles.navLink</u>}>Support</Link>
        </nav>
        <button className={<u>styles.btnConnect</u>}>Espace Client</button>
      </header>

      {/* Section Principale (Hero) */}
      <main className={<u>styles.hero</u>}>
        <div className={<u>styles.heroLeft</u>}>
          <h1>
            Gérez vos transactions <br />
            <span className={<u>styles.highlight</u>}>Multidevises</span> sans frontières.
          </h1>
          <p>
            Une plateforme fintech robuste, rapide et sécurisée conçue pour les entreprises et les particuliers. Payez, convertissez et recevez des fonds à l'international instantanément.
          </p>
          <div className={<u>styles.ctaGroup</u>}>
            <button className={<u>styles.btnPrimary</u>}>Ouvrir un compte</button>
            <button className={<u>styles.btnSecondary</u>}>Voir la démo</button>
          </div>
        </div>

        {/* Visuel d'illustration */}
        <div className={<u>styles.heroRight</u>}>
          <div className={<u>styles.cardContainer</u>}>
            <Image
              src="/dashboard-preview.png" 
              alt="Aperçu de l'application de transaction"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
              priority 
            />
          </div>
        </div>
      </main>

      {/* Grille des caractéristiques clés */}
      <section className={<u>styles.features</u>}>
        {featuresData.map((feature, index) => (
          <div key={index} className={<u>styles.featureCard</u>}>
            <div className={<u>styles.icon</u>}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

    </div>
  )
}
