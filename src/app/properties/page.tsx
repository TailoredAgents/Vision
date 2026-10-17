import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PropertyExplorer } from "@/components/property-explorer";
import { propertyProvider } from "@/lib/properties";

export const metadata: Metadata = { title: "Commercial properties", description: "Explore Vision Commercial Advisors' commercial property experience across Woodstock, North Metro Atlanta, and greater Atlanta.", alternates: { canonical: "/properties" } };

export default async function PropertiesPage() {
  const properties = await propertyProvider.list();
  return <><PageHero eyebrow="Property search" title="Explore the opportunity." intro="A demonstration of how Vision’s available properties can be organized, filtered, and presented. These sample properties are illustrative until an approved live listing feed is connected." /><section className="section pt-12"><div className="container-shell"><PropertyExplorer properties={properties} /></div></section></>;
}
