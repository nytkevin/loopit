"use client";
import { useQuery } from "@tanstack/react-query";
import { Movies, options } from "../lib/helper";
import Image from "next/image";
import { useParams } from "next/navigation";

type CastProps = {
  type: "movie" | "tv";
};

export default function Cast({ type }: CastProps) {
  const params = useParams();
  const id = params.id as string;

  const { data: castData } = useQuery({
    queryKey: ["cast", id],
    queryFn: () =>
      fetch(`https://api.themoviedb.org/3/${type}/${id}/credits`, options).then(
        (res) => res.json(),
      ),
  });
  return (
    <div>
      {castData?.cast?.length > 0 && (
        <div className="px-4 md:px-6 pb-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-5">
            Cast
          </h2>
          <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide w-full">
            {castData.cast.map((member: Movies) => (
              <div
                key={member.id}
                className="flex flex-col items-center gap-2 min-w-18 shrink-0 group cursor-default"
              >
                <div className="relative w-17 h-17 rounded-full overflow-hidden ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-300">
                  <Image
                    src={
                      member.profile_path
                        ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                        : "/fallback.jpg"
                    }
                    alt="poster path"
                    fill
                    className="object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <p className="text-center text-xs text-zinc-400 group-hover:text-white transition-colors duration-200 leading-tight w-18">
                  {member.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
