import { options } from "@/app/lib/helper";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/tv/day",
      options,
    );

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch top 10 movies today" },
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
