import Image from 'next/image';
import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { Response } from '@/types/response';

type MockType = {
  updatedAt: string;
  result: {
    id: number;
    title: string;
    price: number;
    volume: number;
    images: string[];
    diff: number;
  }[];
};

interface PriceInfoItemProps {
  type: 'price' | 'percent';
  order: 'asc' | 'desc';
}

const PriceInfoItem = ({ order, type }: PriceInfoItemProps) => {
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery<Response<MockType>>(['market/price', type, order], () =>
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/mock/markets/price?type=${type}&order=${order}`
    ).then((res) => res.json())
  );

  return (
    <div className="flex flex-col gap-4">
      {result.map(({ id, title, diff, images, price, volume }, index) => (
        <Link href={`/markets/detail/${id}`} key={id} className="flex w-full gap-2">
          <div className="avatar -z-10">
            <div className="w-16 rounded bg-grey"></div>
            <Image src={images[0]} alt="" className="rounded" fill sizes="96px" />
            <span className="absolute aspect-square w-4 rounded bg-black text-center text-[8px] font-bold text-white">
              {index + 1}
            </span>
          </div>
          <div className="flex w-[calc(100%-72px)] flex-col justify-between text-xs">
            <div className="tooltip flex" data-tip={title}>
              <span className="w-fit truncate font-bold">{title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/70">{price.toLocaleString()}</span>
              <span className={diff < 0 ? 'text-blue' : 'text-red'}>{`${
                diff < 0 ? '▼' : '▲'
              }  ${diff.toLocaleString()}(${Math.round((diff / price) * 100)}%)`}</span>
            </div>
            <div className="flex justify-between text-black/50">
              <span>1주</span>
              <span>{`${volume.toLocaleString()}(%)`}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PriceInfoItem;
