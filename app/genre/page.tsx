"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
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
export default function Genre() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const { isLoading, error, data } = useQuery<GenreResponse>({
    queryKey: ["genres"],
    queryFn: () =>
      fetch("https://api.themoviedb.org/3/genre/movie/list", options).then(
        (res) => res.json(),
      ),
  });

  const { data: movies, isLoading: moviesLoading } = useQuery({
    queryKey: ["movies", selectedGenre, page],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&&page=${page}`,
        options,
      ).then((res) => res.json()),
  });
  if (isLoading) return "...loading..";
  if (error instanceof Error) return "The error is" + error.message;
  if (moviesLoading) return "Loading movies…";

  return (
    <>
      <div className="flex flex-row  flex-wrap border text-sm border-white/5 md:mx-45 items-center md:gap-3 justify-center m-5">
        {data?.genres.map((genre) => (
          <Button
            key={genre.id}
            label={genre.name}
            isSelected={selectedGenre === genre.id}
            onSelect={() => setSelectedGenre(genre.id)}
          />
        ))}
      </div>

      {movies?.results?.length > 0 && (
        <>
          <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:px-40 md:gap-10 pb-10">
            {movies.results.map((movie: Movies) => (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <Card
                  name={movie.title ?? "NYT KEVIN"}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  description={movie.overview ?? "NYT KEVIN"}
                />
              </Link>
            ))}
          </section>

          <PageButtons page={page} />
        </>
      )}
    </>
  );
}
