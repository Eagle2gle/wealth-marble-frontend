import { Suspense, useRef } from 'react';

import Error from 'next/error';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import Interests from '@/components/common/Interests';
import Layout from '@/components/common/Layout';
import SearchList from '@/components/common/SearchList';
import PriceInfo from '@/components/market/PriceInfo';
import RecentTrade from '@/components/market/RecentTrade';
import { queries } from '@/queries';

import type { NextPageWithLayout } from '../_app';
import type { InferGetServerSidePropsType } from 'next';

import wrapper from '@/store';
import type { ServerError } from '@/types/response';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const Markets: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  error,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (error) return <Error statusCode={error.statusCode} title={error.title} />;

  return (
    <div className="space-y-4">
      <DeadlineBanner />
      <Interests type="market" scrollRef={scrollRef} />
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
      <SearchList scrollRef={scrollRef} type="market" />
    </div>
  );
};

Markets.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = wrapper.getServerSideProps<{ error: ServerError }>(
  (state) => async () => {
    const queryClient = new QueryClient();
    const { token } = state.getState().user;
    const promises: Promise<unknown>[] = [
      queryClient.fetchQuery(queries.cahoots.deadline._ctx.mini),
      queryClient.fetchQuery(queries.markets.price({ type: 'PRICE', order: 'up' })),
      queryClient.fetchInfiniteQuery(queries.markets.list('')),
    ];
    if (token) promises.push(queryClient.fetchQuery(queries.interests.all('market', token)));
    try {
      await Promise.all(promises);
    } catch (e) {
      console.error(e);
      const error = {
        statusCode: 500,
        title: 'Internal Server Error',
      };
      return {
        props: {
          error,
        },
      };
    }
    return {
      props: { error: false, dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) },
    };
  }
);

export default Markets;
