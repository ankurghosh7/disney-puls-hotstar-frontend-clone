import React from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { trandingMovies } from "@/api/getMovieData";
import { useQuery } from "@tanstack/react-query";
import { getCurrentDate } from "@/lib/CurrentDate";
import type { trasndingMoviesProps } from "@/api/getMovieData";
function TrandingMovieGroup() {
  const date = parseInt(getCurrentDate());
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trandingMovies"],
    queryFn: trandingMovies(1, date),
    staleTime: 3600000,
  });
  console.log(data);
  return (
    <div>
      <div className="w-full overflow-x-auto">
        <MovieCard
          imageUrl="https://media.themoviedb.org/t/p/w220_and_h330_face/hr9rjR3J0xBBKmlJ4n3gHId9ccx.jpg"
          title="Animal"
        />
      </div>
      <Link to={"/all-movies"}></Link>
    </div>
  );
}

export default TrandingMovieGroup;
