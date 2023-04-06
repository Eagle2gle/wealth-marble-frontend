import { Suspense } from 'react';

import Error from 'next/error';

import ErrorFallback from '@/components/common/ErrorFallback';
import HeaderWithBackButton from '@/components/mypage/HeaderWithBackButton';
import UserInfoManagement from '@/components/mypage/UserInfoManagement';
import { queries } from '@/queries';
import wrapper from '@/store';
import type { ServerError } from '@/types/response';
import { ErrorBoundary } from '@sentry/nextjs';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import type { InferGetServerSidePropsType, NextPage } from 'next';

const Management: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  error,
}) => {
  if (error) return <Error statusCode={error.statusCode} title={error.title} />;

  return (
    <>
      <HeaderWithBackButton title="개인정보 관리" />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense>
          <UserInfoManagement />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Management;

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
    const promises: Promise<unknown>[] = [queryClient.fetchQuery(queries.users.info(token))];
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
