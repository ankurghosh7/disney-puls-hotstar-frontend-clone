import { MoviesTrailer } from "@/helpers/MoviesTrailer";
import { useQuery } from "@tanstack/react-query";
const BackgroundVideoPlyer = ({ id }: { id: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["moviesTrailer", id],
    queryFn: () => MoviesTrailer(id),
    staleTime: 60 * 60 * 1000,
  });
  if (isLoading) return <div>Loading...</div>;
  if (data === undefined || data.results.length < 0) return <div>No Data</div>;
  const findTrailer = data.results.find((item) => item.type === "Trailer");
  return (
    <div className="absolute w-full h-full z-0">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${findTrailer?.key}?controls=0&disablekb=1&autoplay=1&mute=1&loop=1&showinfo=0&rel=0&iv_load_policy=3&cc_load_policy=0&fs=0`}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default BackgroundVideoPlyer;
