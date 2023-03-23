import { MAX_AMOUNT } from '@/constants/cahoot';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeDispatch, useTypeSelector } from '@/store';
import { marketDecreaseMap, marketIncreaseMap, marketSetMap } from '@/store/modules/marketOrder';
import { Response } from '@/types/response';
import { UserInfoType } from '@/types/user';

import Icon from '../common/Icons';

interface OrderInputProps {
  tabType: 'sell' | 'buy';
  amountType: 'price' | 'quantity';
}

const labelMap = {
  price: '가격',
  quantity: '수량',
};

const OrderInput = ({ amountType, tabType }: OrderInputProps) => {
  const dispatch = useTypeDispatch();
  const amount = useTypeSelector((state) => state.marketOrder[tabType][amountType]);
  const token = useTypeSelector((state) => state.user.token);
  const price = useTypeSelector((state) => state.marketOrder[tabType].price);
  const { data } = useSuspendedQuery<Response<UserInfoType>>(
    [`user/info`],
    () =>
      api
        .get(`auth/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .json<Response<UserInfoType>>(),
    { enabled: !!token && amountType === 'quantity' }
  );

  const onDecrease = () => {
    if (amount <= 0) return;
    dispatch(marketDecreaseMap[tabType][amountType]());
  };
  const onIncrease = () => {
    if (amountType === 'quantity' && amount >= MAX_AMOUNT) return;
    dispatch(marketIncreaseMap[tabType][amountType]());
  };
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const amount = +e.target.value;
    if ((amountType === 'quantity' && amount > MAX_AMOUNT) || amount < 0) return;
    dispatch(marketSetMap[tabType][amountType](amount));
  };
  const onMaximumQuantityClick = () => {
    /** @todo 최대 판매 가능 수량 로직 */
    if (!data || !price || tabType === 'sell') return;
    const maxQuantity = Math.floor(data.data.cash / price);
    dispatch(marketSetMap[tabType][amountType](maxQuantity));
  };

  return (
    <>
      <label className="input-group">
        <span className="h-10 break-keep border border-r-0 border-grey bg-white pl-2 pr-0 text-sm text-grey-middle">
          {labelMap[amountType]}
        </span>
        <input
          type="number"
          value={amount}
          onChange={onChange}
          className="input-bordered input h-10 w-full !rounded-r-none border-l-0 border-grey text-right focus:outline-none"
        />
        <button
          className="btn-ghost btn h-10 min-h-fit border-l-0 border-grey p-1"
          onClick={onDecrease}
        >
          <Icon.Minus />
        </button>
        <button
          className="btn-ghost btn h-10 min-h-fit border-l-0 border-grey p-1"
          onClick={onIncrease}
        >
          <Icon.Plus />
        </button>
      </label>
      {amountType === 'quantity' && (
        <button
          className="btn-ghost btn h-6 min-h-0 border-grey text-xs text-grey-middle"
          onClick={onMaximumQuantityClick}
        >
          최대가능수량
        </button>
      )}
    </>
  );
};

export default OrderInput;
