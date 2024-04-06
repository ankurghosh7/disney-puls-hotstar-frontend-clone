import { searchMovies, trandingMovies } from "@/api/getMovieData";
import { getCurrentDate } from "@/lib/CurrentDate";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import React from "react";
import MovieCard from "../components/MovieCard";
import { useSearchParams } from "react-router-dom";

const date = parseInt(getCurrentDate());
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import { theMovieDBApiOptions } from "@/lib/constants";
function AllMovies() {
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
  console.log(data);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">All Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error...</div>}
        {data?.results.map((movie: any) => (
          <MovieCard
            key={movie.id}
            imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            title={movie.title}
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={page < 1}
              onClick={() => updatePage(-1)}
              className={`${
                page <= 1 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={page == 1}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => updatePage(1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default AllMovies;
