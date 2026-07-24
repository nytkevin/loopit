import { options } from "@/app/lib/helper";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}`,
      options,
    );

    if (!res.ok) {
      return Response.json(
        { error: "Failed to search TMDB" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    console.error(err);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
