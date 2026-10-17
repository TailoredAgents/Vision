import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound(){return <section className="grid min-h-[70svh] place-items-center bg-forest px-4 py-20 text-center text-white"><div><p className="eyebrow">404 · Page not found</p><h1 className="display mt-7 text-[clamp(4rem,10vw,8rem)]">This path came up empty.</h1><p className="mx-auto mt-6 max-w-lg text-white/60">The page may have moved, or the address may be incomplete.</p><Link href="/" className="button button-light mt-9"><ArrowLeft size={16}/>Return home</Link></div></section>}
