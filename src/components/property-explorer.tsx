"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { trackEvent } from "./analytics-tracker";
import type { Property } from "@/lib/properties";

export function PropertyExplorer({ properties }: { properties: Property[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [offering, setOffering] = useState("All");
  const types = ["All", ...new Set(properties.map((property) => property.type))];
  const filtered = useMemo(() => properties.filter((property) => {
    const textMatch = `${property.title} ${property.address} ${property.market} ${property.type}`.toLowerCase().includes(query.toLowerCase());
    return textMatch && (type === "All" || property.type === type) && (offering === "All" || property.offering === offering);
  }), [properties, query, type, offering]);

  function updateType(value: string) { setType(value); trackEvent("property_filter", { filter: "type", value }); }
  function updateOffering(value: string) { setOffering(value); trackEvent("property_filter", { filter: "offering", value }); }

  return (
    <>
      <div className="grid gap-4 border-y hairline py-6 md:grid-cols-[1fr_220px_220px]">
        <label className="relative"><span className="sr-only">Search properties</span><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} /><input className="field pl-10" placeholder="Search by name, market, or type" value={query} onChange={(event) => setQuery(event.target.value)} onBlur={() => query && trackEvent("property_search", { query })} /></label>
        <label><span className="sr-only">Property type</span><select className="field" value={type} onChange={(event) => updateType(event.target.value)}>{types.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label><span className="sr-only">Offering type</span><select className="field" value={offering} onChange={(event) => updateOffering(event.target.value)}><option>All</option><option>For sale</option><option>For lease</option></select></label>
      </div>
      <div className="mt-7 flex items-center justify-between text-xs text-muted"><p>{filtered.length} illustrative {filtered.length === 1 ? "property" : "properties"}</p><p className="flex items-center gap-2"><SlidersHorizontal size={14} />Refine results above</p></div>
      {filtered.length ? (
        <div className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <Link href={`/properties/${property.slug}`} key={property.slug} className="group" onClick={() => trackEvent("listing_view", { slug: property.slug })}>
              <div className="relative aspect-[4/3] overflow-hidden bg-stone"><Image src={property.image} alt="Illustrative commercial property photography" fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" /><span className="absolute left-3 top-3 bg-forest px-2.5 py-1 text-[.6rem] font-bold uppercase tracking-[.12em] text-white">Illustrative</span></div>
              <div className="border-b hairline py-5"><div className="flex justify-between gap-3 text-[.68rem] font-bold uppercase tracking-[.1em] text-bronze"><span>{property.offering} · {property.type}</span><span className="text-muted">{property.size}</span></div><h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium leading-none">{property.title}</h2><p className="mt-3 flex items-center gap-2 text-sm text-muted"><MapPin size={14} />{property.address}</p><p className="mt-4 text-sm font-semibold">{property.price}</p></div>
            </Link>
          ))}
        </div>
      ) : <div className="my-14 border border-dashed border-stone p-10 text-center"><h2 className="font-[family-name:var(--font-display)] text-3xl">No matching properties</h2><p className="mt-2 text-sm text-muted">Try broadening the search or clearing a filter.</p><button className="button button-outline mt-5" onClick={() => { setQuery(""); setType("All"); setOffering("All"); }}>Clear filters</button></div>}
    </>
  );
}
