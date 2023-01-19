import Link from 'next/link';

import Carousel from './common/Carousel';

const MOCK_DATA = [
  {
    id: 1,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
    price: 20000,
    amount: 1000,
    competitiveRate: 350,
  },
  {
    id: 2,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
    price: 20000,
    amount: 1000,
    competitiveRate: 350,
  },
  {
    id: 3,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
    price: 20000,
    amount: 1000,
    competitiveRate: 350,
  },
  {
    id: 4,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
    price: 20000,
    amount: 1000,
    competitiveRate: 350,
  },
  {
    id: 5,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
    price: 20000,
    amount: 1000,
    competitiveRate: 350,
  },
  {
    id: 6,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
    price: 20000,
    amount: 1000,
    competitiveRate: 350,
  },
  {
    id: 7,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
    price: 20000,
    amount: 1000,
    competitiveRate: 350,
  },
  {
    id: 8,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
    price: 20000,
    amount: 1000,
    competitiveRate: 350,
  },
  {
    id: 9,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
    price: 20000,
    amount: 1000,
    competitiveRate: 350,
  },
  {
    id: 10,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    deadline: '2023-01-26T00:00:00.000Z',
    price: 20000,
    amount: 1000,
    competitiveRate: 350,
  },
];

const CahootRecap = () => {
  return (
    <div className="flex flex-col gap-2 py-4 bg-main-light">
      <label className="font-bold px-4">공모 다시보기 어때요</label>
      <Carousel itemCount={MOCK_DATA.length}>
        {MOCK_DATA.map(({ id, title, deadline, amount, competitiveRate, price }) => (
          <Link
            key={id}
            href={`/cahoots/detail/${id}`}
            className="carousel-item flex-col items-center font-semibold"
          >
            <div className="avatar z-0">
              {/* 이미지 */}
              <div className="w-32 rounded-t bg-dark-grey"></div>
              <span className="absolute bottom-5 w-32 px-2 text-white overflow-ellipsis overflow-hidden text-xs whitespace-nowrap">
                {title}
              </span>
              <span className="absolute bg-black/25 bottom-0 text-white w-full text-xs text-center">
                {Intl.DateTimeFormat('ko').format(new Date(deadline))}
              </span>
            </div>
            <div className="bg-white flex flex-col text-xs w-full p-2 font-normal gap-1 rounded-b">
              <div className="flex justify-between">
                공모가
                <span>{price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                공모 수량
                <span>{amount.toLocaleString()} 주</span>
              </div>
              <div className="flex justify-between">
                경쟁률
                <span className="text-main font-bold">{competitiveRate}%</span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default CahootRecap;
