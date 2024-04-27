import { Suspense, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import { useQuery } from "@tanstack/react-query";
// import { getCurrentDate } from "@/lib/CurrentDate";
import { trendingDiscoverMovies } from "@/helpers/trandingDiscover";
import { getLatestReleases } from "@/helpers/latestReleases";
import VideoCard from "@/components/VideoCard";
import { IoIosArrowForward } from "react-icons/io";

function Home() {
  // const date = parseInt(getCurrentDate());

  const { data: fatureMovies, isLoading: fatureMoviesLofing } = useQuery({
    queryKey: ["trendingDiscoverMovies"],
    queryFn: trendingDiscoverMovies,
    staleTime: 60 * 60 * 1000,
  });
  const { data: latestReleases, isLoading: latestReleasesLoading } = useQuery({
    queryKey: ["getLatestReleases"],
    queryFn: getLatestReleases,
    staleTime: 60 * 60 * 1000,
  });

  useEffect(() => {
    document.title = "WatcherHub Home";
  }, []);

  if (latestReleases === undefined) {
    return <div>loding...</div>;
  }
  return (
    <main className="select-none">
      <Suspense
        fallback={
          <div className="max-h-[58vw] h-screen min-h-screen relative ml-[-7rem] lg:mb-[-8rem]">
            loding...
          </div>
        }
      >
        {fatureMoviesLofing ? (
          <div className="max-h-[58vw] h-screen min-h-screen relative ml-[-7rem] lg:mb-[-8rem]">
            loding...
          </div>
        ) : (
          <HeroSection data={fatureMovies!} />
        )}
      </Suspense>
      <Suspense fallback={<div>loding...</div>}>
        <section className="group/item ">
          <div className=" space-y-4 mb-10 ">
            <div className="flex justify-between pr-4 relative z-10">
              <h2 className="lg:text-xl font-semibold">Latest Releases</h2>
              <span className="text-base font-normal text-zinc-400 group-hover/item:flex items-center cursor-pointer space-x-2 hidden">
                <span>View all </span>
                <IoIosArrowForward />
              </span>
            </div>
            <div className="">
              {latestReleasesLoading ? (
                <div>loding...</div>
              ) : (
                <VideoCard data={latestReleases?.results} />
              )}
            </div>
          </div>
        </section>
      </Suspense>
    </main>
  );
}

export default Home;
