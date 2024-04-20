import { Suspense, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
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
