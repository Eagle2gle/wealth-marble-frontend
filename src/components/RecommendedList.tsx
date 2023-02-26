import { useRef, useState } from 'react';

import Link from 'next/link';

import ButtonGroup from '@/components/common/ButtonGroup';
import SelectBox from '@/components/common/SelectBox';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { CountriesType } from '@/types/cahoot';
import { Response } from '@/types/response';
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

const RecommendedCountryList = ['대만', '일본', '파푸아뉴기니'] as const;

const RecommendedList = () => {
  const selectBoxContainer = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState('장소');
  const {
    data: {
      data: { result: countries },
    },
  } = useSuspendedQuery<Response<CountriesType>>(['MarketCountries'], () =>
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/markets/countries`).then((res) => res.json())
  );

  const { data } = useQuery<MockDataType[]>({
    queryKey: ['cahootListData'],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_HOST}/cahootListData.json`).then((res) => res.json()),
  });

  const onBookmarkClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };

  // SelectBox, ButtonGroup을 통해 나라 변경 시 동작
  const changeCountry = (country: string) => {
    setSelectedCountry(country);
    // console.log(country);
  };

  const selectItems = [
    { index: 1, item: '대만' },
    { index: 2, item: '일본' },
    { index: 3, item: '파푸아뉴기니' },
    { index: 4, item: '미국' },
  ];

  return (
    <div
      ref={selectBoxContainer}
      className="relative flex flex-col gap-4 px-4 py-4 md:w-96 md:px-0"
    >
      <div className="flex items-center justify-between">
        <label className="font-bold">장소별 추천 휴양지</label>
      </div>
      <div className="flex gap-4">
        <SelectBox
          items={countries}
          containerRef={selectBoxContainer}
          currentItem={selectedCountry}
          changeItem={changeCountry}
          size="small"
        />
        <ButtonGroup
          items={RecommendedCountryList}
          currentItem={selectedCountry}
          changeItem={changeCountry}
        />
      </div>
      <div className="grid w-full grid-cols-6 gap-2 gap-y-6 max-md:carousel md:grid-cols-3 ">
        {data?.map(({ id, bookmarked, title }) => (
          <Link
            href={`/cahoots/detail/${id}`}
            key={id}
            className="flex w-32 flex-col gap-1 rounded border border-grey shadow-md"
          >
            {/* 이미지 */}
            <div className="avatar">
              <div className="w-full rounded-t bg-dark-grey"></div>
              <div className="absolute right-2 top-2">
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
            <div className="relative flex w-full flex-col justify-center overflow-hidden py-1 px-2 text-[8px]">
              <div className="flex gap-2 font-bold">
                <span className="rounded bg-main px-1 text-white">Hot</span>
                <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">{title}</span>
              </div>
              <div className="flex flex-col gap-1 gap-4"></div>
              <div className="text-right">
                <span className="text-[6px] text-black/60">
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
