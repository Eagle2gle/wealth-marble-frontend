import { Suspense, useState } from 'react';

import ErrorFallback from '@/components/common/ErrorFallback';
import type { MarketPriceInfoOrder, MarketPriceInfoType } from '@/types/market';
import classNames from '@/utils/classnames';
import { ErrorBoundary } from '@sentry/nextjs';

import PriceInfoItem from './Item';
import Skeleton from './Skeleton';
import PriceInfoUpdate from './Update';

type TabType = {
  name: string;
  type: MarketPriceInfoType;
  order: MarketPriceInfoOrder;
};

const TABS = [
  { name: '가격 상승 TOP', type: 'PRICE', order: 'up' },
  { name: '가격 하락 TOP', type: 'PRICE', order: 'down' },
  { name: '가격 상승률 TOP', type: 'PRICE_RATE', order: 'up' },
  { name: '가격 하락률 TOP', type: 'PRICE_RATE', order: 'down' },
] as const;

const PriceInfo = () => {
  const [tab, setTab] = useState<TabType>(TABS[0]);

  const onTabClick = (selectedTab: TabType) => () => setTab(selectedTab);

  return (
    <div className="flex w-full flex-col gap-4 px-4 md:px-0">
      <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1">
        <label className="font-bold">가격 정보</label>
        <PriceInfoUpdate />
      </div>
      <div className="flex gap-2">
        {TABS.map((TAB, index) => (
          <button
            key={index}
            className={classNames(
              'btn h-8 min-h-0 px-2 text-[10px]',
              tab.name === TAB.name
                ? 'btn-primary'
                : 'btn-ghost border border-grey text-grey-middle'
            )}
            onClick={onTabClick(TAB)}
          >
            {TAB.name}
          </button>
        ))}
      </div>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Skeleton />}>
          <PriceInfoItem order={tab.order} type={tab.type} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default PriceInfo;
