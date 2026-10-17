import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { auditRuns } from "@/db/schema";
import { runSiteAudit } from "@/lib/audit";
import { getAdminSession } from "@/lib/auth";
import { isSameOrigin } from "@/lib/security";
export async function POST(request:Request){if(!await getAdminSession())return NextResponse.json({message:"Unauthorized"},{status:401});if(!isSameOrigin(request))return NextResponse.json({message:"Invalid origin"},{status:403});const db=getDb();if(!db)return NextResponse.json({message:"Database unavailable"},{status:503});const result=await runSiteAudit(new URL(request.url).origin);await db.insert(auditRuns).values({id:randomUUID(),status:"complete",score:result.score,routesChecked:result.routesChecked,issues:result.issues});return NextResponse.json(result);}
