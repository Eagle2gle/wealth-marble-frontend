import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';

import Icon from '../common/Icons';

interface MockDataType {
  title: string;
  participationRate: number;
}

const DeadlineBanner = () => {
  const { data } = useSuspendedQuery<MockDataType>(['deadlineBannerData'], () =>
    fetch(`${process.env.NEXT_PUBLIC_LOCAL_HOST}/deadlineBannerData.json`).then((res) => res.json())
  );

  return (
    <div className="flex h-12 w-full max-w-3xl cursor-pointer items-center justify-between bg-tab px-4 text-[8px] font-semibold md:text-xs">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl border border-black/50 bg-grey p-1.5">오늘 마감 임박</div>
        <div className="flex gap-2">
          <span className="text-main">[공모]</span>
          <div>
            <span>{data.title}</span>
            <span className="ml-1 text-main">참여율 {data.participationRate}% 달성</span>
          </div>
        </div>
      </div>
      <button className="btn btn-ghost btn-circle hidden md:flex">
        <Icon.Right />
      </button>
    </div>
  );
};

export default DeadlineBanner;
