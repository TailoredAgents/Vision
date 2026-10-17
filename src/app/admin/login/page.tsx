import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin-auth-form";
import { Logo } from "@/components/logo";
import { getAdminSession } from "@/lib/auth";
export default async function LoginPage(){if(await getAdminSession())redirect("/admin");return <main className="grid min-h-svh place-items-center px-4 py-12"><div className="w-full max-w-md border border-black/10 bg-white p-7 shadow-[0_20px_80px_rgba(22,35,29,.08)] sm:p-10"><Logo/><p className="eyebrow mt-10">Private administration</p><h1 className="mt-5 font-[family-name:var(--font-display)] text-5xl font-medium leading-none">Welcome back.</h1><p className="mt-4 text-sm leading-7 text-muted">Authorized Vision staff only.</p><Suspense><LoginForm/></Suspense><div className="mt-7 flex justify-between text-xs text-muted"><Link href="/">Back to website</Link><Link href="/admin/setup">First-time setup</Link></div></div></main>}
