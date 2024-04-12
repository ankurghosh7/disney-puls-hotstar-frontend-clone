import { theMovieDBApiOptions } from "@/lib/constants";
import axios from "axios";

interface MoviesTrailerProps {
  id: number;
  results: {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }[];
}

export const MoviesTrailer = async (
  id: number
): Promise<MoviesTrailerProps> => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-IN`,
    theMovieDBApiOptions
  );
  if (res.status !== 200) {
    throw new Error("Failed to fetch data from the server");
  }
  return res.data;
};
