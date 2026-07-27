async function getMovies(streamProvider: number) {
  const res = await fetch(
    `/api/discover?with_watch_providers=${streamProvider}`,
  );

  if (!res.ok) {
    throw new Error("Falied to fetch Popular movies from the server");
  }

  const data = await res.json();

  return data;
}

export { getMovies };
