import { options } from "@/app/lib/helper";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string; type: string }> },
) {
  const { id, type } = await params;

  try {
    if (type !== "movie" && type !== "tv") {
      return Response.json({ error: "Invalid media type" }, { status: 400 });
    }

    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits`,
      options,
    );

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch cast" },
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
