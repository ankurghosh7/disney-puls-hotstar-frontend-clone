import { convertMinutesToHoursAndMinutes } from "@/lib/utils";
import type {
  movieDetailsProps,
  movieImagesProps,
} from "../helpers/getMovieData";
function MovieDeatilsShow({
  movieImages,
  movieData,
}: {
  movieImages: movieImagesProps;
  movieData: movieDetailsProps;
}) {
  // const poster = movieImages.posters[0].file_path;
  // const runtime = Math.floor(movieData?.runtime / 60);
  return (
    <div className={`h-[calc(100vh-80px)]  relative w-full `}>
      <img
        src={`https://media.themoviedb.org/t/p/w1920_and_h800_face${movieImages.backdrops[0].file_path}`}
        alt=""
        className="absolute w-full h-full opacity-30 object-cover -z-10 hidden md:block"
      />
      <div className="w-full h-full grid lg:grid-cols-2  z-10">
        <div className="w-full h-1/2 md:h-full flex justify-center items-center overflow-hidden relative">
          <img
            src={`https://media.themoviedb.org/t/p/w600_and_h900_face${movieImages.posters[0].file_path}`}
            alt=""
            className="w-full h-full lg:w-2/4 lg:h-4/5 object-cover opacity-100 md:rounded-xl"
          />
          <div className="absolute w-full h-full bg-gradient-to-t from-background md:hidden"></div>
        </div>
        <div className="absolute bottom-10  md:mt-10 lg:mt-0 md:relative z-10 space-y-4 px-5 md:px-0">
          <div className="lg:mt-32">
            <h1 className="text-4xl font-bold">{movieData.title}</h1>
            <p className="text-lg mt-2 text-zinc-300">{movieData.overview}</p>
            <div className="flex mt-5">
              <div className="mr-5">
                <p className="font-bold">Release Date</p>
                <p>{movieData.release_date}</p>
              </div>
              <div className="mr-5">
                <p className="font-bold">Rating</p>
                <p>{`${movieData.vote_average}`}</p>
              </div>
              <div className="mr-5">
                <p className="font-bold">Runtime</p>
                <p>{convertMinutesToHoursAndMinutes(movieData.runtime)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDeatilsShow;
