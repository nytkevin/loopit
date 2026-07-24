import { options } from "@/app/lib/helper";

export async function GET(
  req: Request,

  // Next.js automatically passes the dynamic route parameters
  // as the second argument.
  //
  // If the URL is:
  // /api/movies/550
  //
  // then params will eventually resolve to:
  // { id: "550" }
  //
  // The type annotation tells TypeScript that params is a Promise
  // containing an object with an id property.
  { params }: { params: Promise<{ id: string }> },
) {
  // Wait for the route parameters to resolve, then extract the movie id.
  // Example:
  // params -> Promise<{ id: "550" }>
  // after await -> { id: "550" }
  // id = "550"
  const { id } = await params;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      options,
    );

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch movie details" },
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
