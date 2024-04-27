import { trendingDiscoverMoviesResultProps } from "@/helpers/trandingDiscover";
import { scrollXFn } from "@/hooks/scrollX.ts";
import { cn } from "@/lib/utils";
import { MouseEvent, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const VideoCard = ({ data }: { data: trendingDiscoverMoviesResultProps[] }) => {
  const [hoveredCard, setHoveredCard] = useState(false);
  const [hoveredCardPosition, setHoveredCardPosition] = useState({
    top: 0,
    left: 0,
  });
  const {
    containerRef,
    scrollHiddenItemsLeft,
    scrollHiddenItemsRight,
    scrollLeft,
  } = scrollXFn({ data, selector: "item" });

  const handelCardHover = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.target;
    //@ts-expect-error
    const { top, left, width, height, right } = card.getBoundingClientRect();
    console.log(
      `top: ${top}, left: ${left}, width: ${width}, height: ${height} right: ${right}`
    );
    // const halfWidth = width / 2;
    setHoveredCardPosition({ top: top, left: left });
    setHoveredCard(true);
  };

  const handelCardHoverLeave = () => {
    setHoveredCard(false);
    setHoveredCardPosition({ top: 0, left: 0 });
  };
  return (
    <div>
      <div className="relative">
        <button
          onClick={scrollHiddenItemsRight}
          className={cn(
            "absolute left-0 h-full  w-20 bg-gradient-to-r from-black text-2xl font-semibold pl-2 invisible",
            {
              visible: scrollLeft > 0,
            }
          )}
        >
          <IoIosArrowBack />
        </button>
        <div
          className="flex overflow-hidden space-x-4 relative z-50"
          ref={containerRef}
        >
          {data.map((item) => (
            <div
              key={item.id}
              className="item w-44 h-60 shrink-0 rounded-lg overflow-hidden cursor-pointer"
              onMouseEnter={handelCardHover}
              onMouseLeave={handelCardHoverLeave}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title}
              />
            </div>
          ))}
        </div>
        <button
          onClick={scrollHiddenItemsLeft}
          className="absolute top-0 right-0 h-full z-40 w-20 bg-gradient-to-l from-black text-2xl font-semibold pr-2 flex justify-end items-center"
        >
          <IoIosArrowForward />
        </button>
      </div>
      {hoveredCard && (
        <HoverCard
          data={data[0]}
          position={hoveredCardPosition}
          hoveredCard={hoveredCard}
        />
      )}
    </div>
  );
};

export default VideoCard;

const HoverCard = ({
  data,
  position,
}: // hoveredCard,
{
  data: trendingDiscoverMoviesResultProps;
  position: { top: number; left: number };
  hoveredCard: boolean;
}) => {
  const windowWidth = window.innerWidth - 400;
  console.log(windowWidth);
  return (
    <div
      className={cn(
        "w-fit h-fit absolute top-0 left-0 origin-center transition-all"
      )}
      style={{
        transform: `translate(${position.left - 50}px, ${position.top}px)`,
      }}
    >
      <div
        className={cn(
          "w-64 h-[22rem] bg-slate-50 rounded-xl cardScaleEffect block z-10",
          {}
        )}
        style={{
          transformOrigin:
            position.left > 112 ? "center center " : "left center",
        }}
      >
        <div className="w-full h-3/4">
          <img
            src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
            alt={data.title}
            className="w-full h-full object-cover rounded-t-xl"
          />
        </div>
        <div className="w-full h-1/4 p-2">
          <h2 className="text-lg font-semibold">{data.title}</h2>
          <p className="text-sm">{data.overview}</p>
        </div>
      </div>
    </div>
  );
};

// transition: opacity .1s, z-index 1s;
// transition-behavior: normal, normal;
// transition-duration: 0.1s, 1s;
// transition-timing-function: ease, ease;
// transition-delay: 0s, 0s;
// transition-property: opacity, z-index;
