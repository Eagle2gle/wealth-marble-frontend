import { useState } from 'react';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { fetchCahootDetail } from '@/libs/client/fetcher';
import { CahootDetailInfoType } from '@/types/response';

import BuyButton from './BuyButton';
import QuantityButtons from './QuantityButtons';
import QuantityInput from './QuantityInput';

import BottomSheet from '../common/BottomSheet';

const OrderMobile = () => {
  const [open, setOpen] = useState(false);
  const {
    data: { stockPrice },
  } = useSuspendedQuery<CahootDetailInfoType>(['cahootDetailData'], fetchCahootDetail);

  return (
    <div className="md:hidden">
      <BottomSheet open={open} onDismiss={() => setOpen(false)}>
        {open ? (
          <div className="w-full space-y-4 justify-self-end font-bold">
            <div className="flex justify-between text-black/50">
              주당 가격
              <span className="text-black">{stockPrice.toLocaleString()}원</span>
            </div>
            <div className="space-y-1">
              <QuantityInput />
              <div className="ml-auto w-1/2">
                <QuantityButtons />
              </div>
            </div>
            <div className="mx-auto h-12 w-5/6">
              <BuyButton />
            </div>
          </div>
        ) : (
          <button className="btn-primary btn w-5/6" onClick={() => setOpen(true)}>
            공모
          </button>
        )}
      </BottomSheet>
    </div>
  );
};

export default OrderMobile;
