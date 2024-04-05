import { searchMovies } from "@/api/getMovieData";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");

  const searchMoviesFn = () => {
    if (search.trim() === "") {
      console.log("Please enter a movie name to search");
      return;
    }
    navigate(`/search/${search}`);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="xl:w-1/2 mx-auto">
      <div className="flex h-12 w-full rounded-xl border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden">
        <input
          type="text"
          className="w-0 flex-1 border-none focus:outline-none bg-transparent px-3 py-1 text-base"
          placeholder="Search for movies"
          value={search}
          onChange={(e) => handleSearch(e)}
        />
        <Button className="py-0 h-full" onClick={searchMoviesFn}>
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchBox;
