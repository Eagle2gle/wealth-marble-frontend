import { Suspense, useRef } from 'react';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import DeadlineCarousel from '@/components/cahoot/DeadlineCarousel';
import List from '@/components/cahoot/List';
import Recap from '@/components/cahoot/Recap';
import Interests from '@/components/common/Interests';
import Layout from '@/components/common/Layout';
import { api } from '@/libs/client/api';
import wrapper from '@/store';
import { ErrorBoundary } from '@sentry/nextjs';
import { dehydrate, QueryClient } from '@tanstack/react-query';

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
          <List scrollRef={scrollRef} />
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default Cahoots;

export const getServerSideProps = wrapper.getServerSideProps((state) => async () => {
  const queryClient = new QueryClient();
  const { token } = state.getState().user;
  if (token) {
    await queryClient.prefetchQuery([`cahoots/interests`], () =>
      api
        .get(`auth/interests/me?page=0&size=10`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .json()
    );
  }
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
});
