import {
  movieImagesWithVideos,
  type movieDetailsProps,
} from "@/api/getMovieData";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
function MovieDeatilsShow({
  movieDeatils,
}: {
  movieDeatils: movieDetailsProps;
}) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["movieImages", movieDeatils.id],
    queryFn: () => movieImagesWithVideos(movieDeatils.id),
    staleTime: 1000 * 60 * 60 * 24,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error(error);
  }
  console.log("movie image and videos" + data);
  const backdropsImage =
    "https://media.themoviedb.org/t/p/w1920_and_h800_face" +
    data!.backdrops[1].file_path;
  return (
    <div className={`lg:h-[calc(100vh-80px)]  relative w-full `}>
      <img
        src={backdropsImage}
        alt=""
        className="absolute w-full h-full opacity-30 object-cover -z-10"
      />
      <div className="w-full h-full grid lg:grid-cols-2 bg-neutral-900/50 z-10">
        <div className="w-full h-full flex justify-center items-center">
          <img
            src={`https://media.themoviedb.org/t/p/w600_and_h900_face${
              data!.posters[0].file_path
            }`}
            alt=""
            className="lg:w-2/4 lg:h-4/5 object-cover opacity-100 rounded-xl"
          />
        </div>
        <div className=" mt-10 lg:mt-0 relative z-10 space-y-4">
          <div className="lg:mt-32">
            <h1 className="text-4xl font-bold">{movieDeatils.title}</h1>
            <p className="text-lg mt-2">{movieDeatils.overview}</p>
            <div className="flex mt-5">
              <div className="mr-5">
                <p className="font-bold">Release Date</p>
                <p>{movieDeatils.release_date}</p>
              </div>
              <div className="mr-5">
                <p className="font-bold">Rating</p>
                <p>{`${movieDeatils.vote_average}`}</p>
              </div>
              <div className="mr-5">
                <p className="font-bold">Runtime</p>
                <p>{`${movieDeatils.runtime}`} mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDeatilsShow;
