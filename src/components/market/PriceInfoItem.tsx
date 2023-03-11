import Image from 'next/image';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import type { MarketPriceInfoType, MarketPriceInfoOrder, MarketPriceInfo } from '@/types/market';
import type { Response } from '@/types/response';

interface PriceInfoItemProps {
  type: MarketPriceInfoType;
  order: MarketPriceInfoOrder;
}

const PriceInfoItem = ({ order, type }: PriceInfoItemProps) => {
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery<Response<MarketPriceInfo>>(['market/price', type, order], () =>
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/markets/rank?type=${type}&${order}=TRUE`).then(
      (res) => res.json()
    )
  );

  return (
    <div className="flex flex-col gap-4">
      {result.map(
        ({ title, currentPrice, dividend, dividendRate, gap, gapRate, pictureUrl }, index) => (
          <div key={index} className="flex w-full gap-2">
            <div className="avatar -z-10">
              <div className="w-16 rounded bg-grey"></div>
              {pictureUrl && (
                <Image src={pictureUrl} alt="" className="rounded" fill sizes="96px" />
              )}
              <span className="absolute aspect-square w-4 rounded bg-black text-center text-[8px] font-bold text-white">
                {index + 1}
              </span>
            </div>
            <div className="flex w-[calc(100%-72px)] flex-col justify-between text-xs">
              <div className="tooltip flex" data-tip={title}>
                <span className="w-fit truncate font-bold">{title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">{currentPrice.toLocaleString()}</span>
                <span className={gap < 0 ? 'text-blue' : 'text-red'}>{`${
                  gap < 0 ? '▼' : '▲'
                }  ${gap.toLocaleString()}(${gapRate}%)`}</span>
              </div>
              <div className="flex justify-between text-black/50">
                <span>1주</span>
                <span>{`${dividend.toLocaleString()}(${dividendRate}%)`}</span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PriceInfoItem;
