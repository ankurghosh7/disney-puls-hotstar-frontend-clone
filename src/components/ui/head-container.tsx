import React, { useEffect, useState } from "react";
import BackgroundVideoPlyer from "../BackgroundVideoPlyer";
import { imagesProps, nowPlyingMoviesProps } from "@/helpers/trandingDiscover";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { FiPlus } from "react-icons/fi";
import FeaturedMoviesSwiperCon from "../FeaturedMoviesSwiperCon";
import { movies } from "@/constants/GenreId";
import { motion } from "framer-motion";

const HeadContainer = ({
  data,
  divOpacity,
  images,
  activeIndex,
  setActiveIndex,
}: {
  data: nowPlyingMoviesProps[];
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
    }, 1000 * 60 * 3);
    return () => clearTimeout(timer);
  }, [data.length]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTrailer(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren", //use this instead of delay
        staggerChildren: 0.5,
      },
    },
  };
  return (
    <div>
      <div
        className="absolute sm:h-[100vh] sm:w-full md:bg-zinc-950 top-0 left-0 right-0 bg-cover bg-current bg-top bg-no-repeat"
        style={{ opacity: divOpacity }}
      >
        {showTrailer ? (
          <BackgroundVideoPlyer id={trailerId} />
        ) : (
          <div className="w-full h-full before:absolute before:h-full before:w-1/2 before:bg-gradient-to-r before:from-black bg-top">
            <img
              src={`https://media.themoviedb.org/t/p/original${backdrop_path}`}
              alt=""
              className="w-full h-full object-cover  "
            />
          </div>
        )}
      </div>
      <div className="sm:absolute sm:h-[100vh] sm:w-full sm:bg-transparent sm:top-0 sm:left-0 z-10"></div>
      <div className="flex justify-between w-full items-end pr-20">
        <div className="relative z-10 sm:pt-60 lg:pt-64 sm:max-w-[40vw] lg:max-w-[27vw] space-y-5">
          <motion.div className="space-y-4">
            <motion.div className="w-fit bg-cover lg:h-20">
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
            <motion.div className="space-x-4 text-gray-300">
              <span className="text-sm lg:text-base">
                {new Date(data[activeIndex].release_date).getFullYear()}
              </span>
              <span className="text-sm lg:text-base">•</span>
              <span className="text-sm lg:text-base">
                {data[activeIndex].original_language.toUpperCase()}
              </span>
            </motion.div>
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
          </motion.div>
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
  );
};

export default HeadContainer;
