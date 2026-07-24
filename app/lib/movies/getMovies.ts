async function getMovies(page: number) {
  const res = await fetch(`/api/movies?pages=${page}`);

  if (!res.ok) {
    throw new Error("Falied to fetch Popular movies from the server");
  }

  const data = await res.json();

  return data;
}

export { getMovies };
