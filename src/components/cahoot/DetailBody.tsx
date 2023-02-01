import { useState } from 'react';

import classNames from '@/utils/classnames';

import DetailInfo from './DetailInfo';
import DetailStatus from './DetailStatus';

import TabButton from '../common/TabButton';

const TABS = ['정보', '공모 현황'] as const;

type TabElements = (typeof TABS)[number];

const DetailBody = () => {
  const [tab, setTab] = useState<TabElements>(TABS[0]);

  const onTabClick = (tab: TabElements) => () => setTab(tab);

  return (
    <>
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
