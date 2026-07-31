"use client";

import { useQuery } from "@tanstack/react-query";
import { Movies } from "../lib/helper";
import Card from "../components/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
      <h1 className="text-white text-xl md:text-2xl font-semibold text-center my-6">
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
        <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:gap-8 lg:grid-cols-6 lg:gap-8 pb-10">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 animate-pulse h-64 rounded-md"
            />
          ))}
        </section>
      )}

      {error && (
        <p className="text-red-500 text-center">
          Error: {(error as Error).message}
        </p>
      )}

      {!isLoading && query && combinedResults?.length === 0 && (
        <p className="text-white text-center">No results found !</p>
      )}

      {combinedResults && combinedResults.length > 0 && (
        <div className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:gap-8 lg:grid-cols-6 lg:gap-8 pb-10">
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
              <span
                className="
                  absolute top-2 left-2 z-10
                  text-[10px] font-bold uppercase
                  text-white
                  bg-red-600/90
                  px-2 py-0.5
                  rounded-md
                "
              >
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
        </div>
      )}
    </div>
  );
}
