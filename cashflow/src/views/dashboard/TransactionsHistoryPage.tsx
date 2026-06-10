"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Download, Globe, Search, SlidersHorizontal, ArrowDownLeft, ArrowUpRight, Shuffle } from "@/components/icons";
import Link from "next/link";
import { apiGet } from "@/lib/api-client";
import { AppFooter } from "@/components/layout/AppFooter";
import type { TxStatus, TxType } from "@/server/seed";

type Row = {
  id: string;
  date: string;
  reference: string;
  type: TxType;
  counterparty: string;
  originAmount: string;
  originCurrency: string;
  convertedAmount: string;
  convertedCurrency: string;
  status: TxStatus;
};

export function TransactionsHistoryPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [currency, setCurrency] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: "5",
      status,
      currency,
    });
    if (q) params.set("q", q);
    apiGet<{ rows: Row[]; total: number }>(`/api/v1/transactions?${params}`).then((d) => {
      setRows(d.rows);
      setTotal(d.total);
    });
  }, [page, q, status, currency]);

  return (
    <div className="p-6 pb-10 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <h1 className="text-3xl font-bold text-white">Historique des Transactions</h1>
            <p className="mt-2 text-sm text-cash-muted">
              Consultez et gérez l&apos;ensemble de vos mouvements financiers multi-devises.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5"
            >
              <Download className="size-4" />
              Exporter (CSV)
            </button>
            <Link
              href="/transfer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-black hover:brightness-110"
            >
              Nouveau Transfert
            </Link>
          </div>
        </div>

        <section className="rounded-2xl border border-white/10 bg-cash-panel p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <SlidersHorizontal className="size-4 text-accent" />
            Filtres de recherche
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-cash-bg px-3 py-2">
              <CalendarDays className="size-4 text-cash-muted" />
              <select
                className="w-full border-0 bg-transparent text-sm text-white outline-none"
                defaultValue="all"
              >
                <option>Toute période</option>
              </select>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-cash-bg px-3 py-2">
              <Globe className="size-4 text-cash-muted" />
              <select
                className="w-full border-0 bg-transparent text-sm text-white outline-none"
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  setPage(1);
                }}
              >
                <option value="all">Toutes devises</option>
                <option value="EUR">EUR</option>
                <option value="XAF">XAF</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <select
              className="rounded-xl border border-white/10 bg-cash-bg px-3 py-2 text-sm text-white outline-none"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">Statut (tous)</option>
              <option value="complete">Complété</option>
              <option value="pending">En attente</option>
              <option value="failed">Échoué</option>
            </select>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-cash-bg px-3 py-2">
              <Search className="size-4 text-cash-muted" />
              <input
                placeholder="Rechercher un contact…"
                className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-cash-subtle"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </section>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-cash-panel">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="text-xs uppercase text-cash-muted">
                <tr className="border-b border-white/10">
                  <th className="px-5 py-3 font-semibold">Date &amp; Ref</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 font-semibold">Contrepartie</th>
                  <th className="px-5 py-3 font-semibold">Origine</th>
                  <th className="px-5 py-3 font-semibold">Converti</th>
                  <th className="px-5 py-3 font-semibold">Statut</th>
                  <th className="px-5 py-3 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="font-medium text-white">{r.date}</div>
                      <div className="text-xs text-cash-muted">{r.reference}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <TypeIcon type={r.type} />
                        <span className="capitalize text-white">{labelType(r.type)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white">{r.counterparty}</td>
                    <td className="px-5 py-4 text-cash-muted">
                      {r.originAmount} {r.originCurrency}
                    </td>
                    <td className="px-5 py-4 font-semibold text-accent">
                      {r.convertedAmount} {r.convertedCurrency}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          r.status === "failed" ? "bg-white/10 text-red-400" : "bg-white/10 text-white",
                        ].join(" ")}
                      >
                        {labelStatus(r.status)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-cash-muted">
                      <button type="button" className="rounded-lg p-1 hover:bg-white/10" aria-label="Détails">
                        ⓘ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-5 py-3 text-xs text-cash-muted sm:flex-row">
            <span>
              Affichage de {(page - 1) * 5 + 1}-{Math.min(page * 5, total)} sur {total} transactions
            </span>
            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                disabled={page <= 1}
                className="rounded-lg border border-white/10 px-2 py-1 disabled:opacity-40"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Précédent
              </button>
              {Array.from({ length: Math.min(5, Math.ceil(total / 5)) }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={[
                    "min-w-8 rounded-lg px-2 py-1",
                    page === n ? "bg-accent text-black font-bold" : "border border-white/10 hover:bg-white/5",
                  ].join(" ")}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={page * 5 >= total}
                className="rounded-lg border border-white/10 px-2 py-1 disabled:opacity-40"
                onClick={() => setPage((p) => p + 1)}
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl">
        <AppFooter />
      </div>
    </div>
  );
}

function labelType(t: TxType) {
  if (t === "envoi") return "Envoi";
  if (t === "reception") return "Réception";
  return "Conversion";
}

function labelStatus(s: TxStatus) {
  if (s === "complete") return "Complété";
  if (s === "pending") return "En attente";
  return "Échoué";
}

function TypeIcon({ type }: { type: TxType }) {
  const wrap = "grid size-8 place-items-center rounded-full border border-white/10";
  if (type === "envoi")
    return (
      <span className={`${wrap} text-red-400`}>
        <ArrowUpRight className="size-4" />
      </span>
    );
  if (type === "reception")
    return (
      <span className={`${wrap} text-emerald-400`}>
        <ArrowDownLeft className="size-4" />
      </span>
    );
  return (
    <span className={`${wrap} text-sky-400`}>
      <Shuffle className="size-4" />
    </span>
  );
}
