"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";

import { options, Movies } from "../lib/helper";
import Button from "../components/button";
import Card from "../components/card";
import PageButtons from "../components/pagebuttons";

type Genre = {
  id: number;
  name: string;
};

type GenreResponse = {
  genres: Genre[];
};

type MediaType = "movie" | "tv";

type MediaResponse = {
  results: Movies[];
  total_pages: number;
};

export default function GenrePage() {
  const [mediaType, setMediaType] = useState<MediaType>("movie");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const { data: genresData, isLoading: genresLoading } =
    useQuery<GenreResponse>({
      queryKey: ["genres", mediaType],
      queryFn: () =>
        fetch(
          `https://api.themoviedb.org/3/genre/${mediaType}/list`,
          options,
        ).then((res) => res.json()),
    });

  const {
    data: mediaData,
    isLoading: mediaLoading,
    error,
  } = useQuery<MediaResponse>({
    queryKey: ["genre-media", mediaType, selectedGenre, page],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/discover/${mediaType}?with_genres=${selectedGenre}&page=${page}`,
        options,
      ).then((res) => res.json()),
    enabled: selectedGenre !== null,
  });

  const handleMediaTypeChange = (type: MediaType) => {
    setMediaType(type);
    setSelectedGenre(null);
    setPage(1);
  };

  useEffect(() => {
    if (genresData?.genres.length) {
      setSelectedGenre(genresData.genres[0].id);
    }
  }, [genresData]);

  if (error) {
    return (
      <div className="text-red-500">
        An error occurred: {(error as Error).message}
      </div>
    );
  }

  return (
    <div>
      {/* Movie / TV toggle */}
      <div className="flex justify-center gap-2 pt-5">
        <button
          onClick={() => handleMediaTypeChange("movie")}
          className={`
            px-5 py-2 rounded-full text-sm font-semibold transition
            ${
              mediaType === "movie"
                ? "bg-red-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }
          `}
        >
          Movies
        </button>
        <button
          onClick={() => handleMediaTypeChange("tv")}
          className={`
            px-5 py-2 rounded-full text-sm font-semibold transition
            ${
              mediaType === "tv"
                ? "bg-red-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }
          `}
        >
          TV Shows
        </button>
      </div>

      {/* Genre buttons for the selected media type */}
      <div className="flex flex-wrap justify-center gap-1 border border-white/5 p-5 text-sm md:gap-4">
        {genresLoading ? (
          <div className="text-gray-400">Loading genres...</div>
        ) : (
          genresData?.genres.map((genre) => (
            <Button
              key={genre.id}
              label={genre.name}
              isSelected={selectedGenre === genre.id}
              onSelect={() => {
                setSelectedGenre(genre.id);
                setPage(1);
              }}
            />
          ))
        )}
      </div>

      {mediaLoading ? (
        <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:gap-8 lg:grid-cols-7 lg:gap-8 items-stretch">
          {Array.from({ length: 21 }).map((_, index) => (
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
      ) : (
        <>
          <section className="mx-5 grid grid-cols-2 gap-5 items-stretch pb-10 md:grid-cols-6 md:gap-8 lg:grid-cols-7 lg:gap-8">
            {mediaData?.results.map((item) => (
              <Link
                key={item.id}
                href={
                  mediaType === "tv"
                    ? `/tv-shows/${item.id}`
                    : `/movies/${item.id}`
                }
                className="h-full"
              >
                <Card
                  name={item.title || item.name}
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "/download.jpg"
                  }
                  rating={
                    item.vote_average !== undefined
                      ? Math.round(item.vote_average * 10) / 10
                      : undefined
                  }
                  year={
                    item.release_date?.split("-")[0] ||
                    item.first_air_date?.split("-")[0]
                  }
                />
              </Link>
            ))}
          </section>

          {mediaData && mediaData.results.length > 0 && (
            <PageButtons page={page} setPage={setPage} />
          )}
        </>
      )}
    </div>
  );
}
