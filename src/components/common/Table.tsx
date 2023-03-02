interface PropsType {
  // table type
  printAllData: boolean;
  border?: boolean;
}

const Table = ({ printAllData, border }: PropsType) => {
  // TODO: 데이터 0개일때 처리
  return (
    <>
      <div className={`${border ? 'rounded border border-grey' : ''} overflow-x-auto text-xs`}>
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
            <tr>
              <td className="w-full truncate">일본 유명 호스트 다나카와 함께</td>
              <td>23-01-06</td>
              <td>{Number(28000).toLocaleString()}</td>
              <td>2</td>
              <td>
                <div className="badge w-full border-transparent bg-main text-white">진행 중</div>
              </td>
            </tr>
            <tr>
              <td className="w-full truncate">일본 유명 호스트 다나카와 함께</td>
              <td>23-01-06</td>
              <td>{Number(28000).toLocaleString()}</td>
              <td>2</td>
              <td>
                <div className="badge w-full border-transparent bg-red text-white">취소</div>
              </td>
            </tr>
            <tr>
              <td className="w-full truncate">일본 유명 호스트 다나카와 함께</td>
              <td>23-01-06</td>
              <td>{Number(28000).toLocaleString()}</td>
              <td>2</td>
              <td>
                <div className="badge w-full border-transparent bg-blue text-white">완료</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {!printAllData && <button className="btn-primary btn-block btn-sm btn">More</button>}
    </>
  );
};

export default Table;
