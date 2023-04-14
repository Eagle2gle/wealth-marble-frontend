import { Suspense, useState } from 'react';

import { useRouter } from 'next/router';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { useTypeSelector } from '@/store';
import { ErrorBoundary } from '@sentry/nextjs';

import BuyButton from './BuyButton';
import QuantityButtons from './QuantityButtons';
import QuantityInput from './QuantityInput';

import BottomSheet from '../common/BottomSheet';
import ErrorFallback from '../common/ErrorFallback';

const OrderMobileWrapper = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense>
        <OrderMobile />
      </Suspense>
    </ErrorBoundary>
  );
};

const OrderMobile = () => {
  const [open, setOpen] = useState(false);
  const {
    query: { id },
  } = useRouter();
  const userId = useTypeSelector((state) => state.user.id) ?? '';
  const { queryFn, queryKey } = queries.cahoots.detail(String(id), userId);
  const {
    data: {
      data: { stockPrice, status },
    },
  } = useSuspendedQuery(queryKey, queryFn);

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

export default OrderMobileWrapper;
