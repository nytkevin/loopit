import Image from "next/image";

type cardProps = {
  name?: string;
  src: string;
  description?: string;
};
export default function Card({ name, src, description }: cardProps) {
  //fix the shitty height
  return (
    <div className="group relative flex flex-col overflow-hidden w-56 h-98 object-[50%_-20px] rounded-2xl bg-gray-950 border border-white/5 shadow-xl transition-all duration-300 hover:shadow-red-500/10 hover:shadow-2xl hover:border-white/10 hover:-translate-y-1">
      <div className="relative w-full aspect-square bg-gray-900 overflow-hidden rounded-2xl">
        {
          <Image
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            src={src || "/download.jpg"}
            alt="image poster"
            fill
          />
        }
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-transparent to-transparent" />
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-red-400 text-lg tracking-wide uppercase leading-tight text-center mt-3">
          {name}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
          {description}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-red-500 to-red-400 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}
