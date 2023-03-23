import { Suspense, useEffect } from 'react';

import Layout from '@/components/common/Layout';
import DetailBody from '@/components/market/DetailBody';
import DetailHeader from '@/components/market/DetailHeader';
import { useStomp } from '@/hooks/useStomp';
import { api } from '@/libs/client/api';
import wrapper from '@/store';
import { ErrorBoundary } from '@sentry/nextjs';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import type { InferGetServerSidePropsType } from 'next';

const MarketDetail = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { connect, disconnect } = useStomp({
    config: { brokerURL: process.env.NEXT_PUBLIC_WS_URL },
    onConnect: (frame) => console.log(frame),
  });

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <Layout>
      <div className="flex flex-col gap-6 md:mb-0">
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
          <Suspense fallback={<p>로딩...</p>}>
            <DetailBody id={id} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Layout>
  );
};

export default MarketDetail;

export const getServerSideProps = wrapper.getServerSideProps<{ id: number }>(
  (state) => async (context) => {
    const { id } = context.query;
    if (typeof id !== 'string' || !parseInt(id)) return { notFound: true };

    const token = state.getState().user.token;
    const queryClient = new QueryClient();
    const promises: Promise<unknown>[] = [
      queryClient.fetchQuery(['market/detail', id], () => api.get(`markets/${id}`).json()),
      queryClient.fetchQuery(['market/trade', id], () => api.get(`orders/${id}/list`).json()),
    ];
    if (token)
      promises.push(
        queryClient.fetchQuery([`user/info`], () =>
          api
            .get(`auth/users/me`, {
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
      props: {
        id: parseInt(id),
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
