"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";

import { options, Movies } from "../lib/helper";
import Button from "../components/button";
import Card from "../components/card";
import PageButtons from "../components/pagebuttons";

type Genre = { id: number; name: string };
type GenreResponse = { genres: Genre[] };

export default function GenrePage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const { data: genresData, isLoading: genresLoading } =
    useQuery<GenreResponse>({
      queryKey: ["genres"],
      queryFn: () =>
        fetch("https://api.themoviedb.org/3/genre/movie/list", options).then(
          (res) => res.json(),
        ),
    });

  const { data: moviesData, isLoading: moviesLoading } = useQuery({
    queryKey: ["movies", selectedGenre, page],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&page=${page}`,
        options,
      ).then((res) => res.json()),
    enabled: !!selectedGenre,
  });

  if (genresLoading) return <div>Loading genres...</div>;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-1 md:gap-4 p-5 border border-white/5 text-sm">
        {genresData?.genres.map((genre) => (
          <Button
            key={genre.id}
            label={genre.name}
            isSelected={selectedGenre === genre.id}
            onSelect={() => {
              setSelectedGenre(genre.id);
              setPage(1);
            }}
          />
        ))}
      </div>

      {moviesLoading ? (
        <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:gap-10 pb-10">
          {Array.from({ length: 20 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-800 animate-pulse h-64 rounded-md"
            />
          ))}
        </section>
      ) : (
        moviesData?.results?.length > 0 && (
          <>
            <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:gap-10 pb-10">
              {moviesData.results.map((movie: Movies) => (
                <Link key={movie.id} href={`/movies/${movie.id}`}>
                  <Card
                    name={movie.title}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    description={movie.overview}
                  />
                </Link>
              ))}
            </section>
            <PageButtons page={page} setPage={setPage} />
          </>
        )
      )}
    </div>
  );
}
