import { Suspense } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Layout from '@/components/common/Layout';
import ParticipatedContest from '@/components/mypage/ParticipatedContest';
import Stocks from '@/components/mypage/Stocks';
import Transactions from '@/components/mypage/Transactions';
import UserInfo from '@/components/mypage/UserInfo';
import wrapper, { useTypeSelector } from '@/store';
import { ErrorBoundary } from '@sentry/nextjs';

const Mypage = () => {
  const id = useTypeSelector((state) => state.user.id);
  const token = useTypeSelector((state) => state.user.token);

  return (
    <>
      {id ? (
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
                        <Link href="/" className="font-medium">
                          로그아웃
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="flex w-full flex-col md:w-3/4">
                    <UserInfo token={token} />
                    <ParticipatedContest token={token} />
                    <Transactions token={token} />
                    <Stocks token={token} />
                    <Link
                      href="/cahoots/create"
                      className="mx-6 my-2 ml-auto block w-40 font-medium text-grey-middle md:hidden"
                    >
                      공모 등록하러가기 {'>'}
                    </Link>
                  </div>
                </div>
              </ErrorBoundary>
            </Suspense>
          </div>
        </Layout>
      ) : (
        // TODO: 로그인 X시 띄울 화면 기획 필요
        <Layout>로그인 후 이용해주세요</Layout>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  return {
    props: {},
  };
});

export default Mypage;
