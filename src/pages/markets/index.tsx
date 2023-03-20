import { Suspense, useRef } from 'react';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import Interests from '@/components/common/Interests';
import Layout from '@/components/common/Layout';
import List from '@/components/market/List';
import PriceInfo from '@/components/market/PriceInfo';
import RecentTrade from '@/components/market/RecentTrade';
import { api } from '@/libs/client/api';
import wrapper from '@/store';
import { ErrorBoundary } from '@sentry/nextjs';
import { dehydrate, QueryClient } from '@tanstack/react-query';

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

export const getServerSideProps = wrapper.getServerSideProps((state) => async () => {
  const queryClient = new QueryClient();
  const { token } = state.getState().user;
  const promises: Promise<unknown>[] = [
    queryClient.fetchQuery(['market/price', 'PRICE', 'up'], () =>
      api.get(`markets/rank?type=PRICE&up=TRUE`).json()
    ),
    queryClient.fetchInfiniteQuery(['market/list', ''], ({ pageParam = 0 }) =>
      api.get(`markets?page=${pageParam}&keyword=&size=10`).json()
    ),
  ];
  if (token)
    promises.push(
      queryClient.prefetchQuery([`markets/interests`], () =>
        api
          .get(`auth/interests/me?page=0&size=10type=market`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .json()
      )
    );
  try {
    await Promise.all(promises);
  } catch (e) {
    return {
      notFound: true,
    };
  }
  return {
    props: { dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) },
  };
});

export default Markets;
