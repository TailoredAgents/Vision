import { AdminHeader, EmptyState } from "@/components/admin-ui";
import { LeadsTable } from "@/components/leads-table";
import { leadData } from "@/lib/admin-data";
export default async function LeadsPage(){const data=await leadData();return <><AdminHeader eyebrow="Contact pipeline" title="Leads"/>{data===null?<EmptyState title="Lead storage is not active" body="Connect the database and run migrations to receive and manage website inquiries."/>:data.length?<LeadsTable initial={data}/>:<EmptyState title="No inquiries yet" body="Contact and property forms are ready. New submissions will appear here with their source and status."/>}</>}
