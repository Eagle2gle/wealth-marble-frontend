import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import type { CahootListType } from '@/types/cahoot';
import type { Response } from '@/types/response';
import classNames from '@/utils/classnames';
import dateFormat from '@/utils/dateFormat';

import Icon from '../common/Icons';
import Search from '../common/Search';

const CahootList = () => {
  const [keyword, setKeyword] = useState('');
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery<Response<CahootListType>>(['cahoot/list', keyword], () =>
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/cahoots?status=ongoing&offset=0&keyword=${keyword}`
    ).then((res) => res.json())
  );

  const onBookmarkClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('submitted');
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    setKeyword(target.search.value);
  };

  return (
    <div className="flex flex-col gap-4 px-4 md:px-0">
      <div className="flex items-center justify-between">
        <label className="font-bold">공모 목록</label>
        <form onSubmit={onSubmit}>
          <Search />
        </form>
      </div>
      {result.map(
        ({ id, stockNum, competitionRate, stockEnd, location, stockPrice, title, images }) => (
          <Link
            href={`/cahoots/detail/${id}`}
            key={id}
            className="flex gap-6 rounded-lg border border-grey shadow-md md:p-2"
          >
            <div className="avatar">
              <div className="w-32 rounded-l-lg md:rounded-lg"></div>
              <Image
                src={images[0]}
                alt=""
                className="rounded-l-lg md:rounded-lg"
                fill
                sizes="128px"
              />
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
                      // bookmarked ? 'fill-main text-main' : 'fill-none'
                      'fill-none'
                    )}
                  >
                    <Icon.Bookmark />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1 md:flex-row md:gap-4">
                <div className="flex flex-1 justify-between border-b border-grey px-1 pb-1.5">
                  공모가
                  <span>{stockPrice.toLocaleString()}원</span>
                </div>
                <div className="flex flex-1 justify-between border-b border-grey px-1 pb-1.5">
                  공모 수량
                  <span>{stockNum.toLocaleString()}주</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-1 justify-center px-1 md:justify-between">
                  <span className="hidden md:block">경쟁률</span>
                  <span className="font-bold text-main">
                    {competitionRate}%<span className="md:hidden"> 달성</span>
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-center px-1 md:justify-between">
                  <span className="hidden md:block">공모 마감일</span>
                  <span>
                    {dateFormat(stockEnd)}
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
