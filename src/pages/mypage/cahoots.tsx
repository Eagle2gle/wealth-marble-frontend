import Icon from '@/components/common/Icons';
import Table from '@/components/common/Table';

export default function Cahoots() {
  return (
    <>
      {/* only desktop */}
      {/* TODO: 데스크탑일 때 처리 */}
      <div className="hidden md:block">모바일 전용 페이지입니다. 마이페이지로 이동(버튼)</div>
      {/* only mobile */}
      <div className="block md:hidden">
        <section className="flex w-full items-center gap-2.5 px-10 py-4 text-center">
          <div className="w-1/12">
            {/* TODO: 뒤로가기 */}
            <Icon.Left />
          </div>
          <h1 className="w-11/12 pr-12 text-xl font-bold">공모 내역</h1>
        </section>
        <hr className="border-1 mb-2 border-grey" />
        <main className="p-4">
          <Table printAllData={true} border={true} />
        </main>
      </div>
    </>
  );
}
