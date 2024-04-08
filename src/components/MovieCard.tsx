import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
function MovieCard({
  imageUrl,
  title,
  className,
}: {
  imageUrl: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full  h-[20rem] md:h-[25rem] xl:h-[24rem] rounded-lg relative overflow-hidden mx-auto",
        className
      )}
    >
      <img
        src={imageUrl}
        alt=""
        className="w-full h-full object-cover rounded-lg "
      />
      <div className="px-4 py-8 absolute bottom-0 bg-gradient-to-t from-black w-full">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
    </div>
  );
}

export default MovieCard;

export const MovieCardLoder = () => {
  return (
    <>
      <Carousel
        opts={{
          align: "start",
        }}
        className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto"
      >
        <CarouselContent className="">
          <CarouselItem className="sm:basis-full md:basis-1/2 lg:basis-1/4">
            <div className=" w-72 h-[28rem] rounded-lg relative overflow-hidden mx-auto flex flex-col space-y-5">
              <Skeleton className="w-full  object-cover rounded-lg flex-1 " />
              <div className=" space-y-5">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="sm:basis-full md:basis-1/2 lg:basis-1/4">
            <div className=" w-72 h-[28rem] rounded-lg relative overflow-hidden mx-auto flex flex-col space-y-5">
              <Skeleton className="w-full  object-cover rounded-lg flex-1 " />
              <div className=" space-y-5">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="sm:basis-full md:basis-1/2 lg:basis-1/4">
            <div className=" w-72 h-[28rem] rounded-lg relative overflow-hidden mx-auto flex flex-col space-y-5">
              <Skeleton className="w-full  object-cover rounded-lg flex-1 " />
              <div className=" space-y-5">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="sm:basis-full md:basis-1/2 lg:basis-1/4">
            <div className=" w-72 h-[28rem] rounded-lg relative overflow-hidden mx-auto flex flex-col space-y-5">
              <Skeleton className="w-full  object-cover rounded-lg flex-1 " />
              <div className=" space-y-5">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="w-full flex justify-between md:justify-end md:space-x-4 md:mt-5 items-center">
          <CarouselPrevious className=" relative translate-x-0 translate-y-0 left-0" />
          <CarouselNext className=" relative translate-x-0 translate-y-0 right-0 " />
        </div>
      </Carousel>
    </>
  );
};
