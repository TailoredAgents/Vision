import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { formatInsightDate, insights } from "@/lib/content";

export const metadata: Metadata = { title: "Insights", description: "Practical commercial real estate perspectives for owners, investors, tenants, and buyers.", alternates: { canonical: "/insights" } };
export default function InsightsPage() { return <><PageHero eyebrow="Insights" title="Useful perspective for consequential decisions." intro="Practical notes on leasing, ownership, site selection, and the details that shape commercial real estate outcomes." /><section className="section"><div className="container-shell"><div className="divide-y hairline border-y hairline">{insights.map((insight,index)=><Link href={`/insights/${insight.slug}`} key={insight.slug} className="group grid gap-7 py-10 md:grid-cols-[150px_1fr_1fr_40px] md:items-center"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-bronze">{insight.category}</p><p className="mt-3 text-xs text-muted">{formatInsightDate(insight.date)}</p></div><div><p className="text-xs text-muted">0{index+1}</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.05]">{insight.title}</h2></div><p className="max-w-xl text-sm leading-7 text-muted">{insight.dek}</p><ArrowRight className="text-bronze transition-transform group-hover:translate-x-2" /></Link>)}</div></div></section></> }
