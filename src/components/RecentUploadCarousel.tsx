import Image from 'next/image';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import Carousel from './common/Carousel';

interface MockDataType {
  id: number;
  title: string;
  stockStart: string;
  expectedRateOfReturn: string;
  images: string;
}

// TODO: API 연동
const RecentUploadCarousel = () => {
  const { data } = useQuery<MockDataType[]>({
    queryKey: ['RecentUploadCarouselData'],
    queryFn: () => fetch('/RecentUploadCarouselData.json').then((res) => res.json()),
  });

  return (
    <div className="flex flex-col gap-2 px-3 md:px-0">
      <div className="flex flex-col">
        <h1 className="font-bold">최근에 올라온 공모</h1>
        <h2 className="text-black/60 text-xs font-semibold">
          참여하면 수익도 얻고 휴양지 예약권도 얻을 수 있다고!?{' '}
        </h2>
      </div>
      <Carousel itemCount={data?.length ?? 0}>
        {data?.map(({ id, title, images, expectedRateOfReturn }) => (
          <Link
            key={id}
            href={`/cahoots/detail/${id}`}
            className="carousel-item flex-col items-center font-semibold"
          >
            <div className="avatar -z-10">
              {/* 이미지 */}
              {/* TODO: 이미지 연결 */}
              <div className="w-24 rounded-full bg-grey">
                {/* <Image
                  alt="공모 이미지"
                  src={images}
                  className="object-contain"
                  fill
                  width={96}
                  height={96}
                /> */}
              </div>
            </div>
            <div className="w-32 overflow-ellipsis text-center overflow-hidden text-sm whitespace-nowrap">
              {title}
            </div>
            <span className="text-center text-black/60 text-xs font-semibold">
              예상 수익률 <span className="text-main">{expectedRateOfReturn}%</span>
            </span>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default RecentUploadCarousel;
