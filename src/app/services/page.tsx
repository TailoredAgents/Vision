import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { services } from "@/lib/services";

export const metadata: Metadata = { title: "Commercial real estate services", description: "Owner, investor, tenant, and buyer representation with practical commercial real estate advisory support.", alternates: { canonical: "/services" } };

export default function ServicesPage() {
  return <><PageHero eyebrow="Services" title="Strategy that holds up through execution." intro="Vision advises owners, investors, tenants, and buyers through the full arc of a commercial real estate decision—from framing the question to completing the transaction." /><section className="section"><div className="container-shell"><div className="divide-y hairline border-y hairline">{services.map((service, index) => <Link key={service.slug} href={`/services/${service.slug}`} className="group grid gap-7 py-10 lg:grid-cols-[80px_1fr_1fr_40px] lg:items-center"><p className="text-xs font-bold tracking-[.15em] text-bronze">{service.number}</p><div><p className="mb-3 text-[.65rem] font-bold uppercase tracking-[.14em] text-muted">{index === 0 ? "For owners" : index === 1 ? "For occupants" : "For decision-makers"}</p><h2 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-none md:text-5xl">{service.title}</h2></div><p className="max-w-xl text-sm leading-7 text-muted">{service.short}</p><ArrowRight className="text-bronze transition-transform group-hover:translate-x-2" /></Link>)}</div></div></section><section className="bg-ivory"><div className="container-shell grid min-h-[560px] lg:grid-cols-2"><div className="relative min-h-[380px]"><Image src="/images/industrial-exterior.jpg" alt="Abstract detail of commercial architecture" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" /></div><div className="flex flex-col justify-center px-0 py-14 lg:px-16"><p className="eyebrow">Independent by design</p><h2 className="display mt-7 text-5xl md:text-6xl">Senior judgment at the table.</h2><p className="mt-6 leading-8 text-muted">Vision is intentionally focused. Clients work with experienced advisors who can connect strategy to market realities and stay close to the details that determine whether a plan succeeds.</p></div></div></section><CtaBand /></>;
}
