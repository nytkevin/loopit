"use client";

import { useQuery } from "@tanstack/react-query";

import { getTrendingMoviesToday } from "../lib/movies/getTrendingMoviesToday";
import { getTrendingTvShowsToday } from "../lib/tv-shows/getTrendingTv-showsToday";
import Hero from "./hero";
import ProviderRow from "./providers";
import RankedRow from "./rankedItems";

const PROVIDERS = [
  { id: 8, label: "Netflix", eyebrow: "STREAMING ON NETFLIX" },
  { id: 9, label: "Amazon Prime", eyebrow: "STREAMING ON PRIME VIDEO" },
  { id: 531, label: "Paramount+", eyebrow: "STREAMING ON PARAMOUNT+" },
  { id: 337, label: "Disney+", eyebrow: "STREAMING ON DISNEY+" },
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
