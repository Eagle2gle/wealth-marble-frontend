import { useRef } from 'react';

import { InferGetServerSidePropsType, NextPage } from 'next';
import Error from 'next/error';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import DeadlineCarousel from '@/components/cahoot/DeadlineCarousel';
import Recap from '@/components/cahoot/Recap';
import Interests from '@/components/common/Interests';
import Layout from '@/components/common/Layout';
import SearchList from '@/components/common/SearchList';
import { queries } from '@/queries';
import wrapper from '@/store';
import { ServerError } from '@/types/response';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const Cahoots: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ error }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (error) return <Error statusCode={error.statusCode} title={error.title} />;

  return (
    <Layout>
      <div className="space-y-4">
        <DeadlineBanner />
        <Interests type="cahoot" scrollRef={scrollRef} />
        <DeadlineCarousel />
        <Recap />
        <div ref={scrollRef}></div>
        <SearchList scrollRef={scrollRef} type="cahoot" />
      </div>
    </Layout>
  );
};

export default Cahoots;

export const getServerSideProps = wrapper.getServerSideProps<{ error: ServerError }>(
  (state) => async () => {
    const queryClient = new QueryClient();
    const promises: Promise<unknown>[] = [
      queryClient.fetchQuery(queries.cahoots.deadline._ctx.mini),
      queryClient.fetchQuery(queries.cahoots.deadline),
      queryClient.fetchQuery(queries.cahoots.recap),
      queryClient.fetchInfiniteQuery(queries.cahoots.list._ctx.keyword('')),
    ];
    const { token } = state.getState().user;
    if (token) {
      promises.push(queryClient.fetchQuery(queries.interests.all._ctx.type('cahoot', token)));
    }
    try {
      await Promise.all(promises);
    } catch (e) {
      console.log(e);
      const error = {
        statusCode: 500,
        title: 'Internal Server Error',
      };
      return {
        props: { error },
      };
    }
    return {
      props: { error: false, dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) },
    };
  }
);
