import { useRef } from 'react';

import Link from 'next/link';

import Icon from './common/Icons';

const MOCK_DATA = [
  {
    id: 1,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
  },
  {
    id: 2,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
  },
  {
    id: 3,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
  },
  {
    id: 4,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
  },
  {
    id: 5,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
  },
  {
    id: 6,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
  },
  {
    id: 7,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
  },
  {
    id: 8,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
  },
  {
    id: 9,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
  },
  {
    id: 10,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
  },
];

const DeadlineCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const onLeftClick = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft -= carouselRef.current.scrollWidth / MOCK_DATA.length;
  };
  const onRightClick = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft += carouselRef.current.scrollWidth / MOCK_DATA.length;
  };

  return (
    <div className="flex flex-col gap-2 px-3 md:px-0">
      <label className="font-bold">마감 임박 공모</label>
      <div className="flex items-center">
        <button onClick={onLeftClick} className="btn btn-circle btn-ghost hidden md:flex">
          <Icon.Left />
        </button>
        <div className="carousel w-full space-x-2 px-4" ref={carouselRef}>
          {MOCK_DATA.map(({ id, title, deadline }) => (
            <Link
              key={id}
              href={`/cahoots/detail/${id}`}
              className="carousel-item flex-col items-center font-semibold"
            >
              <div className="avatar -z-10">
                {/* 이미지 */}
                <div className="w-24 rounded-full bg-dark-grey"></div>
              </div>
              <div className="w-32 overflow-ellipsis overflow-hidden text-sm whitespace-nowrap">
                {title}
              </div>
              <span className="text-black/60 text-xs font-semibold">
                <span className="text-main">
                  {Math.floor(
                    (new Date(deadline).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)
                  )}
                  일
                </span>{' '}
                남았습니다.
              </span>
            </Link>
          ))}
        </div>
        <button onClick={onRightClick} className="btn btn-circle btn-ghost hidden md:flex">
          <Icon.Right />
        </button>
      </div>
    </div>
  );
};

export default DeadlineCarousel;
