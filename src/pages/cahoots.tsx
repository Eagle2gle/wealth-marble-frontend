import CahootList from '@/components/CahootList';
import CahootRecap from '@/components/CahootRecap';
import Layout from '@/components/common/Layout';
import DeadlineBanner from '@/components/DeadlineBanner';
import DeadlineCarousel from '@/components/DeadlineCarousel';

const Cahoots = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <DeadlineBanner />
        <DeadlineCarousel />
        <CahootRecap />
        <CahootList />
      </div>
    </Layout>
  );
};

export default Cahoots;
