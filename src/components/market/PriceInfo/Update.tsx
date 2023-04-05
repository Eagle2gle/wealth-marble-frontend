import Icon from '@/components/common/Icons';
import { formatTimeWithoutSecond } from '@/utils/date';

const PriceInfoUpdate = () => {
  return (
    <div className="flex gap-1 text-xs text-black/50 md:-mb-2">
      <Icon.Clock />
      {formatTimeWithoutSecond(new Date().toISOString())} 업데이트
    </div>
  );
};

export default PriceInfoUpdate;
