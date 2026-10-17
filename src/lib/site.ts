export const SITE = {
  name: "Vision Commercial Advisors",
  shortName: "Vision",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Independent commercial real estate guidance for owners, investors, tenants, and buyers across Woodstock, North Metro Atlanta, and the greater Atlanta market.",
  phoneDisplay: "(770) 740-4766",
  phoneHref: "tel:+17707404766",
  email: "david.hacker@vcacre.com",
  address: {
    street: "770 Dobbs Road",
    city: "Woodstock",
    region: "GA",
    postalCode: "30188",
  },
  linkedIn: "https://www.linkedin.com/company/vision-commercial-advisors/",
} as const;

export const mainNav = [
  { href: "/properties", label: "Properties" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/insights", label: "Insights" },
] as const;

export const serviceAreas = [
  "Woodstock",
  "Cherokee County",
  "North Metro Atlanta",
  "Greater Atlanta",
] as const;

export function absoluteUrl(path: string) {
  return new URL(path, SITE.url).toString();
}
