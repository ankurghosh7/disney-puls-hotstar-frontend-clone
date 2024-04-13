import { useParams } from "react-router-dom";
import MovieDeatilsShow from "@/components/MovieDeatilsShow";
import MovieVideo from "@/components/MovieVideo";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, movieImagesWithVideos } from "@/helpers/getMovieData";
import { useEffect } from "react";

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  const {
    data: movieDetailsData,

    isLoading: movieDetailsLoding,
  } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(Number(id)),
    staleTime: 1000 * 60 * 60,
  });
  const {
    data: movieImgesData,

    isLoading: movieImagesIsloding,
  } = useQuery({
    queryKey: ["movieImages", id],
    queryFn: () => movieImagesWithVideos(Number(id)),
    staleTime: 1000 * 60 * 60,
  });
  useEffect(() => {
    document.title = `${movieDetailsData?.title} - WatcherHub`;
  }, []);
  return (
    <div className="h-fit w-full space-y-20 mb-10">
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
