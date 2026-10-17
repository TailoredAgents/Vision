import { AdminNav } from "@/components/admin-nav";
import { requireAdmin } from "@/lib/auth";
export default async function DashboardLayout({children}:{children:React.ReactNode}){const session=await requireAdmin();return <div><AdminNav email={session.email}/><div className="lg:pl-64"><main className="mx-auto min-h-svh max-w-[1500px] p-5 sm:p-8 lg:p-10">{children}</main></div></div>}
