import "server-only";
import { count, countDistinct, desc, eq, gte, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { analyticsEvents, auditRuns, leads } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";

export async function dashboardData() {
  await requireAdmin();
  const db=getDb(); if(!db)return null; const since=new Date(Date.now()-30*24*60*60*1000);
  const [[leadTotal],[newLeadTotal],[pageViews],[visitors],recent]=await Promise.all([
    db.select({value:count()}).from(leads),db.select({value:count()}).from(leads).where(eq(leads.status,"new")),db.select({value:count()}).from(analyticsEvents).where(eq(analyticsEvents.name,"page_view")),db.select({value:countDistinct(analyticsEvents.sessionId)}).from(analyticsEvents).where(gte(analyticsEvents.createdAt,since)),db.select().from(leads).orderBy(desc(leads.createdAt)).limit(5),
  ]);
  return { leads:leadTotal?.value??0,newLeads:newLeadTotal?.value??0,pageViews:pageViews?.value??0,visitors30d:visitors?.value??0,recent };
}

export async function analyticsData(){await requireAdmin();const db=getDb();if(!db)return null;const since=new Date(Date.now()-30*24*60*60*1000);const [daily,pages,events]=await Promise.all([
  db.select({day:sql<string>`to_char(date_trunc('day', ${analyticsEvents.createdAt}), 'YYYY-MM-DD')`,views:count()}).from(analyticsEvents).where(gte(analyticsEvents.createdAt,since)).groupBy(sql`date_trunc('day', ${analyticsEvents.createdAt})`).orderBy(sql`date_trunc('day', ${analyticsEvents.createdAt})`),
  db.select({path:analyticsEvents.path,views:count()}).from(analyticsEvents).where(eq(analyticsEvents.name,"page_view")).groupBy(analyticsEvents.path).orderBy(desc(count())).limit(10),
  db.select({name:analyticsEvents.name,total:count()}).from(analyticsEvents).where(gte(analyticsEvents.createdAt,since)).groupBy(analyticsEvents.name).orderBy(desc(count())),
]);return{daily,pages,events};}

export async function leadData(){await requireAdmin();const db=getDb();if(!db)return null;return db.select().from(leads).orderBy(desc(leads.createdAt)).limit(250);}
export async function latestAudit(){await requireAdmin();const db=getDb();if(!db)return null;const [run]=await db.select().from(auditRuns).orderBy(desc(auditRuns.createdAt)).limit(1);return run??null;}
