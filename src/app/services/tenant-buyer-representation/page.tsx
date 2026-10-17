import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";
import { services } from "@/lib/services";
export const metadata: Metadata = { title: "Tenant & buyer representation", description: services[1].short, alternates: { canonical: "/services/tenant-buyer-representation" } };
export default function Page() { return <ServiceDetail service={services[1]} />; }
