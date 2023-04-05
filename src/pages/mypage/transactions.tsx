import { Suspense } from 'react';

import Error from 'next/error';

import ErrorFallback from '@/components/common/ErrorFallback';
import HeaderWithBackButton from '@/components/mypage/HeaderWithBackButton';
import TransactionTable from '@/components/mypage/TransactionTable';
import { api } from '@/libs/client/api';
import wrapper from '@/store';
import type { ServerError } from '@/types/response';
import { ErrorBoundary } from '@sentry/nextjs';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import type { InferGetServerSidePropsType, NextPage } from 'next';

const Transactions: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  error,
}) => {
  if (error) return <Error statusCode={error.statusCode} title={error.title} />;

  return (
    <>
      <HeaderWithBackButton title="거래 현황" />
      <main className="flex justify-center p-4">
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense>
            <TransactionTable printAllData={true} border={true} />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
};

export default Transactions;

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
    const promises: Promise<unknown>[] = [
      queryClient.fetchQuery([`user/transactions`], () =>
        api
          .get(`auth/transactions/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .json()
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
      props: { error: false, dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) },
    };
  }
);
