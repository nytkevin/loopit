async function getMovieDetail(id: number | string) {
  const res = await fetch(`/api/movies/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch movie details from the server");
  }

  return res.json();
}

export { getMovieDetail };
