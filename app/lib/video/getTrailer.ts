import { VideosResponse } from "../helper";

export function getTrailer(videos: VideosResponse) {
  return videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );
}
