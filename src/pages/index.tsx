import Layout from '@/components/common/Layout';
import DeadlineBanner from '@/components/DeadlineBanner';
import RecentUploadCarousel from '@/components/RecentUploadCarousel';
import RecommendedList from '@/components/RecommendedList';
import Thumbnail from '@/components/Thumbnail';
import TopFiveList from '@/components/TopFiveList';

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
