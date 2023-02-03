import Image from 'next/image';
import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import type { CahootDeadlineType } from '@/types/cahoot';
import type { Response } from '@/types/response';

import Carousel from '../common/Carousel';

const DeadlineCarousel = () => {
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery<Response<CahootDeadlineType>>(['cahoot/deadline'], () =>
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cahoots?status=ending-soon`).then((res) =>
      res.json()
    )
  );

  return (
    <div className="flex flex-col gap-2 px-3 md:px-0">
      <label className="font-bold">마감 임박 공모</label>
      <Carousel itemCount={result.length}>
        {result.map(({ id, title, stockEnd, images }) => (
          <Link
            key={id}
            href={`/cahoots/detail/${id}`}
            className="carousel-item flex-col items-center font-semibold"
          >
            <div className="avatar -z-10">
              <div className="w-24 rounded-full bg-dark-grey"></div>
              <Image src={images[0]} alt="" className="rounded-full" fill sizes="96px" />
            </div>
            <div className="w-32 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
              {title}
            </div>
            <span className="text-xs font-semibold text-black/60">
              <span className="text-main">
                {Math.floor(
                  (new Date(stockEnd).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)
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
