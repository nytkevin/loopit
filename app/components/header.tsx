"use client";

import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getSearchMedia } from "../lib/search/getSearch";
import { Movies } from "../lib/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["search-preview", debouncedQuery],
    queryFn: () => getSearchMedia(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
  });

  const results = data?.results?.slice(0, 6);

  const handleSeeMore = () => {
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="relative md:sticky top-0 z-50 backdrop-blur-md md:border-b border-white/5 ml-10 md:ml-52 py-3 rounded-l-2xl">
      <div className="flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold tracking-wide uppercase text-white">
          Loop It
        </h1>

        <div className="relative flex items-center gap-3" ref={containerRef}>
          <FaSearch className="text-gray-400" />

          <div className="relative w-40 md:w-72">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => {
                if (query) setIsOpen(true);
              }}
              placeholder="Search..."
              className="
                w-full bg-transparent
                text-white text-sm
                outline-none
                pb-1
                border-b border-gray-500
                focus:border-red-500
                transition-colors
              "
            />

            <span
              className={`
                absolute bottom-0 left-0 h-px bg-red-500
                transition-all duration-300
                ${query ? "w-full" : "w-0"}
              `}
            />

            {/* Search Popup */}
            {query && isOpen && (
              <div
                className="
                  absolute top-10 left-0
                  w-72
                  rounded-xl
                  bg-gray-950
                  border border-white/10
                  shadow-2xl
                  overflow-hidden
                  z-50
                "
              >
                {isLoading && (
                  <p className="p-4 text-gray-400 text-sm">Searching...</p>
                )}

                {!isLoading && results?.length === 0 && (
                  <p className="p-4 text-gray-400 text-sm">No results found</p>
                )}

                {results?.map((item: Movies) => (
                  <Link
                    key={item.id}
                    href={
                      item.media_type === "tv"
                        ? `/tv-shows/${item.id}`
                        : `/movies/${item.id}`
                    }
                    onClick={() => setIsOpen(false)}
                    className="
                      flex items-center gap-3
                      p-3
                      hover:bg-white/5
                      transition
                    "
                  >
                    <Image
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                          : "/download.jpg"
                      }
                      alt={item.name || "aloys"}
                      className="h-12 w-8 rounded object-cover"
                      height={12}
                      width={14}
                    />

                    <div>
                      <p className="text-white text-sm font-semibold truncate">
                        {item.title || item.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {item.media_type === "movie" ? "Movie" : "TV Show"}
                      </p>
                    </div>
                  </Link>
                ))}

                {!isLoading && results && results.length > 0 && (
                  <button
                    onClick={handleSeeMore}
                    className="
                      w-full
                      text-center
                      text-sm
                      text-red-500
                      font-semibold
                      p-3
                      border-t border-white/10
                      hover:bg-white/5
                      transition
                    "
                  >
                    See more
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
