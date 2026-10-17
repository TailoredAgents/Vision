"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";
import { mainNav, SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="container-shell flex h-[88px] items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className={`focus-ring py-2 text-[.76rem] font-bold uppercase tracking-[.09em] transition-colors hover:text-bronze ${pathname.startsWith(item.href) ? "text-bronze" : "text-forest"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <a className="focus-ring flex items-center gap-2 text-[.8rem] font-semibold text-muted hover:text-bronze" href={SITE.phoneHref}>
            <Phone size={14} aria-hidden="true" /> {SITE.phoneDisplay}
          </a>
          <Link href="/contact" className="button h-11 min-h-0 px-5">Start a conversation</Link>
        </div>
        <button type="button" className="focus-ring grid h-11 w-11 place-items-center border border-forest/20 lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-black/10 bg-white px-4 py-6 lg:hidden" aria-label="Mobile navigation">
          <div className="container-shell flex flex-col">
            {mainNav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-black/10 py-3 font-semibold">{item.label}</Link>)}
            <Link href="/contact" onClick={() => setOpen(false)} className="button mt-6">Start a conversation</Link>
            <a href={SITE.phoneHref} className="mt-4 text-center text-sm font-semibold">{SITE.phoneDisplay}</a>
          </div>
        </nav>
      )}
    </header>
  );
}
