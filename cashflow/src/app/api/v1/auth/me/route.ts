import { getCurrentUser } from "@/server/auth";
import { jsonErr, jsonOk } from "@/server/http";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return jsonErr(401, "Non authentifié");
  return jsonOk({
    id: user.id,
    name: user.full_name,
    email: user.email,
    currency: user.currency,
    balance_eur: user.balance_eur,
    role: user.role,
    created_at: user.created_at,
  });
}