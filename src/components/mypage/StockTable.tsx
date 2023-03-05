import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeSelector } from '@/store';
import { Response } from '@/types/response';
import { StocksType } from '@/types/user';

interface PropsType {
  printAllData: boolean;
  border?: boolean;
}

// 자산 현황 테이블
const StockTable = ({ printAllData, border }: PropsType) => {
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

  if (!data || data?.data.result.length === 0) {
    return <div className="ml-auto mr-auto w-48 py-8 font-bold">아직 보유한 자산이 없어요!</div>;
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
              <th className="bg-white px-5">수익률</th>
              <th className="bg-white px-5">1주당 가격</th>
              <th className="bg-white px-5">평단가</th>
              <th className="bg-white px-5">수량(주)</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.result.map((item, idx) => {
              if (printAllData || (!printAllData && idx < 3)) {
                return (
                  <tr key={idx}>
                    <td className="w-full truncate">{item.title}</td>
                    <td>{item.profitRate}</td>
                    <td>{item.currentPrice.toLocaleString()}</td>
                    <td>{item.pricePerStock.toLocaleString()}</td>
                    <td>{item.totalAmount}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      {!printAllData && data && data?.data.result.length > 3 && (
        <Link href="/mypage/stocks" className="font-medium">
          <button className="btn-primary btn-block btn-sm btn">More</button>
        </Link>
      )}
    </>
  );
};

export default StockTable;
