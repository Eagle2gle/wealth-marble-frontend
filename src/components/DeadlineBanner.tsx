import Icon from './common/Icons';

const MOCK_DATA = {
  title: '하와이 와이키키 근처 게스트 하우스',
  participationRate: 200,
};

const DeadlineBanner = () => {
  const { participationRate, title } = MOCK_DATA;

  return (
    <div className="w-full max-w-3xl bg-tab flex px-4 items-center text-[8px] md:text-xs font-semibold justify-between cursor-pointer h-12">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl border border-black/50 p-1.5 bg-grey">오늘 마감 임박</div>
        <div className="flex gap-2">
          <span className="text-main">[공모]</span>
          <div>
            <span>{title}</span>
            <span className="text-main ml-1">참여율 {participationRate}% 달성</span>
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
