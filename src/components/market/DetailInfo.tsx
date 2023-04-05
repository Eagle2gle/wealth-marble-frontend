import Image from 'next/image';
import { useRouter } from 'next/router';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import type { MarketInfoType } from '@/types/market';
import type { Response } from '@/types/response';

import Carousel from '../common/Carousel';

const DetailInfo = () => {
  const router = useRouter();
  const {
    data: {
      data: { title, location, description, pictures },
    },
  } = useSuspendedQuery<Response<MarketInfoType>>(['market/detail', router.query.id], () =>
    api.get(`markets/info/${router.query.id}`).json()
  );

  return (
    <>
      {!!pictures.length && (
        <Carousel itemCount={pictures.length ?? 0}>
          {pictures.map((imageUrl, index) => (
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
      )}
      <div className="mx-4 flex flex-col gap-2 md:mx-0">
        <p className="text-lg font-bold">{title}</p>
        <p className="text-lg">{location}</p>
      </div>
      <div className="mx-4 flex flex-col gap-2 md:mx-0">
        <p className="text-lg font-bold">휴양지 소개</p>
        <div className="text-xs">{description}</div>
      </div>
    </>
  );
};

export default DetailInfo;
