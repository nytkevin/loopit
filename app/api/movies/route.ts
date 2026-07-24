import { options } from "../../lib/helper";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("pages");

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${page}`,
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
