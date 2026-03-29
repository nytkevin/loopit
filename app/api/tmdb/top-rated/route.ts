import { useQuery } from "@tanstack/react-query";
import { options } from "@/app/lib/helper";

function GET() {
  const { isPending, error } = useQuery({
    queryKey: ["movies"],
    queryFn: () =>
      fetch("https://api.themoviedb.org/3/movie/popular", options).then((res) =>
        res.json(),
      ),
  });
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
}

export { GET };
