import { Suspense, useState } from 'react';

import classNames from '@/utils/classnames';

import PriceInfoItem from './PriceInfoItem';
import PriceInfoUpdate from './PriceInfoUpdate';

type TabType = {
  name: string;
  type: 'price' | 'percent';
  order: 'desc' | 'asc';
};

const TABS = [
  { name: '가격 상승 TOP', type: 'price', order: 'desc' },
  { name: '가격 하락 TOP', type: 'price', order: 'asc' },
  { name: '가격 상승률 TOP', type: 'percent', order: 'desc' },
  { name: '가격 하락률 TOP', type: 'percent', order: 'asc' },
] as const;

const PriceInfo = () => {
  const [tab, setTab] = useState<TabType>(TABS[0]);

  const onTabClick = (selectedTab: TabType) => () => setTab(selectedTab);

  return (
    <div className="flex w-full flex-col gap-4 px-4 md:px-0">
      <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1">
        <label className="font-bold">가격 정보</label>
        <Suspense fallback={<p>로딩...</p>}>
          <PriceInfoUpdate order={tab.order} type={tab.type} />
        </Suspense>
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
      <Suspense fallback={<p>로딩...</p>}>
        <PriceInfoItem order={tab.order} type={tab.type} />
      </Suspense>
    </div>
  );
};

export default PriceInfo;
