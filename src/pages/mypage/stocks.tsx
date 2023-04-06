import { Suspense } from 'react';

import Error from 'next/error';

import ErrorFallback from '@/components/common/ErrorFallback';
import HeaderWithBackButton from '@/components/mypage/HeaderWithBackButton';
import StockTable from '@/components/mypage/StockTable';
import { queries } from '@/queries';
import wrapper from '@/store';
import type { ServerError } from '@/types/response';
import { ErrorBoundary } from '@sentry/nextjs';

import type { InferGetServerSidePropsType, NextPage } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

const Stocks: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ error }) => {
  if (error) return <Error statusCode={error.statusCode} title={error.title} />;

  return (
    <>
      <HeaderWithBackButton title="자산 현황" />
      <main className="flex justify-center p-4">
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense>
            <StockTable printAllData={true} border={true} />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
};

export default Stocks;

export const getServerSideProps = wrapper.getServerSideProps<{ error: ServerError }>(
  (state) => async () => {
    const { token } = state.getState().user;
    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    const queryClient = new QueryClient();
    const promises: Promise<unknown>[] = [queryClient.fetchQuery(queries.users.stock(token))];
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
      props: { error: false, dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) },
    };
  }
);
