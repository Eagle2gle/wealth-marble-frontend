import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import Layout from '@/components/common/Layout';
import RecentUploadCarousel from '@/components/home/RecentUploadCarousel';
import RecommendedList from '@/components/home/RecommendedList';
import TopFiveList from '@/components/home/TopFiveList';
import Thumbnail from '@/components/Thumbnail';
import { queries } from '@/queries';
import wrapper from '@/store';
import type { ServerError } from '@/types/response';

import type { NextPageWithLayout } from './_app';

import { dehydrate, QueryClient } from '@tanstack/react-query';

const Home: NextPageWithLayout = () => {
  return (
    <div className="space-y-6">
      <Thumbnail />
      <DeadlineBanner />
      <RecentUploadCarousel />
      <div className="flex flex-col md:flex-row md:space-x-12">
        <RecommendedList />
        <TopFiveList />
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;

export const getServerSideProps = wrapper.getServerSideProps<{ error: ServerError }>(
  (state) => async () => {
    const queryClient = new QueryClient();
    const userId = state.getState().user.id ?? '';
    const promises: Promise<unknown>[] = [
      queryClient.fetchQuery(queries.cahoots.deadline._ctx.mini),
      queryClient.fetchQuery(queries.cahoots.recent),
      queryClient.fetchQuery(queries.markets.countries),
      queryClient.fetchQuery(queries.markets.recommend('대한민국', userId)),
      queryClient.fetchQuery(queries.markets.top5('거래가 많은(전일)')),
    ];

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
      props: {
        error: false,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
