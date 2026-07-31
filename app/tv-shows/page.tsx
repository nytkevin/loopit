"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Movies } from "../lib/helper";
import Card from "../components/card";
import Link from "next/link";
import PageButtons from "../components/pagebuttons";
import { getTvShows } from "../lib/tv-shows/getTv-shows";

export default function Tvshows() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tvshows", page],
    queryFn: () => getTvShows(page),
  });

  if (isLoading) {
    return (
      <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:gap-8 lg:grid-cols-7 lg:gap-8 items-stretch">
        {Array.from({ length: 22 }).map((_, index) => (
          <div key={index} className="w-36 md:w-40">
            <div className="relative h-64 w-36 md:h-72 md:w-40 overflow-hidden rounded-2xl bg-gray-800 animate-pulse border border-white/5">
              <div className="absolute inset-0 bg-linear-to-t from-gray-700/40 to-transparent" />
            </div>

            <div className="mt-1 flex items-center justify-between">
              <div className="h-4 w-full rounded bg-gray-800 animate-pulse" />
            </div>
          </div>
        ))}
      </section>
    );
  }

  if (error)
    return (
      <div className="text-red-500 text-center">
        An error occurred: {(error as Error).message}
      </div>
    );

  return (
    <div>
      <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:gap-8 lg:grid-cols-7 lg:gap-8 items-stretch">
        {data.results.map((tvshow: Movies) => (
          <Link key={tvshow.id} href={`/tv-shows/${tvshow.id}`}>
            <Card
              name={tvshow.name}
              src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
              rating={
                tvshow.vote_average != undefined
                  ? Math.round(tvshow.vote_average * 10) / 10
                  : undefined
              }
              year={tvshow.first_air_date?.split("-")[0]}
            />
          </Link>
        ))}
      </section>

      <PageButtons page={page} setPage={setPage} />
    </div>
  );
}
