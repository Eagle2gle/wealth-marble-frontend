import BuyButton from './BuyButton';
import QuantityButtons from './QuantityButtons';
import QuantityInput from './QuantityInput';

const Order = () => {
  return (
    <div className="hidden justify-between gap-4 md:flex">
      <div className="form-control flex-[0.55] gap-1">
        <QuantityInput />
        <QuantityButtons />
      </div>
      <div className="flex-[0.45]">
        <BuyButton />
      </div>
    </div>
  );
};

export default Order;
