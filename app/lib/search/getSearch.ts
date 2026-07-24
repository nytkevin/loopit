async function getSearchMedia(query: string) {
  const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);

  if (!res.ok) {
    throw new Error("Failed to search media");
  }

  return res.json();
}

export { getSearchMedia };
