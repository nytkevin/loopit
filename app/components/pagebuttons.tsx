"use client";

type PaginationProps = {
  page: number;
  setPage: (newPage: number) => void;
};

export default function PageButtons({ page, setPage }: PaginationProps) {
  return (
    <div className="w-full flex justify-center gap-6 mt-10 pb-10">
      <button
        onClick={() => {
          if (page > 1) setPage(page - 1);
        }}
        className="bg-gray-800 text-zinc-400 px-4 py-2 rounded-2xl hover:text-white"
      >
        Prev
      </button>
      <span className="text-white mt-2">Page {page}</span>
      <button
        onClick={() => setPage(page + 1)}
        className="bg-gray-800 text-zinc-400 px-4 py-2 rounded-2xl hover:text-white"
      >
        Next
      </button>
    </div>
  );
}
