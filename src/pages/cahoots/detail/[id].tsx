import { Suspense } from 'react';

import { GetServerSideProps } from 'next';

import DetailBody from '@/components/cahoot/DetailBody';
import DetailHeader from '@/components/cahoot/DetailHeader';
import OrderMobile from '@/components/cahoot/OrderMobile';
import Icon from '@/components/common/Icons';
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
            <button className="btn-ghost btn mx-4 gap-1 border-grey fill-none md:hidden">
              <Icon.Bookmark />
              <span className="font-medium">관심상품</span>
              <span>1,239</span>
            </button>
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
