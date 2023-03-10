import { formatTimeWithoutSecond } from '@/utils/date';

import Icon from '../common/Icons';

const PriceInfoUpdate = () => {
  return (
    <div className="flex gap-1 text-xs text-black/50 md:-mb-2">
      <Icon.Clock />
      {formatTimeWithoutSecond(new Date().toISOString())} 업데이트
    </div>
  );
};

export default PriceInfoUpdate;
