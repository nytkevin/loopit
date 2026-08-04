if (!process.env.NEXT_PUBLIC_TMDB_API_Key) {
  throw new Error(
    "NEXT_PUBLIC_TMDB_API_Key is not defined in the environment variables.",
  );
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_Key}`,
  },
};

type Movies = {
  backdrop_path: string | undefined;
  id?: number;
  title?: string;
  name?: string;
  release_date?: string;
  rating?: number;
  ageRating?: string;
  duration?: string;
  poster_path?: string;
  overview?: string;
  tags?: string[];
  number_of_episodes?: number;
  popularity?: string;
  profile_path?: string;
  media_type?: string;
  vote_average?: number;
  first_air_date?: string;
};

type Video = {
  key: string;
  site: string;
  type: string;
  name: string;
};

export type VideosResponse = {
  results: Video[];
};

export { options };
export type { Movies };
export type { Video };
