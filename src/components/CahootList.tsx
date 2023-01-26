import Link from 'next/link';

import classNames from '@/utils/classnames';
import { useQuery } from '@tanstack/react-query';

import Icon from './common/Icons';
import Search from './common/Search';

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

const CahootList = () => {
  const { data } = useQuery<MockDataType[]>({
    queryKey: ['cahootListData'],
    queryFn: () => fetch('/cahootListData.json').then((res) => res.json()),
  });

  const onBookmarkClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <div className="flex flex-col px-4 md:px-0 gap-4">
      <div className="flex justify-between items-center">
        <label className="font-bold">공모 목록</label>
        <form onSubmit={onSubmit}>
          <Search />
        </form>
      </div>
      {data?.map(
        ({ id, amount, bookmarked, competitiveRate, deadline, location, price, title }) => (
          <Link
            href={`/cahoots/detail/${id}`}
            key={id}
            className="rounded-lg border border-grey shadow-md flex md:p-2 gap-6"
          >
            <div className="avatar">
              <div className="w-32 bg-dark-grey rounded-l-lg md:rounded-lg"></div>
            </div>
            <div className="flex flex-col w-full overflow-hidden py-2 relative gap-1 justify-center pr-4 text-sm md:text-base">
              <div className="font-bold flex md:gap-2 flex-col md:flex-row border-b border-grey pb-2.5">
                <span className="break-keep text-main md:text-black">{location}</span>
                <div className="hidden md:block border-l-2 mx-2 py-0.5"></div>
                <span className="overflow-ellipsis overflow-hidden whitespace-nowrap">{title}</span>
                <div className="absolute right-3 top-1 md:top-auto">
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
              <div className="flex gap-1 md:gap-4 flex-col md:flex-row">
                <div className="flex flex-1 justify-between border-b border-grey pb-1.5 px-1">
                  공모가
                  <span>{price.toLocaleString()}원</span>
                </div>
                <div className="flex flex-1 justify-between border-b border-grey pb-1.5 px-1">
                  공모 수량
                  <span>{amount.toLocaleString()}주</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-1 justify-center md:justify-between px-1">
                  <span className="hidden md:block">경쟁률</span>
                  <span className="text-main font-bold">
                    {competitiveRate}%<span className="md:hidden"> 달성</span>
                  </span>
                </div>
                <div className="flex flex-1 justify-center md:justify-between px-1 items-center">
                  <span className="hidden md:block">공모 마감일</span>
                  <span>
                    {Intl.DateTimeFormat('ko-KR', { dateStyle: 'short' })
                      .format(new Date(deadline))
                      .replace(/\s|\.$/g, '')}
                    <span className="md:hidden"> 마감</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )
      )}
    </div>
  );
};

export default CahootList;
