import { createSession, sessionCookieOptions } from "@/server/auth";
import { createUser, findUserByEmail } from "@/server/data";
import { mutateStore } from "@/server/db";
import { jsonErr, jsonOk } from "@/server/http";
import { signupBody } from "@/server/validation";
import { randomBytes } from "crypto";

function newContactId() {
  return `ctc_${randomBytes(12).toString("hex")}`;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "Corps JSON invalide");
  }

  const parsed = signupBody.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, parsed.error.flatten().formErrors.join(", "));
  }
  if (parsed.data.password !== parsed.data.confirm) {
    return jsonErr(400, "Les mots de passe ne correspondent pas");
  }
  if (findUserByEmail(parsed.data.email)) {
    return jsonErr(409, "Un compte existe déjà avec cet e-mail");
  }

  const user = createUser({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    password: parsed.data.password,
    currency: parsed.data.currency,
  });

  const now = new Date().toISOString();

  // Ajout mutuel comme contacts
  mutateStore((store) => {
    const existingUsers = store.users.filter((u) => u.id !== user.id);

    for (const existing of existingUsers) {
      // Le nouvel utilisateur devient contact des existants
      const existingAlreadyHas = store.contacts.some(
        (c) => c.user_id === existing.id && c.email.toLowerCase() === user.email.toLowerCase()
      );
      if (!existingAlreadyHas) {
        store.contacts.push({
          id: newContactId(),
          user_id: existing.id,
          name: user.full_name,
          email: user.email,
          currency: user.currency,
          avatar_seed: user.full_name.trim().slice(0, 2) || user.email.slice(0, 2),
          created_at: now,
        });
      }

      // Les existants deviennent contacts du nouvel utilisateur
      const newAlreadyHas = store.contacts.some(
        (c) => c.user_id === user.id && c.email.toLowerCase() === existing.email.toLowerCase()
      );
      if (!newAlreadyHas) {
        store.contacts.push({
          id: newContactId(),
          user_id: user.id,
          name: existing.full_name,
          email: existing.email,
          currency: existing.currency,
          avatar_seed: existing.full_name.trim().slice(0, 2) || existing.email.slice(0, 2),
          created_at: now,
        });
      }
    }
  });

  const token = createSession(user.id);
  const response = jsonOk({
    token,
    user: { email: user.email, name: user.full_name, role: user.role },
  });
  response.cookies.set(sessionCookieOptions(token, true));
  return response;
}