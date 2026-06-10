import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { loadStore, mutateStore } from "./db";

const SESSION_COOKIE = "cashflow_session";
const SESSION_DAYS = 30;
const SALT_LEN = 16;
const KEY_LEN = 64;

export type DbUser = {
  id: string;
  full_name: string;
  email: string;
  currency: string;
  balance_eur: number;
  created_at: string;
};

export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LEN);
  const hash = scryptSync(password, salt, KEY_LEN);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const hash = scryptSync(password, salt, KEY_LEN);
  const expected = Buffer.from(hashHex, "hex");
  if (hash.length !== expected.length) return false;
  return timingSafeEqual(hash, expected);
}

function newId(prefix: string) {
  return `${prefix}_${randomBytes(12).toString("hex")}`;
}

export function createSession(userId: string): string {
  const token = randomBytes(32).toString("hex");
  const expires = new Date();
  expires.setDate(expires.getDate() + SESSION_DAYS);
  mutateStore((store) => {
    store.sessions.push({ token, user_id: userId, expires_at: expires.toISOString() });
  });
  return token;
}

export function deleteSession(token: string) {
  mutateStore((store) => {
    store.sessions = store.sessions.filter((s) => s.token !== token);
  });
}

export function getUserBySessionToken(token: string): DbUser | null {
  const store = loadStore();
  const session = store.sessions.find(
    (s) => s.token === token && new Date(s.expires_at).getTime() > Date.now(),
  );
  if (!session) return null;
  const user = store.users.find((u) => u.id === session.user_id);
  if (!user) return null;
  return {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    currency: user.currency,
    balance_eur: user.balance_eur,
    created_at: user.created_at,
  };
}

export async function getCurrentUser(): Promise<DbUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return getUserBySessionToken(token);
}

export async function requireUser(): Promise<DbUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export function sessionCookieOptions(token: string, remember?: boolean) {
  const maxAge = remember ? SESSION_DAYS * 24 * 60 * 60 : 24 * 60 * 60;
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}

export { newId, SESSION_COOKIE };
