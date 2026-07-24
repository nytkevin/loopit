async function getGenres() {
  const res = await fetch("/api/genres");

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  return res.json();
}

export { getGenres };
