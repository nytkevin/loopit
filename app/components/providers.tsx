import Link from "next/link";
import Card from "./card";
import { getMovies } from "../lib/discover/getDiscover";
import { Movies } from "../lib/helper";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateButtons = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  // const movies: Movies[] = data?.results ?? [];

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  useEffect(() => {
    updateButtons();

    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    return () => {
      container.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [data]);

  return (
    <section className="px-4 md:px-12 mb-10 md:mb-12 relative">
      <span className="text-red-500 text-xs font-semibold tracking-widest">
        {eyebrow}
      </span>
      <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 mt-1">
        {label}
      </h2>

      {isLoading ? (
        <div className="flex gap-3 md:gap-4 overflow-x-auto">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="aspect-2/3 w-28 sm:w-36 md:w-44 shrink-0 rounded-lg bg-neutral-900 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="relative">
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 disabled:cursor-not-allowed cursor-pointer"
            onClick={scrollLeft}
            aria-label="Scroll left"
            disabled={!canScrollLeft}
          >
            <GrPrevious className="h-8 w-8" />
          </button>

          <div
            className="flex gap-8 md:gap-10  overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
            ref={scrollRef}
          >
            {data?.results.slice(0, 20).map((movie: Movies) => (
              <Link
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="shrink-0 snap-start"
              >
                <Card
                  name={movie.title}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rating={
                    movie.vote_average !== undefined
                      ? Math.round(movie.vote_average * 10) / 10
                      : undefined
                  }
                  year={movie.release_date?.split("-")[0]}
                />
              </Link>
            ))}
          </div>

          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 disabled:cursor-not-allowed cursor-pointer"
            onClick={scrollRight}
            aria-label="Scroll right"
            disabled={!canScrollRight}
          >
            <GrNext className="h-8 w-8" />
          </button>
        </div>
      )}
    </section>
  );
}
