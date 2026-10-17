import "server-only";
import { createHash } from "node:crypto";
import { and, count, eq, gte } from "drizzle-orm";
import { getDb } from "@/db";
import { rateEvents } from "@/db/schema";

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const requestHost = forwardedHost || request.headers.get("host") || new URL(request.url).host;
  try { return new URL(origin).host === requestHost; } catch { return false; }
}

export function clientKey(request: Request) {
  const raw = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const secret = process.env.RATE_LIMIT_SECRET ?? process.env.AUTH_SECRET ?? "development-only-rate-limit";
  return createHash("sha256").update(`${secret}:${raw}`).digest("hex");
}

export async function rateLimited(request: Request, action: string, limit: number, windowMinutes: number) {
  const db = getDb();
  if (!db) return false;
  const keyHash = clientKey(request);
  const since = new Date(Date.now() - windowMinutes * 60_000);
  const [result] = await db.select({ value: count() }).from(rateEvents).where(and(eq(rateEvents.keyHash, keyHash), eq(rateEvents.action, action), gte(rateEvents.createdAt, since)));
  if ((result?.value ?? 0) >= limit) return true;
  await db.insert(rateEvents).values({ keyHash, action });
  return false;
}
