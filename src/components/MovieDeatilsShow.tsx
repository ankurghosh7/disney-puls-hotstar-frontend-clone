import type { movieDetailsProps, movieImagesProps } from "../api/getMovieData";
function MovieDeatilsShow({
  movieImages,
  movieData,
}: {
  movieImages: movieImagesProps;
  movieData: movieDetailsProps;
}) {
  return (
    <div className={`lg:h-[calc(100vh-80px)]  relative w-full `}>
      <img
        src={`https://media.themoviedb.org/t/p/w1920_and_h800_face${movieImages.backdrops[1].file_path}`}
        alt=""
        className="absolute w-full h-full opacity-30 object-cover -z-10"
      />
      <div className="w-full h-full grid lg:grid-cols-2 bg-neutral-900/50 z-10">
        <div className="w-full h-full flex justify-center items-center">
          <img
            src={`https://media.themoviedb.org/t/p/w600_and_h900_face${movieImages.posters[0].file_path}`}
            alt=""
            className="lg:w-2/4 lg:h-4/5 object-cover opacity-100 rounded-xl"
          />
        </div>
        <div className=" mt-10 lg:mt-0 relative z-10 space-y-4">
          <div className="lg:mt-32">
            <h1 className="text-4xl font-bold">{movieData.title}</h1>
            <p className="text-lg mt-2">{movieData.overview}</p>
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
                <p>{`${movieData.runtime}`} mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDeatilsShow;
