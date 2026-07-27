import { options } from "@/app/lib/helper";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/tv/list",
      options,
    );

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch tv-show genres" },
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
