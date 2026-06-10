import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { AppFooter } from "@/components/layout/AppFooter";

export function HomeDashboardPage() {
  return (
    <div className="p-6 pb-10 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Accueil</h1>
          <p className="mt-3 text-lg text-cash-muted">
            Vue d&apos;ensemble de votre compte Cashflow — raccourcis vers vos actions fréquentes.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/transfer"
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-cash-panel p-6 transition hover:border-accent/40 hover:bg-accent/5"
          >
            <div>
              <div className="text-sm font-semibold text-accent">Transfert</div>
              <div className="mt-2 text-xl font-bold text-white">Initier un transfert</div>
              <p className="mt-2 text-sm text-cash-muted">Envoyer des fonds entre vos devises.</p>
            </div>
            <ArrowRight className="mt-6 size-5 text-accent transition group-hover:translate-x-1" />
          </Link>
          <Link
            href="/transactions"
            className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-cash-panel p-6 transition hover:border-accent/40 hover:bg-accent/5"
          >
            <div>
              <div className="text-sm font-semibold text-accent">Historique</div>
              <div className="mt-2 text-xl font-bold text-white">Transactions</div>
              <p className="mt-2 text-sm text-cash-muted">Consulter vos mouvements récents.</p>
            </div>
            <ArrowRight className="mt-6 size-5 text-accent transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-4xl">
        <AppFooter />
      </div>
    </div>
  );
}
