import { MoviesTrailer } from "@/helpers/MoviesTrailer";
import { useQuery } from "@tanstack/react-query";
const BackgroundVideoPlyer = ({ id }: { id: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["moviesTrailer", id],
    queryFn: () => MoviesTrailer(id),
    staleTime: 60 * 60 * 1000,
  });
  if (isLoading) return null;
  if (data === undefined || data.results.length < 0) return <div>No Data</div>;
  let findTrailer = data.results.find((item) => item.type === "Trailer")?.key;
  if (findTrailer === undefined) return null;
  return (
    <div className="hidden invisible sm:visible sm:flex absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 z-10 items-center justify-center">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${findTrailer}?controls=0&disablekb=0&autoplay=1&mute=1&loop=1&showinfo=0&rel=0&iv_load_policy=3&cc_load_policy=0&fs=0`}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default BackgroundVideoPlyer;
