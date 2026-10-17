import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { getAdminSession } from "@/lib/auth";
import { isSameOrigin } from "@/lib/security";
const schema=z.object({status:z.enum(["new","contacted","qualified","closed","archived"])});
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){if(!await getAdminSession())return NextResponse.json({message:"Unauthorized"},{status:401});if(!isSameOrigin(request))return NextResponse.json({message:"Invalid origin"},{status:403});const db=getDb();if(!db)return NextResponse.json({message:"Database unavailable"},{status:503});const parsed=schema.safeParse(await request.json().catch(()=>null));if(!parsed.success)return NextResponse.json({message:"Invalid status"},{status:400});const {id}=await params;await db.update(leads).set({status:parsed.data.status,updatedAt:new Date()}).where(eq(leads.id,id));return NextResponse.json({ok:true});}
