import { requireUser } from "@/server/auth";
import { mutateStore } from "@/server/db";
import { jsonErr, jsonOk } from "@/server/http";

export async function PATCH(req: Request) {
  let user;
  try {
    user = await requireUser();
  } catch {
    return jsonErr(401, "Non authentifié");
  }

  let body: { full_name?: string; email?: string } = {};
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "Corps JSON invalide");
  }

  mutateStore((store) => {
    const u = store.users.find((x) => x.id === user.id);
    if (!u) return;
    if (body.full_name) u.full_name = body.full_name.trim();
    if (body.email) u.email = body.email.toLowerCase().trim();
  });

  return jsonOk({ ok: true });
}