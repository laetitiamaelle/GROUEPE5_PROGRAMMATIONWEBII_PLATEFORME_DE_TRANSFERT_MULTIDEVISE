"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Globe, Headphones, Info, Shield } from "@/components/icons";
import { apiPost } from "@/lib/api-client";

const currencies = [
  { value: "XAF", label: "Franc CFA (XAF) - Afrique Centrale" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "USD", label: "Dollar US (USD)" },
];

export function SignupView() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [currency, setCurrency] = useState<"XAF" | "EUR" | "USD">("XAF");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await apiPost("/api/v1/auth/signup", { fullName, email, password, confirm, currency });
      router.push("/transfer");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 lg:flex-row lg:items-start lg:gap-16 lg:py-14">
      <div className="flex-1 space-y-6 lg:pt-4">
        <h1 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
          Rejoignez la nouvelle ère du transfert <span className="text-accent">multi-devises.</span>
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-cash-muted lg:text-base">
          Gérez vos fonds entre XAF, EUR et USD avec des taux transparents et une sécurité bancaire.
        </p>
        <ul className="space-y-5">
          {[
            {
              icon: Shield,
              title: "Sécurité Totale",
              text: "Vos transactions sont protégées par un cryptage de bout en bout.",
            },
            {
              icon: Globe,
              title: "Multi-devises",
              text: "Échangez instantanément entre les zones CEMAC, Europe et USA.",
            },
            {
              icon: Headphones,
              title: "Support Dédié",
              text: "Une équipe d'experts à votre écoute pour toutes vos opérations.",
            },
          ].map((f) => (
            <li key={f.title} className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-accent">
                <f.icon className="size-5" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-semibold text-white">{f.title}</div>
                <p className="mt-0.5 text-sm text-cash-muted">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-white/10 pt-6">
          <p className="flex gap-2 text-xs leading-relaxed text-cash-subtle">
            <Info className="mt-0.5 size-4 shrink-0 text-accent" />
            Note : Le changement de devise principale nécessite l&apos;intervention de l&apos;administrateur après la
            création.
          </p>
        </div>
      </div>

      <div className="w-full flex-1 lg:max-w-md">
        <div className="rounded-2xl border border-white/[0.08] bg-cash-panel p-8 shadow-card">
          <h2 className="text-2xl font-bold text-white">Créer un compte</h2>
          <p className="mt-2 text-sm text-cash-muted">
            Remplissez les informations ci-dessous pour commencer à transférer.
          </p>
          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">Nom complet</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-cash-bg px-3 py-2.5 text-sm text-white outline-none ring-0 placeholder:text-cash-subtle focus:border-accent/50"
                placeholder="Jean Dupont"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">Adresse Email</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-cash-bg px-3 py-2.5 text-sm text-white outline-none focus:border-accent/50"
                type="email"
                placeholder="jean.dupont@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white">Mot de passe</label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-cash-bg px-3 py-2.5 text-sm text-white outline-none focus:border-accent/50"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white">Confirmer</label>
                <input
                  className="w-full rounded-xl border border-white/10 bg-cash-bg px-3 py-2.5 text-sm text-white outline-none focus:border-accent/50"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-end justify-between gap-2">
                <label className="text-sm font-medium text-white">Devise du compte</label>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">Recommandé</span>
              </div>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-xl border border-white/10 bg-cash-bg px-3 py-2.5 pr-10 text-sm text-white outline-none focus:border-accent/50"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as typeof currency)}
                >
                  {currencies.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cash-muted">▾</span>
              </div>
              <p className="mt-1.5 text-xs text-cash-muted">
                C&apos;est la devise dans laquelle vos soldes seront affichés par défaut.
              </p>
            </div>
            {err ? <p className="text-sm text-danger">{err}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-accent py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
            >
              Créer le compte
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-cash-muted">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="font-medium text-accent hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
