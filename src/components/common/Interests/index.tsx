import { Suspense } from 'react';

import { ErrorBoundary } from '@sentry/nextjs';

import InterestsCarousel from './Carousel';
import InterestsSkeleton from './Skeleton';
import { InterestsProps } from './types';

import ErrorFallback from '../ErrorFallback';

const Interests: React.FC<InterestsProps> = (props) => {
  return (
    <div className="flex flex-col gap-2 px-3 md:px-0">
      <label className="font-bold">관심가는 휴양지</label>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<InterestsSkeleton />}>
          <InterestsCarousel {...props} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Interests;
