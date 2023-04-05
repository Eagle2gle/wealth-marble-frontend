import Carousel from '../Carousel';
import Icon from '../Icons';

const InterestsSkeleton = () => {
  return (
    <Carousel itemCount={3}>
      <div className="carousel-item h-24 w-52 items-center justify-center gap-1 rounded bg-grey text-sm font-semibold">
        <Icon.PlusCircle />
        휴양지를 추가해 주세요
      </div>
      {Array(2)
        .fill(0)
        .map((_, index) => (
          <div
            className="carousel-item h-24 w-52 animate-pulse rounded bg-gradient-to-br from-blue-start to-blue-end opacity-80"
            key={index}
          ></div>
        ))}
    </Carousel>
  );
};

export default InterestsSkeleton;
