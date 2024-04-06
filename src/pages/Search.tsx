import { searchMovies } from "@/api/getMovieData";
import SearchBox from "@/components/SearchBox";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { theMovieDBApiOptions } from "@/lib/constants";
import { Link, useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/MovieCard";
import { IoIosArrowBack } from "react-icons/io";

function Search() {
  const { search } = useParams<{ search: string }>();
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    page: "1",
  });
  if (!search) {
    return <div>Search something</div>;
  }
  const page = parseInt(searchParams.get("page") || "1");
  const { data, error, isLoading } = useQuery({
    queryKey: ["search", search, page],
    queryFn: () =>
      axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=true&language=en-US&page=${page}`,
        theMovieDBApiOptions
      ),
    staleTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
  });
  const updatePage = (p: number) => {
    setSearchParams((prev) => {
      prev.set("page", Math.max(page + p, 1).toString());
      return prev;
    });
  };
  return (
    <div className="px-5 xl:px-20 mb-10 relative">
      <SearchBox className="w-full md:w-1/2 mx-auto" value={search} />
      {isLoading && <div>Loading...</div>}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 md:p-5 my-10">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error...</div>}
        {data?.data.results.map((movie: any) => (
          <Link to={`/movies/${movie?.id}`}>
            <MovieCard
              key={movie.id}
              imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              title={movie.title}
            />
          </Link>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={"outline"}
              className={`space-x-2 `}
              onClick={() => updatePage(-1)}
              disabled={page <= 1}
            >
              <IoIosArrowBack />
              <span>Previous</span>
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              variant={"outline"}
              className={`space-x-2 `}
              onClick={() => updatePage(1)}
              disabled={page >= data?.data?.total_pages}
            >
              <span>Next</span>
              <IoIosArrowBack className="rotate-180	" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="hidden md:block fixed bottom-5 right-5  w-10 h-10 bg-gray-100 rounded-full"></div>
    </div>
  );
}

export default Search;
