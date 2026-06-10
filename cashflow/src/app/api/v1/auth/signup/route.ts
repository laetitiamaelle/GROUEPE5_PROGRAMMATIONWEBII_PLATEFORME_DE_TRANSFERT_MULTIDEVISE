import { createSession, sessionCookieOptions } from "@/server/auth";
import { createUser, findUserByEmail } from "@/server/data";
import { jsonErr, jsonOk } from "@/server/http";
import { signupBody } from "@/server/validation";

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

  const token = createSession(user.id);
  const response = jsonOk({
    token,
    user: { email: user.email, name: user.full_name, role: user.role },
  });
  response.cookies.set(sessionCookieOptions(token, true));
  return response;
}