import { Suspense } from 'react';

import Link from 'next/link';

import Icon from '@/components/common/Icons';
import StockTable from '@/components/mypage/StockTable';

const Stocks = () => {
  return (
    <>
      {/* only desktop */}
      <div className="my-2 hidden rounded-md border border-grey px-6 py-6 pt-4 md:block">
        <p className="text-lg font-bold text-main">자산 현황</p>
        <hr className="border-1 my-2 border-grey"></hr>
        <div className="flex flex-col gap-3">
          <Suspense fallback={<p>로딩...</p>}>
            <StockTable printAllData={false} />
          </Suspense>
        </div>
      </div>
      {/* only mobile */}
      <Link href={`/mypage/stocks`}>
        <div className="my-2 mx-12 block flex items-center justify-start gap-4 rounded-md border border-grey px-6 py-4 md:hidden">
          <div>
            <Icon.Wallet />
          </div>
          <div className="flex w-48 flex-col gap-0.5">
            <p className="text-sm font-bold">자산 현황</p>
            <p className="text-xs font-medium text-grey-middle">보유 자산 현황</p>
          </div>
          <div className="ml-auto text-grey-middle">
            <Icon.Right />
          </div>
        </div>
      </Link>
    </>
  );
};

export default Stocks;
