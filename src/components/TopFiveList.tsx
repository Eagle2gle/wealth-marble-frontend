import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

interface MockDataType {
  id: number;
  title: string;
}

// API가 아직 나오지 않아서 데이터 하드코딩 - 추후 수정 필요
const TopFiveList = () => {
  const { data } = useQuery<MockDataType[]>({
    queryKey: ['cahootListData'],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_HOST}/cahootListData.json`).then((res) => res.json()),
  });

  return (
    <div className="flex flex-col px-4 md:px-0 py-4 gap-4 w-full md:w-80">
      <div className="flex justify-between items-center">
        <label className="font-bold">휴양지 Top 5</label>
      </div>
      <div className="flex flex-col gap-1">
        {data?.map(({ id, title }) => (
          <Link href={`/cahoots/detail/${id}`} key={id} className="flex md:p-1 gap-4">
            <div className="avatar md:w-1/5 min-w-[76px]">
              <div className="w-full bg-dark-grey rounded-lg"></div>
            </div>
            <div className="w-4/5 flex flex-col w-full relative gap-1 justify-center pr-4 text-xs">
              <div className="w-4/5 font-bold">
                <p className="truncate">{title}</p>
              </div>
              <div className="flex gap-4 justify-between">
                {/* 현재 마켓 거래가 */}
                <div className="flex flex-1 justify-start text-black/70">
                  <span>{'1,300'}</span>
                </div>
                {/* 전일가 기준 가격 변동, ▲▼*/}
                <div className="flex flex-1 justify-end text-blue">
                  <span>{'▼ 200(-1%)'}</span>
                </div>
              </div>
              <div className="flex gap-4 justify-between">
                <div className="flex flex-1 justify-start">
                  <span className="text-black/50">1주</span>
                </div>
                {/* 거래량 */}
                <div className="flex flex-1 justify-end">
                  <span className="text-black/50">{'1,234(3.7%)'}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopFiveList;
