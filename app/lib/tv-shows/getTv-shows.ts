async function getTvShows(page: number) {
  const res = await fetch(`/api/tv-shows?page=${page}`);

  if (!res.ok) {
    throw new Error("failed to fetch popular tv shows from the server");
  }

  const data = await res.json();

  return data;
}

export { getTvShows };
