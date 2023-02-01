import Image from 'next/image';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { fetchCahootDetail } from '@/libs/client/fetcher';
import type { CahootDetailInfoType } from '@/types/response';
import dateFormat from '@/utils/dateFormat';

import Carousel from '../common/Carousel';

const DetailInfo = () => {
  const {
    data: {
      images,
      expectedMonth,
      expectedTotalCost,
      stockNum,
      stockStart,
      stockEnd,
      descritption,
    },
  } = useSuspendedQuery<CahootDetailInfoType>(['cahootDetailData'], fetchCahootDetail);
  return (
    <>
      <Carousel itemCount={images.length ?? 0}>
        {images.map((imageUrl, index) => (
          <div key={index} className="carousel-item relative h-96 w-full bg-grey">
            <Image
              alt="image"
              src={imageUrl}
              className="object-contain"
              fill
              placeholder="blur"
              blurDataURL={imageUrl}
              sizes="768px"
            />
          </div>
        ))}
      </Carousel>
      <div className="mx-4 flex flex-col gap-2 md:mx-0">
        <label className="font-bold">공모 정보</label>
        <div className="flex break-keep border-y border-grey py-4">
          <div className="flex flex-1 flex-col justify-between gap-4 border-r border-grey px-1 text-center">
            건설 진행 시간
            <span className="text-sm font-bold md:text-base">{expectedMonth}달</span>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-4 border-r border-grey px-1 text-center">
            지출 예상 금액
            <span className="text-sm font-bold md:text-base">
              {expectedTotalCost.toLocaleString()}원
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-4 border-r border-grey px-1 text-center">
            총 발행 주식 수<span className="text-sm font-bold md:text-base">{stockNum}주</span>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-4 border-grey px-1 text-center">
            공모 기간
            <span className="text-sm font-bold md:text-base">
              <span>{dateFormat(stockStart ?? '')}</span>
              <span> ~ </span>
              <span>{dateFormat(stockEnd ?? '')}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="mx-4 flex flex-col gap-2 md:mx-0">
        <label className="font-bold">공모 아이디어 소개</label>
        {descritption}
      </div>
    </>
  );
};

export default DetailInfo;
