import { imagesProps, nowPlyingMoviesProps } from "@/helpers/trandingDiscover";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { theMovieDBApiOptions } from "@/lib/constants";
import { useMediaQuery } from "usehooks-ts";
import HeadContainer from "./ui/head-container";

const HeroSection = ({ data }: { data: nowPlyingMoviesProps[] }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollY, setScrollY] = useState(0);
  const [divOpacity, setDivOpacity] = useState(1);
  const { data: images, isLoading } = useQuery({
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
  const isMobile = useMediaQuery("(max-width: 640px)");

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

  return isLoading ? (
    <div>loding...</div>
  ) : (
    <section className="">
      <HeadContainer
        activeIndex={activeIndex}
        data={data}
        divOpacity={divOpacity}
        images={images}
        setActiveIndex={setActiveIndex}
      />
    </section>
  );
};

export default HeroSection;
