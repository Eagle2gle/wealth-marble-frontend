import { Suspense, useState } from 'react';

import { useRouter } from 'next/router';

import DetailInfo from '@/components/market/DetailInfo';
import DetailStatus from '@/components/market/DetailStatus';
// import TransactionChart from '@/components/market/TransactionChart';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeSelector } from '@/store';
import type { MarketDetailType } from '@/types/market';
import type { Response } from '@/types/response';
import classNames from '@/utils/classnames';
import { ErrorBoundary } from '@sentry/nextjs';

import OrderBook from './OrderBook';
import TradeTab from './TradeTab';

import ErrorFallback from '../common/ErrorFallback';
import InterestButton from '../common/InterestButton';
import TabButton from '../common/TabButton';

const TABS = ['차트', '거래', '시세', '정보'] as const;

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
  const [tab, setTab] = useState<TabElements>(TABS[0]);
  const {
    data: {
      data: { userIds },
    },
  } = useSuspendedQuery<Response<MarketDetailType>>(['market/detail', id], () =>
    api.get(`markets/${id}`).json()
  );
  const userId = useTypeSelector((state) => state.user.id);

  const onTabClick = (tab: TabElements) => () => setTab(tab);

  return (
    <>
      {userId && (
        <InterestButton
          type="market"
          id={parseInt(String(id))}
          size="large"
          isInterest={userIds.includes(userId)}
        />
      )}
      <TabButton tabs={TABS} currentTab={tab} onTabClick={onTabClick} />
      <div className={classNames(tab === '차트' ? 'flex flex-col' : 'hidden', 'gap-[inherit]')}>
        {/* <TransactionChart id={id} /> */}
      </div>
      <div className={classNames(tab === '거래' ? 'flex flex-col' : 'hidden', 'gap-[inherit]')}>
        <div className="mb-96 flex justify-between gap-4 md:mb-0">
          <OrderBook />
          <TradeTab />
        </div>
      </div>
      <div className={classNames(tab === '시세' ? 'flex flex-col' : 'hidden', 'gap-[inherit]')}>
        <DetailStatus />
      </div>
      <div className={classNames(tab === '정보' ? 'flex flex-col' : 'hidden', 'gap-[inherit]')}>
        <DetailInfo />
      </div>
    </>
  );
};

export default DetailBodyWrapper;
