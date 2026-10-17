import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { team } from "@/lib/content";

export const metadata: Metadata = { title: "Team", description: "Meet the experienced commercial real estate advisors behind Vision Commercial Advisors.", alternates: { canonical: "/team" } };

export default function TeamPage() {
  return <><PageHero eyebrow="Our team" title="Experienced people, directly involved." intro="Vision brings together senior professionals with distinct backgrounds and a shared preference for thoughtful advice, responsive communication, and hands-on execution." /><section className="section"><div className="container-shell"><div className="divide-y hairline border-y hairline">{team.map((member, index) => <Link href={`/team/${member.slug}`} key={member.slug} className="group grid gap-7 py-9 md:grid-cols-[110px_1fr_1fr_40px] md:items-center"><div className="grid h-20 w-20 place-items-center bg-forest font-[family-name:var(--font-display)] text-3xl text-bronze-light">{member.name.split(" ").slice(0,2).map((part)=>part[0]).join("")}</div><div><p className="text-[.65rem] font-bold uppercase tracking-[.14em] text-bronze">{index === 0 ? "Firm leadership" : "Senior advisory"}</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-medium leading-none">{member.name}</h2><p className="mt-2 text-sm font-semibold">{member.title}</p></div><div><p className="max-w-lg text-sm leading-7 text-muted">{member.summary}</p><p className="mt-3 flex items-center gap-2 text-xs text-muted"><MapPin size={13} />{member.location}</p></div><ArrowRight className="text-bronze transition-transform group-hover:translate-x-2" /></Link>)}</div></div></section><CtaBand title="The right advisor should improve the question." body="Start with the decision you are facing. We will help determine where Vision can be useful." /></>;
}
