import { useEffect, useRef, useState } from "react";
import { Movies } from "../lib/helper";
import RankedCard from "./rankedCard";
import { GrNext, GrPrevious } from "react-icons/gr";

type RankableItem = Pick<Movies, "id" | "title" | "name" | "poster_path">;
export default function RankedRow({
  category,
  title,
  isLoading,
  items,
  hrefBase,
}: {
  category?: string;
  title: string;
  isLoading: boolean;
  items: RankableItem[];
  hrefBase: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const updateButtons = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
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
  }, [items]);

  return (
    <section className="px-6 md:px-12 mb-14">
      {category && (
        <span className="text-red-500 text-xs font-semibold tracking-widest">
          {category}
        </span>
      )}
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6 mt-1">
        {title}
      </h2>

      {isLoading ? (
        <div className="flex gap-8 overflow-x-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="ml-8 h-64 w-40 shrink-0 rounded-2xl bg-neutral-900 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="relative">
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-90 disabled:cursor-not-allowed cursor-pointer"
            onClick={scrollLeft}
            aria-label="Scroll left"
            disabled={!canScrollLeft}
          >
            <GrPrevious className="h-8 w-8" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-8 pb-4 md:gap-10 scrollbar-hide overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
          >
            {items.slice(0, 10).map((item, i) => (
              <RankedCard
                key={item.id}
                rank={i + 1}
                name={item.title ?? item.name}
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                href={`${hrefBase}/${item.id}`}
              />
            ))}
          </div>

          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-90 disabled:cursor-not-allowed cursor-pointer"
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
