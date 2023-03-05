import { Suspense } from 'react';

import Icon from '@/components/common/Icons';
import UserInfoManagement from '@/components/mypage/UserInfoManagement';
import wrapper from '@/store';

export default function Management() {
  return (
    <div>
      <section className="flex items-center gap-2.5 px-10 py-4 text-center">
        <div className="w-1/12">
          {/* TODO: 뒤로가기 */}
          <Icon.Left />
        </div>
        <h1 className="w-11/12 pr-12 text-xl font-bold">개인정보 관리</h1>
      </section>
      <hr className="border-1 mb-2 border-grey" />
      <Suspense fallback={<p>로딩...</p>}>
        <UserInfoManagement />
      </Suspense>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  return {
    props: {},
  };
});
