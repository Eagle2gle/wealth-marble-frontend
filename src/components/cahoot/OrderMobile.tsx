import { useState } from 'react';

import { useRouter } from 'next/router';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { fetcher } from '@/libs/client/fetcher';
import type { CahootDetailType } from '@/types/cahoot';
import type { Response } from '@/types/response';

import BuyButton from './BuyButton';
import QuantityButtons from './QuantityButtons';
import QuantityInput from './QuantityInput';

import BottomSheet from '../common/BottomSheet';

const OrderMobile = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    data: {
      data: { stockPrice, status },
    },
  } = useSuspendedQuery<Response<CahootDetailType>>(
    ['cahoot/detail', router.query.id],
    fetcher(`${process.env.NEXT_PUBLIC_HOST}/api/cahoots/${router.query.id}?info=detail`)
  );

  return (
    <div className="md:hidden">
      {status === 'CAHOOTS_ONGOING' && (
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
      )}
    </div>
  );
};

export default OrderMobile;
