import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`focus-ring inline-flex shrink-0 items-center ${light ? "bg-white px-3 py-2" : ""}`}
      aria-label="Vision Commercial Advisors home"
    >
      <Image
        src="/images/vision-commercial-advisors-logo.png"
        alt="Vision Commercial Advisors"
        width={635}
        height={288}
        priority
        className="h-auto w-[166px] sm:w-[186px]"
      />
    </Link>
  );
}
