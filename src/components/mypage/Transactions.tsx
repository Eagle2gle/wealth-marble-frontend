import Link from 'next/link';

import Icon from '@/components/common/Icons';
import TransactionType from '@/components/mypage/TransactionTable';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { Response } from '@/types/response';
import { TransactionsType } from '@/types/user';

interface PropsType {
  token: string | undefined;
}

const Transactions = ({ token }: PropsType) => {
  const { data } = useSuspendedQuery<Response<TransactionsType>>(
    [`user/transactions`],
    () =>
      api
        .get(`auth/transactions/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .json<Response<TransactionsType>>(),
    { enabled: !!token }
  );

  return (
    <>
      {/* only desktop */}
      <div className="my-2 hidden rounded-md border border-grey px-6 py-6 pt-4 md:block">
        <p className="text-lg font-bold text-main">거래 현황</p>
        <hr className="border-1 my-2 border-grey"></hr>
        <div className="flex flex-col gap-3">
          <TransactionType printAllData={false} data={data?.data.result} />
        </div>
      </div>
      {/* only mobile */}
      <Link href={`/mypage/transactions`}>
        <div className="my-2 mx-12 block flex items-center justify-start gap-4 rounded-md border border-grey px-6 py-4 md:hidden">
          <div>
            <Icon.Market />
          </div>
          <div className="flex w-48 flex-col gap-0.5">
            <p className="text-sm font-bold">거래 현황</p>
            <p className="text-xs font-medium text-grey-middle">마켓 거래 현황</p>
          </div>
          <div className="ml-auto text-grey-middle">
            <Icon.Right />
          </div>
        </div>
      </Link>
    </>
  );
};

export default Transactions;
