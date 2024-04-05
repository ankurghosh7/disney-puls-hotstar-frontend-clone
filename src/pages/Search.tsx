import { searchMovies } from "@/api/getMovieData";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

function Search() {
  const { search } = useParams<{ search: string }>();
  console.log(search);
  return <div>dsfgvhb</div>;
}

export default Search;
