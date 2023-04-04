import { Suspense, useRef } from 'react';

import Error from 'next/error';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import Interests from '@/components/common/Interests';
import Layout from '@/components/common/Layout';
import SearchList from '@/components/common/SearchList';
import PriceInfo from '@/components/market/PriceInfo';
import RecentTrade from '@/components/market/RecentTrade';
import { api } from '@/libs/client/api';
import wrapper from '@/store';

import type { InferGetServerSidePropsType, NextPage } from 'next';

import { ServerError } from '@/types/response';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const Markets: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ error }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (error) return <Error statusCode={error.statusCode} title={error.title} />;

  return (
    <Layout>
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
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<{ error: ServerError }>(
  (state) => async () => {
    const queryClient = new QueryClient();
    const { token } = state.getState().user;
    const promises: Promise<unknown>[] = [
      queryClient.fetchQuery(['cahoot/deadline-mini'], () =>
        api.get(`cahoots/mini?status=ending-soon`).json()
      ),
      queryClient.fetchQuery(['market/price', 'PRICE', 'up'], () =>
        api.get(`markets/rank?type=PRICE&up=TRUE`).json()
      ),
      queryClient.fetchInfiniteQuery(['market/list', ''], ({ pageParam = 0 }) =>
        api.get(`markets?page=${pageParam}&keyword=&size=10`).json()
      ),
    ];
    if (token)
      promises.push(
        queryClient.fetchQuery([`markets/interests`], () =>
          api
            .get(`auth/interests/me?page=0&size=10&type=market`, {
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
