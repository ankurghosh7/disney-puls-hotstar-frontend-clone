import { theMovieDBApiOptions } from "@/lib/constants";
import axios from "axios";

export type movieDetailsProps = {
  adult: boolean;
  backdrop_path: String;
  belongs_to_collection: String;
  budget: Number;
  genres: { id: Number; name: String }[];
  homepage: String;
  id: Number;
  imdb_id: String;
  original_language: String;
  original_title: String;
  overview: String;
  popularity: Number;
  poster_path: String;
  production_companies: {
    id: Number;
    logo_path: String;
    name: String;
    origin_country: String;
  }[];
  origin_country: String;
  production_countries: { iso_3166_1: String; name: String }[];
  release_date: String;
  revenue: Number;
  runtime: Number;
  spoken_languages: { english_name: String; iso_639_1: String; name: String }[];
  status: String;
  tagline: String;
  title: String;
  video: boolean;
  vote_average: Number;
  vote_count: Number;
};
export type trasndingMoviesProps = {
  page: Number;
  results: {
    adult: Boolean;
    backdrop_path: String;
    genre_ids: Array<Number>;
    id: Number;
    original_language: String;
    original_title: String;
    overview: String;
    popularity: Number;
    poster_path: String;
    release_date: Date;
    title: String;
    video: Boolean;
    vote_average: Number;
    vote_count: Number;
  }[];
  total_pages: Number;
  total_results: Number;
};
export type trasndingSeriesProps = {
  page: Number;
  results: {
    backdrop_path: String;
    first_air_date: String;
    genre_ids: Array<Number>;
    id: Number;
    name: String;
    origin_country: Array<String>;
    original_language: String;
    original_name: String;
    overview: String;
    popularity: Number;
    poster_path: String;
    vote_average: Number;
    vote_count: Number;
  }[];
  total_pages: Number;
  total_results: Number;
};
export type searchMoviesProps = {
  page: Number;
  results: {
    adult: Boolean;
    backdrop_path: String;
    id: Number;
    title: String;
    original_language: String;
    original_title: String;
    overview: String;
    poster_path: String;
    media_type: String;
    genre_ids: Array<Number>;
    popularity: Number;
    release_date: Date;
    video: Boolean;
    vote_average: Number;
    vote_count: Number;
  }[];
  total_pages: Number;
  total_results: Number;
};
// https://api.themoviedb.org/3/search/multi?query=Farrey%20&include_adult=false&language=en-US&page=1
export const searchMovies = async (
  query: String,
  page: Number
): Promise<searchMoviesProps> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US&page=${page}`,
      theMovieDBApiOptions
    );
    return response.data.data;
  } catch (error) {
    console.error(`trasndingMovies API error: ${error}`);
    throw error;
  }
};

export const trandingMovies = async (
  page: Number,
  date: Number
): Promise<trasndingMoviesProps | null> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?certification_country=IN&include_adult=true&include_video=false&language=en-IN&page=${page}&region=IN&release_date.gte=2023-01-01&release_date.lte=${date}&sort_by=popularity.desc&vote_average.lte=10&watch_region=IN&with_original_language=hi&with_runtime.gte=0&with_runtime.lte=400`,
      theMovieDBApiOptions
    );
    console.log(response);
    if (!response) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`trasndingMovies API error: ${error}`);
    throw error;
  }
};
const allMovies = async (page: Number, date: Number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?certification_country=IN&include_adult=true&include_video=false&language=en-IN&page=${page}&region=IN&release_date.gte=2023-01-01&release_date.lte=${date}&sort_by=popularity.desc&vote_average.lte=10&watch_region=IN&with_original_language=hi&with_runtime.gte=0&with_runtime.lte=400`,
      theMovieDBApiOptions
    );
    return response.data;
  } catch (error) {
    console.error(`trasndingMovies API error: ${error}`);
    return error;
  }
};
export const trasndingSeries = async (
  page: Number,
  date: number
): Promise<trasndingSeriesProps> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?certification_country=IN&include_adult=true&include_video=false&language=hi-IN&page=${page}&region=IN&release_date.gte=2023-01-01&release_date.lte=${date}&sort_by=popularity.desc&vote_average.lte=10&watch_region=IN&with_original_language=hi&with_runtime.gte=0&with_runtime.lte=400`,
      theMovieDBApiOptions
    );
    return response.data;
  } catch (error) {
    console.error(`trasndingMovies API error: ${error}`);
    throw error;
  }
};

export const getMovieDetails = async (
  id: Number
): Promise<movieDetailsProps | null> => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      theMovieDBApiOptions
    );
    if (response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(`getMovieDetails API error: ${error}`);
    throw error;
  }
};

export type movieImagesProps = {
  backdrops: {
    aspect_ratio: Number;
    height: Number;
    iso_639_1: String;
    file_path: String;
    vote_average: Number;
    vote_count: Number;
    width: Number;
  }[];

  id: Number;
  logos: {
    aspect_ratio: Number;
    height: Number;
    iso_639_1: String;
    file_path: String;
    vote_average: Number;
    vote_count: Number;
    width: Number;
  }[];

  posters: {
    aspect_ratio: Number;
    height: Number;
    iso_639_1: String;
    file_path: String;
    vote_average: Number;
    vote_count: Number;
    width: Number;
  }[];
};

export const movieImagesWithVideos = async (
  id: Number
): Promise<movieImagesProps> => {
  try {
    const imagesResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      theMovieDBApiOptions
    );
    return imagesResponse.data;
  } catch (error) {
    console.error(`movieImagesWithId API error: ${error}`);
    throw error;
  }
};
