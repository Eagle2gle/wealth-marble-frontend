import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import Layout from '@/components/common/Layout';
import RecentUploadCarousel from '@/components/home/RecentUploadCarousel';
import RecommendedList from '@/components/home/RecommendedList';
import TopFiveList from '@/components/home/TopFiveList';
import Thumbnail from '@/components/Thumbnail';
import { api } from '@/libs/client/api';
import wrapper from '@/store';
import type { ServerError } from '@/types/response';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export default function Home() {
  return (
    <Layout>
      <div className="space-y-6 ">
        <Thumbnail />
        <DeadlineBanner />
        <RecentUploadCarousel />
        <div className="flex flex-col md:flex-row md:space-x-12">
          <RecommendedList />
          <TopFiveList />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps<{ error: ServerError }>(
  (state) => async () => {
    const queryClient = new QueryClient();
    const userId = state.getState().user.id;
    const promises: Promise<unknown>[] = [
      queryClient.fetchQuery(['cahoot/deadline-mini'], () =>
        api.get(`cahoots/mini?status=ending-soon`).json()
      ),
      queryClient.fetchQuery(['RecentUploadCarouselData'], () => api.get('cahoots/recent').json()),
      queryClient.fetchQuery(['MarketCountries'], () => api.get('markets/countries').json()),
      queryClient.fetchQuery(['RecommendListData', '대한민국'], () =>
        api
          .get(
            `markets/recommend?country=${encodeURIComponent('대한민국')}${
              userId ? `&userId=${userId}` : ''
            }`
          )
          .json()
      ),
      queryClient.fetchQuery(['Top5ListData', '거래가 많은(전일)'], () =>
        api.get(`markets/top?property=TRANSACTION`).json()
      ),
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
