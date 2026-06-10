import { requireUser } from "@/server/auth";
import { loadStore, mutateStore } from "@/server/db";
import { jsonErr, jsonOk } from "@/server/http";

export async function GET() {
  let user;
  try {
    user = await requireUser();
  } catch {
    return jsonErr(401, "Non authentifié");
  }

  const store = loadStore();
  const dbUser = store.users.find((u) => u.id === user.id);
  if (!dbUser) return jsonErr(404, "Utilisateur introuvable");

  return jsonOk({
    id: dbUser.id,
    full_name: dbUser.full_name,
    email: dbUser.email,
    currency: dbUser.currency,
    balance_eur: dbUser.balance_eur,
    role: dbUser.role ?? "user",
    created_at: dbUser.created_at,
  });
}

export async function PATCH(req: Request) {
  let user;
  try {
    user = await requireUser();
  } catch {
    return jsonErr(401, "Non authentifié");
  }

  let body: { full_name?: string; email?: string; currency?: string } = {};
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "Corps JSON invalide");
  }

  // Vérifier unicité email si modifié
  if (body.email && body.email.toLowerCase().trim() !== user.email.toLowerCase()) {
    const store = loadStore();
    const conflict = store.users.find(
      (u) => u.email.toLowerCase() === body.email!.toLowerCase().trim() && u.id !== user.id
    );
    if (conflict) return jsonErr(409, "Cet e-mail est déjà utilisé par un autre compte");
  }

  const oldEmail = user.email;

  mutateStore((store) => {
    const u = store.users.find((x) => x.id === user.id);
    if (!u) return;
    if (body.full_name?.trim()) u.full_name = body.full_name.trim();
    if (body.email?.trim()) u.email = body.email.toLowerCase().trim();
    if (body.currency?.trim()) u.currency = body.currency.trim();

    // Mettre à jour dans les contacts des autres utilisateurs
    store.contacts.forEach((c) => {
      if (c.user_id !== user.id && c.email.toLowerCase() === oldEmail.toLowerCase()) {
        if (body.full_name?.trim()) {
          c.name = body.full_name.trim();
          c.avatar_seed = body.full_name.trim().slice(0, 2);
        }
        if (body.email?.trim()) c.email = body.email.toLowerCase().trim();
        if (body.currency?.trim()) c.currency = body.currency.trim();
      }
    });
  });

  return jsonOk({ ok: true, message: "Profil mis à jour avec succès" });
}