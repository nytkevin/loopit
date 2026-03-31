"use client";

import Cast from "@/app/components/cast";
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
        <div className="bg-linear-to-t from-black via-black/70 to-transparent w-full p-6 flex gap-6">
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            width={250}
            height={375}
            className="rounded-xl shadow-lg"
          />
          <div className="flex flex-col justify-end">
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <p className="text-gray-300 mt-2">
              {data.vote_average} | {data.release_date}
            </p>
            <p className="mt-4 max-w-2xl text-gray-200">{data.overview}</p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-gray-400">Budget</h2>
          <p className="text-lg font-semibold">
            ${data.budget?.toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-gray-400">Revenue</h2>
          <p className="text-lg font-semibold">
            ${data.revenue?.toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-gray-400">Runtime</h2>
          <p className="text-lg font-semibold">{data.runtime} min</p>
        </div>
        <div>
          <h2 className="text-gray-400">Status</h2>
          <p className="text-lg font-semibold">{data.status}</p>
        </div>
        <div>
          <h2 className="text-gray-400">Language</h2>
          <p className="text-lg font-semibold uppercase">
            {data.original_language}
          </p>
        </div>
        <div>
          <h2 className="text-gray-400">Genres</h2>
          <p className="text-lg font-semibold">
            {data.genres?.map((g: Movies) => g.name).join(", ")}
          </p>
        </div>
      </div>

      {data.homepage && (
        <div className="px-6 pb-6">
          <a
            href={data.homepage}
            target="_blank"
            className="text-blue-400 underline"
          >
            Visit Official Website
          </a>
        </div>
      )}

      <a
        href={`https://www.themoviedb.org/movie/${id}/cast`}
        className="cursor-pointer"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Cast type="movie" />
      </a>
    </div>
  );
}
