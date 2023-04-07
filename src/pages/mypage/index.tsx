import { Suspense } from 'react';

import Error from 'next/error';
import Image from 'next/image';
import Link from 'next/link';

import ErrorFallback from '@/components/common/ErrorFallback';
import Layout from '@/components/common/Layout';
import RouteGuard from '@/components/common/RouteGuard';
import ParticipatedContest from '@/components/mypage/ParticipatedContest';
import Stocks from '@/components/mypage/Stocks';
import Transactions from '@/components/mypage/Transactions';
import UserInfo from '@/components/mypage/UserInfo';
import { queries } from '@/queries';
import wrapper, { useTypeDispatch } from '@/store';
import { logout } from '@/store/modules/user';
import type { ServerError } from '@/types/response';
import { ErrorBoundary } from '@sentry/nextjs';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import type { NextPageWithLayout } from '../_app';
import type { InferGetServerSidePropsType } from 'next';

const Mypage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  error,
}) => {
  const dispatch = useTypeDispatch();

  if (error) return <Error statusCode={error.statusCode} title={error.title} />;

  const onLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <div className="mb-60 flex flex-col gap-6 md:mb-0">
      <div className="flex justify-between md:py-12">
        <div className="hidden w-1/4 md:block">
          <p className="text-xl font-black">마이페이지</p>
          <div className="avatar my-4">
            <div className="w-32 rounded-l-lg md:rounded-lg"></div>
            {/* {images[0] && ( */}
            <Image
              src="/images/thumbnail.jpeg"
              alt=""
              className="rounded-full"
              fill
              sizes="128px"
            />
            {/* )} */}
          </div>
          <ul className="menu w-4/5 bg-base-100">
            <hr className="border-1 my-2 border-main"></hr>
            <li>
              <Link href="/mypage/management" className="font-medium">
                내 정보
              </Link>
            </li>
            <li>
              <Link href="/mypage/cahoots" className="font-medium">
                공모 내역
              </Link>
            </li>
            <li>
              <Link href="/mypage/transactions" className="font-medium">
                거래 현황
              </Link>
            </li>
            <li>
              <Link href="/mypage/stocks" className="font-medium">
                자산 현황
              </Link>
            </li>
            <li>
              <Link href="/cahoots/create" className="font-medium">
                공모 등록
              </Link>
            </li>
            <hr className="border-1 my-2 border-main"></hr>
            <li>
              <Link href="/" className="font-medium" legacyBehavior>
                <a onClick={onLogoutClick}>로그아웃</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex w-full flex-col md:w-3/4">
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense>
              <UserInfo />
            </Suspense>
          </ErrorBoundary>
          <ParticipatedContest />
          <Transactions />
          <Stocks />
          <Link
            href="/cahoots/create"
            className="mx-6 my-2 ml-auto block w-40 font-medium text-grey-middle md:hidden"
          >
            공모 등록하러가기 {'>'}
          </Link>
        </div>
      </div>
    </div>
  );
};

Mypage.getLayout = (page) => (
  <Layout>
    <RouteGuard>{page}</RouteGuard>
  </Layout>
);

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
      queryClient.fetchQuery(queries.users.info(token)),
      queryClient.fetchQuery(queries.users.contest(token)),
      queryClient.fetchQuery(queries.users.transaction(token)),
      queryClient.fetchQuery(queries.users.stock(token)),
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

export default Mypage;
