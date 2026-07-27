import Link from "next/link";
import Card from "./card";
import { getMovies } from "../lib/discover/getDiscover";
import { Movies } from "../lib/helper";
import { useQuery } from "@tanstack/react-query";

export default function ProviderRow({
  id,
  label,
  eyebrow,
}: {
  id: number;
  label: string;
  eyebrow: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["providerMovies", id],
    queryFn: () => getMovies(id),
  });

  const movies: Movies[] = data?.results ?? [];

  return (
    <section className="px-4 md:px-12 mb-10 md:mb-12">
      <span className="text-red-500 text-xs font-semibold tracking-widest">
        {eyebrow}
      </span>
      <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 mt-1">
        {label}
      </h2>

      {isLoading ? (
        <div className="flex gap-3 md:gap-4 overflow-x-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-2/3 w-28 sm:w-36 md:w-44 shrink-0 rounded-lg bg-neutral-900 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div
          className="flex gap-3 md:gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {movies.slice(0, 10).map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="shrink-0 snap-start"
            >
              <Card
                name={movie.title}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
