import { Suspense, useState } from 'react';

import ButtonGroup from '@/components/common/ButtonGroup';
import ErrorFallback from '@/components/common/ErrorFallback';
import { ErrorBoundary } from '@sentry/nextjs';

import { CRITERIA_LIST } from './constants';
import TopFiveListItems from './Items';
import ItemsSkeleton from './Skeleton';

import type { Criteria } from './types';

const TopFiveList = () => {
  const [criteria, setCriteria] = useState<Criteria>('거래가 많은(전일)');

  const changeCriteria = (criteria: Criteria) => {
    setCriteria(criteria);
  };

  return (
    <div className="flex w-full flex-col gap-2 px-4 py-4 md:w-80 md:px-0">
      <div className="flex items-center justify-between">
        <label className="font-bold">휴양지 Top 5</label>
      </div>
      <ButtonGroup
        items={CRITERIA_LIST}
        currentItem={criteria}
        changeItem={changeCriteria}
        buttonSize="large"
      />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<ItemsSkeleton />}>
          <TopFiveListItems criteria={criteria} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TopFiveList;
