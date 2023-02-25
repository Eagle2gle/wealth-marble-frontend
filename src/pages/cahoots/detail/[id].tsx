import { Suspense } from 'react';

import { GetServerSideProps } from 'next';

import DetailBody from '@/components/cahoot/DetailBody';
import DetailHeader from '@/components/cahoot/DetailHeader';
import InterestButton from '@/components/cahoot/InterestButton';
import OrderMobile from '@/components/cahoot/OrderMobile';
import Layout from '@/components/common/Layout';
import { ErrorBoundary } from '@sentry/nextjs';

const CahootsDetail = () => {
  return (
    <Layout>
      <div className="mb-60 flex flex-col gap-6 md:mb-0">
        <Suspense fallback={<p>로딩...</p>}>
          <ErrorBoundary
            fallback={({ resetError, error }) => (
              <>
                <p>{error.message}</p>
                <button onClick={() => resetError()}>reset</button>
              </>
            )}
          >
            <DetailHeader />
            <InterestButton />
            <DetailBody />
            <OrderMobile />
          </ErrorBoundary>
        </Suspense>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default CahootsDetail;
