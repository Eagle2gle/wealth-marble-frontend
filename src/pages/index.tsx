import { Suspense } from 'react';

import DeadlineBanner from '@/components/cahoot/DeadlineBanner';
import Layout from '@/components/common/Layout';
import RecentUploadCarousel from '@/components/RecentUploadCarousel';
import RecommendedList from '@/components/RecommendedList';
import Thumbnail from '@/components/Thumbnail';
import TopFiveList from '@/components/TopFiveList';

import type { GetServerSideProps } from 'next';

export default function Home() {
  return (
    <Layout>
      <div className="space-y-6 ">
        <Thumbnail />
        <Suspense fallback={<p>error</p>}>
          <DeadlineBanner />
        </Suspense>
        <RecentUploadCarousel />
        <div className="flex flex-col md:flex-row md:space-x-12">
          <RecommendedList />
          <TopFiveList />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
