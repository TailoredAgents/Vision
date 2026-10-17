import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Building2, Compass, LineChart, MapPin } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { propertyFixtures } from "@/lib/properties";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commercial real estate, clearly advised",
  description: "Commercial real estate brokerage and advisory services for owners, investors, tenants, and buyers in Woodstock, North Metro Atlanta, and beyond.",
  alternates: { canonical: "/" },
};

const services = [
  { icon: Building2, number: "01", title: "Landlord & seller representation", text: "Positioning, market outreach, negotiation, and transaction stewardship built around the asset and the owner’s objective.", href: "/services/landlord-seller-representation" },
  { icon: Compass, number: "02", title: "Tenant & buyer representation", text: "A structured search and evaluation process that keeps operations, economics, timing, and long-term flexibility in view.", href: "/services/tenant-buyer-representation" },
  { icon: LineChart, number: "03", title: "Advisory services", text: "Practical analysis for acquisition, disposition, site selection, repositioning, and the decisions that come before a transaction.", href: "/services/advisory" },
] as const;

export default function Home() {
  const featured = propertyFixtures.filter((property) => property.featured);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    address: { "@type": "PostalAddress", streetAddress: SITE.address.street, addressLocality: SITE.address.city, addressRegion: SITE.address.region, postalCode: SITE.address.postalCode, addressCountry: "US" },
    areaServed: ["Woodstock, Georgia", "Cherokee County, Georgia", "North Metro Atlanta", "Atlanta, Georgia"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="relative isolate min-h-[calc(100svh-76px)] overflow-hidden bg-forest text-white">
        <Image src="/images/vision-hero-grounded.png" alt="Illustrative established brick professional building in a wooded North Georgia setting" fill priority sizes="100vw" className="object-cover object-[62%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,25,19,.94)_0%,rgba(12,25,19,.79)_38%,rgba(12,25,19,.23)_74%,rgba(12,25,19,.1)_100%)]" />
        <div className="container-shell relative flex min-h-[calc(100svh-76px)] flex-col justify-between py-10 md:py-14">
          <p className="max-w-md text-xs font-bold uppercase tracking-[.17em] text-bronze-light">Woodstock, Georgia · Serving Metro Atlanta</p>
          <div className="max-w-[820px] py-14">
            <h1 className="display max-w-[760px] text-[clamp(3.2rem,7vw,6.6rem)]">Commercial real estate decisions,<br /><span className="text-bronze-light">made clearer.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/72 md:text-lg">Independent guidance for owners, investors, tenants, and buyers navigating consequential real estate decisions across North Metro Atlanta and beyond.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="button button-light" href="/contact">Start a conversation <ArrowRight size={16} /></Link>
              <Link className="button border-white/50 bg-transparent hover:border-bronze hover:bg-bronze" href="/properties">Explore properties</Link>
            </div>
          </div>
          <div className="flex items-end justify-between gap-5 text-xs text-white/55">
            <p>Brokerage · Site selection · Investment advisory</p>
            <a href="#perspective" className="focus-ring hidden items-center gap-2 uppercase tracking-[.14em] sm:flex">Our perspective <ArrowDown size={15} /></a>
          </div>
        </div>
      </section>

      <section id="perspective" className="section bg-paper">
        <div className="container-shell">
          <SectionHeading eyebrow="The Vision approach" title="Local context. Clear thinking. Senior attention." body="Good commercial real estate advice begins before a property tour or listing launch. It begins with the right questions—about the business, the asset, the market, and what a successful outcome actually requires." />
          <div className="mt-16 grid border-y hairline md:grid-cols-3">
            {[
              ["01", "Understand the decision", "Define the objective, constraints, stakeholders, and timing before the market starts shaping the conversation."],
              ["02", "Build the evidence", "Combine market context, property facts, operating requirements, and transaction economics into a useful point of view."],
              ["03", "Stay through execution", "Carry the strategy through outreach, diligence, negotiation, and the practical details required to close."],
            ].map(([number, title, text]) => (
              <div key={number} className="border-b hairline px-0 py-8 last:border-b-0 md:border-r md:border-b-0 md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <p className="text-xs font-bold tracking-[.15em] text-bronze">{number}</p>
                <h3 className="mt-8 font-[family-name:var(--font-display)] text-3xl font-medium leading-tight">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-forest text-white">
        <div className="container-shell">
          <SectionHeading light eyebrow="What we do" title="Advice built around the assignment—not a template." />
          <div className="mt-16 divide-y divide-white/13 border-y border-white/13">
            {services.map(({ icon: Icon, number, title, text, href }) => (
              <Link key={href} href={href} className="group grid gap-5 py-8 md:grid-cols-[80px_1fr_1fr_50px] md:items-center md:py-10">
                <div className="flex items-center gap-4 text-bronze-light"><Icon size={22} strokeWidth={1.5} /><span className="text-xs tracking-[.15em]">{number}</span></div>
                <h3 className="font-[family-name:var(--font-display)] text-3xl font-medium leading-tight md:text-4xl">{title}</h3>
                <p className="max-w-xl text-sm leading-7 text-white/60">{text}</p>
                <ArrowRight className="text-bronze-light transition-transform group-hover:translate-x-2" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section overflow-hidden bg-ivory">
        <div className="container-shell">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div><p className="eyebrow">Selected opportunities</p><h2 className="display mt-7 text-[clamp(3rem,6vw,5.8rem)]">A sharper way to explore the market.</h2></div>
            <Link href="/properties" className="button button-outline w-fit">View all properties <ArrowRight size={16} /></Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">The properties shown in this website demonstration are illustrative—not active listings. The system is ready to connect to an approved live listing source.</p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featured.map((property, index) => (
              <Link href={`/properties/${property.slug}`} key={property.slug} className={`group ${index === 1 ? "lg:mt-16" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-stone"><Image src={property.image} alt="Illustrative commercial property photography" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /><span className="absolute left-4 top-4 bg-forest px-3 py-1.5 text-[.62rem] font-bold uppercase tracking-[.12em] text-white">Illustrative</span></div>
                <div className="border-b hairline py-5">
                  <div className="flex justify-between gap-4"><p className="text-xs font-bold uppercase tracking-[.12em] text-bronze">{property.offering} · {property.type}</p><span className="text-xs text-muted">{property.size}</span></div>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium leading-none">{property.title}</h3>
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted"><MapPin size={14} />{property.address}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[480px] overflow-hidden bg-stone"><Image src="/images/atlanta-aerial.jpg" alt="Aerial view of Atlanta, Georgia" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-forest/15" /><p className="absolute bottom-0 left-0 bg-forest px-5 py-4 text-xs font-bold uppercase tracking-[.13em] text-bronze-light">Woodstock · North Metro · Atlanta</p></div>
          <div className="lg:pl-10">
            <p className="eyebrow">A local point of view</p>
            <h2 className="display mt-7 text-[clamp(3rem,6vw,5.8rem)]">Rooted here. Useful well beyond it.</h2>
            <p className="mt-7 max-w-xl leading-8 text-muted">Vision is based in Woodstock, where growth, infrastructure, entitlement, and community character meet in real time. That North Metro perspective is paired with seasoned experience across Atlanta and the Southeast.</p>
            <p className="mt-5 max-w-xl leading-8 text-muted">The firm is led by founder and principal broker David Hacker, working alongside a senior team with complementary backgrounds in investment sales, site acquisition, leasing, and project execution.</p>
            <div className="mt-7 flex max-w-xl items-center gap-5 border-y hairline py-5">
              <span className="display text-5xl text-bronze">23+</span>
              <span className="text-xs font-bold uppercase tracking-[.12em] text-forest">Years of commercial real estate experience</span>
            </div>
            <Link className="mt-8 inline-flex items-center gap-2 border-b border-bronze pb-1 text-xs font-bold uppercase tracking-[.12em] text-forest" href="/about">About Vision <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
