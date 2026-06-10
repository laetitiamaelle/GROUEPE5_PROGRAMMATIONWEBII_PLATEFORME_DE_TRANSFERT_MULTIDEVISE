"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ChevronRight, Info, MessageCircle } from "@/components/icons";
import { apiGet, apiPost } from "@/lib/api-client";
import { AppFooter } from "@/components/layout/AppFooter";

type Contact = { id: string; name: string; email: string; currency: string; avatarSeed: string };
type Ctx = {
  source: { label: string; balance: number; currency: string; default: boolean };
  rate: { eurToXaf: number; feePct: number; updatedAt: string; sourceLabel: string };
  contacts: Contact[];
};

type Preview = {
  receiveXaf: number;
  feeEur: number;
  totalDebitEur: number;
  eurToXaf: number;
  updatedAt: string;
  sourceLabel: string;
};

const fmt = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtInt = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

export function InitTransferPage() {
  const router = useRouter();
  const [ctx, setCtx] = useState<Ctx | null>(null);
  const [selected, setSelected] = useState<string>("c1");
  const [amount, setAmount] = useState("1500");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loadErr, setLoadErr] = useState<string | null>(null);

  useEffect(() => {
    apiGet<Ctx>("/api/v1/transfer/context")
      .then((c) => {
        setCtx(c);
        if (c.contacts[0]) setSelected(c.contacts[0].id);
        else setSelected("");
      })
      .catch((e) => setLoadErr(e instanceof Error ? e.message : "Erreur"));
  }, []);

  const runPreview = useCallback(async () => {
    if (!ctx) return;
    const n = Number(amount.replace(",", "."));
    if (!Number.isFinite(n) || n <= 0) {
      setPreview(null);
      return;
    }
    try {
      const p = await apiPost<Preview>("/api/v1/transfer/preview", { amountEur: n, contactId: selected });
      setPreview(p);
    } catch {
      setPreview(null);
    }
  }, [amount, selected, ctx]);

  useEffect(() => {
    const t = window.setTimeout(runPreview, 250);
    return () => window.clearTimeout(t);
  }, [runPreview]);

  if (loadErr) {
    return (
      <div className="p-8">
        <p className="text-danger">{loadErr}</p>
        <Link href="/login" className="mt-3 inline-block text-sm font-medium text-accent hover:underline">
          Se connecter
        </Link>
      </div>
    );
  }
  if (!ctx) {
    return <div className="p-8 text-cash-muted">Chargement…</div>;
  }

  if (ctx.contacts.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white">Initier un transfert</h1>
        <p className="mt-3 text-sm text-cash-muted">
          Ajoutez au moins un bénéficiaire avant d&apos;effectuer un transfert.
        </p>
        <Link
          href="/contacts"
          className="mt-4 inline-flex rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-black hover:brightness-110"
        >
          Ajouter un contact
        </Link>
      </div>
    );
  }

  const amountNum = Number(amount.replace(",", "."));

  return (
    <div className="p-6 pb-10 lg:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 space-y-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h1 className="text-2xl font-bold text-white lg:text-3xl">Initier un transfert</h1>
              <p className="mt-2 max-w-xl text-sm text-cash-muted">
                Envoyez des fonds instantanément entre vos comptes multidevises.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Step n={1} label="Saisie" active />
              <div className="h-px w-6 bg-white/15" />
              <Step n={2} label="Confirmation" />
              <div className="h-px w-6 bg-white/15" />
              <Step n={3} label="Succès" />
            </div>
          </div>

          <section>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">Compte de départ</div>
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-cash-panel p-5">
              <div className="flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-xl bg-accent/15 text-lg font-bold text-accent">
                  €
                </div>
                <div>
                  <div className="font-semibold text-white">{ctx.source.label}</div>
                  <div className="text-sm text-cash-muted">
                    Solde disponible : {fmt.format(ctx.source.balance)} {ctx.source.currency === "EUR" ? "€" : ctx.source.currency}
                  </div>
                </div>
              </div>
              {ctx.source.default ? (
                <span className="rounded-lg bg-white/[0.06] px-3 py-1 text-xs text-cash-muted">Par défaut</span>
              ) : null}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-accent">Destinataire</div>
              <Link href="/contacts" className="text-xs font-medium text-accent hover:underline">
                Gérer les contacts
              </Link>
            </div>
            <input
              className="mb-4 w-full rounded-xl border border-white/10 bg-cash-bg px-4 py-2.5 text-sm text-white outline-none placeholder:text-cash-subtle focus:border-accent/50"
              placeholder="Rechercher par nom ou email…"
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ctx.contacts.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelected(c.id)}
                  className={[
                    "rounded-2xl border p-4 text-left transition",
                    selected === c.id
                      ? "border-accent bg-accent/[0.08] ring-1 ring-accent/30"
                      : "border-white/[0.08] bg-cash-panel hover:border-white/15",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-full bg-white/10 text-sm font-semibold text-white">
                      {c.avatarSeed.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-white">{c.name}</div>
                      <div className="truncate text-xs text-cash-muted">{c.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 inline-block rounded-md bg-white/[0.08] px-2 py-0.5 text-[11px] font-medium text-cash-muted">
                    {c.currency}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">Montant à envoyer</div>
            <div className="rounded-2xl border border-white/[0.08] bg-cash-panel p-4">
              <div className="flex items-center gap-3">
                <span className="text-xl text-cash-muted">€</span>
                <input
                  className="min-w-0 flex-1 border-0 bg-transparent text-2xl font-semibold tracking-tight text-white outline-none"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  inputMode="decimal"
                />
                <button
                  type="button"
                  className="text-sm font-semibold text-accent hover:underline"
                  onClick={() => setAmount(String(ctx.source.balance))}
                >
                  Max
                </button>
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-cash-muted">
                <Info className="size-3.5 shrink-0 text-accent" />
                Le montant minimum de transfert est de 10,00 €
              </p>
            </div>
          </section>
        </div>

        <aside className="w-full shrink-0 lg:w-[380px]">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-cash-panel shadow-card">
            <div className="bg-accent px-5 py-4 text-black">
              <div className="text-sm font-bold">Détails de la conversion</div>
              <div className="text-xs font-medium opacity-80">Taux en direct</div>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-xl bg-cash-bg/80 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-cash-muted">Vous envoyez</div>
                <div className="text-lg font-bold text-white">{fmt.format(amountNum || 0)} €</div>
                <div className="my-3 flex justify-center text-accent">
                  <ChevronRight className="size-6 rotate-90 sm:rotate-0" />
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-cash-muted">Ils reçoivent</div>
                <div className="text-lg font-bold text-accent">
                  {preview ? `${fmtInt.format(preview.receiveXaf)} XAF` : "—"}
                </div>
              </div>
              {preview ? (
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between gap-2 text-cash-muted">
                    <span>Taux de change</span>
                    <span className="text-white">1 EUR = {preview.eurToXaf} XAF</span>
                  </li>
                  <li className="flex justify-between gap-2 text-cash-muted">
                    <span>Frais de service ({ctx.rate.feePct}%)</span>
                    <span className="text-orange-400">+{fmt.format(preview.feeEur)} €</span>
                  </li>
                  <li className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold">
                    <span className="text-white">Total à débiter</span>
                    <span className="text-accent">{fmt.format(preview.totalDebitEur)} €</span>
                  </li>
                </ul>
              ) : null}
              <p className="text-xs text-cash-muted">
                Mis à jour le{" "}
                {new Date(ctx.rate.updatedAt).toLocaleString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-xs text-cash-muted">Source du taux : {ctx.rate.sourceLabel}</p>
              <div className="rounded-xl border border-accent/30 bg-accent/5 p-3 text-xs leading-relaxed text-cash-muted">
                <span className="font-medium text-accent">Important.</span> Le taux de change est garanti pendant 15
                minutes dès que vous passez à l&apos;étape de confirmation.
              </div>
              <button
                type="button"
                disabled={!preview || amountNum < 10}
                onClick={() => router.push(`/transfer/confirm?amount=${encodeURIComponent(String(amountNum))}&to=${selected}`)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuer vers la confirmation
                <ChevronRight className="size-4" />
              </button>
              <p className="flex items-center justify-center gap-2 text-center text-xs text-cash-muted">
                <MessageCircle className="size-4 text-accent" />
                Besoin d&apos;aide pour ce transfert ?
              </p>
            </div>
          </div>
        </aside>
      </div>
      <div className="mx-auto mt-10 max-w-6xl">
        <AppFooter />
      </div>
    </div>
  );
}

function Step({ n, label, active }: { n: number; label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={[
          "grid size-8 place-items-center rounded-full text-xs font-bold",
          active ? "bg-accent text-black" : "border border-white/15 bg-transparent text-cash-muted",
        ].join(" ")}
      >
        {n}
      </div>
      <span className={["hidden text-xs font-medium sm:inline", active ? "text-white" : "text-cash-muted"].join(" ")}>
        {label}
      </span>
    </div>
  );
}
