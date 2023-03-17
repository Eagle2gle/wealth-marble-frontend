import { Suspense } from 'react';

import ContestTable from '@/components/mypage/ContestTable';
import HeaderWithBackButton from '@/components/mypage/HeaderWithBackButton';
import wrapper from '@/store';

export default function Cahoots() {
  return (
    <div>
      <HeaderWithBackButton title="공모 내역" />
      <main className="flex justify-center p-4">
        <Suspense fallback={<p>로딩...</p>}>
          <ContestTable printAllData={true} border={true} />
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
