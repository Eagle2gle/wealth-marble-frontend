import { MAX_AMOUNT } from '@/constants/cahoot';
import { useTypeDispatch, useTypeSelector } from '@/store';
import { decrease, increase, setByNumber } from '@/store/modules/cahootOrder';

import Icon from '../common/Icons';

const QuantityInput = () => {
  const dispatch = useTypeDispatch();
  const quantity = useTypeSelector(({ cahootOrder }) => cahootOrder.quantity);

  const onDecrease = () => {
    if (quantity > 0) dispatch(decrease());
  };
  const onIncrease = () => {
    if (quantity < MAX_AMOUNT) dispatch(increase());
  };
  const onChnage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const amount = +e.target.value;
    if (amount > MAX_AMOUNT || amount < 0) return;
    dispatch(setByNumber(amount));
  };

  return (
    <label className="input-group">
      <span className="h-10 break-keep border border-r-0 border-grey bg-white pl-2 pr-0 text-sm text-grey-middle">
        수량
      </span>
      <input
        type="number"
        value={quantity}
        onChange={onChnage}
        className="input-bordered input h-10 w-full !rounded-r-none border-l-0 border-grey text-right focus:outline-none"
      />
      <button
        className="btn btn-ghost h-10 min-h-fit border-l-0 border-grey p-1"
        onClick={onDecrease}
      >
        <Icon.Minus />
      </button>
      <button
        className="btn btn-ghost h-10 min-h-fit border-l-0 border-grey p-1"
        onClick={onIncrease}
      >
        <Icon.Plus />
      </button>
    </label>
  );
};

export default QuantityInput;
