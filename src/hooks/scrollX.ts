import { useEffect, useRef, useState } from "react";

export const scrollXFn = ({
  data,
  selector,
}: {
  data: any[];
  selector: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hiddenItemsCount, setHiddenItemsCount] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    // @ts-expect-error
    const itemWidth = container.querySelector(`.${selector}`).offsetWidth;
    const totalItemsCount = data.length;
    const visibleItemsCount = Math.floor(containerWidth / itemWidth);
    const hiddenCount = totalItemsCount - visibleItemsCount;

    setHiddenItemsCount(hiddenCount);
  }, [data]);

  const scrollHiddenItemsLeft = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    //@ts-expect-error
    const itemWidth = container.querySelector(`.${selector}`).offsetWidth;
    const scrollAmount = itemWidth * hiddenItemsCount;

    container.scrollBy({
      top: 0,
      left: scrollAmount,
      behavior: "smooth",
    });
    setScrollLeft(scrollLeft + scrollAmount);
  };
  const scrollHiddenItemsRight = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    //@ts-expect-error
    const itemWidth = container.querySelector(`.${selector}`).offsetWidth;
    const scrollAmount = itemWidth * hiddenItemsCount;
    container.scrollBy({
      top: 0,
      left: -scrollAmount,
      behavior: "smooth",
    });
    setScrollLeft(scrollLeft - scrollAmount);
  };

  return {
    containerRef,
    hiddenItemsCount,
    scrollLeft,
    scrollHiddenItemsLeft,
    scrollHiddenItemsRight,
  };
};
