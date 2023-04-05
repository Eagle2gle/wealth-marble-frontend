import { Suspense, useState } from 'react';

import ErrorFallback from '@/components/common/ErrorFallback';
import { ErrorBoundary } from '@sentry/nextjs';

import RecommendedListItems from './Items';
import RecommededSelectBox from './RecommededSelectBox';
import RecommendedListSkeleton from './Skeleton';

const RecommendedList = () => {
  // TODO: 전체 나라 추천 휴양지 API가 없어서 임시로 초기값을 대한민국으로 지정
  const [selectedCountry, setSelectedCountry] = useState('대한민국');

  // SelectBox, ButtonGroup을 통해 나라 변경 시 동작
  const changeCountry = (country: string) => {
    setSelectedCountry(country);
  };

  return (
    <div className="relative flex flex-col gap-4 px-4 py-4 md:w-96 md:px-0">
      <div className="flex items-center justify-between">
        <label className="font-bold">장소별 추천 휴양지</label>
      </div>
      <div className="flex gap-4">
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense>
            <RecommededSelectBox changeItem={changeCountry} currentItem={selectedCountry} />
          </Suspense>
        </ErrorBoundary>
        {/* TODO: RecommendedCountryList API가 없어서 임시 숨김 처리 */}
        {/* <ButtonGroup
          items={RecommendedCountryList}
          currentItem={selectedCountry}
          changeItem={changeCountry}
          buttonSize="small"
        /> */}
      </div>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<RecommendedListSkeleton />}>
          <RecommendedListItems selectedCountry={selectedCountry} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default RecommendedList;
