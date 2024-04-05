import React from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import type { trasndingSeriesProps } from "@/api/getMovieData";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
function TrandingSeriesGroup({ data }: { data: trasndingSeriesProps }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto"
    >
      <CarouselContent className="">
        {data.results.map((series, index) => (
          <CarouselItem
            key={index}
            className="sm:basis-full md:basis-1/2 lg:basis-1/4"
          >
            <div className="p-1">
              <Link to={`/movies/${series.id}`} key={index}>
                <MovieCard
                  imageUrl={`https://media.themoviedb.org/t/p/w220_and_h330_face${series.poster_path}`}
                  title={`${series.name}`}
                />
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="w-full flex justify-between md:justify-end md:space-x-4 md:mt-5 items-center">
        <CarouselPrevious className=" relative translate-x-0 translate-y-0 left-0" />
        <CarouselNext className=" relative translate-x-0 translate-y-0 right-0 " />
      </div>
    </Carousel>
  );
}

export default TrandingSeriesGroup;
