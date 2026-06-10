import { requireUser } from "@/server/auth";
import { previewTransfer } from "@/server/data";
import { jsonErr, jsonOk } from "@/server/http";
import { transferPreviewBody } from "@/server/validation";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "Corps JSON invalide");
  }
  const parsed = transferPreviewBody.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, parsed.error.flatten().formErrors.join(", "));
  }

  try {
    const user = await requireUser();
    const data = previewTransfer(user.id, parsed.data.amountEur, parsed.data.contactId);
    return jsonOk(data);
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED") {
      return jsonErr(401, "Connectez-vous pour prévisualiser un transfert");
    }
    const msg = e instanceof Error ? e.message : "Erreur";
    return jsonErr(400, msg);
  }
}
