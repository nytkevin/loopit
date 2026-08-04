export async function getCast(type: "movie" | "tv", id: string) {
  const res = await fetch(`/api/cast/${type}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch cast");
  }

  const data = await res.json();

  return data;
}
