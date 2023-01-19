import { useEffect, useState } from 'react';

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
  const [current, setCurrent] = useState(0);

  const onLeftClick = () => {
    setCurrent((prev) => (prev > MOCK_DATA.length - 1 - 5 ? prev - 5 : prev > 0 ? prev - 1 : prev));
  };
  const onRightClick = () => {
    setCurrent((prev) =>
      prev <= MOCK_DATA.length - 1 - 5 ? prev + 5 : prev < MOCK_DATA.length - 1 ? prev + 1 : prev
    );
  };

  useEffect(() => {
    setCurrent(parseInt(location.hash.replace(/[^0-9]/g, '')) || 0);
  }, []);

  return (
    <div className="flex flex-col gap-2 px-3 md:px-0">
      <label className="font-bold">마감 임박 공모</label>
      <div className="flex items-center">
        <a
          href={`#item${current}`}
          onClick={onLeftClick}
          className="btn btn-circle btn-ghost hidden md:flex"
        >
          <Icon.Left />
        </a>
        <div className="carousel w-full space-x-2 px-4">
          {MOCK_DATA.map(({ id, title, deadline }, index) => (
            <Link
              id={`item${index}`}
              key={index}
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
        <a
          href={`#item${current}`}
          onClick={onRightClick}
          className="btn btn-circle btn-ghost hidden md:flex"
        >
          <Icon.Right />
        </a>
      </div>
    </div>
  );
};

export default DeadlineCarousel;
