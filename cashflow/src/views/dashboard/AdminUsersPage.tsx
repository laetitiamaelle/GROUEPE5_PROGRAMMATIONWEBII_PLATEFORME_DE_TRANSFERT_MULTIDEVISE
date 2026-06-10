"use client";

import { useEffect, useState } from "react";
import { Filter, Search, UserCog, MoreHorizontal } from "@/components/icons";
import { apiGet } from "@/lib/api-client";
import { AppFooter } from "@/components/layout/AppFooter";
import type { AdminUserRow } from "@/server/seed";

type Stats = {
  totalUsers: number;
  newUsersWeek: number;
  volume24hXaf: number;
  activeTransactions: number;
  platformReserveEur: number;
};

export function AdminUsersPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    apiGet<Stats>("/api/v1/admin/stats").then(setStats);
  }, []);

  useEffect(() => {
    const params = q ? `?q=${encodeURIComponent(q)}` : "";
    apiGet<AdminUserRow[]>(`/api/v1/admin/users${params}`).then(setUsers);
  }, [q]);

  if (!stats) {
    return <div className="p-8 text-cash-muted">Chargement…</div>;
  }

  return (
    <div className="p-6 pb-10 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Administration des Utilisateurs &amp; Transactions</h1>
          <p className="mt-2 max-w-3xl text-sm text-cash-muted">
            Surveillance globale de l&apos;activité financière et gestion des comptes utilisateurs.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { t: "Utilisateurs totaux", v: stats.totalUsers.toLocaleString("fr-FR"), s: `+${stats.newUsersWeek} nouveaux cette semaine` },
            {
              t: "Volume 24h",
              v: `${stats.volume24hXaf.toLocaleString("fr-FR")} XAF`,
              s: "Volume total des transferts sortants",
            },
            { t: "Transactions actives", v: String(stats.activeTransactions), s: "Transactions en cours de traitement" },
            {
              t: "Réserve plateforme",
              v: `${stats.platformReserveEur.toLocaleString("fr-FR")} EUR`,
              s: "Liquidités totales multi-devises",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-cash-panel p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-cash-muted">{c.t}</div>
              <div className="mt-2 text-2xl font-bold text-white">{c.v}</div>
              <div className="mt-1 text-xs text-cash-muted">{c.s}</div>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-white/10 bg-cash-panel">
          <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold text-white">Répertoire des Utilisateurs</h2>
            <div className="flex flex-1 flex-wrap items-center gap-2 sm:max-w-xl sm:justify-end">
              <div className="relative min-w-[200px] flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-cash-muted" />
                <input
                  className="w-full rounded-xl border border-white/10 bg-cash-bg py-2 pl-10 pr-3 text-sm text-white outline-none placeholder:text-cash-subtle focus:border-accent/50"
                  placeholder="Rechercher un utilisateur…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/5"
              >
                <Filter className="size-4" />
                Filtres
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="text-xs uppercase text-cash-muted">
                <tr className="border-b border-white/10">
                  <th className="px-5 py-3 font-semibold">Utilisateur</th>
                  <th className="px-5 py-3 font-semibold">Devise du compte</th>
                  <th className="px-5 py-3 font-semibold">Solde actuel</th>
                  <th className="px-5 py-3 font-semibold">Statut</th>
                  <th className="px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-full bg-white/10 text-xs font-bold text-white">
                          {u.name
                            .split(" ")
                            .map((p) => p[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{u.name}</div>
                          <div className="text-xs text-cash-muted">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-cash-muted">{u.currency}</td>
                    <td className="px-5 py-4 font-medium text-white">{u.balanceLabel}</td>
                    <td className="px-5 py-4">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          u.status === "active"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : u.status === "verification"
                              ? "bg-white/10 text-cash-muted"
                              : "bg-red-500/15 text-red-400",
                        ].join(" ")}
                      >
                        {u.status === "active" ? "Actif" : u.status === "verification" ? "Vérification" : "Suspendu"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-cash-muted">
                        <button type="button" className="rounded-lg p-2 hover:bg-white/10 hover:text-white" aria-label="Gérer">
                          <UserCog className="size-4" />
                        </button>
                        <button type="button" className="rounded-lg p-2 hover:bg-white/10 hover:text-white" aria-label="Plus">
                          <MoreHorizontal className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <div className="mx-auto mt-10 max-w-7xl">
        <AppFooter />
      </div>
    </div>
  );
}
