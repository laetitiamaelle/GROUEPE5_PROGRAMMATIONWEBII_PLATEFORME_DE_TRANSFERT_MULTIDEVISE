import { requireUser } from "@/server/auth";
import { getTransferContext } from "@/server/data";
import { jsonErr, jsonOk } from "@/server/http";

export async function GET() {
  try {
    const user = await requireUser();
    return jsonOk(getTransferContext(user.id));
  } catch {
    return jsonErr(401, "Connectez-vous pour initier un transfert");
  }
}
