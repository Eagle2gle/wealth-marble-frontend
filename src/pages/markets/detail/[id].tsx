import { useEffect } from 'react';

import Error from 'next/error';

import Layout from '@/components/common/Layout';
import DetailBody from '@/components/market/DetailBody';
import DetailHeader from '@/components/market/DetailHeader';
import { useStomp } from '@/hooks/useStomp';
import { queries } from '@/queries';
import wrapper from '@/store';
import type { ServerError } from '@/types/response';

import type { InferGetServerSidePropsType, NextPage } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';

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
      queryClient.fetchQuery(queries.markets.detail(id)),
      queryClient.fetchQuery(queries.markets.trade(id)),
    ];
    if (token) promises.push(queryClient.fetchQuery(queries.users.info(token)));
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
