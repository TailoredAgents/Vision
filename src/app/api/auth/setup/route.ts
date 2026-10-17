import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { count } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { admins } from "@/db/schema";
import { isSameOrigin, rateLimited } from "@/lib/security";

const schema=z.object({setupToken:z.string().min(16).max(300)});
export async function POST(request:Request){if(!isSameOrigin(request))return NextResponse.json({message:"Invalid request origin."},{status:403});const db=getDb();if(!db)return NextResponse.json({message:"Configure DATABASE_URL and run the migrations first."},{status:503});if(await rateLimited(request,"admin-setup",5,60))return NextResponse.json({message:"Too many attempts."},{status:429});const email=process.env.ADMIN_BOOTSTRAP_EMAIL?.toLowerCase();const password=process.env.ADMIN_BOOTSTRAP_PASSWORD;const expected=process.env.ADMIN_SETUP_TOKEN;if(!email||!password||!expected||password.length<12)return NextResponse.json({message:"Bootstrap environment variables are incomplete."},{status:503});let raw:unknown;try{raw=await request.json()}catch{return NextResponse.json({message:"Invalid request."},{status:400})}const parsed=schema.safeParse(raw);if(!parsed.success||parsed.data.setupToken!==expected)return NextResponse.json({message:"The setup token is not valid."},{status:403});const [existing]=await db.select({value:count()}).from(admins);if((existing?.value??0)>0)return NextResponse.json({message:"An administrator already exists. Use the login page."},{status:409});await db.insert(admins).values({id:randomUUID(),email,passwordHash:await bcrypt.hash(password,12)});return NextResponse.json({ok:true,message:`Administrator created for ${email}. You can now log in.`},{status:201});}
