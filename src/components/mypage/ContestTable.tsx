import { ContestType } from '@/types/user';

interface PropsType {
  printAllData: boolean;
  data: ContestType[] | undefined;
  border?: boolean;
}

// 공모 내역 테이블
const ContestTable = ({ printAllData, data, border }: PropsType) => {
  if (!data || data.length === 0) {
    return <div className="ml-auto mr-auto w-48 py-8 font-bold">아직 참여한 공모가 없어요!</div>;
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
              <th className="bg-white px-5">진행도</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              if (printAllData || (!printAllData && idx < 3)) {
                return (
                  <tr key={idx}>
                    <td className="w-full truncate">{item.title}</td>
                    <td>{item.createdAt.split('T')[0].substring(2)}</td>
                    <td>{item.price.toLocaleString()}</td>
                    <td>{item.amount.toLocaleString()}</td>
                    <td>
                      <div className="badge w-full border-transparent bg-main text-white">
                        {item.status}
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      {!printAllData && data.length > 3 && (
        <button className="btn-primary btn-block btn-sm btn">More</button>
      )}
    </>
  );
};

export default ContestTable;
