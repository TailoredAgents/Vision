export function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: string; body?: string; light?: boolean }) {
  return (
    <div className="grid gap-7 md:grid-cols-[.72fr_1.28fr]">
      <p className="eyebrow self-start">{eyebrow}</p>
      <div>
        <h2 className={`display text-[clamp(2.8rem,5.5vw,5.3rem)] ${light ? "text-ivory" : "text-forest"}`}>{title}</h2>
        {body && <p className={`mt-6 max-w-2xl text-[1.02rem] leading-8 md:text-lg ${light ? "text-white/72" : "text-muted"}`}>{body}</p>}
      </div>
    </div>
  );
}
