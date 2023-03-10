import { Suspense, useRef } from 'react';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import Interests from '@/components/common/Interests';
import Layout from '@/components/common/Layout';
import List from '@/components/market/List';
import PriceInfo from '@/components/market/PriceInfo';
import RecentTrade from '@/components/market/RecentTrade';
import wrapper from '@/store';
import { ErrorBoundary } from '@sentry/nextjs';

const Markets = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <div className="space-y-4">
        <ErrorBoundary
          fallback={({ resetError, error }) => (
            <>
              <p>{error.message}</p>
              <button onClick={() => resetError()}>reset</button>
            </>
          )}
        >
          <Suspense fallback={<p>로딩...</p>}>
            <DeadlineBanner />
          </Suspense>
          <Suspense fallback={<p>로딩...</p>}>
            <Interests type="market" scrollRef={scrollRef} />
          </Suspense>
          <div className="flex flex-col-reverse md:flex-row md:justify-center">
            <div className="md:w-1/2 md:pr-2">
              <PriceInfo />
            </div>
            <div className="mb-4 md:mb-0 md:w-1/2 md:pl-2">
              <Suspense fallback={<p>로딩...</p>}>
                <RecentTrade />
              </Suspense>
            </div>
          </div>
          <div ref={scrollRef}></div>
          <List scrollRef={scrollRef} />
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  return {
    props: {},
  };
});

export default Markets;
