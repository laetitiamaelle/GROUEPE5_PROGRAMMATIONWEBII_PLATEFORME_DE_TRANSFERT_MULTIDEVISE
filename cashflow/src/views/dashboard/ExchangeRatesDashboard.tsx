"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, RefreshCw } from "@/components/icons";
import { apiGet } from "@/lib/api-client";
import { AppFooter } from "@/components/layout/AppFooter";

type Pair = {
  id: string;
  label: string;
  source: string;
  rate: number;
  trendPct: number;
  trendUp: boolean;
  updatedMinutesAgo: number;
};
type Flow = { id: string; name: string; latencyMs: number; status: "operational" | "unstable" };
type Dash = {
  pairs: Pair[];
  flows: Flow[];
  stats: {
    volume24hEur: number;
    volumeDeltaPct: number;
    adminTx: number;
    spreadAvgPct: number;
    responseSeconds: number;
    responseSource: string;
  };
};

export function ExchangeRatesDashboard() {
  const [data, setData] = useState<Dash | null>(null);

  useEffect(() => {
    apiGet<Dash>("/api/v1/rates/dashboard").then(setData).catch(() => setData(null));
  }, []);

  if (!data) {
    return <div className="p-8 text-cash-muted">Chargement…</div>;
  }

  return (
    <div className="p-6 pb-10 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent">Administration centrale</div>
            <h1 className="mt-2 text-3xl font-bold text-white">Tableau des Taux de Change</h1>
            <p className="mt-2 max-w-2xl text-sm text-cash-muted">
              Surveillez les conversions en temps réel et les écarts entre les sources officielles et le marché.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-cash-muted">
              Intervalle auto
              <select className="rounded-lg border border-white/10 bg-cash-bg px-3 py-2 text-sm text-white outline-none">
                <option>12h</option>
                <option>6h</option>
                <option>1h</option>
              </select>
            </label>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
            >
              <RefreshCw className="size-4" />
              Forcer la mise à jour
            </button>
            <Link
              href="/rates/history"
              className="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5"
            >
              Historique des taux
            </Link>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {data.pairs.map((p) => (
            <div key={p.id} className="flex flex-col rounded-2xl border border-white/10 bg-cash-panel p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-lg font-bold text-white">{p.label}</div>
                  <div className="mt-1 text-xs text-cash-muted">{p.source}</div>
                </div>
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                    p.trendUp ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400",
                  ].join(" ")}
                >
                  {p.trendUp ? "+" : ""}
                  {p.trendPct}%
                </span>
              </div>
              <div className="mt-4 text-3xl font-bold tracking-tight text-white">{p.rate}</div>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-cash-muted">
                <Clock className="size-3.5" />
                Mis à jour : Il y a {p.updatedMinutesAgo} minutes
              </p>
              <div
                className={[
                  "mt-4 h-10 rounded-lg bg-gradient-to-r from-transparent",
                  p.trendUp ? "to-emerald-500/20" : "to-red-500/20",
                ].join(" ")}
              />
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded-lg border border-white/15 py-2 text-xs font-medium text-white hover:bg-white/5"
                >
                  Historique
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-lg border border-white/15 py-2 text-xs font-medium text-white hover:bg-white/5"
                >
                  Analyses
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-cash-panel p-6">
            <h2 className="text-lg font-bold text-white">État des flux de données</h2>
            <ul className="mt-4 space-y-4">
              {data.flows.map((f) => (
                <li key={f.id} className="flex items-center justify-between gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium text-white">{f.name}</div>
                    <div className="text-xs text-cash-muted">{f.latencyMs}ms</div>
                  </div>
                  <span
                    className={
                      f.status === "operational"
                        ? "rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400"
                        : "rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-cash-muted"
                    }
                  >
                    {f.status === "operational" ? "Opérationnel" : "Instable"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-white/10 bg-cash-panel p-6">
            <h2 className="text-lg font-bold text-white">Actions de Sécurité</h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-white/10 p-4">
                <div className="font-semibold text-white">Gel du spread de conversion</div>
                <p className="mt-1 text-sm text-cash-muted">
                  Fixez temporairement les taux affichés aux clients en cas de forte volatilité.
                </p>
                <button
                  type="button"
                  className="mt-3 rounded-lg border border-accent px-4 py-2 text-xs font-semibold text-accent hover:bg-accent/10"
                >
                  Activer le gel manuel
                </button>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <div className="font-semibold text-white">Bascule de source (Failover)</div>
                <p className="mt-1 text-sm text-cash-muted">Changez la source primaire lors d&apos;une panne API.</p>
                <button
                  type="button"
                  className="mt-3 rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5"
                >
                  Configurer le Failover
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { k: "Volume converti (24h)", v: "€ 1.2M", s: `+${data.stats.volumeDeltaPct}% vs hier`, pos: true },
            { k: "Transactions admin", v: String(data.stats.adminTx), s: "Toutes validées", pos: false },
            { k: "Écart moyen spread", v: `${data.stats.spreadAvgPct}%`, s: "Optimisé", pos: true },
            { k: "Temps de réponse", v: `${data.stats.responseSeconds}s`, s: data.stats.responseSource, pos: false },
          ].map((c) => (
            <div key={c.k} className="rounded-2xl border border-white/10 bg-cash-panel p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-cash-muted">{c.k}</div>
              <div className="mt-2 text-2xl font-bold text-white">{c.v}</div>
              <div className={`mt-1 text-xs ${c.pos ? "text-emerald-400" : "text-cash-muted"}`}>{c.s}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl">
        <AppFooter />
      </div>
    </div>
  );
}
