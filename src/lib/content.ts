export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  location: string;
  summary: string;
  bio: string[];
  focus: string[];
  credentials?: string[];
};

export const team: TeamMember[] = [
  {
    slug: "david-hacker",
    name: "David Hacker, CCIM",
    title: "Founder, President & Principal Broker",
    location: "Woodstock, Georgia",
    summary: "David founded Vision Commercial Advisors in 2006 and leads the firm’s brokerage and advisory work.",
    bio: [
      "David brings more than 23 years of commercial real estate experience, along with an earlier background in site acquisition, to assignments across the Atlanta market and the Southeast.",
      "Before founding Vision, he worked in wireless network development, negotiating ground leases and leading zoning, project management, and business development work. That operating background informs a practical, detail-conscious approach to brokerage today.",
      "David is a Certified Commercial Investment Member and a member of the Atlanta Commercial Board of Realtors. He serves as Vision’s principal broker while working alongside the broader team on client strategy and execution.",
    ],
    focus: ["Tenant and buyer representation", "Landlord and seller representation", "Site selection", "Investment and development advisory"],
    credentials: ["CCIM designation", "Licensed in Georgia, North Carolina, and Florida", "Atlanta Commercial Board of Realtors"],
  },
  {
    slug: "daniel-latshaw",
    name: "Daniel Latshaw, CCIM, MBA",
    title: "Partner",
    location: "Atlanta, Georgia",
    summary: "Daniel advises owners and investors across a broad range of property and transaction types.",
    bio: [
      "Daniel began investing in Atlanta real estate in the 1990s and went on to build a career in acquisitions, investment sales, and advisory work.",
      "After earning his MBA from Emory University’s Goizueta Business School, he managed acquisitions for an institutional real estate investment firm in London. He later spent more than two decades at an Atlanta commercial brokerage, where he became a partner and advised clients on hundreds of assignments.",
      "At Vision, Daniel brings institutional perspective to a deliberately personal, hands-on client experience.",
    ],
    focus: ["Investment sales", "Owner representation", "Acquisition strategy", "Land and redevelopment"],
    credentials: ["CCIM designation", "MBA, Emory University", "BS, Virginia Tech"],
  },
  {
    slug: "carolyn-gould",
    name: "Carolyn Gould",
    title: "Commercial Real Estate Advisor",
    location: "Roswell, Georgia",
    summary: "Carolyn works with landlords, tenants, and growing companies on complex site and occupancy decisions.",
    bio: [
      "Carolyn brings more than two decades of experience spanning real estate, site acquisition, project management, telecommunications infrastructure, and business development.",
      "Her background includes negotiating land and rooftop leases and managing development work through due diligence, zoning, permitting, and construction.",
      "At Vision, she focuses on landlord and tenant representation, site selection, and advisory services across Metro Atlanta.",
    ],
    focus: ["Landlord representation", "Tenant representation", "Site selection", "Due diligence and project coordination"],
  },
];

export type Insight = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  dek: string;
  body: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const insights: Insight[] = [
  {
    slug: "what-to-verify-before-signing-a-commercial-lease",
    title: "What to verify before signing a commercial lease",
    category: "Tenant advisory",
    date: "2026-09-18",
    readTime: "5 min read",
    dek: "A practical early-stage checklist for businesses evaluating a new location.",
    body: [
      { heading: "Begin with use, not appearance", paragraphs: ["A space can look right and still fail the business. Confirm that the use is allowed, that the building can support the operation, and that customer, employee, delivery, and parking patterns all work before negotiating around finishes."] },
      { heading: "Test the full occupancy cost", paragraphs: ["Base rent is only one line. Ask how operating expenses are calculated, what utilities and maintenance fall to the tenant, whether increases are capped, and what improvements will be required before opening."], bullets: ["Base rent and escalations", "Operating expenses or CAM", "Utilities, insurance, and taxes", "Improvements, permits, and timing"] },
      { heading: "Protect the implementation plan", paragraphs: ["A good lease must work in the real world. Align access dates, permitting, construction, signage, financing, and opening requirements so the legal agreement supports the operating plan."] },
    ],
  },
  {
    slug: "preparing-a-commercial-property-for-market",
    title: "Preparing a commercial property for market",
    category: "Owner advisory",
    date: "2026-08-07",
    readTime: "4 min read",
    dek: "The groundwork that makes positioning, outreach, and negotiation more effective.",
    body: [
      { heading: "Resolve the basic questions first", paragraphs: ["Buyers and tenants respond faster when the story is complete. Assemble current leases, operating history, surveys, environmental information, zoning facts, plans, service records, and material capital history before broad outreach begins."] },
      { heading: "Position for the most credible audience", paragraphs: ["The highest asking price is not a positioning strategy. Effective marketing connects the property’s physical and financial characteristics to the buyers or occupants most likely to recognize its value."], bullets: ["Define the likely user or investor", "Identify friction before prospects do", "Build a concise and defensible value story", "Set a process for tours, diligence, and offers"] },
      { heading: "Create decision-ready materials", paragraphs: ["Strong materials make the next action obvious. Photography, plans, financial summaries, maps, and a clear contact path should help a qualified prospect move from interest to informed evaluation."] },
    ],
  },
  {
    slug: "why-local-context-matters-in-site-selection",
    title: "Why local context matters in site selection",
    category: "Market perspective",
    date: "2026-06-12",
    readTime: "6 min read",
    dek: "The site is only one part of the decision; access, entitlements, labor, and surrounding growth matter too.",
    body: [
      { heading: "A map does not show the whole market", paragraphs: ["Two sites a few miles apart can perform very differently. Traffic patterns, turning movements, planned road work, municipal process, neighboring uses, and local development momentum often change the practical answer."] },
      { heading: "Build a criteria hierarchy", paragraphs: ["Separate requirements from preferences before touring. This helps the team recognize tradeoffs and prevents an attractive but operationally weak property from dominating the process."], bullets: ["Non-negotiable operational requirements", "Customer and workforce access", "Entitlement and timing risk", "Total occupancy or acquisition cost", "Long-term flexibility"] },
      { heading: "Use local knowledge as diligence", paragraphs: ["Local knowledge is most valuable when it turns into better questions, faster verification, and a clearer view of risk—not when it substitutes for documented diligence."] },
    ],
  },
];

export function formatInsightDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}
