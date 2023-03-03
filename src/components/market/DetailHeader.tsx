import Image from 'next/image';
import { useRouter } from 'next/router';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeSelector } from '@/store';
import type { MarketDetailType } from '@/types/market';
import type { Response } from '@/types/response';

import InterestButton from '../common/InterestButton';

const DetailHeader = () => {
  const {
    query: { id },
  } = useRouter();
  const {
    data: {
      data: { title, location, expectedRateOfReturn, pictures, price, shortDescription, userIds },
    },
  } = useSuspendedQuery<Response<MarketDetailType>>(['market/detail', id], () =>
    api.get(`markets/${id}`).json()
  );
  const userId = useTypeSelector((state) => state.user.id);

  return (
    <div className="mx-4 mt-4 flex gap-3 md:mx-0 md:gap-5">
      <div className="avatar">
        <div className="relative h-36 w-full bg-grey md:h-80">
          {pictures[0] && (
            <Image
              alt="image"
              src={pictures[0]}
              className="object-contain"
              fill
              placeholder="blur"
              blurDataURL={pictures[0]}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          )}
        </div>
      </div>
      <div className="border-l border-black/50"></div>
      <div className="flex w-full flex-col justify-between text-lg font-bold">
        <div className="flex flex-col gap-1">
          <span className="underline underline-offset-2">{title}</span>
          <div className="flex flex-col-reverse gap-1 md:flex-col">
            <span className="text-xs font-medium md:text-lg">{location}</span>
          </div>
        </div>
        <div className="hidden flex-col text-black md:flex">
          소개
          <span className="text-sm font-medium">{shortDescription}</span>
        </div>
        <div className="relative flex flex-col gap-2 text-xs md:text-lg">
          <div className="flex justify-between text-black/50">
            예상 수익률
            <span className="text-black">{expectedRateOfReturn}%</span>
          </div>
          <div className="flex justify-between text-black/50">
            현재가
            <span className="text-black">{price.toLocaleString()}원</span>
          </div>
          {userId && (
            <InterestButton
              size="large"
              isInterest={userIds.includes(userId)}
              id={parseInt(String(id))}
              hideOnMobile
              type="market"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
