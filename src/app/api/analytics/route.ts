import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { analyticsEvents } from "@/db/schema";
import { isSameOrigin, rateLimited } from "@/lib/security";

const eventSchema = z.object({ name: z.enum(["page_view", "listing_view", "property_search", "property_filter", "cta_click", "lead_submitted"]), path: z.string().max(500), data: z.record(z.string(), z.union([z.string().max(500), z.number(), z.boolean()])).optional().default({}) });
export async function POST(request: Request) {
  const db = getDb(); if (!db) return new NextResponse(null, { status: 204 });
  if (!isSameOrigin(request)) return new NextResponse(null, { status: 204 });
  if (await rateLimited(request, "analytics", 240, 10)) return new NextResponse(null, { status: 204 });
  let raw: unknown; try { raw = await request.json(); } catch { return new NextResponse(null, { status: 204 }); }
  const parsed = eventSchema.safeParse(raw); if (!parsed.success) return new NextResponse(null, { status: 204 });
  const existing = request.headers.get("cookie")?.match(/(?:^|; )vision_anon=([^;]+)/)?.[1];
  const sessionId = existing && /^[a-f0-9-]{36}$/i.test(existing) ? existing : randomUUID();
  await db.insert(analyticsEvents).values({ sessionId, name: parsed.data.name, path: parsed.data.path, data: parsed.data.data });
  const response = new NextResponse(null, { status: 204 });
  if (!existing) response.cookies.set("vision_anon", sessionId, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 365, path: "/" });
  return response;
}
