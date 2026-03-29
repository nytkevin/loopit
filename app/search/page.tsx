"use client";
import { useQuery } from "@tanstack/react-query";
import { Movies, options } from "../lib/helper";
import { useEffect, useState } from "react";
import Card from "../components/card";
import Link from "next/link";

export default function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500); // 500ms delay
    return () => clearTimeout(handler);
  }, [query]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}`,
        options,
      ).then((res) => res.json()),
    enabled: query.length > 0,
  });
  const movies = data?.results?.filter(
    (item: Movies) => item.media_type === "movie",
  );
  const tvshows = data?.results?.filter(
    (item: Movies) => item.media_type === "tv",
  );

  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-center my-6">
        <input
          type="search"
          className="text-white w-2xl hover:border-red-500 border border-gray-400 h-12 rounded-2xl placeholder:text-center"
          placeholder="Type to begin searching"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading && <p>.... fetching Movies ... </p>}
      {error && <p>Error is {error?.message}</p>}
      <div>
        {movies?.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-white mb-4">Movies</h2>
            <div className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:px-40 md:gap-10 pb-10">
              {movies?.map((movie: Movies) => (
                <Link key={movie.id} href={`/movies/${movie.id}`}>
                  <Card
                    name={movie.title}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    description={movie.overview}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <div>
        {tvshows?.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-white mb-4">TV Shows</h2>
            <div className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:px-40 md:gap-10 pb-10">
              {tvshows?.map((tvshow: Movies) => (
                <Link key={tvshow.id} href={`/tv-shows/${tvshow.id}`}>
                  <Card
                    name={tvshow.name}
                    src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
                    description={tvshow.overview}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
