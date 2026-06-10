"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { TransferConfirmPage } from "@/views/TransferConfirmPage";
import { usePushToast } from "@/contexts/ToastContext";
import { apiPost } from "@/lib/api-client";

type ConfirmResult = {
  reference: string;
  amountEur: number;
  feeEur: number;
  totalDebitEur: number;
  receiveXaf: number;
  eurToXaf: number;
  feePct: number;
  contact: { name: string; email: string; currency: string };
};

function ConfirmInner() {
  const router = useRouter();
  const params = useSearchParams();
  const pushToast = usePushToast();
  const [confirming, setConfirming] = useState(false);

  const amount = Number(params.get("amount") ?? 0);
  const contactId = params.get("to") ?? "";

  if (!amount || !contactId) {
    return <p className="p-8 text-danger">Paramètres de transfert manquants.</p>;
  }

  return (
    <TransferConfirmPage
      amount={amount}
      contactId={contactId}
      confirming={confirming}
      onConfirm={async (_preview, ref) => {
        setConfirming(true);
        try {
          const result = await apiPost<ConfirmResult>("/api/v1/transfer/confirm", {
            amountEur: amount,
            contactId,
            reference: ref,
          });
          const q = new URLSearchParams({
            ref: result.reference,
            amount: String(result.amountEur),
            fee: String(result.feeEur),
            total: String(result.totalDebitEur),
            receive: String(result.receiveXaf),
            rate: String(result.eurToXaf),
            feePct: String(result.feePct),
            currency: result.contact.currency,
            toName: result.contact.name,
            toEmail: result.contact.email,
          });
          pushToast({
            type: "success",
            title: "Transfert confirmé",
            message: "La transaction a été enregistrée dans votre historique.",
          });
          router.push(`/transfer/success?${q.toString()}`);
        } catch (ex) {
          pushToast({
            type: "error",
            title: "Échec du transfert",
            message: ex instanceof Error ? ex.message : "Erreur",
          });
        } finally {
          setConfirming(false);
        }
      }}
      onEdit={() => {
        router.push(`/transfer?amount=${amount}&to=${contactId}`);
      }}
    />
  );
}

export default function TransferConfirmRoute() {
  return (
    <Suspense fallback={<div className="p-8 text-cash-muted">Chargement…</div>}>
      <ConfirmInner />
    </Suspense>
  );
}
