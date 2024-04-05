import React from "react";
import axios from "axios";
function MovieVideo({ id }: { id: number }) {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://vidsrc.to/embed/movie/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default MovieVideo;
