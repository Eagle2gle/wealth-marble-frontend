import { Suspense } from 'react';

import Layout from '@/components/common/Layout';
import DetailHeader from '@/components/market/DetailHeader';
import { api } from '@/libs/client/api';
import wrapper from '@/store';
import { ErrorBoundary } from '@sentry/nextjs';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const MarketDetail = () => {
  return (
    <Layout>
      <div className="mb-60 flex flex-col gap-6 md:mb-0">
        <ErrorBoundary
          fallback={({ resetError, error }) => (
            <>
              <p>{error.message}</p>
              <button onClick={() => resetError()}>reset</button>
            </>
          )}
        >
          <Suspense fallback={<p>로딩...</p>}>
            <DetailHeader />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default MarketDetail;

export const getServerSideProps = wrapper.getServerSideProps(() => async (context) => {
  const { id } = context.query;
  if (typeof id !== 'string' || !parseInt(id)) return { notFound: true };

  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery(['market/detail', id], () => api.get(`markets/${id}`).json());
  } catch (e) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: parseInt(id),
      dehydratedState: dehydrate(queryClient),
    },
  };
});
