import { useParams } from "react-router-dom";
import MovieDeatilsShow from "@/components/MovieDeatilsShow";
import MovieVideo from "@/components/MovieVideo";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, movieImagesWithVideos } from "@/api/getMovieData";

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  const {
    data: movieDetailsData,
    isError: movieDetailsErros,
    isLoading: movieDetailsLoding,
  } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(Number(id)),
    staleTime: 1000 * 60 * 60,
  });
  const {
    data: movieImgesData,
    isError: movieImagesError,
    isLoading: movieImagesIsloding,
  } = useQuery({
    queryKey: ["movieImages", id],
    queryFn: () => movieImagesWithVideos(Number(id)),
    staleTime: 1000 * 60 * 60,
  });
  return (
    <div className="h-screen w-full">
      {movieDetailsLoding || movieImagesIsloding ? (
        <div>
          <p>
            <span>Loading...</span>
          </p>
        </div>
      ) : (
        <MovieDeatilsShow
          movieData={movieDetailsData!}
          movieImages={movieImgesData!}
        />
      )}
      <MovieVideo id={id} />
    </div>
  );
}

export default MovieDetails;
