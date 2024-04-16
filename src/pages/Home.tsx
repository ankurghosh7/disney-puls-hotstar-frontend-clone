import { Button } from "@/components/ui/button";
import { Suspense, useEffect } from "react";
import TrandingMovieGroup from "@/components/TrandingMovieGroup";
import { Link } from "react-router-dom";
import TrandingSeriesGroup from "@/components/TrandingSeriesGroup";
import HeroSection from "@/components/HeroSection";
import { trandingMovies, trasndingSeries } from "@/helpers/getMovieData";
import { useQuery } from "@tanstack/react-query";
import { getCurrentDate } from "@/lib/CurrentDate";
import { MovieCardLoder } from "@/components/MovieCard";
import { nowPlayingMovies } from "@/helpers/HeroFeature";

function Home() {
  const date = parseInt(getCurrentDate());

  const { data: fatureMovies, isLoading: fatureMoviesLofing } = useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: nowPlayingMovies,
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: trandingData,

    isLoading: trandingLoding,
  } = useQuery({
    queryKey: ["trandingMovies", date],
    queryFn: () => trandingMovies(1, date),
    staleTime: 60 * 60 * 1000,
  });
  const {
    data: trasndingSeriesData,

    isLoading: TrandingSeriesLoding,
  } = useQuery({
    queryKey: ["trandingSeries", date],
    queryFn: () => trasndingSeries(1, date),
    staleTime: 60 * 60 * 1000,
  });
  useEffect(() => {
    document.title = "WatcherHub Home";
  }, []);
  return (
    <main className=" space-y-8 select-none">
      <Suspense fallback={<div>loding...</div>}>
        {fatureMoviesLofing ? (
          <MovieCardLoder />
        ) : (
          <HeroSection data={fatureMovies!} />
        )}
      </Suspense>

      <section className="space-y-2 relative z-10 group">
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl font-semibold">Trending Movies</h3>
          <Link
            to={"/all-movies"}
            className="invisible group-hover:visible transition-all "
          >
            <Button className="" variant={"ghost"}>
              All Movies
            </Button>
          </Link>
        </div>
        <Suspense fallback={<MovieCardLoder />}>
          {trandingLoding ? (
            <MovieCardLoder />
          ) : (
            <TrandingMovieGroup data={trandingData!} />
          )}
        </Suspense>
      </section>
      <section className="space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg md:text-xl">Trending Series</h3>
          <Link to={"/all-series"}>
            <Button>All Series</Button>
          </Link>
        </div>
        {TrandingSeriesLoding ? (
          <MovieCardLoder />
        ) : (
          <TrandingSeriesGroup data={trasndingSeriesData!} />
        )}
      </section>
    </main>
  );
}

export default Home;
