import { useEffect } from 'react';

import Error from 'next/error';

import Layout from '@/components/common/Layout';
import DetailBody from '@/components/market/DetailBody';
import DetailHeader from '@/components/market/DetailHeader';
import { useStomp } from '@/hooks/useStomp';
import { api } from '@/libs/client/api';
import wrapper from '@/store';
import type { ServerError } from '@/types/response';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import type { InferGetServerSidePropsType, NextPage } from 'next';

const MarketDetail: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  error,
}) => {
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

  if (error) return <Error statusCode={error.statusCode} title={error.title} />;

  return (
    <Layout>
      <div className="flex flex-col gap-6 md:mb-0">
        <DetailHeader />
        <DetailBody />
      </div>
    </Layout>
  );
};

export default MarketDetail;

export const getServerSideProps = wrapper.getServerSideProps<{ error: ServerError }>(
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
      console.error(e);
      const error = {
        statusCode: 500,
        title: 'Internal Server Error',
      };
      return {
        props: { error },
      };
    }

    return {
      props: {
        error: false,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
