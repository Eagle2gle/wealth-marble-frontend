import Image from 'next/image';
import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { Response } from '@/types/response';
import { formatTime } from '@/utils/date';

type MockType = {
  id: number;
  title: string;
  price: number;
  volume: number;
  images: string[];
  time: string;
  diff: number;
  amount: number;
}[];

const RecentTrade = () => {
  const {
    data: { data: recents },
  } = useSuspendedQuery<Response<MockType>>(['market/recents'], () =>
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/mock/markets/recents`).then((res) => res.json())
  );

  return (
    <div className="flex flex-col gap-2 px-3 md:px-0">
      <label className="font-bold">최근 거래 휴양지</label>
      <div className="flex flex-col gap-2">
        {recents.slice(0, 6).map(({ id, amount, diff, images, price, time, title, volume }) => (
          <Link
            href={`/markets/detail/${id}`}
            key={id}
            className="flex w-full gap-2 even:flex-row-reverse"
          >
            <div className="flex flex-col">
              <div className="avatar -z-10">
                <div className="w-16 rounded-full border border-grey"></div>
                <Image src={images[0]} alt="" className="rounded-full" fill sizes="96px" />
              </div>
              <span className="text-center text-[10px] text-grey-middle">{formatTime(time)}</span>
            </div>
            <div className="flex w-[calc(100%-144px)] flex-col justify-center gap-1 rounded bg-grey px-2 text-xs">
              <div className="tooltip flex" data-tip={title}>
                <span className="truncate font-bold">{title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/70">{price.toLocaleString()}</span>
                <span className={diff < 0 ? 'text-blue' : 'text-red'}>{`${
                  diff < 0 ? '▼' : '▲'
                }  ${diff.toLocaleString()}(${Math.round((diff / price) * 100)}%)`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/50">{amount}주</span>
                <span className="text-black/50">{`${volume.toLocaleString()}(%)`}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentTrade;
