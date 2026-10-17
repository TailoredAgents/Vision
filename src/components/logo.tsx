import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`focus-ring inline-flex shrink-0 items-center ${light ? "border border-white/15 bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,.12)]" : ""}`}
      aria-label="Vision Commercial Advisors home"
    >
      <Image
        src="/images/vision-commercial-advisors-logo.png"
        alt="Vision Commercial Advisors"
        width={635}
        height={288}
        priority
        className={light ? "h-auto w-[188px]" : "h-[72px] w-auto sm:h-[78px]"}
      />
    </Link>
  );
}
