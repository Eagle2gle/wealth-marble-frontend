import Image from 'next/image';

import Icon from '@/components/common/Icons';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeSelector } from '@/store';
import { Response } from '@/types/response';
import { UserInfoType } from '@/types/user';

export default function Management() {
  const token = useTypeSelector((state) => state.user.token);
  const { data } = useSuspendedQuery<Response<UserInfoType>>(
    [`user/info`],
    () =>
      api
        .get(`auth/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .json<Response<UserInfoType>>(),
    { enabled: !!token }
  );

  console.log(data);

  return (
    <div>
      <section className="flex items-center gap-2.5 px-10 py-4 text-center">
        <div className="w-1/12">
          {/* TODO: 뒤로가기 */}
          <Icon.Left />
        </div>
        <h1 className="w-11/12 pr-12 text-xl font-bold">개인정보 관리</h1>
      </section>
      <hr className="border-1 mb-2 border-grey" />
      <main className="flex items-center justify-center p-4">
        <div className="flex w-96 flex-col">
          <h2 className="items-start text-base font-bold">기본 정보 관리</h2>
          <div className="avatar my-4 w-32 self-center">
            <div className="w-32"></div>
            {/* {images[0] && ( */}
            <Image
              src="/images/thumbnail.jpeg"
              alt=""
              className="rounded-full"
              fill
              sizes="128px"
            />
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
                className="w-1/3 truncate rounded-lg bg-black/30 py-3 px-4 text-center text-sm text-white"
              >
                {data?.data.providerType} 연동
              </span>
            </p>
          </div>
          <h2 className="mt-4 text-base font-bold">권한 관리</h2>
          {/* 권한 */}
          <div>
            <label className="label">
              <span className="label-text text-xs">권한</span>
            </label>
            <p className="rounded-lg border border-grey bg-black/5 py-2 px-4 text-dark-grey">
              {data?.data.role}
            </p>
          </div>
          <button className="btn-primary btn-block btn-sm btn my-6 ">업데이트 하기</button>
        </div>
      </main>
    </div>
  );
}
