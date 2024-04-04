import axios from "axios";
// const theMovieDBApiOptions = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization: `Bearer ${process.env.VITE_THE_MOVVIE_DB_AUTH_TOKEN}`,
//   },
// };

interface trasndingMoviesResultsProps {
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
}
interface trasndingSeriesResultProps {
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
}
export type trasndingMoviesProps = {
  page: Number;
  results: Array<trasndingMoviesResultsProps>;
  total_pages: Number;
  total_results: Number;
};
type trasndingSeriesProps = {
  page: Number;
  results: Array<trasndingSeriesResultProps>;
  total_pages: Number;
  total_results: Number;
};
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWUwYmQwYmRmNGY2Y2JmM2UzNjBkMGE5ZGYwMTFjYyIsInN1YiI6IjY1ZGY1MTZmYjM5ZTM1MDE2MzJmYmY1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.08IOfjXYhHWlSYWFWlxcmh2q7VNV58neG6m6m6TK0wg",
  },
};

export const searchMovies = async (query: String, page: Number) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-IN&page=${page}`,
      options
    );
    return response.data;
  } catch (error) {
    console.error(`trasndingMovies API error: ${error}`);
    return error;
  }
};

export const trandingMovies = async (
  page: Number,
  date: Number
): Promise<trasndingMoviesProps | String> => {
  try {
    const response: trasndingMoviesProps = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?certification_country=IN&include_adult=true&include_video=false&language=en-IN&page=${page}&region=IN&release_date.gte=2023-01-01&release_date.lte=${date}&sort_by=popularity.desc&vote_average.lte=10&watch_region=IN&with_original_language=hi&with_runtime.gte=0&with_runtime.lte=400`,
      options
    );
    console.log(response);
    if (!response) {
      return "No data found";
    }
    return response;
  } catch (error) {
    console.error(`trasndingMovies API error: ${error}`);
    throw error;
  }
};

export const trasndingSeries = async (page: Number, date: Date) => {
  try {
    const response: trasndingSeriesProps = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?certification_country=IN&include_adult=true&include_video=false&language=hi-IN&page=${page}&region=IN&release_date.gte=2023-01-01&release_date.lte=${date}&sort_by=popularity.desc&vote_average.lte=10&watch_region=IN&with_original_language=hi&with_runtime.gte=0&with_runtime.lte=400`,
      options
    );
    return response;
  } catch (error) {
    console.error(`trasndingMovies API error: ${error}`);
    return error;
  }
};
