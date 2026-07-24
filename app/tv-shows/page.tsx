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
      <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:gap-7 lg:grid-cols-6 lg:gap-8">
        {Array.from({ length: 22 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-800 animate-pulse h-64 rounded-md"
          />
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
    <>
      <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:gap-8 lg:grid-cols-6 lg:gap-8 items-stretch">
        {data.results.map((tvshow: Movies) => (
          <Link key={tvshow.id} href={`/tv-shows/${tvshow.id}`}>
            <Card
              name={tvshow.name}
              src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
              description={tvshow.overview}
            />
          </Link>
        ))}
      </section>

      <PageButtons page={page} setPage={setPage} />
    </>
  );
}
