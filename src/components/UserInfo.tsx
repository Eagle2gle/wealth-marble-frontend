import Icon from '@/components/common/Icons';

const UserInfo = () => {
  return (
    <>
      {/* only desktop */}
      <div className="my-2 hidden rounded-md border border-grey px-6 py-6 pt-4 md:block">
        <p className="text-lg font-bold text-main">홍길동님</p>
        <hr className="border-1 my-2 border-grey"></hr>
        <div className="flex flex-col gap-3">
          <p className="flex gap-6 text-sm">
            <span className="w-20">보유 캐쉬:</span>
            <span className="font-bold text-main">{Number(4000000).toLocaleString()}원</span>
          </p>
          <p className="flex gap-6 text-sm">
            <span className="w-20">총 지분 가치:</span>
            <span className="font-bold text-main">{Number(4000000).toLocaleString()}원</span>
          </p>
          <div className="flex gap-6 text-sm">
            <span className="w-20">Email:</span>
            <div className="flex flex-col gap-1">
              <span className="">test@gmail.com</span>
              <span className="">구글 연동</span>
            </div>
          </div>
          <p className="flex gap-6 text-sm">
            <span className="w-20">권한:</span>
            <span className="">사용자</span>
            <button className="btn-primary btn-xs btn ml-auto">운영자 신청</button>
          </p>
        </div>
      </div>
      {/* only mobile */}
      <div className="block md:hidden">
        <div className="border-y-1 border border-grey bg-black/5 py-2 px-4">
          <p className="text-base font-black">홍길동님</p>
          <p className="text-xs text-grey-middle">test@gmail.com</p>
        </div>
        <div className="my-6 mx-12 rounded-md border border-main px-6 pt-4 pb-6">
          <p className="text-xl font-bold">내 지갑</p>
          <hr className="border-1 my-2 border-grey"></hr>
          <p className="py-1 text-xs font-black">보유캐쉬</p>
          <p className="flex items-center gap-1">
            <span>
              <Icon.Money />
            </span>
            <span className="text-base font-bold text-main">
              {Number(4000000).toLocaleString()}원
            </span>
          </p>
          <hr className="border-1 my-2 border-grey"></hr>
          <p className="py-1 text-xs font-black">총 지분 가치</p>
          <p className="flex items-center gap-1">
            <span>
              <Icon.Money />
            </span>
            <span className="text-base font-bold text-main">
              {Number(4000000).toLocaleString()}원
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
