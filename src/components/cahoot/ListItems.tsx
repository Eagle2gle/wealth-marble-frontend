import { Fragment, useEffect, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { api } from '@/libs/client/api';
import type { CahootListType } from '@/types/cahoot';
import type { Response } from '@/types/response';
import { formatDate } from '@/utils/date';
import { useInfiniteQuery } from '@tanstack/react-query';

import InterestButton from '../common/InterestButton';

interface ListItemsProps {
  keyword: string;
}

const ListItems: React.FC<ListItemsProps> = ({ keyword }) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<Response<CahootListType>>({
    queryKey: ['cahoot/list', keyword],
    queryFn: ({ pageParam = 0 }) =>
      api
        .get(`cahoots?status=ongoing&page=${pageParam ?? 0}&keyword=${encodeURIComponent(keyword)}`)
        .json(),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.result.length ? allPages.length : false,
  });
  const observerRef = useRef<IntersectionObserver>();
  const listEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onIntersection: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          fetchNextPage();
        }
      });
    };
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(onIntersection);
    listEndRef.current && observerRef.current.observe(listEndRef.current);
  }, [data, fetchNextPage]);

  return (
    <>
      {data?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.data.result.map(
            ({
              id,
              stockNum,
              competitionRate,
              stockEnd,
              location,
              stockPrice,
              title,
              images,
              isInterest,
            }) => (
              <Link
                href={`/cahoots/detail/${id}`}
                key={id}
                className="flex gap-6 rounded-lg border border-grey shadow-md md:p-2"
              >
                <div className="avatar">
                  <div className="w-32 rounded-l-lg md:rounded-lg"></div>
                  {images[0] && (
                    <Image
                      src={images[0]}
                      alt=""
                      className="rounded-l-lg md:rounded-lg"
                      fill
                      sizes="128px"
                    />
                  )}
                </div>
                <div className="relative flex w-full flex-col justify-center gap-1 overflow-hidden py-2 pr-4 text-sm md:text-base">
                  <div className="flex flex-col border-b border-grey pb-2.5 font-bold md:flex-row md:gap-2">
                    <span className="break-keep text-main md:text-black">{location}</span>
                    <div className="mx-2 hidden border-l-2 py-0.5 md:block"></div>
                    <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {title}
                    </span>
                    <div className="absolute right-3 top-1 md:top-auto">
                      <InterestButton type="cahoot" size="small" id={id} isInterest={isInterest} />
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
                        {formatDate(stockEnd)}
                        <span className="md:hidden"> 마감</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </Fragment>
      ))}
      <div ref={hasNextPage ? listEndRef : null}></div>
    </>
  );
};

export default ListItems;
