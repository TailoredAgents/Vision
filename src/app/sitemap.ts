import type { MetadataRoute } from "next";
import { insights, team } from "@/lib/content";
import { SITE } from "@/lib/site";
const routes=["","/properties","/services","/services/landlord-seller-representation","/services/tenant-buyer-representation","/services/advisory","/about","/team","/insights","/contact","/privacy"];
export default function sitemap():MetadataRoute.Sitemap{const now=new Date();return[...routes.map((path)=>({url:`${SITE.url}${path}`,lastModified:now,changeFrequency:path===""?"weekly" as const:"monthly" as const,priority:path===""?1:.7})),...team.map((member)=>({url:`${SITE.url}/team/${member.slug}`,lastModified:now,changeFrequency:"yearly" as const,priority:.6})),...insights.map((insight)=>({url:`${SITE.url}/insights/${insight.slug}`,lastModified:new Date(insight.date),changeFrequency:"yearly" as const,priority:.65}))];}
