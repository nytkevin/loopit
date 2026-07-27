async function getTrendingMoviesToday() {
  const res = await fetch(`/api/movies/trending`);

  if (!res.ok) {
    throw new Error("Falied to fetch Top 10 movies today from the server");
  }

  const data = await res.json();

  return data;
}

export { getTrendingMoviesToday };
