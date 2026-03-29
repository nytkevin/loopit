"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { Movies, options } from "../lib/helper";
import Card from "../components/card";
import Link from "next/link";
import PageButtons from "../components/pagebuttons";

export default function Tvshows() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, error } = useQuery({
    queryKey: ["tvshows", page],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/tv/popular?page=${page}`,
        options,
      ).then((res) => res.json()),
  });
  if (isLoading) {
    return (
      <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:gap-8">
        {Array.from({ length: 12 }).map((_, index) => (
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
      <div className="text-red-500">
        An error occurred: {(error as Error).message}
      </div>
    );
  return (
    <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:px-40 md:gap-10 pb-10">
      {data.results.map((tvshow: Movies) => (
        <Link key={tvshow.id} href={`/tv-shows/${tvshow.id}`}>
          <Card
            name={tvshow.name}
            src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
            description={tvshow.overview}
          />
        </Link>
      ))}
      <PageButtons page={page} />
    </section>
  );
}
