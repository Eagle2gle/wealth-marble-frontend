import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { fetchCahootDetail, fetchCahootHistory } from '@/libs/client/fetcher';
import { CahootDetailInfoType } from '@/types/response';

interface CahootHistoryType {
  result: {
    time: string;
    stocks: number;
  }[];
}

const DetailStatus = () => {
  const {
    data: { result },
  } = useSuspendedQuery<CahootHistoryType>(['cahootHistoryData'], fetchCahootHistory);
  const {
    data: { stockPrice },
  } = useSuspendedQuery<CahootDetailInfoType>(['cahootDetailData'], fetchCahootDetail);
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
