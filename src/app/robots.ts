import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
export default function robots():MetadataRoute.Robots{const preview=process.env.NEXT_PUBLIC_PREVIEW_MODE==="true";return{rules:preview?{userAgent:"*",disallow:"/"}:[{userAgent:"*",allow:"/",disallow:["/admin/","/api/"]}],sitemap:`${SITE.url}/sitemap.xml`,host:SITE.url};}
