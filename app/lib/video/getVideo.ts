import { options } from "../helper";

export async function getVideos(type: "movie" | "tv", id: string) {
  const res = await fetch(`/api/videos/${type}/${id}`, options);

  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }

  const data = await res.json();

  return data;
}
