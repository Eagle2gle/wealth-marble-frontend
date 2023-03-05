import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeSelector } from '@/store';
import { Response } from '@/types/response';
import { TransactionsType } from '@/types/user';

interface PropsType {
  printAllData: boolean;
  border?: boolean;
}

// 거래 현황 테이블
const TransactionTable = ({ printAllData, border }: PropsType) => {
  const token = useTypeSelector((state) => state.user.token);
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

  if (!data || data?.data.result.length === 0) {
    return <div className="ml-auto mr-auto w-48 py-8 font-bold">아직 참여한 거래가 없어요!</div>;
  }

  return (
    <>
      <div
        className={`${
          border ? 'rounded border border-grey' : ''
        } w-full max-w-4xl overflow-x-auto text-xs`}
      >
        <table className={`table-compact table w-full text-center`}>
          <thead className={`${border ? 'border-b border-grey' : ''}`}>
            <tr className="text-bold text-dark-grey">
              <th className="bg-white px-5">공모명</th>
              <th className="bg-white px-5">거래 시간</th>
              <th className="bg-white px-5">가격</th>
              <th className="bg-white px-5">수량(주)</th>
              <th className="bg-white px-5">유형</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.result.map((item, idx) => {
              if (printAllData || (!printAllData && idx < 3)) {
                return (
                  <tr key={idx}>
                    <td className="w-full truncate">{item.vacationName}</td>
                    <td>{item.transactionTime}</td>
                    <td>{item.price.toLocaleString()}</td>
                    <td>{item.amount.toLocaleString()}</td>
                    <td>
                      <div className="badge w-full border-transparent bg-main text-white">
                        {item.transactionType}
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      {!printAllData && data && data?.data.result.length > 3 && (
        <Link href="/mypage/transactions" className="font-medium">
          <button className="btn-primary btn-block btn-sm btn">More</button>
        </Link>
      )}
    </>
  );
};

export default TransactionTable;
