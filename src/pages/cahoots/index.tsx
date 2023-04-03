import { useRef } from 'react';

import { InferGetServerSidePropsType, NextPage } from 'next';
import Error from 'next/error';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import DeadlineCarousel from '@/components/cahoot/DeadlineCarousel';
import List from '@/components/cahoot/List';
import Recap from '@/components/cahoot/Recap';
import Interests from '@/components/common/Interests';
import Layout from '@/components/common/Layout';
import { api } from '@/libs/client/api';
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
        <List scrollRef={scrollRef} />
      </div>
    </Layout>
  );
};

export default Cahoots;

export const getServerSideProps = wrapper.getServerSideProps<{ error: ServerError }>(
  (state) => async () => {
    const queryClient = new QueryClient();
    const promises: Promise<unknown>[] = [
      queryClient.fetchQuery(['cahoot/deadline-mini'], () =>
        api.get(`cahoots/mini?status=ending-soon`).json()
      ),
      queryClient.fetchQuery(['cahoot/deadline'], () =>
        api.get(`cahoots?status=ending-soon`).json()
      ),
      queryClient.fetchQuery(['cahoot/recap'], () => api.get(`cahoots?status=ended`).json()),
      queryClient.fetchInfiniteQuery({
        queryKey: ['cahoot/list', ''],
        queryFn: ({ pageParam = 0 }) =>
          api.get(`cahoots?status=ongoing&page=${pageParam}&keyword=`).json(),
      }),
    ];
    const { token } = state.getState().user;
    if (token) {
      promises.push(
        queryClient.fetchQuery([`cahoots/interests`], () =>
          api
            .get(`auth/interests/me?page=0&size=10`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .json()
        )
      );
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
