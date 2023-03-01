import { Suspense, useRef } from 'react';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import DeadlineCarousel from '@/components/cahoot/DeadlineCarousel';
import List from '@/components/cahoot/List';
import Recap from '@/components/cahoot/Recap';
import Layout from '@/components/common/Layout';
import Interests from '@/components/market/Interests';
import { ErrorBoundary } from '@sentry/nextjs';

import type { GetServerSideProps } from 'next';

const Cahoots = () => {
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
            <Interests type="cahoot" scrollRef={scrollRef} />
          </Suspense>
          <Suspense fallback={<p>로딩...</p>}>
            <DeadlineCarousel />
          </Suspense>
          <Suspense fallback={<p>로딩...</p>}>
            <Recap />
          </Suspense>
          <div ref={scrollRef}></div>
          <List />
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default Cahoots;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
