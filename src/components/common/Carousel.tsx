import { useRef } from 'react';

import Icon from './Icons';

interface CarouselProps {
  children: React.ReactNode;
  itemCount: number;
}

const Carousel = ({ children, itemCount }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const onLeftClick = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft -= carouselRef.current.scrollWidth / itemCount;
  };
  const onRightClick = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft += carouselRef.current.scrollWidth / itemCount;
  };

  return (
    <div className="flex items-center">
      <button onClick={onLeftClick} className="btn btn-circle btn-ghost hidden md:flex">
        <Icon.Left />
      </button>
      <div className="carousel w-full space-x-2 px-4" ref={carouselRef}>
        {children}
      </div>
      <button onClick={onRightClick} className="btn btn-circle btn-ghost hidden md:flex">
        <Icon.Right />
      </button>
    </div>
  );
};

export default Carousel;
