import { Suspense } from 'react';

import Icon from '@/components/common/Icons';
import TransactionTable from '@/components/mypage/TransactionTable';
import wrapper from '@/store';

export default function Transactions() {
  return (
    <div>
      <section className="flex w-full items-center gap-2.5 px-10 py-4 text-center">
        <div className="w-1/12">
          {/* TODO: 뒤로가기 */}
          <Icon.Left />
        </div>
        <h1 className="w-11/12 pr-12 text-xl font-bold">거래 현황</h1>
      </section>
      <hr className="border-1 mb-2 border-grey" />
      <main className="flex justify-center p-4">
        <Suspense fallback={<p>로딩...</p>}>
          <TransactionTable printAllData={true} border={true} />
        </Suspense>
      </main>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((state) => async () => {
  const { id } = state.getState().user;
  if (!id) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
});
