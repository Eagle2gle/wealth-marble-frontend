import { Fragment, useEffect, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { fetcher } from '@/libs/client/fetcher';
import type { Response } from '@/types/response';
import classNames from '@/utils/classnames';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ListItemsProps {
  keyword: string;
}

interface MockType {
  result: {
    id: number;
    title: string;
    location: string;
    price: number;
    diff: number;
    images: string[];
  }[];
}

const ListItems = ({ keyword }: ListItemsProps) => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<Response<MockType>>({
    queryKey: ['cahoot/list', keyword],
    queryFn: ({ pageParam = 0 }) =>
      fetcher(
        `${
          process.env.NEXT_PUBLIC_HOST
        }/api/mock/markets?status=ongoing&page=${pageParam}&keyword=${encodeURIComponent(keyword)}`
      )(),
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
          {page.data.result.map(({ id, diff, images, location, price, title }) => (
            <Link
              href={`/cahoots/detail/${id}`}
              key={id}
              className="flex gap-2 rounded-lg border border-grey shadow-md md:gap-4 md:p-2"
            >
              <div className="avatar">
                <div className="w-24 rounded-l-lg md:w-32 md:rounded-lg"></div>
                <Image
                  src={images[0]}
                  alt=""
                  className="rounded-l-lg md:rounded-lg"
                  fill
                  sizes="128px"
                />
              </div>
              <div className="relative flex w-full flex-col justify-center gap-1 overflow-hidden py-2 pr-2 text-sm md:pr-4 md:text-base">
                <div className="flex flex-col border-grey pb-2.5 font-bold md:flex-row md:gap-2">
                  <span className="break-keep text-main md:text-black">{location}</span>
                  <div className="mx-2 hidden border-l-2 py-0.5 md:block"></div>
                  <span className="truncate">{title}</span>
                  <span
                    className={classNames('whitespace-nowrap', diff < 0 ? 'text-blue' : 'text-red')}
                  >
                    {`${diff < 0 ? '▼' : '▲'} ${price.toLocaleString()}원`}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </Fragment>
      ))}
      <div ref={hasNextPage ? listEndRef : null}></div>
    </>
  );
};

export default ListItems;
