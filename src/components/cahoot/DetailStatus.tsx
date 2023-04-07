import { useRouter } from 'next/router';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { useTypeSelector } from '@/store';

const DetailStatus = () => {
  const {
    query: { id },
  } = useRouter();
  const userId = useTypeSelector((state) => state.user.id) ?? '';
  const { queryFn: detailQueryFn, queryKey: detailQueryKey } = queries.cahoots.detail(
    String(id),
    userId
  );
  const { queryFn: historyQueryFn, queryKey: historyQueryKey } = queries.cahoots.history(
    String(id)
  );
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery(historyQueryKey, historyQueryFn);
  const {
    data: {
      data: { stockPrice },
    },
  } = useSuspendedQuery(detailQueryKey, detailQueryFn);
  return (
    <table className="border-separate border-spacing-0 border-y border-grey md:rounded-lg md:border-x">
      <thead className="h-12">
        <tr>
          <th className="border-b border-grey">거래시간</th>
          <th className="border-b border-grey">가격</th>
          <th className="border-b border-grey">수량(주)</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {result.map(({ time, stocks }, index) => (
          <tr key={index}>
            <td>
              {Intl.DateTimeFormat('ko-KR', {
                hour: '2-digit',
                day: '2-digit',
                hourCycle: 'h23',
                year: '2-digit',
                month: '2-digit',
                second: '2-digit',
                minute: '2-digit',
              }).format(new Date(time))}
            </td>
            <td>{stockPrice * stocks}</td>
            <td>{stocks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailStatus;
