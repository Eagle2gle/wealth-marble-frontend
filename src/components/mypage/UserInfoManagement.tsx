import Image from 'next/image';

import { PROVIDER_TYPE, ROLE, RANK } from '@/constants/mypage';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { useTypeSelector } from '@/store';

const UserInfoManagement = () => {
  const token = useTypeSelector((state) => state.user.token) ?? '';
  const { queryFn, queryKey } = queries.users.info(token);
  const { data } = useSuspendedQuery(queryKey, queryFn, { enabled: !!token });

  return (
    <main className="flex items-center justify-center p-4">
      <div className="flex w-96 flex-col">
        <h2 className="items-start text-base font-bold">기본 정보 관리</h2>
        <div className="avatar my-4 w-32 self-center">
          <div className="w-32"></div>
          {/* {images[0] && ( */}
          <Image src="/images/thumbnail.jpeg" alt="" className="rounded-full" fill sizes="128px" />
          {/* )} */}
        </div>
        {/* 이름 */}
        <div>
          <label className="label">
            <span className="label-text text-xs">이름</span>
          </label>
          <p className="rounded-lg border border-black/10 bg-black/5 py-2 px-4 text-dark-grey">
            {data?.data.username}
          </p>
        </div>
        {/* 가입 이메일 */}
        <div>
          <label className="label">
            <span className="label-text text-xs">가입 이메일</span>
          </label>
          <p className="flex gap-2">
            <span
              title={data?.data.email}
              className="w-2/3 truncate rounded-lg border border-black/10 bg-black/5 py-2 px-4 text-dark-grey"
            >
              {data?.data.email}
            </span>
            <span
              title={data?.data.providerType}
              className="w-1/3 truncate rounded-lg bg-black/30 py-3 px-4 text-center text-white"
            >
              {data
                ? PROVIDER_TYPE[data?.data.providerType as keyof typeof PROVIDER_TYPE].TEXT
                : '소셜'}{' '}
              연동
            </span>
          </p>
        </div>
        {/* 등급 */}
        <div>
          <label className="label">
            <span className="label-text text-xs">등급</span>
          </label>
          <p className="rounded-lg border border-black/10 bg-black/5 py-2 px-4 text-dark-grey">
            {data ? RANK[data?.data.rank as keyof typeof RANK].TEXT : '남작'}
          </p>
        </div>
        <h2 className="mt-4 text-base font-bold">권한 관리</h2>
        {/* 권한 */}
        <div>
          <label className="label">
            <span className="label-text text-xs">권한</span>
          </label>
          <p className="rounded-lg border border-grey bg-black/5 py-2 px-4 text-dark-grey">
            {data ? ROLE[data?.data.role as keyof typeof ROLE].TEXT : ''}
          </p>
        </div>
        <button className="btn-primary btn-block btn-md btn my-6 ">업데이트 하기</button>
      </div>
    </main>
  );
};

export default UserInfoManagement;
