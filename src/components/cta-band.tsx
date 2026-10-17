import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBand({ title = "A better decision starts with a clear conversation.", body = "Tell us what you are evaluating. We will help define the next useful step.", link = "/contact", label = "Start a conversation" }: { title?: string; body?: string; link?: string; label?: string }) {
  return (
    <section className="bg-bronze text-forest">
      <div className="container-shell grid gap-7 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-18">
        <div><h2 className="display max-w-3xl text-4xl md:text-5xl">{title}</h2><p className="mt-3 max-w-2xl text-sm opacity-75">{body}</p></div>
        <Link href={link} className="button button-light w-fit">{label}<ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}
