"use client";
import { useRouter } from "next/navigation";

type PaginationProps = {
  page: number;
};

export default function PageButtons({ page }: PaginationProps) {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center gap-6 mt-10">
      <button
        onClick={() => {
          if (page > 1) router.push(`?page=${page - 1}`);
        }}
        className="bg-gray-800 text-zinc-400 px-4 py-2 rounded-2xl hover:text-white"
      >
        Prev
      </button>
      <span className="text-white mt-2">Page {page}</span>
      <button
        onClick={() => router.push(`?page=${page + 1}`)}
        className="bg-gray-800 text-zinc-400 px-4 py-2 rounded-2xl hover:text-white"
      >
        Next
      </button>
    </div>
  );
}
