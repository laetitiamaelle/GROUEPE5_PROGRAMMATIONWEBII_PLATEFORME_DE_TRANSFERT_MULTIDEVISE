import Link from "next/link";

const services = [
  {
    icon: "💱",
    title: "Taux de change en direct",
    description:
      "Convertissez instantanément plus de 40 devises mondiales au taux interbancaire réel sans frais cachés.",
  },
  {
    icon: "🛡️",
    title: "Sécurité maximale",
    description:
      "Toutes vos transactions sont chiffrées de bout en bout. Vos fonds sont protégés par des protocoles bancaires stricts.",
  },
  {
    icon: "⚡",
    title: "Transferts instantanés",
    description:
      "Envoyez de l'argent à l'international à la vitesse de l'éclair. Vos bénéficiaires reçoivent les fonds en quelques secondes.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cash-bg text-white">
      <nav className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
        <div className="text-xl font-bold text-accent">Cashflow</div>
        <Link href="/login" className="text-sm font-medium text-cash-muted transition hover:text-white">
          Se connecter
        </Link>
      </nav>

      <header className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          Vos transactions <span className="text-accent">multidevises</span>, simples et rapides.
        </h1>
        <p className="mt-4 text-base text-cash-muted sm:text-lg">
          Une plateforme unique pour gérer vos portefeuilles en Euros, Dollars et de nombreuses autres monnaies locales
          en un seul clic.
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
        >
          Créer un compte gratuit
        </Link>
      </header>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 sm:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="rounded-2xl border border-white/[0.08] bg-cash-panel p-6">
            <div className="mb-4 text-3xl">{service.icon}</div>
            <h3 className="text-lg font-semibold text-white">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cash-muted">{service.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
