const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_Key}`,
  },
};

type Movies = {
  id?: number;
  title?: string;
  name?: string;
  year?: number;
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
};

export { options };
export type { Movies };
