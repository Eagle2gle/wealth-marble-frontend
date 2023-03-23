import GoBackButton from '@/components/common/GoBackButton';

interface PropsType {
  title: string;
}
const HeaderWithBackButton = ({ title }: PropsType) => {
  return (
    <>
      <section className="relative flex items-center py-4 text-center">
        <div className="absolute w-16">
          <GoBackButton />
        </div>
        <h1 className="mx-auto w-48 text-xl font-bold">{title}</h1>
      </section>
      <hr className="border-1 mb-2 border-grey" />
    </>
  );
};

export default HeaderWithBackButton;
