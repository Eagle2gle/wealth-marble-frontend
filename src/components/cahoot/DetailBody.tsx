import { Suspense, useState } from 'react';

import { useRouter } from 'next/router';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { useTypeSelector } from '@/store';
import classNames from '@/utils/classnames';
import { ErrorBoundary } from '@sentry/nextjs';

import DetailInfo from './DetailInfo';
import DetailStatus from './DetailStatus';

import ErrorFallback from '../common/ErrorFallback';
import InterestButton from '../common/InterestButton';
import TabButton from '../common/TabButton';

const TABS = ['정보', '공모 현황'] as const;

type TabElements = (typeof TABS)[number];

const DetailBodyWrapper = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense>
        <DetailBody />
      </Suspense>
    </ErrorBoundary>
  );
};

const DetailBody = () => {
  const {
    query: { id },
  } = useRouter();
  const userId = useTypeSelector((state) => state.user.id) ?? '';
  const [tab, setTab] = useState<TabElements>(TABS[0]);
  const { queryFn, queryKey } = queries.cahoots.detail(String(id), userId);
  const {
    data: {
      data: { isInterest },
    },
  } = useSuspendedQuery(queryKey, queryFn);

  const onTabClick = (tab: TabElements) => () => setTab(tab);

  return (
    <>
      <InterestButton
        type="cahoot"
        id={parseInt(String(id))}
        size="large"
        isInterest={isInterest}
      />

      <TabButton tabs={TABS} currentTab={tab} onTabClick={onTabClick} />
      <div className={classNames(tab === '정보' ? 'flex flex-col' : 'hidden', 'gap-[inherit]')}>
        <DetailInfo />
      </div>
      <div
        className={classNames(tab === '공모 현황' ? 'flex flex-col' : 'hidden', 'gap-[inherit]')}
      >
        <DetailStatus />
      </div>
    </>
  );
};

export default DetailBodyWrapper;
