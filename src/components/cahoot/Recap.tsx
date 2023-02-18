import Image from 'next/image';
import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import type { CahootListType } from '@/types/cahoot';
import type { Response } from '@/types/response';
import { formatDate } from '@/utils/date';

import Carousel from '../common/Carousel';

const Recap = () => {
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery<Response<CahootListType>>(['cahoot/recap'], () =>
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cahoots?status=ended`).then((res) => res.json())
  );

  return (
    <div className="flex flex-col gap-2 bg-main-light p-4 md:p-0 md:py-4">
      <label className="font-bold md:px-4">공모 다시보기 어때요</label>
      <Carousel itemCount={result.length}>
        {result.map(({ id, title, stockEnd, stockNum, competitionRate, stockPrice, images }) => (
          <Link
            key={id}
            href={`/cahoots/detail/${id}`}
            className="carousel-item flex-col items-center font-semibold"
          >
            <div className="avatar z-0">
              {/* 이미지 */}
              <div className="w-32 rounded-t bg-dark-grey"></div>
              <Image src={images[0]} className="rounded-t" alt="" fill sizes="128px" />
              <span className="absolute bottom-5 w-32 overflow-hidden overflow-ellipsis whitespace-nowrap px-2 text-xs text-white">
                {title}
              </span>
              <span className="absolute bottom-0 w-full bg-black/25 text-center text-xs text-white">
                {formatDate(stockEnd)}
              </span>
            </div>
            <div className="flex w-full flex-col gap-1 rounded-b bg-white p-2 text-xs font-normal">
              <div className="flex justify-between">
                공모가
                <span>{stockPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                공모 수량
                <span>{stockNum.toLocaleString()} 주</span>
              </div>
              <div className="flex justify-between">
                경쟁률
                <span className="font-bold text-main">{competitionRate}%</span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Recap;
