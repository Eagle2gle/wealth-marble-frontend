import { Suspense } from 'react';

import HeaderWithBackButton from '@/components/mypage/HeaderWithBackButton';
import UserInfoManagement from '@/components/mypage/UserInfoManagement';
import wrapper from '@/store';

export default function Management() {
  return (
    <div>
      <HeaderWithBackButton title="개인정보 관리" />
      <Suspense fallback={<p>로딩...</p>}>
        <UserInfoManagement />
      </Suspense>
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
