"use client";

// import Cast from "@/app/components/cast";
import { Movies, options } from "@/app/lib/helper";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function MovieDetails() {
  const params = useParams();
  const id = params.id as string;

  const { isLoading, error, data } = useQuery({
    queryKey: ["movies", id],
    queryFn: () =>
      fetch(`https://api.themoviedb.org/3/movie/${id}`, options).then((res) =>
        res.json(),
      ),
  });

  if (isLoading) return "..loading..";
  if (error instanceof Error) return error.message;

  return (
    <div className="text-white">
      <div
        className="relative h-[60vh] bg-cover bg-center flex items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        }}
      >
        <div className="bg-linear-to-t from-black via-black/70 to-transparent w-full p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6">
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            width={250}
            height={375}
            className="rounded-xl shadow-lg w-28 h-auto sm:w-40 md:w-64 self-start sm:self-auto"
          />
          <div className="flex flex-col justify-end">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {data.title}
            </h1>
            <p className="text-gray-300 mt-2 text-sm md:text-base">
              {data.vote_average} | {data.release_date}
            </p>
            <p className="mt-3 md:mt-4 max-w-2xl text-gray-200 text-sm md:text-base">
              {data.overview}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div>
          <h2 className="text-gray-400 text-sm md:text-base">Budget</h2>
          <p className="text-base md:text-lg font-semibold">
            ${data.budget?.toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-gray-400 text-sm md:text-base">Revenue</h2>
          <p className="text-base md:text-lg font-semibold">
            ${data.revenue?.toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-gray-400 text-sm md:text-base">Runtime</h2>
          <p className="text-base md:text-lg font-semibold">
            {data.runtime} min
          </p>
        </div>
        <div>
          <h2 className="text-gray-400 text-sm md:text-base">Status</h2>
          <p className="text-base md:text-lg font-semibold">{data.status}</p>
        </div>
        <div>
          <h2 className="text-gray-400 text-sm md:text-base">Language</h2>
          <p className="text-base md:text-lg font-semibold uppercase">
            {data.original_language}
          </p>
        </div>
        <div>
          <h2 className="text-gray-400 text-sm md:text-base">Genres</h2>
          <p className="text-base md:text-lg font-semibold">
            {data.genres?.map((g: Movies) => g.name).join(", ")}
          </p>
        </div>
      </div>

      {data.homepage && (
        <div className="px-4 md:px-6 pb-6">
          <a
            href={data.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 cursor-pointer text-sm md:text-base"
          >
            {/* <Cast type="movie" /> */}
          </a>
        </div>
      )}
    </div>
  );
}
