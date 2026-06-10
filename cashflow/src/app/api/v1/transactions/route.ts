import { requireUser } from "@/server/auth";
import { listTransactions } from "@/server/data";
import { jsonErr, jsonOk } from "@/server/http";
import { transactionsQuery } from "@/server/validation";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = transactionsQuery.safeParse(Object.fromEntries(url.searchParams));
  if (!parsed.success) {
    return jsonErr(400, parsed.error.flatten().formErrors.join(", "));
  }

  try {
    const user = await requireUser();
    const data = listTransactions(user.id, parsed.data);
    return jsonOk(data);
  } catch {
    return jsonErr(401, "Connectez-vous pour voir vos transactions");
  }
}
