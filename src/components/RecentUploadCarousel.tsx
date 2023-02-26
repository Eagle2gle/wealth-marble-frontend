import Image from 'next/image';
import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { RecentCahootListType } from '@/types/cahoot';
import type { Response } from '@/types/response';

import Carousel from './common/Carousel';

const RecentUploadCarousel = () => {
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery<Response<RecentCahootListType>>(['RecentUploadCarouselData'], () =>
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cahoots/recent`).then((res) => res.json())
  );
  return (
    <div className="flex flex-col gap-2 px-3 md:px-0">
      <div className="flex flex-col">
        <h1 className="font-bold">최근에 올라온 공모</h1>
        <h2 className="text-xs font-semibold text-black/60">
          참여하면 수익도 얻고 휴양지 예약권도 얻을 수 있다고!?{' '}
        </h2>
      </div>
      <Carousel itemCount={result?.length ?? 0}>
        {result?.map(({ id, title, images, expectedRateOfReturn }) => (
          <Link
            key={id}
            href={`/cahoots/detail/${id}`}
            className="carousel-item flex-col items-center font-semibold"
          >
            <div className="avatar -z-10">
              {/* 이미지 */}
              <div className="w-24 rounded-full bg-grey">
                {images[0] && (
                  <Image
                    alt="공모 이미지"
                    src={images[0]}
                    className="object-contain"
                    fill
                    sizes="96px"
                  />
                )}
              </div>
            </div>
            <div className="w-32 overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-sm">
              {title}
            </div>
            <span className="text-center text-xs font-semibold text-black/60">
              예상 수익률 <span className="text-main">{expectedRateOfReturn}%</span>
            </span>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};
export default RecentUploadCarousel;
