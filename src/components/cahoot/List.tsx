import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import classNames from '@/utils/classnames';
import dateFormat from '@/utils/dateFormat';

import Icon from '../common/Icons';
import Search from '../common/Search';

type MockDataType = {
  id: number;
  title: string;
  deadline: string;
  price: number;
  amount: number;
  competitiveRate: number;
  location: string;
  bookmarked: boolean;
}[];

const CahootList = () => {
  const { data } = useSuspendedQuery<MockDataType>(['cahootListData'], () =>
    fetch(`${process.env.NEXT_PUBLIC_HOST}/cahootListData.json`).then((res) => res.json())
  );

  const onBookmarkClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <div className="flex flex-col gap-4 px-4 md:px-0">
      <div className="flex items-center justify-between">
        <label className="font-bold">공모 목록</label>
        <form onSubmit={onSubmit}>
          <Search />
        </form>
      </div>
      {data.map(({ id, amount, bookmarked, competitiveRate, deadline, location, price, title }) => (
        <Link
          href={`/cahoots/detail/${id}`}
          key={id}
          className="flex gap-6 rounded-lg border border-grey shadow-md md:p-2"
        >
          <div className="avatar">
            <div className="w-32 rounded-l-lg bg-dark-grey md:rounded-lg"></div>
          </div>
          <div className="relative flex w-full flex-col justify-center gap-1 overflow-hidden py-2 pr-4 text-sm md:text-base">
            <div className="flex flex-col border-b border-grey pb-2.5 font-bold md:flex-row md:gap-2">
              <span className="break-keep text-main md:text-black">{location}</span>
              <div className="mx-2 hidden border-l-2 py-0.5 md:block"></div>
              <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">{title}</span>
              <div className="absolute right-3 top-1 md:top-auto">
                <button
                  onClick={onBookmarkClick}
                  className={classNames(
                    'btn-ghost btn-xs btn-circle btn',
                    bookmarked ? 'fill-main text-main' : 'fill-none'
                  )}
                >
                  <Icon.Bookmark />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1 md:flex-row md:gap-4">
              <div className="flex flex-1 justify-between border-b border-grey px-1 pb-1.5">
                공모가
                <span>{price.toLocaleString()}원</span>
              </div>
              <div className="flex flex-1 justify-between border-b border-grey px-1 pb-1.5">
                공모 수량
                <span>{amount.toLocaleString()}주</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-1 justify-center px-1 md:justify-between">
                <span className="hidden md:block">경쟁률</span>
                <span className="font-bold text-main">
                  {competitiveRate}%<span className="md:hidden"> 달성</span>
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center px-1 md:justify-between">
                <span className="hidden md:block">공모 마감일</span>
                <span>
                  {dateFormat(deadline)}
                  <span className="md:hidden"> 마감</span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CahootList;
