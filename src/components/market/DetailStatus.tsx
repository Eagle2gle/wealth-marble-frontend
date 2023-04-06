import { useState } from 'react';

import { useRouter } from 'next/router';

import ButtonGroup from '@/components/common/ButtonGroup';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { getPrevDate, formatDateWithDash } from '@/utils/date';

// 시세 탭
const CriteriaList = ['3개월', '6개월', '1년', '3년', '전체'] as const;

const DetailStatus = () => {
  const {
    query: { id },
  } = useRouter();
  const [criteria, setCriteria] = useState('3개월');
  const [startDate, setStartDate] = useState(formatDateWithDash(getPrevDate(criteria)));
  const [endDate, setEndDate] = useState(formatDateWithDash(new Date()));

  const changeCriteria = (criteria: string) => {
    setStartDate(formatDateWithDash(getPrevDate(criteria)));
    setCriteria(criteria);
  };

  const { queryFn, queryKey } = queries.markets
    .transaction(String(id))
    ._ctx.history(startDate, endDate);
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery(queryKey, queryFn);

  return (
    <>
      <div className="ml-auto">
        <ButtonGroup
          items={CriteriaList}
          currentItem={criteria}
          changeItem={changeCriteria}
          buttonSize="small"
        />
      </div>
      <table className="border-separate border-spacing-0 border-y border-grey md:rounded-lg md:border-x">
        <thead className="h-12">
          <tr>
            <th className="border-b border-grey">거래시간</th>
            <th className="border-b border-grey">가격</th>
            <th className="border-b border-grey">수량(주)</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {result.map(({ date, price, amount }, index) => (
            <tr key={index}>
              <td>{formatDateWithDash(new Date(date)).substring(2)}</td>
              <td>{price}</td>
              <td>{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DetailStatus;
