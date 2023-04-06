import SelectBox from '@/components/common/SelectBox';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';

interface RecommendedSelectBoxProps {
  currentItem: string;
  changeItem: (item: string) => void;
}

const RecommededSelectBox: React.FC<RecommendedSelectBoxProps> = ({ changeItem, currentItem }) => {
  const { queryFn, queryKey } = queries.markets.countries;
  const {
    data: {
      data: { result: countries },
    },
  } = useSuspendedQuery(queryKey, queryFn);
  return (
    <SelectBox items={countries} currentItem={currentItem} changeItem={changeItem} size="small" />
  );
};

export default RecommededSelectBox;
