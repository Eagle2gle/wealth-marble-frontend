import Link from 'next/link';

import Icon from '@/components/common/Icons';
import { PROVIDER_TYPE, ROLE, RANK } from '@/constants/mypage';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { useTypeSelector } from '@/store';

const UserInfo = () => {
  const token = useTypeSelector((state) => state.user.token) ?? '';
  const { queryFn, queryKey } = queries.users.info(token);
  const { data } = useSuspendedQuery(queryKey, queryFn, { enabled: !!token });

  return (
    <>
      {/* only desktop */}
      <div className="my-2 hidden rounded-md border border-grey px-6 py-6 pt-4 md:block">
        <p className="text-lg font-bold text-main">{data?.data.username}님</p>
        <hr className="border-1 my-2 border-grey"></hr>
        <div className="flex flex-col gap-3">
          <p className="flex gap-6 text-sm">
            <span className="w-20">보유 캐쉬:</span>
            <span className="font-bold text-main">
              {Number(data?.data.cash).toLocaleString()}원
            </span>
          </p>
          <p className="flex gap-6 text-sm">
            <span className="w-20">총 지분 가치:</span>
            <span className="font-bold text-main">
              {Number(data?.data.value).toLocaleString()}원
            </span>
          </p>
          <div className="flex gap-6 text-sm">
            <span className="w-20">Email:</span>
            <div className="flex flex-col gap-1">
              <span className="">{data?.data.email}</span>
              <span className="">
                {data
                  ? PROVIDER_TYPE[data?.data.providerType as keyof typeof PROVIDER_TYPE].TEXT
                  : '소셜'}{' '}
                연동
              </span>
            </div>
          </div>
          <p className="flex gap-6 text-sm">
            <span className="w-20">권한:</span>
            <span className="">{data ? ROLE[data?.data.role as keyof typeof ROLE].TEXT : ''}</span>
            <span className="ml-auto rounded-lg bg-main px-4 py-1 text-white">
              등급: {data ? RANK[data?.data.rank as keyof typeof RANK].TEXT : '남작'}
            </span>
          </p>
          {/* <p className="flex gap-6 text-sm">
            <span className="w-20">등급:</span>
            <span className="">
              {data ? RANK[data?.data.rank as keyof typeof RANK].TEXT : '남작'}
            </span>
          </p> */}
        </div>
      </div>
      {/* only mobile */}
      <div className="block md:hidden">
        <Link href={`/mypage/management`}>
          <div className="border-y-1 border border-grey bg-black/5 py-2 px-4">
            <p className="flex text-base font-black">
              <span>{data?.data.username}님</span>
              <span>
                <Icon.Right />
              </span>
            </p>
            <p className="text-xs text-grey-middle">{data?.data.email}</p>
          </div>
        </Link>
        <div className="my-6 mx-12 rounded-md border border-main px-6 pt-4 pb-6">
          <p className="text-xl font-bold">내 지갑</p>
          <hr className="border-1 my-2 border-grey"></hr>
          <p className="py-1 text-xs font-black">보유캐쉬</p>
          <p className="flex items-center gap-1">
            <span>
              <Icon.Money />
            </span>
            <span className="text-base font-bold text-main">
              {Number(data?.data.cash).toLocaleString()}원
            </span>
          </p>
          <hr className="border-1 my-2 border-grey"></hr>
          <p className="py-1 text-xs font-black">총 지분 가치</p>
          <p className="flex items-center gap-1">
            <span>
              <Icon.Money />
            </span>
            <span className="text-base font-bold text-main">
              {Number(data?.data.value).toLocaleString()}원
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
