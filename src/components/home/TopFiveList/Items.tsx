import Image from 'next/image';
import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';

import type { Criteria } from './types';

interface TopFiveListItemsProps {
  criteria: Criteria;
}

const TopFiveListItems: React.FC<TopFiveListItemsProps> = ({ criteria }) => {
  const { queryFn, queryKey } = queries.markets.top5(criteria);
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery(queryKey, queryFn);
  return (
    <div className="flex flex-col gap-1">
      {result?.map(
        ({ vacationId, title, currentPrice, gap, gapRate, dividend, dividendRate, pictureUrl }) => (
          <Link
            href={`/cahoots/detail/${vacationId}`}
            key={vacationId}
            className="flex gap-4 md:p-1"
          >
            <div className="avatar min-w-[76px] md:w-1/5">
              <div className="relative w-full rounded-lg bg-dark-grey">
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
            <div className="relative flex w-full flex-col justify-between gap-1 py-0.5 pr-4 text-xs">
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
  );
};

export default TopFiveListItems;
