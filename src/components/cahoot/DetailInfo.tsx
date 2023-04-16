import Image from 'next/image';
import { useRouter } from 'next/router';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { useTypeSelector } from '@/store';
import { formatDate } from '@/utils/date';

import Carousel from '../common/Carousel';

const DetailInfo = () => {
  const {
    query: { id },
  } = useRouter();
  const userId = useTypeSelector((state) => state.user.id) ?? '';
  const { queryFn, queryKey } = queries.cahoots.detail(String(id), userId);
  const {
    data: {
      data: {
        images,
        expectedMonth,
        expectedTotalCost,
        stockNum,
        stockStart,
        stockEnd,
        description,
      },
    },
  } = useSuspendedQuery(queryKey, queryFn);
  return (
    <>
      {!!images.length && (
        <Carousel itemCount={images.length ?? 0}>
          {images.map((imageUrl, index) => (
            <div key={index} className="carousel-item relative h-96 w-full bg-grey">
              <Image
                alt="image"
                src={imageUrl}
                className="object-contain"
                fill
                sizes="768px"
              />
            </div>
          ))}
        </Carousel>
      )}
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
              <span>{formatDate(stockStart ?? '')}</span>
              <span> ~ </span>
              <span>{formatDate(stockEnd ?? '')}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="mx-4 flex flex-col gap-2 md:mx-0">
        <label className="font-bold">공모 아이디어 소개</label>
        {description}
      </div>
    </>
  );
};

export default DetailInfo;
