export const services = [
  {
    slug: "landlord-seller-representation",
    number: "01",
    title: "Landlord & seller representation",
    short: "Bring the property to market with a clear position, disciplined outreach, and experienced negotiation.",
    intro: "For owners, the assignment is never simply to place a sign or publish a listing. The work is to understand the asset, identify the most credible market, remove avoidable friction, and manage a process that protects value.",
    image: "/images/office-facade.jpg",
    steps: [
      ["Position", "Review the asset, ownership objectives, timing, competitive context, and likely prospect profile."],
      ["Prepare", "Build accurate materials and a decision-ready diligence package around the property’s strongest case."],
      ["Reach", "Combine direct outreach, broker relationships, listing platforms, and targeted market communication."],
      ["Negotiate", "Compare economics and execution risk, then carry the chosen path through diligence and closing."],
    ],
    outcomes: ["Leasing strategy and project positioning", "Investment and owner-user sales", "Pricing and market analysis", "Offering materials and targeted outreach", "Tour, proposal, and offer management", "Diligence and transaction coordination"],
  },
  {
    slug: "tenant-buyer-representation",
    number: "02",
    title: "Tenant & buyer representation",
    short: "Translate the business plan into real estate criteria—and the market into a defensible decision.",
    intro: "The best space is the one that supports the operation, the people, and the economics over time. Vision gives tenants and buyers a structured process for defining requirements, understanding the market, testing alternatives, and negotiating from evidence.",
    image: "/images/office-lobby.jpg",
    steps: [
      ["Define", "Clarify operational, geographic, financial, timing, and future-growth requirements."],
      ["Search", "Identify on-market and relevant off-market options, then screen them against the criteria."],
      ["Evaluate", "Compare total cost, condition, location, timing, risk, and the practical work required to occupy."],
      ["Execute", "Structure the business terms and coordinate lease or purchase diligence through completion."],
    ],
    outcomes: ["Requirement and location strategy", "Market survey and property screening", "Site selection and comparative analysis", "Lease renewal and relocation analysis", "Proposal and purchase negotiation", "Diligence and occupancy coordination"],
  },
  {
    slug: "advisory",
    number: "03",
    title: "Advisory services",
    short: "Make the next real estate decision with a clearer view of value, risk, timing, and alternatives.",
    intro: "Some of the most valuable work happens before a transaction begins. Vision helps owners, investors, and businesses evaluate a property or portfolio question, organize the evidence, and determine the next useful move.",
    image: "/images/atlanta-aerial.jpg",
    steps: [
      ["Frame", "Define the decision, the parties affected, the available paths, and what needs to be known."],
      ["Investigate", "Collect relevant market, property, entitlement, operating, and financial information."],
      ["Compare", "Test realistic scenarios and make tradeoffs visible instead of burying them in averages."],
      ["Act", "Turn the recommendation into a practical disposition, acquisition, leasing, or hold plan."],
    ],
    outcomes: ["Acquisition and disposition strategy", "Hold, sell, or reposition analysis", "Site and portfolio review", "Market and rent analysis", "Development and entitlement perspective", "Transaction planning and second opinions"],
  },
] as const;

export type Service = (typeof services)[number];
