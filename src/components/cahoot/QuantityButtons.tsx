import { MAX_AMOUNT } from '@/constants/cahoot';
import { useTypeDispatch, useTypeSelector } from '@/store';
import { addByNumber } from '@/store/modules/cahootOrder';

const AMOUNTS = [5, 10, 50, 100] as const;

const QuantityButtons = () => {
  const dispatch = useTypeDispatch();
  const quantity = useTypeSelector(({ cahootOrder }) => cahootOrder.quantity);

  const onAddQuantityClick = (amount: number) => () => {
    if (quantity + amount <= MAX_AMOUNT && quantity + amount >= 0) dispatch(addByNumber(amount));
  };

  return (
    <div className="btn-group flex text-grey-middle">
      {AMOUNTS.map((amount, index) => (
        <button
          key={index}
          className="btn btn-ghost h-8 min-h-fit flex-1 border-r-0 border-grey p-0 text-xs font-normal last:border-r"
          onClick={onAddQuantityClick(amount)}
        >
          {amount}주
        </button>
      ))}
    </div>
  );
};

export default QuantityButtons;
