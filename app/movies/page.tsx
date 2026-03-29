"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { options, Movies } from "../lib/helper";
import Card from "../components/card";
import PageButtons from "../components/pagebuttons";

export default function TopRatedMovies() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { isLoading, error, data } = useQuery({
    queryKey: ["movies", page],
    queryFn: () =>
      fetch(
        `https://api.themoviedb.org/3/movie/popular?page=${page}`,
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
    <>
      <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-6 md:gap-8">
        {data?.results.map((movie: Movies) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <Card
              name={movie.title}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              description={movie?.overview}
            />
          </Link>
        ))}
      </section>
      <PageButtons page={page} />
    </>
  );
}
