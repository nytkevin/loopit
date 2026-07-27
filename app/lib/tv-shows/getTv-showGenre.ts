async function getTvShowGenres() {
  const res = await fetch("/api/tv-shows/genre");

  if (!res.ok) {
    throw new Error("Failed to fetch tv-show genres");
  }

  return res.json();
}

export { getTvShowGenres };
