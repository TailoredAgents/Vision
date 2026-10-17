import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";
import { services } from "@/lib/services";
export const metadata: Metadata = { title: "Landlord & seller representation", description: services[0].short, alternates: { canonical: "/services/landlord-seller-representation" } };
export default function Page() { return <ServiceDetail service={services[0]} />; }
