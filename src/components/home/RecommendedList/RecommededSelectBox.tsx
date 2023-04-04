import SelectBox from '@/components/common/SelectBox';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import type { CountriesType } from '@/types/cahoot';
import type { Response } from '@/types/response';

interface RecommendedSelectBoxProps {
  currentItem: string;
  changeItem: (item: string) => void;
}

const RecommededSelectBox: React.FC<RecommendedSelectBoxProps> = ({ changeItem, currentItem }) => {
  const {
    data: {
      data: { result: countries },
    },
  } = useSuspendedQuery<Response<CountriesType>>(['MarketCountries'], () =>
    api.get('markets/countries').json()
  );
  return (
    <SelectBox items={countries} currentItem={currentItem} changeItem={changeItem} size="small" />
  );
};

export default RecommededSelectBox;
