import { Suspense } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { getDayDiff } from '@/utils/date';
import { ErrorBoundary } from '@sentry/nextjs';

import Carousel from '../common/Carousel';
import ErrorFallback from '../common/ErrorFallback';

const Deadline = () => {
  return (
    <div className="flex flex-col gap-2 px-3 md:px-0">
      <label className="font-bold">마감 임박 공모</label>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense>
          <DeadlineCarousel />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const DeadlineCarousel = () => {
  const { queryFn, queryKey } = queries.cahoots.deadline;
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery(queryKey, queryFn);

  return (
    <Carousel itemCount={result.length}>
      {result.map(({ id, title, stockEnd, images }) => (
        <Link
          key={id}
          href={`/cahoots/detail/${id}`}
          className="carousel-item flex-col items-center font-semibold"
        >
          <div className="avatar -z-10">
            <div className="w-24 rounded-full bg-dark-grey"></div>
            {images[0] && (
              <Image src={images[0]} alt="" className="rounded-full" fill sizes="96px" />
            )}
          </div>
          <div className="w-32 overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-sm">
            {title}
          </div>
          <span className="text-xs font-semibold text-black/60">
            <span className="text-main">{getDayDiff(stockEnd)}일</span> 남았습니다.
          </span>
        </Link>
      ))}
    </Carousel>
  );
};

export default Deadline;
