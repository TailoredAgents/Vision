import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/admin/login" || path === "/admin/setup") return NextResponse.next();
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) { const login = new URL("/admin/login", request.url); login.searchParams.set("next", path); return NextResponse.redirect(login); }
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
