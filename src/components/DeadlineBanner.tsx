import { useQuery } from '@tanstack/react-query';

import Icon from './common/Icons';

interface MockDataType {
  title: string;
  participationRate: number;
}

const DeadlineBanner = () => {
  const { data } = useQuery<MockDataType>({
    queryKey: ['deadlineBannerData'],
    queryFn: () => fetch('/deadlineBannerData.json').then((res) => res.json()),
  });

  return (
    <div className="w-full max-w-3xl bg-tab flex px-4 items-center text-[8px] md:text-xs font-semibold justify-between cursor-pointer h-12">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl border border-black/50 p-1.5 bg-grey">오늘 마감 임박</div>
        <div className="flex gap-2">
          <span className="text-main">[공모]</span>
          <div>
            <span>{data?.title}</span>
            <span className="text-main ml-1">참여율 {data?.participationRate}% 달성</span>
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
