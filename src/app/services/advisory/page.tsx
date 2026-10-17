import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service-detail";
import { services } from "@/lib/services";
export const metadata: Metadata = { title: "Commercial real estate advisory", description: services[2].short, alternates: { canonical: "/services/advisory" } };
export default function Page() { return <ServiceDetail service={services[2]} />; }
