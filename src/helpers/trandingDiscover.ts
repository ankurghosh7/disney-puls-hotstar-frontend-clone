import { theMovieDBApiOptions } from "@/lib/constants";
import { getCurrentDate } from "@/lib/CurrentDate";
import axios from "axios";
export interface nowPlyingMoviesGetProps {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
  total_pages: number;
  total_results: number;
}
export interface imagesProps {
  backdrops: {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
  id: number;
  logos: {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
  posters: {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
}
export interface nowPlyingMoviesProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  // images: imagesProps;
}
export const trendingDiscoverMovies = async (): Promise<nowPlyingMoviesProps[]> => {
  const date = getCurrentDate();
  const response = await axios.get<nowPlyingMoviesGetProps>(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=${date}&sort_by=popularity.desc&vote_average.gte=1&with_watch_providers=122`,
    theMovieDBApiOptions
  );
  console.log(response);
  return response.data.results.slice(0, 9);
};

export const fatchNowPlayingMoviesImages = async (
  data: nowPlyingMoviesProps[],
  index: number
) => {
  const id = data[index].id || data[0].id;
  const response = await axios.get<imagesProps>(
    `https://api.themoviedb.org/3/movie/${id}/images`,
    theMovieDBApiOptions
  );
  return response.data;
};
