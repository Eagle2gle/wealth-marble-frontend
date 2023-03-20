import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import ButtonGroup from '@/components/common/ButtonGroup';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { Top5ListType } from '@/types/market';
import { Response } from '@/types/response';

const CriteriaList = ['거래가 많은(전일)', '보상이 많은(전일)'] as const;

const TopFiveList = () => {
  const [criteria, setCriteria] = useState('거래가 많은(전일)');

  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery<Response<Top5ListType>>(['Top5ListData', criteria], () =>
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/markets/top?property=${
        criteria == '거래가 많은(전일)' ? 'TRANSACTION' : 'REWARD'
      }`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e))
  );

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
        {result?.map(
          ({
            vacationId,
            title,
            currentPrice,
            gap,
            gapRate,
            dividend,
            dividendRate,
            pictureUrl,
          }) => (
            <Link
              href={`/cahoots/detail/${vacationId}`}
              key={vacationId}
              className="flex gap-4 md:p-1"
            >
              <div className="avatar min-w-[76px] md:w-1/5">
                <div className="w-full rounded-lg bg-dark-grey">
                  {pictureUrl && (
                    <Image
                      alt={title}
                      src={pictureUrl}
                      className="rounded-lg object-contain"
                      fill
                      sizes="96px"
                    />
                  )}
                </div>
              </div>
              <div className="relative flex w-4/5 w-full flex-col justify-between gap-1 py-0.5 pr-4 text-xs">
                <div className="w-4/5 font-bold">
                  <p className="truncate">{title}</p>
                </div>
                <div className="flex justify-between gap-4">
                  {/* 현재 마켓 거래가 */}
                  <div className="flex flex-1 justify-start text-black/70">
                    <span>{currentPrice.toLocaleString()}</span>
                  </div>
                  {/* 전일가 기준 가격 변동*/}
                  <div className="flex flex-1 justify-end">
                    <span className={gap < 0 ? 'text-blue' : 'text-red'}>{`${
                      gap < 0 ? '▼' : '▲'
                    }  ${gap.toLocaleString()}(${gapRate}%)`}</span>
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <div className="flex flex-1 justify-start">
                    <span className="text-black/50">1주</span>
                  </div>
                  {/* 거래량 */}
                  <div className="flex flex-1 justify-end">
                    <span className="text-black/50">{`${dividend.toLocaleString()}(${dividendRate}%)`}</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default TopFiveList;
