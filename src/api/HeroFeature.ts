import { theMovieDBApiOptions } from "@/lib/constants";
import axios from "axios";
interface nowPlyingMoviesGetProps {
  dates: {
    maximum: string;
    minimum: string;
  };
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
interface imagesProps {
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
interface nowPlyingMoviesProps {
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
  images: imagesProps;
}
export const nowPlyingMovies = async (): Promise<nowPlyingMoviesProps[]> => {
  const response = await axios.get<nowPlyingMoviesGetProps>(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-IN&page=1&region=IN&page=1",
    theMovieDBApiOptions
  );
  console.log(response);
  const data = response.data.results.slice(0, 9);
  console.log(data);
  let res: nowPlyingMoviesProps[] = [];
  for (let i in data) {
    const images = await axios.get<imagesProps>(
      `https://api.themoviedb.org/3/movie/${data[i].id}/images`,
      theMovieDBApiOptions
    );
    res.push({
      ...data[i],
      images: images.data,
    });
  }
  return res;
};
