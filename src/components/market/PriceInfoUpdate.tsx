import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { Response } from '@/types/response';
import { formatTimeWithoutSecond } from '@/utils/date';

import Icon from '../common/Icons';

type MockType = {
  updatedAt: string;
  result: {
    id: number;
    title: string;
    price: number;
    volume: number;
    images: string[];
    diff: number;
  }[];
};

interface PriceInfoItemProps {
  type: 'price' | 'percent';
  order: 'asc' | 'desc';
}

const PriceInfoUpdate = ({ order, type }: PriceInfoItemProps) => {
  const {
    data: {
      data: { updatedAt },
    },
  } = useSuspendedQuery<Response<MockType>>(['market/price', type, order], () =>
    fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/mock/markets/price?type=${type}&order=${order}`
    ).then((res) => res.json())
  );
  return (
    <div className="flex gap-1 text-xs text-black/50 md:-mb-2">
      <Icon.Clock />
      {formatTimeWithoutSecond(updatedAt)} 업데이트
    </div>
  );
};

export default PriceInfoUpdate;
