export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="bg-forest py-20 text-ivory md:py-28">
      <div className="container-shell grid gap-8 md:grid-cols-[.72fr_1.28fr] md:items-end">
        <p className="eyebrow self-start">{eyebrow}</p>
        <div>
          <h1 className="display max-w-4xl text-[clamp(3.3rem,7vw,6.8rem)]">{title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/67 md:text-lg">{intro}</p>
        </div>
      </div>
    </section>
  );
}
