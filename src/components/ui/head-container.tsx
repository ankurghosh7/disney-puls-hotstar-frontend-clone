import React, { useEffect, useState } from "react";
import BackgroundVideoPlyer from "../BackgroundVideoPlyer";
import {
  imagesProps,
  trendingDiscoverMoviesResultProps,
} from "@/helpers/trandingDiscover";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { FiPlus } from "react-icons/fi";
import FeaturedMoviesSwiperCon from "../FeaturedMoviesSwiperCon";
import { movies } from "@/constants/GenreId";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const HeadContainer = ({
  data,
  divOpacity,
  images,
  activeIndex,
  setActiveIndex,
}: {
  data: trendingDiscoverMoviesResultProps[];
  divOpacity: number;
  images: imagesProps;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  let trailerId: number = data[activeIndex].id;
  const backdrop_path =
    data[activeIndex].backdrop_path || data[activeIndex].poster_path;

  const nameLogo = images?.logos.filter((logo) => logo.iso_639_1 === "en")[0]
    ?.file_path;
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 1000 * 60 * 2);
    return () => clearTimeout(timer);
  }, [data.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTrailer(true);
    }, 5000);
    return () => {
      clearTimeout(timer);
      setShowTrailer(false);
    };
  }, [activeIndex, setActiveIndex]);

  return (
    <div className="max-h-[58vw] h-screen min-h-screen relative ml-[-7rem] lg:mb-[-8rem] ">
      <div
        className="absolute h-full inset-0 w-full md:bg-zinc-950 top-0 left-0 right-0 bg-cover bg-current bg-top bg-no-repeat"
        style={{ opacity: divOpacity }}
      >
        <div className="w-full h-full fixed">
          {showTrailer ? (
            <BackgroundVideoPlyer id={trailerId} />
          ) : (
            <div className="w-full h-full xl:pl-64 flex before:absolute before:h-full before:block  before:w-1/4 before:bg-gradient-to-r before:from-zinc-950 ">
              <img
                src={`https://media.themoviedb.org/t/p/original${backdrop_path}`}
                alt=""
                className="w-full h-full object-cover "
              />
            </div>
          )}
        </div>
      </div>
      <div className="sm:absolute h-full sm:w-full sm:bg-transparent sm:top-0 sm:left-0 z-10"></div>
      <div className=" absolute bottom-0 flex justify-between w-full items-end pl-28 pr-8 lg:pr-10 xl:pr-20 pb-14 lg:pb-24 xl:pb-44 ">
        <div className="relative z-10 sm:max-w-[40vw] lg:max-w-[27vw] space-y-5">
          <motion.div className="space-y-4">
            <motion.div className="w-fit bg-cover max-h-20">
              {nameLogo ? (
                <img
                  src={`https://media.themoviedb.org/t/p/original${nameLogo}`}
                  alt=""
                  className="sm:w-60 lg:w-80 "
                />
              ) : (
                <h1 className="text-4xl font-semibold">
                  {data[activeIndex].title || data[activeIndex].original_title}
                </h1>
              )}
            </motion.div>
            <motion.div className="space-x-2 text-gray-300 ">
              <span className="text-sm lg:text-base font-semibold">
                {new Date(data[activeIndex].release_date).getFullYear()}
              </span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm lg:text-base font-semibold">
                {data[activeIndex].original_language === "en"
                  ? "English"
                  : "Hindi"}
              </span>
            </motion.div>
            <div className="sm:h-11 lg:h-[80px] hidden lg:block">
              <p className="text-white sm:line-clamp-2 lg:line-clamp-3 sm:text-sm lg:text-base ">
                {data[activeIndex].overview}
              </p>
            </div>
            <div className="space-x-2 divide-x-2 hidden lg:block">
              {data[activeIndex].genre_ids.map((genre, index) => (
                <span
                  className="text-white/70 text-base font-bold border-gray-200/50  px-2"
                  key={index}
                >
                  {movies.find((movie) => movie.id === genre)?.name}
                </span>
              ))}
            </div>
          </motion.div>
          <div className="flex space-x-4 items-center">
            <Link to={`/movies/${data[activeIndex].id}`} className="flex-1">
              <Button className="bg-white/20 text-black text-base w-full  h-12 rounded-lg space-x-2 hover:scale-[1.02] hover:bg-white/30 transition-all duration-300 ease-in-out">
                <FaPlay className="text-white text-base" />
                <span className="text-white font-bold text-base lg:text-xl">
                  Subscribe to Watch
                </span>
              </Button>
            </Link>
            <Button
              className=" bg-white/20 text-xl h-12 hover:bg-white/30 hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-lg"
              variant={"ghost"}
            >
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
  );
};

export default HeadContainer;
