import Image from "next/image";
import Link from "next/link";

type RankedCardProps = {
  rank: number;
  name?: string;
  src: string;
  href: string;
};

export default function RankedCard({ rank, name, src, href }: RankedCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex shrink-0 items-end pl-9 md:pl-12 focus-visible:outline-2 focus-visible:outline-red-400 rounded-2xl"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-0 z-0 select-none font-black italic leading-[0.7] text-transparent"
        style={{
          fontSize: "clamp(4.5rem, 9vw, 8rem)",
          WebkitTextStroke: "3px #dc2626",
          textShadow: "0 0 28px rgba(220,38,38,0.35)",
        }}
      >
        {rank}
      </span>

      <div className="relative z-10 h-64 w-36 overflow-hidden rounded-2xl bg-gray-950 border border-white/5 shadow-xl transition-all duration-300 md:h-72 md:w-40 group-hover:shadow-red-500/20 group-hover:shadow-2xl group-hover:border-white/10 group-hover:-translate-y-1">
        <Image
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          src={src || "/download.jpg"}
          alt={name ?? "poster"}
          fill
          sizes="(min-width: 768px) 160px, 144px"
        />
      </div>
    </Link>
  );
}
