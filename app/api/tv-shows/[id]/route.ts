import { options } from "@/app/lib/helper";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}`, options);

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch TV show details" },
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
