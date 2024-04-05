function MovieVideo({ id }: { id: string }) {
  const movieId = parseInt(id);
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://vidsrc.to/embed/movie/${movieId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default MovieVideo;
