import { searchMovies } from "@/api/getMovieData";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

function Search() {
  const { search } = useParams<{ search: string }>();
  console.log(search);
  if (!search) {
    return <div>Search something</div>;
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ["search", search],
    queryFn: () => searchMovies(search, 1),
  });
  return <div></div>;
}

export default Search;
