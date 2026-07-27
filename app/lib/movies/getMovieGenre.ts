async function getMovieGenres() {
  const res = await fetch("/api/movies/genre");

  if (!res.ok) {
    throw new Error("Failed to fetch movies genres");
  }

  return res.json();
}

export { getMovieGenres };
