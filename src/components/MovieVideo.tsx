import VideoPlayer from "./VideoPlayer";

function MovieVideo({ id }: { id: string }) {
  const movieId = parseInt(id);
  const movieSrc = `https://vidsrc.to/embed/movie/${movieId}`;
  return (
    <div className="h-fit w-full px-5 md:px-0">
      {movieSrc === undefined ? (
        <div>
          <p>
            <span>Video not available</span>
          </p>
        </div>
      ) : (
        <VideoPlayer src={movieSrc} />
      )}
    </div>
  );
}

export default MovieVideo;
