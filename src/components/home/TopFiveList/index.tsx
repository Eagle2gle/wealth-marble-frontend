import { Suspense, useState } from 'react';

import ButtonGroup from '@/components/common/ButtonGroup';
import ErrorFallback from '@/components/common/ErrorFallback';
import { ErrorBoundary } from '@sentry/nextjs';

import TopFiveListItems from './Items';
import ItemsSkeleton from './Skeleton';

const CriteriaList = ['거래가 많은(전일)', '보상이 많은(전일)'] as const;

const TopFiveList = () => {
  const [criteria, setCriteria] = useState('거래가 많은(전일)');

  const changeCriteria = (criteria: string) => {
    setCriteria(criteria);
  };

  return (
    <div className="flex w-full flex-col gap-2 px-4 py-4 md:w-80 md:px-0">
      <div className="flex items-center justify-between">
        <label className="font-bold">휴양지 Top 5</label>
      </div>
      <ButtonGroup
        items={CriteriaList}
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
