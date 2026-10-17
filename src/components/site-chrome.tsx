"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
export function SiteChrome({children}:{children:ReactNode}){const pathname=usePathname();const admin=pathname.startsWith("/admin");return <>{!admin&&<Header/>}<main id="main-content">{children}</main>{!admin&&<Footer/>}</>}
