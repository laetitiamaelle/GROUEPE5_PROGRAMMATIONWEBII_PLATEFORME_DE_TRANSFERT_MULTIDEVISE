"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Lock, Mail } from "@/components/icons";
import { apiPost } from "@/lib/api-client";

export function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await apiPost("/api/v1/auth/login", { email, password, remember });
      router.push("/transfer");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-cash-panel p-8 shadow-card">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-xl border border-accent/40 bg-accent/10">
          <Lock className="size-7 text-accent" strokeWidth={1.5} />
        </div>
        <h1 className="text-center text-2xl font-bold text-white">Bon retour parmi vous</h1>
        <p className="mt-2 text-center text-sm text-cash-muted">
          Accédez à votre compte multi-devises en un instant.
        </p>

        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white">Adresse e-mail ou nom d&apos;utilisateur</label>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-cash-bg px-3 py-2.5 focus-within:border-accent/50">
              <Mail className="size-4 shrink-0 text-cash-muted" />
              <input
                className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-cash-subtle"
                placeholder="exemple@cashflow.com"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-white">Mot de passe</label>
              <Link href="#forgot" className="text-xs font-medium text-accent hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-cash-bg px-3 py-2.5 focus-within:border-accent/50">
              <Lock className="size-4 shrink-0 text-cash-muted" />
              <input
                className="w-full border-0 bg-transparent text-sm text-white outline-none"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-cash-muted">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="size-4 rounded border-white/20 bg-transparent accent-accent"
            />
            Se souvenir de cet appareil
          </label>
          {err ? <p className="text-sm text-danger">{err}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
          >
            Se connecter
            <ArrowRight className="size-4" />
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-[11px] font-semibold uppercase tracking-wider text-cash-subtle">
            <span className="bg-cash-panel px-3">Nouveau sur Cashflow ?</span>
          </div>
        </div>

        <Link
          href="/signup"
          className="flex w-full items-center justify-center rounded-xl border border-white/20 py-3 text-sm font-medium text-white transition hover:bg-white/[0.04]"
        >
          Créer un compte professionnel
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-cash-muted">
        <Link href="#help" className="hover:text-white">
          Besoin d&apos;aide ?
        </Link>
        <span className="text-cash-subtle">·</span>
        <Link href="#privacy" className="hover:text-white">
          Confidentialité
        </Link>
        <span className="text-cash-subtle">·</span>
        <Link href="#security" className="hover:text-white">
          Sécurité
        </Link>
      </div>
    </div>
  );
}
