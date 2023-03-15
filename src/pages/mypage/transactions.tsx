import { Suspense } from 'react';

import HeaderWithBackButton from '@/components/mypage/HeaderWithBackButton';
import TransactionTable from '@/components/mypage/TransactionTable';
import wrapper from '@/store';

export default function Transactions() {
  return (
    <div>
      <HeaderWithBackButton title="거래 현황" />
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
