import { getMovieDetails } from "@/api/getMovieData";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import MovieDeatilsShow from "@/components/MovieDeatilsShow";
import moviedata from "../../movieDeatils.json";
import MovieVideo from "@/components/MovieVideo";

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  const { data, error, isLoading } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(parseInt(id)),
    staleTime: 1000 * 60 * 60 * 24,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error(error);
  }

  return (
    <div className="h-screen">
      <MovieDeatilsShow movieDeatils={data!} />
      <MovieVideo id={moviedata.id} />
    </div>
  );
}

export default MovieDetails;
