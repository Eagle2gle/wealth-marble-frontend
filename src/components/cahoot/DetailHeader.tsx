import Image from 'next/image';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { fetchCahootDetail } from '@/libs/client/fetcher';
import type { CahootDetailInfoType } from '@/types/response';

import Order from './Order';

import Icon from '../common/Icons';

const DetailHeader = () => {
  const {
    data: { images, title, location, competitionRate, stockPrice },
  } = useSuspendedQuery<CahootDetailInfoType>(['cahootDetailData'], fetchCahootDetail);

  return (
    <div className="mx-4 mt-4 flex gap-3 md:mx-0 md:gap-5">
      <div className="avatar">
        <div className="relative h-36 w-full bg-grey md:h-80">
          <Image
            alt="image"
            src={images[0]}
            className="object-contain"
            fill
            placeholder="blur"
            blurDataURL={images[0]}
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
      </div>
      <div className="border-l border-black/50"></div>
      <div className="flex w-full flex-col justify-between text-lg font-bold">
        <div className="flex flex-col gap-1">
          <span className="underline underline-offset-2">{title}</span>
          <div className="flex flex-col-reverse gap-1 md:flex-col">
            <span className="text-xs font-medium md:text-lg">{location}</span>
            {/* <div className="rounded-lg text-xs bg-main w-fit py-0.5 px-2 text-white">
                  바다향을 가득 머금은
                </div> */}
          </div>
        </div>
        <div className="relative flex flex-col gap-2 text-xs md:text-lg">
          <div className="flex justify-between text-black/50">
            경쟁률
            <span className="text-black">{competitionRate}%</span>
          </div>
          <div className="flex justify-between text-black/50">
            주당 가격
            <span className="text-black">{stockPrice.toLocaleString()}원</span>
          </div>
          <Order />
          <button className="btn-ghost btn hidden gap-1 border-grey fill-none md:flex">
            <Icon.Bookmark />
            <span className="font-medium">관심상품</span>
            <span>1,239</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
