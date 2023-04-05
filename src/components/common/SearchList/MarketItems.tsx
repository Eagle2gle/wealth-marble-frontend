import { Fragment, useEffect, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { PRICE_STATUS_MAP } from '@/constants/market';
import { api } from '@/libs/client/api';
import type { MarketListType } from '@/types/market';
import type { Response } from '@/types/response';
import classNames from '@/utils/classnames';
import { useInfiniteQuery } from '@tanstack/react-query';

import type { ListItemsProps } from './type';

const MarketItems: React.FC<ListItemsProps> = ({ keyword }) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<Response<MarketListType>>({
    queryKey: ['market/list', keyword],
    queryFn: ({ pageParam = 0 }) =>
      api
        .get(`markets?page=${pageParam ?? 0}&keyword=${encodeURIComponent(keyword)}&size=10`)
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
            ({ country, price, picture, priceStatus, shortDescription, vacationId }) => (
              <Link
                href={`/markets/detail/${vacationId}`}
                key={vacationId}
                className="flex gap-2 rounded-lg border border-grey shadow-md md:gap-4 md:p-2"
              >
                <div className="avatar">
                  <div className="w-24 rounded-l-lg md:w-32 md:rounded-lg"></div>
                  {picture && (
                    <Image
                      src={picture}
                      alt=""
                      className="rounded-l-lg md:rounded-lg"
                      fill
                      sizes="128px"
                    />
                  )}
                </div>
                <div className="flex w-full flex-col justify-center gap-1 overflow-hidden py-2 pr-2 text-sm md:pr-4 md:text-base">
                  <div className="flex flex-col gap-1 border-grey font-bold md:flex-row md:gap-2">
                    <span className="break-keep text-main md:text-black">{country}</span>
                    <div className="mx-2 hidden border-l-2 py-0.5 md:block"></div>
                    <div className="flex w-full justify-between gap-4 overflow-hidden pr-2 md:pr-0">
                      <span className="truncate">{shortDescription}</span>
                      <span
                        className={classNames(
                          'whitespace-nowrap',
                          PRICE_STATUS_MAP[priceStatus].COLOR
                        )}
                      >
                        {`${PRICE_STATUS_MAP[priceStatus].TEXT} ${price?.toLocaleString() ?? 0}원`}
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

export default MarketItems;
