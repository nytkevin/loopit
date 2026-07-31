"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Card from "../components/card";
import { Movies } from "../lib/helper";
import { getSearchMedia } from "../lib/search/getSearch";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { isLoading, error, data } = useQuery({
    queryKey: ["search", query],
    queryFn: () => getSearchMedia(query),
    enabled: query.length > 0,
  });

  const combinedResults = data?.results?.filter(
    (item: Movies) => item.media_type === "movie" || item.media_type === "tv",
  );

  return (
    <div className="flex flex-col pb-96">
      <h1 className="my-6 text-center text-xl font-semibold text-white md:text-2xl">
        {query ? (
          <>
            Results for{" "}
            <span className="text-red-500">&quot;{query}&quot;</span>
          </>
        ) : (
          "Search for a movie or TV show"
        )}
      </h1>

      {isLoading && (
        <section className="mx-5 grid grid-cols-2 items-stretch gap-5 pb-10 md:grid-cols-6 md:gap-8 lg:grid-cols-7 lg:gap-8">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-md bg-gray-800"
            />
          ))}
        </section>
      )}

      {error && (
        <p className="text-center text-red-500">
          Error: {(error as Error).message}
        </p>
      )}

      {!isLoading && query && combinedResults?.length === 0 && (
        <p className="text-center text-white">No results found!</p>
      )}

      {combinedResults && combinedResults.length > 0 && (
        <section className="mx-5 grid grid-cols-2 items-stretch gap-5 pb-10 md:grid-cols-6 md:gap-8 lg:grid-cols-7 lg:gap-8">
          {combinedResults.map((item: Movies) => (
            <Link
              key={item.id}
              href={
                item.media_type === "tv"
                  ? `/tv-shows/${item.id}`
                  : `/movies/${item.id}`
              }
              className="relative"
            >
              <span className="absolute top-2 left-2 z-10 rounded-md bg-red-600/90 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                {item.media_type === "movie" ? "Movie" : "TV"}
              </span>

              <Card
                name={item.title || item.name}
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "/download.jpg"
                }
              />
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
