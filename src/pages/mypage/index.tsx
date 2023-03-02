import { Suspense } from 'react';

import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/common/Layout';
import ParticapatedContest from '@/components/mypage/ParticipatedContest';
import Stocks from '@/components/mypage/Stocks';
import Transactions from '@/components/mypage/Transactions';
import UserInfo from '@/components/mypage/UserInfo';
import { ErrorBoundary } from '@sentry/nextjs';

const Mypage = () => {
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
                    <Link href="/" className="font-medium">
                      내 정보
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="font-medium">
                      공모 내역
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="font-medium">
                      거래 현황
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="font-medium">
                      자산 현황
                    </Link>
                  </li>
                  <hr className="border-1 my-2 border-main"></hr>
                  <li>
                    <Link href="/" className="font-medium">
                      로그아웃
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-3/4">
                <UserInfo />
                <ParticapatedContest />
                <Transactions />
                <Stocks />
              </div>
            </div>
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

export default Mypage;
