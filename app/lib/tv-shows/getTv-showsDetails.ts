async function getTVShowDetail(id: number | string) {
  const res = await fetch(`/api/tv-shows/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch TV show details from the server");
  }

  return res.json();
}

export { getTVShowDetail };
