import { options } from "../../lib/helper";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const streamProvider = searchParams.get("with_watch_providers");

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_watch_providers=${streamProvider}&watch_region=CA&sort_by=popularity.desc`,

      options,
    );

    if (!res.ok) {
      return Response.json(
        { error: "Failed to popular Movies" },
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
