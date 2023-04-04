import { Suspense } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Carousel from '@/components/common/Carousel';
import ErrorFallback from '@/components/common/ErrorFallback';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { RecentCahootListType } from '@/types/cahoot';
import type { Response } from '@/types/response';
import { ErrorBoundary } from '@sentry/nextjs';

const RecentUploadCarouselWrapper = () => {
  return (
    <div className="flex flex-col gap-2 px-3 md:px-0">
      <div className="flex flex-col">
        <h1 className="font-bold">최근에 올라온 공모</h1>
        <h2 className="text-xs font-semibold text-black/60">
          참여하면 수익도 얻고 휴양지 예약권도 얻을 수 있다고!?{' '}
        </h2>
      </div>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense>
          <RecentUploadCarousel />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const RecentUploadCarousel = () => {
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery<Response<RecentCahootListType>>(['RecentUploadCarouselData'], () =>
    api.get('cahoots/recent').json()
  );
  return (
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
                  className="rounded-full object-contain"
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
  );
};
export default RecentUploadCarouselWrapper;
