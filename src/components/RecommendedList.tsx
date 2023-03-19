import { useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

// import ButtonGroup from '@/components/common/ButtonGroup';
import SelectBox from '@/components/common/SelectBox';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { CountriesType } from '@/types/cahoot';
import { RecommendedListType } from '@/types/market';
import { Response } from '@/types/response';
import classNames from '@/utils/classnames';

import Icon from './common/Icons';

const RecommendedList = () => {
  const selectBoxContainer = useRef<HTMLDivElement>(null);
  // TODO: 전체 나라 추천 휴양지 API가 없어서 임시로 초기값을 대한민국으로 지정
  const [selectedCountry, setSelectedCountry] = useState('대한민국');
  const {
    data: {
      data: { result: countries },
    },
  } = useSuspendedQuery<Response<CountriesType>>(['MarketCountries'], () =>
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/markets/countries`).then((res) => res.json())
  );

  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery<Response<RecommendedListType>>(['RecommendListData', selectedCountry], () =>
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/markets/recommend?country=${encodeURIComponent(
        selectedCountry
      )}`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e))
  );

  const onBookmarkClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };

  // SelectBox, ButtonGroup을 통해 나라 변경 시 동작
  const changeCountry = (country: string) => {
    setSelectedCountry(country);
  };

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
        {/* TODO: RecommendedCountryList API가 없어서 임시 숨김 처리 */}
        {/* <ButtonGroup
          items={RecommendedCountryList}
          currentItem={selectedCountry}
          changeItem={changeCountry}
          buttonSize="small"
        /> */}
      </div>
      <div className="grid w-full grid-cols-6 gap-4 gap-y-4 max-md:carousel md:grid-cols-3 ">
        {result?.map(({ id, isInterest, title, expectedRateOfReturn, image }) => (
          <Link
            href={`/cahoots/detail/${id}`}
            key={id}
            className="flex w-32 flex-col gap-1 rounded border border-grey shadow-md"
          >
            {/* 이미지 */}
            <div className="avatar">
              <div className="w-full rounded-t bg-grey">
                {image && (
                  <Image
                    src={image}
                    alt={title}
                    className="rounded-l-lg md:rounded-lg"
                    fill
                    sizes="128px"
                  />
                )}
              </div>
              <div className="absolute right-2 top-2">
                <button
                  onClick={onBookmarkClick}
                  className={classNames(
                    'btn-ghost btn-xs btn-circle btn',
                    isInterest ? 'fill-main text-main' : 'fill-none'
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
                  예상 수익률 <span className="text-main">{expectedRateOfReturn}%</span>
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
