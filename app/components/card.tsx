import Image from "next/image";
import { FaStar } from "react-icons/fa6";

type cardProps = {
  name?: string;
  src: string;
  rating?: number;
  year?: string;
};
export default function Card({ name, src, rating, year }: cardProps) {
  return (
    <section className="w-36 md:w-40">
      <div className="group relative flex flex-col overflow-hidden h-64 w-36 md:h-72 md:w-40 rounded-2xl bg-gray-950 border border-white/5 shadow-xl transition-all duration-300 hover:shadow-red-500/10 hover:shadow-2xl hover:border-white/10 hover:-translate-y-1 py-2">
        <div className="relative w-full h-full bg-gray-900 overflow-hidden rounded-2xl">
          <Image
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            src={src || "/download.jpg"}
            alt="image poster"
            fill
            sizes="(min-width: 768px) 160px, 144px"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-red-500 to-red-400 transition-all duration-300 group-hover:w-full" />
      </div>

      <div className="w-full">
        <h2 className="mt-2 w-full truncate px-0.5 text-start text-sm font-bold leading-tight text-white">
          {name}
        </h2>

        <div className="flex items-center justify-start gap-1.5 pt-0.5 text-sm text-white">
          <FaStar fill="red" />
          <span>{rating}</span>

          {year && <span className="ml-auto px-2">{year}</span>}
        </div>
      </div>
    </section>
  );
}
