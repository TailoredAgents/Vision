export type Property = {
  slug: string;
  title: string;
  address: string;
  market: string;
  type: "Office" | "Industrial" | "Retail" | "Land" | "Investment";
  offering: "For sale" | "For lease";
  price: string;
  size: string;
  image: string;
  description: string;
  highlights: string[];
  featured?: boolean;
  illustrative: true;
};

const properties: Property[] = [
  {
    slug: "ridgewalk-professional-center",
    title: "Ridgewalk Professional Center",
    address: "Woodstock, Georgia",
    market: "Cherokee County",
    type: "Office",
    offering: "For lease",
    price: "Rate upon request",
    size: "1,800–5,400 SF",
    image: "/images/office-facade.jpg",
    description: "A flexible professional office concept positioned near a growing North Metro corridor.",
    highlights: ["Flexible suite configurations", "Convenient corridor access", "Prominent building identity"],
    featured: true,
    illustrative: true,
  },
  {
    slug: "north-georgia-logistics-center",
    title: "North Georgia Logistics Center",
    address: "Canton, Georgia",
    market: "Cherokee County",
    type: "Industrial",
    offering: "For lease",
    price: "$12.50/SF NNN",
    size: "18,000–42,000 SF",
    image: "/images/industrial-exterior.jpg",
    description: "Modern warehouse and flex space designed for efficient access and adaptable operations.",
    highlights: ["Dock and drive-in access", "Clear-span warehouse", "North Metro distribution reach"],
    featured: true,
    illustrative: true,
  },
  {
    slug: "main-street-woodstock-office",
    title: "Main Street Woodstock Office",
    address: "Woodstock, Georgia",
    market: "Downtown Woodstock",
    type: "Office",
    offering: "For sale",
    price: "$1,425,000",
    size: "6,750 SF",
    image: "/images/office-lobby.jpg",
    description: "A character-rich owner-user office opportunity near downtown amenities and regional access.",
    highlights: ["Walkable setting", "Owner-user potential", "Distinctive interior character"],
    featured: true,
    illustrative: true,
  },
  {
    slug: "highway-92-retail-pad",
    title: "Highway 92 Retail Pad",
    address: "Woodstock, Georgia",
    market: "Highway 92 Corridor",
    type: "Retail",
    offering: "For sale",
    price: "$795,000",
    size: "1.4 acres",
    image: "/images/atlanta-aerial.jpg",
    description: "A visible commercial pad concept for neighborhood-serving retail or professional use.",
    highlights: ["Signalized-corridor context", "Flexible commercial concept", "Strong residential trade area"],
    illustrative: true,
  },
  {
    slug: "towne-lake-medical-suite",
    title: "Towne Lake Medical Suite",
    address: "Woodstock, Georgia",
    market: "Towne Lake",
    type: "Office",
    offering: "For lease",
    price: "$24.00/SF full service",
    size: "2,450 SF",
    image: "/images/office-facade.jpg",
    description: "A polished professional suite concept adaptable to medical or general office use.",
    highlights: ["Efficient floor plan", "Surface parking", "Established professional setting"],
    illustrative: true,
  },
  {
    slug: "i-575-commerce-park",
    title: "I-575 Commerce Park",
    address: "Holly Springs, Georgia",
    market: "I-575 Corridor",
    type: "Industrial",
    offering: "For sale",
    price: "$3,950,000",
    size: "31,200 SF",
    image: "/images/industrial-facade.jpg",
    description: "An owner-user industrial concept with room for operations, distribution, and future flexibility.",
    highlights: ["Interstate proximity", "Functional loading", "Adaptable office-to-warehouse ratio"],
    illustrative: true,
  },
  {
    slug: "roswell-road-investment",
    title: "Roswell Road Investment",
    address: "Marietta, Georgia",
    market: "Cobb County",
    type: "Investment",
    offering: "For sale",
    price: "$2,650,000",
    size: "14,800 SF",
    image: "/images/retail-facade.jpg",
    description: "A neighborhood commercial investment concept with repositioning and leasing potential.",
    highlights: ["Multi-tenant format", "Established corridor", "Value-add potential"],
    illustrative: true,
  },
  {
    slug: "cherokee-development-tract",
    title: "Cherokee Development Tract",
    address: "Cherokee County, Georgia",
    market: "North Metro Atlanta",
    type: "Land",
    offering: "For sale",
    price: "$1,875,000",
    size: "12.6 acres",
    image: "/images/atlanta-aerial.jpg",
    description: "A conceptual commercial land opportunity positioned for a disciplined entitlement and development review.",
    highlights: ["Growing submarket", "Development-scale acreage", "Multiple use scenarios to evaluate"],
    illustrative: true,
  },
];

export interface PropertyProvider {
  list(): Promise<Property[]>;
  getBySlug(slug: string): Promise<Property | undefined>;
}

export class MockPropertyProvider implements PropertyProvider {
  async list() { return properties; }
  async getBySlug(slug: string) { return properties.find((property) => property.slug === slug); }
}

export const propertyProvider: PropertyProvider = new MockPropertyProvider();
export const propertyFixtures = properties;
