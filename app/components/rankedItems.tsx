import { Movies } from "../lib/helper";
import RankedCard from "./rankedCard";

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
        <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory md:gap-10">
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
      )}
    </section>
  );
}
