import { useState } from 'react';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import type { CahootDetailType } from '@/types/cahoot';
import type { Response } from '@/types/response';
import classNames from '@/utils/classnames';

import DetailInfo from './DetailInfo';
import DetailStatus from './DetailStatus';

import InterestButton from '../common/InterestButton';
import TabButton from '../common/TabButton';

const TABS = ['정보', '공모 현황'] as const;

type TabElements = (typeof TABS)[number];

interface DetailBodyProps {
  id: number;
}

const DetailBody = ({ id }: DetailBodyProps) => {
  const [tab, setTab] = useState<TabElements>(TABS[0]);
  const {
    data: {
      data: { isInterest },
    },
  } = useSuspendedQuery<Response<CahootDetailType>>(['cahoot/detail', `${id}`], () =>
    api.get(`cahoots/${id}?info=detail`).json()
  );

  const onTabClick = (tab: TabElements) => () => setTab(tab);

  return (
    <>
      <InterestButton type="cahoot" id={id} size="large" isInterest={isInterest} />
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

export default DetailBody;
