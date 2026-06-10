import { verifyPassword, createSession, sessionCookieOptions } from "@/server/auth";
import { findUserByEmail } from "@/server/data";
import { jsonErr, jsonOk } from "@/server/http";
import { loginBody } from "@/server/validation";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "Corps JSON invalide");
  }
  const parsed = loginBody.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, parsed.error.flatten().formErrors.join(", "));
  }

  const user = findUserByEmail(parsed.data.email);
  if (!user || !verifyPassword(parsed.data.password, user.password_hash)) {
    return jsonErr(401, "E-mail ou mot de passe incorrect");
  }

  const token = createSession(user.id);
  const response = jsonOk({
    token,
    user: { email: user.email, name: user.full_name },
  });
  response.cookies.set(sessionCookieOptions(token, parsed.data.remember));
  return response;
}
