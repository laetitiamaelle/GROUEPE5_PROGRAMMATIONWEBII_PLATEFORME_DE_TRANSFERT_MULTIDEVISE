"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiGet, apiPost } from "@/lib/api-client";
import { AppFooter } from "@/components/layout/AppFooter";

type C = { id: string; name: string; email: string; currency: string; avatarSeed: string };

export function ContactsDashboardPage() {
  const [list, setList] = useState<C[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState<"XAF" | "EUR" | "USD">("XAF");
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);

  const loadContacts = useCallback(() => {
    setLoading(true);
    apiGet<C[]>("/api/v1/contacts")
      .then((data) => {
        setList(data);
        setErr(null);
      })
      .catch((e) => setErr(e instanceof Error ? e.message : "Erreur"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  async function onAddContact(e: React.FormEvent) {
    e.preventDefault();
    setFormErr(null);
    setSaving(true);
    try {
      const contact = await apiPost<C>("/api/v1/contacts", { name, email, currency });
      setList((prev) => [contact, ...prev]);
      setName("");
      setEmail("");
      setCurrency("XAF");
      setShowForm(false);
    } catch (ex) {
      setFormErr(ex instanceof Error ? ex.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 pb-10 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold text-white">Contacts</h1>
            <p className="mt-2 text-sm text-cash-muted">
              Bénéficiaires enregistrés pour vos transferts multi-devises.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-black hover:brightness-110"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM19 8v6M22 11h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Ajouter un contact
            </button>
            <Link href="/transfer" className="text-sm font-medium text-accent hover:underline">
              Retour au transfert
            </Link>
          </div>
        </div>

        {showForm ? (
          <form
            onSubmit={onAddContact}
            className="rounded-2xl border border-white/10 bg-cash-panel p-6 space-y-4"
          >
            <h2 className="text-lg font-semibold text-white">Nouveau bénéficiaire</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white">Nom complet</label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-cash-bg px-4 py-2.5 text-sm text-white outline-none focus:border-accent/50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Marie Dubois"
                  required
                  minLength={2}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white">E-mail</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-white/10 bg-cash-bg px-4 py-2.5 text-sm text-white outline-none focus:border-accent/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marie@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">Devise du compte</label>
              <select
                className="w-full rounded-xl border border-white/10 bg-cash-bg px-4 py-2.5 text-sm text-white outline-none focus:border-accent/50 sm:max-w-xs"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as "XAF" | "EUR" | "USD")}
              >
                <option value="XAF">XAF (FCFA)</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            {formErr ? <p className="text-sm text-danger">{formErr}</p> : null}
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-black hover:brightness-110 disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : "Enregistrer le contact"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5"
              >
                Annuler
              </button>
            </div>
          </form>
        ) : null}

        {loading ? (
          <p className="text-sm text-cash-muted">Chargement…</p>
        ) : err ? (
          <div className="rounded-2xl border border-danger/30 bg-danger/10 p-6 text-sm text-danger">
            {err}{" "}
            <Link href="/login" className="font-medium text-accent hover:underline">
              Se connecter
            </Link>
          </div>
        ) : list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-cash-panel/50 p-10 text-center">
            <p className="text-cash-muted">Aucun contact pour le moment.</p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-4 text-sm font-medium text-accent hover:underline"
            >
              Ajouter votre premier bénéficiaire
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => (
              <div key={c.id} className="rounded-2xl border border-white/10 bg-cash-panel p-5">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-full bg-white/10 text-sm font-bold text-white">
                    {c.avatarSeed.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-white">{c.name}</div>
                    <div className="truncate text-xs text-cash-muted">{c.email}</div>
                  </div>
                </div>
                <div className="mt-4 inline-block rounded-md bg-white/[0.06] px-2 py-1 text-xs font-medium text-cash-muted">
                  {c.currency}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mx-auto mt-10 max-w-5xl">
        <AppFooter />
      </div>
    </div>
  );
}
