import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import Carousel from './common/Carousel';

interface MockDataType {
  id: number;
  title: string;
  deadline: string;
  price: number;
  amount: number;
  competitiveRate: number;
}

const CahootRecap = () => {
  const { data } = useQuery<MockDataType[]>({
    queryKey: ['cahootRecapData'],
    queryFn: () => fetch('/cahootRecapData.json').then((res) => res.json()),
  });

  return (
    <div className="flex flex-col gap-2 p-4 md:py-4 md:p-0 bg-main-light">
      <label className="font-bold md:px-4">공모 다시보기 어때요</label>
      <Carousel itemCount={data?.length ?? 0}>
        {data?.map(({ id, title, deadline, amount, competitiveRate, price }) => (
          <Link
            key={id}
            href={`/cahoots/detail/${id}`}
            className="carousel-item flex-col items-center font-semibold"
          >
            <div className="avatar z-0">
              {/* 이미지 */}
              <div className="w-32 rounded-t bg-dark-grey"></div>
              <span className="absolute bottom-5 w-32 px-2 text-white overflow-ellipsis overflow-hidden text-xs whitespace-nowrap">
                {title}
              </span>
              <span className="absolute bg-black/25 bottom-0 text-white w-full text-xs text-center">
                {Intl.DateTimeFormat('ko').format(new Date(deadline))}
              </span>
            </div>
            <div className="bg-white flex flex-col text-xs w-full p-2 font-normal gap-1 rounded-b">
              <div className="flex justify-between">
                공모가
                <span>{price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                공모 수량
                <span>{amount.toLocaleString()} 주</span>
              </div>
              <div className="flex justify-between">
                경쟁률
                <span className="text-main font-bold">{competitiveRate}%</span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default CahootRecap;
