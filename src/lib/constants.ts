export const theMovieDBApiOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_THE_TMDB_AUTH_TOKEN}`,
  },
};
