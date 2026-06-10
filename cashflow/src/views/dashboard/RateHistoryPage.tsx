"use client";

import { useEffect, useState } from "react";
import { Database, Download, Filter, RefreshCw, Clock, TrendingUp } from "@/components/icons";
import { apiGet } from "@/lib/api-client";
import { AppFooter } from "@/components/layout/AppFooter";

type Snap = { id: string; at: string; pair: string; rate: number; source: string; status: "success" | "alert" };

export function RateHistoryPage() {
  const [rows, setRows] = useState<Snap[]>([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<Snap | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    apiGet<{ rows: Snap[]; total: number }>(`/api/v1/rate-snapshots?page=${page}&pageSize=8`).then((d) => {
      setRows(d.rows);
      setTotal(d.total);
      setSelected((s) => {
        if (s && d.rows.some((r) => r.id === s.id)) return s;
        return d.rows[0] ?? null;
      });
    });
  }, [page]);

  return (
    <div className="p-6 pb-10 lg:p-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h1 className="text-3xl font-bold text-white">Historique des Taux</h1>
              <p className="mt-2 text-sm text-cash-muted">
                Consultez et auditez chaque changement de taux de change enregistré.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/5"
              >
                <RefreshCw className="size-4" />
                Actualiser
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-black hover:brightness-110"
              >
                <Download className="size-4" />
                Rapport Complet
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Database, label: "Snapshots totaux", value: "14,280" },
              { icon: Clock, label: "Fréquence de mise à jour", value: "Toutes les 12h" },
              { icon: TrendingUp, label: "Stabilité moyenne", value: "99.98%" },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl border border-white/10 bg-cash-panel p-5">
                <c.icon className="size-5 text-accent" />
                <div className="mt-3 text-[11px] font-bold uppercase tracking-wider text-cash-muted">{c.label}</div>
                <div className="mt-1 text-2xl font-bold text-white">{c.value}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-white/10 bg-cash-panel p-4">
            <Field label="Paire de devises">
              <select className="w-full min-w-[160px] rounded-lg border border-white/10 bg-cash-bg px-3 py-2 text-sm text-white outline-none">
                <option>Toutes les paires</option>
                <option>EUR / XAF</option>
                <option>USD / XAF</option>
              </select>
            </Field>
            <Field label={"Période d'audit"}>
              <input
                type="text"
                placeholder="Sélectionner les dates"
                className="w-full min-w-[180px] rounded-lg border border-white/10 bg-cash-bg px-3 py-2 text-sm text-white outline-none placeholder:text-cash-subtle"
              />
            </Field>
            <Field label="Source API">
              <select className="w-full min-w-[160px] rounded-lg border border-white/10 bg-cash-bg px-3 py-2 text-sm text-white outline-none">
                <option>Toutes les sources</option>
                <option>ECB API</option>
              </select>
            </Field>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/5"
            >
              <Filter className="size-4" />
              Appliquer
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-cash-panel">
            <div className="border-b border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-cash-muted">
              Log des snapshots
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-xs uppercase text-cash-muted">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-3 font-semibold">Horodatage</th>
                    <th className="px-5 py-3 font-semibold">Paire</th>
                    <th className="px-5 py-3 font-semibold">Taux</th>
                    <th className="px-5 py-3 font-semibold">Source</th>
                    <th className="px-5 py-3 font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => setSelected(r)}
                      className={[
                        "cursor-pointer border-b border-white/5 transition hover:bg-white/[0.03]",
                        selected?.id === r.id ? "bg-accent/5" : "",
                      ].join(" ")}
                    >
                      <td className="px-5 py-3 text-cash-muted">
                        {new Date(r.at).toLocaleString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                      <td className="px-5 py-3 text-white">{r.pair}</td>
                      <td className="px-5 py-3 font-bold text-accent">{r.rate}</td>
                      <td className="px-5 py-3 text-cash-muted">{r.source}</td>
                      <td className="px-5 py-3">
                        <span
                          className={
                            r.status === "success"
                              ? "inline-flex items-center gap-1.5 text-emerald-400"
                              : "inline-flex items-center gap-1.5 text-amber-400"
                          }
                        >
                          <span className="size-1.5 rounded-full bg-current" />
                          {r.status === "success" ? "Succès" : "Alerte"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-5 py-3 text-xs text-cash-muted sm:flex-row">
              <span>
                Affichage de {rows.length} snapshots sur {total.toLocaleString("fr-FR")}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  className="rounded-lg border border-white/10 px-3 py-1 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Précédent
                </button>
                <span className="px-2">Page {page}</span>
                <button type="button" className="rounded-lg border border-white/10 px-3 py-1" onClick={() => setPage((p) => p + 1)}>
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="w-full shrink-0 lg:w-[360px]">
          <div className="sticky top-4 rounded-2xl border border-white/10 bg-cash-panel p-6">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-bold text-white">Détails du Snapshot</h2>
              {selected ? (
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white">{selected.pair}</span>
              ) : null}
            </div>
            {selected ? (
              <>
                <p className="mt-1 text-xs text-cash-muted">ID : {selected.id}</p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div>
                    <dt className="text-cash-muted">Horodatage</dt>
                    <dd className="font-medium text-white">
                      {new Date(selected.at).toLocaleString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-cash-muted">Taux appliqué</dt>
                    <dd className="text-xl font-bold text-accent">{selected.rate}</dd>
                  </div>
                  <div>
                    <dt className="text-cash-muted">Source de données</dt>
                    <dd className="text-white">European Central Bank</dd>
                  </div>
                  <div>
                    <dt className="text-cash-muted">Latence API</dt>
                    <dd className="text-white">142ms</dd>
                  </div>
                </dl>
                <div className="mt-5 rounded-xl border border-white/10 p-3 text-xs leading-relaxed text-cash-muted">
                  Ce snapshot est utilisé pour la traçabilité des écarts appliqués aux clients sur la période
                  sélectionnée.
                </div>
                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-2.5 text-sm font-medium text-white hover:bg-white/5"
                >
                  <Download className="size-4" />
                  Exporter les métadonnées
                </button>
                <p className="mt-6 text-xs text-cash-muted">
                  Besoin d&apos;aide ?{" "}
                  <a href="#docs" className="font-medium text-accent hover:underline">
                    Consulter la documentation technique
                  </a>
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm text-cash-muted">Sélectionnez une ligne.</p>
            )}
          </div>
        </aside>
      </div>
      <div className="mx-auto mt-10 max-w-[1400px]">
        <AppFooter />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block min-w-0 flex-1 text-xs font-medium text-cash-muted">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}
