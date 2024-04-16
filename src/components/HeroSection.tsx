import { imagesProps, nowPlyingMoviesProps } from "@/helpers/HeroFeature";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { movies } from "@/constants/GenreId";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import BackgroundVideoPlyer from "./BackgroundVideoPlyer";
import axios from "axios";
import { theMovieDBApiOptions } from "@/lib/constants";
import { useMediaQuery } from "usehooks-ts";
import MobileNowPlayingCrousel from "./MobileNowPlayingCrousel";
import FeaturedMoviesSwiperCon from "./FeaturedMoviesSwiperCon";

const HeroSection = ({ data }: { data: nowPlyingMoviesProps[] }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState(0);
  const [divOpacity, setDivOpacity] = useState(1);
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
  let trailerId: number = data[activeIndex].id;
  const isMobile = useMediaQuery("(max-width: 640px)");
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTrailer(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      const opacity = Math.max(0, Math.min(1, 1 - scrollPosition / 400));
      setDivOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div>
        <div className="fixed sm:h-[100vh] sm:w-full md:bg-zinc-950 top-0 left-0 right-0 bg-cover bg-current bg-top bg-no-repeat">
          <div
            className="hidden w-0 h-0 sm:block sm:w-full sm:h-full "
            style={{ opacity: divOpacity }}
          >
            {showTrailer ? (
              <BackgroundVideoPlyer id={trailerId} />
            ) : (
              <img
                src={`https://media.themoviedb.org/t/p/original${backdrop_path}`}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="sm:absolute sm:h-[100vh] sm:w-full sm:bg-transparent sm:top-0 sm:left-0 z-10"></div>
        <div className="flex justify-between w-full items-end pr-28">
          <div className="relative z-10 sm:pt-60 sm:max-w-[40vw] lg:max-w-[30vw] space-y-5">
            <div className="space-y-4">
              <div className="w-fit bg-cover lg:h-20">
                {images?.logos[0]?.file_path ? (
                  <img
                    src={`https://media.themoviedb.org/t/p/original${images?.logos[0]?.file_path}`}
                    alt=""
                    className="sm:w-60 lg:w-80 "
                  />
                ) : (
                  <h1 className="text-4xl font-semibold">
                    {data[activeIndex].title ||
                      data[activeIndex].original_title}
                  </h1>
                )}
              </div>
              <div>
                <span className="text-sm lg:text-base">
                  {new Date(data[activeIndex].release_date).getFullYear()}
                </span>
              </div>
              <div className="sm:h-11 lg:h-[80px]">
                <p className="text-white sm:line-clamp-2 lg:line-clamp-3 sm:text-sm lg:text-base ">
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
          <FeaturedMoviesSwiperCon
            data={data}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setShowTrailer={setShowTrailer}
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
