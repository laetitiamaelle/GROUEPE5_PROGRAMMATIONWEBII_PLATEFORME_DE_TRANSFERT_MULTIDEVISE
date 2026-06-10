import { redirect } from "next/navigation";
import { Suspense } from "react";
import { TransferSuccessPage } from "@/views/dashboard/TransferSuccessPage";

export default async function TransferSuccessRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  if (!params.ref) {
    redirect("/transfer");
  }

  return (
    <Suspense fallback={<div className="p-8 text-cash-muted">Chargement…</div>}>
      <TransferSuccessPage />
    </Suspense>
  );
}