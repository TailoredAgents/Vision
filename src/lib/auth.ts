import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "vision_admin_session";
const SESSION_AGE = 60 * 60 * 8;

function authKey() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) return null;
  return new TextEncoder().encode(value);
}

export type AdminSession = { adminId: string; email: string };

export async function createSessionToken(session: AdminSession) {
  const key = authKey();
  if (!key) throw new Error("AUTH_SECRET must be configured with at least 32 characters.");
  return new SignJWT({ email: session.email }).setProtectedHeader({ alg: "HS256" }).setSubject(session.adminId).setIssuedAt().setExpirationTime(`${SESSION_AGE}s`).sign(key);
}

export async function verifySessionToken(token: string | undefined): Promise<AdminSession | null> {
  const key = authKey();
  if (!key || !token) return null;
  try { const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] }); if (!payload.sub || typeof payload.email !== "string") return null; return { adminId: payload.sub, email: payload.email }; } catch { return null; }
}

export async function getAdminSession() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export const sessionCookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: SESSION_AGE };
