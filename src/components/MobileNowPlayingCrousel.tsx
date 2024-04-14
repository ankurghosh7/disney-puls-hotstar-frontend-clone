import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function MobileNowPlayingCrousel() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
                <img
                    src="https://image.tmdb.org/t/p/w500/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg"
                    alt=""
                    className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-2">
                    <p className="text-white font-bold">The Tomorrow War</p>
                    <p className="text-white/70">Action, Adventure, Science Fiction</p>
                </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default MobileNowPlayingCrousel;
