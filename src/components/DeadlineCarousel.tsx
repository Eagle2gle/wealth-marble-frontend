import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import Carousel from './common/Carousel';

interface MockDataType {
  id: number;
  title: string;
  deadline: string;
}

const DeadlineCarousel = () => {
  const { data } = useQuery<MockDataType[]>({
    queryKey: ['deadlineCarouselData'],
    queryFn: () => fetch('/deadlineCarouselData.json').then((res) => res.json()),
  });

  return (
    <div className="flex flex-col gap-2 px-3 md:px-0">
      <label className="font-bold">마감 임박 공모</label>
      <Carousel itemCount={data?.length ?? 0}>
        {data?.map(({ id, title, deadline }) => (
          <Link
            key={id}
            href={`/cahoots/detail/${id}`}
            className="carousel-item flex-col items-center font-semibold"
          >
            <div className="avatar -z-10">
              {/* 이미지 */}
              <div className="w-24 rounded-full bg-dark-grey"></div>
            </div>
            <div className="w-32 overflow-ellipsis overflow-hidden text-sm whitespace-nowrap">
              {title}
            </div>
            <span className="text-black/60 text-xs font-semibold">
              <span className="text-main">
                {Math.floor(
                  (new Date(deadline).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)
                )}
                일
              </span>{' '}
              남았습니다.
            </span>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default DeadlineCarousel;
