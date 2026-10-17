import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/lead-form";
import { propertyFixtures, propertyProvider } from "@/lib/properties";

export async function generateStaticParams() { return propertyFixtures.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = await propertyProvider.getBySlug(slug);
  if (!property) return { title: "Property not found" };
  return { title: property.title, description: property.description, alternates: { canonical: `/properties/${property.slug}` }, robots: { index: false, follow: true } };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await propertyProvider.getBySlug(slug);
  if (!property) notFound();
  return (
    <>
      <section className="bg-forest py-8 text-white"><div className="container-shell"><Link href="/properties" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-bronze-light"><ArrowLeft size={14} />All properties</Link><div className="mt-14 grid gap-8 md:grid-cols-[1.25fr_.75fr] md:items-end"><div><p className="eyebrow">{property.offering} · {property.type}</p><h1 className="display mt-6 text-[clamp(3.6rem,7vw,7rem)]">{property.title}</h1><p className="mt-6 flex items-center gap-2 text-white/65"><MapPin size={17} />{property.address}</p></div><div className="border-l border-white/15 pl-6"><p className="text-xs uppercase tracking-[.13em] text-white/45">Offering</p><p className="mt-2 text-xl">{property.price}</p><p className="mt-6 text-xs uppercase tracking-[.13em] text-white/45">Size</p><p className="mt-2 text-xl">{property.size}</p></div></div></div></section>
      <div className="bg-bronze px-4 py-3 text-center text-xs font-bold uppercase tracking-[.12em] text-forest">Illustrative demonstration property — not an active listing</div>
      <section className="container-shell py-6 md:py-10"><div className="relative h-[330px] overflow-hidden bg-stone md:aspect-[16/8] md:h-auto md:min-h-[330px]"><Image src={property.image} alt="Illustrative commercial property photography" fill priority sizes="100vw" className="object-cover" /></div></section>
      <section className="section pt-8"><div className="container-shell grid gap-14 lg:grid-cols-[1fr_420px]"><div><p className="eyebrow">The opportunity</p><h2 className="display mt-7 text-5xl md:text-6xl">A closer look.</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-muted">{property.description}</p><div className="mt-10 grid gap-4 border-y hairline py-7 sm:grid-cols-3">{property.highlights.map((highlight) => <p className="flex gap-3 text-sm font-semibold" key={highlight}><Check className="mt-1 shrink-0 text-bronze" size={16} />{highlight}</p>)}</div><div className="mt-10 border-l-2 border-bronze bg-ivory p-6 text-sm leading-7 text-muted"><strong className="text-forest">Demonstration content:</strong> Address detail, financials, photography, and highlights on this page are sample content used to demonstrate the finished property experience. They must be replaced by an approved listing feed or broker-verified data before publication as inventory.</div></div><aside className="bg-ivory p-6 md:p-8"><p className="eyebrow">Discuss this property</p><h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-medium leading-none">Start with your requirements.</h2><p className="mb-7 mt-4 text-sm leading-7 text-muted">Tell us what you are evaluating and a Vision advisor will follow up.</p><LeadForm source="property" propertySlug={property.slug} compact /></aside></div></section>
    </>
  );
}
