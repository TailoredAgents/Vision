import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { admins } from "@/db/schema";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { isSameOrigin, rateLimited } from "@/lib/security";

const schema=z.object({email:z.email().max(200),password:z.string().min(8).max(200)});
export async function POST(request:Request){if(!isSameOrigin(request))return NextResponse.json({message:"Invalid request origin."},{status:403});const db=getDb();if(!db)return NextResponse.json({message:"The database is not configured."},{status:503});if(await rateLimited(request,"admin-login",8,30))return NextResponse.json({message:"Too many attempts. Try again later."},{status:429});let raw:unknown;try{raw=await request.json()}catch{return NextResponse.json({message:"Invalid request."},{status:400})}const parsed=schema.safeParse(raw);if(!parsed.success)return NextResponse.json({message:"Enter a valid email and password."},{status:400});const [admin]=await db.select().from(admins).where(eq(admins.email,parsed.data.email.toLowerCase())).limit(1);if(!admin||!await bcrypt.compare(parsed.data.password,admin.passwordHash))return NextResponse.json({message:"Email or password is incorrect."},{status:401});const token=await createSessionToken({adminId:admin.id,email:admin.email});const response=NextResponse.json({ok:true});response.cookies.set(SESSION_COOKIE,token,sessionCookieOptions);return response;}
