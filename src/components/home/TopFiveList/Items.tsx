import Image from 'next/image';
import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import type { Top5ListType } from '@/types/market';
import type { Response } from '@/types/response';

interface TopFiveListItemsProps {
  criteria: string;
}

const TopFiveListItems: React.FC<TopFiveListItemsProps> = ({ criteria }) => {
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery<Response<Top5ListType>>(['Top5ListData', criteria], () =>
    api
      .get(`markets/top?property=${criteria === '거래가 많은(전일)' ? 'TRANSACTION' : 'REWARD'}`)
      .json()
  );
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
