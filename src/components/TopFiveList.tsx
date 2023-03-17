import { useState } from 'react';

import Link from 'next/link';

import ButtonGroup from '@/components/common/ButtonGroup';
import { useQuery } from '@tanstack/react-query';

interface MockDataType {
  id: number;
  title: string;
}

const CriteriaList = ['거래가 많은(전일)', '보상이 많은(전일)'] as const;

const TopFiveList = () => {
  const [criteria, setCriteria] = useState('거래가 많은(전일)');

  const { data } = useQuery<MockDataType[]>({
    queryKey: ['cahootListData'],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_HOST}/cahootListData.json`).then((res) => res.json()),
  });

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
      <div className="flex flex-col gap-1">
        {data?.map(({ id, title }) => (
          <Link href={`/cahoots/detail/${id}`} key={id} className="flex gap-4 md:p-1">
            <div className="avatar min-w-[76px] md:w-1/5">
              <div className="w-full rounded-lg bg-dark-grey"></div>
            </div>
            <div className="relative flex w-4/5 w-full flex-col justify-center gap-1 pr-4 text-xs">
              <div className="w-4/5 font-bold">
                <p className="truncate">{title}</p>
              </div>
              <div className="flex justify-between gap-4">
                {/* 현재 마켓 거래가 */}
                <div className="flex flex-1 justify-start text-black/70">
                  <span>{'1,300'}</span>
                </div>
                {/* 전일가 기준 가격 변동, ▲▼*/}
                <div className="flex flex-1 justify-end text-blue">
                  <span>{'▼ 200(-1%)'}</span>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <div className="flex flex-1 justify-start">
                  <span className="text-black/50">1주</span>
                </div>
                {/* 거래량 */}
                <div className="flex flex-1 justify-end">
                  <span className="text-black/50">{'1,234(3.7%)'}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopFiveList;
