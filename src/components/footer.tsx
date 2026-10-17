import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { mainNav, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-forest text-ivory">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:py-20">
        <div>
          <Logo light />
          <p className="mt-7 max-w-sm text-[.95rem] leading-7 text-white/70">Independent commercial real estate guidance, rooted in Woodstock and serving North Metro Atlanta and the greater Atlanta market.</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.15em] text-bronze-light">Explore</p>
          <div className="mt-5 grid gap-2 text-[.92rem] text-white/76">
            {mainNav.map((item) => <Link className="w-fit py-1 hover:text-bronze-light" key={item.href} href={item.href}>{item.label}</Link>)}
            <Link className="w-fit py-1 hover:text-bronze-light" href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[.15em] text-bronze-light">Connect</p>
          <address className="mt-5 not-italic text-[.92rem] leading-7 text-white/76">
            {SITE.address.street}<br />{SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}<br />
            <a className="hover:text-bronze-light" href={SITE.phoneHref}>{SITE.phoneDisplay}</a><br />
            <a className="break-all hover:text-bronze-light" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </address>
          <a className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-bronze-light" href={SITE.linkedIn} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vision Commercial Advisors. All rights reserved.</p>
          <div className="flex gap-5"><Link href="/privacy">Privacy</Link><Link href="/admin/login">Admin</Link></div>
        </div>
      </div>
    </footer>
  );
}
