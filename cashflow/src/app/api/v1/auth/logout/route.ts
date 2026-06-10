import { cookies } from "next/headers";
import { clearSessionCookieOptions, deleteSession, SESSION_COOKIE } from "@/server/auth";
import { jsonOk } from "@/server/http";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) deleteSession(token);

  const response = jsonOk({ ok: true });
  response.cookies.set(clearSessionCookieOptions());
  return response;
}
