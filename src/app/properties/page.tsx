import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { assetExperience } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Commercial property experience",
  description: "Commercial property representation and advisory experience across Woodstock, North Metro Atlanta, and greater Atlanta.",
  alternates: { canonical: "/properties" },
};

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Property experience"
        title="The right opportunity starts with the right brief."
        intro="Vision advises owners, investors, tenants, and buyers across multiple commercial property types. Current availability changes; contact the team for active opportunities or to discuss a property assignment."
      />
      <section className="section bg-paper">
        <div className="container-shell">
          <div className="grid gap-8 md:grid-cols-[.72fr_1.28fr]">
            <p className="eyebrow self-start">Representative experience</p>
            <div><h2 className="display text-[clamp(2.8rem,5.5vw,5.3rem)]">Property knowledge in service of the decision.</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-muted">The work is not limited to a single asset class. Vision brings the same disciplined process to each assignment: understand the objective, establish the evidence, and stay close through execution.</p></div>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {assetExperience.map((item) => (
              <article key={item.title} className="group">
                <div className="relative aspect-[16/11] overflow-hidden bg-stone"><Image src={item.image} alt={`${item.title} commercial real estate`} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" /><div className="absolute inset-x-0 bottom-0 h-1 bg-bronze" /></div>
                <div className="border-b hairline py-6"><p className="text-[.72rem] font-bold uppercase tracking-[.13em] text-bronze">{item.label}</p><h3 className="mt-3 font-[family-name:var(--font-display)] text-[2rem] font-medium leading-tight">{item.title}</h3><p className="mt-4 text-[.95rem] leading-7 text-muted">{item.description}</p><Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-[.75rem] font-bold uppercase tracking-[.1em]">Related service <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-ivory">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div><p className="eyebrow">Current opportunities</p><h2 className="display mt-7 max-w-3xl text-[clamp(3rem,6vw,5.8rem)]">Ask what is active now.</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-muted">Public inventory is only part of the market. For broker-verified availability, upcoming assignments, or a focused property search, start with the requirement rather than an unverified listing page.</p><Link href="/contact" className="button mt-8">Discuss your requirements <ArrowRight size={16} /></Link></div>
          <div className="border border-black/10 bg-paper p-7 md:p-9"><p className="text-xs font-bold uppercase tracking-[.14em] text-bronze">What to share</p><div className="mt-6 divide-y hairline">{["The property type or assignment", "Your preferred market or corridor", "Timing, operating needs, and priorities", "Known constraints or decision criteria"].map((item) => <p key={item} className="flex gap-3 py-4 text-[.95rem] font-semibold"><Check className="mt-1 shrink-0 text-bronze" size={17} />{item}</p>)}</div></div>
        </div>
      </section>
      <CtaBand title="Have a property or requirement in mind?" body="Tell us what you are evaluating, and we will help define the next useful step." />
    </>
  );
}
