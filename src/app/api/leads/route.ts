import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { isSameOrigin, rateLimited } from "@/lib/security";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100), email: z.email().max(200), phone: z.string().trim().max(50).optional().default(""), company: z.string().trim().max(150).optional().default(""), message: z.string().trim().min(10).max(4000), source: z.enum(["contact", "property"]), propertySlug: z.string().trim().max(150).optional(), website: z.string().max(0).optional().default(""),
});

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  const db = getDb();
  if (!db) return NextResponse.json({ message: "The inquiry form is being configured. Please call or email Vision directly." }, { status: 503 });
  if (await rateLimited(request, "lead", 5, 30)) return NextResponse.json({ message: "Too many attempts. Please call Vision or try again later." }, { status: 429 });
  let raw: unknown; try { raw = await request.json(); } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ message: "Please check the required fields and try again." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  await db.insert(leads).values({ id: randomUUID(), name: parsed.data.name, email: parsed.data.email.toLowerCase(), phone: parsed.data.phone || null, company: parsed.data.company || null, message: parsed.data.message, source: parsed.data.source, propertySlug: parsed.data.propertySlug || null });
  return NextResponse.json({ ok: true }, { status: 201 });
}
