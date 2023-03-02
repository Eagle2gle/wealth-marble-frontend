import { Suspense } from 'react';

import DetailBody from '@/components/cahoot/DetailBody';
import DetailHeader from '@/components/cahoot/DetailHeader';
import OrderMobile from '@/components/cahoot/OrderMobile';
import Layout from '@/components/common/Layout';
import { api } from '@/libs/client/api';
import wrapper from '@/store';
import { ErrorBoundary } from '@sentry/nextjs';
import { QueryClient } from '@tanstack/react-query';

import type { InferGetServerSidePropsType } from 'next';

const CahootsDetail = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
            <DetailBody id={id} />
            <OrderMobile />
          </ErrorBoundary>
        </Suspense>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<{ id: number }>(
  () => async (context) => {
    const { id } = context.query;
    if (typeof id !== 'string' || !parseInt(id)) return { notFound: true };

    const queryClient = new QueryClient();
    try {
      await queryClient.fetchQuery(['cahoot/detail', id], () =>
        api.get(`cahoots/${id}?info=detail`).json()
      );
    } catch (e) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        id: parseInt(id),
      },
    };
  }
);

export default CahootsDetail;
