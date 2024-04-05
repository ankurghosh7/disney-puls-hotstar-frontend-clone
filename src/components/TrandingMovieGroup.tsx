import React from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { trandingMovies } from "@/api/getMovieData";
import { useQuery } from "@tanstack/react-query";
import { getCurrentDate } from "@/lib/CurrentDate";
import movieData from "../../movie.json";
function TrandingMovieGroup() {
  const date = parseInt(getCurrentDate());

  const { data, error, isLoading } = useQuery({
    queryKey: ["trandingMovies"],
    queryFn: () => trandingMovies(1, date),
    staleTime: 60 * 60 * 1000,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
  }

  // console.log(data);
  return (
    <div className="overflow-x-auto">
      <div className="overflow-x-auto flex flex-wrap">
        {data?.results.map((movie, index) => (
          <Link to={`/movies/${movie.id}`} key={index}>
            <MovieCard
              imageUrl={`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
              title={`${movie.title}`}
            />
          </Link>
        ))}
      </div>
      <Link to={"/all-movies"}></Link>
    </div>
  );
}

export default TrandingMovieGroup;
