import { options } from "@/app/lib/helper";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/popular?page=${page}`,
      options,
    );

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch popular TV shows" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    console.error("Error fetching TV shows:", err);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
