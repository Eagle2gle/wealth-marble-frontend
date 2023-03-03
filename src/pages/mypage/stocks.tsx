import Icon from '@/components/common/Icons';
import StockTable from '@/components/mypage/StockTable';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeSelector } from '@/store';
import { Response } from '@/types/response';
import { StocksType } from '@/types/user';

export default function Cahoots() {
  const token = useTypeSelector((state) => state.user.token);
  const { data } = useSuspendedQuery<Response<StocksType>>(
    [`user/stock`],
    () =>
      api
        .get(`auth/stocks/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .json<Response<StocksType>>(),
    { enabled: !!token }
  );

  return (
    <div>
      <section className="flex w-full items-center gap-2.5 px-10 py-4 text-center">
        <div className="w-1/12">
          {/* TODO: 뒤로가기 */}
          <Icon.Left />
        </div>
        <h1 className="w-11/12 pr-12 text-xl font-bold">자산 현황</h1>
      </section>
      <hr className="border-1 mb-2 border-grey" />
      <main className="flex justify-center p-4">
      <StockTable printAllData={true} border={true} data={data?.data.result} />
      </main>
    </div>
  );
}
