import { Suspense } from 'react';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import Layout from '@/components/common/Layout';
import Interests from '@/components/market/Interests';
import { ErrorBoundary } from '@sentry/nextjs';

const Markets = () => {
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
            <Interests />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default Markets;
