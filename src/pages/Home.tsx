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
import { trendingDiscoverMovies } from "@/helpers/trandingDiscover";

function Home() {
  const date = parseInt(getCurrentDate());

  const { data: fatureMovies, isLoading: fatureMoviesLofing } = useQuery({
    queryKey: ["trendingDiscoverMovies"],
    queryFn: trendingDiscoverMovies,
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
    </main>
  );
}

export default Home;
