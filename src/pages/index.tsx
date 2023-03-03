import { Suspense } from 'react';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import Layout from '@/components/common/Layout';
import RecentUploadCarousel from '@/components/RecentUploadCarousel';
import RecommendedList from '@/components/RecommendedList';
import Thumbnail from '@/components/Thumbnail';
import TopFiveList from '@/components/TopFiveList';
import wrapper from '@/store';
import { ErrorBoundary } from '@sentry/nextjs';

export default function Home() {
  return (
    <Layout>
      <div className="space-y-6 ">
        <ErrorBoundary
          fallback={({ resetError, error }) => (
            <>
              <p>{error.message}</p>
              <button onClick={() => resetError()}>reset</button>
            </>
          )}
        >
          <Thumbnail />
          <Suspense fallback={<p>로딩...</p>}>
            <DeadlineBanner />
          </Suspense>
          <Suspense fallback={<p>로딩...</p>}>
            <RecentUploadCarousel />
          </Suspense>
          <div className="flex flex-col md:flex-row md:space-x-12">
            <Suspense fallback={<p>로딩...</p>}>
              <RecommendedList />
            </Suspense>
            <Suspense fallback={<p>로딩...</p>}>
              <TopFiveList />
            </Suspense>
          </div>
        </ErrorBoundary>
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  return {
    props: {},
  };
});
