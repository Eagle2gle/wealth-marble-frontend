import { Suspense } from 'react';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import DeadlineCarousel from '@/components/cahoot/DeadlineCarousel';
import List from '@/components/cahoot/List';
import Recap from '@/components/cahoot/Recap';
import Layout from '@/components/common/Layout';
import { ErrorBoundary } from '@sentry/nextjs';

const Cahoots = () => {
  return (
    <Layout>
      <Suspense fallback={<p>로딩...</p>}>
        <ErrorBoundary
          fallback={({ resetError, error }) => (
            <>
              <p>{error.message}</p>
              <button onClick={() => resetError()}>reset</button>
            </>
          )}
        >
          <div className="space-y-4">
            <DeadlineBanner />
            <DeadlineCarousel />
            <Recap />
            <List />
          </div>
        </ErrorBoundary>
      </Suspense>
    </Layout>
  );
};

export default Cahoots;
