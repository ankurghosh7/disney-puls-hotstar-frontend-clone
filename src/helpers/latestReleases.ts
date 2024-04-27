import { getCurrentDate } from "@/lib/CurrentDate";
import axios from "axios";
import { trendingDiscoverMoviesResponseProps } from "./trandingDiscover";
import { theMovieDBApiOptions } from "@/lib/constants";

export const getLatestReleases = async () => {
  const date = getCurrentDate();
  const response = await axios.get<trendingDiscoverMoviesResponseProps>(
    `https://api.themoviedb.org/3/discover/movie?certification_country=IN&include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2024-01-01&release_date.lte=${date}&sort_by=primary_release_date.desc&vote_average.gte=1&vote_average.lte=10&watch_region=IN&with_watch_providers=122`,
    theMovieDBApiOptions
  );
  return response.data;
};
