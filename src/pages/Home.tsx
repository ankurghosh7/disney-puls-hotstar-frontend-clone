import { searchMovies } from "@/api/getMovieData";
import { Button } from "@/components/ui/button";
import { getCurrentDate } from "@/lib/CurrentDate";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import type { trasndingMoviesProps } from "@/api/getMovieData";
import TrandingMovieGroup from "@/components/TrandingMovieGroup";
function Home() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const searchMoviesFn = async () => {
    if (search.trim() === "") {
      console.log("Please enter a movie name to search");
      return;
    }
    const { data, isLoading, isError } = useQuery({
      queryKey: ["trandingMovies", search],
      queryFn: () => searchMovies(search, page),
      staleTime: 1000 * 60 * 60,
    });
    if (isError) {
      console.log("Error fetching data");
      setIsError(true);
      return;
    }
    if (isLoading) {
      console.log("Loading data");
      setIsLoading(true);
    }
    setData(data);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="xl:w-1/2 mx-auto">
        <div className="flex h-12 w-full rounded-xl border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden">
          <input
            type="text"
            className="w-0 flex-1 border-none focus:outline-none bg-transparent px-3 py-1 text-base"
            placeholder="Search for movies"
            value={search}
            onChange={(e) => handleSearch(e)}
          />
          <Button className="py-0 h-full" onClick={searchMoviesFn}>
            Search
          </Button>
        </div>
      </div>

      <TrandingMovieGroup />
    </div>
  );
}

export default Home;
