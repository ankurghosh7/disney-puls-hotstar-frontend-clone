import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import type { trasndingMoviesProps } from "@/helpers/getMovieData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
function TrandingMovieGroup({ data }: { data: trasndingMoviesProps }) {
  return (
    <>
      <Carousel
        opts={{
          align: "start",
        }}
        className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto"
      >
        <CarouselContent className="">
          {data.results.map((movie, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/6">
              <Link to={`/movies/${movie.id}`} key={index}>
                <MovieCard
                  imageUrl={`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
                  title={`${movie.title}`}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="w-full flex justify-between md:justify-end md:space-x-4 mt-5 items-center px-5 md:px-0">
          <CarouselPrevious className=" relative translate-x-0 translate-y-0 left-0" />
          <CarouselNext className=" relative translate-x-0 translate-y-0 right-0 " />
        </div>
      </Carousel>
    </>
  );
}

export default TrandingMovieGroup;
