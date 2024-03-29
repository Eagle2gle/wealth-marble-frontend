import { Suspense } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { formatDate } from '@/utils/date';
import { ErrorBoundary } from '@sentry/nextjs';

import Carousel from '../common/Carousel';
import ErrorFallback from '../common/ErrorFallback';

const Recap = () => {
  return (
    <div className="flex flex-col gap-2 bg-main-light p-4 md:p-0 md:py-4">
      <label className="font-bold md:px-4">공모 다시보기 어때요</label>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense>
          <RecapCarousel />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const RecapCarousel = () => {
  const { queryFn, queryKey } = queries.cahoots.recap;
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery(queryKey, queryFn);

  return (
    <Carousel itemCount={result.length}>
      {result.map(({ id, title, stockEnd, stockNum, competitionRate, stockPrice, images }) => (
        <Link
          key={id}
          href={`/cahoots/detail/${id}`}
          className="carousel-item flex-col items-center font-semibold"
        >
          <div className="avatar z-0">
            <div className="w-32 rounded-t bg-dark-grey"></div>
            {images[0] && <Image src={images[0]} className="rounded-t" alt="" fill sizes="128px" />}
            <span className="absolute bottom-5 w-32 overflow-hidden overflow-ellipsis whitespace-nowrap px-2 text-xs text-white">
              {title}
            </span>
            <span className="absolute bottom-0 w-full bg-black/25 text-center text-xs text-white">
              {formatDate(stockEnd)}
            </span>
          </div>
          <div className="flex w-full flex-col gap-1 rounded-b bg-white p-2 text-xs font-normal">
            <div className="flex justify-between">
              공모가
              <span>{stockPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              공모 수량
              <span>{stockNum.toLocaleString()} 주</span>
            </div>
            <div className="flex justify-between">
              경쟁률
              <span className="font-bold text-main">{competitionRate}%</span>
            </div>
          </div>
        </Link>
      ))}
    </Carousel>
  );
};

export default Recap;
