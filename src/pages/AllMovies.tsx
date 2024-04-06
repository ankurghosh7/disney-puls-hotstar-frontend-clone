import { getCurrentDate } from "@/lib/CurrentDate";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import React, { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { Link, useSearchParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import axios from "axios";
import { theMovieDBApiOptions } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import SearchBox from "@/components/SearchBox";

function AllMovies() {
  const date = parseInt(getCurrentDate());
  let [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const page = parseInt(searchParams.get("page") || "1");
  const { data, error, isLoading } = useQuery({
    queryKey: ["all-movies", page, date],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?certification_country=IN&include_adult=true&include_video=false&language=en-IN/en-US&page=${page}&region=IN&primary_release_date.lte=${date}&sort_by=popularity.desc&vote_average.lte=10&watch_region=IN&with_original_language=hi&with_runtime.gte=0&with_runtime.lte=400`,
          theMovieDBApiOptions
        )
        .then((res) => res.data)
        .catch((error) => {
          console.error(`all:Movies:API:error:: ${error}`);
          return error;
        }),
    placeholderData: keepPreviousData,
  });
  const updatePage = (p: number) => {
    setSearchParams((prev) => {
      prev.set("page", Math.max(page + p, 1).toString());
      return prev;
    });
  };
  useEffect(() => {
    window.scrollY = 0;
  }, [searchParams, setSearchParams, page]);
  console.log(data);
  return (
    <div className="px-5 xl:px-20 mb-10 relative">
      <div className="flex flex-wrap items-center md:my-10 justify-center space-y-5 md:space-y-0 md:justify-between">
        <h1 className="text-xl md:text-3xl font-bold text-center">
          All Movies
        </h1>
        <SearchBox className="w-full md:w-80" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 md:p-5 my-10">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error...</div>}
        {data?.results.map((movie: any) => (
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
              disabled={page >= data?.total_pages}
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

export default AllMovies;
