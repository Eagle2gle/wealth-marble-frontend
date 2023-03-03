import Icon from '@/components/common/Icons';
import ContestTable from '@/components/mypage/ContestTable';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeSelector } from '@/store';
import { Response } from '@/types/response';
import { ParticipatedContestType } from '@/types/user';

export default function Cahoots() {
  const token = useTypeSelector((state) => state.user.token);
  const { data } = useSuspendedQuery<Response<ParticipatedContestType>>(
    [`user/contest`],
    () =>
      api
        .get(`auth/contestParticipation/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .json<Response<ParticipatedContestType>>(),
    { enabled: !!token }
  );

  return (
    <div>
      <section className="flex w-full items-center gap-2.5 px-10 py-4 text-center">
        <div className="w-1/12">
          {/* TODO: 뒤로가기 */}
          <Icon.Left />
        </div>
        <h1 className="w-11/12 pr-12 text-xl font-bold">공모 내역</h1>
      </section>
      <hr className="border-1 mb-2 border-grey" />
      <main className="flex justify-center p-4">
        <ContestTable printAllData={true} border={true} data={data?.data.result} />
      </main>
    </div>
  );
}
