import { useRef } from 'react';

import Link from 'next/link';

import SelectBox from '@/components/common/SelectBox';
import classNames from '@/utils/classnames';
import { useQuery } from '@tanstack/react-query';

import Icon from './common/Icons';

interface MockDataType {
  id: number;
  title: string;
  deadline: string;
  price: number;
  amount: number;
  competitiveRate: number;
  location: string;
  bookmarked: boolean;
}

const RecommendedList = () => {
  const selectBoxContainer = useRef<HTMLDivElement>(null);
  const { data } = useQuery<MockDataType[]>({
    queryKey: ['cahootListData'],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_HOST}/cahootListData.json`).then((res) => res.json()),
  });

  const onBookmarkClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={selectBoxContainer}
      className="relative flex flex-col px-4 md:px-0 py-4 gap-4 md:w-96"
    >
      <div className="flex justify-between items-center">
        <label className="font-bold">장소별 추천 휴양지</label>
      </div>
      <div>
        <SelectBox placeholder="장소" container={selectBoxContainer.current} />
      </div>
      <div className="w-full grid grid-cols-6 md:grid-cols-3 gap-2 gap-y-6 max-md:carousel ">
        {data?.map(({ id, bookmarked, title }) => (
          <Link
            href={`/cahoots/detail/${id}`}
            key={id}
            className="rounded border border-grey shadow-md flex flex-col gap-1 w-32"
          >
            {/* 이미지 */}
            <div className="avatar">
              <div className="w-full bg-dark-grey rounded-t"></div>
              <div className="absolute right-2 top-2">
                <button
                  onClick={onBookmarkClick}
                  className={classNames(
                    'btn btn-circle btn-ghost btn-xs',
                    bookmarked ? 'text-main fill-main' : 'fill-none'
                  )}
                >
                  <Icon.Bookmark />
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full overflow-hidden py-1 relative justify-center px-2 text-[8px]">
              <div className="font-bold flex gap-2">
                <span className="bg-main text-white px-1 rounded">Hot</span>
                <span className="overflow-ellipsis overflow-hidden whitespace-nowrap">{title}</span>
              </div>
              <div className="flex gap-1 gap-4 flex-col"></div>
              <div className="text-right">
                <span className="text-black/60 text-[6px]">
                  예상 수익률 <span className="text-main">120%</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedList;
