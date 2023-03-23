import { Suspense } from 'react';

import HeaderWithBackButton from '@/components/mypage/HeaderWithBackButton';
import StockTable from '@/components/mypage/StockTable';
import wrapper from '@/store';

export default function Cahoots() {
  return (
    <div>
      <HeaderWithBackButton title="자산 현황" />
      <main className="flex justify-center p-4">
        <Suspense fallback={<p>로딩...</p>}>
          <StockTable printAllData={true} border={true} />
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
