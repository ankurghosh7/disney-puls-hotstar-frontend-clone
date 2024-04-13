import { imagesProps, nowPlyingMoviesProps } from "@/helpers/HeroFeature";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { movies } from "@/constants/GenreId";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import BackgroundVideoPlyer from "./BackgroundVideoPlyer";
import axios from "axios";
import { theMovieDBApiOptions } from "@/lib/constants";

const HeroSection = ({ data }: { data: nowPlyingMoviesProps[] }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  const backdrop_path =
    data[activeIndex].backdrop_path || data[activeIndex].poster_path;
  const { data: images } = useQuery({
    queryKey: ["fatchNowPlayingMoviesImages", activeIndex],
    queryFn: async () => {
      const id = data[activeIndex].id;
      const response = await axios.get<imagesProps>(
        `https://api.themoviedb.org/3/movie/${id}/images`,
        theMovieDBApiOptions
      );
      return response.data;
    },
    enabled: data.length > 0,
    staleTime: 60 * 60 * 1000,
  });
  console.log(images);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTrailer(true);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [activeIndex, showTrailer, setActiveIndex]);

  return (
    <div className="">
      <div
        className="relative md:absolute md:h-[100vh] md:w-full md:bg-slate-400 md:top-0 md:left-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/original${backdrop_path})`,
        }}
      >
        {showTrailer && <BackgroundVideoPlyer id={data[activeIndex].id} />}
      </div>
      <div className="md:absolute md:h-[100vh] md:w-full md:bg-transparent md:top-0 md:left-0 z-10"></div>
      <div className="flex justify-between w-full items-end">
        <div className="relative z-10 lg:pt-60 lg:max-w-[30vw] space-y-5">
          <div className="space-y-4">
            <div className="w-fit bg-cover lg:h-20">
              {images?.logos[0]?.file_path ? (
                <img
                  src={`https://media.themoviedb.org/t/p/original${images?.logos[0]?.file_path}`}
                  alt=""
                  className="w-80 "
                />
              ) : (
                <h1 className="text-4xl font-semibold">
                  {data[activeIndex].title || data[activeIndex].original_title}
                </h1>
              )}
            </div>
            <div>
              <span>
                {new Date(data[activeIndex].release_date).getFullYear()}
              </span>
            </div>
            <div className="h-[80px]">
              <p className="text-white line-clamp-3">
                {data[activeIndex].overview}
              </p>
            </div>
            <div className="space-x-2 divide-x-2 ">
              {data[activeIndex].genre_ids.map((genre, index) => (
                <span
                  className="text-white/70 text-base font-bold border-gray-200/50  px-2"
                  key={index}
                >
                  {movies.find((movie) => movie.id === genre)?.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 items-center">
            <Link to={`/movies/${data[activeIndex].id}`} className="flex-1">
              <Button className="bg-white text-black text-base w-full  h-12 rounded-lg">
                View Now
              </Button>
            </Link>
            <Button className=" bg-white/30" variant={"ghost"}>
              <FiPlus />
            </Button>
          </div>
        </div>
        <div className="">
          <div className="relative z-10 bottom-0 h-16 flex max-w-[30vw] overflow-x-scroll remover_scrollbar px-5">
            <div className="flex space-x-2 items-end">
              {data.map((movie, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-20 h-12 bg-cover bg-top bg-no-repeat rounded-md overflow-hidden cursor-pointer opacity-60 border-white hover:opacity-100 hover:scale-110 hover:-translate-y-2 transition-all duration-300 ease-in-out",
                    {
                      "opacity-100 border ":
                        data.indexOf(movie) === activeIndex,
                      "hover:scale-100 hover:-translate-y-0":
                        data.indexOf(movie) === activeIndex,
                    }
                  )}
                  onClick={() => setActiveIndex(data.indexOf(movie))}
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
      </div>
    </div>
  );
};

export default HeroSection;
