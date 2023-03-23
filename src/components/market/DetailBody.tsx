import { useState } from 'react';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeSelector } from '@/store';
import type { MarketDetailType } from '@/types/market';
import type { Response } from '@/types/response';
import classNames from '@/utils/classnames';

import OrderBook from './OrderBook';
import TradeTab from './TradeTab';

import InterestButton from '../common/InterestButton';
import TabButton from '../common/TabButton';

const TABS = ['차트', '거래', '시세', '정보'] as const;

type TabElements = (typeof TABS)[number];

interface DetailBodyProps {
  id: number;
}

const DetailBody = ({ id }: DetailBodyProps) => {
  const [tab, setTab] = useState<TabElements>(TABS[0]);
  const {
    data: {
      data: { userIds },
    },
  } = useSuspendedQuery<Response<MarketDetailType>>(['market/detail', `${id}`], () =>
    api.get(`markets/${id}`).json()
  );
  const userId = useTypeSelector((state) => state.user.id);

  const onTabClick = (tab: TabElements) => () => setTab(tab);

  return (
    <>
      {userId && (
        <InterestButton type="market" id={id} size="large" isInterest={userIds.includes(userId)} />
      )}
      <TabButton tabs={TABS} currentTab={tab} onTabClick={onTabClick} />
      <div className={classNames(tab === '차트' ? 'flex flex-col' : 'hidden', 'gap-[inherit]')}>
        차트
      </div>
      <div className={classNames(tab === '거래' ? 'flex flex-col' : 'hidden', 'gap-[inherit]')}>
        <div className="mb-96 flex justify-between gap-4 md:mb-0">
          <OrderBook id={id} />
          <TradeTab id={id} />
        </div>
      </div>
      <div className={classNames(tab === '시세' ? 'flex flex-col' : 'hidden', 'gap-[inherit]')}>
        시세
      </div>
      <div className={classNames(tab === '정보' ? 'flex flex-col' : 'hidden', 'gap-[inherit]')}>
        정보
      </div>
    </>
  );
};

export default DetailBody;
