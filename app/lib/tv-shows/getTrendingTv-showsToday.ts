async function getTrendingTvShowsToday() {
  const res = await fetch(`/api/tv-shows/trending`);

  if (!res.ok) {
    throw new Error("Falied to fetch Top 10 tv-shows today from the server");
  }

  const data = await res.json();

  return data;
}

export { getTrendingTvShowsToday };
