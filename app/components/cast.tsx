"use client";

import { useQuery } from "@tanstack/react-query";
import { Movies } from "../lib/helper";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getCast } from "../lib/cast/getCast";

type CastProps = {
  type: "movie" | "tv";
};

export default function Cast({ type }: CastProps) {
  const params = useParams();
  const id = params.id as string;

  const { data: castData } = useQuery({
    queryKey: ["cast", type, id],
    queryFn: () => getCast(type, id),
  });

  return (
    <div className="min-w-0 w-full">
      {castData?.cast?.length > 0 && (
        <div className="px-4 md:px-6 pb-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-5">
            Cast
          </h2>

          <div className=" flex gap-5 overflow-x-auto pb-4 w-full min-w-0 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent hover:scrollbar-thumb-zinc-500 ">
            {castData.cast.map((member: Movies) => (
              <div
                key={member.id}
                className=" group relative shrink-0 w-36 md:w-44 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/20 "
              >
                <div className="relative h-52 md:h-60 overflow-hidden">
                  <Image
                    src={
                      member.profile_path
                        ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                        : "/fallback.jpg"
                    }
                    alt={member.name || ""}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                </div>

                <div className="p-3">
                  <p className=" text-sm font-semibold text-white truncate ">
                    {member.name}
                  </p>

                  <p className="text-xs text-zinc-400  truncate mt-1">
                    {member.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
