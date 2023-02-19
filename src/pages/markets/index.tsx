import { Suspense, useRef } from 'react';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import Layout from '@/components/common/Layout';
import Interests from '@/components/market/Interests';
import List from '@/components/market/List';
import RecentTrade from '@/components/market/RecentTrade';
import { ErrorBoundary } from '@sentry/nextjs';

import type { GetServerSideProps } from 'next';

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
            <Interests scrollRef={scrollRef} />
          </Suspense>
          <div className="flex flex-col-reverse gap-4 md:flex-row">
            <div className="md:w-1/2">
              <label className="font-bold">가격 정보</label>
            </div>
            <div className="md:w-1/2">
              <Suspense fallback={<p>로딩...</p>}>
                <RecentTrade />
              </Suspense>
            </div>
          </div>
          <div ref={scrollRef}></div>
          <Suspense fallback={<p>로딩...</p>}>
            <List />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Markets;
