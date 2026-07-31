"use client";

import { useQuery } from "@tanstack/react-query";

import { getTrendingMoviesToday } from "../lib/movies/getTrendingMoviesToday";
import { getTrendingTvShowsToday } from "../lib/tv-shows/getTrendingTv-showsToday";
import Hero from "./hero";
import ProviderRow from "./providers";
import RankedRow from "./rankedItems";

const PROVIDERS = [
  { id: 8, label: "Netflix", eyebrow: "STREAMING ON NETFLIX" },
  // { id: 9, label: "Amazon Prime", eyebrow: "STREAMING ON PRIME VIDEO" },
  { id: 531, label: "Paramount+", eyebrow: "STREAMING ON PARAMOUNT+" },
  { id: 337, label: "Disney+", eyebrow: "STREAMING ON DISNEY+" },
  // { id: 15, label: "Hulu", eyebrow: "STREAMING ON HULU" },
  // { id: 1899, label: "Max", eyebrow: "STREAMING ON MAX" },
  { id: 350, label: "Apple TV+", eyebrow: "STREAMING ON APPLE TV+" },
  // { id: 386, label: "Peacock", eyebrow: "STREAMING ON PEACOCK" },
  { id: 283, label: "Crunchyroll", eyebrow: "STREAMING ON CRUNCHYROLL" },
  { id: 257, label: "FuboTV", eyebrow: "STREAMING ON FUBOTV" },
  // { id: 34, label: "Mubi", eyebrow: "STREAMING ON MUBI" },
  { id: 73, label: "Tubi TV", eyebrow: "STREAMING ON TUBI TV" },
  { id: 212, label: "Hoopla", eyebrow: "STREAMING ON HOOPLA" },
  { id: 11, label: "Kanopy", eyebrow: "STREAMING ON KANOPY" },
];

export default function Welcome() {
  const { data: tvShows, isLoading: tvLoading } = useQuery({
    queryKey: ["trendingTvShows"],
    queryFn: getTrendingTvShowsToday,
  });

  const { data: trendingMovies, isLoading: trendingLoading } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () => getTrendingMoviesToday(),
  });

  return (
    <main className="bg-black min-h-screen text-white">
      <Hero />

      <div className="pt-14">
        <RankedRow
          category="TOP 10 TODAY"
          title="Movies"
          isLoading={trendingLoading}
          items={trendingMovies?.results ?? []}
          hrefBase="/movies"
        />

        <RankedRow
          category="TOP 10 TODAY"
          title="TV Shows"
          isLoading={tvLoading}
          items={tvShows?.results ?? []}
          hrefBase="/tv-shows"
        />

        {PROVIDERS.map((p) => (
          <ProviderRow
            key={p.id}
            id={p.id}
            label={p.label}
            eyebrow={p.eyebrow}
          />
        ))}
      </div>
    </main>
  );
}
