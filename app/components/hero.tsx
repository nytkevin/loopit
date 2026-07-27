import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getTrendingMoviesToday } from "../lib/movies/getTrendingMoviesToday";
import { Movies } from "../lib/helper";
import Link from "next/link";

const ROTATE_MS = 6000;

export default function Hero() {
  const { data, isLoading } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () => getTrendingMoviesToday(),
  });

  const topTen: Movies[] = data?.results?.slice(0, 10) ?? [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotion.current || topTen.length === 0) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % topTen.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, topTen.length]);

  if (isLoading) {
    return (
      <section className="h-[60vh] md:h-[75vh] bg-neutral-900 animate-pulse" />
    );
  }

  if (topTen.length === 0) return null;

  const movie = topTen[active];
  const backdrop = movie.backdrop_path ?? movie.poster_path;

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden bg-black"
    >
      <div
        key={movie.id}
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 animate-[fadeIn_0.7s_ease]"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop})`,
        }}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-red-950/50 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end gap-4 px-6 pb-16 md:px-12 md:pb-20 max-w-2xl">
        <span className="text-red-500 font-semibold tracking-widest text-xs md:text-sm">
          #{active + 1} TRENDING TODAY
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          {movie.title}
        </h1>
        <p className="text-neutral-300 text-sm md:text-base line-clamp-3">
          {movie.overview}
        </p>
        <Link
          href={`/movies/${movie.id}`}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        >
          More info
        </Link>
      </div>

      <div className="absolute z-10 bottom-6 left-6 md:left-12 flex gap-1.5">
        {topTen.map((m, i) => (
          <button
            key={m.id}
            aria-label={`Show ${m.title}`}
            onClick={() => setActive(i)}
            className="h-1.5 w-8 rounded-full bg-white/25 overflow-hidden focus-visible:outline-2 focus-visible:outline-red-400 cursor-pointer"
          >
            {i === active && (
              <div
                key={`${active}-${paused}`}
                className="h-full bg-red-600 rounded-full"
                style={{
                  animation: paused
                    ? "none"
                    : `fillBar ${ROTATE_MS}ms linear forwards`,
                  width: paused ? "100%" : undefined,
                }}
              />
            )}
            {i < active && <div className="h-full w-full bg-red-600" />}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes fillBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
