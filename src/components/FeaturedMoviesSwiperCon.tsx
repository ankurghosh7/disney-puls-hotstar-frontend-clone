import { nowPlyingMoviesProps } from "@/helpers/trandingDiscover";
import { cn } from "@/lib/utils";

const FeaturedMoviesSwiperCon = ({
  data,
  setActiveIndex,
  setShowTrailer,
  activeIndex,
}: {
  data: nowPlyingMoviesProps[];
  setActiveIndex: (n: number) => void;
  setShowTrailer: (b: boolean) => void;
  activeIndex: number;
}) => {
  return (
    <div className="flex ">
      <button
        className="w-20 h-12  rounded-md  cursor-pointer  transition-all duration-300 ease-in-out"
        onClick={() => {
          setActiveIndex(0);
          setShowTrailer(false);
        }}
      >
        see
      </button>
      <div className="relative z-10 bottom-0 h-16 flex max-w-[30vw] overflow-x-scroll remover_scrollbar">
        <div className="flex space-x-2 items-end ">
          {data.map((movie, index) => (
            <div
              key={index}
              className={cn(
                "w-20 h-12 bg-cover bg-top bg-no-repeat rounded-md overflow-hidden cursor-pointer opacity-60 border-white hover:opacity-100 hover:scale-110 hover:-translate-y-2 transition-all duration-300 ease-in-out",
                {
                  "opacity-100 border ": data.indexOf(movie) === activeIndex,
                  "hover:scale-100 hover:-translate-y-0":
                    data.indexOf(movie) === activeIndex,
                }
              )}
              onClick={() => {
                setActiveIndex(data.indexOf(movie));
                setShowTrailer(false);
              }}
            >
              <div>
                <img
                  src={`https://media.themoviedb.org/t/p/w92${movie.poster_path}`}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedMoviesSwiperCon;
